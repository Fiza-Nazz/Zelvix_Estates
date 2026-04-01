"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiSearch,
  FiPenTool,
  FiSend,
  FiBarChart,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    icon: FiMessageSquare,
    step: "01",
    title: "Free Consultation",
    description:
      "We start with a free consultation to understand your business, goals, and target audience.",
  },
  {
    icon: FiSearch,
    step: "02",
    title: "Market Research",
    description:
      "Our team conducts in-depth research on your market, competitors, and ideal customers.",
  },
  {
    icon: FiPenTool,
    step: "03",
    title: "Custom Strategy",
    description:
      "We create a tailored digital marketing strategy designed specifically for your real estate business.",
  },
  {
    icon: FiSend,
    step: "04",
    title: "Campaign Launch",
    description:
      "Once approved, we launch your campaigns across selected channels with precision and care.",
  },
  {
    icon: FiBarChart,
    step: "05",
    title: "Monitor & Optimize",
    description:
      "We continuously track performance and optimize campaigns to maximize your ROI.",
  },
  {
    icon: FiCheck,
    step: "06",
    title: "Scale & Grow",
    description:
      "As results come in, we scale successful campaigns to accelerate your business growth.",
  },
];

export default function Process() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .proc-section { font-family: 'DM Sans', sans-serif; }

        .proc-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(10,20,70,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,20,70,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Step number badge */
        .proc-step-num {
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 12px; letter-spacing: 1px;
          position: relative; z-index: 2;
          flex-shrink: 0;
          transition: all 0.35s;
        }

        /* Step card */
        .proc-card {
          position: relative; overflow: hidden;
          background: #ffffff;
          border: 1.5px solid rgba(10,20,70,0.1);
          padding: 32px 24px 28px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          transition: background 0.35s, border-color 0.35s, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
          cursor: default;
        }
        .proc-card:hover {
          background: #f7f8ff;
          border-color: rgba(212,170,80,0.5);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(10,20,70,0.1), 4px 4px 0 0 rgba(212,170,80,0.2);
        }

        /* Top sweep */
        .proc-card-top {
          position: absolute; top: 0; left: 0; height: 3px; width: 0;
          background: linear-gradient(90deg, #0a1446, #D4AA50);
          transition: width 0.5s ease;
        }
        .proc-card:hover .proc-card-top { width: 100%; }

        /* Bottom sweep */
        .proc-card-btm {
          position: absolute; bottom: 0; right: 0; height: 1px; width: 0;
          background: linear-gradient(270deg, #D4AA50, transparent);
          transition: width 0.45s ease 0.05s;
        }
        .proc-card:hover .proc-card-btm { width: 65%; }

        /* Icon box */
        .proc-icon-box {
          width: 54px; height: 54px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(10,20,70,0.15);
          background: rgba(10,20,70,0.03);
          margin-bottom: 20px; position: relative;
          transition: all 0.35s;
        }
        .proc-card:hover .proc-icon-box {
          border-color: #D4AA50;
          background: rgba(212,170,80,0.06);
        }
        /* TL corner */
        .proc-icon-box::before {
          content: ''; position: absolute;
          top: -5px; left: -5px; width: 10px; height: 10px;
          border-top: 1.5px solid rgba(10,20,70,0.2);
          border-left: 1.5px solid rgba(10,20,70,0.2);
          transition: border-color 0.35s;
        }
        /* BR corner */
        .proc-icon-box::after {
          content: ''; position: absolute;
          bottom: -5px; right: -5px; width: 10px; height: 10px;
          border-bottom: 1.5px solid rgba(10,20,70,0.2);
          border-right: 1.5px solid rgba(10,20,70,0.2);
          transition: border-color 0.35s;
        }
        .proc-card:hover .proc-icon-box::before,
        .proc-card:hover .proc-icon-box::after { border-color: #D4AA50; }

        /* Ghost step number watermark */
        .proc-ghost {
          position: absolute; bottom: 8px; right: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px; font-weight: 700;
          color: rgba(10,20,70,0.04); line-height: 1;
          pointer-events: none; user-select: none;
          transition: color 0.4s;
        }
        .proc-card:hover .proc-ghost { color: rgba(10,20,70,0.07); }

        /* Connector line desktop */
        .proc-connector {
          display: none;
        }
        @media (min-width: 1024px) {
          .proc-connector {
            display: block;
            position: absolute; top: 24px;
            left: calc(8.33% + 24px); right: calc(8.33% + 24px);
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(10,20,70,0.15) 10%, rgba(10,20,70,0.15) 90%, transparent);
          }
          .proc-connector-gold {
            position: absolute; top: 0; left: 0; bottom: 0;
            background: linear-gradient(90deg, #0a1446, #D4AA50);
            width: 0;
            animation: connectorFill 1.5s ease 0.5s forwards;
          }
        }
        @keyframes connectorFill {
          to { width: 100%; }
        }

        /* CTA btn */
        .proc-cta-btn {
          position: relative; overflow: hidden;
          box-shadow: 6px 6px 0 0 rgba(212,170,80,0.3);
          transition: box-shadow 0.35s, transform 0.35s;
        }
        .proc-cta-btn::before {
          content: ''; position: absolute;
          top: 0; left: -100%; bottom: 0; width: 60%;
          background: rgba(255,255,255,0.08); transform: skewX(-20deg);
          transition: left 0.5s;
        }
        .proc-cta-btn:hover {
          box-shadow: 9px 9px 0 0 rgba(212,170,80,0.55), 0 20px 48px rgba(10,20,70,0.15);
          transform: translateY(-2px);
        }
        .proc-cta-btn:hover::before { left: 160%; }
        .proc-cta-btn svg { transition: transform 0.3s; }
        .proc-cta-btn:hover svg { transform: translateX(5px); }

        /* Timeline for mobile/tablet */
        @media (max-width: 1023px) {
          .proc-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .proc-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="process"
        className="proc-section relative bg-white overflow-hidden py-28 px-7 max-[640px]:px-4 max-[640px]:py-20"
      >
        <div className="proc-grid-bg" />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top: "-180px", left: "-180px", width: "580px", height: "580px", background: "radial-gradient(circle, rgba(10,20,70,0.05) 0%, transparent 65%)" }} />
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
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-[8px] mb-5 uppercase" style={{ border: "1px solid rgba(10,20,70,0.18)", background: "rgba(10,20,70,0.04)", padding: "8px 20px", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", color: "#0a1446" }}>
              <span style={{ width: "5px", height: "5px", background: "#D4AA50", transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
              Our Process
            </div>

            <h2 className="mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(34px,5vw,62px)", fontWeight: 700, color: "#0a1446", lineHeight: 1.05, letterSpacing: "-0.5px" }}>
              How We <span style={{ color: "#D4AA50" }}>Work</span>
            </h2>

            <p style={{ color: "rgba(10,20,70,0.5)", fontSize: "14px", fontWeight: 300, lineHeight: "1.85", maxWidth: "500px", margin: "0 auto" }}>
              Our proven 6-step process ensures every campaign delivers
              exceptional results for our real estate clients.
            </p>
          </motion.div>

          {/* Rule */}
          <div className="w-full mb-16" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.15), transparent)" }} />

          {/* ── Steps ── */}
          <div className="relative">

            {/* Connector line — desktop */}
            <div className="proc-connector">
              <div className="proc-connector-gold" />
            </div>

            {/* Step numbers row — desktop */}
            <div className="hidden lg:grid lg:grid-cols-6 gap-4 mb-6">
              {steps.map((step, index) => (
                <div key={step.step} className="flex justify-center">
                  <motion.div
                    className="proc-step-num"
                    style={{
                      background: hovered === index
                        ? "#D4AA50"
                        : "#0a1446",
                      color: hovered === index ? "#0a1446" : "#D4AA50",
                      boxShadow: hovered === index
                        ? "4px 4px 0 0 rgba(10,20,70,0.25)"
                        : "3px 3px 0 0 rgba(212,170,80,0.25)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {step.step}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Cards grid */}
            <div
              className="proc-steps-grid grid gap-3"
              style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="proc-card"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="proc-card-top" />
                  <div className="proc-card-btm" />
                  <span className="proc-ghost">{step.step}</span>

                  {/* Mobile step badge (hidden on lg) */}
                  <div
                    className="lg:hidden mb-4 flex items-center justify-center"
                    style={{ width: "40px", height: "40px", background: "#0a1446", color: "#D4AA50", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", flexShrink: 0 }}
                  >
                    {step.step}
                  </div>

                  {/* Icon box */}
                  <div className="proc-icon-box">
                    <step.icon style={{
                      width: "20px", height: "20px",
                      color: hovered === index ? "#D4AA50" : "#0a1446",
                      transform: hovered === index ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.35s",
                    }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "17px", fontWeight: 700,
                      color: hovered === index ? "#0d1a5c" : "#0a1446",
                      letterSpacing: "0.2px", lineHeight: 1.2,
                      transition: "color 0.3s",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p style={{
                    fontSize: "12px", fontWeight: 300,
                    color: hovered === index ? "rgba(10,20,70,0.6)" : "rgba(10,20,70,0.42)",
                    lineHeight: "1.8", transition: "color 0.3s",
                  }}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Mini timeline strip — below cards ── */}
          <motion.div
            className="hidden lg:flex mt-4 mb-20"
            style={{ border: "1.5px solid rgba(10,20,70,0.08)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="flex-1 flex items-center gap-2 px-4 py-3"
                style={{
                  borderRight: i < steps.length - 1 ? "1px solid rgba(10,20,70,0.08)" : "none",
                  background: hovered === i ? "rgba(212,170,80,0.04)" : "transparent",
                  transition: "background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ width: "4px", height: "4px", background: i === (hovered ?? -1) ? "#D4AA50" : "rgba(10,20,70,0.2)", transform: "rotate(45deg)", display: "block", flexShrink: 0, transition: "background 0.3s" }} />
                <span className="uppercase" style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "1.5px", color: i === (hovered ?? -1) ? "#0a1446" : "rgba(10,20,70,0.35)", transition: "color 0.3s", whiteSpace: "nowrap" }}>
                  {step.title}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full mb-12" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.12), transparent)" }} />
            <p className="mb-6" style={{ color: "rgba(10,20,70,0.4)", fontSize: "13px", fontWeight: 400, letterSpacing: "0.3px" }}>
              Ready to get started with our proven process?
            </p>
            <a
              href="#contact"
              className="proc-cta-btn inline-flex items-center gap-3 uppercase"
              style={{ padding: "17px 46px", background: "#0a1446", color: "#D4AA50", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textDecoration: "none" }}
            >
              Book Your Free Consultation
              <FiArrowRight style={{ width: "15px", height: "15px", flexShrink: 0 }} />
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}