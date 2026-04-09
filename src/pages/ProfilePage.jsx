import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// 🔥 Lazy UI
const ProfileUI = lazy(() => import("../ui/ProfileUI"));

const ProfilePage = () => {
  const { token } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://backend-ly6h.onrender.com/app/v1/Learn/get-profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data?.msg);

        // ✅ FIXED HERE
        setProfile(data.message);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProfileUI profile={profile} loading={loading} />
        </motion.div>
      </Suspense>
    </div>
  );
};

export default ProfilePage;
