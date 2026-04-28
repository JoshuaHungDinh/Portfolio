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
  ExtractionCascadeDiagram,
  FormBuilderDiagram,
} from "@/features/work/components";
import styles from "./page.module.scss";

const caseStudies: Record<string, { title: string; description: string }> = {
  yieldstream: {
    title: "YieldStream | Joshua Dinh",
    description:
      "Case study: building an underwriting intelligence platform for MCA brokers.",
  },
  "yieldstream-qualify": {
    title: "Ledger | Joshua Dinh",
    description:
      "Case study: a document intelligence microservice for financial statement extraction.",
  },
  givewp: {
    title: "GiveWP | Joshua Dinh",
    description:
      "Case study: building the visual donation form builder and shipping two major releases for the leading WordPress donation plugin.",
  },
  "bubble-chat": {
    title: "BubbleChat | Joshua Dinh",
    description:
      "Case study: an embeddable AI chat widget with multi-tenant SaaS backend, admin dashboard, and serverless deployment.",
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

  if (slug === "yieldstream") return <YieldStreamCaseStudy />;
  if (slug === "yieldstream-qualify") return <LedgerCaseStudy />;
  if (slug === "givewp") return <GiveWPCaseStudy />;
  if (slug === "bubble-chat") return <BubbleChatCaseStudy />;

  notFound();
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
              <strong>Gemini 2.0 Flash Lite</strong>{" "}handles two tasks: bank
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

/* ═════════════════════════════════════════════════��═════════
   LEDGER CASE STUDY
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   GIVEWP CASE STUDY
   ═══════════════════════════════════════════════════════════ */

function GiveWPCaseStudy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <BackLink />
      </nav>

      <div className={styles.container}>
        <CaseStudyHero
          index="02"
          category="SOFTWARE ENGINEER / STELLARWP (LIQUID WEB) / 2022—2025"
          name="GiveWP"
          trademark=""
          subtitle="The leading WordPress donation plugin, powering 100,000+ nonprofits. I shipped frontend and full-stack features across two major releases — building the visual form builder, admin dashboard interfaces, and mailing addon integrations."
          tags={[
            "React 18",
            "TypeScript",
            "PHP",
            "WordPress",
            "Gutenberg",
            "SCSS",
          ]}
          status="Open source"
          year="2022—2025"
        />

        <div className={styles.sections}>
          {/* ═══ 1. THE PRODUCT ═══ */}
          <Section number="01" title="The product">
            <p>
              GiveWP is an open-source WordPress plugin that turns any
              WordPress site into a fundraising platform. Donation forms,
              recurring giving, donor management, payment gateway
              integrations, email marketing — it&apos;s a full-stack
              fundraising toolkit that competes with platforms like Donorbox
              and Classy, but runs entirely within WordPress.
            </p>
            <p>
              At the time I joined, GiveWP had{" "}
              <strong>100,000+ active installations</strong> and was the
              most-used donation plugin on WordPress.org. The codebase had
              been in production since 2015 — a mature PHP monolith with
              jQuery-driven admin interfaces and a legacy form editor built
              on WordPress meta boxes.
            </p>
            <p>
              I was hired as a frontend engineer on the core team at
              StellarWP (a division of Liquid Web). Over three years and{" "}
              <strong>253 pull requests</strong>, I worked across the
              full stack — React frontends, PHP service providers, REST API
              endpoints, and addon integrations — shipping features in both
              the <strong>3.0</strong> and <strong>4.0</strong> major
              releases.
            </p>
          </Section>

          {/* ═══ 2. THE FORM BUILDER ═══ */}
          <Section number="02" title="The visual form builder">
            <p>
              The 3.0 release was the biggest rewrite in GiveWP&apos;s
              history — <strong>664,253 lines of code changed</strong>. The
              centerpiece was a completely new visual donation form builder
              that replaced the legacy meta-box editor with a modern
              block-based experience built on the WordPress Gutenberg
              infrastructure.
            </p>
            <p>
              The form builder is a React 18 / TypeScript application that
              runs inside the WordPress admin. It uses{" "}
              <code className={styles.inlineCode}>@wordpress/block-editor</code>,{" "}
              <code className={styles.inlineCode}>@wordpress/data</code>, and{" "}
              <code className={styles.inlineCode}>react-beautiful-dnd</code>{" "}
              for a drag-and-drop editing experience. State management runs
              through a React Context provider stack —{" "}
              <code className={styles.inlineCode}>EditorStateProvider</code>,{" "}
              <code className={styles.inlineCode}>FormStateProvider</code>,
              and{" "}
              <code className={styles.inlineCode}>ShortcutProvider</code>{" "}
              — using <code className={styles.inlineCode}>useReducer</code>{" "}
              with discrete actions for form settings, block state, and
              dirty tracking.
            </p>
            <p>
              The builder renders an iframe preview of the live donation
              form with responsive viewport modes. Blocks span five
              categories — input fields, content, layout, custom fields, and
              addon blocks — each registered through WordPress&apos;s block
              API and backed by a PHP{" "}
              <code className={styles.inlineCode}>BlockModel</code> on the
              server.
            </p>

            <FormBuilderDiagram />

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>My contributions</p>
              <p>
                I built responsive preview modes that replaced the fixed
                sidebar positioning with a width-responsive preview
                container. I worked on the block insertion point indicator,
                modal rendering across iframe contexts, the email template
                settings panel, header image controls with overlay
                configuration, and the onboarding tour flow for new users.
              </p>
              <p>
                I also built the Terms and Conditions block, the anonymous
                donation block with its placeholder UI/UX, and the Donation
                Form Block v3 that supported both reveal and modal display
                modes on the frontend. In the shared{" "}
                <code className={styles.inlineCode}>form-builder-library</code>{" "}
                package, I contributed the BlockNotice component,
                OptionsPanel enhancements, and currency control refactors.
              </p>
            </div>

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>
                Donation amount level descriptions
              </p>
              <p>
                One of the larger features I owned end-to-end was donation
                amount level descriptions — allowing fundraisers to add
                contextual labels to each giving level (e.g., &quot;$25 —
                feeds a family for a week&quot;). This touched 33 files
                across the form builder UI, the migration pipeline, and the
                frontend templates. It required building the settings UI in
                the form builder, writing the v2-to-v3 migration step to
                carry over existing level data, and updating the rendering
                templates to display descriptions across all form designs.
              </p>
            </div>
          </Section>

          {/* ═══ 3. ADMIN DASHBOARD ═══ */}
          <Section number="03" title="Admin dashboard interfaces">
            <p>
              GiveWP&apos;s admin dashboard follows a PHP service provider
              + React frontend pattern. Each entity — donations, donors,
              subscriptions, campaigns — has its own{" "}
              <code className={styles.inlineCode}>ListTable</code>{" "}
              component backed by PHP endpoint classes and consumed by
              React frontends using{" "}
              <code className={styles.inlineCode}>swr</code> for data
              fetching and Chart.js for visualizations.
            </p>
            <p>
              I built the empty state designs for the donation, donor, and
              subscription tables — giving new users a clear onboarding
              path instead of a blank screen. I drove consistency work
              across list table pages, standardizing spacing, typography,
              and interactive patterns.
            </p>
            <p>
              A more substantial piece was adding{" "}
              <strong>stat tiles to the Donor List Table</strong>. This
              required building a new REST API endpoint at{" "}
              <code className={styles.inlineCode}>
                give-api/v2/admin/donors/stats
              </code>{" "}
              on the PHP side and rendering the stat tiles in React on the
              frontend. I followed the same pattern to add subscription
              stats and donor sorting by total amount given.
            </p>
            <p>
              Later, I refactored the Donor Overview page into modular
              container components — extracting tightly coupled rendering
              logic into composable pieces. That single PR touched 645 lines
              and set the pattern the team followed for subsequent admin
              page architectures.
            </p>
          </Section>

          {/* ═══ 4. MAILING ADDON MIGRATIONS ═══ */}
          <Section number="04" title="Mailing addon integrations">
            <p>
              GiveWP&apos;s mailing addons — Mailchimp, Constant Contact,
              ActiveCampaign, ConvertKit — are separate plugins that
              register Gutenberg blocks into the form builder. When a donor
              submits a form, the block attributes determine which mailing
              list they&apos;re subscribed to, whether double opt-in is
              required, and what tags are applied.
            </p>
            <p>
              The 3.0 release introduced a completely new block-based form
              architecture. Every existing v2 form needed a migration path
              to the new system — including addon configurations. I
              spearheaded the migration pipeline for all four mailing
              addons, writing the PHP migration steps that read legacy form
              meta and created the corresponding v3 blocks with the correct
              attributes.
            </p>

            <CodeBlock
              language="PHP"
              filename="Steps/Mailchimp.php"
              code={`class Mailchimp extends FormMigrationStep
{
    public function process(FormMigrationPayload $payload): void
    {
        $meta = $payload->formMeta;

        $attributes = [
            'label'          => $meta->getMailchimpLabel(),
            'checked'        => $meta->isMailchimpDefaultChecked(),
            'doubleOptIn'    => $meta->isMailchimpDoubleOptIn(),
            'subscriberTags' => $meta->getMailchimpTags(),
            'selectedAudience' => $meta->getMailchimpAudience(),
            'sendFFMData'    => $meta->shouldSendFFMDataToMailchimp(),
        ];

        $payload->formBlocks->insertAfter(
            'givewp/email',
            BlockModel::make('givewp/mailchimp', $attributes)
        );
    }
}`}
            />

            <p>
              Each migration step followed the same contract:{" "}
              read the legacy meta through a{" "}
              <code className={styles.inlineCode}>FormMetaDecorator</code>,
              build the block attributes, and insert the block at the
              correct position in the form layout. I wrote corresponding
              PRs in the private addon repos to register the new blocks and
              handle the runtime subscription logic.
            </p>
            <p>
              The migration had to be non-destructive — v2 forms stayed
              functional while v3 forms ran alongside them. Donors
              never saw a broken subscription flow during the transition.
            </p>
          </Section>

          {/* ═══ 5. THE HARD PARTS ═══ */}
          <Section number="05" title="The hard parts">
            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Modal rendering across iframes
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  The form builder renders the donation form inside an
                  iframe for accurate preview. But modals — the
                  StyledPopover, confirmation dialogs, and block
                  settings panels — needed to render in the parent
                  document, not the iframe. The iframe context created a
                  mismatch between the DOM tree the modal targeted and
                  the one the user interacted with. I fixed this by
                  ensuring portal targets were correctly resolved based
                  on the rendering context and that event propagation
                  worked across the iframe boundary.
                </p>
              </div>
            </div>

            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Migrating four mailing addons without breaking subscriptions
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  Each mailing addon stored configuration differently in
                  v2 — some in per-form meta, some in global settings,
                  some in both. Mailchimp had subscriber tags, audience
                  selection, and a double opt-in flag. Constant Contact
                  had email list selection. ActiveCampaign had its own
                  meta structure. The migration steps needed to read
                  these heterogeneous formats, normalize them, and
                  produce consistent v3 block attributes.
                </p>
                <p>
                  The{" "}
                  <code className={styles.inlineCode}>FormMetaDecorator</code>{" "}
                  pattern abstracted the per-addon meta access, letting
                  each migration step focus on attribute mapping rather
                  than meta-key archaeology. I wrote unit tests for each
                  addon&apos;s migration to verify that legacy
                  configurations round-tripped correctly into the new
                  block format.
                </p>
              </div>
            </div>

            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                Shipping 3.0 on a team
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  This was my first major release cycle on an
                  open-source product used by over 100,000 sites. The
                  3.0 release started as a separate feature plugin
                  (givewp-next-gen) that was developed in parallel, then
                  merged into core. Coordinating between the feature
                  branch and main, managing addon compatibility, and
                  ensuring v2 forms remained functional throughout the
                  transition required a level of release discipline that
                  solo projects don&apos;t. I shipped 16 PRs in the 3.0.0
                  release alone — form builder features, onboarding
                  flows, design polish, and bug fixes across the final
                  push.
                </p>
              </div>
            </div>
          </Section>

          {/* ═══ 6. CAMPAIGNS (4.0) ═══ */}
          <Section number="06" title="Campaigns — the 4.0 release">
            <p>
              The 4.0 release introduced campaign-based fundraising —
              organizing multiple donation forms under a single campaign
              with a shared goal, landing page, and performance analytics.
              This was a significant data model change: a one-to-many
              relationship between campaigns and forms, with new admin
              pages, WordPress blocks, and REST endpoints.
            </p>
            <p>
              I built the <strong>Campaign Cover Block</strong> and{" "}
              <strong>Campaign Stats Block</strong> — two of the core
              WordPress blocks that render campaign data on the frontend.
              I designed the campaign overview page styling and structure,
              updated confirmation modals across list tables, and built
              the campaign welcome banner and intro modal for existing
              users.
            </p>
            <p>
              On the dashboard side, I added campaign list table styling,
              shortcode support for embedding campaigns, the default form
              indicator, and the draft campaign page notice. I also
              replaced the donations table form filter with campaigns to
              reflect the new data hierarchy.
            </p>
          </Section>

          {/* ═══ 7. WHAT I SHIPPED ═══ */}
          <Section number="07" title="What I shipped">
            <p>
              Over three years at StellarWP, I contributed across 6
              repositories — the core plugin, the next-gen feature plugin,
              the form-builder-library, addon repos, and the design system.
              My work spanned both major releases and the ongoing
              maintenance between them.
            </p>
            <p>
              In the final year, I led accessibility improvements across
              the admin interface — adding ARIA labels, keyboard focus
              management, color contrast fixes, semantic HTML, and
              proper heading hierarchy. Working on a product used by
              nonprofits reinforced that accessibility isn&apos;t a
              nice-to-have — it&apos;s a requirement.
            </p>

            <div className={styles.metricsRow}>
              <MetricCard
                value="253"
                label="Pull requests"
                sublabel="Across 6 repositories"
              />
              <MetricCard
                value="2"
                label="Major releases"
                sublabel="3.0 (form builder) + 4.0 (campaigns)"
              />
              <MetricCard
                value="4"
                label="Addon migrations"
                sublabel="Mailchimp, CC, AC, ConvertKit"
              />
              <MetricCard
                value="3.5yr"
                label="Tenure"
                sublabel="2022—2025"
              />
            </div>
          </Section>
        </div>

        <CaseStudyFooter
          stack={[
            "React 18",
            "TypeScript",
            "PHP",
            "WordPress",
            "Gutenberg",
            "@wordpress/data",
            "react-beautiful-dnd",
            "react-hook-form",
            "SWR",
            "Chart.js",
            "SCSS",
            "wp-scripts",
          ]}
          links={[
            {
              label: "GiveWP on GitHub",
              href: "https://github.com/impress-org/givewp",
            },
            { label: "Back to portfolio", href: "/" },
          ]}
          updatedAt="April 2026"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LEDGER CASE STUDY
   ═══════════════════════════════════════════════════════════ */

function LedgerCaseStudy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <BackLink />
      </nav>

      <div className={styles.container}>
        <CaseStudyHero
          index="03"
          category="DOCUMENT INTELLIGENCE / FINANCIAL STATEMENT EXTRACTION"
          name="Ledger"
          trademark="TM"
          subtitle="A standalone document intelligence API that turns unstructured bank statements into structured financial data with 14 bank templates and a 4-tier extraction cascade."
          tags={[
            "Python",
            "FastAPI",
            "Gemini AI",
            "Terraform",
            "AWS Lambda",
            "React",
          ]}
          status="In production"
          year="2025"
        />

        <div className={styles.sections}>
          {/* ═══ 1. ORIGIN ═══ */}
          <Section number="01" title="Why this exists">
            <p>
              Ledger started as a subdirectory inside YieldStream. The
              underwriting platform needed structured financial data from
              bank statements before it could score merchants against
              lenders. I built the extraction pipeline inline, tightly
              coupled to the monolith.
            </p>
            <p>
              Two things forced the extraction. First, bank statement
              parsing is not specific to MCA underwriting. Any fintech
              product that touches bank data — lending, accounting,
              bookkeeping, fraud detection — needs the same capability.
              Second, parsing is bursty and CPU-heavy (OCR, image
              processing, PDF manipulation), while the rest of YieldStream
              is steady and database-heavy. Coupling them meant one
              workload&apos;s spike could starve the other.
            </p>
            <p>
              I extracted it into a standalone FastAPI service with its own
              test suite, its own Docker image, and its own Terraform-managed
              infrastructure on AWS Lambda. Ledger is now a product, not a
              feature.
            </p>
          </Section>

          {/* ═══ 2. THE ARCHITECTURE ═══ */}
          <Section number="02" title="The architecture">
            <p>
              The core design principle:{" "}
              <strong>
                try the cheapest, fastest extraction first and escalate only
                when confidence is too low.
              </strong>{" "}
              Every document passes through a quality gate, then enters a
              4-tier extraction cascade. Each tier is independently timed
              and logged. If a tier extracts fewer than 100 characters, the
              orchestrator escalates to the next.
            </p>

            <ExtractionCascadeDiagram />

            <p>
              <strong>Tier 1: pdfplumber.</strong> Handles ~90% of
              text-based PDFs in under 200ms. Extracts text with layout
              awareness and pulls structured tables — critical for bank
              statements where transaction data lives in columns, not
              paragraphs.
            </p>
            <p>
              <strong>Tier 2: PyMuPDF.</strong> Catches encrypted and
              corrupted PDFs that pdfplumber can&apos;t open. Similar speed,
              different PDF parsing engine.
            </p>
            <p>
              <strong>Tier 3: Tesseract OCR.</strong> For scanned documents
              and phone photos. 5-10 seconds per page. The quality gate
              pre-screens for blur, skew, and contrast to avoid wasting OCR
              compute on unsalvageable inputs.
            </p>
            <p>
              <strong>Tier 4: LlamaParse.</strong> Cloud fallback with
              30,000 free pages per month. Only reached when local
              extraction fails entirely. Returns markdown output that the
              downstream parser can still consume.
            </p>

            <CodeBlock
              language="Python"
              filename="orchestrator.py"
              code={`def extract(file_path: str | Path) -> ExtractionResult:
    """Try extractors in order until one produces sufficient text.

    Cascade: pdfplumber -> PyMuPDF -> OCR -> LlamaParse
    Each tier attempt is recorded for fallback analytics.
    """
    threshold = settings.min_text_threshold
    result = ExtractionResult()

    for tier_fn, tier_name, tier_order in TIERS:
        attempt = TierAttempt(tier=tier_name, tier_order=tier_order)
        start = time.time()
        try:
            text, pages = tier_fn(file_path)
            attempt.text_char_count = len(text)
            if len(text) >= threshold:
                attempt.status = "success"
                result.text = text
                result.method = tier_name
                break
        except Exception as e:
            attempt.failure_reason = str(e)
        attempt.processing_time_ms = _elapsed_ms(start)
        result.tier_attempts.append(attempt)`}
            />
          </Section>

          {/* ═══ 3. TEMPLATE SYSTEM ═══ */}
          <Section number="03" title="The template system">
            <p>
              Raw text extraction is step one. Step two is understanding
              what that text means — and every bank formats statements
              differently. Chase puts deposits under &quot;Deposits and
              Additions.&quot; BofA calls them &quot;Credits.&quot; Wells Fargo uses a
              transaction table with running balances. PNC splits
              statements across multiple pages with no clear section
              headers.
            </p>
            <p>
              I built an abstract{" "}
              <code className={styles.inlineCode}>BankTemplate</code> base
              class with four methods:{" "}
              <code className={styles.inlineCode}>matches()</code>{" "}
              (confidence score 0-1 that the document belongs to this
              bank),{" "}
              <code className={styles.inlineCode}>extract_summary()</code>{" "}
              (account holder, period dates, balances),{" "}
              <code className={styles.inlineCode}>
                extract_transactions()
              </code>{" "}
              (individual line items with categories), and{" "}
              <code className={styles.inlineCode}>
                compute_derived_metrics()
              </code>{" "}
              (ADB, negative balance days, largest transactions).
            </p>
            <p>
              <strong>14 bank templates</strong> are registered today:
              Chase, Bank of America, Wells Fargo, TD, PNC, US Bank,
              Capital One, Regions, Truist, Citizens, Fifth Third, BMO
              Harris, Navy Federal, and a generic fallback. Each
              self-registers at import time via the template registry.
            </p>
            <p>
              The registry runs all templates against incoming text and
              picks the highest confidence match above 0.5. Below that
              threshold, it falls back to the generic parser. Every match
              is recorded in a <strong>30-day rolling history</strong>{" "}
              (thread-safe, in-memory) for monitoring template coverage and
              drift. The{" "}
              <code className={styles.inlineCode}>/templates/bank</code>{" "}
              endpoint exposes this data so I can see which banks are
              hitting the generic fallback most often and prioritize new
              templates accordingly.
            </p>
            <p>
              Transaction categorization is deterministic. Credits are
              classified as revenue by default, unless keyword patterns
              match transfer signals (Zelle, Venmo, &quot;owner deposit&quot;) or MCA
              payment patterns (ACH debits matching known lender names like
              Yellowstone, Credibly, OnDeck). This distinction matters —
              underwriters need to separate operating revenue from
              transfers and existing debt payments.
            </p>
          </Section>

          {/* ═══ 4. ENRICHMENT & VALIDATION ═══ */}
          <Section number="04" title="Enrichment and validation">
            <p>
              Structured extraction gives you numbers. Enrichment gives you
              signal. After parsing, Ledger optionally passes the extracted
              data through Gemini 2.0 Flash to compute{" "}
              <strong>25+ financial intelligence metrics</strong>:
            </p>
            <ul>
              <li>
                Monthly revenue average, trend (growing / stable /
                declining), volatility, best and worst months
              </li>
              <li>
                Average daily balance, lowest recorded balance, ending
                balance trend
              </li>
              <li>NSF/overdraft counts across 30, 60, and 90-day windows</li>
              <li>
                Active MCA positions detected from recurring ACH debits,
                stacking burden percentage, debt service coverage ratio
              </li>
              <li>
                Lien flags (IRS, tax levy, garnishment keywords), transfer
                anomalies, and a generated underwriting summary
              </li>
            </ul>
            <p>
              Gemini is rate-limited to 15 RPM via a token-bucket
              implementation. If enrichment is disabled or rate-limited,
              Ledger still returns the full structural extraction — AI is
              additive, never blocking.
            </p>

            <div className={styles.callout}>
              <p>
                Every extraction includes an arithmetic validation step:
                beginning balance + deposits - withdrawals should equal
                ending balance. The check uses{" "}
                <code className={styles.inlineCode}>Decimal</code>{" "}
                precision with a $0.01 tolerance. A failed balance check
                is a strong signal that either the OCR misread a number or
                the template missed a transaction block.
              </p>
            </div>

            <p>
              Confidence scoring runs at every stage. Text quality
              (characters per page), table extraction success, and template
              match confidence are aggregated into an overall score. If it
              drops below 0.85, the extraction is flagged{" "}
              <code className={styles.inlineCode}>needs_human_review</code>{" "}
              and queued for manual inspection via the review endpoint.
            </p>
          </Section>

          {/* ═══ 5. INFRASTRUCTURE ═══ */}
          <Section number="05" title="Infrastructure">
            <p>
              Ledger runs on <strong>AWS Lambda</strong> behind API Gateway
              v2, deployed as a Docker container image. The entire
              infrastructure is defined in Terraform — ECR repository, IAM
              roles, Lambda function, API Gateway, and CloudWatch log
              groups with 14-day retention. One{" "}
              <code className={styles.inlineCode}>terraform apply</code>{" "}
              stands up or tears down the whole stack.
            </p>
            <p>
              Lambda was a deliberate choice over a persistent server.
              Document parsing is bursty — high concurrency during business
              hours, near-zero at night. Lambda scales to zero when idle
              and handles burst concurrency without provisioning. The 512
              MB memory allocation and 60-second timeout cover even the
              slowest OCR extractions.
            </p>
            <p>
              The service is stateless by design. No database, no file
              system persistence. The review queue and template match
              history live in-memory for the Lambda execution context. For
              persistent storage, the calling service (YieldStream)
              consumes the{" "}
              <code className={styles.inlineCode}>ParseResponse</code> and
              writes to its own database. This keeps Ledger operationally
              simple — there&apos;s nothing to back up, nothing to migrate.
            </p>
            <p>
              A React frontend (Vite + TypeScript) provides an interactive
              testing interface: drag-and-drop upload, tabbed result views
              (parsed data, raw text, tables, confidence breakdown, tier
              logs), and a review queue for flagged extractions. It exists
              for internal use and demos, not end-user-facing.
            </p>
          </Section>

          {/* ═══ 6. RESULTS ═══ */}
          <Section number="06" title="Where it stands">
            <p>
              Ledger processes bank statements from 14 banks with
              template-specific accuracy, falls back gracefully for
              unknown formats, and enriches every extraction with
              25+ underwriting metrics. The test suite generates synthetic
              PDFs via reportlab — no brittle binary fixtures — and covers
              extraction, classification, bank parsing, enrichment, and
              quality gate logic.
            </p>
            <p>
              The architecture is designed to improve passively. Every
              extraction against an unknown bank accumulates in the
              template match history. When a bank hits 5+ extractions
              without a dedicated template, the system surfaces it. Adding
              a new template means writing one Python class that implements
              four methods and registering it at import time. The registry
              handles everything else.
            </p>

            <div className={styles.metricsRow}>
              <MetricCard
                value="14"
                label="Bank templates"
                sublabel="Self-registering at import"
              />
              <MetricCard
                value="4"
                label="Extraction tiers"
                sublabel="Auto-escalation cascade"
              />
              <MetricCard
                value="25+"
                label="Financial metrics"
                sublabel="Gemini AI enrichment"
              />
              <MetricCard
                value="11"
                label="Document types"
                sublabel="Classified with confidence scoring"
              />
            </div>
          </Section>
        </div>

        <CaseStudyFooter
          stack={[
            "Python 3.12",
            "FastAPI",
            "Pydantic v2",
            "pdfplumber",
            "Tesseract OCR",
            "Gemini AI",
            "AWS Lambda",
            "Terraform",
            "Docker",
            "React 19",
            "TypeScript",
          ]}
          links={[
            { label: "YieldStream case study", href: "/work/yieldstream" },
            { label: "Back to portfolio", href: "/" },
          ]}
          updatedAt="April 2026"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BUBBLECHAT CASE STUDY
   ═══════════════════════════════════════════════════════════ */

function BubbleChatCaseStudy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <BackLink />
      </nav>

      <div className={styles.container}>
        <CaseStudyHero
          index="04"
          category="FULL-STACK / TYPESCRIPT + PYTHON"
          name="BubbleChat"
          trademark=""
          subtitle="A multi-tenant embeddable AI chat widget with a FastAPI backend, React admin dashboard, and serverless deployment. Each client gets their own widget instance, system prompt, styling tokens, and API keys — managed through a three-panel admin interface."
          tags={[
            "FastAPI",
            "React 19",
            "TypeScript",
            "Python",
            "Gemini AI",
            "Docker",
          ]}
          status="Side project"
          year="2025"
        />

        <div className={styles.sections}>
          {/* ═══ 1. THE IDEA ═══ */}
          <Section number="01" title="The idea">
            <p>
              Most embeddable chat widgets are either configuration-less
              drop-ins with no backend control, or enterprise platforms with
              six-figure contracts. I wanted to build the middle ground: a
              lightweight widget that any site owner could embed with a single
              script tag, backed by a full multi-tenant platform for managing
              clients, conversations, and AI behavior.
            </p>
            <p>
              The system is designed as a <strong>SaaS platform</strong>, not a
              single-use widget. Each client (organization) gets their own
              configured instance: a unique slug, API keys with per-key rate
              limits, a custom system prompt that controls the bot&apos;s
              personality, allowed CORS origins, and a full design token system
              for styling the widget to match their brand. Conversations are
              isolated per client. The admin dashboard manages everything
              through a three-panel interface — client list, configuration
              editor, and live widget preview.
            </p>
          </Section>

          {/* ═══ 2. THE ARCHITECTURE ═══ */}
          <Section number="02" title="The architecture">
            <p>
              The system is three services working in concert:{" "}
              <strong>a Web Component widget</strong> compiled to a standalone
              JS bundle via esbuild,{" "}
              <strong>a FastAPI backend</strong> serving the chat API and admin
              endpoints, and{" "}
              <strong>a React dashboard</strong> for client management. Each
              service is independently deployable — the widget ships as a
              CDN-hosted script, the backend runs on AWS Lambda via Mangum, and
              the dashboard is a static Vite build.
            </p>

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>A. Dual authentication</p>
              <p>
                Two different audiences need two different auth mechanisms. The
                widget authenticates via{" "}
                <strong>API key</strong> — sent as an{" "}
                <code className={styles.inlineCode}>X-API-Key</code> header on
                every request, SHA-256 hashed server-side for lookup. I chose
                SHA-256 over bcrypt deliberately: bcrypt is intentionally slow
                (good for login protection), but per-request widget auth needs
                sub-millisecond verification. The dashboard uses{" "}
                <strong>JWT</strong> — bcrypt-hashed password at login, then
                HS256-signed tokens with 1-hour expiry for subsequent requests.
              </p>
            </div>

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>B. Streaming</p>
              <p>
                Chat responses stream token-by-token via Server-Sent Events.
                The backend receives a message, loads the conversation history
                (capped at 50 messages), and streams the Gemini response
                through an async generator that emits SSE events. Each event is
                typed:{" "}
                <code className={styles.inlineCode}>token</code>,{" "}
                <code className={styles.inlineCode}>done</code>, or{" "}
                <code className={styles.inlineCode}>error</code>. The assistant
                message is persisted to the database only after the stream
                completes.
              </p>
            </div>

            <CodeBlock
              language="Python"
              filename="chat.py"
              code={`async def stream_chat(message: str, session_id: str, client: Client, db: AsyncSession):
    """Stream AI response token-by-token via SSE."""
    conversation = await get_or_create_conversation(db, client.id, session_id)
    await save_message(db, conversation.id, "user", message)

    history = await get_history(db, conversation.id, limit=MAX_HISTORY)
    system_prompt = client.system_prompt  # never sent to frontend

    async def event_generator():
        full_response = ""
        async for chunk in gemini.stream_response(history, system_prompt):
            full_response += chunk
            yield f"event: token\\ndata: {json.dumps({'content': chunk})}\\n\\n"
        await save_message(db, conversation.id, "assistant", full_response)
        yield f"event: done\\ndata: {json.dumps({'status': 'complete'})}\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")`}
            />

            <div className={styles.subsection}>
              <p className={styles.subsectionLabel}>C. Async-native</p>
              <p>
                The backend is async throughout — not as an afterthought, but
                as an architectural constraint. SQLAlchemy async sessions with{" "}
                <code className={styles.inlineCode}>async_sessionmaker</code>,
                async generators for SSE streaming, and FastAPI&apos;s
                dependency injection for auth and database access. The Gemini
                client initializes lazily so the app starts without an API key
                in dev. Rate limiting uses a sliding window algorithm tracking
                per-key request timestamps, with an abstraction layer that
                swaps between in-memory (single instance) and Redis
                (distributed) backends.
              </p>
            </div>
          </Section>

          {/* ═══ 3. THE WIDGET ═══ */}
          <Section number="03" title="The widget">
            <p>
              The widget is a{" "}
              <code className={styles.inlineCode}>&lt;chat-widget&gt;</code>{" "}
              custom HTML element that attaches a Shadow DOM root. Shadow DOM
              was non-negotiable — the widget embeds on third-party sites where
              host CSS could break the layout and widget styles could pollute
              the host page. The Shadow DOM boundary provides complete
              isolation. Styling is driven by CSS variables injected from the
              server&apos;s design token system.
            </p>
            <p>
              The <strong>design token system</strong> is a structured Pydantic
              model with five token groups: brand (primary and secondary
              colors), typography (font family, sizes, weights), shape (border
              radius, width), layout (position, dimensions), and motion
              (animation style and speed). The admin dashboard edits these
              tokens through a visual interface with a live preview panel. On
              the widget side, tokens are converted to CSS custom properties
              and injected into the Shadow DOM at initialization.
            </p>
            <p>
              Conversations are scoped per browser tab. A UUID is generated
              and stored in{" "}
              <code className={styles.inlineCode}>sessionStorage</code> — not{" "}
              <code className={styles.inlineCode}>localStorage</code> — so
              each tab gets its own conversation thread. Closing the tab
              discards the session. This was a deliberate UX choice: returning
              visitors start fresh rather than resuming a potentially stale
              conversation from days ago.
            </p>
            <p>
              The system prompt is{" "}
              <strong>injected server-side only</strong>. It never appears in
              any client-facing response or configuration payload. This
              prevents prompt extraction attacks — a visitor can&apos;t inspect
              network traffic or DOM state to discover the bot&apos;s
              instructions.
            </p>
          </Section>

          {/* ═══ 4. THE HARD PARTS ═══ */}
          <Section number="04" title="The hard parts">
            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Streaming SSE over POST
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  The browser&apos;s{" "}
                  <code className={styles.inlineCode}>EventSource</code> API
                  only supports GET requests. Chat messages need to be sent as
                  POST with a JSON body — you can&apos;t stuff a conversation
                  payload into query parameters. I had to build a manual SSE
                  parser in the widget that uses{" "}
                  <code className={styles.inlineCode}>fetch()</code> with a
                  readable stream, splits the incoming bytes on double
                  newlines, parses event types and data fields, and
                  dispatches tokens to the DOM for the typing effect. Error
                  handling had to account for partial chunks, network
                  interruptions mid-stream, and the backend&apos;s error
                  events.
                </p>
              </div>
            </div>

            <div className={styles.warStory}>
              <p className={styles.warStoryTitle}>
                <svg className={styles.warStoryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                Widget CSS isolation
              </p>
              <div className={styles.warStoryBody}>
                <p>
                  Shadow DOM solved the isolation problem, but introduced a new
                  one: the design token system needed to inject styles{" "}
                  <em>into</em> the shadow root without breaking the boundary.
                  Global stylesheets don&apos;t penetrate Shadow DOM. I built a
                  CSS generation layer that converts the Pydantic token model
                  into a complete stylesheet string, injects it as a{" "}
                  <code className={styles.inlineCode}>&lt;style&gt;</code>{" "}
                  element inside the shadow root, and re-renders when the
                  admin updates tokens in real time. The live preview in the
                  dashboard renders the actual widget component — not a
                  mockup — so what the admin sees is exactly what deploys.
                </p>
              </div>
            </div>
          </Section>

          {/* ═══ 5. WHERE IT STANDS ═══ */}
          <Section number="05" title="Where it stands">
            <p>
              BubbleChat is a working side project that covers the full stack:
              a compiled Web Component, an async Python API, a React admin
              interface, and container-based deployment to AWS Lambda. The
              database layer supports both SQLite (dev) and PostgreSQL
              (production) through a single connection URL swap, with Alembic
              managing schema migrations.
            </p>
            <p>
              The project was built to demonstrate end-to-end product
              engineering — not just a frontend or just an API, but a complete
              multi-tenant platform with auth, rate limiting, real-time
              streaming, and infrastructure-as-code. Every service is
              containerized, the backend is tested with pytest and async
              fixtures, and the deployment is defined in an AWS SAM template.
            </p>

            <div className={styles.metricsRow}>
              <MetricCard
                value="3"
                label="Services"
                sublabel="Widget, API, Dashboard"
              />
              <MetricCard
                value="10"
                label="API endpoints"
                sublabel="CRUD, auth, chat, config"
              />
              <MetricCard
                value="2"
                label="Auth mechanisms"
                sublabel="API key + JWT"
              />
              <MetricCard
                value="5"
                label="Token groups"
                sublabel="Brand, type, shape, layout, motion"
              />
            </div>
          </Section>
        </div>

        <CaseStudyFooter
          stack={[
            "Python",
            "FastAPI",
            "SQLAlchemy",
            "Pydantic v2",
            "React 19",
            "TypeScript",
            "Vite",
            "esbuild",
            "Docker",
            "AWS SAM",
            "Gemini AI",
          ]}
          links={[{ label: "Back to portfolio", href: "/" }]}
          updatedAt="April 2026"
        />
      </div>
    </div>
  );
}
