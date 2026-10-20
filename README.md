# Leadville Railroad — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://leadvillerailroad.com/ (Leadville, CO).
Preview: https://lvr.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `leadville-railroad` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `lvr.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (optional): `VITE_CONCEPT_END_DATE` (countdown end, defaults to 2026-11-24). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## Design

- Motif: the railroad itself. A split-flap **departure board** right under the hero lists every train (Oktoberfest, Holiday Express, Winter Express, Summer Scenic) with season, trip length, fare and an on-sale status; a cream **"Admit one" ticket** in the hero carries the fares; rail-and-tie dividers and a four-stop **route line** (depot → San Isabel → water tower → Mt. Elbert & Mt. Massive) explain the trip.
- Colors come from their logo herald: pine green #003720, oxblood #8b191b and cream #f6eddd (also the livery of locomotives 1714 and 1918), with the current site's orange #ff7406 kept as the "book" color and a brass #f0c98d accent.
- Rokkitt (heritage slab serif, like timetable and herald lettering), Overpass Mono for the board and labels, Public Sans for body text.
- Section order: departures, the line, rides by season (+ summer specials), seat guide (coach, lounge, caboose, engine cab, new 1007 coach), passenger testimonials, story since 1988, "the dog can come", good to know, groups, plan your visit.
- All booking goes to their existing FareHarbor account (`leadvillerailroad`): the full calendar (flow 1395369), Oktoberfest item 633449, daily scenic calendar 633355 and gift cards 634430, the same links as their homepage buttons.
- Photos and the logo are their own, downloaded from leadvillerailroad.com and recompressed into `src/assets/` for this demo. Get the originals (and permission) from the railroad before a real launch.

## What changed from the current site

- Replaces the Elementor theme with orange slider graphics that have text baked into the images (unreadable on phones, invisible to search engines) and the "Copyright © 2023" footer.
- Phone, address, fares, season dates and the booking calendar are on the first screen instead of spread across a slider, four duplicate ride cards and the Schedule page.
- Fixes broken and odd links: the footer "Holiday Events" link goes to a "page can't be found" page (/holiday-special-events/), and the homepage "Fun" icon links to a post at /hello-world/.
- The Contact page is a Mailchimp brochure signup with a 240-country dropdown; the concept shows the phone and email directly.
- Fixes typos carried across pages ("one sale now", "listed to", "This seasons", "Mrs. Clause", "VACATION ACTIVTY", "Doc Holiday").
- Checked at 1440px and 390px with no sideways scrolling.

## Owner should confirm

- Phone: the site uses 1-866-386-3936 everywhere except one line on the Schedule page that says 866-386-3934. The concept uses 3936.
- Fares ($60 / $40 coach, $90 lounge, $185 caboose, $80+ Holiday Express, group rates $51 / $34 / $76.50, birthday caboose +$350) are copied from the current site and may have changed. Engine-cab and Winter Express prices aren't listed, so none are shown.
- Trip lengths: the homepage labels Holiday Express "2.5 hour" in one card and "2 hour" in another; the Holiday Express page says 2 hours. Oktoberfest and summer trips are 2.5 hours.
- Season wording: "daily Memorial Day weekend through September, weekly October through April" (homepage). Winter Express start date isn't stated ("after the holidays" is our wording). Summer 2027 tickets "late October 2026".
- Wildflower Special and Devil's Tail BBQ dates on the site are for July–September 2026; confirm whether they run in 2027 before listing dates.
- Elevation: 10,152 ft (homepage) vs "11,000 feet" (Oktoberfest page) and "10,000 feet" (FAQ). The concept uses 10,152 ft for the depot.
- "Leadville Colorado & Southern Railroad Company" as the operating company name comes from their cancellation policy text.
- Testimonials (PETERRF1954OV, 675GINGER, LYDIA Z.) are quoted word for word from the homepage, which doesn't say where they were first posted (the usernames look like TripAdvisor). No Google rating is shown because none is on the current site; add one once confirmed.
- No awards or badges appear on the current site, so none are shown.
- The "1007 coach" is described as new for the 2026 Holiday/Winter season; the Winter Seating page still says "Starting on November 15th 2025".
