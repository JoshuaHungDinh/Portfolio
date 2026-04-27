"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  home?: boolean;
  featured?: boolean;
}

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  cities?: City[];
}

const DEFAULT_CITIES: City[] = [
  { name: "San Diego", country: "USA", lat: 32.72, lon: -117.16, home: true },
  { name: "Tokyo", country: "Japan", lat: 35.68, lon: 139.69, featured: true },
  { name: "Seoul", country: "South Korea", lat: 37.57, lon: 126.98 },
  { name: "Singapore", country: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Sydney", country: "Australia", lat: -33.87, lon: 151.21 },
  { name: "Vancouver", country: "Canada", lat: 49.28, lon: -123.12 },
  { name: "New York", country: "USA", lat: 40.71, lon: -74.01 },
  { name: "London", country: "UK", lat: 51.51, lon: -0.13 },
];

export default function RotatingEarth({
  width = 600,
  height = 600,
  className = "",
  cities = DEFAULT_CITIES,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.3;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // ---- DARK THEME COLORS (sampled from --accent-gradient) ----
    const OCEAN_FILL = "#0a0a0f";
    const GLOBE_STROKE = "rgba(206, 224, 255, 0.18)";
    const GRATICULE_STROKE = "rgba(206, 224, 255, 0.07)";
    const LAND_STROKE = "rgba(223, 209, 255, 0.28)";
    const DOT_FILL_TOP = "rgba(206, 224, 255, 0.65)"; // upper hemisphere — blue
    const DOT_FILL_BOTTOM = "rgba(223, 209, 255, 0.65)"; // lower — lavender
    const ACCENT = "#b2d5ff";
    const ACCENT_SOFT = "#dfd1ff";

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (
      point: [number, number],
      polygon: number[][],
    ): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false;
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generateDotsInPolygon = (feature: any, step = 2.0) => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
        }
      }
      return dots;
    };

    const greatCirclePoints = (
      start: [number, number],
      end: [number, number],
      n: number,
    ): [number, number][] => {
      const interp = d3.geoInterpolate(start, end);
      const pts: [number, number][] = [];
      for (let i = 0; i <= n; i++) pts.push(interp(i / n) as [number, number]);
      return pts;
    };

    const isPointVisible = (lon: number, lat: number): boolean => {
      const r = projection.rotate();
      const lambda = (-r[0] * Math.PI) / 180;
      const phi = (-r[1] * Math.PI) / 180;
      const lonR = (lon * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const cosC =
        Math.sin(phi) * Math.sin(latR) +
        Math.cos(phi) * Math.cos(latR) * Math.cos(lonR + lambda);
      return cosC > 0;
    };

    const allDots: [number, number][] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landFeatures: any;
    let pulseT = 0;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const cx = containerWidth / 2;
      const cy = containerHeight / 2;
      const currentScale = projection.scale();

      // Ocean
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = OCEAN_FILL;
      context.fill();
      context.strokeStyle = GLOBE_STROKE;
      context.lineWidth = 1;
      context.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = GRATICULE_STROKE;
        context.lineWidth = 0.5;
        context.stroke();

        // Land outlines
        context.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((feature: any) => path(feature));
        context.strokeStyle = LAND_STROKE;
        context.lineWidth = 0.6;
        context.stroke();

        // Halftone dots — vertical gradient from blue (top) to lavender (bottom)
        const r2 = currentScale * currentScale;
        for (let i = 0; i < allDots.length; i++) {
          const projected = projection(allDots[i]);
          if (!projected) continue;
          const dx = projected[0] - cx;
          const dy = projected[1] - cy;
          if (dx * dx + dy * dy > r2) continue;
          const verticalT =
            (projected[1] - (cy - currentScale)) / (currentScale * 2);
          context.fillStyle = verticalT < 0.5 ? DOT_FILL_TOP : DOT_FILL_BOTTOM;
          context.beginPath();
          context.arc(projected[0], projected[1], 1.1, 0, 2 * Math.PI);
          context.fill();
        }
      }

      // Animated arc from home → featured city
      const home = cities.find((c) => c.home);
      const featured = cities.find((c) => c.featured);
      if (home && featured) {
        const arcPts = greatCirclePoints(
          [home.lon, home.lat],
          [featured.lon, featured.lat],
          80,
        );

        context.beginPath();
        let started = false;
        for (let i = 0; i < arcPts.length; i++) {
          const visible = isPointVisible(arcPts[i][0], arcPts[i][1]);
          const p = projection(arcPts[i]);
          if (visible && p) {
            if (!started) {
              context.moveTo(p[0], p[1]);
              started = true;
            } else {
              context.lineTo(p[0], p[1]);
            }
          } else {
            started = false;
          }
        }
        context.strokeStyle = ACCENT;
        context.lineWidth = 1.5;
        context.globalAlpha = 0.75;
        context.stroke();
        context.globalAlpha = 1;

        // Traveling pulse along the arc
        const t = (pulseT * 0.012) % 1;
        const idx = Math.floor(t * arcPts.length);
        const arcPt = arcPts[Math.min(idx, arcPts.length - 1)];
        if (isPointVisible(arcPt[0], arcPt[1])) {
          const p = projection(arcPt);
          if (p) {
            const pulseScale = 0.6 + Math.sin(t * Math.PI) * 1.2;
            context.beginPath();
            context.arc(p[0], p[1], 5 * pulseScale, 0, 2 * Math.PI);
            context.fillStyle = ACCENT;
            context.globalAlpha = 0.25;
            context.fill();
            context.globalAlpha = 1;
            context.beginPath();
            context.arc(p[0], p[1], 2.5, 0, 2 * Math.PI);
            context.fillStyle = "#ffffff";
            context.fill();
          }
        }
      }

      // City markers
      cities.forEach((city) => {
        if (!isPointVisible(city.lon, city.lat)) return;
        const p = projection([city.lon, city.lat]);
        if (!p) return;

        if (city.home) {
          const pulse = Math.sin(pulseT * 0.04) * 0.5 + 0.5;
          context.beginPath();
          context.arc(p[0], p[1], 4 + pulse * 12, 0, 2 * Math.PI);
          context.fillStyle = ACCENT;
          context.globalAlpha = 0.18 * (1 - pulse * 0.6);
          context.fill();
          context.globalAlpha = 1;

          context.beginPath();
          context.arc(p[0], p[1], 4, 0, 2 * Math.PI);
          context.fillStyle = ACCENT;
          context.fill();

          context.beginPath();
          context.arc(p[0], p[1], 2, 0, 2 * Math.PI);
          context.fillStyle = "#ffffff";
          context.fill();
        } else {
          context.beginPath();
          context.arc(p[0], p[1], city.featured ? 3.5 : 2.5, 0, 2 * Math.PI);
          context.fillStyle = city.featured ? ACCENT : ACCENT_SOFT;
          context.fill();
        }
      });
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");
        const topology = await response.json();
        const land = topojson.feature(topology, topology.objects.land);
        landFeatures =
          land.type === "Feature"
            ? { type: "FeatureCollection", features: [land] }
            : land;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 2.0);
          dots.forEach((d) => allDots.push(d));
        });

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    };

    const rotation: [number, number] = [120, -15];
    let autoRotate = true;
    let dragging = false;

    let rafId: number;
    const tick = () => {
      pulseT += 1;
      if (autoRotate && !dragging) {
        rotation[0] += 0.18;
        projection.rotate(rotation);
      }
      render();
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      dragging = true;
      canvas.style.cursor = "grabbing";
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [...rotation];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.4;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = Math.max(
          -90,
          Math.min(90, startRotation[1] - dy * sensitivity),
        );
        projection.rotate(rotation);
      };

      const handleMouseUp = () => {
        dragging = false;
        canvas.style.cursor = "grab";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 1500);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleHover = (event: MouseEvent) => {
      if (dragging || !tooltip) return;
      const rect = canvas.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      let found: City | null = null;
      for (const city of cities) {
        if (!isPointVisible(city.lon, city.lat)) continue;
        const p = projection([city.lon, city.lat]);
        if (!p) continue;
        if (Math.hypot(p[0] - mx, p[1] - my) < 10) {
          found = city;
          break;
        }
      }
      if (found) {
        tooltip.textContent = `${found.name}, ${found.country}`;
        tooltip.style.left = `${mx + 12}px`;
        tooltip.style.top = `${my - 8}px`;
        tooltip.style.opacity = "1";
        canvas.style.cursor = "pointer";
      } else {
        tooltip.style.opacity = "0";
        canvas.style.cursor = "grab";
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleHover);
    canvas.style.cursor = "grab";

    loadWorldData().then(() => tick());

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleHover);
    };
  }, [width, height, cities]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <p className="text-destructive font-semibold mb-2">
            Error loading Earth visualization
          </p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none rounded-md px-2 py-1 text-xs whitespace-nowrap z-10"
        style={{
          background: "rgba(20, 20, 28, 0.95)",
          border: "0.5px solid rgba(255, 255, 255, 0.12)",
          color: "#f5f5f7",
          opacity: 0,
          transition: "opacity 0.15s",
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">
          Loading globe…
        </div>
      )}
    </div>
  );
}
