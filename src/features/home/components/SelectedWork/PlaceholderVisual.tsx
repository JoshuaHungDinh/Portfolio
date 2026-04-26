import styles from "./SelectedWork.module.scss";

interface PlaceholderVisualProps {
  variant: "dashboard" | "terminal" | "document" | "chat" | "image";
  imageSrc?: string;
}

function Dashboard() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className={styles.visualSvg}>
      {/* Window chrome */}
      <circle cx="20" cy="16" r="4" fill="#52525b" />
      <circle cx="32" cy="16" r="4" fill="#52525b" />
      <circle cx="44" cy="16" r="4" fill="#52525b" />

      {/* Nav sidebar lines */}
      <rect x="16" y="40" width="60" height="4" rx="2" fill="#3f3f46" />
      <rect x="16" y="52" width="48" height="4" rx="2" fill="#3f3f46" />
      <rect x="16" y="64" width="54" height="4" rx="2" fill="#3f3f46" />

      {/* Metric badge */}
      <rect x="100" y="36" width="72" height="28" rx="6" fill="var(--accent-green)" />
      <text x="136" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0a0a0a">
        2.1M
      </text>

      {/* Gray metric badges */}
      <rect x="184" y="36" width="72" height="28" rx="6" fill="#27272a" />
      <rect x="268" y="36" width="72" height="28" rx="6" fill="#27272a" />

      {/* Grid lines */}
      <line x1="100" y1="90" x2="380" y2="90" stroke="#27272a" strokeWidth="1" />
      <line x1="100" y1="130" x2="380" y2="130" stroke="#27272a" strokeWidth="1" />
      <line x1="100" y1="170" x2="380" y2="170" stroke="#27272a" strokeWidth="1" />
      <line x1="100" y1="210" x2="380" y2="210" stroke="#27272a" strokeWidth="1" />

      {/* Chart line */}
      <polyline
        points="100,200 140,185 180,190 220,160 260,140 300,120 340,100 380,85"
        stroke="var(--accent-green)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Chart area fill */}
      <polygon
        points="100,200 140,185 180,190 220,160 260,140 300,120 340,100 380,85 380,210 100,210"
        fill="var(--accent-green)"
        opacity="0.08"
      />
    </svg>
  );
}

function Terminal() {
  return (
    <svg viewBox="0 0 360 280" fill="none" className={styles.visualSvg}>
      {/* Window chrome */}
      <circle cx="20" cy="16" r="4" fill="#52525b" />
      <circle cx="32" cy="16" r="4" fill="#52525b" />
      <circle cx="44" cy="16" r="4" fill="#52525b" />

      {/* $ forge build --release */}
      <text x="20" y="56" fontSize="13" fontFamily="monospace" fill="#a1a1aa">
        $ forge build --release
      </text>

      {/* Arrow lines */}
      <text x="20" y="80" fontSize="13" fontFamily="monospace" fill="#71717a">
        {"→ Compiling 142 modules"}
      </text>
      <text x="20" y="104" fontSize="13" fontFamily="monospace" fill="#71717a">
        {"→ Bundling assets "}
        <tspan fill="var(--accent-green)">{"✓"}</tspan>
      </text>
      <text x="20" y="128" fontSize="13" fontFamily="monospace" fill="#71717a">
        {"→ Optimizing "}
        <tspan fill="var(--accent-green)">{"✓"}</tspan>
      </text>

      {/* Build complete box */}
      <rect x="20" y="152" width="220" height="2" rx="1" fill="#3f3f46" />
      <text x="28" y="178" fontSize="13" fontFamily="monospace" fill="var(--accent-green)">
        | build complete · 1.2s |
      </text>
      <text x="28" y="198" fontSize="13" fontFamily="monospace" fill="#71717a">
        | output: 42kb gzipped |
      </text>
      <rect x="20" y="210" width="220" height="2" rx="1" fill="#3f3f46" />

      {/* Cursor */}
      <text x="20" y="244" fontSize="13" fontFamily="monospace" fill="#a1a1aa">
        $
      </text>
      <rect x="34" y="232" width="8" height="16" fill="#a1a1aa" opacity="0.7" />
    </svg>
  );
}

function DocumentVisual() {
  return (
    <svg viewBox="0 0 360 240" fill="none" className={styles.visualSvg}>
      <defs>
        <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b2d5ff" />
          <stop offset="100%" stopColor="#dfd1ff" />
        </linearGradient>
      </defs>

      {/* Document page */}
      <rect x="60" y="16" width="160" height="208" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />

      {/* Header text lines */}
      <rect x="76" y="32" width="80" height="4" rx="2" fill="#52525b" />
      <rect x="76" y="42" width="60" height="4" rx="2" fill="#3f3f46" />

      {/* Data rows */}
      <rect x="76" y="60" width="128" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="70" width="110" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="80" width="120" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="90" width="100" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="100" width="128" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="110" width="90" height="3" rx="1.5" fill="#27272a" />

      {/* Highlighted extracted row */}
      <rect x="72" y="124" width="140" height="14" rx="3" fill="url(#docGrad)" opacity="0.12" />
      <rect x="76" y="129" width="100" height="3" rx="1.5" fill="url(#docGrad)" opacity="0.8" />

      <rect x="76" y="146" width="115" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="156" width="105" height="3" rx="1.5" fill="#27272a" />
      <rect x="76" y="166" width="128" height="3" rx="1.5" fill="#27272a" />

      {/* Scan line */}
      <line x1="60" y1="190" x2="220" y2="190" stroke="url(#docGrad)" strokeWidth="1.5" opacity="0.5" />

      {/* Extraction arrow + output card */}
      <line x1="230" y1="120" x2="260" y2="120" stroke="#52525b" strokeWidth="1.5" />
      <polygon points="258,116 266,120 258,124" fill="#52525b" />

      <rect x="272" y="60" width="72" height="120" rx="4" fill="#18181b" stroke="url(#docGrad)" strokeWidth="1" opacity="0.6" />
      <rect x="282" y="74" width="52" height="3" rx="1.5" fill="url(#docGrad)" opacity="0.5" />
      <rect x="282" y="84" width="40" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="282" y="94" width="48" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="282" y="108" width="52" height="3" rx="1.5" fill="url(#docGrad)" opacity="0.5" />
      <rect x="282" y="118" width="36" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="282" y="128" width="44" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="282" y="142" width="52" height="3" rx="1.5" fill="url(#docGrad)" opacity="0.5" />
      <rect x="282" y="152" width="40" height="3" rx="1.5" fill="#3f3f46" />
      <rect x="282" y="162" width="48" height="3" rx="1.5" fill="#3f3f46" />
    </svg>
  );
}

function ChatVisual() {
  return (
    <svg viewBox="0 0 360 240" fill="none" className={styles.visualSvg}>
      <defs>
        <linearGradient id="chatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b2d5ff" />
          <stop offset="100%" stopColor="#dfd1ff" />
        </linearGradient>
      </defs>

      {/* Chat window frame */}
      <rect x="40" y="12" width="280" height="216" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1" />

      {/* Header bar */}
      <rect x="40" y="12" width="280" height="32" rx="8" fill="#1c1c1f" />
      <rect x="40" y="36" width="280" height="8" fill="#1c1c1f" />
      <circle cx="60" cy="28" r="4" fill="url(#chatGrad)" opacity="0.7" />
      <rect x="72" y="24" width="48" height="4" rx="2" fill="#52525b" />
      <rect x="72" y="32" width="32" height="3" rx="1.5" fill="#3f3f46" />

      {/* Bot message 1 */}
      <rect x="56" y="56" width="140" height="28" rx="10" fill="#27272a" />
      <rect x="68" y="66" width="80" height="3" rx="1.5" fill="#71717a" />
      <rect x="68" y="74" width="60" height="3" rx="1.5" fill="#71717a" />

      {/* User message */}
      <rect x="164" y="96" width="140" height="22" rx="10" fill="url(#chatGrad)" opacity="0.2" />
      <rect x="178" y="104" width="90" height="3" rx="1.5" fill="url(#chatGrad)" opacity="0.7" />
      <rect x="198" y="111" width="60" height="3" rx="1.5" fill="url(#chatGrad)" opacity="0.5" />

      {/* Bot message 2 */}
      <rect x="56" y="130" width="170" height="40" rx="10" fill="#27272a" />
      <rect x="68" y="140" width="100" height="3" rx="1.5" fill="#71717a" />
      <rect x="68" y="148" width="120" height="3" rx="1.5" fill="#71717a" />
      <rect x="68" y="156" width="80" height="3" rx="1.5" fill="#71717a" />

      {/* Typing indicator */}
      <rect x="56" y="182" width="52" height="20" rx="10" fill="#27272a" />
      <circle cx="72" cy="192" r="3" fill="#52525b" />
      <circle cx="82" cy="192" r="3" fill="#52525b" opacity="0.7" />
      <circle cx="92" cy="192" r="3" fill="#52525b" opacity="0.4" />

      {/* Input bar */}
      <rect x="52" y="210" width="256" height="10" rx="5" fill="#1c1c1f" stroke="#3f3f46" strokeWidth="0.5" />
    </svg>
  );
}

export default function PlaceholderVisual({ variant, imageSrc }: PlaceholderVisualProps) {
  switch (variant) {
    case "dashboard":
      return <Dashboard />;
    case "terminal":
      return <Terminal />;
    case "document":
      return <DocumentVisual />;
    case "chat":
      return <ChatVisual />;
    case "image":
      return (
        <img
          src={imageSrc}
          alt=""
          className={styles.visualImg}
        />
      );
  }
}
