"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "CEO, Khan Properties",
    initials: "AK",
    rating: 5,
    text: "Zelvix transformed our business! We went from 5 leads a month to over 100. Their team understands real estate marketing like no other agency.",
    result: "100+ Leads / Month",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Founder, Elite Estates",
    initials: "SJ",
    rating: 5,
    text: "The ROI we've seen with Zelvix is incredible. Our ad spend has never been more profitable. Highly recommend their paid advertising services!",
    result: "350% ROI Achieved",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    role: "Director, Ali Builders",
    initials: "MA",
    rating: 5,
    text: "Professional, responsive, and results-driven. They helped us launch our new housing scheme and we sold 60% of units in just 3 months.",
    result: "60% Units Sold",
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Independent Real Estate Agent",
    initials: "EC",
    rating: 5,
    text: "As an independent agent, I needed cost-effective marketing. Zelvix delivered beyond my expectations. My calendar is now fully booked!",
    result: "Calendar Fully Booked",
  },
  {
    id: 5,
    name: "Hassan Raza",
    role: "Owner, Raza Developments",
    initials: "HR",
    rating: 5,
    text: "Their SEO work is phenomenal. We now rank #1 for all our target keywords and get consistent organic traffic that converts into real sales.",
    result: "#1 Google Ranking",
  },
];

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="#D4AA50" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.127L8 10.5l-3.708 2.08L5 8.452 2 5.528l4.146-.772L8 1z" />
  </svg>
);

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56, scale: 0.98 }),
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  }, [currentIndex]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[currentIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .tm-section { font-family: 'DM Sans', sans-serif; }

        .tm-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(10,20,70,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,20,70,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Card shine effect */
        .tm-card {
          position: relative;
          background: #ffffff;
          border: 1.5px solid rgba(10,20,70,0.1);
          overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .tm-card:hover {
          border-color: rgba(212,170,80,0.4);
          box-shadow: 0 8px 48px rgba(10,20,70,0.1), 6px 6px 0 0 rgba(212,170,80,0.15);
        }

        /* Animated left border */
        .tm-card-left-bar {
          position: absolute; top: 0; left: 0; bottom: 0; width: 3px;
          background: linear-gradient(180deg, #0a1446, #D4AA50, transparent);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.5s ease;
        }
        .tm-card:hover .tm-card-left-bar { transform: scaleY(1); }

        /* Result badge */
        .tm-result-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 18px;
          background: rgba(10,20,70,0.04);
          border: 1px solid rgba(10,20,70,0.14);
          transition: all 0.3s;
        }
        .tm-card:hover .tm-result-badge {
          background: rgba(212,170,80,0.06);
          border-color: rgba(212,170,80,0.4);
        }

        /* Avatar */
        .tm-avatar {
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 13px; letter-spacing: 1px;
          flex-shrink: 0;
          position: relative;
          transition: transform 0.3s;
        }
        .tm-card:hover .tm-avatar { transform: scale(1.05); }

        /* Nav buttons */
        .tm-nav-btn {
          width: 48px; height: 48px;
          background: transparent;
          border: 1.5px solid rgba(10,20,70,0.18);
          color: #0a1446;
          cursor: pointer;
          font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .tm-nav-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #0a1446;
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .tm-nav-btn:hover::before { transform: scaleY(1); }
        .tm-nav-btn span { position: relative; z-index: 1; transition: color 0.3s; }
        .tm-nav-btn:hover span { color: #D4AA50; }

        /* Dot */
        .tm-dot {
          height: 2px; border: none; cursor: pointer;
          background: rgba(10,20,70,0.15);
          padding: 0; transition: all 0.3s ease;
        }
        .tm-dot.active { background: #0a1446; }
        .tm-dot:hover { background: rgba(10,20,70,0.4); }

        /* Sidebar cards */
        .tm-side-cards {
          display: flex; flex-direction: column; gap: 12px;
        }
        .tm-side-card {
          padding: 20px 22px;
          border: 1.5px solid rgba(10,20,70,0.1);
          background: #f8f9ff;
          cursor: pointer;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .tm-side-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 0;
          background: #0a1446;
          transition: width 0.35s ease;
        }
        .tm-side-card:hover::before { width: 3px; }
        .tm-side-card:hover { background: #f0f2ff; border-color: rgba(10,20,70,0.25); }
        .tm-side-card.active-side {
          border-color: #D4AA50;
          background: rgba(212,170,80,0.04);
        }
        .tm-side-card.active-side::before { width: 3px; background: #D4AA50; }

        /* Progress bar */
        .tm-progress-track {
          width: 100%; height: 2px;
          background: rgba(10,20,70,0.08);
          overflow: hidden;
        }
      `}</style>

      <section
        id="testimonials"
        className="tm-section relative bg-white overflow-hidden py-28 px-7 max-[640px]:px-4 max-[640px]:py-20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="tm-grid-bg" />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top: "-180px", left: "-180px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(10,20,70,0.05) 0%, transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "-140px", right: "-140px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,170,80,0.07) 0%, transparent 65%)" }} />

        {/* Corner brackets */}
        <svg className="absolute top-8 left-8 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M48 2H2V48" stroke="rgba(10,20,70,0.15)" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-8 right-8 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ transform: "rotate(180deg)" }}>
          <path d="M48 2H2V48" stroke="rgba(10,20,70,0.15)" strokeWidth="1" />
        </svg>

        <div className="max-w-[1260px] mx-auto relative z-10">

          {/* ── Header ── */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-[8px] mb-5 uppercase" style={{ border: "1px solid rgba(10,20,70,0.18)", background: "rgba(10,20,70,0.04)", padding: "8px 20px", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", color: "#0a1446" }}>
              <span style={{ width: "5px", height: "5px", background: "#D4AA50", transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
              Testimonials
            </div>

            <div className="flex items-end justify-between gap-8 flex-wrap">
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(34px,5vw,60px)", fontWeight: 700, color: "#0a1446", lineHeight: 1.05, letterSpacing: "-0.5px" }}>
                What Our{" "}
                <span style={{ color: "#D4AA50" }}>Clients Say</span>
              </h2>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(10,20,70,0.5)", lineHeight: "1.85", maxWidth: "360px", textAlign: "right" }} className="max-[640px]:text-left">
                Hear from real estate professionals who've achieved extraordinary results with Zelvix.
              </p>
            </div>
          </motion.div>

          {/* Rule */}
          <div className="w-full mb-14" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.15), transparent)" }} />

          {/* ── Main layout ── */}
          <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-1">

            {/* Main card — 2 cols */}
            <motion.div
              className="col-span-2 max-[1024px]:col-span-1"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="tm-card">
                <div className="tm-card-left-bar" />

                {/* Top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "64px", height: "3px", background: "linear-gradient(90deg, #0a1446, #D4AA50)" }} />

                {/* Ghost quote */}
                <div aria-hidden style={{ position: "absolute", top: "20px", right: "36px", fontFamily: "'Cormorant Garamond', serif", fontSize: "140px", color: "rgba(10,20,70,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  &ldquo;
                </div>

                <div className="p-10 md:p-14">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="mb-8" style={{ fontSize: "clamp(15px,2vw,19px)", lineHeight: "1.88", color: "rgba(10,20,70,0.75)", fontWeight: 300 }}>
                        &ldquo;{t.text}&rdquo;
                      </p>

                      {/* Result badge */}
                      <div className="tm-result-badge mb-8 inline-flex">
                        <span style={{ width: "6px", height: "6px", background: "#D4AA50", transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
                        <span className="uppercase" style={{ color: "#0a1446", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px" }}>
                          {t.result}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{ width: "100%", height: "1px", background: "rgba(10,20,70,0.08)", marginBottom: "28px" }} />

                      {/* Client row */}
                      <div className="flex items-center gap-4">
                        <div
                          className="tm-avatar"
                          style={{ background: "linear-gradient(135deg, #0a1446 0%, #1c3a78 100%)", color: "#D4AA50" }}
                        >
                          {/* Corner brackets on avatar */}
                          <span style={{ position: "absolute", top: "-3px", left: "-3px", width: "8px", height: "8px", borderTop: "1.5px solid #D4AA50", borderLeft: "1.5px solid #D4AA50" }} />
                          <span style={{ position: "absolute", bottom: "-3px", right: "-3px", width: "8px", height: "8px", borderBottom: "1.5px solid #D4AA50", borderRight: "1.5px solid #D4AA50" }} />
                          {t.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 600, color: "#0a1446", marginBottom: "3px", fontFamily: "'Cormorant Garamond', serif" }}>
                            {t.name}
                          </div>
                          <div style={{ fontSize: "12px", color: "rgba(10,20,70,0.45)", letterSpacing: "0.5px" }}>
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="tm-progress-track">
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #0a1446, #D4AA50)" }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between">
                {/* Dots */}
                <div className="flex gap-2 items-center">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Testimonial ${i + 1}`}
                      className={`tm-dot ${i === currentIndex ? "active" : ""}`}
                      style={{ width: i === currentIndex ? "40px" : "20px" }}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span style={{ fontSize: "12px", color: "rgba(10,20,70,0.28)", letterSpacing: "1px" }}>
                  <span style={{ color: "#D4AA50", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 700 }}>
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  {" "}/{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>

                {/* Arrow buttons */}
                <div className="flex gap-2">
                  <button className="tm-nav-btn" onClick={prev} aria-label="Previous">
                    <span>←</span>
                  </button>
                  <button className="tm-nav-btn" onClick={next} aria-label="Next">
                    <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar — all testimonials list */}
            <motion.div
              className="col-span-1 tm-side-cards max-[1024px]:grid max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 max-[1024px]:gap-3"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {testimonials.map((item, i) => (
                <div
                  key={item.id}
                  className={`tm-side-card ${i === currentIndex ? "active-side" : ""}`}
                  onClick={() => goTo(i)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: "36px", height: "36px", background: i === currentIndex ? "linear-gradient(135deg, #0a1446, #1c3a78)" : "rgba(10,20,70,0.07)", color: i === currentIndex ? "#D4AA50" : "#0a1446", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", transition: "all 0.3s" }}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a1446", lineHeight: 1.3, fontFamily: "'Cormorant Garamond', serif" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "10.5px", color: "rgba(10,20,70,0.45)", letterSpacing: "0.3px" }}>
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "12px", color: "rgba(10,20,70,0.5)", lineHeight: "1.7", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.text}
                  </p>

                  <div className="flex items-center gap-1 mt-3">
                    {Array.from({ length: item.rating }).map((_, si) => (
                      <StarIcon key={si} />
                    ))}
                    <span className="ml-2 uppercase" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", color: i === currentIndex ? "#D4AA50" : "rgba(10,20,70,0.3)" }}>
                      {item.result}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}