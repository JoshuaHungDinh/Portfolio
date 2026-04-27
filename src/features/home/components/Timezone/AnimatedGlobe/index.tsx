"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import styles from "./styles.module.scss";

// Prefetch topology as soon as this module is parsed (dynamic import keeps it
// out of the critical path). The cached promise is awaited inside loadWorldData
// so there's no duplicate fetch.
const LAND_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
const topologyPromise = typeof window !== "undefined"
  ? fetch(LAND_URL).then((r) => r.json())
  : null;

type CityType = "home" | "remote" | "hub";

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  type: CityType;
  label?: string;
}

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  cities?: City[];
}

const DEFAULT_CITIES: City[] = [
  { name: "San Diego", country: "USA", lat: 32.72, lon: -117.16, type: "home", label: "Home base" },
  { name: "Tokyo", country: "Japan", lat: 35.68, lon: 139.69, type: "remote", label: "Remote — family based here" },
  { name: "Seoul", country: "South Korea", lat: 37.57, lon: 126.98, type: "remote", label: "Remote — JST/KST region" },
  { name: "Osaka", country: "Japan", lat: 34.69, lon: 135.50, type: "remote", label: "Remote — family nearby" },
  { name: "London", country: "UK", lat: 51.51, lon: -0.13, type: "hub" },
  { name: "New York", country: "USA", lat: 40.71, lon: -74.01, type: "hub" },
  { name: "Singapore", country: "Singapore", lat: 1.35, lon: 103.82, type: "hub" },
  { name: "Sydney", country: "Australia", lat: -33.87, lon: 151.21, type: "hub" },
  { name: "Rome", country: "Italy", lat: 41.90, lon: 12.50, type: "hub" },
  { name: "Madrid", country: "Spain", lat: 40.42, lon: -3.70, type: "hub" },
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
    const radius = Math.min(containerWidth, containerHeight) / 2.4;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Colors sampled from --accent-gradient
    const OCEAN_FILL = "#0a0a0f";
    const GLOBE_STROKE = "rgba(206, 224, 255, 0.18)";
    const GRATICULE_STROKE = "rgba(206, 224, 255, 0.07)";
    const LAND_STROKE = "rgba(223, 209, 255, 0.28)";
    const DOT_FILL_TOP = "rgba(206, 224, 255, 0.6)";
    const DOT_FILL_BOTTOM = "rgba(223, 209, 255, 0.6)";
    const ACCENT_BLUE = "#b2d5ff";
    const ACCENT_LAVENDER = "#dfd1ff";
    const HUB_COLOR = "rgba(255, 255, 255, 0.85)";

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
    const generateDotsInPolygon = (feature: any, step = 2.5) => {
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

    const visibilityCos = (lon: number, lat: number): number => {
      const r = projection.rotate();
      const lambda = (-r[0] * Math.PI) / 180;
      const phi = (-r[1] * Math.PI) / 180;
      const lonR = (lon * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      return (
        Math.sin(phi) * Math.sin(latR) +
        Math.cos(phi) * Math.cos(latR) * Math.cos(lonR + lambda)
      );
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

      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = OCEAN_FILL;
      context.fill();
      context.strokeStyle = GLOBE_STROKE;
      context.lineWidth = 1;
      context.stroke();

      if (landFeatures) {
        context.beginPath();
        path(d3.geoGraticule()());
        context.strokeStyle = GRATICULE_STROKE;
        context.lineWidth = 0.5;
        context.stroke();

        context.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((f: any) => path(f));
        context.strokeStyle = LAND_STROKE;
        context.lineWidth = 0.6;
        context.stroke();

        const r2 = currentScale * currentScale;
        for (let i = 0; i < allDots.length; i++) {
          const p = projection(allDots[i]);
          if (!p) continue;
          const dx = p[0] - cx;
          const dy = p[1] - cy;
          if (dx * dx + dy * dy > r2) continue;
          const verticalT = (p[1] - (cy - currentScale)) / (currentScale * 2);
          context.fillStyle = verticalT < 0.5 ? DOT_FILL_TOP : DOT_FILL_BOTTOM;
          context.beginPath();
          context.arc(p[0], p[1], 1.1, 0, 2 * Math.PI);
          context.fill();
        }
      }

      const home = cities.find((c) => c.type === "home");
      const connectedCities = cities.filter((c) => c.type !== "home");
      if (home) {
        connectedCities.forEach((target, ri) => {
          const arcPts = greatCirclePoints(
            [home.lon, home.lat],
            [target.lon, target.lat],
            80,
          );

          const arcColor = target.type === "remote" ? ACCENT_LAVENDER : ACCENT_BLUE;

          context.beginPath();
          let started = false;
          for (let i = 0; i < arcPts.length; i++) {
            const visible = visibilityCos(arcPts[i][0], arcPts[i][1]) > 0;
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
          context.strokeStyle = arcColor;
          context.lineWidth = 1.5;
          context.globalAlpha = 0.55;
          context.stroke();
          context.globalAlpha = 1;

          // Stagger the traveling dot per arc
          const t = ((pulseT * 0.012) + ri * 0.15) % 1;
          const idx = Math.floor(t * arcPts.length);
          const arcPt = arcPts[Math.min(idx, arcPts.length - 1)];
          if (visibilityCos(arcPt[0], arcPt[1]) > 0) {
            const p = projection(arcPt);
            if (p) {
              const ps = 0.6 + Math.sin(t * Math.PI) * 1.2;
              context.beginPath();
              context.arc(p[0], p[1], 5 * ps, 0, 2 * Math.PI);
              context.fillStyle = arcColor;
              context.globalAlpha = 0.25;
              context.fill();
              context.globalAlpha = 1;
              context.beginPath();
              context.arc(p[0], p[1], 2.5, 0, 2 * Math.PI);
              context.fillStyle = "#ffffff";
              context.fill();
            }
          }
        });
      }

      const visibleCities = cities
        .map((c) => ({ city: c, vis: visibilityCos(c.lon, c.lat) }))
        .filter((x) => x.vis > 0)
        .sort((a, b) => a.vis - b.vis);

      visibleCities.forEach(({ city }) => {
        const p = projection([city.lon, city.lat]);
        if (!p) return;

        if (city.type === "home") {
          const pulse = Math.sin(pulseT * 0.04) * 0.5 + 0.5;
          context.beginPath();
          context.arc(p[0], p[1], 4 + pulse * 14, 0, 2 * Math.PI);
          context.fillStyle = ACCENT_BLUE;
          context.globalAlpha = 0.18 * (1 - pulse * 0.6);
          context.fill();
          context.globalAlpha = 1;
          context.beginPath();
          context.arc(p[0], p[1], 5, 0, 2 * Math.PI);
          context.fillStyle = ACCENT_BLUE;
          context.fill();
          context.beginPath();
          context.arc(p[0], p[1], 2.5, 0, 2 * Math.PI);
          context.fillStyle = "#ffffff";
          context.fill();
        } else if (city.type === "remote") {
          const pulse = Math.sin(pulseT * 0.04) * 0.5 + 0.5;
          context.beginPath();
          context.arc(p[0], p[1], 4 + pulse * 12, 0, 2 * Math.PI);
          context.fillStyle = ACCENT_LAVENDER;
          context.globalAlpha = 0.18 * (1 - pulse * 0.6);
          context.fill();
          context.globalAlpha = 1;
          context.beginPath();
          context.arc(p[0], p[1], 4.5, 0, 2 * Math.PI);
          context.fillStyle = ACCENT_LAVENDER;
          context.fill();
          context.beginPath();
          context.arc(p[0], p[1], 2, 0, 2 * Math.PI);
          context.fillStyle = "#ffffff";
          context.fill();
        } else {
          context.beginPath();
          context.arc(p[0], p[1], 2.5, 0, 2 * Math.PI);
          context.fillStyle = HUB_COLOR;
          context.globalAlpha = 0.7;
          context.fill();
          context.globalAlpha = 1;
        }
      });
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const topology = topologyPromise
          ? await topologyPromise
          : await fetch(LAND_URL).then((r) => r.json());
        const land = topojson.feature(topology, topology.objects.land);
        landFeatures =
          land.type === "Feature"
            ? { type: "FeatureCollection", features: [land] }
            : land;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((feature: any) => {
          generateDotsInPolygon(feature, 2.5).forEach((d) => allDots.push(d));
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
    let visible = false;
    let loopRunning = false;

    const tick = () => {
      if (!visible || document.hidden) {
        loopRunning = false;
        return;
      }
      pulseT += 1;
      if (autoRotate && !dragging) {
        rotation[0] += 0.18;
        projection.rotate(rotation);
      }
      render();
      requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (loopRunning) return;
      loopRunning = true;
      requestAnimationFrame(tick);
    };

    // Pause RAF when globe is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) startLoop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    // Pause RAF when tab is hidden, resume when visible
    const handleVisibility = () => {
      if (!document.hidden && visible) startLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

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
        if (visibilityCos(city.lon, city.lat) <= 0) continue;
        const p = projection([city.lon, city.lat]);
        if (!p) continue;
        if (Math.hypot(p[0] - mx, p[1] - my) < 12) {
          found = city;
          break;
        }
      }
      if (found) {
        const subtitle =
          found.label || (found.type === "hub" ? "Open to relocate" : "");
        tooltip.innerHTML =
          `<div style="font-weight:500">${found.name}, ${found.country}</div>` +
          (subtitle
            ? `<div style="color:#8b8b95; font-size:11px; margin-top:2px">${subtitle}</div>`
            : "");
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

    loadWorldData().then(() => startLoop());

    return () => {
      visible = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleHover);
    };
  }, [width, height, cities]);

  if (error) {
    return (
      <div className={`${styles.errorWrapper} ${className}`}>
        <div>
          <p className={styles.errorTitle}>
            Error loading Earth visualization
          </p>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={tooltipRef} className={styles.tooltip} />
        {isLoading && (
          <div className={styles.loading}>Loading globe…</div>
        )}
      </div>
    </div>
  );
}
