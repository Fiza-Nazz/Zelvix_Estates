"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiAward,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

const features = [
  {
    icon: FiAward,
    title: "Industry Experts",
    description: "Our team has 10+ years of experience in real estate digital marketing with proven strategies.",
    stat: "10+",
    statLabel: "Years Experience",
  },
  {
    icon: FiUsers,
    title: "Dedicated Support",
    description: "Get a dedicated account manager and round-the-clock support for all your campaigns.",
    stat: "24/7",
    statLabel: "Support",
  },
  {
    icon: FiClock,
    title: "Quick Turnaround",
    description: "We launch campaigns fast and optimize continuously to deliver the best possible results.",
    stat: "48hr",
    statLabel: "Launch Time",
  },
  {
    icon: FiDollarSign,
    title: "ROI Focused",
    description: "Every strategy is designed to maximize your return on investment with zero budget waste.",
    stat: "300%",
    statLabel: "Avg ROI",
  },
  {
    icon: FiTrendingUp,
    title: "Proven Results",
    description: "Track record of delivering measurable, real growth for over 500 satisfied clients.",
    stat: "500+",
    statLabel: "Clients Served",
  },
  {
    icon: FiShield,
    title: "Transparent Reporting",
    description: "Detailed reports and live analytics so you always know exactly how your campaigns perform.",
    stat: "100%",
    statLabel: "Transparent",
  },
];

const ctaPoints = [
  "No long-term contracts — cancel anytime",
  "Dedicated real estate marketing specialists",
  "Results guaranteed or your money back",
  "Free strategy call — no obligation",
];

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .why-section { font-family: 'DM Sans', sans-serif; }

        .why-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(10,20,70,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,20,70,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Feature grid */
        .why-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(10,20,70,0.07);
          border: 1.5px solid rgba(10,20,70,0.1);
          margin-bottom: 2px;
        }
        @media (max-width: 1024px) { .why-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .why-feat-grid { grid-template-columns: 1fr; } }

        /* Card top sweep */
        .why-card-top {
          position: absolute; top: 0; left: 0; height: 3px; width: 0;
          background: linear-gradient(90deg, #0a1446, #D4AA50);
          transition: width 0.5s ease;
        }
        .why-card:hover .why-card-top { width: 100%; }

        /* Card left sweep */
        .why-card-left {
          position: absolute; top: 0; left: 0; width: 3px; height: 0;
          background: linear-gradient(180deg, #D4AA50, transparent);
          transition: height 0.45s ease 0.08s;
        }
        .why-card:hover .why-card-left { height: 70%; }

        /* Icon ring */
        .why-icon-ring {
          position: absolute; inset: -5px;
          border: 1px solid rgba(10,20,70,0.08);
          transition: border-color 0.35s;
        }
        .why-card:hover .why-icon-ring { border-color: rgba(212,170,80,0.25); }

        /* Stat pill */
        .why-stat-pill {
          display: inline-flex; align-items: baseline; gap: 6px;
          padding: 6px 14px;
          border: 1px solid rgba(10,20,70,0.12);
          transition: border-color 0.3s, background 0.3s;
        }
        .why-card:hover .why-stat-pill {
          border-color: rgba(212,170,80,0.5);
          background: rgba(212,170,80,0.04);
        }

        /* Trust strip */
        .why-trust-strip {
          display: flex; flex-wrap: wrap;
          border: 1.5px solid rgba(10,20,70,0.1);
          margin-bottom: 64px;
        }
        .trust-item {
          flex: 1; min-width: 200px;
          display: flex; align-items: center; gap: 12px;
          padding: 18px 22px;
          border-right: 1px solid rgba(10,20,70,0.08);
          transition: background 0.3s;
          position: relative; overflow: hidden;
        }
        .trust-item:last-child { border-right: none; }
        .trust-item::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #0a1446, #D4AA50);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .trust-item:hover::before { transform: scaleX(1); }
        .trust-item:hover { background: rgba(10,20,70,0.03); }
        @media (max-width: 768px) {
          .trust-item { flex: 50%; border-bottom: 1px solid rgba(10,20,70,0.08); }
        }
        @media (max-width: 480px) { .trust-item { flex: 100%; } }

        /* CTA banner */
        .why-cta-banner {
          position: relative;
          border: 1.5px solid rgba(10,20,70,0.12);
          overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 48px; flex-wrap: wrap;
          padding: 64px;
          background: #0a1446;
        }
        .why-cta-banner::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #D4AA50, transparent);
        }
        .why-cta-banner::after {
          content: ''; position: absolute;
          top: -120px; right: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(212,170,80,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .why-cta-banner { padding: 44px 28px; flex-direction: column; }
        }

        /* CTA primary btn */
        .cta-btn-primary {
          position: relative; overflow: hidden;
          box-shadow: 5px 5px 0 0 rgba(212,170,80,0.4);
          transition: box-shadow 0.35s, transform 0.35s;
        }
        .cta-btn-primary::before {
          content: ''; position: absolute;
          top: 0; left: -100%; bottom: 0; width: 60%;
          background: rgba(255,255,255,0.1); transform: skewX(-20deg);
          transition: left 0.5s;
        }
        .cta-btn-primary:hover {
          box-shadow: 8px 8px 0 0 rgba(212,170,80,0.6), 0 20px 48px rgba(212,170,80,0.2);
          transform: translateY(-2px);
        }
        .cta-btn-primary:hover::before { left: 160%; }

        .cta-btn-secondary { transition: all 0.3s; }
        .cta-btn-secondary:hover {
          background: rgba(212,170,80,0.1) !important;
          border-color: #D4AA50 !important;
          color: #D4AA50 !important;
        }
      `}</style>

      <section
        id="why-choose-us"
        className="why-section relative bg-white overflow-hidden px-7 py-28 max-[640px]:px-4 max-[640px]:py-20"
      >
        <div className="why-grid-bg" />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top: "-160px", right: "-160px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,170,80,0.06) 0%, transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "-160px", left: "-160px", width: "560px", height: "560px", background: "radial-gradient(circle, rgba(10,20,70,0.05) 0%, transparent 65%)" }} />

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
            className="flex items-end justify-between gap-10 mb-14 flex-wrap max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-[8px] mb-5 uppercase"
                style={{ border: "1px solid rgba(10,20,70,0.18)", background: "rgba(10,20,70,0.04)", padding: "8px 20px", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", color: "#0a1446" }}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <span style={{ width: "5px", height: "5px", background: "#D4AA50", transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
                Why Zelvix?
              </motion.div>

              <motion.h2
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 700, color: "#0a1446", lineHeight: 1.05, letterSpacing: "-0.5px" }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22 }}
              >
                Why Top Real Estate<br />
                Agents <span style={{ color: "#D4AA50" }}>Choose Us</span>
              </motion.h2>
            </div>

            <motion.p
              style={{ fontSize: "14px", fontWeight: 300, color: "rgba(10,20,70,0.5)", lineHeight: "1.85", maxWidth: "340px", textAlign: "right" }}
              className="max-[640px]:text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We're not just another digital marketing agency. We're your
              dedicated growth partners who understand real estate inside out.
            </motion.p>
          </motion.div>

          {/* Rule */}
          <div className="w-full mb-14" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.15), transparent)" }} />

          {/* ── Feature Grid ── */}
          <div className="why-feat-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="why-card relative overflow-hidden cursor-default"
                style={{
                  background: hovered === index ? "#f7f8ff" : "#ffffff",
                  padding: "44px 36px",
                  transition: "background 0.35s ease",
                  transform: hovered === index ? "translateY(-2px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top & left sweep lines */}
                <div className="why-card-top" />
                <div className="why-card-left" />

                {/* Inset shadow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: hovered === index ? "inset 0 -4px 0 0 rgba(10,20,70,0.06)" : "none",
                  transition: "box-shadow 0.4s",
                }} />

                {/* Ghost stat watermark */}
                <span className="absolute top-3 right-5 select-none pointer-events-none leading-none" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "72px", fontWeight: 700,
                  color: hovered === index ? "rgba(10,20,70,0.07)" : "rgba(10,20,70,0.04)",
                  transition: "color 0.4s",
                }}>
                  {feature.stat}
                </span>

                {/* Icon box */}
                <div
                  className="relative flex items-center justify-center mb-6"
                  style={{
                    width: "52px", height: "52px",
                    border: hovered === index ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.15)",
                    background: hovered === index ? "rgba(212,170,80,0.06)" : "rgba(10,20,70,0.03)",
                    transition: "all 0.35s",
                  }}
                >
                  <div className="why-icon-ring" />
                  {/* TL corner */}
                  <span className="absolute" style={{ top: "-5px", left: "-5px", width: "10px", height: "10px", borderTop: hovered === index ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)", borderLeft: hovered === index ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)", transition: "border-color 0.35s" }} />
                  {/* BR corner */}
                  <span className="absolute" style={{ bottom: "-5px", right: "-5px", width: "10px", height: "10px", borderBottom: hovered === index ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)", borderRight: hovered === index ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)", transition: "border-color 0.35s" }} />
                  <feature.icon style={{
                    width: "20px", height: "20px",
                    color: hovered === index ? "#D4AA50" : "#0a1446",
                    transform: hovered === index ? "scale(1.15)" : "scale(1)",
                    transition: "all 0.35s",
                  }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px", fontWeight: 700,
                  color: hovered === index ? "#0d1a5c" : "#0a1446",
                  marginBottom: "12px", lineHeight: 1.2,
                  transition: "color 0.3s",
                }}>
                  {feature.title}
                </h3>

                {/* Desc */}
                <p style={{
                  fontSize: "13.5px", fontWeight: 300,
                  color: hovered === index ? "rgba(10,20,70,0.65)" : "rgba(10,20,70,0.45)",
                  lineHeight: "1.8", marginBottom: "22px",
                  transition: "color 0.3s",
                }}>
                  {feature.description}
                </p>

                {/* Stat pill */}
                <div className="why-stat-pill inline-flex items-baseline gap-[6px]">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#D4AA50", lineHeight: 1 }}>
                    {feature.stat}
                  </span>
                  <span className="uppercase" style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "1.5px", color: "rgba(10,20,70,0.38)" }}>
                    {feature.statLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Trust Strip ── */}
          <motion.div
            className="why-trust-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {ctaPoints.map((pt) => (
              <div key={pt} className="trust-item">
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: "20px", height: "20px", border: "1px solid rgba(10,20,70,0.2)" }}>
                  <FiCheck style={{ width: "10px", height: "10px", color: "#D4AA50" }} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.3px", color: "rgba(10,20,70,0.55)" }}>
                  {pt}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── CTA Banner ── */}
          <motion.div
            className="why-cta-banner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {/* Left */}
            <div className="flex-1 min-w-[260px] relative z-10">
              <div className="uppercase mb-4" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "#D4AA50" }}>
                ◆ Ready to Scale?
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, marginBottom: "18px" }}>
                Ready to Work with<br />
                the <span style={{ color: "#D4AA50" }}>Best?</span>
              </h3>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: "1.8", maxWidth: "460px", marginBottom: "28px" }}>
                Join hundreds of successful real estate professionals who trust
                Zelvix for their digital marketing. Get your free strategy call today.
              </p>
              <div className="flex flex-col gap-3">
                {ctaPoints.map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: "18px", height: "18px", border: "1px solid rgba(212,170,80,0.4)" }}>
                      <FiCheck style={{ width: "9px", height: "9px", color: "#D4AA50" }} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.55)", letterSpacing: "0.3px" }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3 flex-shrink-0 relative z-10 max-[768px]:w-full">
              <a
                href="#contact"
                className="cta-btn-primary inline-flex items-center justify-center gap-[10px] uppercase whitespace-nowrap"
                style={{ padding: "16px 36px", background: "#D4AA50", color: "#0a1446", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textDecoration: "none" }}
              >
                Get Started Today
                <FiArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
              <a
                href="tel:+18003584849"
                className="cta-btn-secondary inline-flex items-center justify-center gap-[10px] uppercase whitespace-nowrap"
                style={{ padding: "14px 36px", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textDecoration: "none" }}
              >
                Call +1 800 ZELVIX
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}