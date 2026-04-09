import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield } from "lucide-react";

const ProfileUI = ({ profile, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-pulse text-lg text-gray-400">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500 text-lg">
        Failed to load profile
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8"
    >
      {/* 🔥 Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          {(profile?.name || profile?.userName || "U").charAt(0)}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile.name || profile.userName}
          </h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>

      {/* 🔥 Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard icon={<User />} label="Username" value={profile.userName} />
        <InfoCard icon={<Mail />} label="Email" value={profile.email} />

        <InfoCard
          icon={<Calendar />}
          label="Joined"
          value={
            profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "N/A"
          }
        />

        <InfoCard
          icon={<Shield />}
          label="Role"
          value={profile.role || "User"}
        />
      </div>
    </motion.div>
  );
};

export default ProfileUI;

// 🔥 Small reusable card
const InfoCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition"
  >
    <div className="text-indigo-500">{icon}</div>

    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-medium text-gray-700">{value || "N/A"}</p>
    </div>
  </motion.div>
);
