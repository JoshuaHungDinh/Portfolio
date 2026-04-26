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
    category: "CO-FOUNDER + LEAD ENGINEER / 2025—PRESENT",
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
    trademark: "R",
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
    trademark: "",
    description:
      "OCR-powered API that extracts structured financial data from bank statements and tax returns using a multi-tier parsing pipeline with 14 bank templates and 25+ risk indicators.",
    tags: [],
    visual: "image",
    imageSrc: "/ys-ledger-image.png",
    label: "QUALIFY/API",
    href: "/work/yieldstream-qualify",
  },
  {
    index: "04",
    category: "FULL-STACK / TYPESCRIPT + PYTHON",
    name: "Chat Widget",
    trademark: "",
    description:
      "Embeddable AI chat widget powered by Gemini with an admin dashboard for managing conversations, JWT auth, and async database operations.",
    tags: [],
    visual: "chat",
    label: "CHAT/WIDGET",
    href: "/work/chat-widget",
  },
];
