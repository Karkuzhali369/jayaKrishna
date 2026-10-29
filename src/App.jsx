import { useEffect, useState } from "react";

/* ---------- CONTENT (edit here) ---------- */
const ECOMMERCE_URL = "https://jayakrishna-ecommerce.noorjahan-0569.workers.dev/" ;
const PHONE = "+91 94433 52716";
const EMAIL = "contact@jayakrishna.org";
const ADDRESS = "82/3, Maravankulam, Thirumangalam, Madurai – 625706, Tamil Nadu, India";

const SLIDES = [
  { tag: "Signature bakery specialty", title: "Soft Flaky Paratas", sub: "Cooked paratas stay exceptionally soft even after 2 days in the refrigerator. Just heat and serve!", img: "images/paratha.png", pos: "center" },
  { tag: "Signature bakery specialty", title: "Soft Golden Buns", sub: "High-protein maida with strong gluten gives a robust dough rise and a soft, golden crumb.", img: "images/buns.png", pos: "center" },
  { tag: "Signature bakery specialty", title: "Fresh Sliced Breads", sub: "Precision milled to preserve natural wheat vitality and high gluten elasticity.", img: "images/bread.png", pos: "center 60%" },
  { tag: "Specialty delicacies", title: "Flaky Puffs & Delicate Layered Pastries", sub: "Puffs and pastries expand up to 20% more, without any dough improver.", img: "images/pastries.png", pos: "center" },
];

const BRANDS = [
  { id: "Lion", name: "Lion Brand", sub: "Flagship Atta & Maida" },
  { id: "Kili", name: "Kili Brand", sub: "Hotel & Bakery Grade" },
  { id: "Cycle", name: "Cycle Brand", sub: "Pure Suji & Rava" },
];

const FEATURES = [
  { icon: "🌱", t: "100% Whole Grain Integrity", d: "Preserves the dietary bran, endosperm, and golden germ for authentic wheat sweetness and digestive health." },
  { icon: "❄️", t: "Chilled Roller Milling", d: "Low-friction shearing prevents heat buildup, protecting heat-sensitive vitamins and gluten elasticity." },
  { icon: "🧪", t: "FSSAI & Lab Audited", d: "Continuous testing of moisture, ash content, and wet gluten guarantees batch-after-batch baking consistency." },
];

const STEPS = [
  ["Grain Selection", "Procuring premium Sharbati and Lokwan hard wheat lots, rigorously audited for test weight and protein levels."],
  ["Multi-Stage Cleaning", "Aspiration channels, vibrating sieves, gravity destoners, and magnetic separators remove 100% of field impurities."],
  ["Tempering & Conditioning", "Pure water hydration restoughens the outer bran for clean separation while mellowing the endosperm."],
  ["Chilled Roller Milling", "Low-friction fluted roller stands gradually break kernels without overheating, safeguarding natural vitamins."],
  ["Plansifter Purification", "High-speed multi-deck sieves separate flour fractions into precise uniform mesh granulations."],
  ["Hygienic Packaging", "Automated packing into consumer pouches and 25KG, 50KG, 90KG moisture-barrier sacks."],
];

const GALLERY = [
  { cat: "Parata, Bread & Buns", tag: "JFM • PARATA", cap: "Soft Flaky Paratas", img: "images/paratha.png" },
  { cat: "Parata, Bread & Buns", tag: "JFM • BREAD", cap: "Fresh Sliced Breads", img: "images/bread.png" },
  { cat: "Parata, Bread & Buns", tag: "JFM • BUNS", cap: "Soft Golden Buns", img: "images/buns.png" },
  { cat: "Puffs, Pastries & Vermicelli", tag: "JFM • PASTRIES", cap: "Flaky Puffs & Delicate Layered Pastries", img: "images/pastries.png" },
  { cat: "Puffs, Pastries & Vermicelli", tag: "JFM • VERMICELLI", cap: "Traditional Plain Raw Vermicelli Strands", img: "images/vermicelli.png" },
];

const TA = {
  Home: "முகப்பு", About: "எங்களைப் பற்றி", Gallery: "படத்தொகுப்பு", Insights: "நுண்ணறிவு",
  "Contact Us": "தொடர்புக்கு", "E-Commerce": "இ-காமர்ஸ்", "About Jayakrishna": "ஜெயகிருஷ்ணா பற்றி",
  h1: "நோக்கத்துடன் உருவானது.", h2: "ஆரோக்கிய வாழ்விற்காக அரைக்கப்பட்டது.",
};

const SIZES_LABEL = ["500g • 1kg • 2kg • 5kg • 10kg", "25kg • 50kg • 90kg", "Thirumangalam, TN"];

/* ---------- SMALL HELPERS ---------- */
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Img({ src, alt, className, pos }) {
  const [bad, setBad] = useState(!src);
  return bad ? <div className={`${className || ""} img-fallback`} role="img" aria-label={alt}>🌾</div>
    : <img className={className} src={src} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading="lazy" onError={() => setBad(true)} />;
}


/* ---------- ANIMATION HELPERS ---------- */
function Words({ text, base = 0 }) {
  return text.split(" ").map((w, i) => (
    <span key={i}><span className="wm"><span className="w" style={{ "--i": base + i }}>{w}</span></span>{" "}</span>
  ));
}

function Defs() {
  const ears = [0, 1, 2, 3, 4].map((k) => 50 - k * 9);
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd45e" /><stop offset="1" stopColor="#c98a1b" /></linearGradient>
        <symbol id="stalk" viewBox="0 0 40 200">
          <path d="M20 200 C21 150 19 100 20 46" stroke="#a16207" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M20 176 C8 164 4 144 2 120 C14 130 20 150 20 176Z" fill="#9bb04a" opacity=".9" />
          <path d="M20 150 C32 138 36 118 38 96 C26 108 20 128 20 150Z" fill="#b5c35e" opacity=".9" />
          {ears.map((y) => (
            <g key={y}>
              <line x1="14" y1={y - 5} x2="6" y2={y - 24} stroke="#e0a82e" strokeWidth=".8" />
              <line x1="26" y1={y - 5} x2="34" y2={y - 24} stroke="#e0a82e" strokeWidth=".8" />
              <ellipse cx="14" cy={y} rx="3.6" ry="7.4" transform={`rotate(-28 14 ${y})`} fill="url(#gr)" />
              <ellipse cx="26" cy={y} rx="3.6" ry="7.4" transform={`rotate(28 26 ${y})`} fill="url(#gr)" />
            </g>
          ))}
          <ellipse cx="20" cy="8" rx="3.2" ry="7.6" fill="url(#gr)" />
          <line x1="20" y1="2" x2="20" y2="-10" stroke="#e0a82e" strokeWidth=".8" />
        </symbol>
      </defs>
    </svg>
  );
}

const GRAINS = Array.from({ length: 16 }, (_, i) => ({ x: (i * 61 + 7) % 100, s: 0.6 + ((i * 37) % 10) / 12, t: 9 + ((i * 13) % 9), d: -((i * 17) % 14), r: (i * 47) % 360 }));
function Grains() {
  return (
    <div className="grains" aria-hidden="true">
      {GRAINS.map((g, i) => <span key={i} style={{ left: `${g.x}%`, "--s": g.s, "--t": `${g.t}s`, "--r": `${g.r}deg`, animationDelay: `${g.d}s` }} />)}
    </div>
  );
}

function WheatRow({ className = "", count = 30 }) {
  return (
    <div className={`wheatrow ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 40 200" style={{ "--i": i, "--h": `${46 + ((i * 37) % 26)}px` }}><use href="#stalk" /></svg>
      ))}
    </div>
  );
}

const LOADER_H = [120, 150, 178, 205, 170, 215, 165, 195, 160, 140, 115];
function Loader({ out }) {
  return (
    <div className={`loader ${out ? "out" : ""}`} role="status" aria-label="Loading">
      <Grains />
      <div className="lbox">
        <div className="lfield">
          {LOADER_H.map((h, i) => (
            <div key={i} className="ls" style={{ "--d": `${i * 0.11}s`, "--h": `${h}px` }}><svg viewBox="0 0 40 200"><use href="#stalk" /></svg></div>
          ))}
        </div>
        <div className="lname">{"JAYAKRISHNA".split("").map((c, i) => <span key={i} style={{ "--i": i }}>{c}</span>)}</div>
        <div className="lsub">FLOUR MILLS</div>
        <div className="lbar"><i /></div>
        <p className="lmsg">Milling freshness…</p>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  const [lang, setLang] = useState("en");
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null); // open dropdown
  const [slide, setSlide] = useState(0);
  const [gcat, setGcat] = useState("All Photos");
  const [form, setForm] = useState({ name: "", phone: "", biz: "", type: "Dealership / Distributorship", region: "", msg: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);   // loader finished -> start page animations
  const [gone, setGone] = useState(false);     // loader unmounted
  const [scrolled, setScrolled] = useState(false);

  const t = (k) => (lang === "ta" && TA[k]) || k;

  useEffect(() => { const i = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000); return () => clearInterval(i); }, []);

  useEffect(() => {
    const quick = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const a = setTimeout(() => setReady(true), quick ? 100 : 2500);
    const b = setTimeout(() => setGone(true), quick ? 200 : 3400);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  useEffect(() => { document.body.style.overflow = gone ? "" : "hidden"; }, [gone]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      h.style.setProperty("--sp", (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)).toFixed(4));
      setScrolled(h.scrollTop > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ready]);

  const nav = (id) => { go(id); setMenu(false); setOpen(null); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Enter your full name";
    if (!/^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(form.phone.trim())) er.phone = "Enter a valid 10-digit mobile number";
    setErrs(er);
    if (Object.keys(er).length) return;
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nBusiness: ${form.biz}\nType: ${form.type}\nRegion: ${form.region}\n\n${form.msg}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Partnership enquiry: " + form.type)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

  const navItems = [
    ["Home", "home"],
    ["About", "about", [["About Jayakrishna", "about"], ["Vision & Mission", "vision"]]],
    ["Gallery", "gallery"], ["Insights", "insights"], ["Contact Us", "contact"],
  ];

  return (
    <div className={`app ${ready ? "ready" : ""}`}>
      <Defs />
      {!gone && <Loader out={ready} />}
      <div className="sprog" aria-hidden="true" />
      <div className="topbar">
        <div className="wrap row between">
          <div className="row gap">
            <span>📍 Thirumangalam, Madurai, TN</span>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="hide-sm">✉️ {EMAIL}</a>
          </div>
          <div className="row gap">
            <span className="fssai hide-sm">FSSAI CERTIFIED</span>
            <button className="lang" onClick={() => setLang(lang === "en" ? "ta" : "en")} aria-label="Switch language">
              🌐 {lang === "en" ? "Tamil (தமிழ்)" : "English"}
            </button>
          </div>
        </div>
      </div>

      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap row between">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); nav("home"); }}>
            <span className="logo-mark">🌾</span>
            <span><b>JAYAKRISHNA</b><em>FLOUR MILLS</em><small>QUALITY LIES IN CONSISTENCY</small></span>
          </a>
          <nav className={`links ${menu ? "show" : ""}`} aria-label="Main">
            {navItems.map(([label, id, sub]) => (
              <div key={label} className="item" onMouseLeave={() => setOpen(null)}>
                <button onClick={() => (sub ? setOpen(open === label ? null : label) : nav(id))}
                  onMouseEnter={() => sub && setOpen(label)} aria-expanded={sub ? open === label : undefined}>
                  {t(label)} {sub && "▾"}
                </button>
                {sub && open === label && (
                  <div className="drop">
                    {sub.map(([l, target]) => (
                      <button key={l} onClick={() => nav(target)}>{l}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="row gap">
            <a className="pill" href={ECOMMERCE_URL} target="_blank" rel="noreferrer">🛒 {t("E-Commerce")}</a>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "✕" : "☰"}</button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="herobg">
          <Grains />
          <div className="hero wrap">
            <div>
              <span className="chip up" style={{ "--d": "100ms" }}>• Pneumatic Roller Mills • Madurai, TN</span>
              <h1 className={`wd ${ready ? "in" : ""}`}>
                {lang === "ta"
                  ? <><Words text={TA.h1} base={2} /><span className="l2"><Words text={TA.h2} base={5} /></span></>
                  : <><Words text="Built with Purpose." base={2} /><span className="l2"><Words text="Milled for Healthy Living." base={5} /></span></>}
              </h1>
              <p className="lead up" style={{ "--d": "1100ms" }}>Discover Jayakrishna Flour Mills — premium whole wheat atta, superfine maida, and golden suji shaped by quality, pure wheat grains, and continuous innovation for generations.</p>
              <p className="label up" style={{ "--d": "1250ms" }}>OUR TRUSTED BRANDS:</p>
              <div className="row gap wrapx">
                {BRANDS.map((b, i) => (
                  <div key={b.id} className="brand up" style={{ "--d": `${1350 + i * 120}ms` }}>
                    <span><b>{b.name}</b><small>{b.sub}</small></span>
                  </div>
                ))}
              </div>
              <div className="row gap wrapx cta up" style={{ "--d": "1750ms" }}>
                <a className="btn" href={ECOMMERCE_URL} target="_blank" rel="noreferrer">{t("E-Commerce")} →</a>
                <button className="btn ghost" onClick={() => nav("about")}>{t("About Jayakrishna")}</button>
              </div>
              <div className="stats up" style={{ "--d": "1950ms" }}>
                {["PACKAGES", "COMMERCIAL SACKS", "LOCATION"].map((l, i) => <div key={l}><small>{l}</small><b>{SIZES_LABEL[i]}</b></div>)}
              </div>
            </div>
            <div className="sw up zoom" style={{ "--d": "500ms" }}>
              <div className="slider">
                {SLIDES.map((s, i) => (
                  <div key={s.title} className={`slide ${i === slide ? "on" : ""}`} aria-hidden={i !== slide}>
                    <Img src={s.img} alt={s.title} pos={s.pos} />
                    <div className="cap"><span className="tag">{s.tag}</span><h3>{s.title}</h3><p>{s.sub}</p></div>
                  </div>
                ))}
                <span className="scount">0{slide + 1} / 0{SLIDES.length}</span>
                <button className="arrow l" onClick={() => setSlide((slide + SLIDES.length - 1) % SLIDES.length)} aria-label="Previous slide">‹</button>
                <button className="arrow r" onClick={() => setSlide((slide + 1) % SLIDES.length)} aria-label="Next slide">›</button>
                <div className="dots">{SLIDES.map((_, i) => <button key={i} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />)}</div>
                <i key={slide} className="sbar" />
              </div>
              <div className="float f1">🌾 100% Unbleached &amp; Safe</div>
              <div className="float f2">✨ 21–22 Paratas per kg</div>
            </div>
          </div>
          <WheatRow className="hero-row" />
        </section>

        {/* ABOUT */}
        <section id="about" className="sec white">
          <div className="wrap center">
            <span className="chip rv">ABOUT JAYAKRISHNA FLOUR MILLS</span>
            <h2 className="wd rv"><Words text="Where experience meets a forward-looking approach." /></h2>
            <p className="muted narrow rv" style={{ "--d": "150ms" }}>Flour is valuable, versatile and nutritious. Packed with vitamins and minerals, it forms an essential foundation of daily life — from fresh morning rotis to artisanal bakery loaves.</p>
            <div className="grid3 left">
              {FEATURES.map((x, i) => <div className="card rv" style={{ "--d": `${i * 130}ms` }} key={x.t}><i className="ico">{x.icon}</i><h4>{x.t}</h4><p>{x.d}</p></div>)}
            </div>
            <div id="vision" className="vm left rv z">
              <div><small>◉ OUR VISION</small><h3>To be South India's most trusted benchmark for pure, unadulterated wheat nutrition.</h3><p>Empowering households and food creators with pure whole grain products through honest milling and sustainable farmer relationships.</p></div>
              <div><small>◎ OUR MISSION</small><h3>To deliver batch-after-batch consistency that bakers and families can depend upon.</h3><p>Combining advanced pneumatic roller stands, multi-stage aspiration cleaning, and strict lab auditing to eliminate batch variation.</p></div>
            </div>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="sec white">
          <div className="wrap center">
            <span className="chip rv">THE MILLING JOURNEY</span>
            <h2 className="wd rv"><Words text="From Golden Harvest Fields to Pure Culinary Flour" /></h2>
            <div className="grid3 left">
              {STEPS.map(([h, d], i) => <div className="card rv" style={{ "--d": `${(i % 3) * 120}ms` }} key={h}><b className="num">0{i + 1}</b><h4>{h}</h4><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="sec cream">
          <div className="wrap">
            <div className="row between wrapx ghead">
              <div><span className="chip rv">VISUAL TOUR</span><h2 className="wd rv l"><Words text="Media & Photo Gallery" /></h2></div>
              <div className="tabs sm rv r">
                {["All Photos", "Parata, Bread & Buns", "Puffs, Pastries & Vermicelli"].map((c) => <button key={c} className={gcat === c ? "on" : ""} onClick={() => setGcat(c)}>{c}</button>)}
              </div>
            </div>
            <div className="ggrid">
              {GALLERY.filter((g) => gcat === "All Photos" || g.cat === gcat).map((g, i) => (
                <figure className="gitem pop" style={{ "--d": `${i * 110}ms` }} key={g.cap}><Img src={g.img} alt={g.cap} /><figcaption><small>{g.tag}</small><b>{g.cap}</b></figcaption></figure>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec white">
          <div className="wrap contact">
            <form className="enq rv l" onSubmit={submit} noValidate>
              <span className="chip rv">DEALERSHIP & COMMERCIAL ENQUIRIES</span>
              <h2 className="wd rv l"><Words text="Partner with Jayakrishna Flour Mills" /></h2>
              <p className="muted small rv" style={{ "--d": "150ms" }}>Expand your wholesale business with our trusted milling legacy. Reach out for dealership or commercial supply contracts.</p>
              <div className="fgrid">
                <label>Full Name *<input placeholder="e.g. Anand Kumar" {...f("name")} aria-invalid={!!errs.name} />{errs.name && <em className="err">{errs.name}</em>}</label>
                <label>Contact Phone *<input placeholder="+91 94433 52716" inputMode="tel" {...f("phone")} aria-invalid={!!errs.phone} />{errs.phone && <em className="err">{errs.phone}</em>}</label>
                <label>Business / Enterprise Name<input placeholder="Distribution Agency, Bakery, etc." {...f("biz")} /></label>
                <label>Partnership Type<select {...f("type")}><option>Dealership / Distributorship</option><option>Bakery / Hotel Supply</option><option>Bulk Commercial Supply</option><option>Retail / Wholesale</option></select></label>
                <label className="full">Operating Region / District<input placeholder="e.g. Madurai, Chennai, Coimbatore, Kerala" {...f("region")} /></label>
                <label className="full">Proposal / Business Details<textarea rows="3" placeholder="Tell us about your distribution reach, existing network, or requirement details..." {...f("msg")} /></label>
              </div>
              <button className="btn wide" type="submit">SUBMIT PARTNERSHIP ENQUIRY ➤</button>
              {sent && <p className="ok" role="status">Your email app should open with the enquiry. If it did not, write to {EMAIL} or call {PHONE}.</p>}
            </form>
            <aside className="rv r">
              <div className="dark">
                <h3>Direct Mill Contacts</h3>
                <div className="crow"><i>📞</i><div><small>Direct Contact</small><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></div></div>
                <div className="crow"><i>✉️</i><div><small>Email Inquiries</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
                <div className="crow"><i>📍</i><div><small>Mill Location & Office</small><span>Jayakrishna Flour Mills<br />{ADDRESS.replace(", Madurai", ",\nMadurai")}</span></div></div>
              </div>
              <div className="map">
                <div className="row between"><b>📌 Thirumangalam Mill Site</b><span className="open">Open Mon-Sat</span></div>
                <iframe title="Mill location map" loading="lazy" src="https://www.google.com/maps?q=Thirumangalam,Madurai&output=embed" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <WheatRow className="foot-row" count={40} />
      <footer>
        <div className="wrap fgrid4 rv">
          <div><h3>🌾 JAYAKRISHNA FLOUR MILLS</h3><p>Milling premium Whole Wheat Atta, Maida, Commercial Atta, and Golden Suji across our trusted brand portfolio: Lion, Kili, and Cycle.</p>
            <div className="row gap soc">{[["f", "Facebook"], ["◎", "Instagram"], ["✆", "WhatsApp"]].map(([s, n]) => <a key={n} href={n === "WhatsApp" ? "https://wa.me/919443352716" : "#"} aria-label={n}>{s}</a>)}</div></div>
          <div><h5>COMPANY</h5>
            <a href="#about" onClick={(e) => { e.preventDefault(); nav("about"); }}>About JFM Heritage</a>
            <a href={ECOMMERCE_URL} target="_blank" rel="noreferrer">E-Commerce</a></div>
          <div><h5>CORPORATE POLICIES</h5><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">Return Policy</a><a href="#gallery" onClick={(e) => { e.preventDefault(); nav("gallery"); }}>Plant Infrastructure Gallery</a></div>
          <div><h5>MILL & OFFICE</h5><p>{ADDRESS}</p><a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a><a href={`mailto:${EMAIL}`}>✉️ {EMAIL}</a></div>
        </div>
        <div className="wrap row between wrapx copy"><span>© 2026 Jayakrishna Flour Mills (JFM). All rights reserved. • FSSAI Certified</span><span>Pure wheat nutrition. Milled with consistency for generations.</span></div>
      </footer>

    </div>
  );
}
