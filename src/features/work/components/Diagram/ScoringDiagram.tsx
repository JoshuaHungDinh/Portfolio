import styles from "./Diagram.module.scss";

export default function ScoringDiagram() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Three-layer scoring architecture</div>
      <svg
        viewBox="0 0 800 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* Input node */}
        <rect x="20" y="140" width="130" height="60" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x="85" y="165" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="var(--font-mono)">MERCHANT</text>
        <text x="85" y="182" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="var(--font-mono)">PROFILE</text>

        {/* Arrows from input to three layers */}
        <line x1="150" y1="155" x2="200" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="150" y1="170" x2="200" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="150" y1="185" x2="200" y2="270" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Global score */}
        <rect x="200" y="30" width="180" height="76" rx="8" fill="rgba(178,213,255,0.06)" stroke="rgba(178,213,255,0.25)" />
        <text x="290" y="56" textAnchor="middle" fill="#b2d5ff" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">GLOBAL SCORE</text>
        <text x="290" y="73" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Market signals / 25%</text>
        <text x="290" y="90" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="var(--font-sans)">Cross-org outcomes, time-decay</text>

        {/* Relationship score */}
        <rect x="200" y="130" width="180" height="76" rx="8" fill="rgba(223,209,255,0.06)" stroke="rgba(223,209,255,0.25)" />
        <text x="290" y="156" textAnchor="middle" fill="#dfd1ff" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">RELATIONSHIP SCORE</text>
        <text x="290" y="173" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Pull-through rate / 50%</text>
        <text x="290" y="190" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="var(--font-sans)">ISO-specific deal history</text>

        {/* Attribute score */}
        <rect x="200" y="230" width="180" height="76" rx="8" fill="rgba(178,213,255,0.06)" stroke="rgba(178,213,255,0.25)" />
        <text x="290" y="256" textAnchor="middle" fill="#b2d5ff" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">ATTRIBUTE SCORE</text>
        <text x="290" y="273" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Risk match / 25%</text>
        <text x="290" y="290" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="var(--font-sans)">Financials vs. buy box</text>

        {/* Arrows to composite */}
        <line x1="380" y1="68" x2="440" y2="155" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="380" y1="168" x2="440" y2="168" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="380" y1="268" x2="440" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Composite score */}
        <rect x="440" y="138" width="140" height="60" rx="8" fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.25)" />
        <text x="510" y="163" textAnchor="middle" fill="#4ade80" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">COMPOSITE</text>
        <text x="510" y="180" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Weighted blend</text>

        {/* Arrow to top 3 */}
        <line x1="580" y1="168" x2="620" y2="168" stroke="rgba(74,222,128,0.2)" strokeWidth="1" />

        {/* Top 3 + Gemini */}
        <rect x="620" y="120" width="160" height="96" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x="700" y="148" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">TOP 3 LENDERS</text>
        <text x="700" y="168" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Gemini reasoning</text>
        <text x="700" y="184" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Estimated terms</text>
        <text x="700" y="200" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="var(--font-sans)">Risk factors</text>
      </svg>
    </div>
  );
}
