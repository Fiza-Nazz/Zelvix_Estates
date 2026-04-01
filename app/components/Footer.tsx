"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiFacebook,
  FiInstagram,
  FiPhone,
  FiArrowUp,
} from "react-icons/fi";

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
  { icon: FiInstagram, href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==", label: "Instagram" },
  { icon: FiFacebook,  href: "https://www.facebook.com/share/1DfyQyHnF3/",                        label: "Facebook" },
];

const contactInfo = [
  { icon: FiPhone,      text: "+91 85728 95525",  href: "tel:+918572895525",  label: "Call / WhatsApp" },
  { icon: FiPhone,      text: "+91 83980 95525",  href: "tel:+918398095525",  label: "Call / WhatsApp" },
  { icon: FiInstagram,  text: "@zelvixestates",   href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==", label: "Instagram" },
  { icon: FiFacebook,   text: "Zelvix Estates",   href: "https://www.facebook.com/share/1DfyQyHnF3/", label: "Facebook" },
];

const NAVY  = "#0d1f4c";
const GOLD  = "#c9963b";
const GOLDL = "#e5b55a";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .zf-footer { font-family: 'DM Sans', sans-serif; }
        .zf-link { color: rgba(13,31,76,0.45); font-size:13px; text-decoration:none; display:flex; align-items:center; gap:8px; transition:color 0.2s ease; }
        .zf-link:hover { color: ${GOLD}; }
        .zf-link:hover .zf-link-dot { background: ${GOLDL}; }
        .zf-social { width:36px;height:36px;background:rgba(13,31,76,0.05);border:1px solid rgba(13,31,76,0.1);display:flex;align-items:center;justify-content:center;color:rgba(13,31,76,0.45);font-size:14px;text-decoration:none;transition:all 0.25s ease; }
        .zf-social:hover { background:${NAVY};border-color:${NAVY};color:#fff; }
        .zf-bottom-link { color:rgba(13,31,76,0.35);font-size:12px;text-decoration:none;transition:color 0.2s; }
        .zf-bottom-link:hover { color:${GOLD}; }
        .zf-cta { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:${NAVY};color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.3s; }
        .zf-cta::after { content:'';position:absolute;inset:0;background:linear-gradient(135deg,${GOLD},${GOLDL});transform:scaleX(0);transform-origin:left;transition:transform 0.35s cubic-bezier(.4,0,.2,1);z-index:0; }
        .zf-cta:hover::after { transform:scaleX(1); }
        .zf-cta:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,150,59,0.28); }
        .zf-cta span { position:relative;z-index:1; }
        .zf-contact-link { display:flex;align-items:flex-start;gap:12px;text-decoration:none;transition:opacity 0.2s; }
        .zf-contact-link:hover { opacity:0.8; }
        @media(max-width:768px){
          .zf-grid{grid-template-columns:1fr 1fr !important;}
          .zf-brand{grid-column:1/-1 !important;}
          .zf-bottom{flex-direction:column !important;align-items:center !important;text-align:center;}
        }
        @media(max-width:480px){
          .zf-grid{grid-template-columns:1fr !important;}
          .zf-footer-inner{padding:40px 20px !important;}
        }
      `}</style>

      <footer className="zf-footer" style={{ background:"#ffffff", position:"relative", overflow:"hidden" }}>

        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, rgba(13,31,76,0.055) 1.5px, transparent 1.5px)`, backgroundSize:"28px 28px", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", top:0, right:0, width:"36%", height:"100%", background:`linear-gradient(155deg,${NAVY} 0%,#162757 100%)`, clipPath:"polygon(18% 0%,100% 0%,100% 100%,0% 100%)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", top:0, right:"calc(36% - 2px)", width:"2px", height:"100%", background:`linear-gradient(180deg,transparent 0%,${GOLD} 20%,${GOLDL} 50%,${GOLD} 80%,transparent 100%)`, pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"absolute", bottom:"-100px", left:"-100px", width:"400px", height:"400px", background:`radial-gradient(circle,rgba(201,150,59,0.07) 0%,transparent 70%)`, filter:"blur(40px)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ width:"100%", height:"3px", background:`linear-gradient(90deg,transparent,${GOLD} 30%,${GOLDL} 50%,${GOLD} 70%,transparent)`, position:"relative", zIndex:2 }} />

        <div style={{ position:"relative", zIndex:10, display:"flex", justifyContent:"flex-end", paddingRight:"32px" }}>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale:1.08, y:-2 }}
            whileTap={{ scale:0.93 }}
            aria-label="Scroll to top"
            style={{ marginTop:"-20px", width:"44px", height:"44px", background:NAVY, border:`2px solid ${GOLD}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:GOLD, fontSize:"16px" }}
          >
            <FiArrowUp />
          </motion.button>
        </div>

        <div className="zf-footer-inner" style={{ position:"relative", zIndex:2, maxWidth:"1180px", margin:"0 auto", padding:"48px 24px 0" }}>
          <div className="zf-grid" style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:"48px" }}>

            {/* Brand */}
            <motion.div className="zf-brand" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <div style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"12px" }}>
                <Image src="/logo.png" alt="Zelvix Logo" width={44} height={44} style={{ objectFit:"contain" }} />
                <div>
                  <span style={{ display:"block", fontSize:"20px", fontWeight:800, letterSpacing:"3px", color:NAVY, fontFamily:"'Cormorant Garamond', Georgia, serif", lineHeight:1 }}>ZELVIX</span>
                  <span style={{ display:"block", fontSize:"9px", letterSpacing:"3px", color:GOLD, fontWeight:600, textTransform:"uppercase", marginTop:"2px" }}>Real Estate</span>
                </div>
              </div>
              <p style={{ color:"rgba(13,31,76,0.5)", fontSize:"13px", lineHeight:1.8, marginBottom:"24px", fontWeight:300, maxWidth:"260px" }}>
                The #1 digital marketing agency for real estate professionals. We help you get more leads, sales, and visibility online.
              </p>
              <div style={{ display:"flex", gap:"8px" }}>
                {socialLinks.map((s) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} whileHover={{ y:-2 }} whileTap={{ scale:0.93 }} className="zf-social">
                    <s.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}>
              <h4 style={{ fontSize:"10px", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:NAVY, marginBottom:"20px", paddingBottom:"12px", borderBottom:`1px solid rgba(13,31,76,0.1)` }}>Quick Links</h4>
              <ul style={{ display:"flex", flexDirection:"column", gap:"10px", listStyle:"none", padding:0, margin:0 }}>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="zf-link">
                      <span className="zf-link-dot" style={{ width:"4px", height:"4px", background:GOLD, display:"inline-block", flexShrink:0, transition:"background 0.2s" }} />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}>
              <h4 style={{ fontSize:"10px", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:NAVY, marginBottom:"20px", paddingBottom:"12px", borderBottom:`1px solid rgba(13,31,76,0.1)` }}>Our Services</h4>
              <ul style={{ display:"flex", flexDirection:"column", gap:"10px", listStyle:"none", padding:0, margin:0 }}>
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" className="zf-link">
                      <span className="zf-link-dot" style={{ width:"4px", height:"4px", background:GOLD, display:"inline-block", flexShrink:0, transition:"background 0.2s" }} />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}>
              <h4 style={{ fontSize:"10px", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:NAVY, marginBottom:"20px", paddingBottom:"12px", borderBottom:`1px solid rgba(13,31,76,0.1)` }}>Contact Us</h4>
              <ul style={{ display:"flex", flexDirection:"column", gap:"14px", listStyle:"none", padding:0, margin:0 }}>
                {contactInfo.map((item, i) => (
                  <li key={i}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="zf-contact-link">
                      <div style={{ width:"32px", height:"32px", background:`rgba(13,31,76,0.05)`, border:`1px solid rgba(13,31,76,0.1)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                        <item.icon style={{ color:GOLD, fontSize:"13px" }} />
                      </div>
                      <span style={{ color:"rgba(13,31,76,0.5)", fontSize:"13px", lineHeight:1.6, paddingTop:"6px", fontWeight:300 }}>
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <motion.a href="#contact" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} className="zf-cta" style={{ marginTop:"24px" }}>
                <span>Free Consultation →</span>
              </motion.a>
            </motion.div>

          </div>

          {/* bottom bar */}
          <div className="zf-bottom" style={{ marginTop:"52px", paddingTop:"20px", paddingBottom:"28px", borderTop:`1px solid rgba(13,31,76,0.1)`, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
            <p style={{ color:"rgba(13,31,76,0.35)", fontSize:"12px", letterSpacing:"0.5px" }}>
              © {new Date().getFullYear()} Zelvix. All rights reserved.
            </p>
            <div style={{ display:"flex", gap:"24px" }}>
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="zf-bottom-link">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}