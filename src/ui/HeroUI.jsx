// import React from "react";

// const HeroUI = ({
//   contests,
//   loading,
//   error,
//   scrollRef,
//   activeIndex,
//   handleScroll,
//   scrollToSlide,
//   onJoinClick,
// }) => {
//   if (loading)
//     return (
//       <div className="h-[320px] md:h-[600px] w-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl" />
//     );

//   if (error)
//     return (
//       <div className="h-[250px] md:h-[400px] flex items-center justify-center text-red-500 text-lg">
//         Error loading contests
//       </div>
//     );

//   if (contests.length === 0) return null;

//   return (
//     <section className="w-full bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff] overflow-hidden">
//       <div className="relative">
//         {/* softer + smaller blur for mobile */}
//         <div className="absolute top-0 left-0 w-[180px] md:w-[500px] h-[180px] md:h-[500px] bg-emerald-300 rounded-full blur-[100px] md:blur-[140px] opacity-20 pointer-events-none"></div>
//         <div className="absolute bottom-0 right-0 w-[150px] md:w-[400px] h-[150px] md:h-[400px] bg-indigo-300 rounded-full blur-[100px] md:blur-[140px] opacity-20 pointer-events-none"></div>

//         {/* Slider */}
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar relative z-10"
//         >
//           {contests.map((contest, index) => (
//             <div
//               key={contest._id || index}
//               className="min-w-full snap-start flex items-center h-auto md:h-[700px] py-10 md:py-0"
//             >
//               <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
//                 {/* LEFT (mobile optimized) */}
//                 <div className="space-y-4 text-left">
//                   <div className="inline-block px-3 py-1 text-[10px] md:text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full shadow-sm">
//                     Ends {new Date(contest.deadline).toLocaleDateString()}
//                   </div>

//                   <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-gray-900 leading-snug">
//                     {contest.title}
//                   </h1>

//                   <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
//                     {contest.description?.slice(0, 100) ||
//                       "Participate in this contest and showcase your skills."}
//                   </p>

//                   {/* buttons = thumb friendly */}
//                   <div className="flex gap-3 pt-2">
//                     <button
//                       onClick={() => onJoinClick(contest._id)}
//                       className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold shadow-md active:scale-95 transition"
//                     >
//                       Join
//                     </button>

//                     <button className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm bg-white/70">
//                       Details
//                     </button>
//                   </div>
//                 </div>

//                 {/* RIGHT (image becomes secondary on mobile) */}
//                 <div className="flex justify-center md:justify-end mt-2 md:mt-0">
//                   <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-3 md:p-6 border border-white/40">
//                     <img
//                       src={contest.image}
//                       alt=""
//                       className="w-[180px] sm:w-[220px] md:w-full max-w-sm object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination (closer + cleaner) */}
//         <div className="absolute bottom-2 md:bottom-8 left-0 w-full flex justify-center gap-2 z-10">
//           {contests.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => scrollToSlide(i)}
//               className={`h-2 rounded-full transition-all ${
//                 i === activeIndex
//                   ? "w-6 md:w-10 bg-emerald-500"
//                   : "w-2 bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </section>
//   );
// };

// export default HeroUI;

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
      <div className="h-[350px] md:h-[600px] w-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl" />
    );

  if (error)
    return (
      <div className="h-[300px] md:h-[400px] flex items-center justify-center text-red-500 text-lg px-4 text-center">
        Error loading contests. Please try again later.
      </div>
    );

  if (!contests || contests.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff] overflow-hidden relative">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-[150px] md:w-[500px] h-[150px] md:h-[500px] bg-emerald-300 rounded-full blur-[80px] md:blur-[140px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[120px] md:w-[400px] h-[120px] md:h-[400px] bg-indigo-300 rounded-full blur-[80px] md:blur-[140px] opacity-20 pointer-events-none"></div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar relative z-10"
      >
        {contests.map((contest, index) => (
          <div
            key={contest._id || index}
            className="min-w-full snap-start flex items-center min-h-[500px] md:min-h-[600px] lg:h-[700px] py-12 md:py-20"
          >
            <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* CONTENT SECTION */}
              <div className="order-2 lg:order-1 space-y-5 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 rounded-full shadow-sm">
                  Ends {new Date(contest.deadline).toLocaleDateString()}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  {contest.title}
                </h1>

                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {contest.description?.slice(0, 140) ||
                    "Participate in this contest and showcase your skills to win amazing prizes."}
                  {contest.description?.length > 140 ? "..." : ""}
                </p>

                {/* Buttons - Full width on small mobile, auto on larger */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <button
                    onClick={() => onJoinClick(contest._id)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all"
                  >
                    Join Contest
                  </button>

                  <button className="px-8 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold bg-white/50 backdrop-blur-md hover:bg-white transition-all">
                    View Details
                  </button>
                </div>
              </div>

              {/* IMAGE SECTION */}
              <div className="order-1 lg:order-2 flex justify-center items-center">
                <div className="relative group">
                  {/* Decorative Glow behind image */}
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>

                  <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl p-2 md:p-4 border border-white/50">
                    <img
                      src={contest.image}
                      alt={contest.title}
                      className="
                        w-[220px] sm:w-[280px] md:w-[350px] lg:w-[450px]
                        aspect-[4/3] md:aspect-auto
                        object-cover md:object-contain
                        rounded-xl
                        transition-transform duration-500 group-hover:scale-[1.02]
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modernized Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center gap-3 z-20">
        {contests.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 md:w-12 bg-emerald-600"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default HeroUI;
