"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiImage, FiFilm, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const filters = ["All", "Social Media Ads", "Video Marketing", "SEO & Content", "Web Design", "Branding", "Social Media"];

const portfolioItems = [
  {
    id: 1,
    title: "Luxury Villa Campaign",
    category: "Social Media Ads",
    type: "reel",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    stats: "2.5M+ Views",
    result: "400% Engagement Boost",
  },
  {
    id: 2,
    title: "Downtown Apartments Launch",
    category: "Video Marketing",
    type: "reel",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    stats: "500+ Leads",
    result: "60-Day Campaign",
  },
  {
    id: 3,
    title: "Commercial Property SEO",
    category: "SEO & Content",
    type: "poster",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    stats: "#1 Google Ranking",
    result: "8 Months to Top",
  },
  {
    id: 4,
    title: "Residential Complex Branding",
    category: "Web Design",
    type: "screenshot",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    stats: "300% Traffic Increase",
    result: "Complete Redesign",
  },
  {
    id: 5,
    title: "Property Dealer Brand Identity",
    category: "Branding",
    type: "poster",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    stats: "Brand Recognition +85%",
    result: "Full Identity System",
  },
  {
    id: 6,
    title: "Real Estate Instagram Growth",
    category: "Social Media",
    type: "reel",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    stats: "50K Followers",
    result: "6-Month Growth",
  },
];

const tickerData = [
  { val: "2.5M+", lbl: "Total Views Generated" },
  { val: "500+", lbl: "Qualified Leads Delivered" },
  { val: "#1", lbl: "Google Rankings Achieved" },
  { val: "300%", lbl: "Average Traffic Increase" },
  { val: "50K+", lbl: "Social Followers Gained" },
];

/* Grid span classes — first item large, rest normal */
const spanClasses = [
  "col-span-7 row-span-2",
  "col-span-5 row-span-1",
  "col-span-5 row-span-1",
  "col-span-5 row-span-2",
  "col-span-4 row-span-1",
  "col-span-3 row-span-1",
];

function TypeIcon({ type }) {
  if (type === "reel") return <FiFilm style={{ width: "10px", height: "10px" }} />;
  return <FiImage style={{ width: "10px", height: "10px" }} />;
}

function PortfolioCard({ item, index, isFiltered }) {
  const [hovered, setHovered] = useState(false);

  const spanClass = isFiltered
    ? "col-span-12 sm:col-span-6 lg:col-span-4"
    : `${spanClasses[index]} max-[1024px]:col-span-6 max-[1024px]:row-span-1 max-[640px]:col-span-12 max-[640px]:row-span-1`;

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${spanClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: isFiltered ? "260px" : undefined }}
    >
      {/* Fallback bg */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #e8eaf2 0%, #d0d4e8 100%)" }}
      >
        <TypeIcon type={item.type} />
      </div>

      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.image})`,
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(10,20,70,0.94) 0%, rgba(10,20,70,0.65) 50%, rgba(10,20,70,0.28) 100%)"
            : "linear-gradient(to top, rgba(10,20,70,0.85) 0%, rgba(10,20,70,0.38) 55%, rgba(10,20,70,0.1) 100%)",
          transition: "background 0.4s",
        }}
      />

      {/* Gold border reveal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: hovered ? "1.5px solid rgba(212,170,80,0.6)" : "1.5px solid rgba(212,170,80,0)",
          transition: "border-color 0.4s",
          zIndex: 3,
        }}
      />

      {/* Top gold sweep */}
      <div
        className="absolute top-0 left-0 h-[3px]"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #0a1446, #D4AA50, transparent)",
          transition: "width 0.5s ease",
          zIndex: 4,
        }}
      />

      {/* 3D lift shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: hovered
            ? "inset 0 -6px 0 0 rgba(10,20,70,0.4), 0 24px 48px rgba(10,20,70,0.25)"
            : "inset 0 0 0 0 transparent",
          transition: "box-shadow 0.4s",
          zIndex: 2,
        }}
      />

      {/* Type badge */}
      <div
        className="absolute top-4 right-4 flex items-center gap-[6px] uppercase"
        style={{
          padding: "5px 12px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          border: hovered ? "1px solid #D4AA50" : "1px solid rgba(212,170,80,0.3)",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "#0a1446",
          zIndex: 5,
          transition: "border-color 0.3s",
        }}
      >
        <span style={{ color: "#D4AA50" }}>
          <TypeIcon type={item.type} />
        </span>
        {item.type}
      </div>

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5]"
        style={{ padding: "24px 24px 28px" }}
      >
        {/* Category */}
        <div
          className="uppercase mb-[6px]"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#D4AA50",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s, transform 0.35s",
          }}
        >
          {item.category}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: index === 0 ? "26px" : index === 3 ? "22px" : "19px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "10px",
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "transform 0.35s",
          }}
        >
          {item.title}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#D4AA50",
              letterSpacing: "0.5px",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {item.stats}
          </span>
          <span
            className="rounded-full"
            style={{ width: "3px", height: "3px", background: "rgba(255,255,255,0.3)" }}
          />
          <span
            className="uppercase"
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {item.result}
          </span>
        </div>
      </div>

      {/* Arrow CTA */}
      <div
        className="absolute bottom-6 right-5 flex items-center justify-center z-[6]"
        style={{
          width: "32px",
          height: "32px",
          border: hovered ? "1px solid rgba(212,170,80,0.7)" : "1px solid transparent",
          background: hovered ? "rgba(10,20,70,0.6)" : "transparent",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(0,0)" : "translate(-4px,4px)",
          transition: "all 0.35s ease",
        }}
      >
        <FiArrowUpRight
          style={{ width: "13px", height: "13px", color: "#D4AA50" }}
        />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const displayed =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeFilter);

  const isFiltered = activeFilter !== "All";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pf-section { font-family: 'DM Sans', sans-serif; }

        .pf-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(10,20,70,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,20,70,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .pf-filter-btn {
          padding: 7px 18px;
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(10,20,70,0.15);
          color: rgba(10,20,70,0.4);
          background: transparent; cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .pf-filter-btn:hover {
          border-color: rgba(10,20,70,0.35);
          color: rgba(10,20,70,0.75);
          background: rgba(10,20,70,0.03);
        }
        .pf-filter-btn.active {
          background: #0a1446;
          border-color: #0a1446;
          color: #D4AA50;
        }

        .pf-masonry {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 200px;
          gap: 12px;
          margin-bottom: 72px;
        }
        .pf-masonry-filtered {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 72px;
        }
        @media (max-width: 1024px) {
          .pf-masonry { grid-auto-rows: 230px; }
          .pf-masonry-filtered { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pf-masonry { grid-auto-rows: 240px; }
          .pf-masonry-filtered { grid-template-columns: 1fr; }
        }

        .pf-ticker-item:hover { background: rgba(212,170,80,0.04); }
        .pf-ticker-item { transition: background 0.3s; position: relative; }
        .pf-ticker-item::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4AA50, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pf-ticker-item:hover::before { opacity: 1; }

        .pf-cta-btn {
          position: relative; overflow: hidden;
          box-shadow: 6px 6px 0 0 rgba(212,170,80,0.3);
          transition: box-shadow 0.35s, transform 0.35s, background 0.3s;
        }
        .pf-cta-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%; bottom: 0; width: 60%;
          background: rgba(255,255,255,0.08);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .pf-cta-btn:hover {
          box-shadow: 9px 9px 0 0 rgba(212,170,80,0.55), 0 20px 48px rgba(10,20,70,0.15);
          transform: translateY(-2px);
        }
        .pf-cta-btn:hover::before { left: 160%; }

        .pf-view-all { transition: all 0.3s; }
        .pf-view-all:hover {
          background: #0a1446 !important;
          color: #D4AA50 !important;
        }
      `}</style>

      <section id="portfolio" className="pf-section relative bg-white overflow-hidden px-7 py-28 max-[640px]:px-4 max-[640px]:py-20">
        <div className="pf-grid-bg" />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top: "-180px", right: "-180px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,170,80,0.07) 0%, transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "-140px", left: "-140px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(10,20,70,0.05) 0%, transparent 65%)" }} />

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
            className="flex items-end justify-between gap-10 mb-12 flex-wrap max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-6"
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
                <span className="block flex-shrink-0" style={{ width: "5px", height: "5px", background: "#D4AA50", transform: "rotate(45deg)" }} />
                Our Work
              </motion.div>

              <motion.h2
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 700, color: "#0a1446", lineHeight: 1.05, letterSpacing: "-0.5px" }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22 }}
              >
                Success Stories &<br />
                <span style={{ color: "#D4AA50" }}>Results</span>
              </motion.h2>
            </div>

            <motion.div
              className="flex flex-col items-end gap-4 max-[640px]:items-start"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(10,20,70,0.5)", lineHeight: "1.85", maxWidth: "340px", textAlign: "right" }} className="max-[640px]:text-left">
                See how we've helped real estate professionals achieve extraordinary results with cutting-edge digital marketing.
              </p>
              <a
                href="#contact"
                className="pf-view-all inline-flex items-center gap-[8px] uppercase whitespace-nowrap"
                style={{ padding: "11px 24px", border: "1.5px solid #0a1446", color: "#0a1446", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textDecoration: "none" }}
              >
                View All Projects
                <FiArrowUpRight style={{ width: "13px", height: "13px" }} />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Filters ── */}
          <motion.div
            className="flex gap-2 flex-wrap mb-12 pb-8"
            style={{ borderBottom: "1px solid rgba(10,20,70,0.1)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className={`pf-filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className={isFiltered ? "pf-masonry-filtered" : "pf-masonry"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {displayed.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  isFiltered={isFiltered}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Ticker ── */}
          <motion.div
            className="flex flex-wrap mb-16"
            style={{ border: "1.5px solid rgba(10,20,70,0.1)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {tickerData.map((t, i) => (
              <div
                key={t.lbl}
                className="pf-ticker-item flex-1 text-center py-6 px-4 min-w-[140px]"
                style={{ borderRight: i < tickerData.length - 1 ? "1px solid rgba(10,20,70,0.08)" : "none" }}
              >
                <div
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: "#0a1446", lineHeight: 1, marginBottom: "6px" }}
                >
                  {t.val}
                </div>
                <div className="uppercase" style={{ fontSize: "9.5px", fontWeight: 600, letterSpacing: "2px", color: "rgba(10,20,70,0.35)" }}>
                  {t.lbl}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="w-full mb-12" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10,20,70,0.12), transparent)" }} />
            <p className="uppercase mb-6" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "rgba(10,20,70,0.32)" }}>
              Ready to be our next success story?
            </p>
            <a
              href="#contact"
              className="pf-cta-btn inline-flex items-center gap-3 uppercase"
              style={{ padding: "17px 46px", background: "#0a1446", color: "#D4AA50", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textDecoration: "none" }}
            >
              Start Your Project
              <FiArrowRight style={{ width: "15px", height: "15px", flexShrink: 0 }} />
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}