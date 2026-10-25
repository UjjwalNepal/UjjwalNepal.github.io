# Ujjwal's desk

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
