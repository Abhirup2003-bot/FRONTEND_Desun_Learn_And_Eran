import React from "react";

const HeroUI = ({
  contests,
  loading,
  error,
  scrollRef,
  activeIndex,
  handleScroll,
  scrollToSlide,
  onJoinClick,
}) => {
  if (loading)
    return (
      <div className="h-[600px] w-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl" />
    );

  if (error)
    return (
      <div className="h-[400px] flex items-center justify-center text-red-500 text-lg">
        Error loading contests
      </div>
    );

  if (contests.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff] overflow-hidden">
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-300 rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-300 rounded-full blur-[140px] opacity-20"></div>

        {/* Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {contests.map((contest, index) => (
            <div
              key={contest._id || index}
              className="min-w-full snap-start flex items-center h-[80vh] md:h-[700px]"
            >
              <div className="container mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-block px-4 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full shadow-sm backdrop-blur">
                    Upcoming • Ends{" "}
                    {new Date(contest.deadline).toLocaleDateString()}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                    {contest.title}
                  </h1>

                  {/* Description */}
                  <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                    {contest.description?.slice(0, 120) ||
                      "Participate in this contest and showcase your skills with real-world challenges."}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => onJoinClick(contest._id)}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Join Contest
                    </button>

                    <button className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 backdrop-blur-md bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center">
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/40 hover:scale-105 transition duration-500">
                    <img
                      src={contest.image}
                      alt=""
                      className="w-full max-w-sm object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-3">
          {contests.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-10 bg-gradient-to-r from-emerald-500 to-green-600 shadow-md"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default HeroUI;
