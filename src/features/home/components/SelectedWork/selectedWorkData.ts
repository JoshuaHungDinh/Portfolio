export interface Project {
  index: string;
  category: string;
  name: string;
  trademark: "TM" | "R" | "";
  description: string;
  tags: string[];
  visual: "dashboard" | "terminal" | "document" | "chat" | "image";
  imageSrc?: string;
  label: string;
  href: string;
}

export const projects: Project[] = [
  {
    index: "01",
    category: "SOFTWARE ENGINEER / YIELDSTREAM / 2025",
    name: "YieldStream",
    trademark: "TM",
    description:
      "An underwriting platform for MCA brokers. Replaces gut-feel lender routing with data-driven recommendations — combining a three-layer scoring model with AI enrichment and outcome-based learning.",
    tags: ["Next.js", "Supabase", "AI/ML", "TypeScript"],
    visual: "image",
    imageSrc: "/ys-marketing-page.png",
    label: "YIELDSTREAM/PLATFORM",
    href: "/work/yieldstream",
  },
  {
    index: "02",
    category: "SOFTWARE ENGINEER / LIQUID WEB INC / 2022—2025",
    name: "GiveWP",
    trademark: "",
    description:
      "The leading WordPress donation plugin, powering 100k+ nonprofits. Built and maintained fundraising forms, payment gateway integrations, and donor management features.",
    tags: ["WordPress", "PHP", "React", "Stripe"],
    visual: "image",
    imageSrc: "/givewp-form.png",
    label: "GIVEWP/DONATION-FORM",
    href: "/work/givewp",
  },
  {
    index: "03",
    category: "DOCUMENT INTELLIGENCE / FINANCIAL STATEMENT EXTRACTION",
    name: "Ledger",
    trademark: "TM",
    description:
      "Production document intelligence service for bank statements and tax returns. Multi-tier parsing pipeline, 14 bank templates, 25+ risk indicators, balance reconciliation, and PII redaction — extracted from YieldStream's underwriting platform as a standalone API.",
    tags: [],
    visual: "image",
    imageSrc: "/ys-ledger-image.png",
    label: "LEDGER/API",
    href: "/work/yieldstream-qualify",
  },
  {
    index: "04",
    category: "EMBEDDABLE AI CHAT / MULTI-TENANT SAAS WIDGET",
    name: "BubbleChat",
    trademark: "",
    description:
      "Embeddable AI chat with a multi-tenant FastAPI backend. Vanilla TypeScript web component (shadow DOM, zero dependencies), async SQLite/Postgres, streaming responses via SSE, and a React admin dashboard with live preview for prompts and styling.",
    tags: [],
    visual: "image",
    imageSrc: "/bubble-chat-image.png",
    label: "BUBBLECHAT/WIDGET",
    href: "/work/bubble-chat",
  },
];
