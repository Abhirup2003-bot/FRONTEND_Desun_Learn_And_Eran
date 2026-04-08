import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getContest } from "../../features/contestSlice/contestSlice";
import HeroUI from "../../ui/HeroUI";

const HeroContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { contests, loading, error } = useSelector((state) => state.contest);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (contests.length === 0) dispatch(getContest());
  }, [dispatch, contests.length]);

  // Filter only upcoming contests
  const upcomingContests = useMemo(() => {
    const now = new Date();
    return contests
      .filter((contest) => new Date(contest.deadline) > now)
      .slice(0, 5);
  }, [contests]);

  // Auto-slide logic
  useEffect(() => {
    if (upcomingContests.length > 1) {
      const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % upcomingContests.length;
        scrollToSlide(nextIndex);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, upcomingContests.length]);

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.offsetWidth;

    // ✅ detect last -> first jump
    const isLastToFirst =
      activeIndex === upcomingContests.length - 1 && index === 0;

    scrollRef.current.scrollTo({
      left: width * index,
      behavior: isLastToFirst ? "auto" : "smooth", // 🔥 INSTANT JUMP
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(
        scrollRef.current.scrollLeft / scrollRef.current.offsetWidth,
      );
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const onJoinClick = (contestId) => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
    } else {
      navigate(`/contest/${contestId}`);
    }
  };

  return (
    <HeroUI
      contests={upcomingContests}
      loading={loading}
      error={error}
      scrollRef={scrollRef}
      activeIndex={activeIndex}
      handleScroll={handleScroll}
      scrollToSlide={scrollToSlide}
      onJoinClick={onJoinClick}
    />
  );
};

export default HeroContainer;
