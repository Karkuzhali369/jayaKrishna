import { useEffect, useRef, useState } from "react";

/* ---------- CONTENT (edit here) ---------- */
const ECOMMERCE_URL = "https://jayakrishna-ecommerce.noorjahan-0569.workers.dev/";
const PHONE = "+91 93459 11301";
const PHONE2 = "+91 75959 59797";
const EMAIL = "contact@jayakrishna.org";
const ADDRESS = "82/3, Maravankulam, Thirumangalam, Madurai – 625706, Tamil Nadu, India";

const SLIDES = [
	{ tag: "From our farms", title: "Golden Wheat Fields", sub: "Premium Sharbati and Lokwan wheat, grown by trusted farmers and harvested at peak maturity.", img: "images/wheat-field.jpg", pos: "center" },
	{ tag: "Quality starts here", title: "Pure Wheat Grains", sub: "Every kernel is cleaned, graded and tested for test weight and protein before it reaches our mill.", img: "images/wheat-grains.jpg", pos: "center" },
	{ tag: "Farm to mill", title: "Fresh Grain Sacks", sub: "Carefully harvested and stored grain, ready to be milled into pure, consistent flour.", img: "images/grain-sack.jpg", pos: "center 60%" },
	{ tag: "Freshly milled", title: "Pure Wheat Flour", sub: "Chilled roller milling keeps the natural bran, germ and gluten elasticity intact.", img: "images/wheat-flour.jpeg", pos: "center" },
	{ tag: "From grain to table", title: "Wholesome Wheat Bread", sub: "Our flour bakes into soft, golden loaves with a strong rise and a tender crumb.", img: "images/bread-wheat.jpeg", pos: "center" },
];

const BRANDS = [
	{ id: "Lion", name: "Lion Brand", sub: "Flagship Atta & Maida", logo: "images/lion.png" },
	{ id: "Kili", name: "Kili Brand", sub: "Hotel & Bakery Grade", logo: "images/kili.png" },
	{ id: "Cycle", name: "Cycle Brand", sub: "Pure Suji & Rava", logo: "images/cycle.png" },
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
	Testimonials: "கருத்துகள்", "40 Years of Trust": "40 ஆண்டுகால நம்பிக்கை",
	"Contact Us": "தொடர்புக்கு", "E-Commerce": "இ-காமர்ஸ்", "About Jayakrishna": "ஜெயகிருஷ்ணா பற்றி",
	"Every grain matters to us": "ஒவ்வொரு தானியமும் எங்களுக்கு முக்கியம்", h1: "நோக்கத்துடன் உருவானது.", h2: "ஆரோக்கிய வாழ்விற்காக அரைக்கப்பட்டது.",
};

const HIGHLIGHTS = ["40 Years of Trusted Milling", "100% Unbleached & Safe", "2-Day Refrigerated Dough Stability", "+10% Higher Yield", "Natural Half-White Tone", "Zero Preservatives Needed", "Superior Water Absorption", "Direct Doorstep Delivery"];
const TYPES = ["Dealership / Distributorship", "Bakery / Hotel Supply", "Bulk Commercial Supply", "Retail / Wholesale"];

const SIZES_LABEL = ["500g • 1kg • 2kg • 5kg • 10kg", "25kg • 50kg • 90kg", "Thirumangalam, TN"];

const LOGO = "images/logo.png";

const TESTIMONIALS = [
	{ who: "Madurai Hoteliers Association", init: "MH", quote: "We switch between Kili and Lion brands based on stock availability from Thirumangalam and Kappalur. Both deliver identical, world-class soft paratas that our customers love!" },
	{ who: "Royal Bakery Chain", init: "RB", badge: "0.0% (Zero Bleach)", quote: "Our puffs and pastries expanded by 20% in puffiness without adding any dough improver. Jayakrishna Flour Mill's Maida is a game-changer for commercial bakers." },
	{ who: "Online Bulk Buyer", role: "E-Commerce Client", init: "OB", quote: "Ordering online direct from Jayakrishna Flour Mill saved us time and hassle. The flour quality is 100% consistent across every bag we receive!" },
];

const YEARS = [["40", "Years of milling legacy"], ["3", "Trusted brands: Lion, Kili & Cycle"], ["100%", "Unbleached & safe"]];

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
	const ks = [0, 1, 2, 3, 4, 5, 6];
	const fan = [-24, -16, -8, 0, 8, 16, 24];
	const plant = [[-26, 205], [-13, 232], [0, 250], [13, 228], [26, 200]];
	return (
		<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
			<defs>
				<linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset=".55" stopColor="#f2b632" /><stop offset="1" stopColor="#c98a12" /></linearGradient>
				<linearGradient id="gr2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset="1" stopColor="#e3a527" /></linearGradient>
				{/* Triticum aestivum: bearded spike, alternating (distichous) spikelets, long awns, node and blade leaves */}
				<symbol id="stalk" viewBox="0 0 40 224">
					<g transform="translate(0 24)">
						<path d="M20 200 C21 150 19 100 20 54" stroke="#c19a2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
						<circle cx="20" cy="150" r="2" fill="#d8b04a" />
						<path d="M20 152 C7 142 2 120 0 94 C11 108 19 128 20 152Z" fill="#c9b25a" />
						<path d="M20 180 C33 170 38 148 40 124 C29 138 21 158 20 180Z" fill="#dcc572" />
						<line x1="20" y1="54" x2="20" y2="4" stroke="#e0a82e" strokeWidth="1.6" />
						{ks.map((k) => {
							const y = 50 - k * 6.6, side = k % 2 ? 1 : -1;
							return (
								<g key={k} transform={`translate(20 ${y}) scale(${side} 1)`}>
									<line x1="6" y1="-5" x2="15" y2="-31" stroke="#e9bb45" strokeWidth=".7" />
									<line x1="9" y1="-5" x2="19" y2="-27" stroke="#e9bb45" strokeWidth=".7" />
									<ellipse cx="5" cy="0" rx="3.1" ry="6.4" transform="rotate(14 5 0)" fill="url(#gr)" />
									<ellipse cx="8" cy="-2" rx="2.5" ry="5.2" transform="rotate(26 8 -2)" fill="url(#gr2)" />
								</g>
							);
						})}
						<ellipse cx="20" cy="3" rx="2.8" ry="6.6" fill="url(#gr)" />
						<line x1="20" y1="-3" x2="20" y2="-22" stroke="#e9bb45" strokeWidth=".8" />
					</g>
				</symbol>
				{/* a tied sheaf of wheat: stems cross at the band, ears fan out above, cut stems flare below */}
				<symbol id="bundle" viewBox="0 0 120 150">
					{fan.map((a, i) => <use key={a} href="#stalk" x={50.2 + (i - 3) * 2.4} y={26 + (i % 2) * 5} width="19.6" height="112" transform={`rotate(${a * 1.25} 60 100)`} />)}
					<rect x="43" y="93" width="34" height="13" rx="6.5" fill="#c0841c" />
					<rect x="43" y="93" width="34" height="5" rx="2.5" fill="#e0a43a" opacity=".7" />
					<path d="M48 94 l5 12 M56 94 l5 12 M64 94 l5 12 M72 94 l4 12" stroke="#8f5c0a" strokeWidth="1.5" />
					<path d="M74 103 C88 100 94 114 84 120 C82 112 78 108 74 103Z" fill="#d79a2a" />
					<path d="M70 105 C76 116 72 126 64 130 C66 120 68 112 70 105Z" fill="#c0841c" />
				</symbol>
				{/* whole Triticum aestivum plant: tillers + long arching blade leaves */}
				<symbol id="plant" viewBox="0 0 200 300">
					<path d="M100 292 C60 250 30 200 18 130 C48 168 88 232 100 292Z" fill="#c9b25a" opacity=".85" />
					<path d="M100 292 C140 252 172 204 186 136 C154 172 112 232 100 292Z" fill="#dcc572" opacity=".85" />
					<path d="M100 292 C84 240 66 196 60 150 C84 186 100 240 100 292Z" fill="#d3bd66" opacity=".9" />
					{plant.map(([a, h]) => <use key={a} href="#stalk" x={100 - h * 0.0893} y={292 - h} width={h * 0.1786} height={h} transform={`rotate(${a} 100 292)`} />)}
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
				<svg key={i} viewBox="0 0 40 224" style={{ "--i": i, "--h": `${46 + ((i * 37) % 26)}px` }}><use href="#stalk" /></svg>
			))}
		</div>
	);
}

const BUNDLES = [
	{ x: 0, y: 0, d: 0, s: 1 }, { x: 128, y: 0, d: 0.22, s: 1.08 }, { x: 256, y: 0, d: 0.44, s: 1 },
	{ x: 64, y: 96, d: 0.86, s: 1 }, { x: 192, y: 96, d: 1.08, s: 1 },
];

function Loader({ out }) {
	return (
		<div className={`loader ${out ? "out" : ""}`} role="status" aria-label="Loading">
			<Grains />
			<div className="lbox">
				<img className="lwheat" src="images/wheat-strands.png" alt="" aria-hidden="true" />
				<img className="llogo" src={LOGO} alt="Jayakrishna – Quality lies in Consistency" />
				<p className="lyears">Trusted for 40 years</p>
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
	const [form, setForm] = useState({ name: "", phone: "", biz: "", type: TYPES[0], region: "", msg: "", website: "" });
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

	const lastSend = useRef(0);
	// strip control characters / angle brackets, collapse whitespace, cap length
	const clean = (v, max) => String(v).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
	const submit = (e) => {
		e.preventDefault();
		if (form.website) { setSent(true); return; }            // honeypot: bots fill hidden fields
		if (Date.now() - lastSend.current < 8000) return;       // basic rate limit
		const v = { name: clean(form.name, 60), phone: clean(form.phone, 20), biz: clean(form.biz, 80), region: clean(form.region, 80), msg: clean(form.msg, 800) };
		const type = TYPES.includes(form.type) ? form.type : TYPES[0];
		const er = {};
		if (!/^[\p{L}\p{M}.'\- ]{2,60}$/u.test(v.name)) er.name = "Enter your full name";
		if (!/^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(v.phone)) er.phone = "Enter a valid 10-digit mobile number";
		setErrs(er);
		if (Object.keys(er).length) return;
		lastSend.current = Date.now();
		const body = `Name: ${v.name}\nPhone: ${v.phone}\nBusiness: ${v.biz}\nType: ${type}\nRegion: ${v.region}\n\n${v.msg}`;
		window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Partnership enquiry: " + type)}&body=${encodeURIComponent(body)}`;
		setSent(true);
	};
	const f = (k, max = 120) => ({ value: form[k], maxLength: max, onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

	const navItems = [
		["Home", "home"],
		["About", "about", [["About Jayakrishna", "about"], ["Vision & Mission", "vision"]]],
		["Gallery", "gallery"], ["Insights", "insights"], ["Testimonials", "testimonials"], ["Contact Us", "contact"],
	];

	return (
		<div className={`app ${ready ? "ready" : ""}`}>
			<Defs />
			{!gone && <Loader out={ready} />}
			<div className="sprog" aria-hidden="true" />
			<div className="topbar">
				<div className="wrap row between">
					<div className="row gap">
						<span className="hide-xs">📍 Thirumangalam, Madurai, TN</span>
						<a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a>
						<a href={`tel:${PHONE2.replace(/\s/g, "")}`}>📞 {PHONE2}</a>
						<a href={`mailto:${EMAIL}`} className="hide-sm">✉️ {EMAIL}</a>
					</div>
					<div className="row gap">
						<span className="fssai hide-sm">★ 40 YEARS OF TRUST · FSSAI CERTIFIED</span>
						<button className="lang" onClick={() => setLang(lang === "en" ? "ta" : "en")} aria-label="Switch language">
							🌐 {lang === "en" ? "Tamil (தமிழ்)" : "English"}
						</button>
					</div>
				</div>
			</div>

			<header className={`nav ${scrolled ? "scrolled" : ""}`}>
				<div className="wrap row between">
					<a href="#home" className="logo" onClick={(e) => { e.preventDefault(); nav("home"); }} aria-label="Jayakrishna Flour Mills – home">
							<img src={LOGO} alt="Jayakrishna – Quality lies in Consistency" />
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
						<a className="pill" href={ECOMMERCE_URL} target="_blank" rel="noopener noreferrer">🛒 {t("E-Commerce")}</a>
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
							<div className="chips up" style={{ "--d": "100ms" }}>
									<span className="chip big">🌾 {t("Every grain matters to us")}</span>
									<span className="chip big gold">🏆 {t("40 Years of Trust")}</span>
								</div>
							<h1 className={`wd ${lang === "ta" ? "ta" : ""} ${ready ? "in" : ""}`}>
								{lang === "ta"
									? <><Words text={TA.h1} base={2} /><span className="l2"><Words text={TA.h2} base={5} /></span></>
									: <><Words text="Built with Purpose." base={2} /><span className="l2"><Words text="Milled for Healthy Living." base={5} /></span></>}
							</h1>
							<p className="lead up" style={{ "--d": "1100ms" }}>Discover Jayakrishna Flour Mills — 40 years of premium whole wheat atta, superfine maida, and golden suji shaped by quality, pure wheat grains, and continuous innovation.</p>
							<p className="label up" style={{ "--d": "1250ms" }}>OUR TRUSTED BRANDS:</p>
							<div className="row gap wrapx">
								{BRANDS.map((b, i) => (
									<div key={b.id} className="brand up" style={{ "--d": `${1350 + i * 120}ms` }}>
										<img className="blogo" src={b.logo} alt={`${b.name} logo`} />
										<span><b>{b.name}</b><small>{b.sub}</small></span>
									</div>
								))}
							</div>
							<div className="row gap wrapx cta up" style={{ "--d": "1750ms" }}>
								<a className="btn" href={ECOMMERCE_URL} target="_blank" rel="noopener noreferrer">{t("E-Commerce")} →</a>
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
							<img className="heroWheat" src="images/wheat-bundle.png" alt="" aria-hidden="true" decoding="async" />
							<div className="seal" aria-label="40 years of trust"><b>40</b><span>YEARS</span><small>OF TRUST</small></div>
								<div className="float f1">🌾 100% Unbleached &amp; Safe</div>
							<div className="float f2">✨ 21–22 Paratas per kg</div>
						</div>
					</div>
				</section>

				<div className="marquee" aria-label="Why bakers choose our maida">
					<div className="mtrack">
						{[0, 1].map((n) => (
							<ul key={n} aria-hidden={n === 1}>
								{HIGHLIGHTS.map((h) => <li key={h}><i>✦</i>{h}</li>)}
							</ul>
						))}
					</div>
				</div>

				{/* ABOUT */}
				<section id="about" className="sec white aboutsec">
					<img className="plant pl" src="images/wheat-bundle.png" alt="" aria-hidden="true" decoding="async" />
					<img className="plant pr" src="images/wheat-bundle.png" alt="" aria-hidden="true" decoding="async" />
					<div className="wrap center">
						<span className="chip rv">ABOUT JAYAKRISHNA FLOUR MILLS</span>
						<h2 className="wd rv"><Words text="Where experience meets a forward-looking approach." /></h2>
						<span className="latin rv">🌾 <i>Triticum aestivum</i> · Common Bread Wheat</span>
						<p className="muted narrow rv" style={{ "--d": "150ms" }}>For 40 years we have milled with one promise: quality lies in consistency. Flour is valuable, versatile and nutritious. Packed with vitamins and minerals, it forms an essential foundation of daily life — from fresh morning rotis to artisanal bakery loaves.</p>
						<div className="years rv z" style={{ "--d": "200ms" }}>
							{YEARS.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
						</div>
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

				{/* TESTIMONIALS */}
				<section id="testimonials" className="sec tsec">
					<div className="wrap center">
						<span className="chip rv">BAKER &amp; MERCHANT TESTIMONIALS</span>
						<h2 className="wd rv"><Words text="Trusted by the people who bake and sell with us" /></h2>
						<p className="muted narrow rv" style={{ "--d": "150ms" }}>For 40 years, hoteliers, bakers and bulk buyers have counted on Jayakrishna Flour Mills for the same quality in every bag.</p>
						<div className="tgrid">
							{TESTIMONIALS.map((x, i) => (
								<figure className="tcard rv" style={{ "--d": `${i * 130}ms` }} key={x.who}>
									{x.badge && <span className="tbadge">✦ {x.badge}</span>}
									<blockquote>{x.quote}</blockquote>
									<figcaption>
										<i className="av" aria-hidden="true">{x.init}</i>
										<span><b>{x.who}</b>{x.role && <small>{x.role}</small>}</span>
									</figcaption>
								</figure>
							))}
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
								<label>Full Name *<input placeholder="e.g. Anand Kumar" {...f("name", 60)} autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <em className="err">{errs.name}</em>}</label>
								<label>Contact Phone *<input placeholder="+91 93459 11301" inputMode="tel" {...f("phone", 20)} autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <em className="err">{errs.phone}</em>}</label>
								<label>Business / Enterprise Name<input placeholder="Distribution Agency, Bakery, etc." {...f("biz", 80)} autoComplete="organization" /></label>
								<label>Partnership Type<select {...f("type")}>{TYPES.map((x) => <option key={x}>{x}</option>)}</select></label>
								<label className="hp" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" {...f("website", 50)} /></label>
								<label className="full">Operating Region / District<input placeholder="e.g. Madurai, Chennai, Coimbatore, Kerala" {...f("region", 80)} /></label>
								<label className="full">Proposal / Business Details<textarea rows="3" placeholder="Tell us about your distribution reach, existing network, or requirement details..." {...f("msg", 800)} /></label>
							</div>
							<button className="btn wide" type="submit">SUBMIT PARTNERSHIP ENQUIRY ➤</button>
							{sent && <p className="ok" role="status">Your email app should open with the enquiry. If it did not, write to {EMAIL} or call {PHONE}.</p>}
						</form>
						<aside className="rv r">
							<div className="dark">
								<h3>Direct Mill Contacts</h3>
								<div className="crow"><i>📞</i><div><small>Direct Contact</small><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a><br/><a href={`tel:${PHONE2.replace(/\s/g, "")}`}>{PHONE2}</a></div></div>
								
								<div className="crow"><i>✉️</i><div><small>Email Inquiries</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
								<div className="crow"><i>📍</i><div><small>Mill Location & Office</small><span>Jayakrishna Flour Mills<br />{ADDRESS.replace(", Madurai", ",\nMadurai")}</span></div></div>
							</div>
							<div className="map">
								<div className="row between"><b>📌 Thirumangalam Mill Site</b><span className="open">Open Mon-Sat</span></div>
								<iframe title="Mill location map" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin" src="https://www.google.com/maps?q=Thirumangalam,Madurai&output=embed" />
							</div>
						</aside>
					</div>
				</section>
			</main>

			
			<footer>
				<div className="wrap fgrid4 rv">
					<div><p>Milling premium Whole Wheat Atta, Maida, Commercial Atta, and Golden Suji for 40 years across our trusted brand portfolio: Lion, Kili, and Cycle.</p>
						<div className="row gap soc">{[["f", "Facebook"], ["◎", "Instagram"], ["✆", "WhatsApp"]].map(([s, n]) => <a key={n} href={n === "WhatsApp" ? "https://wa.me/919345911301" : "#"} aria-label={n}>{s}</a>)}</div></div>
					<div><h5>COMPANY</h5>
						<a href="#about" onClick={(e) => { e.preventDefault(); nav("about"); }}>About JFM Heritage</a>
						<a href={ECOMMERCE_URL} target="_blank" rel="noopener noreferrer">E-Commerce</a></div>
					<div><h5>CORPORATE POLICIES</h5><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">Return Policy</a><a href="#gallery" onClick={(e) => { e.preventDefault(); nav("gallery"); }}>Plant Infrastructure Gallery</a></div>
					<div><h5>MILL & OFFICE</h5><p>{ADDRESS}</p><a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a><a href={`tel:${PHONE2.replace(/\s/g, "")}`}>📞 {PHONE2}</a><br/><a href={`mailto:${EMAIL}`}>✉️ {EMAIL}</a></div>
				</div>
				<div className="wrap row between wrapx copy"><span>© 2026 Jayakrishna Flour Mills (JFM). All rights reserved. • FSSAI Certified</span><span>Pure wheat nutrition. Milled with consistency for 40 years.</span></div>
			</footer>

		</div>
	);
}
