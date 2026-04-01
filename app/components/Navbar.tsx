"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home",          href: "#home" },
  { name: "Services",      href: "#services" },
  { name: "Portfolio",     href: "#portfolio" },
  { name: "Why Choose Us", href: "#why-choose-us" },
  { name: "Testimonials",  href: "#testimonials" },
  { name: "Process",       href: "#process" },
  { name: "Contact",       href: "#contact" },
];

const socialLinks = [
  {
    key: "IG",
    label: "Instagram",
    href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    key: "FB",
    label: "Facebook",
    href: "https://www.facebook.com/share/1DfyQyHnF3/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    key: "WA",
    label: "WhatsApp",
    href: "https://wa.me/918572895525",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [mounted,    setMounted]    = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes zvNavSlide {
          from { opacity:0; transform:translateY(-100%); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes zvBlinkDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.2; transform:scale(0.6); }
        }
        @keyframes zvOverlayIn {
          from { opacity:0; transform:translateX(100%); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes zvFadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes zvGoldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .zv2 { font-family:'DM Sans',sans-serif; }

        /* ── NAV WRAPPER ── */
        .zv2-nav {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(201,168,76,0.15), 0 2px 20px rgba(11,26,51,0.06);
          transition: box-shadow .3s, background .3s;
        }
        .zv2-nav.scrolled {
          background: rgba(255,255,255,0.99);
          box-shadow: 0 1px 0 rgba(201,168,76,0.22), 0 6px 36px rgba(11,26,51,0.11);
        }

        /* top gold shimmer line */
        .zv2-goldline {
          height: 3px;
          background: linear-gradient(
            90deg,
            #7a5a10 0%, #C9A84C 20%, #F0D878 40%,
            #fff8dc 50%, #F0D878 60%, #C9A84C 80%, #7a5a10 100%
          );
          background-size: 200% auto;
          animation: zvGoldShimmer 4s linear infinite;
        }

        /* scroll progress bar */
        .zv2-progress {
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #F0D878, #C9A84C);
          transform-origin: left;
          transition: width 0.1s linear;
        }

        /* main bar */
        .zv2-bar {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: height .3s;
        }
        .zv2-nav.scrolled .zv2-bar { height: 60px; }

        /* bottom gold rule */
        .zv2-borderbottom {
          height: 1px;
          background: linear-gradient(90deg,
            transparent, rgba(201,168,76,0.2) 30%,
            rgba(201,168,76,0.2) 70%, transparent);
        }

        /* ── LOGO ── */
        .zv2-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .zv2-logobox {
          width: 42px; height: 42px;
          border: 1.5px solid rgba(201,168,76,0.25);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          transition: border-color .25s, box-shadow .25s, transform .25s;
        }
        .zv2-logo:hover .zv2-logobox {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
          transform: scale(1.04);
        }
        .zv2-logoname {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: .22em;
          color: #0B1A33;
          line-height: 1;
          display: block;
          transition: letter-spacing .3s;
        }
        .zv2-logo:hover .zv2-logoname { letter-spacing: .26em; }
        .zv2-logosub {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 7.5px;
          font-weight: 600;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          margin-top: 4px;
        }
        .zv2-logosub::before {
          content: '';
          display: block;
          width: 18px; height: 1px;
          background: #C9A84C;
          flex-shrink: 0;
        }

        /* ── DESKTOP LINKS ── */
        .zv2-links {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
          gap: 2px;
          height: 100%;
        }
        .zv2-link {
          position: relative;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: .10em;
          text-transform: uppercase;
          color: rgba(11,26,51,0.45);
          text-decoration: none;
          padding: 8px 13px;
          white-space: nowrap;
          transition: color .2s;
          border-radius: 2px;
        }
        /* underline sweep */
        .zv2-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 13px;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #7a5a10, #F0D878, #7a5a10);
          transition: width .32s cubic-bezier(.22,1,.36,1);
          border-radius: 2px;
        }
        /* hover bg pill */
        .zv2-link::before {
          content: '';
          position: absolute;
          inset: 2px 0;
          background: rgba(201,168,76,0);
          transition: background .2s;
          border-radius: 3px;
        }
        .zv2-link:hover::before { background: rgba(201,168,76,0.06); }
        .zv2-link:hover { color: #0B1A33; }
        .zv2-link:hover::after,
        .zv2-link.on::after { width: calc(100% - 26px); }
        .zv2-link.on { color: #0B1A33; font-weight: 700; }
        .zv2-link.on::before { background: rgba(201,168,76,0.08); }

        .zv2-dot {
          display: inline-block;
          width: 3px; height: 3px;
          background: #C9A84C;
          border-radius: 50%;
          margin-left: 5px;
          vertical-align: middle;
          animation: zvBlinkDot 1.8s ease-in-out infinite;
        }
        .zv2-navsep {
          width: 1px; height: 14px;
          background: rgba(11,26,51,0.07);
          margin: 0 4px;
          flex-shrink: 0;
        }

        /* ── RIGHT ACTIONS ── */
        .zv2-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* phone pill — desktop */
        .zv2-phonepill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px 7px 10px;
          border: 1.5px solid rgba(201,168,76,0.22);
          background: rgba(201,168,76,0.04);
          text-decoration: none;
          font-size: 11px;
          font-weight: 600;
          color: rgba(11,26,51,0.6);
          letter-spacing: .04em;
          transition: border-color .2s, background .2s, color .2s, transform .18s;
          white-space: nowrap;
        }
        .zv2-phonepill:hover {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.08);
          color: #0B1A33;
          transform: translateY(-1px);
        }
        .zv2-phonepill-icon {
          width: 22px; height: 22px;
          background: #C9A84C;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .zv2-social {
          width: 30px; height: 30px;
          border: 1.5px solid rgba(201,168,76,0.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(11,26,51,0.35);
          text-decoration: none;
          transition: border-color .2s, color .2s, background .2s, transform .18s;
          flex-shrink: 0;
        }
        .zv2-social:hover {
          border-color: #C9A84C;
          color: #C9A84C;
          background: rgba(201,168,76,0.07);
          transform: translateY(-2px);
        }
        .zv2-divv {
          width: 1px; height: 28px;
          background: rgba(11,26,51,0.07);
          flex-shrink: 0;
        }

        /* CTA */
        .zv2-cta {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #ffffff;
          background: #0B1A33;
          border: 1.5px solid rgba(201,168,76,0.28);
          padding: 11px 22px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform .18s, box-shadow .22s, border-color .22s, color .22s;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
        }
        .zv2-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(130deg, #F0D878 0%, #C9A84C 55%, #8B6914 100%);
          opacity: 0;
          transition: opacity .22s;
        }
        .zv2-cta:hover::before { opacity: 1; }
        .zv2-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(11,26,51,0.16), 0 2px 8px rgba(201,168,76,0.22);
          border-color: #C9A84C;
          color: #080f1a;
        }
        .zv2-cta > * { position: relative; z-index: 1; }
        .zv2-cta-arrow {
          transition: transform .2s;
        }
        .zv2-cta:hover .zv2-cta-arrow { transform: translateX(3px); }

        /* hamburger */
        .zv2-ham {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: rgba(11,26,51,0.03);
          border: 1.5px solid rgba(11,26,51,0.09);
          cursor: pointer;
          transition: background .2s, border-color .2s;
          flex-shrink: 0;
        }
        .zv2-ham:hover {
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.32);
        }
        .zv2-ham span {
          display: block;
          height: 1.5px;
          background: #0B1A33;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }

        /* ── MOBILE OVERLAY — slides from right ── */
        .zv2-overlay {
          position: fixed;
          inset: 0;
          z-index: 49;
          display: flex;
        }
        /* backdrop */
        .zv2-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(11,26,51,0.35);
          backdrop-filter: blur(3px);
          animation: zvFadeIn .25s ease forwards;
        }
        @keyframes zvFadeIn { from{opacity:0} to{opacity:1} }

        /* drawer panel */
        .zv2-drawer {
          position: relative;
          z-index: 1;
          width: min(340px, 88vw);
          height: 100%;
          background: #ffffff;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          animation: zvOverlayIn .3s cubic-bezier(.22,1,.36,1) forwards;
          box-shadow: -8px 0 48px rgba(11,26,51,0.18);
        }

        /* drawer top strip */
        .zv2-drawer-top {
          height: 3px;
          background: linear-gradient(90deg, #7a5a10, #C9A84C, #F0D878, #C9A84C, #7a5a10);
          background-size: 200% auto;
          animation: zvGoldShimmer 4s linear infinite;
          flex-shrink: 0;
        }

        .zv2-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(11,26,51,0.06);
          flex-shrink: 0;
        }
        .zv2-drawer-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .zv2-drawer-logobox {
          width: 34px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.25);
          position: relative; overflow: hidden;
        }
        .zv2-close {
          width: 36px; height: 36px;
          background: rgba(11,26,51,0.04);
          border: 1.5px solid rgba(11,26,51,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(11,26,51,0.5);
          transition: background .2s, color .2s, border-color .2s;
          flex-shrink: 0;
        }
        .zv2-close:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.3);
          color: #0B1A33;
        }

        .zv2-drawer-body {
          flex: 1;
          padding: 8px 0 0;
          display: flex;
          flex-direction: column;
        }

        /* nav items in drawer */
        .zv2-mlink {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .10em;
          text-transform: uppercase;
          color: rgba(11,26,51,0.42);
          text-decoration: none;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(11,26,51,0.05);
          transition: color .18s, background .2s, padding-left .2s;
          position: relative;
        }
        .zv2-mlink::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: linear-gradient(90deg, #C9A84C, transparent);
          transition: width .22s;
        }
        .zv2-mlink:hover, .zv2-mlink.on {
          color: #0B1A33;
          background: rgba(201,168,76,0.04);
          padding-left: 30px;
        }
        .zv2-mlink:hover::before, .zv2-mlink.on::before { width: 3px; }
        .zv2-mnum {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          color: rgba(201,168,76,0.4);
          width: 20px;
          flex-shrink: 0;
        }

        /* drawer contact section */
        .zv2-drawer-contact {
          margin: 16px 16px 0;
          padding: 18px 20px;
          border: 1.5px solid rgba(201,168,76,0.14);
          background: rgba(11,26,51,0.015);
        }
        .zv2-mob-ctitle {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.55);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .zv2-mob-ctitle::before {
          content: '';
          width: 16px; height: 1px;
          background: #C9A84C;
        }
        .zv2-mob-clink {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(11,26,51,0.55);
          text-decoration: none;
          padding: 9px 0;
          border-bottom: 1px solid rgba(11,26,51,0.05);
          transition: color .2s;
        }
        .zv2-mob-clink:last-child { border-bottom: none; }
        .zv2-mob-clink:hover { color: #0B1A33; }
        .zv2-mob-icon {
          width: 28px; height: 28px;
          border: 1.5px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #C9A84C;
          flex-shrink: 0;
          transition: background .2s, border-color .2s;
        }
        .zv2-mob-clink:hover .zv2-mob-icon {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.35);
        }

        /* drawer footer */
        .zv2-drawer-footer {
          padding: 16px 16px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .zv2-mob-socials {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(11,26,51,0.06);
        }
        .zv2-mob-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 11px;
          color: rgba(201,168,76,0.38);
          letter-spacing: .06em;
        }
        .zv2-mob-socialrow { display: flex; gap: 6px; }

        /* ── RESPONSIVE ── */
        @media (min-width: 1024px) {
          .zv2-links        { display: flex !important; }
          .zv2-ham          { display: none  !important; }
          .zv2-desksocials  { display: flex  !important; }
          .zv2-divv         { display: block !important; }
          .zv2-deskcta      { display: inline-flex !important; }
          .zv2-deskphone    { display: inline-flex !important; }
        }
        @media (max-width: 1023px) {
          .zv2-links        { display: none  !important; }
          .zv2-ham          { display: flex  !important; }
          .zv2-desksocials  { display: none  !important; }
          .zv2-divv         { display: none  !important; }
          .zv2-deskcta      { display: none  !important; }
          .zv2-deskphone    { display: none  !important; }
        }
        @media (max-width: 600px) {
          .zv2-bar          { padding: 0 16px; }
          .zv2-logoname     { font-size: 19px; letter-spacing: .18em; }
        }
        @media (max-width: 380px) {
          .zv2-logoname     { font-size: 17px; }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`zv2 zv2-nav fixed top-0 left-0 right-0 z-50${scrolled ? " scrolled" : ""}`}
        style={{
          opacity: mounted ? 1 : 0,
          animation: mounted ? "zvNavSlide .55s cubic-bezier(.22,1,.36,1) forwards" : "none",
        }}
      >
        {/* SHIMMER GOLD LINE */}
        <div className="zv2-goldline" />

        {/* SCROLL PROGRESS */}
        <div className="zv2-progress" style={{ width: `${scrollPct}%` }} />

        {/* MAIN BAR */}
        <div className="zv2-bar">

          {/* LOGO */}
          <a href="#home" className="zv2-logo" onClick={() => setActiveLink("Home")}>
            <div className="zv2-logobox">
              <Image src="/logo.png" alt="Zelvix Estates" fill style={{ objectFit: "cover" }} priority />
            </div>
            <div>
              <span className="zv2-logoname">ZELVIX</span>
              <div className="zv2-logosub">Real Estate</div>
            </div>
          </a>

          {/* DESKTOP LINKS */}
          <div className="zv2-links">
            {navLinks.map((link, i) => (
              <div key={link.name} style={{ display: "flex", alignItems: "center" }}>
                <a
                  href={link.href}
                  className={`zv2-link${activeLink === link.name ? " on" : ""}`}
                  onClick={() => { setActiveLink(link.name); setMobileOpen(false); }}
                >
                  {link.name}
                  {activeLink === link.name && <span className="zv2-dot" />}
                </a>
                {(i === 2 || i === 5) && <div className="zv2-navsep" />}
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="zv2-actions">

            {/* Phone pill — desktop */}
            <a
              href="tel:+918572895525"
              className="zv2-phonepill zv2-deskphone"
              style={{ display: "none" }}
            >
              <span className="zv2-phonepill-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11.5 19.79 19.79 0 01.43 2.84 2 2 0 012.41 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.43a16 16 0 006.29 6.29l.79-.79a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              +91 85728 95525
            </a>

            {/* Social icons — desktop only */}
            <div className="zv2-desksocials" style={{ display: "none", gap: "6px" }}>
              {socialLinks.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="zv2-social" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="zv2-divv" />

            {/* CTA — desktop only */}
            <a
              href="#contact"
              className="zv2-cta zv2-deskcta"
              style={{ display: "none" }}
              onClick={() => setActiveLink("Contact")}
            >
              <span>Get a Quote</span>
              <svg className="zv2-cta-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="zv2-ham"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle navigation"
            >
              <span style={{ width:"20px", transform: mobileOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
              <span style={{ width:"13px", opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0)" : "none" }} />
              <span style={{ width:"20px", transform: mobileOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* BOTTOM BORDER */}
        <div className="zv2-borderbottom" />
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="zv2 zv2-overlay" style={{ zIndex: 49 }}>
          {/* backdrop */}
          <div className="zv2-backdrop" onClick={() => setMobileOpen(false)} />

          {/* drawer */}
          <div className="zv2-drawer">
            <div className="zv2-drawer-top" />

            {/* header */}
            <div className="zv2-drawer-header">
              <a href="#home" className="zv2-drawer-logo" onClick={() => { setActiveLink("Home"); setMobileOpen(false); }}>
                <div className="zv2-drawer-logobox">
                  <Image src="/logo.png" alt="Zelvix" fill style={{ objectFit:"cover" }} />
                </div>
                <div>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"17px", letterSpacing:".2em", color:"#0B1A33", display:"block", lineHeight:1 }}>ZELVIX</span>
                  <span style={{ fontSize:"7px", letterSpacing:".25em", color:"rgba(201,168,76,0.6)", textTransform:"uppercase", fontWeight:600, marginTop:"3px", display:"block" }}>Real Estate</span>
                </div>
              </a>
              <button className="zv2-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="zv2-drawer-body">
              {/* nav links */}
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`zv2-mlink${activeLink === link.name ? " on" : ""}`}
                  onClick={() => { setActiveLink(link.name); setMobileOpen(false); }}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <span className="zv2-mnum">0{i + 1}</span>
                  {link.name}
                  {activeLink === link.name && (
                    <span style={{ marginLeft:"auto", width:"4px", height:"4px", background:"#C9A84C", borderRadius:"50%", flexShrink:0 }} />
                  )}
                </a>
              ))}

              {/* CTA */}
              <div style={{ padding:"16px 16px 0" }}>
                <a
                  href="#contact"
                  className="zv2-cta"
                  style={{ width:"100%", justifyContent:"center" }}
                  onClick={() => { setActiveLink("Contact"); setMobileOpen(false); }}
                >
                  <span>Get a Quote</span>
                  <svg className="zv2-cta-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              {/* contact block */}
              <div className="zv2-drawer-contact">
                <div className="zv2-mob-ctitle">Contact Us</div>

                <a href="tel:+918572895525" className="zv2-mob-clink">
                  <div className="zv2-mob-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11.5 19.79 19.79 0 01.43 2.84 2 2 0 012.41 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.43a16 16 0 006.29 6.29l.79-.79a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  +91 85728 95525
                </a>

                <a href="tel:+918398095525" className="zv2-mob-clink">
                  <div className="zv2-mob-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11.5 19.79 19.79 0 01.43 2.84 2 2 0 012.41 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.43a16 16 0 006.29 6.29l.79-.79a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  +91 83980 95525
                </a>

                <a href="https://wa.me/918572895525" target="_blank" rel="noopener noreferrer" className="zv2-mob-clink">
                  <div className="zv2-mob-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                    </svg>
                  </div>
                  WhatsApp: +91 85728 95525
                </a>
              </div>
            </div>

            {/* drawer footer */}
            <div className="zv2-drawer-footer">
              <div className="zv2-mob-socials">
                <span className="zv2-mob-tagline">Excellence in Every Property</span>
                <div className="zv2-mob-socialrow">
                  {socialLinks.map((s) => (
                    <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="zv2-social" title={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "78px" }} />
    </>
  );
}