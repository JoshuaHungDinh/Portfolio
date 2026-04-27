import styles from "./Diagram.module.scss";

export default function PipelineDiagram() {
  const stages = [
    { label: "UPLOAD", sub: "Vault storage", color: "#a1a1aa" },
    { label: "CLASSIFY", sub: "11 doc types", color: "#a1a1aa" },
    { label: "EXTRACT", sub: "5-tier cascade", color: "#b2d5ff" },
    { label: "ENRICH", sub: "Gemini AI", color: "#dfd1ff" },
    { label: "SCORE", sub: "3-layer model", color: "#4ade80" },
  ];

  const tiers = [
    { name: "pdfplumber", note: "90% of PDFs" },
    { name: "PyMuPDF", note: "Encrypted PDFs" },
    { name: "Tesseract OCR", note: "Scanned images" },
    { name: "LlamaParse", note: "Free tier fallback" },
    { name: "Gemini", note: "Final fallback" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Document intelligence pipeline</div>

      <div className={styles.pipeline}>
        {stages.map((stage, i) => (
          <div key={stage.label} className={styles.stageGroup}>
            <div className={styles.stage} style={{ borderColor: `${stage.color}33` }}>
              <span className={styles.stageLabel} style={{ color: stage.color }}>
                {stage.label}
              </span>
              <span className={styles.stageSub}>{stage.sub}</span>
            </div>
            {i < stages.length - 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" className={styles.arrow}>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className={styles.tierSection}>
        <span className={styles.tierTitle}>Extraction cascade (Tier 1 &rarr; Tier 5)</span>
        <div className={styles.tiers}>
          {tiers.map((tier, i) => (
            <div key={tier.name} className={styles.tier}>
              <span className={styles.tierNumber}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.tierName}>{tier.name}</span>
              <span className={styles.tierNote}>{tier.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
