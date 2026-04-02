"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  FiFacebook,
  FiInstagram,
  FiPhone,
  FiArrowUp,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Choose Us", href: "#why-choose-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "SEO for Real Estate",
  "Paid Advertising",
  "Email Marketing",
  "Content Marketing",
  "Video Marketing",
  "Web Design",
];

const socialLinks = [
  {
    icon: FiInstagram,
    href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==",
    label: "Instagram",
  },
  {
    icon: FiFacebook,
    href: "https://www.facebook.com/share/1DfyQyHnF3/",
    label: "Facebook",
  },
];

const contactInfo = [
  {
    icon: FiPhone,
    label: "Phone / WhatsApp",
    lines: ["+91 85728 95525", "+91 83980 95525"],
    href: "tel:+918572895525",
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    lines: ["@zelvixestates"],
    href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==",
  },
  {
    icon: FiFacebook,
    label: "Facebook",
    lines: ["Zelvix Estates"],
    href: "https://www.facebook.com/share/1DfyQyHnF3/",
  },
];

/* ─── Tokens ────────────────────────────────────────────────────────────────── */
const NAVY = "#0d1f4c";
const GOLD = "#c9963b";
const GOLDL = "#e5b55a";
const WHITE = "#ffffff";

/* ─── Animation variants ────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.11,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Global styles ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        /* ── Reset & base ── */
        .zf * { box-sizing: border-box; }
        .zf { font-family: 'DM Sans', sans-serif; width: 100%; position: relative; overflow: hidden; background: ${WHITE}; }

        /* ── Background accent panel ── */
        .zf-panel {
          position: absolute;
          top: 0; right: 0;
          width: 34%;
          height: 100%;
          background: linear-gradient(155deg, ${NAVY} 0%, #162757 100%);
          clip-path: polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%);
          pointer-events: none;
          z-index: 0;
        }
        .zf-panel-seam {
          position: absolute;
          top: 0; right: calc(34% - 1.5px);
          width: 1.5px; height: 100%;
          background: linear-gradient(180deg, transparent, ${GOLD} 20%, ${GOLDL} 50%, ${GOLD} 80%, transparent);
          pointer-events: none; z-index: 1;
        }
        .zf-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(13,31,76,.05) 1.5px, transparent 1.5px);
          background-size: 26px 26px;
          pointer-events: none; z-index: 0;
        }
        .zf-glow {
          position: absolute; bottom: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(201,150,59,.08) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none; z-index: 0;
        }

        /* ── Top gold rule ── */
        .zf-rule {
          width: 100%; height: 3px;
          background: linear-gradient(90deg, transparent, ${GOLD} 25%, ${GOLDL} 50%, ${GOLD} 75%, transparent);
          position: relative; z-index: 2;
        }

        /* ── Scroll-to-top ── */
        .zf-scroll-wrap {
          position: relative; z-index: 10;
          display: flex; justify-content: flex-end;
          padding: 0 clamp(16px, 4vw, 40px);
        }
        .zf-scroll-btn {
          width: 44px; height: 44px;
          margin-top: 16px;
          background: ${NAVY};
          border: 2px solid ${GOLD};
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: ${GOLD}; font-size: 16px;
          cursor: pointer; transition: box-shadow .25s, transform .25s;
        }
        .zf-scroll-btn:hover { box-shadow: 0 8px 24px rgba(201,150,59,.35); transform: translateY(-4px); }

        /* ── Inner container ── */
        .zf-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          padding: 52px clamp(16px, 5vw, 48px) 0;
        }

        /* ── 4-col grid (default → desktop) ── */
        .zf-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr 1fr;
          gap: clamp(24px, 3vw, 48px);
          align-items: start;
        }

        /* ── Column headings ── */
        .zf-col-title {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: ${NAVY};
          margin: 0 0 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(13,31,76,.1);
        }

        /* ── Brand ── */
        .zf-brand-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .zf-brand-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 700; letter-spacing: 3px; color: ${NAVY}; line-height: 1; display: block; }
        .zf-brand-sub  { font-size: 9px; letter-spacing: 3px; color: ${GOLD}; font-weight: 600; text-transform: uppercase; margin-top: 3px; display: block; }
        .zf-brand-copy { color: rgba(13,31,76,.5); font-size: 13px; line-height: 1.8; font-weight: 300; max-width: 260px; margin: 0 0 22px; }
        .zf-socials { display: flex; gap: 8px; flex-wrap: wrap; }
        .zf-social-btn {
          width: 36px; height: 36px;
          background: rgba(13,31,76,.05);
          border: 1px solid rgba(13,31,76,.1);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(13,31,76,.45); font-size: 14px;
          text-decoration: none;
          transition: background .25s, border-color .25s, color .25s, transform .2s;
        }
        .zf-social-btn:hover { background: ${NAVY}; border-color: ${NAVY}; color: ${WHITE}; transform: translateY(-2px); }

        /* ── Nav links ── */
        .zf-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .zf-list-link {
          display: flex; align-items: center; gap: 8px;
          color: rgba(13,31,76,.45); font-size: 13px;
          text-decoration: none;
          transition: color .2s, gap .2s;
        }
        .zf-list-link:hover { color: ${GOLD}; gap: 11px; }
        .zf-dot {
          width: 4px; height: 4px; border-radius: 1px;
          background: ${GOLD}; flex-shrink: 0;
          transition: background .2s;
        }
        .zf-list-link:hover .zf-dot { background: ${GOLDL}; }

        /* ── Contact items ── */
        .zf-contact-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .zf-contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          text-decoration: none;
          transition: opacity .2s;
        }
        .zf-contact-item:hover { opacity: .78; }
        .zf-contact-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: rgba(13,31,76,.05);
          border: 1px solid rgba(13,31,76,.1);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
        .zf-contact-text { display: flex; flex-direction: column; gap: 2px; padding-top: 2px; }
        .zf-contact-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(13,31,76,.3); font-weight: 600; }
        .zf-contact-value { font-size: 13px; color: rgba(13,31,76,.55); font-weight: 300; line-height: 1.55; }

        /* ── CTA button ── */
        .zf-cta-wrap { margin-top: 24px; }
        .zf-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%;
          padding: 13px 24px;
          background: ${NAVY};
          color: ${WHITE};
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          position: relative; overflow: hidden;
          transition: transform .22s, box-shadow .3s;
        }
        .zf-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, ${GOLD}, ${GOLDL});
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          z-index: 0;
        }
        .zf-cta:hover::after { transform: scaleX(1); }
        .zf-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,150,59,.3); }
        .zf-cta span { position: relative; z-index: 1; }

        /* ── Divider ── */
        .zf-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(13,31,76,.12) 20%, rgba(13,31,76,.12) 80%, transparent);
          margin: 48px 0 0;
        }

        /* ── Bottom bar ── */
        .zf-bottom {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          padding: 20px 0 32px;
        }
        .zf-bottom-copy { color: rgba(13,31,76,.35); font-size: 12px; letter-spacing: .4px; margin: 0; }
        .zf-bottom-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .zf-bottom-link { color: rgba(13,31,76,.3); font-size: 12px; text-decoration: none; transition: color .2s; }
        .zf-bottom-link:hover { color: ${GOLD}; }

        /* ════════════════════════════════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           ════════════════════════════════════════════════════════════════════ */

        /* ── Large tablet (1024 ↓ 768) — 2+2 grid ── */
        @media (max-width: 1023px) {
          .zf-panel { width: 0; clip-path: none; display: none; }
          .zf-panel-seam { display: none; }
          .zf-glow { left: -80px; }

          .zf-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px 32px;
          }
          .zf-brand-col { grid-column: 1 / -1; }
          .zf-brand-copy { max-width: 460px; }

          .zf-inner { padding-top: 44px; }
        }

        /* ── Small tablet / large mobile (max 767) — single column ── */
        @media (max-width: 767px) {
          .zf-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .zf-brand-col { grid-column: 1; }
          .zf-brand-copy { max-width: 100%; }

          .zf-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
          }
          .zf-bottom-links { justify-content: center; }

          .zf-scroll-wrap { justify-content: center; padding: 0; }
          .zf-scroll-btn { margin-top: -22px; }

          .zf-inner { padding-top: 36px; }
        }

        /* ── Mobile (max 480) ── */
        @media (max-width: 480px) {
          .zf-social-btn { width: 32px; height: 32px; font-size: 13px; }
          .zf-brand-name { font-size: 20px; }
          .zf-list-link, .zf-contact-value { font-size: 12.5px; }
          .zf-col-title { font-size: 9.5px; }
          .zf-bottom-copy, .zf-bottom-link { font-size: 11.5px; }
          .zf-cta { font-size: 10.5px; padding: 12px 20px; }
          .zf-divider { margin-top: 36px; }
        }

        /* ── Very small (max 360) ── */
        @media (max-width: 360px) {
          .zf-inner { padding-left: 14px; padding-right: 14px; }
          .zf-list-link, .zf-contact-value { font-size: 12px; }
        }
      `}</style>

      {/* ── Footer root ────────────────────────────────────────────────────── */}
      <footer className="zf">
        {/* Decorative layers */}
        <div className="zf-dots" aria-hidden="true" />
        <div className="zf-panel" aria-hidden="true" />
        <div className="zf-panel-seam" aria-hidden="true" />
        <div className="zf-glow" aria-hidden="true" />

        {/* Top gold rule */}
        <div className="zf-rule" aria-hidden="true" />

        {/* Scroll-to-top */}
        <div className="zf-scroll-wrap">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="zf-scroll-btn"
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        </div>

        {/* ── Main content ── */}
        <div className="zf-inner">
          <div className="zf-grid">

            {/* ── Brand ──────────────────────────────────── */}
            <motion.div
              className="zf-brand-col"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Logo + name */}
              <div className="zf-brand-logo">
                <Image
                  src="/logo.png"
                  alt="Zelvix Logo"
                  width={46}
                  height={46}
                  style={{ objectFit: "contain", borderRadius: "6px" }}
                />
                <div>
                  <span className="zf-brand-name">ZELVIX</span>
                  <span className="zf-brand-sub">Real Estate Marketing</span>
                </div>
              </div>

              <p className="zf-brand-copy">
                The #1 digital marketing agency for real estate professionals.
                We help you generate more leads, close more sales, and dominate
                your local market online.
              </p>

              {/* Social icons */}
              <div className="zf-socials">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="zf-social-btn"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <s.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Quick Links ─────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <p className="zf-col-title">Quick Links</p>
              <ul className="zf-list">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="zf-list-link">
                      <span className="zf-dot" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Services ────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <p className="zf-col-title">Our Services</p>
              <ul className="zf-list">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" className="zf-list-link">
                      <span className="zf-dot" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Contact ─────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <p className="zf-col-title">Contact Us</p>
              <ul className="zf-contact-list">
                {contactInfo.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zf-contact-item"
                    >
                      <div className="zf-contact-icon">
                        <item.icon style={{ color: GOLD, fontSize: "14px" }} />
                      </div>
                      <div className="zf-contact-text">
                        <span className="zf-contact-label">{item.label}</span>
                        {item.lines.map((line, j) => (
                          <span key={j} className="zf-contact-value">{line}</span>
                        ))}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="zf-cta-wrap">
                <motion.a
                  href="#contact"
                  className="zf-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Free Consultation →</span>
                </motion.a>
              </div>
            </motion.div>

          </div>{/* /grid */}

          {/* ── Bottom bar ── */}
          <div className="zf-divider" aria-hidden="true" />
          <div className="zf-bottom">
            <p className="zf-bottom-copy">
              © {new Date().getFullYear()} Zelvix. All rights reserved.
            </p>
            <div className="zf-bottom-links">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="zf-bottom-link">{item}</a>
              ))}
            </div>
          </div>

        </div>{/* /inner */}
      </footer>
    </>
  );
}