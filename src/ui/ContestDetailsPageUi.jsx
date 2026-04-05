import React from "react";
import { Clock, Users, Share2, Bookmark, CheckCircle2 } from "lucide-react";

const ContestDetailsPageUi = ({ data }) => {
  // Fallback data based on your screenshot for visual accuracy
  const displayData = data || {
    title: "The Kinetic Interface Global Challenge",
    category: "VISUAL SYSTEMS DESIGN",
    host: "Marcus Thorne",
    participants: "1,248",
    timeLeft: "04d : 12h : 30m",
    prizePool: { first: "$5,000", second: "$2,500", third: "$1,000" },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Banner Image */}
        <div className="relative w-full h-[450px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
            alt="Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="bg-cyan-400 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider">
              ● Ongoing
            </span>
            <span className="bg-rose-400 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider">
              Hot Contest
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-2">
            <p className="text-indigo-600 font-bold text-xs tracking-widest uppercase mb-2">
              {displayData.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {displayData.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mb-10 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Hosted By
                  </p>
                  <p className="font-bold text-slate-800">{displayData.host}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-indigo-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Current Pool
                  </p>
                  <p className="font-bold text-slate-800">
                    {displayData.participants} Participants
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-rose-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Ends In
                  </p>
                  <p className="font-bold text-slate-800">
                    {displayData.timeLeft}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-indigo-50/50 p-8 rounded-3xl">
                <h3 className="font-bold text-lg mb-4 text-indigo-900">
                  The Brief
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  We are looking for designers to redefine kinetic energy in
                  digital workspaces. Your entry should demonstrate a perfect
                  balance between high-performance utility and aesthetic
                  momentum. Focus on fluid transitions and intentional
                  asymmetry.
                </p>
              </div>
              <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="font-bold text-lg mb-4 text-indigo-900">
                  Submission Specs
                </h3>
                <ul className="space-y-3">
                  {[
                    "High-fidelity interactive prototype",
                    "Detailed case study (PDF)",
                    "Responsive layout demonstration",
                  ].map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <CheckCircle2 size={16} className="text-indigo-500" />{" "}
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prize Section */}
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Prize Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PrizeCard
                rank="1st Place"
                amount={displayData.prizePool.first}
                desc="Kinetic Gold Trophy + Feature"
                primary
              />
              <PrizeCard
                rank="2nd Place"
                amount={displayData.prizePool.second}
                desc="Silver Kinetic Plaque"
              />
              <PrizeCard
                rank="3rd Place"
                amount={displayData.prizePool.third}
                desc="Digital Winner Badge"
              />
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-50 p-8 rounded-3xl shadow-sm border border-indigo-100">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Status
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Submissions Open
              </h2>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                Submit Entry
              </button>
              <div className="mt-6 space-y-3 text-sm border-t border-indigo-100 pt-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Entry Fee</span>
                  <span className="font-bold text-green-600 uppercase">
                    Free
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Submissions</span>
                  <span className="font-bold text-slate-800">1 per User</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="font-bold text-lg mb-6">Contest Rules</h3>
              <div className="space-y-6">
                <RuleItem
                  num="01"
                  text="Submissions must be 100% original work. Plagiarism results in immediate ban."
                />
                <RuleItem
                  num="02"
                  text="Prototype must be viewable via browser link (Figma, Framer, or hosted URL)."
                />
                <RuleItem
                  num="03"
                  text="All assets used must have proper licensing documented in the case study."
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-bold text-slate-400">
                Invite Others
              </span>
              <div className="flex gap-2">
                <button className="p-3 rounded-full bg-slate-200 text-slate-600 hover:bg-indigo-100 transition-colors">
                  <Share2 size={18} />
                </button>
                <button className="p-3 rounded-full bg-slate-200 text-slate-600 hover:bg-indigo-100 transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const PrizeCard = ({ rank, amount, desc, primary }) => (
  <div
    className={`p-8 rounded-3xl text-center border-2 ${primary ? "border-indigo-500 bg-white shadow-xl" : "border-slate-100 bg-white"}`}
  >
    <p
      className={`text-[10px] font-black uppercase mb-2 ${primary ? "text-indigo-500" : "text-slate-400"}`}
    >
      {rank}
    </p>
    <p className="text-3xl font-black text-slate-900 mb-2">{amount}</p>
    <p className="text-xs text-slate-500 leading-tight">{desc}</p>
  </div>
);

const RuleItem = ({ num, text }) => (
  <div className="flex gap-4">
    <span className="text-indigo-500 font-black text-sm">{num}</span>
    <p className="text-xs text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default ContestDetailsPageUi;
