import { useEffect, useMemo, useState } from "react";

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
   JOURNAL: Poster gallery (covers + future PDFs)
----------------------------- */
type JournalPoster = {
  title: string;
  date?: string;
  coverImg: string; // image in /public
  pdfHref?: string; // optional future pdf link in /public/pdfs/...
  accent?: string; // optional glow color
};

function JournalGallery() {
  /**
   * ✅ Put your current poster image in:
   *   /public/thanksani/humphreys-poster.png
   * You said it’s in “public/thanksani”. If your filename has spaces, rename it to avoid deploy/path issues.
   *
   * Future posters:
   *  - drop images in /public/journal/
   *  - drop PDFs in /public/pdfs/
   *  - then add entries here.
   */
  const posters: JournalPoster[] = [
    {
      title: "Humphreys Peak",
      date: "Feb 24",
      coverImg: "/thanksani/humphreys-poster.png",
      pdfHref: "", // later: "/pdfs/humphreys.pdf"
      accent: "rgba(140,29,64,0.55)",
    },
    // Future placeholder examples (delete if you want)
    {
      title: "Future Trip Poster",
      date: "TBD",
      coverImg: "/journal/placeholder1.jpg",
      pdfHref: "",
      accent: "rgba(160,90,255,0.45)",
    },
    {
      title: "Future Workshop Poster",
      date: "TBD",
      coverImg: "/journal/placeholder2.jpg",
      pdfHref: "",
      accent: "rgba(255,140,0,0.35)",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-left">
      <div className="mb-6">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">JOURNAL</h2>
        <div className="mt-2 h-px w-40 bg-white/30" />
      </div>

      <p className="text-white/80 leading-relaxed max-w-3xl">
        Posters, trip recaps, and downloadable PDFs. Each cover can link to a PDF later (think “magazine shelf” vibe).
      </p>

      {/* Artistic “shelf” */}
      <div className="mt-7 rounded-3xl bg-black/25 ring-1 ring-white/10 p-5 md:p-7 overflow-hidden relative">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 55%)" }} />
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ background: "radial-gradient(circle at 90% 80%, rgba(140,29,64,0.20), transparent 60%)" }} />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "rgba(255,255,255,0.18)" }} />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "rgba(140,29,64,0.35)" }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posters.map((p, idx) => {
            const clickable = Boolean(p.pdfHref && p.pdfHref.trim().length > 0);

            const CardInner = (
              <div
                className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/30 hover:bg-black/40 transition"
                style={{
                  boxShadow: p.accent ? `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -30px ${p.accent}` : undefined,
                }}
              >
                <div className="relative">
                  <img
                    src={p.coverImg}
                    alt={`${p.title} poster`}
                    className="w-full aspect-[4/5] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white/95 font-semibold truncate">{p.title}</div>
                      <div className="mt-1 text-white/70 text-sm">{p.date ?? ""}</div>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-[10px] tracking-[0.25em] uppercase text-white/75 ring-1 ring-white/10">
                        {clickable ? "PDF" : "Cover"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-white/55 text-xs leading-relaxed">
                    {clickable ? "Open the PDF" : "Add a PDF link later"}
                  </div>
                </div>
              </div>
            );

            return clickable ? (
              <a key={idx} href={p.pdfHref} target="_blank" rel="noreferrer" className="block">
                {CardInner}
              </a>
            ) : (
              <div key={idx}>{CardInner}</div>
            );
          })}
        </div>

        <div className="mt-5 text-white/55 text-xs leading-relaxed">
          To add a PDF later: drop it into <span className="text-white/75">/public/pdfs/</span> and set{" "}
          <span className="text-white/75">pdfHref</span> like <span className="text-white/75">"/pdfs/yourfile.pdf"</span>.
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   INITIATIVES: Editable calendar
----------------------------- */
type CalendarColorKey = "purple" | "orange" | "green" | "pink" | "red" | "white" | "gray" | "blue" | "yellow" | "teal";

const CALENDAR_COLORS: Record<CalendarColorKey, { label: string; hex: string }> = {
  purple: { label: "Purple", hex: "#A78BFA" },
  orange: { label: "Orange", hex: "#FB923C" },
  green: { label: "Green", hex: "#34D399" },
  pink: { label: "Pink", hex: "#F472B6" },
  red: { label: "Red", hex: "#FB7185" },
  blue: { label: "Blue", hex: "#60A5FA" },
  teal: { label: "Teal", hex: "#2DD4BF" },
  yellow: { label: "Yellow", hex: "#FBBF24" },
  white: { label: "White", hex: "#FFFFFF" },
  gray: { label: "Gray", hex: "#CBD5E1" },
};

type CalendarEvent = {
  title: string;
  color: CalendarColorKey;
};

type DayCell = {
  day: number;
  events: CalendarEvent[];
};

function InitiativesCalendar() {
  // ✅ Change these two numbers each month
  const year = 2026;
  const monthIndex = 1; // 0=Jan, 1=Feb, ... 11=Dec

  const monthLabel = useMemo(() => new Date(year, monthIndex, 1).toLocaleString(undefined, { month: "long", year: "numeric" }), [year, monthIndex]);

  /**
   * ✅ EASIEST EDIT METHOD:
   * Just edit this object. Keys are day numbers.
   * Add / remove events, and pick a color key.
   */
  const monthEdits: Record<number, CalendarEvent[]> = {
    1: [{ title: "Winter Skills / Gear Check", color: "purple" }],
    7: [{ title: "Climbing Night", color: "green" }],
    12: [{ title: "Planning Meeting", color: "orange" }],
    24: [{ title: "Club Meeting", color: "red" }],
  };

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = firstDay.getDay(); // 0=Sun

  // Build calendar grid cells (6 rows x 7 cols)
  const cells: (DayCell | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, events: monthEdits[d] ?? [] });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-left">
      <div className="mb-6">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">INITIATIVES</h2>
        <div className="mt-2 h-px w-44 bg-white/30" />
      </div>

      <p className="text-white/80 leading-relaxed max-w-3xl">
        Workshops, trainings, service days, and trip timelines. Calendar is designed to be dead-simple to edit.
      </p>

      <div className="mt-7 rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
          <div>
            <div className="text-white/80 text-xs tracking-[0.35em] uppercase">Calendar</div>
            <div className="mt-1 text-white/95 text-2xl font-semibold">{monthLabel}</div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {(["purple", "orange", "green", "pink", "red"] as CalendarColorKey[]).map((k) => (
              <div key={k} className="inline-flex items-center gap-2 rounded-full bg-black/25 ring-1 ring-white/10 px-3 py-1">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: CALENDAR_COLORS[k].hex }} />
                <span className="text-white/70 text-xs">{CALENDAR_COLORS[k].label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdayLabels.map((w) => (
            <div key={w} className="text-white/60 text-xs tracking-[0.25em] uppercase px-2">
              {w}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell, idx) => (
            <div
              key={idx}
              className={[
                "min-h-[92px] rounded-2xl ring-1 p-2 md:p-3 transition",
                cell ? "bg-black/20 ring-white/10 hover:bg-black/30" : "bg-black/10 ring-white/5 opacity-60",
              ].join(" ")}
            >
              {cell ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-white/80 text-sm font-semibold">{cell.day}</div>
                  </div>

                  <div className="mt-2 space-y-1">
                    {cell.events.length === 0 ? (
                      <div className="text-white/35 text-[11px]">—</div>
                    ) : (
                      cell.events.map((ev, j) => (
                        <div
                          key={j}
                          className="text-[11px] leading-snug"
                          style={{
                            color: CALENDAR_COLORS[ev.color].hex,
                            textShadow: "0 1px 12px rgba(0,0,0,0.55)",
                          }}
                        >
                          • {ev.title}
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-black/20 ring-1 ring-white/10 p-4">
          <div className="text-white/80 text-xs tracking-[0.25em] uppercase">How to edit</div>
          <p className="mt-2 text-white/70 text-sm leading-relaxed">
            In <span className="text-white/85">InitiativesCalendar()</span>, edit{" "}
            <span className="text-white/85">monthEdits</span>. Example:
          </p>
          <pre className="mt-2 overflow-auto rounded-xl bg-black/40 ring-1 ring-white/10 p-3 text-white/75 text-xs">
{`const monthEdits = {
  24: [{ title: "Club Meeting", color: "red" }],
  25: [{ title: "Service Day", color: "green" }],
};`}
          </pre>
          <p className="mt-2 text-white/55 text-xs">
            Colors available: {Object.keys(CALENDAR_COLORS).join(", ")}
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
        <Overlay onClose={() => nav("/") as Route}>
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
        <Overlay onClose={() => nav("/") as Route}>
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
        <Overlay onClose={() => nav("/") as Route}>
          <InitiativesCalendar />
        </Overlay>
      )}

      {/* RESOURCES */}
      {route === "/resources" && (
        <Overlay onClose={() => nav("/") as Route}>
          <ResourcesPanel />
        </Overlay>
      )}

      {/* JOURNAL */}
      {route === "/journal" && (
        <Overlay onClose={() => nav("/") as Route}>
          <JournalGallery />
        </Overlay>
      )}

      {/* BETWEEN PEAKS */}
      {route === "/betweenpeaks" && (
        <Overlay onClose={() => nav("/") as Route}>
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
        <Overlay onClose={() => nav("/") as Route}>
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
      logoSrc: "/thanksani/kayaweb.svg",
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