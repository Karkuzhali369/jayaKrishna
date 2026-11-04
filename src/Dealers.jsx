import { useCallback, useEffect, useRef, useState } from "react";

/* WhatsApp number that receives every dealer / commercial enquiry (country code + number, no "+" or spaces) */
const WA_NUMBER = "919345911291";
const TYPES = ["Dealership / Distributorship", "Bakery / Hotel Supply", "Bulk Commercial Supply", "Retail / Wholesale"];

/* characters that are easy to tell apart (no 0/O, 1/I/L) */
const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CAPTCHA_LEN = 5;
const makeCode = () => {
	const a = new Uint32Array(CAPTCHA_LEN);
	crypto.getRandomValues(a);
	return Array.from(a, (n) => CHARS[n % CHARS.length]).join("");
};

/* strip control characters / angle brackets, collapse whitespace, cap length */
const clean = (v, max) => String(v).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/* Captcha image drawn on a canvas: random code, noise lines and dots, every letter rotated and shifted */
function CaptchaImage({ code }) {
	const ref = useRef(null);
	useEffect(() => {
		const c = ref.current;
		if (!c) return;
		const W = 176, H = 56, dpr = Math.min(window.devicePixelRatio || 1, 2);
		c.width = W * dpr; c.height = H * dpr;
		const g = c.getContext("2d");
		g.scale(dpr, dpr);
		const r = (a, b) => a + Math.random() * (b - a);
		const bg = g.createLinearGradient(0, 0, W, H);
		bg.addColorStop(0, "#fff6d6"); bg.addColorStop(1, "#ffe8a3");
		g.fillStyle = bg; g.fillRect(0, 0, W, H);
		for (let i = 0; i < 7; i++) {
			g.strokeStyle = `rgba(${Math.floor(r(80, 160))},${Math.floor(r(50, 100))},10,${r(0.25, 0.5)})`;
			g.lineWidth = r(1, 2);
			g.beginPath(); g.moveTo(r(0, W), r(0, H));
			g.bezierCurveTo(r(0, W), r(0, H), r(0, W), r(0, H), r(0, W), r(0, H)); g.stroke();
		}
		for (let i = 0; i < 70; i++) {
			g.fillStyle = `rgba(90,55,0,${r(0.1, 0.4)})`;
			g.fillRect(r(0, W), r(0, H), 2, 2);
		}
		g.textBaseline = "middle"; g.textAlign = "center";
		const step = W / (code.length + 1);
		[...code].forEach((ch, i) => {
			g.save();
			g.translate(step * (i + 1) + r(-3, 3), H / 2 + r(-5, 5));
			g.rotate(r(-0.38, 0.38));
			g.font = `800 ${Math.floor(r(28, 34))}px "Plus Jakarta Sans", Arial, sans-serif`;
			g.fillStyle = `hsl(${Math.floor(r(20, 40))},${Math.floor(r(70, 90))}%,${Math.floor(r(14, 28))}%)`;
			g.fillText(ch, 0, 0);
			g.restore();
		});
	}, [code]);
	return <canvas ref={ref} className="cap-img" style={{ width: 176, height: 56 }} role="img" aria-label="Captcha image. Type the characters you see." />;
}

export default function Dealers({ phone, email, onHome }) {
	const blank = { name: "", phone: "", biz: "", type: TYPES[0], region: "", msg: "", website: "" };
	const [form, setForm] = useState(blank);
	const [errs, setErrs] = useState({});
	const [sentUrl, setSentUrl] = useState("");
	const [code, setCode] = useState(makeCode);
	const [answer, setAnswer] = useState("");
	const lastSend = useRef(0);

	const refresh = useCallback(() => { setCode(makeCode()); setAnswer(""); }, []);
	const f = (k, max = 120) => ({ value: form[k], maxLength: max, onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

	const submit = (e) => {
		e.preventDefault();
		if (form.website) { setSentUrl("#"); return; }               // honeypot: bots fill hidden fields
		if (Date.now() - lastSend.current < 8000) return;            // basic rate limit
		const v = { name: clean(form.name, 60), phone: clean(form.phone, 20), biz: clean(form.biz, 80), region: clean(form.region, 80), msg: clean(form.msg, 800) };
		const type = TYPES.includes(form.type) ? form.type : TYPES[0];
		const er = {};
		if (!/^[\p{L}\p{M}.'\- ]{2,60}$/u.test(v.name)) er.name = "Enter your full name";
		if (!/^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(v.phone)) er.phone = "Enter a valid 10-digit mobile number";
		const typed = answer.trim().toUpperCase();
		if (!typed) er.captcha = "Type the characters shown in the image";
		else if (typed !== code) er.captcha = "Captcha does not match. A new one has been generated, please try again";
		setErrs(er);
		if (Object.keys(er).length) { if (er.captcha && typed) refresh(); return; }

		lastSend.current = Date.now();
		const text = [
			"*New Dealership / Commercial Enquiry*",
			"Jayakrishna Flour Mills website",
			"",
			`*Name:* ${v.name}`,
			`*Phone:* ${v.phone}`,
			`*Business:* ${v.biz || "-"}`,
			`*Enquiry type:* ${type}`,
			`*Region:* ${v.region || "-"}`,
			"",
			`*Details:* ${v.msg || "-"}`,
		].join("\n");
		const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
		window.open(url, "_blank", "noopener,noreferrer");
		setSentUrl(url);
		setForm(blank);
		refresh();
	};

	return (
		<section id="dealers" className="sec white dealers-page">
			<div className="wrap">
				<a href="#/" className="backlink" onClick={(e) => { e.preventDefault(); onHome(); }}>← Back to home</a>
				<form className="enq dform" onSubmit={submit} noValidate>
					<span className="chip">DEALERSHIP & COMMERCIAL ENQUIRIES</span>
					<h1 className="dtitle">Partner with Jayakrishna Flour Mills</h1>
					<p className="muted small">Expand your wholesale business with our trusted milling legacy. Reach out for dealership or commercial supply contracts. Your enquiry is sent to our team on WhatsApp.</p>
					<div className="fgrid">
						<label>Full Name *<input placeholder="e.g. Anand Kumar" {...f("name", 60)} autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <em className="err">{errs.name}</em>}</label>
						<label>Contact Phone *<input placeholder="+91 93459 11291" inputMode="tel" {...f("phone", 20)} autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <em className="err">{errs.phone}</em>}</label>
						<label>Business / Enterprise Name<input placeholder="Distribution Agency, Bakery, etc." {...f("biz", 80)} autoComplete="organization" /></label>
						<label>Partnership Type<select {...f("type")}>{TYPES.map((x) => <option key={x}>{x}</option>)}</select></label>
						<label className="hp" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" {...f("website", 50)} /></label>
						<label className="full">Operating Region / District<input placeholder="e.g. Madurai, Chennai, Coimbatore, Kerala" {...f("region", 80)} /></label>
						<label className="full">Proposal / Business Details<textarea rows="3" placeholder="Tell us about your distribution reach, existing network, or requirement details..." {...f("msg", 800)} /></label>
						<div className="full captcha">
							<span className="cap-label">Security check *</span>
							<div className="cap-row">
								<CaptchaImage code={code} />
								<button type="button" className="cap-refresh" onClick={refresh} aria-label="Get a new captcha">↻</button>
								<input value={answer} onChange={(e) => setAnswer(e.target.value)} maxLength={CAPTCHA_LEN} placeholder="Type the code" autoComplete="off" autoCapitalize="characters" spellCheck="false" aria-label="Captcha characters" aria-invalid={!!errs.captcha} />
							</div>
							{errs.captcha && <em className="err" role="alert">{errs.captcha}</em>}
						</div>
					</div>
					<button className="btn wide" type="submit">SUBMIT PARTNERSHIP ENQUIRY ➤</button>
					{sentUrl && <p className="ok" role="status">Thank you! WhatsApp should open with your enquiry ready to send. Please press <b>Send</b> in WhatsApp to deliver it. {sentUrl !== "#" && <>If it did not open, <a href={sentUrl} target="_blank" rel="noopener noreferrer">tap here to open WhatsApp</a>. </>}You can also call us on {phone} or write to {email}.</p>}
				</form>
			</div>
		</section>
	);
}
