import React from "react";
import { Clock, Users, Share2, Bookmark, CheckCircle2 } from "lucide-react";

const ContestDetailsPageUi = ({ data }) => {
  // ✅ Normalize backend data safely
  const displayData = {
    title: data?.title || "Untitled Contest",
    category: data?.category || "General",
    host: data?.createdBy || "Admin",
    participants: data?.participants?.length || 0,
    timeLeft: getTimeLeft(data?.endDate),
    image:
      data?.image ||
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    description:
      data?.description || "No description provided for this contest.",
    specs: data?.requirements || [
      "Submit your best work",
      "Follow guidelines",
      "Upload before deadline",
    ],
    prizePool: {
      first: data?.prizes?.first || "N/A",
      second: data?.prizes?.second || "N/A",
      third: data?.prizes?.third || "N/A",
    },
    entryFee: data?.entryFee || "Free",
    maxSubmissions: data?.maxSubmissions || "1",
    rules: data?.rules || [
      "No plagiarism",
      "Follow submission format",
      "Respect deadlines",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ Banner Image */}
        <div className="relative w-full h-[450px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={displayData.image}
            alt="Contest"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-6 left-6 flex gap-3">
            <span className="bg-cyan-400 text-xs font-bold px-3 py-1 rounded-full text-white uppercase">
              ● Ongoing
            </span>
            <span className="bg-rose-400 text-xs font-bold px-3 py-1 rounded-full text-white uppercase">
              Hot Contest
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <p className="text-indigo-600 font-bold text-xs uppercase mb-2">
              {displayData.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              {displayData.title}
            </h1>

            {/* INFO */}
            <div className="flex flex-wrap items-center gap-8 mb-10 pb-8 border-b">
              <InfoBlock label="Hosted By" value={displayData.host} />

              <InfoBlock
                icon={<Users size={20} className="text-indigo-500" />}
                label="Participants"
                value={`${displayData.participants} Users`}
              />

              <InfoBlock
                icon={<Clock size={20} className="text-rose-500" />}
                label="Ends In"
                value={displayData.timeLeft}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Box title="The Brief" content={displayData.description} />

              <div className="bg-indigo-50/50 p-8 rounded-3xl border">
                <h3 className="font-bold text-lg mb-4 text-indigo-900">
                  Submission Specs
                </h3>

                <ul className="space-y-3">
                  {displayData.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={16} className="text-indigo-500" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* PRIZES */}
            <h2 className="text-2xl font-bold mb-6">Prize Distribution</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <PrizeCard
                rank="1st Place"
                amount={displayData.prizePool.first}
                primary
              />
              <PrizeCard
                rank="2nd Place"
                amount={displayData.prizePool.second}
              />
              <PrizeCard
                rank="3rd Place"
                amount={displayData.prizePool.third}
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-indigo-50 p-8 rounded-3xl border">
              <p className="text-xs font-black text-slate-400 mb-2 uppercase">
                Status
              </p>

              <h2 className="text-2xl font-bold mb-6">
                {displayData.timeLeft === "Ended"
                  ? "Closed"
                  : "Submissions Open"}
              </h2>

              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl">
                Submit Entry
              </button>

              <div className="mt-6 space-y-3 text-sm border-t pt-6">
                <Row label="Entry Fee" value={displayData.entryFee} />
                <Row
                  label="Max Submissions"
                  value={displayData.maxSubmissions}
                />
              </div>
            </div>

            {/* RULES */}
            <div className="bg-slate-50 p-8 rounded-3xl border">
              <h3 className="font-bold text-lg mb-6">Contest Rules</h3>

              <div className="space-y-4">
                {displayData.rules.map((rule, i) => (
                  <RuleItem key={i} num={`0${i + 1}`} text={rule} />
                ))}
              </div>
            </div>

            {/* SHARE */}
            <div className="flex justify-between px-2">
              <span className="text-sm font-bold text-slate-400">
                Invite Others
              </span>

              <div className="flex gap-2">
                <IconBtn icon={<Share2 size={18} />} />
                <IconBtn icon={<Bookmark size={18} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailsPageUi;

//////////////////////////////////////////////////////////////////
// 🔹 SMALL CLEAN COMPONENTS
//////////////////////////////////////////////////////////////////

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon || (
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full" />
    )}
    <div>
      <p className="text-xs text-slate-400 uppercase">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);

const Box = ({ title, content }) => (
  <div className="bg-indigo-50/50 p-8 rounded-3xl">
    <h3 className="font-bold text-lg mb-4 text-indigo-900">{title}</h3>
    <p className="text-sm text-slate-600">{content}</p>
  </div>
);

const PrizeCard = ({ rank, amount, primary }) => (
  <div
    className={`p-6 rounded-3xl text-center border-2 ${primary ? "border-indigo-500 shadow-xl" : ""}`}
  >
    <p className="text-xs font-black uppercase mb-2">{rank}</p>
    <p className="text-2xl font-black">{amount}</p>
  </div>
);

const RuleItem = ({ num, text }) => (
  <div className="flex gap-4">
    <span className="text-indigo-500 font-bold">{num}</span>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

const IconBtn = ({ icon }) => (
  <button className="p-3 rounded-full bg-slate-200 hover:bg-indigo-100">
    {icon}
  </button>
);

//////////////////////////////////////////////////////////////////
// ⏱ TIME HELPER
//////////////////////////////////////////////////////////////////

function getTimeLeft(endDate) {
  if (!endDate) return "N/A";

  const diff = new Date(endDate) - new Date();

  if (diff <= 0) return "Ended";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return `${d}d : ${h}h : ${m}m`;
}
