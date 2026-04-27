import styles from "./Diagram.module.scss";

export default function FormBuilderDiagram() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        Visual form builder architecture — Gutenberg block editor
      </div>
      <svg
        viewBox="0 0 800 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* Block Editor Shell */}
        <rect
          x="20"
          y="20"
          width="760"
          height="300"
          rx="10"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="4 4"
        />
        <text
          x="40"
          y="46"
          fill="#52525b"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="0.05em"
        >
          REACT 18 + WORDPRESS DATA LAYER
        </text>

        {/* Provider Stack */}
        <rect
          x="40"
          y="60"
          width="150"
          height="120"
          rx="8"
          fill="rgba(223,209,255,0.06)"
          stroke="rgba(223,209,255,0.25)"
        />
        <text
          x="115"
          y="84"
          textAnchor="middle"
          fill="#dfd1ff"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          PROVIDERS
        </text>
        <text
          x="115"
          y="104"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          EditorState
        </text>
        <text
          x="115"
          y="120"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          FormState
        </text>
        <text
          x="115"
          y="136"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Shortcut
        </text>
        <text
          x="115"
          y="152"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          ErrorBoundary
        </text>

        {/* Arrow: Providers -> Canvas */}
        <line
          x1="190"
          y1="120"
          x2="230"
          y2="120"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />

        {/* Canvas / Block Editor */}
        <rect
          x="230"
          y="60"
          width="190"
          height="120"
          rx="8"
          fill="rgba(178,213,255,0.06)"
          stroke="rgba(178,213,255,0.25)"
        />
        <text
          x="325"
          y="84"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          BLOCK CANVAS
        </text>
        <text
          x="325"
          y="104"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          @wordpress/block-editor
        </text>
        <text
          x="325"
          y="120"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Drag-and-drop blocks
        </text>
        <text
          x="325"
          y="136"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Iframe preview
        </text>
        <text
          x="325"
          y="152"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Responsive modes
        </text>

        {/* Arrow: Canvas -> Sidebar */}
        <line
          x1="420"
          y1="120"
          x2="460"
          y2="120"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />

        {/* Sidebar / Settings */}
        <rect
          x="460"
          y="60"
          width="150"
          height="120"
          rx="8"
          fill="rgba(178,213,255,0.06)"
          stroke="rgba(178,213,255,0.25)"
        />
        <text
          x="535"
          y="84"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          SIDEBAR
        </text>
        <text
          x="535"
          y="104"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Block settings
        </text>
        <text
          x="535"
          y="120"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Form settings
        </text>
        <text
          x="535"
          y="136"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Email templates
        </text>
        <text
          x="535"
          y="152"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          Design controls
        </text>

        {/* Arrow: Sidebar -> PHP */}
        <line
          x1="610"
          y1="120"
          x2="640"
          y2="120"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />

        {/* PHP Backend */}
        <rect
          x="640"
          y="60"
          width="120"
          height="120"
          rx="8"
          fill="rgba(74,222,128,0.06)"
          stroke="rgba(74,222,128,0.25)"
        />
        <text
          x="700"
          y="84"
          textAnchor="middle"
          fill="#4ade80"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          PHP BACKEND
        </text>
        <text
          x="700"
          y="104"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          ServiceProvider
        </text>
        <text
          x="700"
          y="120"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          BlockModels
        </text>
        <text
          x="700"
          y="136"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          REST Routes
        </text>
        <text
          x="700"
          y="152"
          textAnchor="middle"
          fill="#71717a"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          ViewModels
        </text>

        {/* Block Types Row */}
        <text
          x="40"
          y="215"
          fill="#52525b"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="0.05em"
        >
          REGISTERED BLOCKS
        </text>

        {/* Block: Amount */}
        <rect
          x="40"
          y="230"
          width="100"
          height="48"
          rx="6"
          fill="rgba(178,213,255,0.04)"
          stroke="rgba(178,213,255,0.15)"
        />
        <text
          x="90"
          y="250"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Amount
        </text>
        <text
          x="90"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Input field
        </text>

        {/* Block: Donor Info */}
        <rect
          x="155"
          y="230"
          width="100"
          height="48"
          rx="6"
          fill="rgba(178,213,255,0.04)"
          stroke="rgba(178,213,255,0.15)"
        />
        <text
          x="205"
          y="250"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Donor Info
        </text>
        <text
          x="205"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Name, email
        </text>

        {/* Block: Payment */}
        <rect
          x="270"
          y="230"
          width="100"
          height="48"
          rx="6"
          fill="rgba(178,213,255,0.04)"
          stroke="rgba(178,213,255,0.15)"
        />
        <text
          x="320"
          y="250"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Gateways
        </text>
        <text
          x="320"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Stripe, PayPal
        </text>

        {/* Block: Email Addons */}
        <rect
          x="385"
          y="230"
          width="100"
          height="48"
          rx="6"
          fill="rgba(223,209,255,0.06)"
          stroke="rgba(223,209,255,0.25)"
        />
        <text
          x="435"
          y="250"
          textAnchor="middle"
          fill="#dfd1ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Mailchimp
        </text>
        <text
          x="435"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Addon block
        </text>

        {/* Block: Constant Contact */}
        <rect
          x="500"
          y="230"
          width="120"
          height="48"
          rx="6"
          fill="rgba(223,209,255,0.06)"
          stroke="rgba(223,209,255,0.25)"
        />
        <text
          x="560"
          y="250"
          textAnchor="middle"
          fill="#dfd1ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Constant Contact
        </text>
        <text
          x="560"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Addon block
        </text>

        {/* Block: Terms */}
        <rect
          x="635"
          y="230"
          width="125"
          height="48"
          rx="6"
          fill="rgba(178,213,255,0.04)"
          stroke="rgba(178,213,255,0.15)"
        />
        <text
          x="697"
          y="250"
          textAnchor="middle"
          fill="#b2d5ff"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          Terms / Consent
        </text>
        <text
          x="697"
          y="266"
          textAnchor="middle"
          fill="#52525b"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          Compliance
        </text>

        {/* Dashed line connecting blocks to canvas */}
        <line
          x1="325"
          y1="180"
          x2="325"
          y2="225"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}
