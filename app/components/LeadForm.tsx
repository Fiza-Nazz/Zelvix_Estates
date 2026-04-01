"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiSend, FiCheckCircle, FiAlertCircle, FiPhone, FiInstagram, FiFacebook } from "react-icons/fi";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  email: Yup.string().required("Email is required").email("Please enter a valid email address"),
  propertyType: Yup.string().required("Please select a property type"),
  message: Yup.string().min(10, "Message must be at least 10 characters"),
});

const contactItems = [
  { Icon: FiPhone,      label: "Call / WhatsApp", value: "+91 85728 95525  ·  +91 83980 95525", href: "tel:+918572895525" },
  { Icon: FiInstagram,  label: "Instagram",        value: "@zelvixestates",                      href: "https://www.instagram.com/zelvixestates?igsh=MWJwMTM4dnliYTJzdg==" },
  { Icon: FiFacebook,   label: "Facebook",         value: "Zelvix Estates",                      href: "https://www.facebook.com/share/1DfyQyHnF3/" },
];

const NAVY   = "#0d1f4c";
const GOLD   = "#c9963b";
const GOLD_L = "#e5b55a";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "#f7f5f0",
  border: "1.5px solid rgba(13,31,76,0.13)",
  borderRadius: 0,
  color: NAVY,
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.2s",
};

const inputErr: React.CSSProperties = {
  ...inputBase,
  border: "1.5px solid rgba(220,60,60,0.6)",
  background: "#fff5f5",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: NAVY,
  opacity: 0.6,
  marginBottom: "8px",
};

const errorStyle: React.CSSProperties = {
  marginTop: "5px",
  fontSize: "12px",
  color: "#dc3c3c",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (
    values: { name: string; phone: string; email: string; propertyType: string; message: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    await new Promise((r) => setTimeout(r, 1100));
    console.log("Form submitted:", values);
    setIsSubmitted(true);
    resetForm();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .zf-section { font-family: 'DM Sans', sans-serif; }
        .zf-input:focus {
          border-color: ${GOLD} !important;
          box-shadow: 0 0 0 3px rgba(201,150,59,0.12), 0 4px 16px rgba(13,31,76,0.07) !important;
          transform: translateY(-1px);
          outline: none;
          background: #ffffff !important;
        }
        .zf-select { appearance: none; cursor: pointer; }
        .zf-btn { position: relative; overflow: hidden; }
        .zf-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_L} 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.38s cubic-bezier(.4,0,.2,1);
          z-index: 0;
        }
        .zf-btn:not(:disabled):hover::after { transform: scaleX(1); }
        .zf-btn > * { position: relative; z-index: 1; }
        .zf-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(201,150,59,0.3); }
        .zf-btn:not(:disabled):active { transform: translateY(0); }
        .zf-card { transition: transform 0.3s ease; }
        .zf-card:hover { transform: translateX(8px); }
        .zf-card:hover .zf-card-icon { background: rgba(201,150,59,0.22) !important; transform: scale(1.1) rotate(6deg); }
        @keyframes zfspin { to { transform: rotate(360deg); } }
        .zf-spinner { width:16px;height:16px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:zfspin 0.7s linear infinite; }
        @keyframes zfpulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6} }
        .zf-dot { animation: zfpulse 2s ease infinite; }
        @media (max-width: 900px) {
          .zf-grid { grid-template-columns: 1fr !important; }
          .zf-bg-slab, .zf-bg-line { display: none !important; }
          .zf-left { border-right: none !important; border-bottom: 3px solid ${GOLD} !important; }
        }
        @media (max-width: 560px) {
          .zf-row2 { grid-template-columns: 1fr !important; }
          .zf-section { padding: 64px 16px !important; }
          .zf-left, .zf-right { padding: 36px 24px !important; }
        }
      `}</style>

      <section id="contact" className="zf-section" style={{ background: "#ffffff", minHeight: "100vh", padding: "96px 24px", position: "relative", overflow: "hidden" }}>

        {/* navy diagonal slab */}
        <div className="zf-bg-slab" style={{ position:"absolute", top:0, right:0, width:"48%", height:"100%", background:`linear-gradient(155deg,${NAVY} 0%,#162757 60%,#1e3370 100%)`, clipPath:"polygon(14% 0%,100% 0%,100% 100%,0% 100%)", zIndex:0, pointerEvents:"none" }} />
        {/* gold separator line */}
        <div className="zf-bg-line" style={{ position:"absolute", top:0, right:"calc(48% - 2px)", width:"2px", height:"100%", background:`linear-gradient(180deg,transparent 0%,${GOLD} 25%,${GOLD_L} 50%,${GOLD} 75%,transparent 100%)`, zIndex:1, pointerEvents:"none" }} />
        {/* dot grid */}
        <div style={{ position:"absolute", top:0, left:0, width:"55%", height:"100%", backgroundImage:`radial-gradient(circle, rgba(13,31,76,0.065) 1.5px, transparent 1.5px)`, backgroundSize:"28px 28px", zIndex:0, pointerEvents:"none" }} />
        {/* ambient glow */}
        <div style={{ position:"absolute", top:"-150px", left:"-150px", width:"500px", height:"500px", background:`radial-gradient(circle, rgba(201,150,59,0.1) 0%, transparent 70%)`, zIndex:0, pointerEvents:"none", filter:"blur(40px)" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:"1180px", margin:"0 auto" }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity:0, y:28 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.65 }}
            style={{ textAlign:"center", marginBottom:"64px" }}
          >
            <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:NAVY, padding:"9px 22px", clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", marginBottom:"24px" }}>
              <span className="zf-dot" style={{ width:"6px", height:"6px", background:GOLD, borderRadius:"50%", flexShrink:0, display:"block" }} />
              <span style={{ color:"#f0d49a", fontSize:"10px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase" }}>Get In Touch</span>
            </div>

            <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"clamp(34px,5.5vw,62px)", fontWeight:700, color:NAVY, lineHeight:1.1, marginBottom:"16px", letterSpacing:"-0.5px" }}>
              Ready to{" "}
              <em style={{ fontStyle:"italic", color:GOLD }}>Grow Your</em>
              <br />Business?
            </h2>

            <p style={{ color:"#5a6282", fontSize:"15px", lineHeight:1.75, maxWidth:"460px", margin:"0 auto", fontWeight:300 }}>
              Fill out the form and our team will get back to you within 24 hours with a custom strategy for your real estate business.
            </p>
          </motion.div>

          {/* ── Grid ── */}
          <div className="zf-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", boxShadow:"0 24px 80px rgba(13,31,76,0.16), 0 4px 20px rgba(13,31,76,0.08)" }}>

            {/* LEFT */}
            <motion.div
              className="zf-left"
              initial={{ opacity:0, x:-40 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65 }}
              style={{ background:`linear-gradient(145deg,${NAVY} 0%,#162757 100%)`, padding:"52px 44px", position:"relative", overflow:"hidden", borderRight:`3px solid ${GOLD}` }}
            >
              <div style={{ position:"absolute", bottom:"-70px", right:"-70px", width:"260px", height:"260px", border:"1px solid rgba(201,150,59,0.12)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-30px", right:"-30px", width:"170px", height:"170px", border:"1px solid rgba(201,150,59,0.07)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:"-80px", left:"-80px", width:"280px", height:"280px", background:"radial-gradient(circle,rgba(201,150,59,0.08) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

              <span style={{ fontSize:"10px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:GOLD, marginBottom:"14px", display:"block" }}>Direct Contact</span>

              <h3 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"clamp(26px,3vw,38px)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:"12px" }}>
                Let&rsquo;s Start a<br />
                <em style={{ color:"#f0d49a", fontStyle:"italic" }}>Conversation</em>
              </h3>

              <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"13px", lineHeight:1.75, marginBottom:"40px", fontWeight:300, maxWidth:"300px" }}>
                Our specialists are ready to guide you through every step of your property journey.
              </p>

              <div style={{ width:"44px", height:"2px", background:`linear-gradient(90deg,${GOLD},transparent)`, marginBottom:"36px" }} />

              {contactItems.map(({ Icon, label, value, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zf-card"
                  initial={{ opacity:0, x:-20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.45, delay:0.15 + i * 0.1 }}
                  style={{ display:"flex", alignItems:"center", gap:"16px", padding:"16px 0", borderBottom: i < contactItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", cursor:"pointer", textDecoration:"none" }}
                >
                  <div className="zf-card-icon" style={{ width:"42px", height:"42px", background:"rgba(201,150,59,0.1)", border:"1px solid rgba(201,150,59,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s, transform 0.3s" }}>
                    <Icon style={{ color:GOLD_L, fontSize:"16px" }} />
                  </div>
                  <div>
                    <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:GOLD, marginBottom:"3px" }}>{label}</p>
                    <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.72)", fontWeight:300 }}>{value}</p>
                  </div>
                </motion.a>
              ))}

              <div style={{ display:"flex", gap:"10px", marginTop:"36px", flexWrap:"wrap" }}>
                {["24hr Response", "Free Consult", "Since 2010"].map((t) => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:"6px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", padding:"7px 12px", fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>
                    <span style={{ width:"5px", height:"5px", background:GOLD, borderRadius:"50%", flexShrink:0, display:"block" }} />
                    {t}
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity:0, y:14 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:14 }}
                    transition={{ duration:0.4 }}
                    style={{ marginTop:"28px", display:"flex", alignItems:"center", gap:"14px", background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.22)", padding:"18px 20px" }}
                  >
                    <FiCheckCircle style={{ color:"#22c55e", fontSize:"22px", flexShrink:0 }} />
                    <div>
                      <p style={{ fontSize:"13px", fontWeight:600, color:"#22c55e", marginBottom:"2px" }}>Message Sent Successfully</p>
                      <p style={{ fontSize:"11px", color:"rgba(34,197,94,0.65)" }}>We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              className="zf-right"
              initial={{ opacity:0, x:40 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65 }}
              style={{ background:"#ffffff", padding:"52px 44px", borderTop:`3px solid ${GOLD}`, position:"relative" }}
            >
              <div style={{ position:"absolute", top:0, right:0, width:"64px", height:"64px", background:"linear-gradient(225deg,rgba(201,150,59,0.08) 0%,transparent 60%)", pointerEvents:"none" }} />

              <h3 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"24px", fontWeight:700, color:NAVY, marginBottom:"6px" }}>
                Get Your Free Consultation
              </h3>
              <p style={{ fontSize:"13px", color:"#5a6282", marginBottom:"32px", fontWeight:300 }}>No obligations. No spam. Just expert advice.</p>

              <Formik
                initialValues={{ name:"", phone:"", email:"", propertyType:"", message:"" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form style={{ display:"flex", flexDirection:"column", gap:"18px" }}>

                    {/* Name + Phone */}
                    <div className="zf-row2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                      <div>
                        <label htmlFor="name" style={labelStyle}>Full Name *</label>
                        <Field type="text" id="name" name="name" placeholder="John Doe" className="zf-input" style={touched.name && errors.name ? inputErr : inputBase} />
                        <ErrorMessage name="name">{(msg) => <div style={errorStyle}><FiAlertCircle style={{ fontSize:"12px" }} />{msg}</div>}</ErrorMessage>
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>Phone *</label>
                        <Field type="tel" id="phone" name="phone" placeholder="+971 50 123 4567" className="zf-input" style={touched.phone && errors.phone ? inputErr : inputBase} />
                        <ErrorMessage name="phone">{(msg) => <div style={errorStyle}><FiAlertCircle style={{ fontSize:"12px" }} />{msg}</div>}</ErrorMessage>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email Address *</label>
                      <Field type="email" id="email" name="email" placeholder="john@example.com" className="zf-input" style={touched.email && errors.email ? inputErr : inputBase} />
                      <ErrorMessage name="email">{(msg) => <div style={errorStyle}><FiAlertCircle style={{ fontSize:"12px" }} />{msg}</div>}</ErrorMessage>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label htmlFor="propertyType" style={labelStyle}>Property Type *</label>
                      <div style={{ position:"relative" }}>
                        <Field as="select" id="propertyType" name="propertyType" className="zf-input zf-select" style={{ ...(touched.propertyType && errors.propertyType ? inputErr : inputBase), paddingRight:"36px" }}>
                          <option value="">Select a property type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="land">Land / Plot</option>
                          <option value="mixed">Mixed Use</option>
                        </Field>
                        <span style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", color:GOLD, pointerEvents:"none", fontSize:"13px" }}>▾</span>
                      </div>
                      <ErrorMessage name="propertyType">{(msg) => <div style={errorStyle}><FiAlertCircle style={{ fontSize:"12px" }} />{msg}</div>}</ErrorMessage>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" style={labelStyle}>Message</label>
                      <Field as="textarea" id="message" name="message" placeholder="Tell us about your project or requirements..." rows={4} className="zf-input" style={{ ...(touched.message && errors.message ? inputErr : inputBase), resize:"none" }} />
                      <ErrorMessage name="message">{(msg) => <div style={errorStyle}><FiAlertCircle style={{ fontSize:"12px" }} />{msg}</div>}</ErrorMessage>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={isSubmitting ? {} : { scale:0.97 }}
                      className="zf-btn"
                      style={{ width:"100%", padding:"16px", background:NAVY, border:"none", color:"#ffffff", fontSize:"11px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", fontFamily:"inherit", cursor:isSubmitting ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", marginTop:"6px", transition:"transform 0.2s, box-shadow 0.3s", opacity:isSubmitting ? 0.65 : 1 }}
                    >
                      {isSubmitting ? (
                        <><div className="zf-spinner" />Sending…</>
                      ) : (
                        <><FiSend style={{ fontSize:"14px" }} />Submit Inquiry</>
                      )}
                    </motion.button>

                  </Form>
                )}
              </Formik>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}