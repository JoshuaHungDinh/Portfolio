import styles from "./Diagram.module.scss";

export default function ExtractionCascadeDiagram() {
  const tiers = [
    { name: "pdfplumber", speed: "~200ms", coverage: "90% of text PDFs", color: "#4ade80" },
    { name: "PyMuPDF", speed: "~300ms", coverage: "Encrypted / corrupted", color: "#b2d5ff" },
    { name: "Tesseract OCR", speed: "5-10s", coverage: "Scanned images", color: "#dfd1ff" },
    { name: "LlamaParse", speed: "~30s", coverage: "Cloud fallback", color: "#a1a1aa" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Extraction cascade with auto-escalation</div>

      <svg
        viewBox="0 0 720 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* Input */}
        <rect x="10" y="100" width="100" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x="60" y="123" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="var(--font-mono)">PDF INPUT</text>
        <text x="60" y="140" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="var(--font-sans)">Any format</text>

        {/* Quality gate */}
        <line x1="110" y1="128" x2="145" y2="128" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="145" y="96" width="90" height="64" rx="8" fill="rgba(74,222,128,0.04)" stroke="rgba(74,222,128,0.2)" />
        <text x="190" y="118" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">QUALITY</text>
        <text x="190" y="132" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">GATE</text>
        <text x="190" y="148" textAnchor="middle" fill="#52525b" fontSize="8" fontFamily="var(--font-sans)">Blur / DPI / skew</text>

        {/* Arrow to tiers */}
        <line x1="235" y1="128" x2="275" y2="128" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Tier boxes */}
        {tiers.map((tier, i) => {
          const y = 20 + i * 58;
          return (
            <g key={tier.name}>
              <rect x="280" y={y} width="200" height="46" rx="6" fill={`${tier.color}08`} stroke={`${tier.color}30`} />
              <text x="296" y={y + 18} fill={tier.color} fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                T{i + 1}
              </text>
              <text x="318" y={y + 18} fill="#ededed" fontSize="10" fontFamily="var(--font-mono)">
                {tier.name}
              </text>
              <text x="296" y={y + 34} fill="#52525b" fontSize="9" fontFamily="var(--font-sans)">
                {tier.speed} &middot; {tier.coverage}
              </text>

              {/* Escalation arrow between tiers */}
              {i < tiers.length - 1 && (
                <g>
                  <line x1="490" y1={y + 23} x2="490" y2={y + 58} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="502" y={y + 46} fill="#3f3f46" fontSize="8" fontFamily="var(--font-mono)">&lt;100 chars</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Connect quality gate to tier stack */}
        <line x1="275" y1="128" x2="280" y2="43" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="275" y1="128" x2="280" y2="101" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="275" y1="128" x2="280" y2="159" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="275" y1="128" x2="280" y2="217" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Output */}
        <rect x="540" y="80" width="160" height="96" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x="620" y="106" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">STRUCTURED OUTPUT</text>
        <text x="620" y="124" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="var(--font-sans)">Text + tables</text>
        <text x="620" y="140" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="var(--font-sans)">Tier logs</text>
        <text x="620" y="156" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="var(--font-sans)">Confidence scores</text>
        <text x="620" y="168" textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="var(--font-sans)">Template match</text>

        {/* Arrows to output */}
        <line x1="480" y1="43" x2="540" y2="120" stroke="rgba(74,222,128,0.2)" strokeWidth="1" />
        <line x1="480" y1="101" x2="540" y2="125" stroke="rgba(178,213,255,0.2)" strokeWidth="1" />
        <line x1="480" y1="159" x2="540" y2="135" stroke="rgba(223,209,255,0.2)" strokeWidth="1" />
        <line x1="480" y1="217" x2="540" y2="148" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>
    </div>
  );
}
