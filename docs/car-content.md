# Adding car records

Each car is a JSON file in `src/content/cars/`. Use a lowercase kebab-case filename that matches its `slug`, for example `mazda-mx-5-na.json`. Astro validates each entry against `src/content.config.ts` during development and builds.

## Record shape

```json
{
  "slug": "example-coupe-1968",
  "status": "draft",
  "make": "Example Motors",
  "model": "Coupe",
  "year": 1968,
  "country": "Example",
  "introduction": "A concise, original summary of this car.",
  "drawings": [
    {
      "src": "/drawings/example-coupe-1968/front-three-quarter.svg",
      "view": "front-three-quarter",
      "label": "Front three-quarter",
      "caption": "Optional original caption."
    }
  ],
  "specifications": {
    "powertrain": [
      { "label": "Engine", "value": "Enter a verified value and units" },
      { "label": "Transmission", "value": "Enter a verified value" }
    ],
    "chassis": [
      { "label": "Layout", "value": "Enter a verified value" }
    ],
    "dimensions": [
      { "label": "Length", "value": "Enter a verified value and units" },
      { "label": "Wheelbase", "value": "Enter a verified value and units" }
    ]
  },
  "history": {
    "format": "highlights",
    "entries": [
      {
        "title": "Original milestone",
        "detail": "Write a concise, factual summary in your own words.",
        "year": 1968
      }
    ]
  },
  "relatedCars": [],
  "sources": [
    {
      "title": "Source title",
      "url": "https://example.com/source"
    }
  ]
}
```

## Content rules

- `slug` is a stable lowercase URL identifier and should match the JSON filename without `.json`.
- `status` defaults to `draft`; use `published` only when the record is ready for public display.
- Use verified values, and include units in measurement values (for example, `4,200 mm`). Empty specification lists are allowed when a value has not been verified.
- The record has three technical groups: Powertrain/Engine, Chassis, and Dimensions. Its fourth information section is History/Legacy.
- History can instead use one or more short, attributed public statements:

  ```json
  {
    "format": "public-statements",
    "entries": [
      {
        "text": "A short statement excerpt, no more than 500 characters.",
        "attribution": "Person or organization",
        "sourceUrl": "https://example.com/source"
      }
    ]
  }
  ```

- Prefer factual summaries written in your own words. Do not copy articles, books, or other protected text. For a public statement, keep any excerpt brief, attribute it, and link its source.
- Add drawings as original SVG files under `public/drawings/<car-slug>/`. A car may have zero to six drawings. Use the `view` enum to identify the perspective and a clear `label` for its accessible name.
- `cutaway` is optional. It takes a `title` and two pixel-aligned SVGs of the same view under the car's drawing folder: `engine` (without bodywork) and `body` (with bodywork), for example `/drawings/ford-gt/v6-engine-no-cover.svg` and `/drawings/ford-gt/v6-engine.svg`. When present, the car page shows the interactive X-ray inspection section before the technical sheet, and the car's timeline card gets an "X-ray" badge.
- `relatedCars` contains the slugs of other records. Check that each referenced car exists before publishing.
- Use `sources` to keep factual provenance for specifications and history.

## Adding an artwork file

For the example above, create `public/drawings/example-coupe-1968/front-three-quarter.svg`, then reference it using the public URL `/drawings/example-coupe-1968/front-three-quarter.svg`. The source illustration should be your own work or otherwise cleared for use.
