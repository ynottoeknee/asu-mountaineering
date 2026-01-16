import { useEffect, useState } from "react";

// Background images
const mountainImgPrimary = "/McDowellMountainCentered.jpg";
const mountainImgFallback =
  "/McDowellMountainCentered.jpg";

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
  { img: "https://via.placeholder.com/300x300?text=Climb+1", url: "https://www.instagram.com/p/example1/" },
  { img: "https://via.placeholder.com/300x300?text=Meeting", url: "https://www.instagram.com/p/example2/" },
  { img: "https://via.placeholder.com/300x300?text=Summit", url: "https://www.instagram.com/p/example3/" },
  { img: "https://via.placeholder.com/300x300?text=Training", url: "https://www.instagram.com/p/example4/" },
  { img: "https://via.placeholder.com/300x300?text=Group+Hike", url: "https://www.instagram.com/p/example5/" },
  { img: "https://via.placeholder.com/300x300?text=Desert+Trip", url: "https://www.instagram.com/p/example6/" },
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

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
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
    <div className="mt-8 bg-white/5 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="uppercase tracking-widest text-sm text-white/80">Our Instagram</h3>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300 text-sm">
          @{INSTAGRAM_URL.split("/").pop()}
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {INSTAGRAM_POSTS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer">
            <img src={p.img} alt={`Instagram post ${i + 1}`} className="rounded-lg hover:opacity-80 transition" />
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

  const nav = (path: Route) => (window.location.hash = path === "/" ? "#/" : `#${path}`);

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
    <div className="mx-auto mt-10 h-[2px] w-[min(680px,90vw)] bg-transparent" />

    {/* Dedication text tight to divider */}
    <div
      className="mt-4 text-white/80"
      style={{
        fontFamily: "'Cormorant Garamond', 'Libre Baskerville', 'Times New Roman', serif",
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
          <div className="prose prose-invert max-w-none">
            <h2>Welcome to the MCA's website!</h2>
            {[0, 1].map((idx) => (
              <div key={idx}>
                <p>
                  The MCA is a community of ASU students interested in mountaineering and sustainability. As part of our
                  day-to-day activities, we run outdoor treks for kids with disabilities… We meet every Tuesday at 7 PM to
                  get some food and chat. We announce where we will meet on any given week through our weekly email.
                </p>
                <h3>What does the time commitment look like?</h3>
                <p>
                  The time commitment is totally up to you. We welcome all different levels of involvement with the club.
                  Most of our trips during the term are 8 hours long from campus to campus. Feeds are about an hour long
                  and social events are roughly two hours long.
                </p>
                <h3>How much do trips cost?</h3>
                <p>
                  All of our daily trips are free. Break trips normally cost around $170 (plus the cost of flights) but
                  financial aid applies.
                </p>
                <h3>What kind of gear do I need?</h3>
                <p>
                  You don’t need to have any special equipment to come on MCA trips (all necessary equipment is provided)
                  though at some point you may choose to purchase your own climbing shoes or other equipment.
                </p>
                <h3>What if I don’t have any climbing experience?</h3>
                <p>
                  No worries. Some of our most talented leaders hadn’t touched rock (or gone climbing indoors) before
                  coming to ASU.
                </p>
                <h3>What is the difference between the Arizona State Outdoors Club and the Mountaineering Club at Arizona State University?</h3>
                <p>
                  The MCA is focused on longer backpacking trips out of state, while the Outdoors Club focuses more on
                  local hikes and outings. However, there’s a lot of overlap of people in both clubs and participating in
                  one by no means means that you can’t participate in the other.
                </p>
              </div>
            ))}
            <p>
              To get on the club's email list, just email <a href="mailto:mountaineering.club@asu.edu">mountaineering.club@asu.edu</a>.
            </p>
            <InstagramGrid />
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
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1600&auto=format&fit=crop"
                alt="Group Photo"
                className="w-full h-80 object-cover opacity-90 hover:opacity-100 transition duration-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Alex (President)", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=800&auto=format&fit=crop", bio: "Desert peakbagger. Leads major expeditions and always packs an extra burrito." },
                { name: "Sam (Trips)", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", bio: "Trip mastermind. Loves technical challenges and early alpine starts." },
                { name: "Jules (Gear)", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop", bio: "Our gear whisperer—keeps every rope coiled and carabiner shiny." },
                { name: "Kai (Community)", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop", bio: "Connects climbers across campus and makes every event feel like family." },
              ].map((m, i) => (
                <div key={i} className="relative group overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-b from-white/5 to-black/40 hover:shadow-2xl transition-all duration-500">
                  <img src={m.img} alt={m.name} className="w-full h-80 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-0 w-full text-center pb-6 transform group-hover:translate-y-0 translate-y-6 transition duration-500">
                    <h3 className="text-white text-lg font-bold tracking-wide drop-shadow-lg">{m.name}</h3>
                    <p className="text-white/90 text-sm px-6 mt-2 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition duration-500">{m.bio}</p>
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
            <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">INITIATIVES</h2>
            <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
          </div>
          <p className="text-white/80">Placeholder for club initiatives (e.g., adaptive treks, sustainability projects, rescue‑readiness workshops, mentorship). We’ll fill this out together.</p>
        </Overlay>
      )}

      {/* RESOURCES */}
      {route === "/resources" && (
        <Overlay onClose={() => nav("/") as Route}>
          <div className="text-white/80">Resources placeholder.</div>
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
            <h2 className="uppercase tracking-[0.35em] text-white/90 text-xl">Between Peaks</h2>
            <div className="mx-auto mt-2 h-px w-40 bg-white/30" />
            <p className="text-white/80 max-w-3xl mx-auto">Between Peaks is our storytelling and reflection page — a place to share trip reports, journal entries, and personal moments from the mountains. Here, members can post their stories, photo essays, or reflections on what the climb meant to them.</p>
            <p className="text-white/80 max-w-3xl mx-auto italic">“The summit is what drives us, but the climb itself is what matters.”</p>
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
                <input className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none" placeholder="" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">EMAIL</label>
                <input type="email" className="w-full rounded-md bg-transparent text-white/90 px-4 py-2 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none" placeholder="" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs mb-2 tracking-[0.25em]">MESSAGE</label>
                <textarea rows={6} className="w-full rounded-md bg-transparent text-white/90 px-4 py-3 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 outline-none" placeholder="" />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 pt-2">
                <button className="px-5 py-2 rounded-md bg-white text-black/80 tracking-[0.3em] text-xs font-medium hover:bg-white/90 transition">SEND MESSAGE</button>
                <button type="reset" className="px-5 py-2 rounded-md border border-white/30 text-white/90 tracking-[0.3em] text-xs hover:bg-white/10">RESET</button>
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </BackgroundWrapper>
  );
}
