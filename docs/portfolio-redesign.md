# Current site: October 26, 2026

The current design is a typography-led personal portfolio. It replaces the simulated room, CRT monitor, decorative project diagrams, scanlines, ambient audio, and small display labels with normal document scrolling, a single type family, direct writing, and a visible project index. This revision responds to the user's request to remove the generated/template appearance.

## Direction and references

Reviewed [Paco Coursey](https://paco.me/), [Frank Chimero](https://frankchimero.com/), and [Rauno Freiberg](https://rauno.me/) as alternative personal-site structures. The final implementation uses its own layout: a large name, an actual portrait, a short introduction, six project rows, and separate pages for the interactive features. No reference site's code, artwork, biography, or project content was copied.

Typography alternatives included system sans-serif, [Public Sans](https://digital.gov/resources/an-introduction-to-typography), and [IBM Plex Sans](https://www.ibm.com/plex/). The selected font is IBM Plex Sans at weights 400–600, self-hosted as a 40 KB Latin WOFF2 with a system fallback for Devanagari. Its unchanged SIL Open Font License is in `public/fonts/OFL.txt`. There are no Google Fonts requests in the current design. Body text uses 16–21px, with compact labels reserved for secondary information.

The portrait is the user's existing public [GitHub avatar](https://avatars.githubusercontent.com/u/13235054?v=4), saved unchanged as `public/images/ujjwal-nepal.jpg`. It is a real photo, not generated artwork. The former generated room images are no longer loaded by the site or used for social previews.

## Preserved content and behavior

- WhosLive leads the homepage project list and remains prominently featured in the résumé. Personal role and employment dates remain unconfirmed; they have not been invented.
- Farspeak, Fresh KTM, Spelly, HowApp, and Otonomis retain their existing sourced descriptions and career facts.
- Project filters, product-approach tabs with arrow-key navigation, skill filters, contact links and clipboard copying remain available.
- Signal Match and Launch Lab retain their rules, score storage, feedback, restart controls, and result sharing. Game screens now use normal page scrolling.
- The Nepal / US calendar retains all dates, sources, recurring US rules, previews, and Kathmandu / New York clocks. Seasonal colors appear in the accent and calendar panel while the main reading surface remains consistent.
- Existing `#work/...`, `#leadership`, `#arcade`, `#almanac`, `#toolbox`, and terminal URLs still work. The old `?reading=1` URL opens the standard readable site. `/resume/`, GitHub Pages routing, and the primary domain remain unchanged.

## Verification

TypeScript, all nine calendar/game tests, targeted ESLint on the changed files, and the production build pass. Safari review covered desktop, 390px homepage/résumé and 320px almanac layouts, WhosLive details, project filtering, a complete four-round Launch Lab session, Fourth of July preview, product-approach keyboard navigation, and a two-page A4 résumé print preview. Initial compiled CSS is approximately 106 KB versus 166 KB previously; initial JavaScript is approximately 379 KB versus 419 KB.

The sections below are the implementation history of the retired desk design, retained for provenance.

---

# Previous design: Ujjwal's desk

Local redesign of the existing Vite / React portfolio. Preview with `npm run dev`.

The acronym throughout the logo, monitor, terminal, reading view, and favicon is **UJJ**, as requested. The full professional name remains Ujjwal Raj Nepal.

## Verification

- TypeScript check and production build pass.
- Desktop desk and project-detail views visually reviewed in Chrome.
- Phone-width desk, work, and reading views visually reviewed at 390 × 844 using isolated preview frames.
- Project navigation/filtering, terminal `help` and `contact` commands, and email copying verified in Chrome.
- Initial JavaScript was reduced from roughly 680 KB to 408 KB by loading the admin route separately.

## Content source

`src/data/portfolio.ts` is the shared source for the desk, reading view, project details, and printable résumé. Career details and skills are adapted from the existing About, Experience, Skills, and Contact components. No separate résumé file was found in the project or its personal-project parent. The previous gallery explicitly contained sample projects; those were replaced with projects grounded in the experience section and the user's additions. Dates show when engagements began because the existing page labeled every role “Present” and end dates were not available. No employment end dates, education, metrics, testimonials, or project URLs were invented.

The user confirmed that the AR storytelling app is **Spelly**. Its tape, project title, and career description use that name; the former `#work/ar-stories` URL still opens Spelly.

**WhosLive** was added at the user's request as the first project tape. Product details were researched on 16 October 2026 using its [official App Store listing](https://apps.apple.com/us/app/whoslive-live-streaming/id6738203809) and [Google Play listing](https://play.google.com/store/apps/details?id=com.whoslive.app). The case study covers cross-platform stream discovery, personalized feeds, creator follows, and live updates, and links to [whoslive.io](https://whoslive.io/). Its original diagram illustrates the discovery experience. No personal role, employment date, technology stack, or individual contribution has been inferred from the product description; those details await the user. Upcoming live-shopping features are excluded.

**Farspeak** was added on 17 October 2026, following WhosLive in the project collection. The user confirmed their former CTO role and that it preceded WhosLive. The career history, reading view, and printable résumé preserve that sequence as “Before WhosLive,” without inventing dates. Product details come from the [official Farspeak JS/TS repository](https://github.com/farspeak/farspeak-js): document processing, synchronized data and vector embeddings, and natural-language queries. The project links to that repository because the main product website could not be retrieved during research. Product capabilities are labeled separately from personal contributions.

## Reference inspection

Reference: https://felixrieseberg.com/ — inspected 16 October 2026 using the live interactive desktop experience and the static fallback.

| Observed reference | Adaptation |
| --- | --- |
| Rainy late-night room; physical monitor, desk and objects | Original Kathmandu-inspired room artwork, layered desk objects, subtle pointer parallax and animated rain |
| Navigation and monitor input buttons | Six real channels: Home, About, Work, Toolbox, Connect, Terminal; URL hashes support deep links and browser history |
| Work notepad, labeled VHS tapes, company/project selection | Six clickable project tapes; project filter, contribution details, next-tape navigation |
| About presented through an old computer | Scrollable biography and career history inside the monitor |
| Teletext posts | Toolbox organized into five engineering/product disciplines; no fictional blog posts |
| Online directory / BBS | Real GitHub, LinkedIn and email links, clipboard copy, command terminal |
| Keyboard shortcuts | 1–6 channels, C terminal, M sound, Z zoom, R reading mode, Escape home |
| CD player and global mute | Clickable player and sound control for locally synthesized rain; audio starts only after user interaction |
| CRT presentation and camera changes | CSS monitor with scanlines, glass, physical controls, power and zoom transitions |
| Lite version | `/?reading=1`: light, responsive, document-style portfolio sharing the same content |
| Credits | Accessible dialog with inspiration link, artwork attribution, motion toggle and shortcuts |
| — | `/resume`: printable résumé with Save PDF through the browser print dialog |

The room is an original image with interactive HTML/CSS layers, not a reproduced WebGL scene. The reference site's assets, music, blog posts, and personal biography were not copied. Mobile uses a scrolling desk layout and full-height monitor pages. Reduced-motion preferences are honored; scene motion can also be paused manually.

## Artwork

Generated using the built-in image generation tool. Final optimized asset: `public/images/kathmandu-study.jpg`. Original generation retained at `/Users/ujjwalnepal/.codex/generated_images/01a145bd-4696-7e73-a0c1-fba12bf7b476/exec-8934299b-dcb0-42d9-b922-003a35ac2560.png`.

Prompt:

> Use case: stylized-concept. Asset type: background environment for an interactive developer portfolio website, widescreen 16:9. Create a beautifully art-directed photorealistic 3D-rendered cozy retro engineer's study in Kathmandu at blue hour. Camera square-on, eye level, wide composition, desk foreground. Large rain-streaked dark wood framed window behind the desk, Kathmandu rooftops and distant misty Himalayan silhouettes visible through blue dusk, tiny golden lights in houses. Warm amber task lamp on the far LEFT and potted leafy plant at far LEFT, little Nepal travel postcard pinned on right plaster wall and a small strand of muted prayer flags near the window top. Warm walnut desktop spans full width, its back edge at about 73 percent image height and front edge at bottom. CRITICAL: leave the broad middle 60 percent of the desk EMPTY and unobstructed so a large interactive computer monitor can be rendered over it by website code; no computer, no monitor, no television, no keyboard in the generated image. Right side of desk has a small ceramic tea cup and a few closed books near the edge, with center remaining empty. Mood cinematic, tactile, quiet, nostalgic, sophisticated. Rich walnut wood, dusky cobalt and amber palette, subtle atmospheric depth, realistic light bounce, film grain, intimate studio photography. The upper left wall has generous dark negative space for website typography. Full-bleed environment, no UI, no letters, no logos, no watermark. This is an original room, not a recreation of an existing photograph.

## October 2026 expansion

The default room is now daylight, with warm paper monitor surfaces, Inter body type, Lora headings, larger controls, and greatly reduced CRT texture. Seasonal accents preserve a readable light surface. The original evening image remains available in the repository.

The shared portfolio data now emphasizes product direction, entrepreneurship, technical leadership, and delivery alongside engineering. Nine monitor channels include the interactive leadership playbook, arcade, and Nepal / US almanac. The two games are Signal Match (six-pair memory game with a browser-local best score) and Launch Lab (four fictional product decisions with feedback and a shareable result). Shortcut P opens the arcade; digits 1–9 retain the original first six channels.

The résumé has a product-leadership profile, a prominent WhosLive featured-product section, clearer career bullets, leadership capabilities, and technical skills. WhosLive is linked to its product site; a personal title, dates, or individual achievements are not inferred from public product features. Farspeak remains the first confirmed titled role. The printable layout uses A4 and keeps individual roles together. Start dates remain explicitly labeled as starts rather than inferred employment ranges.

### Calendar coverage and sources

- All eleven US federal holidays, with recurring rules and separate weekend observances, follow [OPM](https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/). Fourth of July, Thanksgiving, Christmas, New Year, Memorial Day, Veterans Day, Juneteenth, MLK Day, Labor Day, and Presidents’ Day have distinct themes. Halloween is a separate cultural day, with [Library of Congress context](https://guides.loc.gov/chronicling-america-halloween).
- Nepali dates are explicit annual records for BS 2083 through April 2027, plus Holi 2026. Sources: [Kathmandu Metropolitan City calendar](https://kathmandu.gov.np/en/calendar), [BS 2083 public-holiday reference](https://www.pradhanlaw.com/publications/list-of-public-holidays-2083-202627), and [Australian Embassy Kathmandu holidays](https://nepal.embassy.gov.au/kmdu/001.html). The government calendar is preferred for festival dates over overseas embassy closure dates.
- [Pashupati Area Development Trust](https://www.pashupati.gov.np/festivals/) informs festival descriptions. Dashain spans Ghatasthapana to Kojagrat Purnima, with a separate Vijaya Dashami event; Tihar distinguishes Kaag, Kukur / Laxmi Puja, Gai, Mha Puja / Nepal Sambat, and Bhai Tika. Themes also cover Buddha Jayanti, Teej, Chhath, Shivaratri, Janai Purnima, Lhosar traditions, jatras, Maghi, and Yomari / Udhauli without treating them as interchangeable festivals.
- Future Nepali lunar dates are not extrapolated. Years beyond the verified calendar retain seasons and US recurring dates. Extend `nepaliEvents` in `src/lib/calendar.ts` each year from a verified source.
- Automatic dates follow Kathmandu time. The almanac shows live Kathmandu and New York clocks, accounts for New York daylight saving time, allows date/theme previews, and can return immediately to today. All coinciding events remain visible; an explicit theme preview can select either culture’s theme.

### Verification for this expansion

- Nine automated tests cover all eleven 2026 US federal observances, cross-year weekend rules, Thanksgiving recurrence, Kathmandu midnight, distinct holiday themes, verified Nepali dates, coinciding events, memory-game guards and completion, and all 81 Launch Lab paths.
- TypeScript, targeted ESLint for changed components, and production build pass. The Pages workflow runs the calendar/game tests before building.
- Safari checks include daylight desktop appearance, 390px home and résumé layouts, 320px almanac, memory-card mismatch/reset behavior, a complete four-decision Launch Lab session, Fourth of July and Tihar previews, return to today, and résumé print preview.

### Daylight artwork

Created by editing the existing room with the built-in image-generation tool (no CLI generation). Original PNG retained at `/Users/ujjwalnepal/.codex/generated_images/01a170e6-9623-7750-bffe-d50306a86bb7/exec-834beaf2-b265-40d4-b961-4b169ffa1a6d.png`. Delivery asset: `public/images/kathmandu-study-daylight.jpg`, converted to JPEG at quality 85. The daylight asset is used for the room and social previews.

Final prompt:

> Use case: lighting-weather. Edit target: the attached original Kathmandu study background used behind an interactive portfolio. Change this exact room from gloomy rainy blue-hour to a bright, inviting late-morning workspace with soft natural daylight. Preserve the same straight-on camera, 16:9 landscape composition, empty broad wooden desktop occupying the bottom quarter, window placement, architectural details, plants, cup, books and distant Himalayan view. Keep the broad center of the desk completely empty because a computer is rendered in HTML there. Bright cream/plaster walls, warm honey walnut wood clearly visible, pale blue sky with soft white clouds, clean transparent window glass without rain, bright hazy Himalayan mountains, sunlit Kathmandu rooftops. Sophisticated, tactile photoreal 3D/editorial lighting, natural soft shadows, airy calm warm mood, substantially brighter overall exposure and readable left wall. No new objects, no computer, no UI, no text or logos, no watermark. Output a wide landscape background at least 1600px wide if possible.
