# Michael Osei Yeboah — Portfolio

Static portfolio site: HTML5, CSS3 and vanilla JavaScript. No build step.

```
MY Portfolio/
├── index.html                      Page structure, content and SEO metadata
├── css/style.css                   All styling (tokens, layout, responsive, reduced motion)
├── js/script.js                    Menu, active nav, scroll reveal, toast, copy email, compose form
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
        └── Michael-Osei-Yeboah-CV.pdf      (the CV visitors download)
cv-source/
├── Michael-Osei-Yeboah-CV.docx             Editable CV (Word / Google Docs / Pages)
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

The form does **not** send messages from the site. It opens the visitor's own email app with a pre-filled message (`mailto:`). To receive submissions directly, use a form service, e.g. Formspree: create a form, then change the `<form>` to `action="https://formspree.io/f/YOUR_ID" method="POST"`, and remove the submit handler in `js/script.js` (the "Compose-email form" block). Update the form's helper text to match.

## Live site

https://michael-osei-yeboah.vercel.app (Vercel project `michael-osei-yeboah`, account tread21).

To publish changes, copy only the site files (`index.html`, `css/`, `js/`, `assets/`) to a folder and run `npx vercel deploy --prod` there, or connect the project to a GitHub repo in the Vercel dashboard so every push deploys.

## Other ways to publish

- **Netlify (easiest):** drag the `MY Portfolio` folder onto https://app.netlify.com/drop.
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → Deploy from branch → `main` / root.
- **Vercel:** import the repo at https://vercel.com/new (framework preset: Other).

After deploying, update the canonical/OG URLs and test the live site on a phone.
