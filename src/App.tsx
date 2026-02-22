import { useEffect, useState, useRef } from "react";

// Background images
const mountainImgPrimary = "/McDowellMountainCentered.jpg";
const mountainImgFallback = "/McDowellMountainCentered.jpg";

const ROUTES = [
  "/",
  "/intro",
  "/journal",
  "/resources",
  "/contact",
  "/team",
  "/initiatives",
  "/betweenpeaks",
] as const;

type Route = (typeof ROUTES)[number];

const INSTAGRAM_URL = "https://www.instagram.com/mountaineeringclub_asu/";

/**
 * ✅ Instagram tiles (LOCAL placeholders)
 * Put these files in: /public/instagram/
 *  - post1.jpg ... post6.jpg
 * Then replace the url fields with the real IG post links when ready.
 */
const INSTAGRAM_POSTS = [
  { img: "/instagram/post1.jpg", url: "https://www.instagram.com/p/example1/" },
  { img: "/instagram/post2.jpg", url: "https://www.instagram.com/p/example2/" },
  { img: "/instagram/post3.jpg", url: "https://www.instagram.com/p/example3/" },
  { img: "/instagram/post4.jpg", url: "https://www.instagram.com/p/example4/" },
  { img: "/instagram/post5.jpg", url: "https://www.instagram.com/p/example5/" },
  { img: "/instagram/post6.jpg", url: "https://www.instagram.com/p/example6/" },
];

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full text-white overflow-hidden"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0a0a0a",
        backgroundImage: `linear-gradient(rgba(140,29,64,0.45), rgba(10,10,10,0.62)), url("${mountainImgPrimary}"), url("${mountainImgFallback}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUpFade { animation: slideUpFade .5s cubic-bezier(.22,.61,.36,1) both; }
        html,body{height:100%;margin:0;padding:0;background:#0a0a0a}
        body::-webkit-scrollbar{width:0;height:0}
        body{scrollbar-width:none;-ms-overflow-style:none}
      `}</style>
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="w-full flex justify-center py-8 md:py-12">
      <div className="relative mx-4 w-full max-w-5xl rounded-2xl bg-black/60 backdrop-blur-md shadow-2xl ring-1 ring-white/10 p-6 md:p-10 animate-slideUpFade">
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 h-10 w-10 rounded-full bg-black/30 ring-1 ring-white/25 text-white/80 hover:text-white hover:bg-black/40 transition grid place-items-center backdrop-blur-sm"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function InstagramGrid() {
  return (
    <div className="mt-8 bg-white/5 p-4 rounded-xl ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="uppercase tracking-widest text-sm text-white/80">Our Instagram</h3>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300 text-sm">
          @{INSTAGRAM_URL.split("/").filter(Boolean).pop()}
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {INSTAGRAM_POSTS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer" className="group">
            <img
              src={p.img}
              alt={`Instagram post ${i + 1}`}
              className="rounded-lg transition w-full aspect-square object-cover ring-1 ring-white/10 group-hover:opacity-85"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <p className="mt-3 text-white/55 text-xs leading-relaxed">
        Tip: keep these as simple square images in <span className="text-white/75">/public/instagram/</span>. If you ever want
        them to “auto-update,” that requires the Instagram API (more work + more breakable).
      </p>
    </div>
  );
}

/* -----------------------------
   JOURNAL: Poster gallery
----------------------------- */

function JournalGallery() {
  const posters = [
    {
      title: "Humphreys Peak",
      date: "Feb 24",
      img: "/humphreys-poster.png",
      pdf: "", // later: "/pdfs/humphreys.pdf"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-left">
      <div className="mb-10">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">JOURNAL</h2>
        <div className="mt-2 h-px w-40 bg-white/30" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.map((p, i) => {
          const Wrapper: any = p.pdf ? "a" : "div";
          const wrapperProps = p.pdf
            ? { href: p.pdf, target: "_blank", rel: "noreferrer" }
            : {};

          return (
            <Wrapper
              key={i}
              {...wrapperProps}
              className="group block overflow-hidden rounded-3xl bg-black/30 ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full aspect-[4/5] object-cover opacity-95 group-hover:scale-[1.02] transition duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              </div>

              <div className="p-4">
                <div className="text-white/95 font-semibold">{p.title}</div>
                <div className="mt-1 text-white/70 text-sm">{p.date}</div>
                <div className="mt-3 text-white/55 text-xs uppercase tracking-[0.25em]">
                  {p.pdf ? "Open PDF" : "Cover"}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
/* -----------------------------
   INITIATIVES: Calendar + Jump Pills + Feature Blocks + Overlay Expansion + Petitions
----------------------------- */

const PETITIONS_DOC =
  "https://docs.google.com/document/d/1zX8pHm9XSinjg2dh5BKilBLoHc8FU7_6zxdZYyqGEH8/edit?usp=sharing";

// TODO: paste your 3 student interest Google Form links here:
const STUDENT_INTEREST_FORMS = {
  disability: "https://forms.gle/PASTE_DISABILITY_FORM_LINK",
  dogs: "https://forms.gle/PASTE_DOGS_FORM_LINK",
  trails: "https://forms.gle/PASTE_TRAILS_FORM_LINK",
} as const;

type InitiativeKey = "disability" | "dogs" | "trails";

type Initiative = {
  key: InitiativeKey;
  title: string;
  subtitle: string;
  accent: string; // glow + pill tint
  pillText: string; // for the pill label if you want shorter names
  forWho: string[];
  studentFormHref: string;
  details: {
    mission: string;
    howItWorks: string[];
    howToJoin: string[];
    partnerInfo: string[];
    futureMediaNote?: string;
  };
};

function InitiativesPanel({ navToContact }: { navToContact: () => void }) {
  // Calendar state (month swipe + year toggle)
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth()); // 0-11
  const [year, setYear] = useState<number>(today.getFullYear());

  // Overlay state (long-form details)
  const [active, setActive] = useState<Initiative | null>(null);

  // Jump refs
  const refs: Record<InitiativeKey, React.MutableRefObject<HTMLDivElement | null>> = {
    disability: useRef<HTMLDivElement | null>(null),
    dogs: useRef<HTMLDivElement | null>(null),
    trails: useRef<HTMLDivElement | null>(null),
  };

  const jumpTo = (key: InitiativeKey) => {
    const el = refs[key].current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const initiatives: Initiative[] = [
    {
      key: "disability",
      title: "Disability Nights",
      pillText: "Disability Nights",
      subtitle: "Adaptive outdoor experiences built around access, safety, and community.",
      accent: "rgba(160,90,255,0.42)", // purple
      forWho: ["Students", "Parents & families", "Community partners"],
      studentFormHref: STUDENT_INTEREST_FORMS.disability,
      details: {
        mission:
          "Create welcoming, accessible outdoor experiences and skill sessions for people of all abilities—while training MCA members to support adaptive participation with care and competence.",
        howItWorks: [
          "Structured events with clear roles (lead, support, logistics, accessibility liaison).",
          "Pre-brief + safety framework (terrain selection, comms plan, contingencies).",
          "Post-event notes to improve future events and support continuity (optional).",
        ],
        howToJoin: [
          "Students: submit the interest form and we’ll follow up with onboarding + training expectations.",
          "You can start with low-barrier roles (logistics, support, comms) and level up over time.",
        ],
        partnerInfo: [
          "Parents/guardians: reach out with scheduling needs and any accessibility info you’d like us to know.",
          "Organizations: we can co-host, coordinate volunteers, and build recurring programming.",
        ],
        futureMediaNote: "Future: photos, partner logos, and impact stats will live here.",
      },
    },
    {
      key: "dogs",
      title: "Dog Shelter Partnership",
      pillText: "Dog Partnership",
      subtitle: "Trail days that enrich rescue dogs and increase adoption visibility.",
      accent: "rgba(255,140,0,0.38)", // orange
      forWho: ["Students", "Dog shelters", "Potential adopters & volunteers"],
      studentFormHref: STUDENT_INTEREST_FORMS.dogs,
      details: {
        mission:
          "Support shelters by giving dogs enrichment and visibility—while giving students a meaningful, community-building way to serve.",
        howItWorks: [
          "We coordinate a recurring outing schedule with shelter staff guidance and agreed safety rules.",
          "We start with a smaller intro walk to match dogs with volunteers.",
          "Optional: we keep simple behavior/preference notes to help shelters with matching.",
        ],
        howToJoin: [
          "Students: submit the interest form with your comfort level and availability.",
          "We’ll match you with the right dog and provide handling guidance (per shelter rules).",
        ],
        partnerInfo: [
          "Shelters: tell us what help matters most (walks, adoption events, transport support, visibility).",
          "We’ll follow your training requirements and keep animal welfare central.",
        ],
        futureMediaNote: "Future: partner highlights, photos, and adoption outcomes can be featured here.",
      },
    },
    {
      key: "trails",
      title: "Trail Maintenance",
      pillText: "Trail Maintenance",
      subtitle: "Hands-on stewardship: restoration, erosion control, and public lands support.",
      accent: "rgba(80,200,120,0.34)", // green
      forWho: ["Students", "Land managers (NPS/FS)", "Outdoor community"],
      studentFormHref: STUDENT_INTEREST_FORMS.trails,
      details: {
        mission:
          "Support public lands through responsible, trained volunteer work—especially where trail access and restoration matter to our community.",
        howItWorks: [
          "We coordinate with land managers and follow required training + supervision rules.",
          "Workdays can include erosion control, corridor clearing, and trail improvements.",
          "We keep volunteer rosters, safety expectations, and a clear comms plan.",
        ],
        howToJoin: [
          "Students: submit the interest form and note any trail work experience (if any).",
          "We’ll share requirements (PPE, training, supervision expectations) before each event.",
        ],
        partnerInfo: [
          "Agencies/organizations: reach out with needs, training requirements, and timelines.",
          "We’re happy to start small and scale responsibly.",
        ],
        futureMediaNote: "Future: project logs, before/after photos, and mileage impact can be displayed here.",
      },
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-left">
      <div className="mb-6">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">INITIATIVES</h2>
        <div className="mt-2 h-px w-44 bg-white/30" />
      </div>

      {/* Calendar */}
      <div className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-5 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Calendar</div>
            <div className="mt-1 text-white/95 text-lg font-semibold">
              {new Date(year, month, 1).toLocaleString(undefined, { month: "long" })} {year}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const d = new Date(year, month - 1, 1);
                setMonth(d.getMonth());
                setYear(d.getFullYear());
              }}
              className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 transition text-white/85"
              aria-label="Previous month"
            >
              ‹
            </button>

            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 text-white/85 outline-none"
              aria-label="Select year"
            >
              {Array.from({ length: 9 }).map((_, i) => {
                const y = today.getFullYear() - 4 + i;
                return (
                  <option key={y} value={y} className="text-black">
                    {y}
                  </option>
                );
              })}
            </select>

            <button
              onClick={() => {
                const d = new Date(year, month + 1, 1);
                setMonth(d.getMonth());
                setYear(d.getFullYear());
              }}
              className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 transition text-white/85"
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>

        <MiniCalendarGrid month={month} year={year} />

        {/* Jump pills (right under calendar) */}
        <div className="mt-5 flex flex-wrap gap-2">
          {initiatives.map((i) => (
            <button
              key={i.key}
              onClick={() => jumpTo(i.key)}
              className="text-xs tracking-[0.22em] uppercase px-3 py-2 rounded-full ring-1 bg-black/20 hover:bg-white/10 transition"
              style={{
                color: "rgba(255,255,255,0.85)",
                borderColor: "rgba(255,255,255,0.14)",
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 14px 50px -40px ${i.accent}`,
              }}
            >
              <span
                className="inline-block"
                style={{
                  color: i.accent.replace("0.34", "0.95").replace("0.38", "0.95").replace("0.42", "0.95"),
                }}
              >
                ●
              </span>{" "}
              <span className="ml-2" style={{ color: "rgba(255,255,255,0.86)" }}>
                {i.pillText}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Initiative feature blocks */}
      <div className="mt-8 space-y-6">
        {initiatives.map((i) => (
          <div key={i.key} ref={refs[i.key]} className="scroll-mt-24">
            <div
              className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 relative overflow-hidden"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 28px 90px -60px ${i.accent}`,
              }}
            >
              <div className="absolute inset-0 opacity-35 pointer-events-none" style={{ background: `radial-gradient(circle at 18% 15%, ${i.accent}, transparent 58%)` }} />

              <div className="relative">
                <div className="text-white/95 text-2xl md:text-3xl font-semibold">{i.title}</div>
                <div className="mt-2 text-white/75 leading-relaxed max-w-3xl">{i.subtitle}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {i.forWho.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {/* Student interest */}
                  <a
                    href={i.studentFormHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center px-5 py-2.5 rounded-xl bg-white text-black/90 text-xs font-medium tracking-[0.25em] hover:bg-white/90 transition"
                  >
                    STUDENT INTEREST
                  </a>

                  {/* Partner / Parent / Org outreach (more formal) */}
                  <button
                    onClick={() => navToContact()}
                    className="px-5 py-2.5 rounded-xl border border-white/25 text-white/90 text-xs font-medium tracking-[0.25em] hover:bg-white/10 transition"
                  >
                    PARENTS / PARTNERS
                  </button>

                  {/* Long-form details */}
                  <button
                    onClick={() => setActive(i)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 ring-1 ring-white/10 text-white/85 text-xs font-medium tracking-[0.25em] hover:bg-white/15 transition"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Petitions (small) */}
      <div className="mt-10 rounded-3xl bg-black/20 ring-1 ring-white/10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Petitions</div>
            <div className="mt-1 text-white/95 text-lg font-semibold">Petitions List</div>
            <div className="mt-2 text-white/70 text-sm leading-relaxed max-w-2xl">
              A running doc of petitions and public comment opportunities members can sign (optional).
            </div>
          </div>

          <a
            href={PETITIONS_DOC}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-black/90 text-xs font-medium tracking-[0.25em] hover:bg-white/90 transition"
          >
            OPEN DOC
          </a>
        </div>
      </div>

      {/* Expansion overlay */}
      {active ? <InitiativeOverlay initiative={active} onClose={() => setActive(null)} /> : null}
    </div>
  );
}

function MiniCalendarGrid({ month, year }: { month: number; year: number }) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0 Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<{ day?: number }> = [];
  for (let i = 0; i < startDay; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
  while (cells.length % 7 !== 0) cells.push({});

  const dow = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 gap-2 text-white/50 text-xs tracking-[0.3em] uppercase">
        {dow.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((c, i) => (
          <div
            key={i}
            className={[
              "h-11 rounded-xl ring-1 ring-white/10 bg-white/5 grid place-items-center",
              c.day ? "text-white/85 hover:bg-white/10 transition" : "opacity-30",
            ].join(" ")}
          >
            {c.day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function InitiativeOverlay({ initiative, onClose }: { initiative: Initiative; onClose: () => void }) {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="relative mx-2 w-full max-w-4xl rounded-3xl bg-black/60 backdrop-blur-md shadow-2xl ring-1 ring-white/10 p-6 md:p-10">
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 h-10 w-10 rounded-full bg-black/30 ring-1 ring-white/25 text-white/80 hover:text-white hover:bg-black/40 transition grid place-items-center backdrop-blur-sm"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="text-white/95 text-2xl md:text-3xl font-semibold">{initiative.title}</div>
        <div className="mt-2 text-white/75 leading-relaxed">{initiative.subtitle}</div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Mission</div>
            <p className="mt-2 text-white/80 leading-relaxed">{initiative.details.mission}</p>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">How it works</div>
            <ul className="mt-3 space-y-2 text-white/80 text-sm leading-relaxed list-disc pl-5">
              {initiative.details.howItWorks.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">How to join</div>
            <ul className="mt-3 space-y-2 text-white/80 text-sm leading-relaxed list-disc pl-5">
              {initiative.details.howToJoin.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Partners / Parents</div>
            <ul className="mt-3 space-y-2 text-white/80 text-sm leading-relaxed list-disc pl-5">
              {initiative.details.partnerInfo.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-black/20 ring-1 ring-white/10 p-5">
          <div className="text-white/85 font-semibold">Media & updates</div>
          <p className="mt-2 text-white/70 text-sm leading-relaxed">
            {initiative.details.futureMediaNote ?? "Future: photos, partner logos, and impact stats will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ASUMountaineeringSite() {
  const [route, setRoute] = useState<Route>("/");

    useEffect(() => {
    // Read the current pathname and map to one of our ROUTES.
    const handleLocation = () => {
      // normalize path: "/" or "/intro" etc.
      let p = window.location.pathname || "/";
      // keep trailing slashes trimmed
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
      // For consistency, treat root as "/"
      const normalized = p === "" ? "/" : p;
      setRoute(ROUTES.includes(normalized as Route) ? (normalized as Route) : "/");
    };

    // Handle back/forward and initial load
    window.addEventListener("popstate", handleLocation);
    handleLocation();

    return () => window.removeEventListener("popstate", handleLocation);
  }, []);

  // Navigate using history API so the URL changes to /about etc (no hash).
  const nav = (path: Route) => {
    const to = path === "/" ? "/" : path;
    // push state so the browser URL updates and we still render client-side
    window.history.pushState({}, "", to);
    // update React state to show the target pane
    setRoute(to as Route);
  };

  return (
    <BackgroundWrapper>
      {/* HOME */}
      <div
        className={`flex flex-col items-center justify-start pt-36 pb-8 px-4 text-center ${
          route === "/" ? "min-h-screen" : "hidden"
        }`}
      >
        <h1
          className="text-4xl md:text-7xl font-semibold text-white/95 leading-[1.05]"
          style={{
            fontFamily: "Oswald, 'Bebas Neue', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.04em",
            transform: "scaleY(1.18)",
            transformOrigin: "center",
          }}
        >
          <div className="flex items-end justify-center gap-4">
            <span className="whitespace-nowrap">MOUNTAINEERING CLUB</span>
            <span
              className="flex flex-col items-center justify-center"
              style={{
                fontSize: "0.48em",
                lineHeight: 0.8,
                letterSpacing: "0.02em",
                transform: "translateY(-0.32em)",
              }}
              aria-label="AT"
            >
              <span style={{ display: "block", transform: "rotate(-90deg) scaleY(-1)" }}>A</span>
              <span style={{ display: "block", transform: "rotate(-90deg) scaleY(-1)", marginTop: "-0.1em" }}>T</span>
            </span>
          </div>

          <span className="block mt-2">ARIZONA STATE UNIVERSITY</span>

          <div className="mx-auto mt-34 h-[2px] w-[min(680px,90vw)] bg-transparent" />

          <div
            className="mt-16 text-white/80"
            style={{
              fontFamily: "'Cormorant Garamond', 'Libre Baskerville', 'Times New Roman', serif",
              letterSpacing: "0.18em",
            }}
          >
            <span className="block text-sm md:text-base">FOR TYLER HUGON AND TESS COLLINS</span>
          </div>
        </h1>

        <nav className="grid grid-cols-2 sm:flex sm:flex-wrap gap-5 justify-center mt-8">
          {[
            { name: "INTRO", path: "/intro" as Route },
            { name: "JOURNAL", path: "/journal" as Route },
            { name: "RESOURCES", path: "/resources" as Route },
            { name: "OUR TEAM", path: "/team" as Route },
            { name: "INITIATIVES", path: "/initiatives" as Route },
            { name: "BETWEEN PEAKS", path: "/betweenpeaks" as Route },
            { name: "CONTACT", path: "/contact" as Route },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => nav(item.path)}
              className="px-6 py-3 rounded-xl border border-white/40 text-white/90 hover:bg-white/10 transition text-sm tracking-wide"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* INTRO */}
      {route === "/intro" && (
        <Overlay onClose={() => nav("/")}>
          <div className="w-full max-w-3xl mx-auto px-4 md:px-8 text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white/95 mb-4">Welcome to the MCA&apos;s website!</h2>
            <p className="text-base md:text-lg leading-relaxed text-white/85 mb-8">
              First and foremost MCA is a community. The club is centered around us pushing ourselves mentally and physically
              in the mountains, but we also aim to support our members in all of their pursuits.
            </p>
            <div className="space-y-7">
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">What kind of gear do I need?</div>
                <p className="text-base leading-relaxed text-white/85">
                  You don’t need to have any special equipment to come on MCA trips (all necessary equipment is provided)
                  though at some point you may choose to purchase your own boots or other equipment.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What if I don’t have any backpacking or mountaineering experience?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  No worries. The point of this club is to decrease the barriers of entry to outdoor activities, and help more
                  people go on sick adventures!
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What is the difference between the Arizona State Outdoors Club and the Mountaineering Club at Arizona State
                  University?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  You should absolutely do both! Our mountaineering club is focused more on larger objectives that are out of
                  state while the outdoors club engage in a larger variety of outings while mostly staying in state. That
                  being said, our mountaineering club still goes on lots of smaller trips for fun and team bonding.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">What does the time commitment look like?</div>
                <p className="text-base leading-relaxed text-white/85">
                  The time commitment is totally up to you. We welcome all different levels of involvement with the club. We
                  have lots of fun events during the week like climbing local rock walls and our club meetings. The only
                  requirement would be for more advanced trips we will need to make sure every participant is ready.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">How much do trips cost?</div>
                <p className="text-base leading-relaxed text-white/85">
                  All of our daily trips are free. We will split the cost of break trips, meaning splitting gas, flight and
                  food costs. Plus the cost of rentals but that shouldn’t cost more than 50 dollars per person on the most
                  advanced trips where you need to have specialized boots, crampons and ice axes. IF your trip doesn’t need
                  that equipment we should have all the equipment necessary for each participant.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <InstagramGrid />
            </div>
          </div>
        </Overlay>
      )}

      {/* TEAM */}
      {route === "/team" && (
        <Overlay onClose={() => nav("/")}>
          <div>
            <div className="mb-6 text-center">
              <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">OUR TEAM</h2>
              <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
            </div>
            <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/bos.jpg"
                alt="Mountaineering Club group in the mountains"
                className="w-full h-80 object-cover opacity-90 hover:opacity-100 transition duration-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "David Jacobs", img: "377d2192-35b7-41ac-8e64-3a84a7d9001b.jpg", bio: "The best advisor!" },
                { name: "Tony & Charlie", img: "/charlie%20and%20I.jpeg", bio: "" },
                { name: "Anabelle", img: "anabelle.jpeg", bio: "" },
                { name: "Zahrah", img: "zahrah.jpeg", bio: "" },
                { name: "Kira", img: "", bio: "" },
                { name: "Cait", img: "", bio: "" },
                { name: "Ridham", img: "", bio: "" },
                { name: "Alina", img: "", bio: "" },
                { name: "Arnab", img: "", bio: "" },
                { name: "Twizere", img: "", bio: "" },
                { name: "Eugene", img: "", bio: "" },
                { name: "Marvin", img: "", bio: "" },
                { name: "Aidan", img: "DA88AD1B-D386-415C-905E-F621E68C4B6C.png", bio: "Nonchalant King" },
                { name: "Ani", img: "4C563129-9AA1-4B37-8CBD-FA7A1E2F0247.png", bio: "Your Average Guy" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-b from-white/5 to-black/40 hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-80 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-0 w-full text-center pb-6 transform translate-y-6 group-hover:translate-y-0 transition duration-500">
                    <h3 className="text-white text-lg font-bold tracking-wide drop-shadow-lg">{m.name}</h3>
                    <p className="text-white/90 text-sm px-6 mt-2 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition duration-500">
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Overlay>
      )}

     {/* INITIATIVES */}
{route === "/initiatives" && (
  <Overlay onClose={() => nav("/")}>
    <InitiativesPanel navToContact={() => nav("/contact")} />
  </Overlay>
)}

      {/* RESOURCES */}
      {route === "/resources" && (
        <Overlay onClose={() => nav("/")}>
          <ResourcesPanel />
        </Overlay>
      )}

      {/* JOURNAL */}
      {route === "/journal" && (
        <Overlay onClose={() => nav("/")}>
          <JournalGallery />
        </Overlay>
      )}

      {/* BETWEEN PEAKS */}
      {route === "/betweenpeaks" && (
        <Overlay onClose={() => nav("/")}>
          <div className="text-center space-y-6">
            <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">Between Peaks</h2>
            <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
            <p className="text-white/80 max-w-3xl mx-auto">Well... Between Peaks</p>
            <p className="text-white/80 max-w-3xl mx-auto italic">(An artsy page dedicated to our members and what matters to them)</p>
          </div>
        </Overlay>
      )}

      {/* CONTACT */}
      {route === "/contact" && (
        <Overlay onClose={() => nav("/")}>
          <div>
            <div className="mb-6">
              <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">CONTACT</h2>
              <div className="mt-2 h-px w-40 bg-white/30" />
            </div>
            <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="md:col-span-1">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">NAME</label>
                <input
                  className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                  placeholder=""
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">EMAIL</label>
                <input
                  type="email"
                  className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                  placeholder=""
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">MESSAGE</label>
                <textarea
                  rows={6}
                  className="w-full rounded-md bg-transparent text-white/90 px-4 py-3 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                  placeholder=""
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 pt-2">
                <button className="px-5 py-2 rounded-md bg-white text-black/80 tracking-[0.3em] text-xs font-medium hover:bg-white/90 transition">
                  SEND MESSAGE
                </button>
                <button type="reset" className="px-5 py-2 rounded-md border border-white/30 text-white/90 tracking-[0.3em] text-xs hover:bg-white/10">
                  RESET
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </BackgroundWrapper>
  );
}

/* -----------------------------
   RESOURCES PANEL (folders + docs + partnerships)
----------------------------- */
function ResourcesPanel() {
  type FolderKey = "trip" | "safety" | "club" | "scholarships" | "community" | "perks";
  const [activeFolder, setActiveFolder] = useState<FolderKey>("trip");

  /**
   * ✅ Sponsor logos
   * You said KAYA logo is in /public/thanksani/
   * Put the file there and name it something simple like:
   *  - /public/thanksani/kayaweb.svg
   */
  const PARTNERS = [
    {
      name: "Arizona Hiking Shack",
      logoSrc: "fb8892c5-e8fe-4d0b-84d0-0661df7d948c.jpg",
      href: "https://hikingshack.com/",
      desc: "Local support that helps keep MCA trips and member access moving.",
      clickable: true,
    },
    {
      name: "KAYA",
      logoSrc: "/kayaweb.svg",
      href: "https://kayaclimb.com/",
      desc: "Providing MCA with KAYA Pro — helping members find outdoor boulders and discover new areas to climb.",
      clickable: true,
    },
    {
      name: "Red Bull",
      logoSrc: "955d8046-ab43-4da6-b44a-73d269014051.jpg",
      href: "https://www.redbull.com/",
      desc: "Support that helps fuel meetings and club energy during busy weeks.",
      clickable: true,
    },
  ] as const;

  const folders: { key: FolderKey; label: string; desc: string }[] = [
    { key: "trip", label: "TRIP PLANNING", desc: "Requirements, planning docs, templates, logistics." },
    { key: "safety", label: "SAFETY", desc: "Risk management, emergency readiness, winter policy, comms." },
    { key: "club", label: "CLUB DOCS", desc: "Constitution, handbook, internal standards." },
    { key: "scholarships", label: "SCHOLARSHIPS", desc: "Scholarship opportunities and grants for members." },
    { key: "community", label: "COMMUNITY", desc: "Other mountaineering communities + ways to connect." },
    { key: "perks", label: "PERKS", desc: "Discounts, partnerships, and club benefits." },
  ];

  const docsByFolder: Record<FolderKey, { title: string; desc: string; href: string; tag?: string }[]> = {
    trip: [
      {
        title: "Trip Lead Requirements",
        desc: "Requirements and standards to lead MCA trips.",
        href: "https://docs.google.com/document/d/1ofzv634Y10yx6ZnCrBMkwldAIk3gMtVjT7mwrhpQImM/edit?usp=sharing",
        tag: "Core",
      },
    ],
    safety: [
      {
        title: "Trainings & Certifications",
        desc: "Links and guidance to get trainings and certifications.",
        href: "https://docs.google.com/document/d/1728VyZs5yu9ZVHjm0YLFOemzpFC444MeoWlzudkpVlc/edit?usp=sharing",
        tag: "Starter",
      },
    ],
    club: [
      {
        title: "MCA Constitution",
        desc: "Club structure, bylaws, and standards.",
        href: "https://docs.google.com/document/d/1CTrwiLUBKHr0SxZPUCPeQbCh45u8hpWcBWShdq6ydSM/edit?usp=sharing",
        tag: "Core",
      },
      {
        title: "MCA Leader Handbook",
        desc: "Leader expectations, trip operations, and best practices.",
        href: "https://docs.google.com/document/d/1EjaF55Jssa_zOjDaEGnCpJq3qWocq-Aw7-2lcHlNbvc/edit?usp=sharing",
        tag: "Core",
      },
    ],
    scholarships: [
      {
        title: "Scholarships & Grants",
        desc: "Scholarship opportunities and funding resources.",
        href: "https://docs.google.com/document/d/10nj5-XzdDFhxrq_N63V0afARjfj9587QcXEkl83zULQ/edit?usp=sharing",
        tag: "Featured",
      },
    ],
    community: [
      {
        title: "Other Mountaineering Communities",
        desc: "Communities, networks, and places to connect.",
        href: "https://docs.google.com/document/d/1yD_hgmVmUaSK6TKiqNo5_BvWH-b-Gh-0GoNcxkaFxEU/edit?usp=sharing",
      },
      {
        title: "Jobs in Mountaineering",
        desc: "Jobs and pathways related to mountaineering and the outdoors.",
        href: "https://docs.google.com/document/d/1CXgie7euSoLiFTvQ2MQZ03cjE16M5fEh7J7XReFp6iM/edit?usp=sharing",
      },
    ],
    perks: [
      {
        title: "Club Perks & Discounts",
        desc: "Discounts club members get and other perks.",
        href: "https://docs.google.com/document/d/1QFAoM2aao97JoGmAfW31tdhEWMQ0d0ke46_GClttt8U/edit?usp=sharing",
      },
    ],
  };

  const activeDocs = docsByFolder[activeFolder];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 text-left">
      {/* Header */}
      <div className="mb-6">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">RESOURCES</h2>
        <div className="mt-2 h-px w-44 bg-white/30" />
      </div>

      {/* Intro */}
      <p className="text-white/80 leading-relaxed">A curated set of documents and references for training, trip readiness, and club standards.</p>

      {/* Featured doc: Scholarships & Grants */}
      <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Featured</div>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white/95">Scholarships & Grants</h3>
            <p className="mt-2 text-white/75 leading-relaxed">Funding opportunities for mountaineering, leadership, and outdoor access.</p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://docs.google.com/document/d/10nj5-XzdDFhxrq_N63V0afARjfj9587QcXEkl83zULQ/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg bg-white text-black/90 text-xs font-medium tracking-[0.25em] hover:bg-white/90 transition"
            >
              OPEN DOC
            </a>
            <a
              href="https://docs.google.com/document/d/10nj5-XzdDFhxrq_N63V0afARjfj9587QcXEkl83zULQ/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg border border-white/25 text-white/90 text-xs font-medium tracking-[0.25em] hover:bg-white/10 transition"
            >
              COPY LINK
            </a>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/30">
          <iframe
            title="Scholarships & Grants Preview"
            src="https://docs.google.com/document/d/10nj5-XzdDFhxrq_N63V0afARjfj9587QcXEkl83zULQ/preview"
            className="w-full"
            style={{ height: "520px", border: 0 }}
          />
        </div>

        <p className="mt-3 text-white/60 text-sm">If the preview doesn’t load, the doc’s embed setting may be restricted—use “OPEN DOC”.</p>
      </div>

      {/* Folder buttons */}
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {folders.map((f) => {
            const isActive = f.key === activeFolder;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFolder(f.key)}
                className={[
                  "rounded-xl px-4 py-3 text-left ring-1 transition",
                  isActive ? "bg-white/15 ring-white/25" : "bg-white/5 ring-white/10 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="text-white/95 text-xs tracking-[0.35em] uppercase">{f.label}</div>
                <div className="mt-2 text-white/75 text-sm leading-snug">{f.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Folder contents */}
        <div className="mt-5 rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Folder</div>
              <div className="mt-1 text-white/95 text-lg font-semibold">{folders.find((f) => f.key === activeFolder)?.label}</div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-white/55 text-xs">
              <span className="tracking-[0.25em] uppercase">Documents</span>
              <span className="text-white/45">({activeDocs.length})</span>
            </div>
          </div>

          {activeDocs.length === 0 ? (
            <p className="mt-4 text-white/70 text-sm">Nothing here yet — we can add documents as you publish them.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDocs.map((d, i) => (
                <div key={i} className="rounded-xl bg-black/20 ring-1 ring-white/10 p-4 hover:bg-black/30 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-white/95 font-semibold">
                        {d.title}
                        {d.tag ? (
                          <span className="ml-2 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] tracking-[0.25em] uppercase text-white/80">
                            {d.tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-white/75 text-sm leading-relaxed">{d.desc}</div>
                    </div>

                    <a
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 px-4 py-2 rounded-lg bg-white text-black/90 text-[11px] font-medium tracking-[0.25em] hover:bg-white/90 transition"
                    >
                      OPEN
                    </a>
                  </div>

                  <div className="mt-3">
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/55 hover:text-white/80 text-xs underline underline-offset-4"
                    >
                      Copy link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support & Partnerships (beneath folder section) */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/90 text-xs tracking-[0.35em] uppercase">Support & Partnerships</div>
              <h3 className="mt-1 text-lg md:text-xl font-semibold text-white/95">Partners who help make access possible</h3>
              <p className="mt-2 text-white/75 text-sm leading-relaxed max-w-2xl">
                We work with organizations and local businesses that support outdoor access, sustainability, and community-driven initiatives.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {PARTNERS.map((p) => {
              const Logo = (
                <img
                  src={p.logoSrc}
                  alt={`${p.name} logo`}
                  className="h-16 w-auto object-contain rounded-lg bg-white/90 p-2"
                  loading="lazy"
                />
              );

              return (
                <div key={p.name} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="shrink-0">
                      {p.clickable ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block hover:opacity-90 transition"
                          aria-label={`Visit ${p.name} website`}
                        >
                          {Logo}
                        </a>
                      ) : (
                        Logo
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-white/95 font-semibold">{p.name}</div>
                      <div className="mt-1 text-white/75 text-sm leading-relaxed">{p.desc}</div>
                      {p.clickable ? (
                        <div className="mt-2">
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/55 hover:text-white/85 text-xs underline underline-offset-4"
                          >
                            Visit website
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle CTA */}
          <div className="mt-6 rounded-2xl bg-black/20 ring-1 ring-white/10 p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              Interested in supporting student-led outdoor access, education, or community initiatives?{" "}
              <a
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = "#/contact";
                }}
                className="text-white/90 hover:text-white underline underline-offset-4"
              >
                Reach out here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}