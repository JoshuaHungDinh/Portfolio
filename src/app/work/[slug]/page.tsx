import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  BackLink,
  CaseStudyHero,
  Section,
  CodeBlock,
  MetricCard,
  CaseStudyFooter,
  ScoringDiagram,
  PipelineDiagram,
} from "@/features/work/components";
import styles from "./page.module.scss";

const caseStudies: Record<string, { title: string; description: string }> = {
  yieldstream: {
    title: "YieldStream | Joshua Dinh",
    description:
      "Case study: building an underwriting intelligence platform for MCA brokers.",
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return { title: study.title, description: study.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "yieldstream") {
    notFound();
  }

  return <YieldStreamCaseStudy />;
}

/* ═══════════════════════════════════════════════════════════
   YIELDSTREAM CASE STUDY
   ═══════════════════════════════════════════════════════════ */

function YieldStreamCaseStudy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <BackLink />
      </nav>

      <div className={styles.container}>
        <CaseStudyHero
          index="01"
          category="FOUNDER + LEAD ENGINEER / YIELDSTREAM LLC / 2025—PRESENT"
          name="YieldStream"
          trademark="TM"
          subtitle="An underwriting intelligence platform that replaces gut-feel lender routing with a three-layer scoring model, document parsing, and outcome-based learning."
          tags={[
            "Next.js 15",
            "Supabase",
            "TypeScript",
            "Gemini AI",
            "Python",
            "Inngest",
          ]}
          status="In production"
          year="2025"
        />

        <div className={styles.sections}>
          {/* ═══ 1. THE PROBLEM ═══ */}
          <Section number="01" title="The problem">
            <p>
              Merchant cash advance brokers operate in a market that moves on
              instinct. A merchant submits a funding application. The broker
              glances at a bank statement, eyeballs the daily balance, and
              routes the deal to whichever lender they have the strongest
              relationship with. If that lender declines, the broker tries
              the next name on their mental list. Repeat until someone bites
              or the deal dies.
            </p>
            <p>
              The numbers tell the story. Industry pull-through rates — the
              percentage of submissions that actually fund — hover between{" "}
              <strong>15% and 25%</strong>. A broker doing $5M/month in
              submissions at a 20% pull-through is leaving $750K+ in
              potential funded volume on the table compared to a 35%
              pull-through. On the lender side, underwriters are drowning in
              misrouted deals that never should have reached their desk.
            </p>
            <p>
              Existing tools don&apos;t address this. Generic CRMs like Salesforce
              and HubSpot are agnostic to the MCA workflow. They can track
              that a deal was submitted, but they can&apos;t tell you which lender
              is most likely to fund it. The purpose-built MCA platforms that
              do exist are largely 2010s-era PHP applications — functional
              for status tracking, useless for decision support. Nobody has
              built a scoring layer that actually predicts which lender will
              fund a given merchant profile.
            </p>
            <p>
              The founding insight was that this is fundamentally a{" "}
              <strong>data problem, not a workflow problem</strong>. Every
              funded deal generates signal: which lender funded it, what the
              merchant&apos;s financials looked like, how long it took, what
              terms were offered. That signal is sitting in spreadsheets and
              email threads. If you could structure it and score against it,
              you could replace gut feel with informed recommendations.
            </p>
          </Section>

          {/* ═══ 2. THE CONSTRAINTS ═══ */}
          <Section number="02" title="The constraints">
            <p>
              I built YieldStream solo, which meant every architectural
              decision had to be defensible by one person on call. There was
              no second engineer to debug a 3 AM Kubernetes issue, so the
              infrastructure had to be operationally simple.
            </p>
            <p>
              No external funding. The cost ceiling was real: hosting,
              database, AI inference, document processing — all had to run
              cheaply enough that I wasn&apos;t burning personal savings to keep
              the lights on during pre-revenue development.
            </p>
            <p>
              The MCA industry is opaque by design. There are no public
              lender APIs. No standardized submission format. Lender
              appetite criteria live in PDF rate sheets, email threads, and
              phone calls. Bank statements — the primary underwriting
              document — arrive in{" "}
              <strong>14+ distinct formats</strong> with no consistent
              structure. And all of this data is PII-laden financial
              information subject to multi-state regulatory requirements.
            </p>
          </Section>

          {/* ═══ 3. THE APPROACH ═══ */}
          <Section number="03" title="The approach">
            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>
                A. Three-layer scoring model
              </p>
              <p>
                The obvious approach would be a single ML model trained on
                historical deal outcomes. I rejected it for two reasons:
                interpretability and the cold-start problem. On day one, I
                had zero historical funded-deal data. A black-box model
                would produce numbers nobody trusted. I needed a system that
                could produce defensible scores from rules-based signals
                first, then refine with data as outcomes accumulated.
              </p>
              <p>
                The three layers, each scored 0-100 and weighted into a
                composite:
              </p>
              <ul>
                <li>
                  <strong>Global score (25%)</strong> — Market signal.
                  Aggregates anonymized funding outcomes from all
                  organizations with time-decay weighting. Deals from the
                  last 30 days get full weight; 90+ days get 0.2x. Answers:
                  is this lender actively funding deals like this?
                </li>
                <li>
                  <strong>Relationship score (50%)</strong> — Pull-through
                  rate. The broker&apos;s own history with each lender,
                  time-weighted. This is the primary differentiator — weighted
                  at 2x the other layers because a broker&apos;s specific
                  relationship with a lender is the strongest predictive
                  signal. A +15% bonus kicks in when pull-through exceeds
                  60% with 3+ funded deals.
                </li>
                <li>
                  <strong>Attribute score (25%)</strong> — Risk match. Does
                  the merchant&apos;s financial profile (FICO, revenue, NSF
                  count, daily balance, position count) fit the lender&apos;s
                  stated buy box? Hard disqualification rules force the
                  score to zero if the merchant violates a lender&apos;s
                  restricted states, industries, or minimum thresholds.
                </li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>
                B. Document intelligence
              </p>
              <p>
                Before scoring could work, I needed structured data from
                unstructured bank statements. I built a multi-tier parsing
                pipeline: bank-specific templates first for highest accuracy
                (Chase, BofA, Wells Fargo, and 9 others), generic
                structural extraction as a middle tier, and LLM-based
                extraction as the final fallback. This was later extracted
                into Ledger as a standalone service.
              </p>
            </div>

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>
                C. Outcome-based learning
              </p>
              <p>
                When a deal funds or gets declined, the system captures a
                snapshot: the merchant&apos;s profile at submission time, the
                bank intelligence at that moment, and the prediction that
                was made. It records the actual outcome alongside the
                predicted probability and calculates variance. Declines
                trigger temporary score penalties on the responsible lender
                — categorized by reason (credit quality, NSF, stacking
                limit) — that auto-expire after 30 days. The system gets
                sharper with every closed deal.
              </p>
            </div>

            <ScoringDiagram />
          </Section>

          {/* ═══ 4. THE BUILD ═══ */}
          <Section number="04" title="The build">
            <p>
              <strong>Next.js 15 with App Router</strong> for the frontend
              and API layer. Not because it was trendy — because server
              actions + React Server Components let me colocate data
              fetching with UI without maintaining a separate API service.
              For a solo developer, that&apos;s one fewer deployment to manage,
              one fewer repo to maintain.
            </p>
            <p>
              <strong>Supabase (PostgreSQL)</strong> as the database, auth
              provider, file storage, and realtime layer. The key
              architectural decision was using{" "}
              <strong>Row-Level Security</strong> for multi-tenant
              isolation. Every table is scoped by{" "}
              <code className={styles.inlineCode}>org_id</code>, enforced
              at the database level via a{" "}
              <code className={styles.inlineCode}>
                get_my_org_id()
              </code>{" "}
              SQL function. No ORM — direct Supabase client calls with RLS
              doing the heavy lifting. This means even if application code
              has a bug, tenant data can&apos;t leak across organizations.
            </p>
            <p>
              <strong>The scoring engine</strong> is pure TypeScript. No ML
              libraries, no model files. The three layers compute
              independently and blend via weighted sum:
            </p>

            <CodeBlock
              language="TypeScript"
              filename="lenderMatcher.ts"
              code={`const SCORING_WEIGHTS = {
  global: 0.25,
  relationship: 0.5,
  attribute: 0.25,
};

const RELATIONSHIP_MULTIPLIER = 1.15; // +15% for strong pull-through
const PREDICTION_TTL_HOURS = 24;
const MAX_REASONING = 3; // Gemini calls limited to top 3 lenders`}
            />

            <p>
              Attribute scoring applies a base of 50 and adjusts by factor.
              Revenue at 2x the lender&apos;s minimum adds +20. FICO above 700
              adds +15. More than 5 NSFs in 30 days penalizes -25. The
              scoring is deterministic and auditable — every point can be
              traced to a specific signal.
            </p>
            <p>
              <strong>Gemini 2.0 Flash Lite</strong> handles two tasks: bank
              statement analysis (extracting 20+ financial metrics from
              OCR&apos;d text) and lender reasoning (generating natural-language
              explanations for the top 3 recommendations). I call Gemini
              only for the top 3 scored lenders, not all of them — a
              deliberate cost optimization on the free tier&apos;s 15 RPM limit.
            </p>
            <p>
              <strong>Inngest</strong> orchestrates all background work:
              document parsing, AI enrichment, prediction generation,
              outcome recording, decline intelligence, renewal alerts, and
              credit resets. Each function is a discrete, retryable step
              function — if Gemini rate-limits, the enrichment job retries
              without re-running the parsing step.
            </p>

            <PipelineDiagram />

            <p>
              The document parser is a{" "}
              <strong>Python FastAPI microservice</strong> with a 5-tier
              extraction cascade: pdfplumber handles 90% of text-based
              PDFs, PyMuPDF catches encrypted files, Tesseract OCR
              processes scanned images, LlamaParse serves as an
              intermediate fallback, and Gemini AI is the final safety net.
              Twelve bank-specific templates (Chase, BofA, Wells Fargo, TD,
              PNC, and 7 others) provide high-accuracy extraction before
              the generic fallback fires. When an unrecognized bank
              accumulates 5+ processed statements, the system automatically
              flags it for template creation.
            </p>
          </Section>

          {/* ═══ 5. THE HARD PARTS ═══ */}
          <Section number="05" title="The hard parts">
            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Killing LlamaParse
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  The initial document pipeline relied on LlamaParse, a
                  cloud-hosted PDF extraction service. It worked — until it
                  didn&apos;t. Latency averaged 60 seconds per document. The API
                  cost scaled linearly with volume. And critically, I had no
                  control over extraction quality or the ability to build
                  bank-specific parsing rules.
                </p>
                <p>
                  I replaced it with a local Python FastAPI service in a
                  single sprint. pdfplumber alone handled 90% of incoming
                  PDFs. Adding bank-specific templates (starting with Chase
                  and BofA, the two highest-volume banks) pushed extraction
                  accuracy above what LlamaParse was producing. The cascade
                  fallback meant no single tier&apos;s failure could block the
                  pipeline. Processing time dropped from 60 seconds to under
                  2 seconds for template-matched documents.
                </p>
              </div>
            </div>

            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                The IDOR that almost shipped
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  During a security audit of my own API routes, I found that
                  the prediction accuracy endpoint accepted{" "}
                  <code className={styles.inlineCode}>org_id</code> as a
                  query parameter. Any authenticated user could pass a
                  different org&apos;s ID and read their prediction data. The
                  fix was straightforward — derive org_id from the
                  authenticated profile, never from the request — but it
                  exposed a broader pattern. I spent the next week wrapping
                  every mutation endpoint in a{" "}
                  <code className={styles.inlineCode}>secureApiHandler</code>{" "}
                  utility and adding{" "}
                  <code className={styles.inlineCode}>requireRole</code>{" "}
                  checks to every server action. The lesson: RLS protects
                  the database layer, but API routes need their own
                  authorization gate.
                </p>
              </div>
            </div>

            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                The global pool cold-start
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  The global score layer depends on anonymized cross-org
                  outcomes. With zero organizations and zero outcomes, the
                  entire layer returned 50 (the fallback) for every lender.
                  Relationship scores were similarly empty. In practice,
                  early predictions were driven almost entirely by the
                  attribute score — pure buy-box matching. I added a{" "}
                  <code className={styles.inlineCode}>confidence_level</code>{" "}
                  field and a short TTL (5 minutes) for fallback-dominated
                  predictions, so the UI could surface a clear signal:
                  &quot;these scores will improve as you record outcomes.&quot;
                  The system was honest about its own uncertainty. [TK:
                  specific feedback from early pilot users on how this
                  affected trust]
                </p>
              </div>
            </div>
          </Section>

          {/* ═══ 6. THE OUTCOME ═══ */}
          <Section number="06" title="The outcome">
            <p>
              YieldStream is in production on Vercel, pre-revenue. The
              platform is feature-complete for the core workflow: merchant
              intake, document parsing with AI enrichment, three-layer
              lender scoring with Gemini reasoning, submission tracking
              through to funded deal, and outcome-based model refinement.
            </p>
            <p>
              The system processes bank statements through 12 bank-specific
              templates with a 5-tier extraction cascade. It scores
              merchants against lender buy boxes using deterministic rules,
              augmented by Gemini-generated reasoning for the top 3
              matches. Every funded or declined deal feeds back into the
              scoring model through the outcome recording pipeline.
            </p>
            <p>
              What I built alone in months would have been a team effort at
              a funded startup. The codebase is a single Next.js monolith
              with one Python microservice, zero Kubernetes, zero Redis —
              and it handles the full lifecycle from document OCR to lender
              recommendation to portfolio analytics.
            </p>

            <div className={styles.metricsRow}>
              <MetricCard
                value="19+"
                label="Database tables"
                sublabel="40+ indexes, full RLS"
              />
              <MetricCard
                value="12"
                label="Bank templates"
                sublabel="Auto-flagging for new banks"
              />
              <MetricCard
                value="13"
                label="Background jobs"
                sublabel="Inngest step functions"
              />
              <MetricCard
                value="62"
                label="Parser tests"
                sublabel="Across 6 test suites"
              />
            </div>
          </Section>

          {/* ═══ 7. EXTRACTING LEDGER ═══ */}
          <Section number="07" title="Extracting Ledger">
            <p>
              Six months into building YieldStream, I realized the document
              parsing pipeline had become the most reusable piece of the
              system. Bank statement parsing isn&apos;t unique to MCA — any
              fintech product that underwrites against bank data needs the
              same capability. Keeping it coupled to YieldStream&apos;s codebase
              meant it could only serve one product.
            </p>
            <p>
              I extracted the parser into{" "}
              <strong>Ledger</strong>, a standalone document intelligence
              service with its own API, its own test suite (62 tests across
              6 suites), and its own deployment. The separation was
              architectural, not cosmetic:
            </p>
            <ul>
              <li>
                <strong>Separation of concerns.</strong> YieldStream is the
                CRM and intelligence layer. Ledger is the data extraction
                layer. Each can evolve independently.
              </li>
              <li>
                <strong>Independent scaling.</strong> Document parsing is
                bursty and CPU-heavy (OCR, PDF manipulation). Scoring is
                steady and database-heavy. Different scaling profiles need
                different infrastructure.
              </li>
              <li>
                <strong>Reusability.</strong> Ledger can serve other
                products — or be offered as a standalone API to other
                fintechs that need bank statement extraction.
              </li>
              <li>
                <strong>API-first design.</strong> Forcing communication
                through an API contract eliminated implicit coupling. If
                Ledger&apos;s internal parsing logic changes, YieldStream
                doesn&apos;t need to redeploy.
              </li>
            </ul>
            <p>
              This wasn&apos;t premature abstraction. It was platform thinking —
              structuring a product family instead of building features.
            </p>
          </Section>

          {/* ═══ 8. WHAT'S NEXT ═══ */}
          <Section number="08" title="What&apos;s next">
            <p>
              The immediate roadmap: onboard the first pilot brokers and
              accumulate real outcome data. The scoring model is designed to
              improve with volume, but that improvement is theoretical
              until real deals flow through it.
            </p>
            <p>
              On the technical side, I&apos;m watching three areas. First,
              the in-memory rate limiter needs to move to Redis before
              horizontal scaling. Second, the analytics layer is read-only
              and dashboard-scoped — a proper BI integration (or
              materialized views for complex aggregations) would serve
              power users better. Third, I chose not to build a mobile app.
              Brokers work from their desks. If that assumption proves
              wrong, the API-first architecture makes a mobile client
              straightforward to add.
            </p>
          </Section>
        </div>

        <CaseStudyFooter
          stack={[
            "Next.js 15",
            "React 19",
            "TypeScript",
            "Supabase",
            "PostgreSQL",
            "Gemini AI",
            "Python",
            "FastAPI",
            "Inngest",
            "Vercel",
            "Stripe",
          ]}
          links={[
            { label: "Ledger case study", href: "/work/yieldstream-qualify" },
            { label: "Back to portfolio", href: "/" },
          ]}
          updatedAt="April 2026"
        />
      </div>
    </div>
  );
}
