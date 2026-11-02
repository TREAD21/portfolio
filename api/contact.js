// Vercel serverless function: POST /api/contact
// Forwards contact-form messages to FormSubmit from Vercel's servers, so visitors whose
// network blocks formsubmit.co can still send. FormSubmit emails them to RECIPIENT.
const RECIPIENT = "michaelyeboah735@gmail.com";
const SITE = "https://michael-osei-yeboah.vercel.app";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Use POST." });
  }

  const body = typeof req.body === "string" ? safeJson(req.body) : (req.body || {});
  const clean = (v, max) => String(v == null ? "" : v).trim().slice(0, max);
  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 5000);

  if (body._honey) return res.status(200).json({ success: true }); // spam trap
  if (!name || !EMAIL_RE.test(email) || !subject || !message) {
    return res.status(400).json({ success: false, message: "Please fill in your name, a valid email, a subject and a message." });
  }

  try {
    const upstream = await fetch("https://formsubmit.co/ajax/" + RECIPIENT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: SITE, Referer: SITE + "/" },
      body: JSON.stringify({
        name, email, message,
        _subject: "Portfolio message: " + subject,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = await upstream.json().catch(() => ({}));
    const ok = upstream.ok && String(data.success) === "true";
    return res.status(ok ? 200 : 502).json({ success: ok, message: data.message || (ok ? "Sent" : "The mail service didn't accept the message.") });
  } catch (err) {
    return res.status(502).json({ success: false, message: "The mail service couldn't be reached." });
  }
};

function safeJson(text) {
  try { return JSON.parse(text); } catch (e) { return {}; }
}
