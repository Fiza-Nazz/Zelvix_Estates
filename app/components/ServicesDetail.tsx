"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    image: "/image1.png",
    eyebrow: "Strategy & Growth",
    title: "Premium Service\nExcellence",
    subtitle: "Delivering outstanding results for real estate professionals",
    description:
      "Our comprehensive approach combines cutting-edge strategies with personalized attention to ensure your success in the competitive real estate market.",
    stat: { value: "3.2×", label: "Avg Lead Multiplier" },
    tag: "01",
  },
  {
    id: 2,
    image: "/image2.png",
    eyebrow: "Technology & Innovation",
    title: "Innovation Meets\nExpertise",
    subtitle: "Advanced solutions for modern real estate marketing",
    description:
      "Leveraging the latest technology and industry insights to create marketing campaigns that stand out and drive meaningful engagement.",
    stat: { value: "98%", label: "Client Satisfaction" },
    tag: "02",
  },
  {
    id: 3,
    image: "/image3.png",
    eyebrow: "Trust & Authority",
    title: "Trusted by\nIndustry Leaders",
    subtitle: "Proven track record of success and satisfaction",
    description:
      "Join hundreds of satisfied real estate professionals who have transformed their business with our tailored marketing solutions.",
    stat: { value: "500+", label: "Campaigns Launched" },
    tag: "03",
  },
  {
    id: 4,
    image: "/image4.png",
    eyebrow: "Partnership & Vision",
    title: "Your Growth,\nOur Mission",
    subtitle: "Committed to your long-term success",
    description:
      "We don't just deliver campaigns – we build partnerships that drive sustainable growth and lasting results for your real estate business.",
    stat: { value: "10×", label: "Average ROI" },
    tag: "04",
  },
];

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const NAVY  = "#0d1f4c";
const GOLD  = "#c9963b";
const GOLDL = "#e5b55a";
const WHITE = "#ffffff";
const OFFWT = "#fafaf8";

const DURATION = 5800;

/* ─── 3-D tilt hook ──────────────────────────────────────────────────────── */
function useTilt(deg = 5) {
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [deg, -deg]), { stiffness: 160, damping: 26 });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-deg, deg]), { stiffness: 160, damping: 26 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    my.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return { ref, rotX, rotY, onMove, onLeave };
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ServicesDetail() {
  const [cur,    setCur]    = useState(0);
  const [dir,    setDir]    = useState(1);
  const [prog,   setProg]   = useState(0);
  const [paused, setPaused] = useState(false);
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const tilt = useTilt(5);

  const startTick = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    setProg(0);
    tickRef.current = setInterval(() => {
      setProg(p => {
        if (p >= 100) {
          setDir(1);
          setCur(c => (c + 1) % slides.length);
          return 0;
        }
        return p + 100 / (DURATION / 100);
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (!paused) startTick();
    else { if (tickRef.current) clearInterval(tickRef.current); }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [paused, cur, startTick]);

  const go   = (i: number, d = 1) => { setDir(d); setCur(i); setProg(0); };
  const next = () => go((cur + 1) % slides.length, 1);
  const prev = () => go((cur - 1 + slides.length) % slides.length, -1);
  const sl   = slides[cur];

  /* ── Animation variants ── */
  const imgVar = {
    enter:  (d: number) => ({ opacity: 0, scale: 1.07, x: d * 56, filter: "blur(5px)" }),
    center: { opacity: 1, scale: 1,    x: 0,         filter: "blur(0px)", transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] as const } },
    exit:   (d: number) => ({ opacity: 0, scale: 0.96, x: d * -40, filter: "blur(3px)", transition: { duration: 0.44, ease: [0.4, 0, 1, 1] as const } }),
  };

  const tv = {
    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
    show: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { delay: 0.2 + i * 0.085, duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const ruleV = {
    hidden: { scaleX: 0, originX: 0 },
    show:   { scaleX: 1, transition: { delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .sd { font-family: 'DM Sans', sans-serif; background: ${WHITE}; }

        /* dot grid */
        .sd-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(13,31,76,0.042) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* section pill */
        .sd-pill {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(13,31,76,0.13);
          background: rgba(13,31,76,0.04);
          padding: 8px 20px;
          font-size: 9px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: ${NAVY}; border-radius: 2px;
        }
        .sd-diamond { width: 5px; height: 5px; background: ${GOLD}; transform: rotate(45deg); flex-shrink: 0; border-radius: 1px; }

        /* card */
        .sd-card {
          background: ${WHITE};
          border-radius: 0 0 20px 20px;
          border: 1px solid rgba(13,31,76,0.09);
          border-top: none;
          overflow: hidden;
          box-shadow:
            0 2px 4px  rgba(13,31,76,0.03),
            0 8px 24px rgba(13,31,76,0.055),
            0 32px 80px rgba(13,31,76,0.065),
            0 0 0 1px rgba(201,150,59,0.05);
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* inner grid */
        .sd-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 540px;
        }

        /* ─── IMAGE PANE FIX ─────────────────────────────────────── */
        /* 1. min-height ensures the pane has dimensions on desktop  */
        /* 2. ::after gradient now only blends the right edge softly */
        /* 3. ::before subtle bottom vignette stays gentle           */
        .sd-img {
          position: relative;
          overflow: hidden;
          background: ${OFFWT};
          min-height: 540px;          /* ← FIX: give the pane an explicit height */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sd-img img {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
        }
        .sd-img::after {
          content: ''; position: absolute; inset: 0; z-index: 2;
          /* ← FIX: gradient starts much later & is far less opaque */
          background: linear-gradient(90deg, transparent 65%, rgba(255,255,255,0.55) 100%);
        }
        .sd-img::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(0deg, rgba(13,31,76,0.10) 0%, transparent 45%);
        }

        /* badge */
        .sd-badge {
          position: absolute; top: 22px; left: 22px; z-index: 5;
          background: ${WHITE}; border: 1px solid rgba(13,31,76,0.1);
          border-radius: 6px; padding: 6px 14px;
          display: flex; align-items: baseline; gap: 5px;
          box-shadow: 0 4px 16px rgba(13,31,76,0.07);
        }
        .sd-badge-n { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: ${NAVY}; line-height: 1; }
        .sd-badge-t { font-size: 10px; font-weight: 500; color: rgba(13,31,76,0.28); letter-spacing: 1px; }

        /* content pane */
        .sd-content {
          padding: 52px 52px 44px 48px;
          display: flex; flex-direction: column; justify-content: center;
          background: ${WHITE}; position: relative; z-index: 1;
          border-left: 1px solid rgba(13,31,76,0.06);
        }

        /* eyebrow */
        .sd-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 15px;
        }
        .sd-eyebar { width: 28px; height: 1.5px; background: linear-gradient(90deg,${GOLD},${GOLDL}); flex-shrink: 0; }

        /* heading */
        .sd-h {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 700; line-height: 1.06;
          color: ${NAVY}; letter-spacing: -0.5px;
          margin: 0 0 8px; white-space: pre-line;
        }
        .sd-h em { font-style: italic; color: ${GOLD}; }

        /* gold rule */
        .sd-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(201,150,59,.45), rgba(13,31,76,.07) 55%, transparent);
          margin: 18px 0; transform-origin: left;
        }

        /* subtitle */
        .sd-sub {
          font-size: 12.5px; color: rgba(13,31,76,.36);
          line-height: 1.65; margin: 0 0 18px; font-weight: 400; letter-spacing: 0.2px;
        }

        /* stat */
        .sd-stat {
          display: inline-flex; align-items: baseline; gap: 8px;
          padding: 10px 18px;
          border-left: 2px solid ${GOLD};
          background: linear-gradient(90deg, rgba(201,150,59,.07), transparent);
          margin-bottom: 22px; align-self: flex-start; border-radius: 0 4px 4px 0;
        }
        .sd-stat-v { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; color: ${NAVY}; line-height: 1; }
        .sd-stat-l { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(13,31,76,.38); }

        /* body */
        .sd-body { font-size: 13.5px; font-weight: 300; line-height: 1.9; color: rgba(13,31,76,.48); margin: 0 0 30px; }

        /* cta btn */
        .sd-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px; align-self: flex-start;
          background: ${NAVY}; color: ${WHITE};
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; text-decoration: none;
          border-radius: 4px; position: relative; overflow: hidden;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
          box-shadow: 0 4px 16px rgba(13,31,76,.16), 6px 6px 0 rgba(201,150,59,.18);
        }
        .sd-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, ${GOLD} 0%, ${GOLDL} 100%);
          transform: translateX(-101%);
          transition: transform .38s cubic-bezier(.22,1,.36,1); z-index: 0;
        }
        .sd-btn:hover { transform: translateY(-3px) translateX(2px); box-shadow: 0 12px 36px rgba(13,31,76,.16), 8px 8px 0 rgba(201,150,59,.32); }
        .sd-btn:hover::after { transform: translateX(0); }
        .sd-btn span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; transition: color .28s; }
        .sd-btn:hover span { color: ${NAVY}; }

        /* nav arrows */
        .sd-nav {
          width: 44px; height: 44px; border-radius: 50%;
          background: ${WHITE}; border: 1.5px solid rgba(13,31,76,.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: ${NAVY}; font-size: 18px;
          box-shadow: 0 3px 14px rgba(13,31,76,.07);
          transition: background .25s, border-color .25s, color .25s, transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
          flex-shrink: 0;
        }
        .sd-nav:hover {
          background: ${NAVY}; border-color: ${NAVY}; color: ${GOLD};
          transform: scale(1.12); box-shadow: 0 8px 26px rgba(13,31,76,.2);
        }

        /* tabs */
        .sd-tabs {
          display: flex; overflow-x: auto; scrollbar-width: none;
          border-radius: 12px 12px 0 0;
          border: 1px solid rgba(13,31,76,.09); border-bottom: none;
          background: ${OFFWT};
        }
        .sd-tabs::-webkit-scrollbar { display: none; }
        .sd-tab {
          flex: 1; padding: 14px 20px; min-width: 120px;
          font-size: 9.5px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(13,31,76,.3); cursor: pointer; text-align: center;
          border: none; border-bottom: 2px solid transparent;
          background: none; white-space: nowrap;
          transition: color .25s, border-color .25s, background .25s;
        }
        .sd-tab:hover { color: ${NAVY}; background: rgba(13,31,76,.025); }
        .sd-tab.on { color: ${NAVY}; border-bottom-color: ${GOLD}; background: ${WHITE}; }

        /* thumb strip */
        .sd-strip {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 28px;
          border-top: 1px solid rgba(13,31,76,.06);
          background: ${OFFWT};
          overflow-x: auto; scrollbar-width: none;
        }
        .sd-strip::-webkit-scrollbar { display: none; }
        .sd-thumb {
          flex-shrink: 0; width: 60px; height: 44px; border-radius: 6px; overflow: hidden;
          border: 2px solid transparent; cursor: pointer; position: relative;
          background: rgba(13,31,76,.05);
          transition: border-color .28s, transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
        }
        .sd-thumb:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(13,31,76,.1); }
        .sd-thumb.on { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(201,150,59,.16); }
        .sd-thumb::after {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(0deg, rgba(13,31,76,.35) 0%, transparent 55%);
        }
        .sd-thumb-lbl {
          position: absolute; bottom: 4px; left: 6px;
          font-size: 8px; font-weight: 700; letter-spacing: 1px;
          color: ${WHITE}; text-shadow: 0 1px 4px rgba(0,0,0,.5); z-index: 2;
        }

        /* progress track */
        .sd-track {
          flex: 1; height: 2px; border-radius: 2px; background: rgba(13,31,76,.08);
          overflow: hidden; cursor: pointer; min-width: 40px;
          transition: height .2s;
        }
        .sd-track:hover { height: 4px; }
        .sd-fill {
          height: 100%;
          background: linear-gradient(90deg, ${GOLD}, ${GOLDL});
          transition: width .1s linear;
          border-radius: 2px;
        }

        /* dots */
        .sd-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: 1.5px solid rgba(13,31,76,.2); background: transparent;
          cursor: pointer; flex-shrink: 0;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }
        .sd-dot.on { background: ${GOLD}; border-color: ${GOLD}; transform: scale(1.5); box-shadow: 0 0 8px rgba(201,150,59,.4); }

        /* sheen (3-D cue) */
        .sd-sheen {
          position: absolute; inset: 0; z-index: 10; pointer-events: none; border-radius: inherit;
          background: linear-gradient(128deg, rgba(255,255,255,.5) 0%, transparent 42%);
        }

        /* bottom CTA block */
        .sd-cta-block {
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          padding: 44px 52px;
          border: 1px solid rgba(13,31,76,.09); border-radius: 16px;
          background: linear-gradient(118deg, ${OFFWT} 0%, ${WHITE} 55%);
          position: relative; overflow: hidden;
          box-shadow: 0 4px 24px rgba(13,31,76,.045), 0 1px 0 rgba(201,150,59,.1);
        }
        .sd-cta-block::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLDL} 50%, ${GOLD} 70%, transparent);
        }
        .sd-cta-block::after {
          content: ''; position: absolute; top: -140px; right: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(201,150,59,.07) 0%, transparent 68%);
          pointer-events: none;
        }
        .sd-cta-lg {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 36px; flex-shrink: 0;
          background: ${NAVY}; color: ${WHITE};
          font-size: 10.5px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; text-decoration: none;
          border-radius: 4px; position: relative; overflow: hidden;
          transition: transform .28s, box-shadow .28s;
          box-shadow: 0 6px 24px rgba(13,31,76,.18), 6px 6px 0 rgba(201,150,59,.22);
        }
        .sd-cta-lg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, ${GOLD}, ${GOLDL});
          transform: translateX(-101%);
          transition: transform .38s cubic-bezier(.22,1,.36,1);
        }
        .sd-cta-lg:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(13,31,76,.16), 8px 8px 0 rgba(201,150,59,.38); }
        .sd-cta-lg:hover::after { transform: translateX(0); }
        .sd-cta-lg span { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; transition: color .28s; }
        .sd-cta-lg:hover span { color: ${NAVY}; }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .sd-grid { grid-template-columns: 1fr 1fr; min-height: 480px; }
          .sd-img { min-height: 480px; }
          .sd-content { padding: 40px 36px 36px; }
        }
        @media (max-width: 860px) {
          .sd-grid { grid-template-columns: 1fr; min-height: unset; }
          /* ← FIX: override min-height on mobile, fixed height instead */
          .sd-img { min-height: unset; height: 300px; }
          /* ← FIX: mobile gradient comes from bottom, lighter opacity */
          .sd-img::after {
            background: linear-gradient(0deg, rgba(255,255,255,0.70) 0%, transparent 50%);
          }
          .sd-content { padding: 30px 28px 34px; border-left: none; border-top: 1px solid rgba(13,31,76,.06); }
          .sd-stat-v { font-size: 26px; }
          .sd-tab { min-width: 100px; padding: 12px 12px; font-size: 9px; }
          .sd-cta-block { padding: 32px 28px; }
        }
        @media (max-width: 640px) {
          .sd-content { padding: 24px 20px 28px; }
          .sd-body { font-size: 13px; margin-bottom: 22px; }
          .sd-cta-block { flex-direction: column; align-items: flex-start; gap: 20px; padding: 24px 20px; }
          .sd-cta-lg { width: 100%; justify-content: center; }
          .sd-strip { padding: 14px 16px; gap: 8px; }
        }
        @media (max-width: 420px) {
          .sd-img { height: 240px; }
          .sd-content { padding: 18px 14px 22px; }
          .sd-thumb { width: 50px; height: 38px; }
          .sd-h { font-size: clamp(20px, 6.5vw, 28px); }
        }
      `}</style>

      <section
        className="sd"
        id="services-detail"
        style={{
          background: WHITE,
          padding: "clamp(64px,9vw,128px) clamp(16px,5vw,48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="sd-bg" />

        <div style={{
          position: "absolute", top: "-180px", right: "-120px",
          width: "620px", height: "620px", pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(circle, rgba(201,150,59,0.055) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "24px", flexWrap: "wrap",
            marginBottom: "clamp(40px,6vw,68px)",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="sd-pill"
                style={{ marginBottom: "22px" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.55 }}
              >
                <span className="sd-diamond" />
                Explore Our Services
              </motion.div>

              <motion.h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(40px, 6vw, 76px)",
                  fontWeight: 700, lineHeight: 1.02,
                  color: NAVY, letterSpacing: "-1.5px", margin: 0,
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.65 }}
              >
                Discover What<br />
                <em style={{ fontStyle: "italic", color: GOLD }}>Makes Us Different</em>
              </motion.h2>
            </motion.div>

            <motion.div
              style={{ display: "flex", gap: "14px", alignItems: "flex-start", paddingBottom: "6px", maxWidth: "220px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div style={{ width: "1.5px", height: "50px", background: `linear-gradient(180deg, ${GOLD}, rgba(201,150,59,0.08))`, flexShrink: 0, marginTop: "3px" }} />
              <p style={{ fontSize: "12.5px", fontWeight: 300, color: "rgba(13,31,76,0.42)", lineHeight: 1.75, margin: 0 }}>
                Four pillars that set our agency apart from every competitor.
              </p>
            </motion.div>
          </div>

          {/* ── Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            <div className="sd-tabs">
              {slides.map((s, i) => (
                <button key={i} className={`sd-tab${i === cur ? " on" : ""}`}
                  onClick={() => go(i, i > cur ? 1 : -1)}>
                  {s.eyebrow}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── 3-D Slider Card ── */}
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMove}
            onMouseLeave={() => { tilt.onLeave(); setPaused(false); }}
            onMouseEnter={() => setPaused(true)}
            className="sd-card"
            style={{ rotateX: tilt.rotX, rotateY: tilt.rotY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sd-sheen" />

            <div style={{ position: "relative" }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={cur} custom={dir} variants={imgVar} initial="enter" animate="center" exit="exit">
                  <div className="sd-grid">

                    {/* ── Image pane ── */}
                    <div className="sd-img">
                      
                      {/* FIX: added sizes prop so Next.js picks correct srcset */}
                      <Image
                        src={sl.image}
                        alt={sl.title}
                        fill
                        sizes="(max-width: 860px) 100vw, 55vw"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                        priority={cur === 0}
                      />
                      <div className="sd-badge">
                        <span className="sd-badge-n">{sl.tag}</span>
                        <span className="sd-badge-t">/ 0{slides.length}</span>
                      </div>
                    </div>

                    {/* ── Content pane ── */}
                    <div className="sd-content">
                      <motion.div className="sd-eyebrow" variants={tv} custom={0} initial="hidden" animate="show">
                        <span className="sd-eyebar" />
                        {sl.eyebrow}
                      </motion.div>

                      <motion.h3 className="sd-h" variants={tv} custom={1} initial="hidden" animate="show">
                        {sl.title.split("\n").map((line, i) =>
                          i === 1
                            ? <em key={i}>{line}</em>
                            : <span key={i}>{line}<br /></span>
                        )}
                      </motion.h3>

                      <motion.div className="sd-rule" variants={ruleV} initial="hidden" animate="show" />

                      <motion.p className="sd-sub" variants={tv} custom={2} initial="hidden" animate="show">
                        {sl.subtitle}
                      </motion.p>

                      <motion.div className="sd-stat" variants={tv} custom={3} initial="hidden" animate="show">
                        <span className="sd-stat-v">{sl.stat.value}</span>
                        <span className="sd-stat-l">{sl.stat.label}</span>
                      </motion.div>

                      <motion.p className="sd-body" variants={tv} custom={4} initial="hidden" animate="show">
                        {sl.description}
                      </motion.p>

                      <motion.a href="#contact" className="sd-btn" variants={tv} custom={5} initial="hidden" animate="show">
                        <span>Learn More <FiArrowUpRight size={13} /></span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Thumbnail strip ── */}
            <div className="sd-strip">
              {slides.map((s, i) => (
                <div key={i} className={`sd-thumb${i === cur ? " on" : ""}`}
                  onClick={() => go(i, i > cur ? 1 : -1)}
                  role="button" aria-label={`Slide ${i + 1}`}
                >
                  {/* FIX: sizes prop on thumbnails too */}
                  <Image
                    src={s.image}
                    alt={s.eyebrow}
                    fill
                    sizes="60px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="sd-thumb-lbl">{s.tag}</span>
                </div>
              ))}

              <div style={{ flex: 1, display: "flex", gap: "5px", alignItems: "center", minWidth: "80px" }}>
                {slides.map((_, i) => (
                  <div key={i} className="sd-track" onClick={() => go(i, i > cur ? 1 : -1)}>
                    <div className="sd-fill" style={{
                      width: i < cur ? "100%" : i === cur ? `${prog}%` : "0%",
                    }} />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button className="sd-nav" onClick={prev} aria-label="Previous" style={{ width: "38px", height: "38px", fontSize: "16px" }}>
                  <FiChevronLeft />
                </button>
                {slides.map((_, i) => (
                  <button key={i} className={`sd-dot${i === cur ? " on" : ""}`}
                    onClick={() => go(i, i > cur ? 1 : -1)} aria-label={`Slide ${i + 1}`} />
                ))}
                <button className="sd-nav" onClick={next} aria-label="Next" style={{ width: "38px", height: "38px", fontSize: "16px" }}>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            className="sd-cta-block"
            style={{ marginTop: "clamp(40px,6vw,72px)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="sd-pill" style={{ marginBottom: "18px" }}>
                <span className="sd-diamond" />
                Ready to Scale?
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 3.2vw, 40px)",
                fontWeight: 700, color: NAVY, lineHeight: 1.1,
                letterSpacing: "-0.5px", margin: "0 0 12px",
              }}>
                Let's Build Your{" "}
                <em style={{ fontStyle: "italic", color: GOLD }}>Success Story</em>
              </h3>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(13,31,76,0.42)", lineHeight: 1.75, maxWidth: "380px", margin: 0 }}>
                One free consultation. Zero obligations. Unlimited potential for your real estate business.
              </p>
            </div>

            <motion.a
              href="#contact"
              className="sd-cta-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <span>Get Started Today <FiArrowRight size={15} /></span>
            </motion.a>
          </motion.div>

        </div>
      </section>
    </>
  );
}