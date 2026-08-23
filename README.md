# playchicane.com

The public website for **Chicane: Racing Manager**, an iOS racing-team management game.
The game itself lives in a separate repository; this repo is only the marketing site,
the privacy policy, the support page and the press kit.

Static Next.js, exported to plain files, deployed on Vercel. Pushing to `main` deploys to
production at [playchicane.com](https://playchicane.com); `vercel deploy --prod` still works if you
need to ship without a commit.

## Run it

```
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into ./out
```

There is no server, no database and no API route. `next.config.ts` sets `output: "export"`,
so `npm run build` produces a directory of files that any static host can serve.

## Where things are

| Path | What |
|---|---|
| `app/page.tsx` | Home |
| `app/how-it-plays/` | The long explanation of a race weekend |
| `app/press/` | Press kit — fact sheet, descriptions, downloadable screenshots |
| `app/support/` | Support and FAQ |
| `app/privacy/` | Privacy policy |
| `app/og-template/` | Renders the 1200×630 social card. Not linked, `noindex`, excluded from the sitemap. |
| `lib/site.ts` | The facts the site repeats — support address, platform, URL. Change them here. |
| `public/screenshots/` | Web-sized WebP, what the pages actually load |
| `raw-screenshots/` | The full-resolution simulator captures the WebP files are made from |

## Screenshots

`raw-screenshots/` holds unretouched 1206×2622 captures from an iPhone 17 Pro simulator running a
real career. They are the artefact of record: the game is deterministic, but the *career* these came
from is not reproducible from this repo, so don't delete them.

To re-derive the web versions after adding a capture:

```
python3 tools/prep-screenshots.py
```

**Capture with the race paused.** At 2× playback the race moves on between taking a preview and
writing the file, and you end up with a caption describing a frame you no longer have.

## Regenerating the social card

`public/og.png` is a screenshot of `/og-template/`, so the card uses the site's own type rather than
an approximation of it. Build first — capturing against `next dev` can catch a page before its
stylesheet has compiled, which silently produces an unstyled card.

```
npm run build
(cd out && python3 -m http.server 4321) &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,630 \
  --virtual-time-budget=10000 --screenshot=/tmp/og-raw.png http://127.0.0.1:4321/og-template/
# then downsample /tmp/og-raw.png (2400×1260) to 1200×630 into public/og.png
```

## Claims on this site are checked

Everything the site asserts about the game is either verifiable in the game's repository or visible
in a screenshot here. Two things it deliberately does **not** claim, because they are undecided:
a price, and a release date. It also does not promise "no ads" — only that nothing will ever sell
competitive advantage, which is a written, settled decision in the game's ADR 0004.
