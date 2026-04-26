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
    category: "SOFTWARE DEVELOPER / APRIL 2022 — NOV 2025 / LIQUID WEB INC",
    name: "GiveWP",
    trademark: "",
    description:
      "The leading WordPress donation plugin powering 100k+ nonprofits. Built and maintained fundraising forms, payment gateway integrations, and donor management features.",
    tags: ["WordPress", "PHP", "React", "Stripe"],
    visual: "dashboard",
    label: "GIVEWP/PLATFORM",
    href: "/work/givewp",
  },
  {
    index: "02",
    category: "CO-FOUNDER / FULL-STACK DEVELOPER",
    name: "YieldStream",
    trademark: "",
    description:
      "A submission intelligence platform for MCA brokers. Replaces gut-feel lender routing with data-driven ranked recommendations using a three-layer scoring model, AI data enrichment, automated underwriting, and outcome-based learning.",
    tags: ["Next.js", "Supabase", "AI/ML", "TypeScript"],
    visual: "image",
    imageSrc: "/ys-marketing-page.png",
    label: "YIELDSTREAM/PLATFORM",
    href: "/work/yieldstream",
  },
  {
    index: "03",
    category: "DOCUMENT INTELLIGENCE / PYTHON",
    name: "Financial Statement Extraction",
    trademark: "",
    description:
      "OCR-powered API that extracts structured financial data from bank statements and tax returns using a multi-tier parsing pipeline with 14 bank templates and 25+ risk indicators.",
    tags: [],
    visual: "document",
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
