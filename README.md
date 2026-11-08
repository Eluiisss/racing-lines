# Racing Lines

A public automotive museum for original vehicle drawings and factual, rights-conscious car records. The initial implementation is a static Astro site with React available for interactive components; visitor accounts and social features are out of scope for this first milestone.

## Requirements

- Node.js `22.23.4` or newer (the version in `.node-version` is the project baseline)
- npm `9.6.5` or newer

## Local development

```sh
npm install
npm run dev
```

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Astro development server |
| `npm run check` | Run Astro and TypeScript diagnostics |
| `npm run build` | Create the static production site in `dist/` |
| `npm run preview` | Preview the production build locally |

Car records are JSON files validated by the Astro content collection. Follow [the car content guide](./docs/car-content.md) to add records and original SVG drawings.

## Public deployment on Cloudflare Pages

Cloudflare Pages can host the generated site publicly; no visitor login or backend is required for the museum pages.

1. Connect the project repository to Cloudflare Pages.
2. Set the build command to `npm run build` and the output directory to `dist`.
3. Configure the Node.js version as `22.23.4` or newer (for example, set `NODE_VERSION` in the Pages build environment).
4. Deploy. Pages will provide a public `*.pages.dev` address; a custom domain can be attached in Cloudflare.

This project uses Astro's static output and does not require the Cloudflare SSR adapter. Future accounts, comments, posts, or other social features will need a separate backend, storage, and moderation design.

## Design handoff

The [Home Figma design](https://www.figma.com/design/ziA7SeVeTvfIynGGz4wDec/Racing-Lines?node-id=602-2272) is not marked Ready-to-dev. Visual implementation should wait for approved design context for each section; the current written brief is [DESIGN.md](./DESIGN.md).
