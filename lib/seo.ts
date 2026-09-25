// Shared SEO logic for the service x location matrix.
//
// Titles: the root layout's title.template appends "| Niagara Renovation Company",
// so every value returned here is WITHOUT the brand. Never add the brand in a
// page-level title string — use `title: { absolute: ... }` if a page needs full control.

// Primary search term per service family, used as "PRIMARY SERVICE + LOCATION".
const SERVICE_TITLE_TERMS: Record<string, string> = {
  "basement-finishing": "Basement Renovations",
  "kitchen-renovations": "Kitchen Renovations",
  "additions-adu": "ADU Builder",
  "general-contracting": "General Contractor",
  "home-additions": "Home Additions",
  "bathroom-renovations": "Bathroom Renovations",
  "decks-outdoor": "Decks & Outdoor Living",
  "commercial-renovations": "Commercial Renovations",
  "roofing": "Roofing Contractor",
  "flooring": "Flooring Installation",
  "painting": "Painting Contractor",
  "windows-and-doors": "Window & Door Replacement",
};

export function serviceTitleTerm(serviceSlug: string, fallbackName: string): string {
  return SERVICE_TITLE_TERMS[serviceSlug] ?? fallbackName;
}

/** e.g. "Kitchen Renovations St. Catharines" — the layout template adds the brand. */
export function serviceLocationTitle(serviceSlug: string, fallbackName: string, location: string): string {
  return `${serviceTitleTerm(serviceSlug, fallbackName)} ${location}`;
}

// Meta descriptions written per service family so each describes what that
// service actually involves, rather than one sentence with the service/city swapped.
// Keep every template under ~160 characters for the longest location name.
const SERVICE_DESCRIPTIONS: Record<string, (location: string) => string> = {
  "kitchen-renovations": (l) =>
    `Kitchen renovations in ${l}: layout redesigns, custom cabinetry, countertops and islands, with every trade managed by one licensed contractor.`,
  "basement-finishing": (l) =>
    `Basement finishing in ${l}: rec rooms, home offices, legal secondary suites and in-law living space. Moisture checked first, permits handled.`,
  "additions-adu": (l) =>
    `Garden suites, garage conversions and secondary units in ${l}. We review zoning, prepare permit drawings and build your ADU through to occupancy.`,
  "general-contracting": (l) =>
    `General contractor in ${l} for whole-home and multi-trade renovations: permits, trades, scheduling and site supervision under one contract.`,
  "home-additions": (l) =>
    `Home additions in ${l}: rear extensions, second-storey additions and sunrooms that add living space and are built to match your existing house.`,
  "bathroom-renovations": (l) =>
    `Bathroom remodeling in ${l}: walk-in tile showers, tubs, vanities and layout changes, with plumbing, electrical and permits handled by one team.`,
  "commercial-renovations": (l) =>
    `Commercial renovations in ${l} for offices, retail and tenant improvements, with phased or after-hours scheduling to keep your business running.`,
  "flooring": (l) =>
    `Flooring installation in ${l}: hardwood, engineered wood, luxury vinyl plank, laminate and tile, with proper subfloor preparation on every job.`,
  "windows-and-doors": (l) =>
    `Energy Star certified window and door replacement in ${l}, installed with proper flashing and air sealing for comfort and efficiency.`,
  "roofing": (l) =>
    `Roof replacement and repair in ${l}: asphalt and metal roofing, flat roofs, ventilation upgrades and ice and water shield. Free written estimates.`,
  "painting": (l) =>
    `Interior and exterior painting in ${l}, with thorough surface preparation, premium paints and careful, clean work inside and outside your home.`,
  "decks-outdoor": (l) =>
    `Custom decks and outdoor living in ${l}: composite and wood decks, pergolas, railings and patios, built on proper footings with permits handled.`,
};

export function serviceLocationDescription(serviceSlug: string, fallbackName: string, location: string): string {
  const template = SERVICE_DESCRIPTIONS[serviceSlug];
  if (template) return template(location);
  return `${fallbackName} in ${location} by a licensed, insured Niagara Region contractor. Detailed written estimates at no cost.`;
}

export function cityHubDescription(city: string): string {
  return `Home renovations in ${city}: kitchens, basements, bathrooms, additions and full-home projects by a licensed Niagara contractor. Free estimates.`;
}
