"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiZap, FiTarget, FiBarChart2 } from "react-icons/fi";

const solutions = [
  {
    icon: FiTarget,
    number: "01",
    title: "Targeted Lead Generation",
    description:
      "We use advanced targeting strategies to bring you qualified leads who are ready to take action.",
    features: ["Precise audience targeting", "High-intent lead capture", "Real-time lead nurturing"],
  },
  {
    icon: FiZap,
    number: "02",
    title: "Lightning-Fast Results",
    description:
      "Our proven strategies deliver quick wins while building long-term sustainable growth.",
    features: ["Quick campaign launch", "Immediate visibility boost", "Fast lead conversion"],
  },
  {
    icon: FiBarChart2,
    number: "03",
    title: "Data-Driven Approach",
    description:
      "Every decision is backed by data and analytics to maximize your ROI and minimize waste.",
    features: ["Performance tracking", "A/B testing", "ROI optimization"],
  },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "12x",  label: "Average ROI" },
  { value: "247",  label: "Live Leads / Month" },
];

export default function SolutionSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .sol2-section {
          background: #ffffff;
          padding: 120px 32px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Subtle dot-grid texture */
        .sol2-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(10,22,40,.055) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        /* Navy corner shapes */
        .sol2-tri-tr {
          position: absolute; top: 0; right: 0;
          width: 320px; height: 320px;
          background: #0a1628;
          clip-path: polygon(100% 0, 100% 100%, 0 0);
          opacity: .03; pointer-events: none;
        }
        .sol2-tri-bl {
          position: absolute; bottom: 0; left: 0;
          width: 240px; height: 240px;
          background: #C9A84C;
          clip-path: polygon(0 100%, 100% 100%, 0 0);
          opacity: .04; pointer-events: none;
        }

        .sol2-inner {
          max-width: 1280px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Header split ── */
        .sol2-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px; margin-bottom: 64px;
          flex-wrap: wrap;
        }
        .sol2-hl { flex: 1; min-width: 260px; }
        .sol2-hr { max-width: 380px; display: flex; flex-direction: column; gap: 20px; }

        .sol2-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0a1628; padding: 7px 16px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; color: #F0D878;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .sol2-badge-dot {
          width: 5px; height: 5px;
          background: #C9A84C; transform: rotate(45deg);
        }

        .sol2-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 700; color: #0a1628;
          line-height: 1.0; letter-spacing: -0.5px; margin: 0;
        }
        .sol2-title-gold {
          color: #C9A84C; position: relative; display: inline-block;
        }
        .sol2-title-gold::after {
          content: '';
          position: absolute; bottom: 1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #F0D878, #C9A84C);
          opacity: .45;
        }

        .sol2-subtitle {
          font-size: 15px; color: #5a6a82;
          line-height: 1.75; letter-spacing: .15px;
        }

        .sol2-hcta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          border: 1.5px solid #0a1628;
          color: #0a1628; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none;
          transition: background .25s, color .25s;
        }
        .sol2-hcta:hover { background: #0a1628; color: #fff; }
        .sol2-hcta svg { width: 13px; height: 13px; transition: transform .25s; }
        .sol2-hcta:hover svg { transform: translateX(3px); }

        /* ── Gold rule ── */
        .sol2-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.25), rgba(201,168,76,.4), rgba(201,168,76,.25), transparent);
          margin-bottom: 64px;
        }

        /* ── Stats ── */
        .sol2-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #e2e6ee;
          margin-bottom: 64px; overflow: hidden;
        }
        .sol2-stat {
          padding: 28px 16px; text-align: center;
          border-right: 1px solid #e2e6ee;
          position: relative; cursor: default;
          transition: background .3s;
          overflow: hidden;
        }
        .sol2-stat:last-child { border-right: none; }
        .sol2-stat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          transform: scaleX(0); transition: transform .35s ease;
        }
        .sol2-stat:hover { background: #f7f8fb; }
        .sol2-stat:hover::before { transform: scaleX(1); }
        .sol2-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px; font-weight: 700;
          color: #0a1628; line-height: 1; margin-bottom: 6px;
        }
        .sol2-stat-lbl {
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.8px; color: #9ba8bc;
          text-transform: uppercase;
        }

        /* ── Cards — seamless gap grid ── */
        .sol2-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: #e2e6ee;
          border: 1px solid #e2e6ee;
          margin-bottom: 64px;
        }

        .sol2-card {
          background: #fff;
          padding: 48px 36px 44px;
          position: relative; overflow: hidden;
          cursor: default;
          transition: background .32s;
        }
        .sol2-card.hov { background: #0a1628; }

        /* Animated top gold bar */
        .sc-top {
          position: absolute; top: 0; left: 0;
          height: 2px; width: 0;
          background: linear-gradient(90deg, #C9A84C, #F0D878, transparent);
          transition: width .42s ease;
        }
        .sol2-card.hov .sc-top { width: 100%; }

        /* Animated left bar */
        .sc-left {
          position: absolute; top: 0; left: 0;
          width: 3px; height: 0;
          background: linear-gradient(180deg, #C9A84C, transparent);
          transition: height .42s ease .06s;
        }
        .sol2-card.hov .sc-left { height: 100%; }

        /* Number watermark */
        .sc-num {
          position: absolute; top: 14px; right: 22px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 82px; font-weight: 700;
          color: rgba(10,22,40,.05);
          line-height: 1; user-select: none;
          transition: color .32s;
        }
        .sol2-card.hov .sc-num { color: rgba(201,168,76,.07); }

        /* Gold glow blob */
        .sc-blob {
          position: absolute; bottom: -70px; right: -70px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%);
          opacity: 0; transition: opacity .4s; pointer-events: none;
        }
        .sol2-card.hov .sc-blob { opacity: 1; }

        /* Icon box */
        .sc-icon-box {
          width: 54px; height: 54px;
          border: 1.5px solid #e2e6ee;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 26px; position: relative;
          transition: border-color .32s, background .32s;
        }
        .sc-icon-box::after {
          content: ''; position: absolute; inset: -5px;
          border: 1px solid transparent; transition: border-color .32s;
        }
        .sol2-card.hov .sc-icon-box {
          border-color: #C9A84C; background: rgba(201,168,76,.08);
        }
        .sol2-card.hov .sc-icon-box::after { border-color: rgba(201,168,76,.18); }
        .sc-icon {
          font-size: 21px; color: #0a1628;
          transition: transform .32s, color .32s;
        }
        .sol2-card.hov .sc-icon { transform: scale(1.12); color: #C9A84C; }

        .sc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 23px; font-weight: 700;
          color: #0a1628; margin-bottom: 11px;
          line-height: 1.2; transition: color .3s;
        }
        .sol2-card.hov .sc-title { color: #fff; }

        .sc-desc {
          font-size: 14px; color: #5a6a82;
          line-height: 1.72; margin-bottom: 26px;
          letter-spacing: .1px; transition: color .3s;
        }
        .sol2-card.hov .sc-desc { color: rgba(255,255,255,.45); }

        /* Features */
        .sc-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .sc-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 600;
          letter-spacing: .25px; color: #5a6a82;
          transition: color .25s;
        }
        .sol2-card.hov .sc-feature { color: rgba(255,255,255,.6); }
        .sc-check {
          width: 19px; height: 19px;
          border: 1.5px solid #e2e6ee;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color .3s, background .3s;
        }
        .sol2-card.hov .sc-check { border-color: #C9A84C; background: rgba(201,168,76,.1); }
        .sc-check svg { width: 9px; height: 9px; color: #0a1628; transition: color .3s; }
        .sol2-card.hov .sc-check svg { color: #C9A84C; }

        /* Bottom slide line */
        .sc-bot {
          position: absolute; bottom: 0; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, #C9A84C, transparent);
          transition: width .42s ease;
        }
        .sol2-card.hov .sc-bot { width: 100%; }

        /* ── CTA Banner ── */
        .sol2-banner {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 40px; padding: 56px 56px;
          background: #0a1628;
          position: relative; overflow: hidden; flex-wrap: wrap;
        }
        .sol2-banner::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, #F0D878, #C9A84C, transparent);
        }
        .sol2-banner-glow {
          position: absolute; top: -80px; right: -80px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .sol2-banner-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 26px 26px; pointer-events: none;
        }

        .sol2-banner-l { flex: 1; min-width: 240px; position: relative; z-index: 1; }
        .sol2-banner-r { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

        .sol2-banner-ey {
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; color: #C9A84C;
          text-transform: uppercase; margin-bottom: 12px; opacity: .8;
        }
        .sol2-banner-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3.5vw, 42px); font-weight: 700;
          color: #fff; line-height: 1.1; margin-bottom: 12px;
        }
        .sol2-banner-h span { color: #F0D878; }
        .sol2-banner-p { font-size: 14px; color: rgba(255,255,255,.38); line-height: 1.7; max-width: 420px; }

        .sol2-btn-gold {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 34px; background: #C9A84C;
          color: #0a1628; font-size: 11.5px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          position: relative; overflow: hidden;
          transition: background .3s, box-shadow .3s, transform .25s;
          font-family: 'DM Sans', sans-serif;
        }
        .sol2-btn-gold::before {
          content: ''; position: absolute;
          top: 0; left: -100%; bottom: 0; width: 55%;
          background: rgba(255,255,255,.18);
          transform: skewX(-15deg); transition: left .38s;
        }
        .sol2-btn-gold:hover { background: #F0D878; box-shadow: 0 0 32px rgba(201,168,76,.4); transform: translateY(-2px); }
        .sol2-btn-gold:hover::before { left: 145%; }
        .sol2-btn-gold svg { width: 13px; height: 13px; transition: transform .3s; }
        .sol2-btn-gold:hover svg { transform: translateX(3px); }

        .sol2-btn-outline {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 13px 34px;
          border: 1px solid rgba(255,255,255,.13);
          color: rgba(255,255,255,.5); font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none;
          transition: border-color .3s, color .3s, background .3s;
          font-family: 'DM Sans', sans-serif;
        }
        .sol2-btn-outline:hover {
          border-color: rgba(201,168,76,.4);
          color: #C9A84C; background: rgba(201,168,76,.05);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sol2-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .sol2-section { padding: 80px 20px; }
          .sol2-header  { flex-direction: column; gap: 24px; }
          .sol2-hr      { max-width: 100%; }
          .sol2-banner  { padding: 40px 24px; flex-direction: column; }
          .sol2-btn-gold, .sol2-btn-outline { width: 100%; justify-content: center; }
          .sol2-card    { padding: 36px 22px 32px; }
        }
        @media (max-width: 600px) {
          .sol2-stats { grid-template-columns: repeat(2,1fr); }
          .sol2-stat { border-bottom: 1px solid #e2e6ee; }
        }
        @media (max-width: 400px) {
          .sol2-banner { padding: 32px 16px; }
        }
      `}</style>

      <section id="solution" className="sol2-section">
        <div className="sol2-dots" />
        <div className="sol2-tri-tr" />
        <div className="sol2-tri-bl" />

        <div className="sol2-inner">

          {/* Header */}
          <motion.div
            className="sol2-header"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sol2-hl">
              <motion.div
                className="sol2-badge"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <span className="sol2-badge-dot" />
                The Zelvix Advantage
              </motion.div>
              <motion.h2
                className="sol2-title"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                Your Complete<br />
                Digital{" "}
                <span className="sol2-title-gold">Solution</span>
              </motion.h2>
            </div>

            <div className="sol2-hr">
              <motion.p
                className="sol2-subtitle"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We transform your real estate business with comprehensive digital
                marketing strategies that deliver real, measurable results.
              </motion.p>
              <motion.a
                href="#contact"
                className="sol2-hcta"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.38 }}
              >
                Start Your Transformation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Gold rule */}
          <div className="sol2-rule" />

          {/* Stats */}
          <motion.div
            className="sol2-stats"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="sol2-stat"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.07 }}
              >
                <div className="sol2-stat-val">{s.value}</div>
                <div className="sol2-stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cards */}
          <div className="sol2-grid">
            {solutions.map((sol, index) => (
              <motion.div
                key={sol.title}
                className={`sol2-card ${hovered === index ? "hov" : ""}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ rotateY: 1.5, rotateX: -1.5, scale: 1.01 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="sc-top" />
                <div className="sc-left" />
                <div className="sc-blob" />
                <span className="sc-num">{sol.number}</span>

                <div className="sc-icon-box">
                  <sol.icon className="sc-icon" />
                </div>

                <h3 className="sc-title">{sol.title}</h3>
                <p className="sc-desc">{sol.description}</p>

                <ul className="sc-features">
                  {sol.features.map((f) => (
                    <li key={f} className="sc-feature">
                      <span className="sc-check"><FiCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="sc-bot" />
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            className="sol2-banner"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="sol2-banner-glow" />
            <div className="sol2-banner-dots" />

            <div className="sol2-banner-l">
              <div className="sol2-banner-ey">◆ Ready to Scale?</div>
              <h3 className="sol2-banner-h">
                Take Your Business<br />to the <span>Next Level</span>
              </h3>
              <p className="sol2-banner-p">
                Join hundreds of real estate professionals who trust Zelvix to deliver
                qualified leads, stronger visibility, and real ROI.
              </p>
            </div>

            <div className="sol2-banner-r">
              <a href="#contact" className="sol2-btn-gold">
                Start Your Transformation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="tel:+918572895525" className="sol2-btn-outline">
                Call +91 85728 95525
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}