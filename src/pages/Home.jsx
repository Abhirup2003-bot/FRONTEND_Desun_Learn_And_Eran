import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, ContestCard } from "../components";

const Home = () => {
  const navigate = useNavigate();

  const contests = [
    {
      id: 1,
      title: "Neo-Vanguard Brand Identity",
      prize: 8500,
      time: "4 Days",
      level: "ACTIVE",
      tag: "BRANDING",
      host: "Kinetic Studio",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    },
    {
      id: 2,
      title: "Eco-Flow Mobile Experience",
      prize: 12000,
      time: "12 Hours",
      level: "ACTIVE",
      tag: "UI/UX",
      host: "GreenTech Inc",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    },
    {
      id: 3,
      title: "Urban Habitat 2050 Vision",
      prize: 45000,
      time: "9 Days",
      level: "HOT",
      tag: "3D RENDER",
      host: "ArchDaily",
      image: "https://images.unsplash.com/photo-1527430253228-e93688616381",
    },
  ];

  const handleExplore = () => {
    navigate("/contest", { state: contests });
  };
  return (
    <>
      <HeroSection />

      <div className="p-6">
        {/* 🔥 Combined Section */}
        <div className="bg-gradient-to-r from-[#82c600] to-green-400 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Explore Contests 🚀</h1>
              <p className="text-sm opacity-90">
                Join competitions & win rewards
              </p>
            </div>

            <button
              onClick={handleExplore}
              className="bg-white text-[#82c600] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Explore
            </button>
          </div>

          {/* 🔥 Cards inside same section (merged UI) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white/10 backdrop-blur-md p-1 rounded-2xl"
              >
                <ContestCard contest={contest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
