import type { APIRoute } from "astro";
import logo from "../assets/jl-logo.svg?raw";

/**
 * /favicon.svg, generated at build time from the same JL logo as the header.
 * The wide artwork is centred on a square canvas and switches to white on dark browser chrome.
 */
export const GET: APIRoute = () => {
  const [, w, h] = logo.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) ?? [, "389", "161"];
  const size = Math.max(+w, +h);
  const x = (+w - size) / 2;
  const y = (+h - size) / 2;

  const body = logo
    .replace(/<svg[^>]*>/, (tag) =>
      tag
        .replace(/\swidth="[^"]*"/, "")
        .replace(/\sheight="[^"]*"/, "")
        .replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${size} ${size}"`) +
      "<style>path{fill:#2C2C2C;stroke:#2C2C2C}@media (prefers-color-scheme:dark){path{fill:#fff;stroke:#fff}}</style>",
    );

  return new Response(body, { headers: { "Content-Type": "image/svg+xml" } });
};
