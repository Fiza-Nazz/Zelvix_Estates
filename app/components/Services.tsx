"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiSearch,
  FiVolume2,
  FiMail,
  FiEdit,
  FiVideo,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    icon: FiSearch,
    number: "01",
    title: "SEO for Real Estate",
    tag: "Organic Growth",
    description:
      "Rank higher on Google and get organic leads from people actively searching for properties in your area.",
    features: ["Keyword Research", "On-Page SEO", "Local SEO", "Link Building"],
  },
  {
    icon: FiVolume2,
    number: "02",
    title: "Paid Advertising",
    tag: "Instant Leads",
    description:
      "Run high-converting ad campaigns on Google, Facebook, and Instagram to reach your ideal clients fast.",
    features: ["Google Ads", "Facebook Ads", "Instagram Ads", "Retargeting"],
  },
  {
    icon: FiMail,
    number: "03",
    title: "Email Marketing",
    tag: "Lead Nurturing",
    description:
      "Nurture leads and maintain relationships with automated email campaigns that consistently convert.",
    features: ["Lead Nurturing", "Newsletters", "Automation", "Analytics"],
  },
  {
    icon: FiEdit,
    number: "04",
    title: "Content Marketing",
    tag: "Authority Building",
    description:
      "Establish authority with compelling content that attracts, engages, and converts your target audience.",
    features: ["Blog Writing", "Property Descriptions", "Market Reports", "Guides"],
  },
  {
    icon: FiVideo,
    number: "05",
    title: "Video Marketing",
    tag: "Visual Storytelling",
    description:
      "Showcase properties and build trust with professional video content and immersive virtual tours.",
    features: ["Property Videos", "Virtual Tours", "Testimonials", "Social Reels"],
  },
  {
    icon: FiGlobe,
    number: "06",
    title: "Web Design & Dev",
    tag: "Digital Presence",
    description:
      "Get a stunning, high-converting website that showcases your properties and generates leads 24/7.",
    features: ["Custom Design", "Lead Capture", "Property Listings", "Mobile-First"],
  },
];

const wideStats = [
  { val: "24/7", label: "Lead Generation Around The Clock" },
  { val: "100%", label: "Mobile Optimized & Fast Loading" },
  { val: "3×", label: "Higher Conversion vs Generic Sites" },
];

/* ─── Grid span config ─── */
const colSpans = ["col-span-5", "col-span-7", "col-span-4", "col-span-4", "col-span-4", "col-span-12"];

function ServiceCard({ svc, index, isWide }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`
        relative overflow-hidden cursor-default
        ${colSpans[index]}
        max-[1024px]:col-span-6
        max-[640px]:col-span-12
        ${isWide ? "p-10 max-[768px]:p-8" : "p-10 max-[640px]:p-7"}
        bg-white group
      `}
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.35s",
        background: hovered ? "#f7f8ff" : "#ffffff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated top border sweep */}
      <div
        className="absolute top-0 left-0 h-[3px]"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #0a1446, #D4AA50)",
          transition: "width 0.5s ease",
        }}
      />

      {/* Inset bottom shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: hovered ? "inset 0 -5px 0 0 rgba(10,20,70,0.06)" : "inset 0 -5px 0 0 rgba(10,20,70,0)",
          transition: "box-shadow 0.4s",
        }}
      />

      {/* Ghost number */}
      <span
        className="absolute top-2 right-5 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "92px",
          fontWeight: 700,
          color: hovered ? "rgba(10,20,70,0.07)" : "rgba(10,20,70,0.04)",
          transition: "color 0.4s",
        }}
      >
        {svc.number}
      </span>

      {isWide ? (
        /* ── Wide card layout ── */
        <div className="grid grid-cols-2 gap-12 items-center max-[768px]:grid-cols-1">
          {/* Left */}
          <div>
            <CardTag tag={svc.tag} hovered={hovered} />
            <IconBox Icon={svc.icon} hovered={hovered} />
            <CardTitle title={svc.title} hovered={hovered} />
            <CardDesc desc={svc.description} hovered={hovered} />
            <FeaturePills features={svc.features} hovered={hovered} />
          </div>
          {/* Right — stats */}
          <div className="flex flex-col gap-3">
            {wideStats.map((s) => (
              <div
                key={s.val}
                className="flex items-center gap-5 px-5 py-4 relative overflow-hidden"
                style={{
                  border: hovered ? "1px solid rgba(10,20,70,0.22)" : "1px solid rgba(10,20,70,0.1)",
                  transition: "border-color 0.35s",
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    background: "#D4AA50",
                    transform: hovered ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  className="leading-none flex-shrink-0 min-w-[64px]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "34px",
                    fontWeight: 700,
                    color: hovered ? "#D4AA50" : "#0a1446",
                    transition: "color 0.35s",
                  }}
                >
                  {s.val}
                </div>
                <div
                  className="uppercase leading-snug"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    color: "rgba(10,20,70,0.42)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── Regular card layout ── */
        <>
          <CardTag tag={svc.tag} hovered={hovered} />
          <IconBox Icon={svc.icon} hovered={hovered} />
          <CardTitle title={svc.title} hovered={hovered} />
          <CardDesc desc={svc.description} hovered={hovered} />
          <FeaturePills features={svc.features} hovered={hovered} />

          {/* Arrow CTA */}
          <div
            className="absolute bottom-6 right-6 flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              border: hovered ? "1px solid rgba(212,170,80,0.6)" : "1px solid rgba(10,20,70,0.1)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.35s ease",
            }}
          >
            <FiArrowRight
              style={{
                width: "13px",
                height: "13px",
                color: hovered ? "#D4AA50" : "#0a1446",
                transition: "color 0.3s",
              }}
            />
          </div>
        </>
      )}

      {/* Bottom sweep line */}
      <div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          width: hovered ? "65%" : "0%",
          background: "linear-gradient(90deg, #D4AA50, transparent)",
          transition: "width 0.45s ease 0.05s",
        }}
      />
    </motion.div>
  );
}

/* ─── Sub-components ─── */

function CardTag({ tag, hovered }) {
  return (
    <div
      className="inline-flex items-center gap-[6px] mb-5 uppercase"
      style={{
        padding: "4px 12px",
        border: hovered ? "1px solid #D4AA50" : "1px solid rgba(10,20,70,0.14)",
        fontSize: "9px",
        fontWeight: 600,
        letterSpacing: "2px",
        color: hovered ? "#0a1446" : "rgba(10,20,70,0.45)",
        transition: "all 0.3s",
      }}
    >
      <span
        className="block flex-shrink-0"
        style={{ width: "4px", height: "4px", background: "#D4AA50" }}
      />
      {tag}
    </div>
  );
}

function IconBox({ Icon, hovered }) {
  return (
    <div
      className="flex items-center justify-center mb-6 relative"
      style={{
        width: "54px",
        height: "54px",
        border: hovered ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.15)",
        background: hovered ? "rgba(212,170,80,0.06)" : "rgba(10,20,70,0.03)",
        transition: "all 0.35s",
      }}
    >
      {/* TL corner */}
      <span
        className="absolute"
        style={{
          top: "-5px",
          left: "-5px",
          width: "10px",
          height: "10px",
          borderTop: hovered ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)",
          borderLeft: hovered ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)",
          transition: "border-color 0.35s",
        }}
      />
      {/* BR corner */}
      <span
        className="absolute"
        style={{
          bottom: "-5px",
          right: "-5px",
          width: "10px",
          height: "10px",
          borderBottom: hovered ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)",
          borderRight: hovered ? "1.5px solid #D4AA50" : "1.5px solid rgba(10,20,70,0.2)",
          transition: "border-color 0.35s",
        }}
      />
      <Icon
        style={{
          width: "22px",
          height: "22px",
          color: hovered ? "#D4AA50" : "#0a1446",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          transition: "all 0.35s",
        }}
      />
    </div>
  );
}

function CardTitle({ title, hovered }) {
  return (
    <h3
      className="mb-3 leading-tight"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "21px",
        fontWeight: 700,
        color: "#0a1446",
        transition: "color 0.3s",
      }}
    >
      {title}
    </h3>
  );
}

function CardDesc({ desc, hovered }) {
  return (
    <p
      className="mb-6 leading-relaxed"
      style={{
        fontSize: "13.5px",
        fontWeight: 300,
        color: hovered ? "rgba(10,20,70,0.65)" : "rgba(10,20,70,0.45)",
        lineHeight: "1.8",
        transition: "color 0.3s",
      }}
    >
      {desc}
    </p>
  );
}

function FeaturePills({ features, hovered }) {
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((f) => (
        <span
          key={f}
          className="inline-flex items-center gap-[5px] uppercase"
          style={{
            padding: "4px 11px",
            border: hovered ? "1px solid rgba(10,20,70,0.22)" : "1px solid rgba(10,20,70,0.1)",
            fontSize: "9.5px",
            fontWeight: 600,
            letterSpacing: "1px",
            color: hovered ? "rgba(10,20,70,0.65)" : "rgba(10,20,70,0.35)",
            transition: "all 0.3s",
          }}
        >
          <span
            className="block flex-shrink-0"
            style={{
              width: "4px",
              height: "4px",
              background: "#D4AA50",
              transform: "rotate(45deg)",
            }}
          />
          {f}
        </span>
      ))}
    </div>
  );
}

/* ─── Main Export ─── */
export default function Services() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .srv-section {
          font-family: 'DM Sans', sans-serif;
        }

        .srv-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,20,70,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,20,70,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .srv-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .srv-cta-btn {
          position: relative;
          overflow: hidden;
          box-shadow: 6px 6px 0 0 rgba(212,170,80,0.3);
          transition: box-shadow 0.35s, transform 0.35s, background 0.3s;
        }
        .srv-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; bottom: 0; width: 60%;
          background: rgba(255,255,255,0.08);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .srv-cta-btn:hover {
          box-shadow: 9px 9px 0 0 rgba(212,170,80,0.55), 0 20px 48px rgba(10,20,70,0.18);
          transform: translateY(-2px);
        }
        .srv-cta-btn:hover::before {
          left: 160%;
        }

        .srv-header-cta {
          transition: all 0.3s;
        }
        .srv-header-cta:hover {
          background: transparent !important;
          color: #0a1446 !important;
        }

        .srv-bento-gap {
          gap: 2px;
          background: rgba(10,20,70,0.08);
          border: 1.5px solid rgba(10,20,70,0.1);
        }
      `}</style>

      <section
        id="services"
        className="srv-section relative bg-white overflow-hidden px-7 py-28 max-[640px]:px-4 max-[640px]:py-20"
      >
        <div className="srv-noise" />
        <div className="srv-grid-bg" />

        {/* Ambient glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-180px", left: "-180px",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(10,20,70,0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-140px", right: "-140px",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(212,170,80,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Decorative corner brackets */}
        <svg
          className="absolute top-8 left-8 pointer-events-none"
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M48 2H2V48" stroke="rgba(10,20,70,0.15)" strokeWidth="1" />
        </svg>
        <svg
          className="absolute bottom-8 right-8 pointer-events-none"
          width="48" height="48" viewBox="0 0 48 48" fill="none"
          style={{ transform: "rotate(180deg)" }}
        >
          <path d="M48 2H2V48" stroke="rgba(10,20,70,0.15)" strokeWidth="1" />
        </svg>

        <div className="max-w-[1260px] mx-auto relative z-10">

          {/* ── Header ── */}
          <motion.div
            className="flex items-end justify-between gap-10 mb-14 flex-wrap max-[640px]:gap-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left */}
            <div className="flex-1 min-w-[260px]">
              <motion.div
                className="inline-flex items-center gap-[10px] mb-5 uppercase"
                style={{
                  border: "1px solid rgba(10,20,70,0.18)",
                  background: "rgba(10,20,70,0.04)",
                  padding: "8px 20px",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  color: "#0a1446",
                }}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <span
                  className="block flex-shrink-0"
                  style={{ width: "5px", height: "5px", background: "#D4AA50" }}
                />
                Our Services
              </motion.div>

              <motion.h2
                className="leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 5vw, 62px)",
                  fontWeight: 700,
                  color: "#0a1446",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.05,
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22 }}
              >
                Everything You Need<br />
                to{" "}
                <span style={{ color: "#D4AA50" }}>Grow Online</span>
              </motion.h2>
            </div>

            {/* Right */}
            <motion.div
              className="flex flex-col gap-5 items-start max-w-[360px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(10,20,70,0.5)",
                  lineHeight: "1.85",
                }}
              >
                Comprehensive digital marketing services tailored specifically
                for real estate professionals who want real, measurable results.
              </p>
              <a
                href="#contact"
                className="srv-header-cta inline-flex items-center gap-[10px] uppercase whitespace-nowrap"
                style={{
                  padding: "13px 26px",
                  border: "1.5px solid #0a1446",
                  background: "#0a1446",
                  color: "#D4AA50",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textDecoration: "none",
                }}
              >
                Get Free Consultation
                <FiArrowRight style={{ width: "13px", height: "13px" }} />
              </a>
            </motion.div>
          </motion.div>

          {/* Rule */}
          <div
            className="w-full mb-14"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.15), transparent)",
            }}
          />

          {/* ── Bento Grid ── */}
          <div className="srv-bento-gap grid grid-cols-12 mb-16">
            {services.map((svc, index) => (
              <ServiceCard
                key={svc.title}
                svc={svc}
                index={index}
                isWide={index === 5}
              />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="w-full mb-12"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.12), transparent)",
              }}
            />
            <p
              className="uppercase mb-6"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "2px",
                color: "rgba(10,20,70,0.32)",
              }}
            >
              Not sure which service is right for you?
            </p>
            <a
              href="#contact"
              className="srv-cta-btn inline-flex items-center gap-3 uppercase"
              style={{
                padding: "17px 46px",
                background: "#0a1446",
                color: "#D4AA50",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textDecoration: "none",
              }}
            >
              Get Free Consultation
              <FiArrowRight style={{ width: "15px", height: "15px", flexShrink: 0 }} />
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}