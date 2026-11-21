import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const specification = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

const history = z.discriminatedUnion("format", [
  z.object({
    format: z.literal("highlights"),
    entries: z
      .array(
        z.object({
          title: z.string().trim().min(1),
          detail: z.string().trim().min(1),
          year: z.number().int().min(1886).max(2100).optional(),
        }),
      )
      .min(1)
      .max(3),
  }),
  z.object({
    format: z.literal("public-statements"),
    entries: z
      .array(
        z.object({
          text: z.string().trim().min(1).max(500),
          attribution: z.string().trim().min(1),
          sourceUrl: z.url(),
        }),
      )
      .min(1),
  }),
]);

const cars = defineCollection({
  loader: glob({
    base: "./src/content/cars",
    pattern: "**/*.json",
  }),
  schema: z.object({
    slug,
    status: z.enum(["draft", "published"]).default("draft"),
    make: z.string().trim().min(1),
    model: z.string().trim().min(1),
    year: z.number().int().min(1886).max(2100),
    country: z.string().trim().min(1).optional(),
    /** Short variant label shown under the title, e.g. "AE86 · 3-door liftback". */
    designation: z.string().trim().min(1).optional(),
    /** Drives the propulsion breakdown on Home. */
    propulsion: z
      .enum(["naturally-aspirated", "turbocharged", "supercharged", "hybrid", "electric"])
      .optional(),
    introduction: z.string().trim().min(1).optional(),
    drawings: z
      .array(
        z.object({
          src: z
            .string()
            .regex(
              /^\/drawings\/[a-z0-9][a-z0-9/_-]*\.svg$/,
              "Use a lowercase SVG path under public/drawings, e.g. /drawings/model/front.svg",
            ),
          view: z.enum([
            "front-three-quarter",
            "rear-three-quarter",
            "front",
            "rear",
            "side",
            "top",
            "interior",
            "detail",
            "other",
          ]),
          label: z.string().trim().min(1),
          caption: z.string().trim().min(1).optional(),
        }),
      )
      .max(6)
      .default([]),
    specifications: z.object({
      powertrain: z.array(specification).default([]),
      chassis: z.array(specification).default([]),
      dimensions: z.array(specification).default([]),
    }),
    history,
    relatedCars: z.array(slug).default([]),
    sources: z
      .array(
        z.object({
          title: z.string().trim().min(1),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { cars };
