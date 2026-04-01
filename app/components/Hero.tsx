"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { number: "500+",  label: "Happy Clients",    icon: "👥" },
  { number: "10K+",  label: "Leads Generated",  icon: "📈" },
  { number: "98%",   label: "Success Rate",     icon: "🏆" },
];

const marqueeItems = [
  "SEO Optimization", "Lead Generation", "Social Media Marketing",
  "PPC Campaigns", "Brand Identity", "Property Listings",
  "Email Marketing", "Video Production",
];

export default function Hero() {
  const [mounted,  setMounted]  = useState(false);
  const [count,    setCount]    = useState([0, 0, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt,     setTilt]     = useState({ x: 0, y: 0 });
  const heroRef  = useRef<HTMLElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  /* parallax on hero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const fn = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - r.left) / r.width  - 0.5) * 20,
        y: ((e.clientY - r.top)  / r.height - 0.5) * 12,
      });
    };
    el.addEventListener("mousemove", fn);
    return () => el.removeEventListener("mousemove", fn);
  }, []);

  /* 3D tilt on card */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const fn = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      setTilt({ x, y });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    card.addEventListener("mousemove", fn);
    card.addEventListener("mouseleave", reset);
    return () => { card.removeEventListener("mousemove", fn); card.removeEventListener("mouseleave", reset); };
  }, [mounted]);

  /* count-up */
  useEffect(() => {
    if (!mounted) return;
    const targets = [500, 10000, 98];
    const dur = 2000, steps = 70;
    let step = 0;
    const t = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setCount(targets.map(v => Math.round(v * ease)));
      if (step >= steps) clearInterval(t);
    }, dur / steps);
    return () => clearInterval(t);
  }, [mounted]);

  const displayCount = [
    `${count[0]}+`,
    count[1] >= 1000 ? `${(count[1] / 1000).toFixed(count[1] < 10000 ? 1 : 0)}K+` : `${count[1]}+`,
    `${count[2]}%`,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── KEYFRAMES ── */
        @keyframes hvFadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hvFadeLeft { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hvGoldFlow {
          0%  {background-position:-400% center}
          100%{background-position: 400% center}
        }
        @keyframes hvScan     { 0%{top:-2px} 100%{top:102%} }
        @keyframes hvRotateCW { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes hvRotateCCW{ from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes hvFloat    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        @keyframes hvFloatB   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-16px)} }
        @keyframes hvPulseGold{ 0%{box-shadow:0 0 0 0 rgba(201,168,76,.5)} 70%{box-shadow:0 0 0 16px rgba(201,168,76,0)} 100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} }
        @keyframes hvMarq     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes hvDotBlink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes hvShimmer  { 0%{left:-100%} 100%{left:200%} }
        @keyframes hvGridFade { 0%,100%{opacity:.04} 50%{opacity:.09} }
        @keyframes hvBadgePop { 0%{transform:scale(.8);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes hvOrb1     { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(30px,-20px) scale(1.12)} }
        @keyframes hvOrb2     { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(-20px,25px) scale(1.08)} }

        /* ── STAGGER UTILS ── */
        .hv-fu1{animation:hvFadeUp .7s .05s cubic-bezier(.22,1,.36,1) both}
        .hv-fu2{animation:hvFadeUp .7s .18s cubic-bezier(.22,1,.36,1) both}
        .hv-fu3{animation:hvFadeUp .7s .30s cubic-bezier(.22,1,.36,1) both}
        .hv-fu4{animation:hvFadeUp .7s .42s cubic-bezier(.22,1,.36,1) both}
        .hv-fu5{animation:hvFadeUp .7s .54s cubic-bezier(.22,1,.36,1) both}
        .hv-fu6{animation:hvFadeUp .7s .66s cubic-bezier(.22,1,.36,1) both}
        .hv-fl1{animation:hvFadeLeft .85s .28s cubic-bezier(.22,1,.36,1) both}

        /* ── GOLD TEXT ── */
        .hv-gold{
          background:linear-gradient(100deg,
            #7a5a10 0%,#C9A84C 20%,#F0D878 38%,
            #0B1A33 50%,#F0D878 62%,#C9A84C 80%,#7a5a10 100%);
          background-size:400% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:hvGoldFlow 5s linear infinite;
        }

        /* ── BUTTONS ── */
        .hv-btn-pri{
          position:relative;
          display:inline-flex;align-items:center;gap:10px;overflow:hidden;
          background:#0B1A33;
          color:#fff;
          font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;
          padding:14px 30px;text-decoration:none;
          border:1.5px solid rgba(201,168,76,.35);
          transition:transform .18s,box-shadow .22s,color .2s;
          animation:hvPulseGold 2.8s ease-out infinite;
        }
        .hv-btn-pri::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(130deg,#F0D878 0%,#C9A84C 55%,#8B6914 100%);
          opacity:0;transition:opacity .22s;
        }
        .hv-btn-pri:hover::before{opacity:1}
        .hv-btn-pri:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(201,168,76,.28);color:#080f1e}
        .hv-btn-pri > *{position:relative;z-index:1}

        /* shimmer on pri btn */
        .hv-btn-pri::after{
          content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          animation:hvShimmer 3.5s ease-in-out infinite;
        }

        .hv-btn-sec{
          display:inline-flex;align-items:center;gap:10px;
          background:transparent;
          color:rgba(11,26,51,.65);
          font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;
          padding:13px 28px;text-decoration:none;
          border:1.5px solid rgba(11,26,51,.16);
          transition:color .2s,border-color .2s,background .2s,transform .18s;
        }
        .hv-btn-sec:hover{
          color:#0B1A33;
          border-color:rgba(201,168,76,.5);
          background:rgba(201,168,76,.06);
          transform:translateY(-2px);
        }

        /* ── STAT CARD ── */
        .hv-stat{
          position:relative;
          padding:22px 20px 18px;
          background:#fff;
          border:1.5px solid rgba(201,168,76,.15);
          overflow:hidden;
          transition:transform .25s,box-shadow .25s,border-color .25s;
          cursor:default;
        }
        .hv-stat::before{
          content:'';
          position:absolute;top:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,transparent,#C9A84C,transparent);
          transform:scaleX(0);transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .hv-stat:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(11,26,51,.10);border-color:rgba(201,168,76,.38)}
        .hv-stat:hover::before{transform:scaleX(1)}

        /* ── 3D CARD ── */
        .hv-card3d{
          transform-style:preserve-3d;
          perspective:900px;
          transition:transform .08s ease-out;
        }

        /* ── FLOATING CHIPS ── */
        .hv-chip{
          position:absolute;
          background:#fff;
          border:1.5px solid rgba(201,168,76,.28);
          padding:12px 16px;
          box-shadow:0 12px 40px rgba(11,26,51,.12);
        }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .hv-grid{grid-template-columns:1fr !important}
          .hv-right{display:none !important}
          .hv-stats{grid-template-columns:repeat(3,1fr) !important}
        }
        @media(max-width:640px){
          .hv-h1{font-size:clamp(2rem,8vw,3.4rem) !important}
          .hv-btns{flex-direction:column !important;align-items:flex-start !important}
          .hv-stats{grid-template-columns:1fr 1fr !important}
          .hv-pad{padding:100px 20px 70px !important}
        }
        @media(max-width:400px){
          .hv-stats{grid-template-columns:1fr !important}
        }
      `}</style>

      <section
        ref={heroRef}
        id="home"
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* ── BACKGROUND LAYERS ── */}

        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(11,26,51,.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: "hvGridFade 8s ease-in-out infinite",
        }} />

        {/* Soft orbs */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "600px", height: "600px",
          background: "radial-gradient(ellipse, rgba(11,26,51,.06) 0%, transparent 65%)",
          pointerEvents: "none",
          animation: "hvOrb1 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-8%",
          width: "500px", height: "500px",
          background: "radial-gradient(ellipse, rgba(201,168,76,.07) 0%, transparent 65%)",
          pointerEvents: "none",
          animation: "hvOrb2 15s ease-in-out infinite",
        }} />

        {/* Diagonal navy accent strip */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "42%", height: "100%",
          background: "linear-gradient(160deg, rgba(11,26,51,.045) 0%, rgba(11,26,51,.02) 50%, transparent 100%)",
          pointerEvents: "none",
          clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }} />

        {/* Top gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: "linear-gradient(90deg, transparent, #C9A84C 30%, #F0D878 50%, #C9A84C 70%, transparent)",
          opacity: 0.6,
        }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,.18), transparent)",
          pointerEvents: "none",
          animation: "hvScan 10s linear infinite",
          zIndex: 1,
        }} />

        {/* ── MAIN CONTENT ── */}
        <div
          className="hv-grid hv-pad"
          style={{
            maxWidth: "1380px", margin: "0 auto",
            padding: "120px 48px 80px",
            width: "100%", position: "relative", zIndex: 10,
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "64px", alignItems: "center",
          }}
        >

          {/* ════ LEFT COLUMN ════ */}
          <div>

            {/* Badge */}
            <div className="hv-fu1" style={{ marginBottom: "28px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(11,26,51,.04)",
                border: "1.5px solid rgba(201,168,76,.28)",
                padding: "9px 18px",
                animation: "hvBadgePop .6s .05s cubic-bezier(.22,1,.36,1) both",
              }}>
                <span style={{ fontSize: "8px", color: "#C9A84C" }}>◆</span>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "10.5px", fontWeight: 700,
                  letterSpacing: ".18em", textTransform: "uppercase",
                  color: "rgba(11,26,51,.65)",
                }}>
                  #1 Real Estate Digital Agency
                </span>
                <span style={{ fontSize: "8px", color: "#C9A84C" }}>◆</span>
              </div>
            </div>

            {/* H1 */}
            <div className="hv-fu2" style={{ marginBottom: "20px" }}>
              <h1
                className="hv-h1"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(2.6rem,4.8vw,5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  color: "#0B1A33", margin: 0,
                  letterSpacing: "-.01em",
                }}
              >
                Transform Your{" "}
                <span className="hv-gold">Real Estate</span>
                <br />Business Online
              </h1>
            </div>

            {/* Gold divider */}
            <div className="hv-fu2" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
              <div style={{ width: "40px", height: "2.5px", background: "#C9A84C", flexShrink: 0 }} />
              <div style={{ width: "7px", height: "7px", background: "#C9A84C", transform: "rotate(45deg)", flexShrink: 0 }} />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,rgba(201,168,76,.45),transparent)" }} />
            </div>

            {/* Para */}
            <p className="hv-fu3" style={{
              fontSize: "15px", lineHeight: 1.8,
              color: "rgba(11,26,51,.55)",
              marginBottom: "38px", maxWidth: "480px",
            }}>
              We help real estate agents, developers, and property dealers get more leads,
              sales, and visibility through cutting-edge digital marketing strategies.
            </p>

            {/* Buttons */}
            <div className="hv-fu4 hv-btns" style={{ display: "flex", gap: "14px", marginBottom: "52px", flexWrap: "wrap" }}>
              <a href="#contact" className="hv-btn-pri">
                <span>Get Free Consultation</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#portfolio" className="hv-btn-sec">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                View Our Work
              </a>
            </div>

            {/* Trust badges row */}
            <div className="hv-fu4" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "44px", flexWrap: "wrap" }}>
              {["Google Partner", "Meta Certified", "ISO Verified"].map((badge) => (
                <div key={badge} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 12px",
                  background: "rgba(11,26,51,.03)",
                  border: "1px solid rgba(201,168,76,.18)",
                }}>
                  <div style={{ width: "5px", height: "5px", background: "#C9A84C", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9.5px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(11,26,51,.5)" }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className="hv-fu5 hv-stats"
              style={{
                display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                gap: "12px",
                borderTop: "1.5px solid rgba(11,26,51,.07)",
                paddingTop: "32px",
              }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="hv-stat">
                  {/* corner accent */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: "18px", height: "18px", borderTop: "2px solid rgba(201,168,76,.35)", borderRight: "2px solid rgba(201,168,76,.35)" }} />
                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "34px", fontWeight: 700, lineHeight: 1,
                    marginBottom: "5px",
                    background: "linear-gradient(135deg,#0B1A33,#1a3a6e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {displayCount[i]}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "9.5px", fontWeight: 600,
                    letterSpacing: ".1em", textTransform: "uppercase",
                    color: "rgba(11,26,51,.4)",
                    marginBottom: "10px",
                  }}>
                    {s.label}
                  </div>
                  <div style={{ width: "22px", height: "2px", background: "#C9A84C" }} />
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT COLUMN — 3D CARD ════ */}
          <div
            ref={cardRef}
            className="hv-right hv-fl1 hv-card3d"
            style={{
              position: "relative", height: "580px",
              transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: "transform .12s ease-out",
            }}
          >
            {/* Parallax wrapper */}
            <div style={{
              position: "absolute", inset: 0,
              transform: `translate(${mousePos.x * .3}px, ${mousePos.y * .22}px)`,
              transition: "transform .12s ease-out",
            }}>

              {/* MAIN PANEL */}
              <div style={{
                position: "absolute", inset: 0,
                background: "#ffffff",
                border: "1.5px solid rgba(11,26,51,.1)",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(11,26,51,.12), 0 4px 16px rgba(201,168,76,.08)",
              }}>

                {/* Top navy header strip */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "56px",
                  background: "linear-gradient(135deg, #0B1A33 0%, #132240 100%)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0 20px",
                }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["#FF6B6B","#FFD93D","#6BCB77"].map((c, i) => (
                      <div key={i} style={{ width: "8px", height: "8px", background: c, opacity: .7 }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>
                    ZELVIX DASHBOARD
                  </span>
                  <div style={{ width: "6px", height: "6px", background: "#4ade80", animation: "hvDotBlink 2s ease-in-out infinite" }} />
                </div>

                {/* Inner dot grid */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(rgba(11,26,51,.04) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }} />

                {/* Rotating rings */}
                <div style={{
                  position: "absolute", top: "52%", left: "50%",
                  width: "300px", height: "300px",
                  border: "1px solid transparent",
                  borderTop: "1.5px solid rgba(201,168,76,.5)",
                  borderRight: "1px solid rgba(201,168,76,.18)",
                  borderRadius: "50%",
                  animation: "hvRotateCW 12s linear infinite",
                }} />
                <div style={{
                  position: "absolute", top: "52%", left: "50%",
                  width: "390px", height: "390px",
                  border: "1px solid transparent",
                  borderBottom: "1.5px solid rgba(11,26,51,.15)",
                  borderLeft: "1px solid rgba(11,26,51,.08)",
                  borderRadius: "50%",
                  animation: "hvRotateCCW 18s linear infinite",
                }} />

                {/* Gold corner brackets */}
                {[
                  { top: "64px", left: "12px",   borderTop:    "2px solid #C9A84C", borderLeft:   "2px solid #C9A84C" },
                  { top: "64px", right: "12px",   borderTop:    "2px solid #C9A84C", borderRight:  "2px solid #C9A84C" },
                  { bottom: "12px", left: "12px", borderBottom: "2px solid #C9A84C", borderLeft:   "2px solid #C9A84C" },
                  { bottom: "12px", right: "12px",borderBottom: "2px solid #C9A84C", borderRight:  "2px solid #C9A84C" },
                ].map((st, i) => (
                  <div key={i} style={{ position: "absolute", width: 28, height: 28, ...st }} />
                ))}

                {/* Center content */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "18px", paddingTop: "56px",
                }}>
                  <div style={{
                    position: "relative", width: "88px", height: "88px",
                    border: "2px solid rgba(201,168,76,.4)",
                    overflow: "hidden",
                    boxShadow: "0 0 32px rgba(201,168,76,.12)",
                    animation: "hvFloat 5s ease-in-out infinite",
                  }}>
                    <Image src="/logo.png" alt="Zelvix" fill style={{ objectFit: "cover" }} priority />
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      className="hv-gold"
                      style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "38px", fontWeight: 700, letterSpacing: ".14em" }}
                    >
                      ZELVIX
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "9px", fontWeight: 600,
                      letterSpacing: ".28em", textTransform: "uppercase",
                      color: "rgba(11,26,51,.38)", marginTop: "4px",
                    }}>
                      Real Estate Marketing
                    </div>
                  </div>

                  {/* Mini metric bars */}
                  <div style={{ width: "72%", display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                    {[
                      { label: "Lead Quality",  pct: 92, color: "#C9A84C" },
                      { label: "ROI Delivered", pct: 87, color: "#0B1A33" },
                      { label: "Client Growth", pct: 95, color: "#C9A84C" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8.5px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(11,26,51,.4)" }}>{m.label}</span>
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", fontWeight: 700, color: m.color }}>{m.pct}%</span>
                        </div>
                        <div style={{ height: "3px", background: "rgba(11,26,51,.08)", position: "relative" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${m.pct}%`, background: m.color, transition: "width 1.5s cubic-bezier(.22,1,.36,1)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── FLOATING CHIPS ── */}
              <div className="hv-chip" style={{ top: "8%", left: "-14%", animation: "hvFloat 6s 1s ease-in-out infinite", minWidth: "136px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "6px", height: "6px", background: "#4ade80", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(11,26,51,.4)" }}>Live Leads</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", fontWeight: 700, color: "#0B1A33", lineHeight: 1 }}>247</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", color: "rgba(11,26,51,.3)", marginTop: "4px" }}>This Month</div>
              </div>

              <div className="hv-chip" style={{ bottom: "10%", right: "-12%", animation: "hvFloatB 7s 2s ease-in-out infinite", minWidth: "148px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "6px", height: "6px", background: "#C9A84C", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(11,26,51,.4)" }}>Success Rate</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", fontWeight: 700, color: "#0B1A33", lineHeight: 1 }}>98%</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", color: "rgba(11,26,51,.3)", marginTop: "4px" }}>Client Satisfaction</div>
              </div>

              <div style={{
                position: "absolute", top: "2%", right: "4%",
                background: "#0B1A33",
                border: "1.5px solid rgba(201,168,76,.35)",
                padding: "8px 14px",
                animation: "hvFloat 5s .5s ease-in-out infinite",
                boxShadow: "0 8px 24px rgba(11,26,51,.18)",
              }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9.5px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#C9A84C" }}>🏆 #1 Agency</span>
              </div>

            </div>
          </div>
        </div>

        {/* ── BOTTOM MARQUEE ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "40px",
          background: "#0B1A33",
          borderTop: "2px solid rgba(201,168,76,.2)",
          overflow: "hidden",
          display: "flex", alignItems: "center",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", animation: "hvMarq 22s linear infinite", whiteSpace: "nowrap" }}>
            {[...Array(2)].map((_, si) => (
              <div key={si} style={{ display: "flex", flexShrink: 0 }}>
                {marqueeItems.map((item, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: "18px",
                    padding: "0 22px",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "9px", fontWeight: 700,
                    letterSpacing: ".2em", textTransform: "uppercase",
                    color: "rgba(201,168,76,.55)",
                  }}>
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