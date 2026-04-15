// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const SubmitProjectPage = () => {
//   const { id } = useParams(); // contestId
//   const navigate = useNavigate();

//   const token =
//     useSelector((state) => state.auth?.token) ||
//     useSelector((state) => state.auth?.user?.token);

//   const [teamName, setTeamName] = useState("");
//   const [githubLink, setGithubLink] = useState("");
//   const [liveLink, setLiveLink] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [alreadySubmitted, setAlreadySubmitted] = useState(false);
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleSubmitProject = async () => {
//     if (!liveLink.trim()) {
//       toast.error("Live project link is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-team/${id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             githubLink: githubLink || "",
//             liveLink,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (data?.isSubmitted) {
//         setAlreadySubmitted(true);
//         setSubmittedData(data.data);
//         toast.info("⚠️ Project already submitted");

//         setTimeout(() => {
//           navigate("/my-contests");
//         }, 1000);
//         return;
//       }

//       if (!res.ok) {
//         toast.error(data.msg || "Submission failed");
//         return;
//       }

//       toast.success("🎉 Project Submitted Successfully!");

//       setAlreadySubmitted(true);
//       setSubmittedData(data.data);

//       setGithubLink("");
//       setLiveLink("");

//       setTimeout(() => {
//         navigate("/my-contests");
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
//       <div className="w-full max-w-xl backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-8 space-y-6">
//         <div className="text-center space-y-1">
//           <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
//             Submit Project 🚀
//           </h1>
//           <p className="text-sm text-gray-500">
//             Share your work with the world
//           </p>
//         </div>

//         {alreadySubmitted && submittedData && (
//           <div className="rounded-xl border border-green-300 bg-green-50 p-4">
//             <p className="font-semibold text-green-700">✅ Already Submitted</p>
//             <p className="text-sm text-green-600 mt-1 break-all">
//               Live: {submittedData.liveLink}
//             </p>
//             {submittedData.githubLink && (
//               <p className="text-sm text-green-600 break-all">
//                 GitHub: {submittedData.githubLink}
//               </p>
//             )}
//           </div>
//         )}

//         <div className="space-y-5">
//           <div className="space-y-1">
//             <label className="text-sm text-gray-600">
//               GitHub Link (Optional)
//             </label>
//             <input
//               type="text"
//               placeholder="https://github.com/your-project"
//               value={githubLink}
//               onChange={(e) => setGithubLink(e.target.value)}
//               disabled={alreadySubmitted}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100"
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-sm text-gray-600">Live Project Link *</label>
//             <input
//               type="text"
//               placeholder="https://your-live-app.com"
//               value={liveLink}
//               onChange={(e) => setLiveLink(e.target.value)}
//               disabled={alreadySubmitted}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleSubmitProject}
//           disabled={loading || alreadySubmitted}
//           className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
//         >
//           {alreadySubmitted
//             ? "Already Submitted"
//             : loading
//               ? "Submitting..."
//               : "Submit Project"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubmitProjectPage;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubmitProjectPage = () => {
  const { id } = useParams(); // contestId
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth?.token) ||
    useSelector((state) => state.auth?.user?.token);

  const [teamName, setTeamName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmitProject = async () => {
    if (!liveLink.trim()) {
      toast.error("Live project link is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-team/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            githubLink: githubLink || "",
            liveLink,
          }),
        },
      );

      const data = await res.json();

      // 🔍 DEBUG LOG (IMPORTANT)
      console.log("API RESPONSE 👉", data);
      console.log("STATUS 👉", res.status);

      // ✅ FIRST check failure
      if (!res.ok) {
        // If backend uses isSubmitted for duplicate
        if (data?.isSubmitted) {
          setAlreadySubmitted(true);
          setSubmittedData(data.data);
          toast.info("⚠️ Project already submitted");

          setTimeout(() => {
            navigate("/my-contests");
          }, 1000);
          return;
        }

        toast.error(data.msg || "Submission failed");
        return;
      }

      // ✅ SUCCESS CASE
      toast.success("🎉 Project Submitted Successfully!");

      setAlreadySubmitted(true);
      setSubmittedData(data.data);

      setGithubLink("");
      setLiveLink("");

      setTimeout(() => {
        navigate("/my-contests");
      }, 1000);
    } catch (err) {
      console.error("ERROR 👉", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      <div className="w-full max-w-xl backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
            Submit Project 🚀
          </h1>
          <p className="text-sm text-gray-500">
            Share your work with the world
          </p>
        </div>

        {alreadySubmitted && submittedData && (
          <div className="rounded-xl border border-green-300 bg-green-50 p-4">
            <p className="font-semibold text-green-700">✅ Already Submitted</p>
            <p className="text-sm text-green-600 mt-1 break-all">
              Live: {submittedData.liveLink}
            </p>
            {submittedData.githubLink && (
              <p className="text-sm text-green-600 break-all">
                GitHub: {submittedData.githubLink}
              </p>
            )}
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">
              GitHub Link (Optional)
            </label>
            <input
              type="text"
              placeholder="https://github.com/your-project"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              disabled={alreadySubmitted}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Live Project Link *</label>
            <input
              type="text"
              placeholder="https://your-live-app.com"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              disabled={alreadySubmitted}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:bg-gray-100"
            />
          </div>
        </div>

        <button
          onClick={handleSubmitProject}
          disabled={loading || alreadySubmitted}
          className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
        >
          {alreadySubmitted
            ? "Already Submitted"
            : loading
              ? "Submitting..."
              : "Submit Project"}
        </button>
      </div>
    </div>
  );
};

export default SubmitProjectPage;
