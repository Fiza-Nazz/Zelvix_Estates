"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiAlertTriangle,
  FiTrendingDown,
  FiXCircle,
  FiHelpCircle,
} from "react-icons/fi";

const problems = [
  {
    icon: FiAlertTriangle,
    title: "Low Lead Quality",
    description:
      "Struggling to get qualified leads who are ready to buy or sell properties?",
    accent: "#C9A84C",
  },
  {
    icon: FiTrendingDown,
    title: "Poor Online Visibility",
    description:
      "Your competitors are ranking higher and getting all the attention online?",
    accent: "#0B1A33",
  },
  {
    icon: FiXCircle,
    title: "Wasted Ad Budget",
    description:
      "Spending money on ads that don't convert or bring any real results?",
    accent: "#C9A84C",
  },
  {
    icon: FiHelpCircle,
    title: "No Clear Strategy",
    description:
      "Confused about which digital marketing channels work best for real estate?",
    accent: "#0B1A33",
  },
];

/* ── 3D Tilt Card ── */
function TiltCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); setHovered(false); };

  const isGold = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        position: "relative",
        background: "#ffffff",
        border: `1.5px solid ${hovered ? (isGold ? "rgba(201,168,76,.55)" : "rgba(11,26,51,.25)") : "rgba(11,26,51,.08)"}`,
        padding: "40px 34px 36px",
        overflow: "hidden",
        transition: "border-color .35s, box-shadow .35s",
        boxShadow: hovered
          ? `0 24px 56px rgba(11,26,51,.12), 0 4px 16px ${isGold ? "rgba(201,168,76,.12)" : "rgba(11,26,51,.08)"}`
          : "0 4px 20px rgba(11,26,51,.05)",
        cursor: "default",
        height: "100%",
      }}>

        {/* Top sweep bar */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          height: "3px",
          width: hovered ? "100%" : "0%",
          background: isGold
            ? "linear-gradient(90deg, #7a5a10, #F0D878, #C9A84C)"
            : "linear-gradient(90deg, #0B1A33, #1a3a6e)",
          transition: "width .45s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* Large ghost number */}
        <div style={{
          position: "absolute", top: 10, right: 22,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "88px", fontWeight: 700,
          color: hovered
            ? (isGold ? "rgba(201,168,76,.09)" : "rgba(11,26,51,.06)")
            : (isGold ? "rgba(201,168,76,.05)" : "rgba(11,26,51,.04)"),
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          transition: "color .35s",
        }}>
          0{index + 1}
        </div>

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: `1.5px solid ${isGold ? "rgba(201,168,76,.35)" : "rgba(11,26,51,.18)"}`, borderLeft: `1.5px solid ${isGold ? "rgba(201,168,76,.35)" : "rgba(11,26,51,.18)"}` }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: `1.5px solid ${isGold ? "rgba(201,168,76,.35)" : "rgba(11,26,51,.18)"}`, borderRight: `1.5px solid ${isGold ? "rgba(201,168,76,.35)" : "rgba(11,26,51,.18)"}` }} />

        {/* Icon box */}
        <div style={{
          width: 56, height: 56,
          border: `1.5px solid ${hovered ? (isGold ? "rgba(201,168,76,.6)" : "rgba(11,26,51,.3)") : "rgba(11,26,51,.1)"}`,
          background: hovered
            ? (isGold ? "rgba(201,168,76,.07)" : "rgba(11,26,51,.04)")
            : "rgba(11,26,51,.02)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 26,
          position: "relative",
          transition: "border-color .35s, background .35s, transform .3s",
          transform: hovered ? "translateZ(24px)" : "translateZ(0)",
        }}>
          <problem.icon style={{
            fontSize: 22,
            color: isGold ? "#C9A84C" : "#0B1A33",
            transition: "transform .3s",
            transform: hovered ? "scale(1.18)" : "scale(1)",
          }} />
        </div>

        {/* Step label */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9.5, fontWeight: 700,
          letterSpacing: ".22em", textTransform: "uppercase",
          color: isGold ? "rgba(201,168,76,.55)" : "rgba(11,26,51,.35)",
          marginBottom: 10,
        }}>
          Problem {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 700,
          color: "#0B1A33",
          marginBottom: 14, lineHeight: 1.2,
          margin: "0 0 14px 0",
        }}>
          {problem.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 400,
          color: "rgba(11,26,51,.5)",
          lineHeight: 1.78, margin: 0,
        }}>
          {problem.description}
        </p>

        {/* Bottom sweep */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          height: "2px",
          width: hovered ? "60%" : "0%",
          background: isGold
            ? "linear-gradient(90deg, #C9A84C, transparent)"
            : "linear-gradient(90deg, #0B1A33, transparent)",
          transition: "width .45s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* 3D lift layer */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0) 60%, rgba(201,168,76,.03) 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes psOrnament { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes psMarq     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes psOrb1     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-15px)} }
        @keyframes psOrb2     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,20px)} }
        @keyframes psScan     { 0%{top:-1px} 100%{top:101%} }
        @keyframes psShimmer  { 0%{left:-100%} 100%{left:200%} }
        @keyframes psGrid     { 0%,100%{opacity:.045} 50%{opacity:.08} }

        .ps2-section {
          background: #ffffff;
          padding: 120px 48px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* dot grid */
        .ps2-dotgrid {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(11,26,51,.055) 1px, transparent 1px);
          background-size: 26px 26px;
          animation: psGrid 9s ease-in-out infinite;
          pointer-events: none;
        }

        /* ambient orbs */
        .ps2-orb1 {
          position: absolute; top: -10%; right: -5%;
          width: 540px; height: 540px;
          background: radial-gradient(ellipse, rgba(11,26,51,.055) 0%, transparent 65%);
          pointer-events: none; animation: psOrb1 14s ease-in-out infinite;
        }
        .ps2-orb2 {
          position: absolute; bottom: -12%; left: -6%;
          width: 440px; height: 440px;
          background: radial-gradient(ellipse, rgba(201,168,76,.065) 0%, transparent 65%);
          pointer-events: none; animation: psOrb2 16s ease-in-out infinite;
        }

        /* diagonal navy strip */
        .ps2-strip {
          position: absolute; top: 0; right: 0;
          width: 38%; height: 100%;
          background: linear-gradient(160deg, rgba(11,26,51,.035) 0%, transparent 60%);
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
          pointer-events: none;
        }

        /* top gold line */
        .ps2-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #C9A84C 30%, #F0D878 50%, #C9A84C 70%, transparent);
          opacity: .55;
        }

        /* scan */
        .ps2-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.14), transparent);
          animation: psScan 11s linear infinite;
          pointer-events: none; z-index: 1;
        }

        .ps2-inner {
          max-width: 1280px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        /* ── HEADER ── */
        .ps2-header { text-align: center; margin-bottom: 72px; }

        .ps2-badge {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(201,168,76,.32);
          background: rgba(201,168,76,.05);
          padding: 9px 22px;
          font-size: 10px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase;
          color: rgba(11,26,51,.65);
          margin-bottom: 30px;
        }
        .ps2-badge-dot { width: 5px; height: 5px; background: #C9A84C; display: block; flex-shrink: 0; }

        .ps2-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700;
          color: #0B1A33;
          line-height: 1.07;
          letter-spacing: -.01em;
          margin: 0 0 22px;
        }
        .ps2-h2 .gold-span {
          background: linear-gradient(100deg, #7a5a10, #C9A84C, #F0D878, #C9A84C, #7a5a10);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ps2-ornament {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 22px;
        }
        .ps2-orn-line { width: 64px; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C); }
        .ps2-orn-line.r { background: linear-gradient(90deg, #C9A84C, transparent); }
        .ps2-orn-diamond { width: 7px; height: 7px; background: #C9A84C; transform: rotate(45deg); flex-shrink: 0; }
        .ps2-orn-diamond.sm { width: 4px; height: 4px; background: rgba(201,168,76,.5); }

        .ps2-subtitle {
          font-size: 15px; font-weight: 400;
          color: rgba(11,26,51,.5);
          max-width: 500px; margin: 0 auto;
          line-height: 1.82;
        }

        /* ── CARDS GRID ── */
        .ps2-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 16px;
          margin-bottom: 72px;
        }
        @media(max-width:1024px){ .ps2-grid{ grid-template-columns: repeat(2,1fr); } }
        @media(max-width:580px){
          .ps2-grid{ grid-template-columns: 1fr; }
          .ps2-section{ padding: 80px 20px 80px; }
          .ps2-stats{ flex-direction: column !important; }
        }

        /* ── CTA ── */
        .ps2-cta { text-align: center; }
        .ps2-cta-sep {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(11,26,51,.1) 30%, rgba(11,26,51,.1) 70%, transparent);
          margin-bottom: 44px;
        }
        .ps2-cta-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(11,26,51,.38);
          margin-bottom: 26px;
        }

        .ps2-cta-btn {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 16px 40px;
          background: #0B1A33;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: .16em; text-transform: uppercase;
          text-decoration: none;
          border: 1.5px solid rgba(201,168,76,.3);
          position: relative; overflow: hidden;
          transition: transform .22s, box-shadow .28s, border-color .22s, color .22s;
        }
        .ps2-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(130deg, #F0D878 0%, #C9A84C 55%, #8B6914 100%);
          opacity: 0; transition: opacity .25s;
        }
        .ps2-cta-btn:hover::before { opacity: 1; }
        .ps2-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 38px rgba(11,26,51,.18), 0 2px 10px rgba(201,168,76,.2);
          border-color: #C9A84C;
          color: #080f1e;
        }
        .ps2-cta-btn > * { position: relative; z-index: 1; }
        .ps2-cta-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
          animation: psShimmer 3.8s ease-in-out infinite;
        }
        .ps2-cta-btn svg { width: 13px; height: 13px; transition: transform .28s; }
        .ps2-cta-btn:hover svg { transform: translateX(5px); }

        /* ── STAT STRIP ── */
        .ps2-stats {
          display: flex;
          margin-top: 56px;
          border: 1.5px solid rgba(11,26,51,.08);
          background: #fff;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,26,51,.05);
        }
        .ps2-stat {
          flex: 1;
          padding: 28px 20px;
          text-align: center;
          border-right: 1px solid rgba(11,26,51,.07);
          position: relative;
          transition: background .3s;
        }
        .ps2-stat:last-child { border-right: none; }
        .ps2-stat:hover { background: rgba(201,168,76,.03); }
        .ps2-stat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          transform: scaleX(0); transform-origin: center;
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .ps2-stat:hover::before { transform: scaleX(1); }
        .ps2-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 700;
          color: #0B1A33; line-height: 1; margin-bottom: 6px;
        }
        .ps2-stat-label {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(11,26,51,.38);
        }

        /* bottom navy marquee */
        .ps2-marq-wrap {
          position: relative;
          height: 40px;
          background: #0B1A33;
          border-top: 2px solid rgba(201,168,76,.18);
          overflow: hidden;
          display: flex; align-items: center;
          margin-top: 72px;
        }
        .ps2-marq-inner {
          display: flex;
          animation: psMarq 22s linear infinite;
          white-space: nowrap;
        }
        .ps2-marq-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 22px;
          font-size: 9px; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(201,168,76,.5);
        }
      `}</style>

      <section className="ps2-section">
        <div className="ps2-dotgrid" />
        <div className="ps2-orb1" />
        <div className="ps2-orb2" />
        <div className="ps2-strip" />
        <div className="ps2-topline" />
        <div className="ps2-scan" />

        <div className="ps2-inner">

          {/* ── HEADER ── */}
          <motion.div
            className="ps2-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="ps2-badge"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
            >
              <span className="ps2-badge-dot" />
              The Reality Check
            </motion.div>

            <motion.h2
              className="ps2-h2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Are You Facing These{" "}
              <span className="gold-span">Challenges?</span>
            </motion.h2>

            <motion.div
              className="ps2-ornament"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55 }}
            >
              <div className="ps2-orn-line" />
              <div className="ps2-orn-diamond sm" />
              <div className="ps2-orn-diamond" />
              <div className="ps2-orn-diamond sm" />
              <div className="ps2-orn-line r" />
            </motion.div>

            <motion.p
              className="ps2-subtitle"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
            >
              Many real estate professionals struggle with these common problems.
              You&apos;re not alone — we&apos;ve solved them for hundreds of clients.
            </motion.p>
          </motion.div>

          {/* ── PROBLEM CARDS ── */}
          <div className="ps2-grid">
            {problems.map((problem, index) => (
              <TiltCard key={problem.title} problem={problem} index={index} />
            ))}
          </div>

          {/* ── CTA ── */}
          <motion.div
            className="ps2-cta"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="ps2-cta-sep" />
            <p className="ps2-cta-label">Sound familiar? Don&apos;t worry — we have the solution.</p>
            <a href="#solution" className="ps2-cta-btn">
              <span>See How We Solve These Problems</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* ── STAT STRIP ── */}
          <motion.div
            className="ps2-stats"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {[
              { num: "500+", label: "Clients Served" },
              { num: "98%",  label: "Satisfaction Rate" },
              { num: "10×",  label: "Avg Lead Growth" },
              { num: "24h",  label: "Response Time" },
            ].map((stat, i) => (
              <div className="ps2-stat" key={stat.label}>
                <div className="ps2-stat-num">{stat.num}</div>
                <div className="ps2-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── BOTTOM MARQUEE ── */}
        <div className="ps2-marq-wrap">
          <div className="ps2-marq-inner">
            {[...Array(2)].map((_, si) => (
              <div key={si} style={{ display: "flex", flexShrink: 0 }}>
                {["Low Leads?", "Poor Visibility?", "Wasted Budget?", "No Strategy?", "We Fix All of This", "Real Results", "Proven Methods", "500+ Clients"].map((item, i) => (
                  <span key={i} className="ps2-marq-item">
                    {item}
                    <span style={{ color: "rgba(201,168,76,.2)" }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}