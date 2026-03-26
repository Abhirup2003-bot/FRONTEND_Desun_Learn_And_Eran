import React, { useState, useEffect, useCallback } from "react";

// ── Dummy contest data ─────────────────────────────────────────────────────────
// Replace this array with your API response when ready:
// const res = await fetch("/api/contests/featured"); const CONTESTS = await res.json();
const CONTESTS = [
  {
    id: 1,
    label: "FEATURED CONTEST",
    title: "Neural Architecture Challenge",
    entrants: "2.4k Entrants",
    timeLeft: "14h Left",
    prize: "₹10,000",
    category: "Machine Learning",
    image:
      "https://www.figma.com/api/mcp/asset/234d44bc-5031-453a-adbc-e5e64ad895cb",
  },
  {
    id: 2,
    label: "UPCOMING CONTEST",
    title: "Quantum Security Protocol",
    entrants: "1.8k Entrants",
    timeLeft: "2d Left",
    prize: "₹8,000",
    category: "Cybersecurity",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: 3,
    label: "LIVE NOW",
    title: "Rust Performance Blitz",
    entrants: "3.1k Entrants",
    timeLeft: "6h Left",
    prize: "₹6,000",
    category: "Systems",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 4,
    label: "FEATURED CONTEST",
    title: "Pandas Speed-Run Championship",
    entrants: "980 Entrants",
    timeLeft: "3d Left",
    prize: "₹4,500",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dir, setDir] = useState("next");
  const total = CONTESTS.length;

  const goTo = useCallback(
    (rawIdx, direction = "next") => {
      setDir(direction);
      setActiveIndex(((rawIdx % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(
    () => goTo(activeIndex + 1, "next"),
    [activeIndex, goTo],
  );
  const prev = useCallback(
    () => goTo(activeIndex - 1, "prev"),
    [activeIndex, goTo],
  );

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="w-full bg-[#f1f6e3] px-4 sm:px-6 pt-10 sm:pt-12 pb-16 sm:pb-20 font-sans box-border">
      <div className="max-w-[1232px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[42px]">
        {/* ────────── LEFT COLUMN ────────── */}
        <div className="flex flex-col gap-6 sm:gap-7 w-full lg:w-[592px] lg:flex-shrink-0">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-[#c8f08f] px-4 py-1.5 rounded-full w-fit">
            {/* Bolt icon */}
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
              <path
                d="M5.25 0.5L0.75 6.5H4.5L3.75 11.5L8.25 5.5H4.5L5.25 0.5Z"
                fill="#4d6e1d"
              />
            </svg>
            <span
              className="font-bold text-[11px] tracking-[0.05em] text-[#4d6e1d] uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Live Now: Global Algo-Sprint
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[42px] sm:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.05em] text-[#191d12] leading-[1.05] m-0"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Master the <span className="text-[#436900]">Kinetic</span>
            <br />
            Way.
          </h1>

          {/* Body */}
          <p className="text-base sm:text-lg leading-relaxed text-[#424936] m-0 max-w-[540px]">
            Join high-velocity contests and curated learning paths designed for
            the modern competitor. Bridge the gap between theory and arena-ready
            skill.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-1">
            <button
              className="text-white font-bold text-base sm:text-lg px-7 py-4 rounded-lg border-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
              style={{
                fontFamily: "'Manrope', sans-serif",
                background: "linear-gradient(135deg, #436900 0%, #82c600 100%)",
                boxShadow: "0 8px 20px -4px rgba(67,105,0,0.4)",
              }}
            >
              Start Competing
            </button>
            <button
              className="text-[#436900] font-bold text-base sm:text-lg px-7 py-4 rounded-lg cursor-pointer bg-transparent border border-[rgba(67,105,0,0.35)] transition-colors duration-150 hover:bg-[#e6edcc]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Browse Paths
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 sm:gap-10 pt-1">
            {[
              { value: "24+", label: "Active Contests" },
              { value: "1.4k", label: "Participants" },
              { value: "$156k", label: "Prize Pool" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span
                  className="text-2xl sm:text-[26px] font-extrabold text-[#436900] leading-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {value}
                </span>
                <span className="text-xs font-medium text-[#6b7a5c]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ────────── RIGHT COLUMN — Slider ────────── */}
        <div className="relative w-full lg:w-[597px] lg:flex-shrink-0">
          {/* Decorative blobs */}
          <div
            className="absolute -top-10 -right-12 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none"
            style={{
              background: "rgba(130,198,0,0.2)",
              filter: "blur(32px)",
              zIndex: 0,
            }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-36 sm:w-48 h-36 sm:h-48 rounded-full pointer-events-none"
            style={{
              background: "rgba(154,43,162,0.1)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />

          {/* Tilted card wrapper */}
          <div className="relative z-10" style={{ transform: "rotate(2deg)" }}>
            {/* Slide viewport */}
            <div
              className="relative w-full overflow-hidden rounded-xl bg-[#111]"
              style={{
                aspectRatio: "16 / 9",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
              }}
            >
              {CONTESTS.map((contest, i) => (
                <div
                  key={contest.id}
                  className="absolute inset-0 transition-all duration-[450ms]"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform:
                      i === activeIndex
                        ? "translateX(0) scale(1)"
                        : dir === "next"
                          ? "translateX(40px) scale(0.97)"
                          : "translateX(-40px) scale(0.97)",
                    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                >
                  {/* Image */}
                  <img
                    src={contest.image}
                    alt={contest.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
                    }}
                  />

                  {/* Contest info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col gap-2">
                    <span
                      className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#82c600]"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {contest.label}
                    </span>
                    <h3
                      className="text-lg sm:text-[22px] font-extrabold text-white m-0 leading-snug"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {contest.title}
                    </h3>
                    <div className="flex items-center gap-4 sm:gap-5 mt-1 flex-wrap">
                      {/* Entrants */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          width="11"
                          height="9"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M8.5 4.5C9.33 4.5 10 3.83 10 3C10 2.17 9.33 1.5 8.5 1.5C7.67 1.5 7 2.17 7 3C7 3.83 7.67 4.5 8.5 4.5ZM3.5 4.5C4.33 4.5 5 3.83 5 3C5 2.17 4.33 1.5 3.5 1.5C2.67 1.5 2 2.17 2 3C2 3.83 2.67 4.5 3.5 4.5ZM3.5 5.5C2.17 5.5 -0.5 6.17 -0.5 7.5V8.5H7.5V7.5C7.5 6.17 4.83 5.5 3.5 5.5ZM8.5 5.5C8.33 5.5 8.13 5.51 7.92 5.53C8.61 6.03 9 6.72 9 7.5V8.5H12V7.5C12 6.17 9.83 5.5 8.5 5.5Z"
                            fill="rgba(255,255,255,0.75)"
                          />
                        </svg>
                        <span className="text-xs sm:text-[13px] text-white/80">
                          {contest.entrants}
                        </span>
                      </div>
                      {/* Time */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <circle
                            cx="5"
                            cy="5"
                            r="4.25"
                            stroke="rgba(255,255,255,0.75)"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 2.5V5L6.5 6"
                            stroke="rgba(255,255,255,0.75)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-xs sm:text-[13px] text-white/80">
                          {contest.timeLeft}
                        </span>
                      </div>
                      {/* Prize pill */}
                      <div
                        className="ml-auto bg-[#82c600] text-[#304d00] font-bold text-xs sm:text-[13px] px-3 py-1 rounded-full"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {contest.prize}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls — counter-rotate so they appear flat */}
            <div
              className="mt-4 flex items-center justify-between"
              style={{ transform: "rotate(-2deg)" }}
            >
              {/* Dots */}
              <div className="flex items-center gap-2">
                {CONTESTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > activeIndex ? "next" : "prev")}
                    className="h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 28 : 8,
                      background: i === activeIndex ? "#436900" : "#b8c4a0",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex gap-2.5">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 border border-[rgba(67,105,0,0.3)] bg-[rgba(67,105,0,0.12)] hover:bg-[rgba(67,105,0,0.25)]"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="#436900"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 border-none bg-[#436900] hover:bg-[#304d00]"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Counter */}
            <div
              className="mt-2 text-right text-xs font-semibold text-[#6b7a5c] tracking-[0.04em]"
              style={{ transform: "rotate(-2deg)" }}
            >
              {activeIndex + 1} / {total} contests
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
