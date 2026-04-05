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
    return <div className="h-[600px] w-full bg-gray-50 animate-pulse" />;
  if (error)
    return (
      <div className="h-[400px] flex items-center justify-center text-red-500">
        Error loading contests
      </div>
    );
  if (contests.length === 0) return null;

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="relative w-full">
        {/* Slider Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full bg-[#fcfcfc]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contests.map((contest, index) => (
            <div
              key={contest._id || index}
              className="min-w-full snap-start relative flex items-center h-[70vh] md:h-[650px] overflow-hidden"
            >
              {/* Background Glows */}
              <div
                className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
                style={{ backgroundColor: "#82c600" }}
              ></div>

              <div className="container mx-auto px-6 md:px-20 z-10 flex flex-col md:flex-row items-center w-full">
                {/* Text Side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className="inline-flex items-center gap-3 mb-6 bg-gray-100/50 p-1 pr-4 rounded-full border border-gray-100">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full text-white"
                      style={{ backgroundColor: "#82c600" }}
                    >
                      Upcoming
                    </span>
                    <span className="text-gray-500 text-xs font-bold">
                      Ends: {new Date(contest.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.95] mb-8 tracking-tighter uppercase">
                    {contest.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <button
                      onClick={() => onJoinClick(contest._id)}
                      className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-white transition-all hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
                      style={{ backgroundColor: "#82c600" }}
                    >
                      JOIN CONTEST
                    </button>
                    <button className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-gray-800 bg-white border-2 border-gray-100 hover:bg-gray-50 transition-all">
                      LEARN MORE
                    </button>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
                  <img
                    src={contest.image}
                    alt=""
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center md:justify-start md:left-20 gap-3 z-20">
          {contests.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === activeIndex ? "60px" : "20px",
                backgroundColor: i === activeIndex ? "#82c600" : "#e5e7eb",
              }}
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
