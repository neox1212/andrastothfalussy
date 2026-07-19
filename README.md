# András Tóthfalussy — public-record advisory (static site)

A static rebuild of andrastothfalussy.com. No build step, no framework, no
external dependencies. Every page is plain HTML; one shared stylesheet and one
tiny script. It runs anywhere that serves files — including GitHub Pages.

## Files

- `index.html` — Start
- `updates.html` — Updates (news feed, timeline, comparison table)
- `known-associates.html` — Known Associates
- `sources.html` — Sources
- `about-the-author.html` — About the author
- `links.html` — Links
- `404.html` — not-found page
- `assets/styles.css` — all styling
- `assets/app.js` — mobile menu toggle only (no tracking, no cookies)
- `robots.txt`, `sitemap.xml`, `.nojekyll` — housekeeping

All internal links are **relative**, so the site works at a root domain
(andrastothfalussy.com) *and* at a project sub-path
(username.github.io/reponame/) without changes.

## Contact address

The contact links use **psms.r.us2@gmail.com** (mailto). To change it later,
find-and-replace that address across the `.html` files — it appears in
`index.html` and `known-associates.html`. Note: this address is publicly visible
on the site, so expect some spam over time.

## Publish on GitHub Pages (test on a github.io address first)

### Option A — through the GitHub website (no command line)

1. Sign in to GitHub. Click **New repository**. Name it anything, e.g.
   `andrastothfalussy-site`. Set it to **Public**. Create it.
2. On the empty repo page, click **uploading an existing file**. Drag in every
   file and the `assets` folder from this project. Commit.
3. Go to **Settings → Pages**. Under **Build and deployment → Source**, choose
   **Deploy from a branch**. Pick branch **main** and folder **/ (root)**. Save.
4. Wait about a minute. The page shows your live URL, which will look like
   `https://<your-username>.github.io/andrastothfalussy-site/`. That is your test
   site.

### Option B — with git on your machine

```bash
cd andrastothfalussy-site
git init
git add .
git commit -m "Initial static site"
git branch -M main
git remote add origin https://github.com/<your-username>/andrastothfalussy-site.git
git push -u origin main
```

Then do step 3 above (Settings → Pages) to switch it on.

### Tip: get the cleanest test URL

If you name the repository exactly `<your-username>.github.io`, the site is
served at `https://<your-username>.github.io/` (no sub-path). That most closely
matches how it will look on your own domain later.

## Later — point andrastothfalussy.com at GitHub Pages

Only do this once you are happy with the test site.

1. In the repo, **Settings → Pages → Custom domain**, enter
   `andrastothfalussy.com` and save. This creates a `CNAME` file in the repo.
2. At GoDaddy (DNS for the domain), add these records:
   - Four **A** records for the apex/root `@` pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `<your-username>.github.io`
   *(Confirm the current GitHub Pages IPs in GitHub's own docs before saving —
   they are stable but worth a check.)*
3. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is
   issued (can take a few minutes to a few hours).

DNS changes can take time to propagate. Nothing here touches your existing
GoDaddy site until you change those DNS records, so the switch is reversible.

## Images

All six images from the old site are carried over. For now they are loaded
directly from the same GoDaddy image CDN the old site used
(`img1.wsimg.com/...`), with `referrerpolicy="no-referrer"` so GitHub Pages can
display them. They are:

- header banner (used on every page)
- three on the Start page (a documentation gallery)
- one on the Updates page
- the author portrait on the About page

**Important caveat.** Because they load from GoDaddy's CDN, they keep working
only as long as that GoDaddy account keeps hosting them. If you ever delete the
old GoDaddy site, they could disappear. To fully own them (recommended before
you rely on this long-term): download the six image files from your GoDaddy
media library, drop them into the `assets/` folder, and change each
`https://img1.wsimg.com/...` reference to a local path like
`assets/header.png`. Send me the files and I will localise them for you.

Placement and captions were set by me; the gallery captions are generic
("Click to enlarge"). Tell me what each image should say and I will caption them
properly.

## What changed from the GoDaddy version

- The **My Account / login** area is gone. GitHub Pages serves static files and
  cannot run a server-side login. The old "Membership section added" update has
  been removed accordingly.
- The **contact form** is replaced by a **mailto** button and links (your call
  on the address, see above). No form service, no reCAPTCHA, no cookies.
- The Start page now opens with an **official public-record dossier** panel
  (subject data, status) and an advisory-notice band. This gives the serious,
  register-style look while the notice and footer state clearly that the site is
  independent, not a government or law-enforcement body, and makes no allegation
  of criminal liability.
- The **summary judgment** is updated: the Updates page leads with the signed
  order of 15 July 2026 (Filing # 252525224), and the Start page reflects that
  the written order is now entered.
- Content is otherwise the same text as the live site, reorganised into a
  cleaner layout with a dedicated "pattern" section on the Start page.
