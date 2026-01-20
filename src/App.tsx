import { useEffect, useState } from "react";

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

const INSTAGRAM_URL = "https://instagram.com/asu_mountaineering";
const INSTAGRAM_POSTS = [
  {
    img: "https://via.placeholder.com/300x300?text=Climb+1",
    url: "https://www.instagram.com/p/example1/",
  },
  {
    img: "https://via.placeholder.com/300x300?text=Meeting",
    url: "https://www.instagram.com/p/example2/",
  },
  {
    img: "https://via.placeholder.com/300x300?text=Summit",
    url: "https://www.instagram.com/p/example3/",
  },
  {
    img: "https://via.placeholder.com/300x300?text=Training",
    url: "https://www.instagram.com/p/example4/",
  },
  {
    img: "https://via.placeholder.com/300x300?text=Group+Hike",
    url: "https://www.instagram.com/p/example5/",
  },
  {
    img: "https://via.placeholder.com/300x300?text=Desert+Trip",
    url: "https://www.instagram.com/p/example6/",
  },
];

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full text-white overflow-hidden"
      style={{
        // Fallbacks so the layout works even if Tailwind CSS isn’t loading
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0a0a0a",
        backgroundImage: `linear-gradient(rgba(140,29,64,0.45), rgba(10,10,10,0.62)), url("${mountainImgPrimary}"), url("${mountainImgFallback}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* minimal animation + hide global scrollbar */}
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

function Overlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  // Whole panel scrolls with the page (not fixed)
  return (
    <div className="w-full flex justify-center py-8 md:py-12">
      <div className="relative mx-4 w-full max-w-5xl rounded-2xl bg-black/60 backdrop-blur-md shadow-2xl ring-1 ring-white/10 p-6 md:p-10 animate-slideUpFade">
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 h-10 w-10 rounded-full bg-black/30 ring-1 ring-white/25 text-white/80 hover:text-white hover:bg-black/40 transition grid place-items-center backdrop-blur-sm"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function InstagramGrid() {
  return (
    <div className="mt-8 bg-white/5 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="uppercase tracking-widest text-sm text-white/80">
          Our Instagram
        </h3>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-pink-400 hover:text-pink-300 text-sm"
        >
          @{INSTAGRAM_URL.split("/").pop()}
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {INSTAGRAM_POSTS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer">
            <img
              src={p.img}
              alt={`Instagram post ${i + 1}`}
              className="rounded-lg hover:opacity-80 transition"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ASUMountaineeringSite() {
  const [route, setRoute] = useState<Route>("/");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash.replace("#", "") || "/") as Route;
      setRoute(ROUTES.includes(hash) ? hash : "/");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const nav = (path: Route) =>
    (window.location.hash = path === "/" ? "#/" : `#${path}`);

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
            fontFamily:
              "Oswald, 'Bebas Neue', 'Helvetica Neue', Arial, sans-serif",
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
              <span
                style={{
                  display: "block",
                  transform: "rotate(-90deg) scaleY(-1)",
                }}
              >
                A
              </span>
              <span
                style={{
                  display: "block",
                  transform: "rotate(-90deg) scaleY(-1)",
                  marginTop: "-0.1em",
                }}
              >
                T
              </span>
            </span>
          </div>

          <span className="block mt-2">ARIZONA STATE UNIVERSITY</span>

          {/* Divider line (the “black line” across the middle) */}
          <div className="mx-auto mt-34 h-[2px] w-[min(680px,90vw)] bg-transparent" />

          {/* Dedication text tight to divider */}
          <div
            className="mt-16 text-white/80"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Libre Baskerville', 'Times New Roman', serif",
              letterSpacing: "0.18em",
            }}
          >
            <span className="block text-sm md:text-base">
              FOR TYLER HUGON AND TESS COLLINS
            </span>
          </div>
        </h1>

        {/* Buttons beneath dedication */}
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
            <h2 className="text-2xl md:text-3xl font-semibold text-white/95 mb-4">
              Welcome to the MCA&apos;s website!
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-white/85 mb-8">
              First and foremost MCA is a community. The club is centered around
              us pushing ourselves mentally and physically in the mountains, but
              we also aim to support our members in all of their pursuits.
            </p>

            <div className="space-y-7">
              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What kind of gear do I need?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  You don’t need to have any special equipment to come on MCA
                  trips (all necessary equipment is provided) though at some
                  point you may choose to purchase your own boots or other
                  equipment.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What if I don’t have any backpacking or mountaineering
                  experience?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  No worries. The point of this club is to decrease the barriers
                  of entry to outdoor activities, and help more people go on sick
                  adventures!
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What is the difference between the Arizona State Outdoors Club
                  and the Mountaineering Club at Arizona State University?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  You should absolutely do both! Our mountaineering club is
                  focussed more on larger objectives that are out of state while
                  the Outdoors club engage in a larger variety of outings while
                  mostly staying in state. That being said, our mountaineering
                  club still goes on lots of smaller trips for fun and team
                  bonding.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  What does the time commitment look like?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  The time commitment is totally up to you. We welcome all
                  different levels of involvement with the club. We have lots of
                  fun events during the week like climbing local rock walls and
                  our club meetings. The only requirement would be for more
                  advanced trips we will need to make sure every participant is
                  ready.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-lg md:text-xl font-semibold text-white/95">
                  How much do trips cost?
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  All of our daily trips are free. We will split the cost of
                  break trips, meaning splitting gas, flight and food costs.
                  Plus the cost of rentals but that shouldn’t cost more than 50
                  dollars per person on the most advanced trips where you need
                  to have specialized boots, crampons and ice axes. IF your trip
                  doesn’t need that equipment we should have all the equipment
                  necessary for each participant.
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
              <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">
                OUR TEAM
              </h2>
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
                { name: "David Jacobs", img: "", bio: "The best advisor!" },
                { name: "Tony & Charlie", img: "/charlie%20and%20I.jpeg", bio: "" },
                { name: "Anabelle", img: "", bio: "" },
                { name: "Ani", img: "", bio: "" },
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
                    <h3 className="text-white text-lg font-bold tracking-wide drop-shadow-lg">
                      {m.name}
                    </h3>
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
          <div className="mb-6 text-center">
            <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">
              INITIATIVES
            </h2>
            <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
          </div>
          <p className="text-white/80">
            Placeholder for club initiatives (e.g., adaptive treks,
            sustainability projects, rescue-readiness workshops, mentorship).
            We’ll fill this out together.
          </p>
        </Overlay>
      )}

      {/* RESOURCES (FIXED - no hooks-in-IIFE) */}
      {route === "/resources" && (
        <Overlay onClose={() => nav("/") as Route}>
          <ResourcesPanel />
        </Overlay>
      )}

      {/* JOURNAL */}
      {route === "/journal" && (
        <Overlay onClose={() => nav("/") as Route}>
          <div className="text-white/80">Journal placeholder (upload PDFs later).</div>
        </Overlay>
      )}

      {/* BETWEEN PEAKS */}
      {route === "/betweenpeaks" && (
        <Overlay onClose={() => nav("/") as Route}>
          <div className="text-center space-y-6">
            <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">
              Between Peaks
            </h2>
            <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
            <p className="text-white/80 max-w-3xl mx-auto">Well... Between Peaks</p>
            <p className="text-white/80 max-w-3xl mx-auto italic">
              (An artsy page dedicated to our members and what matters to them)
            </p>
          </div>
        </Overlay>
      )}

      {/* CONTACT */}
      {route === "/contact" && (
        <Overlay onClose={() => nav("/") as Route}>
          <div>
            <div className="mb-6">
              <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">
                CONTACT
              </h2>
              <div className="mt-2 h-px w-40 bg-white/30" />
            </div>
            <form
              className="grid md:grid-cols-2 gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="md:col-span-1">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">
                  NAME
                </label>
                <input
                  className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                  placeholder=""
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                  placeholder=""
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">
                  MESSAGE
                </label>
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
                <button
                  type="reset"
                  className="px-5 py-2 rounded-md border border-white/30 text-white/90 tracking-[0.3em] text-xs hover:bg-white/10"
                >
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
   RESOURCES PANEL (folders + docs)
----------------------------- */
function ResourcesPanel() {
  type FolderKey = "trip" | "safety" | "leadership" | "club";
  const [activeFolder, setActiveFolder] = useState<FolderKey>("leadership");

  const folders: { key: FolderKey; label: string; desc: string }[] = [
    {
      key: "trip",
      label: "TRIP PLANNING",
      desc: "Templates, checklists, logistics, and planning tools.",
    },
    {
      key: "safety",
      label: "SAFETY",
      desc: "Risk management, emergency readiness, winter policy, comms.",
    },
    {
      key: "leadership",
      label: "LEADERSHIP",
      desc: "How we lead: requirements, expectations, training pathways.",
    },
    {
      key: "club",
      label: "CLUB DOCS",
      desc: "Constitution, officer structure, internal standards.",
    },
  ];

  const docsByFolder: Record<
    FolderKey,
    { title: string; desc: string; href: string; tag?: string }[]
  > = {
    trip: [],
    safety: [],
    leadership: [
      {
        title: "Trip Lead Requirements",
        desc: "Requirements and standards to lead MCA trips.",
        href: "https://docs.google.com/document/d/1ofzv634Y10yx6ZnCrBMkwldAIk3gMtVjT7mwrhpQImM/edit?usp=sharing",
        tag: "Core",
      },
    ],
    club: [],
  };

  const activeDocs = docsByFolder[activeFolder];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 text-left">
      {/* Header */}
      <div className="mb-6">
        <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">
          RESOURCES
        </h2>
        <div className="mt-2 h-px w-44 bg-white/30" />
      </div>

      {/* Intro */}
      <p className="text-white/80 leading-relaxed">
        A curated set of documents and references for training, trip readiness,
        and club standards.
      </p>

      {/* Featured doc */}
      <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-white/90 text-xs tracking-[0.35em] uppercase">
              Featured
            </div>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white/95">
              MCA Resource Document
            </h3>
            <p className="mt-2 text-white/75 leading-relaxed">
              Our living guide with club info, planning notes, and key references.
            </p>
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
            title="MCA Resource Document Preview"
            src="https://docs.google.com/document/d/10nj5-XzdDFhxrq_N63V0afARjfj9587QcXEkl83zULQ/preview"
            className="w-full"
            style={{ height: "520px", border: 0 }}
          />
        </div>

        <p className="mt-3 text-white/60 text-sm">
          If the preview doesn’t load, the doc’s embed setting may be
          restricted—use “OPEN DOC”.
        </p>
      </div>

      {/* Folder buttons */}
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {folders.map((f) => {
            const isActive = f.key === activeFolder;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFolder(f.key)}
                className={[
                  "rounded-xl px-4 py-3 text-left ring-1 transition",
                  isActive
                    ? "bg-white/15 ring-white/25"
                    : "bg-white/5 ring-white/10 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="text-white/95 text-xs tracking-[0.35em] uppercase">
                  {f.label}
                </div>
                <div className="mt-2 text-white/75 text-sm leading-snug">
                  {f.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Folder contents */}
        <div className="mt-5 rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
          {activeDocs.length === 0 ? (
            <p className="mt-4 text-white/70 text-sm">
              Nothing here yet — we’ll add documents as they’re published.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDocs.map((d, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-black/20 ring-1 ring-white/10 p-4 hover:bg-black/30 transition"
                >
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
                      <div className="mt-1 text-white/75 text-sm leading-relaxed">
                        {d.desc}
                      </div>
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
      </div>
    </div>
  );
}
