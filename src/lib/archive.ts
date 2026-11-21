import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";

export type Car = CollectionEntry<"cars">;
export type CarData = Car["data"];
export type Propulsion = NonNullable<CarData["propulsion"]>;

const PUBLIC_DIR = join(process.cwd(), "public");

/** Published cars, oldest first. Drafts are included in `astro dev` only. */
export async function getArchive(): Promise<Car[]> {
  const cars = await getCollection(
    "cars",
    ({ data }) => data.status === "published" || import.meta.env.DEV,
  );
  return cars.sort(
    (a, b) => a.data.year - b.data.year || a.data.make.localeCompare(b.data.make),
  );
}

export const kebab = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Stable 7-char "commit hash" derived from the slug (FNV-1a, 32-bit). */
export function commitHash(slug: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** Conventional-commit style message for a car record. */
export const commitMessage = (car: CarData) =>
  `feat(${kebab(car.make)}): add ${car.model}`;

const COUNTRY_CODES: Record<string, string> = {
  Japan: "JP",
  "United States": "US",
  "United Kingdom": "GB",
  Germany: "DE",
  Italy: "IT",
  France: "FR",
  Sweden: "SE",
};

export interface Brand {
  name: string;
  slug: string;
  country?: string;
  /** Public URL of a monochrome logo, when `public/brands/<slug>.svg` exists. */
  logo?: string;
}

export function brandOf(car: CarData): Brand {
  const slug = kebab(car.make);
  const logoPath = `/brands/${slug}.svg`;
  return {
    name: car.make,
    slug,
    country: car.country ? (COUNTRY_CODES[car.country] ?? car.country) : undefined,
    logo: existsSync(join(PUBLIC_DIR, logoPath)) ? logoPath : undefined,
  };
}

const dimensionCache = new Map<string, { width: number; height: number }>();

/** Intrinsic size of a public SVG, read from its viewBox, so <img> reserves space. */
export function svgSize(src: string): { width: number; height: number } {
  const cached = dimensionCache.get(src);
  if (cached) return cached;
  let size = { width: 16, height: 5 };
  try {
    const head = readFileSync(join(PUBLIC_DIR, src), "utf8").slice(0, 2000);
    const box = head.match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
    if (box) size = { width: Math.round(+box[1]), height: Math.round(+box[2]) };
  } catch {
    /* keep fallback ratio */
  }
  dimensionCache.set(src, size);
  return size;
}

/** Find a specification value by label across all groups (case-insensitive). */
export function spec(car: CarData, label: string): string | undefined {
  const wanted = label.toLowerCase();
  for (const group of Object.values(car.specifications)) {
    const hit = group.find((s) => s.label.toLowerCase() === wanted);
    if (hit) return hit.value;
  }
  return undefined;
}

/** The four headline figures shown on timeline cards, skipping unverified ones. */
export function headlineSpecs(car: CarData) {
  // Each slot lists accepted labels in order of preference (e.g. Ford only publishes dry weight).
  const slots = [["Engine"], ["Power"], ["Curb weight", "Dry weight"], ["Top speed"]];
  return slots.flatMap((labels) => {
    for (const label of labels) {
      const value = spec(car, label);
      if (value) return [{ label, value }];
    }
    return [];
  });
}

export const PROPULSION_LABELS: Record<Propulsion, string> = {
  "naturally-aspirated": "Naturally aspirated",
  turbocharged: "Turbocharged",
  supercharged: "Supercharged",
  hybrid: "Hybrid",
  electric: "Electric",
};

export function archiveStats(cars: Car[]) {
  const brands = new Map<string, Brand & { count: number }>();
  const propulsion = new Map<Propulsion, number>();
  for (const { data } of cars) {
    const brand = brandOf(data);
    const entry = brands.get(brand.slug) ?? { ...brand, count: 0 };
    entry.count++;
    brands.set(brand.slug, entry);
    if (data.propulsion) propulsion.set(data.propulsion, (propulsion.get(data.propulsion) ?? 0) + 1);
  }
  const years = cars.map((c) => c.data.year);
  return {
    total: cars.length,
    drawings: cars.reduce((n, c) => n + c.data.drawings.length, 0),
    brands: [...brands.values()].sort((a, b) => a.name.localeCompare(b.name)),
    propulsion: [...propulsion.entries()]
      .map(([kind, count]) => ({ kind, label: PROPULSION_LABELS[kind], count }))
      .sort((a, b) => b.count - a.count),
    from: years.length ? Math.min(...years) : undefined,
    to: years.length ? Math.max(...years) : undefined,
  };
}
