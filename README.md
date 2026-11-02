# Michael Osei Yeboah — Portfolio

Static portfolio site: HTML5, CSS3 and vanilla JavaScript. No build step.

```
MY Portfolio/
├── index.html                      Page structure, content and SEO metadata
├── css/style.css                   All styling (tokens, layout, responsive, reduced motion)
├── js/script.js                    Menu, active nav, scroll reveal, toast, copy email, compose form
├── projects/                       Case study pages (sika.html, st-peters.html)
└── assets/
    ├── images/
    │   ├── favicon.svg
    │   ├── hero.jpg                        (stock — Unsplash, Nikita Kachanovsky)
    │   ├── focus-dashboard.jpg             (sample dashboard with illustrative figures; About section card)
    │   ├── profile.jpg                     (your portrait, About section and CV)
    │   ├── project-sika.jpg                (Sika launch poster; shown before the video loads)
    │   ├── project-st-peters.jpg           (screenshot of the St. Peter's website)
    │   ├── project-finance-dashboard.jpg   (screenshot of SME Finance)
    │   ├── project-portfolio.jpg           (screenshot of this site)
    │   └── project-graphic-design.svg      (placeholder — replace with your design work)
    ├── video/
    │   └── sika-launch.mp4                 (first 10 s of the Sika launch video, 720p)
    └── cv/
        ├── Michael-Osei-Yeboah-CV.pdf      (the CV visitors download, 2 pages)
        └── Michael-Osei-Yeboah-Resume.pdf  (one-page résumé)
cv-source/
├── Michael-Osei-Yeboah-CV.docx             Editable CV (Word / Google Docs / Pages)
├── Michael-Osei-Yeboah-Resume.docx         Editable one-page résumé
├── resume.html                             Layout used to produce the résumé PDF
└── cv.html                                 Layout used to produce the current PDF
```

## Updating your CV

1. Open `cv-source/Michael-Osei-Yeboah-CV.docx`. Text highlighted in yellow and in [square brackets] is for you to fill in or delete.
2. Export it as PDF (Word: File → Save As → PDF).
3. Save it over `assets/cv/Michael-Osei-Yeboah-CV.pdf` (keep the file name).

`cv-source/` is not linked from the site; leave it out when you upload the site if you don't want it public.

## Run locally

Double-click `index.html`, or (recommended) serve it so every feature behaves as it will online:

```bash
cd "~/Desktop/MY Portfolio" && python3 -m http.server 8080
```

Then open http://localhost:8080.

## Before publishing — replace placeholders

Search `index.html` for `Placeholder`, `Sample description`, `coming-soon` and `your-domain.com`.

| What | Where |
| --- | --- |
| Hero photo | `assets/images/hero.jpg` is a free Unsplash photo (Nikita Kachanovsky). Replace the file to use your own; remove the `hero--photo` class for the plain gradient |
| Tools strip | Edit the list under "Tools I work with" |
| Project images | Replace files in `assets/images/` (any image around 16:10 works); update `src` if the file name changes |
| Project text & links | Each `<!-- PROJECT n -->` block. Set `href`, delete `data-status="coming-soon"` and the `Sample description` badge |
| Experience & education | Add more entries by copying an existing `<li class="timeline__item">` |
| St. Peter's link | Project 2: set `href` to the live address and delete `data-status="coming-soon"` |
| Skills | Edit chips so they list only tools you actually use |
| CV | See "Updating your CV" above |
| Social links | Contact section: set `href`, delete `data-status="coming-soon"`. WhatsApp: `https://wa.me/233XXXXXXXXX`. The Behance URL also goes on the Graphic Design project link |
| Canonical / OG URLs | `<head>`: replace `https://your-domain.com/` with your live URL |

## Contact form

The form posts to the site's own serverless function, `api/contact.js`, which forwards each message to [FormSubmit](https://formsubmit.co) (free, no account) and on to michaelyeboah735@gmail.com. Going through the site matters: some Ghanaian networks block formsubmit.co directly. The visitor's email is set as the reply-to address, so you can answer with Reply.

**One-time activation:** the first message sent from the live site triggers an email from FormSubmit to that inbox. Click its activation link once (check Spam/Promotions); messages sent before activation are not delivered.

If sending ever fails, the form offers the visitor a pre-filled email in their own app instead. The code is the "Contact form" block in `js/script.js`; to change the receiving address, edit `RECIPIENT` in both `js/script.js` and `api/contact.js`.

## Live site

https://michael-osei-yeboah.vercel.app (Vercel project `michael-osei-yeboah`, account tread21).

Code: https://github.com/TREAD21/portfolio. The repo is connected to Vercel, so **every push to `main` updates the live site** within a minute. `.vercelignore` keeps `README.md`, `cv-source/` and `.claude/` off the website.

- Link previews (WhatsApp, LinkedIn, X) use `assets/images/og-image.jpg` (1200×630).
- Visitor stats: Vercel dashboard → project `michael-osei-yeboah` → Analytics.

## Other ways to publish

- **Netlify (easiest):** drag the `MY Portfolio` folder onto https://app.netlify.com/drop.
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → Deploy from branch → `main` / root.
- **Vercel:** import the repo at https://vercel.com/new (framework preset: Other).

After deploying, update the canonical/OG URLs and test the live site on a phone.
