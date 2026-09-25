// Contextual internal-linking rules for the geo/service architecture:
//   Homepage -> Regional service hub -> City hub -> City + service page -> Supporting content
// Links are chosen by relevance (related service, neighbouring municipality, related article),
// not by linking every page to every other page.

// Priority service families get the strongest reinforcement.
export const PRIORITY_SERVICES = [
  "general-contracting",
  "kitchen-renovations",
  "basement-finishing",
  "additions-adu",
  "home-additions",
];

// Natural, descriptive anchor phrases (lowercase, used mid-sentence).
export const SERVICE_ANCHORS: Record<string, string> = {
  "general-contracting": "full home renovations",
  "kitchen-renovations": "kitchen renovations",
  "basement-finishing": "basement finishing and legal suites",
  "additions-adu": "garden suites and ADUs",
  "home-additions": "home additions",
  "bathroom-renovations": "bathroom remodeling",
  "decks-outdoor": "decks and outdoor living spaces",
  "commercial-renovations": "commercial renovations",
  "roofing": "roofing",
  "flooring": "flooring installation",
  "painting": "interior and exterior painting",
  "windows-and-doors": "window and door replacement",
};

// Services a homeowner on a given service page would logically consider next,
// weighted towards the priority families. Links stay within the same city.
export const RELATED_SERVICES: Record<string, string[]> = {
  "basement-finishing": ["additions-adu", "general-contracting", "bathroom-renovations", "flooring"],
  "kitchen-renovations": ["general-contracting", "basement-finishing", "home-additions", "flooring"],
  "additions-adu": ["basement-finishing", "home-additions", "general-contracting"],
  "general-contracting": ["kitchen-renovations", "basement-finishing", "home-additions", "additions-adu"],
  "home-additions": ["additions-adu", "general-contracting", "kitchen-renovations"],
  "bathroom-renovations": ["kitchen-renovations", "basement-finishing", "general-contracting"],
  "decks-outdoor": ["home-additions", "general-contracting"],
  "commercial-renovations": ["general-contracting"],
  "roofing": ["home-additions", "windows-and-doors", "general-contracting"],
  "flooring": ["kitchen-renovations", "basement-finishing", "general-contracting"],
  "painting": ["general-contracting", "kitchen-renovations"],
  "windows-and-doors": ["home-additions", "roofing", "general-contracting"],
};

// Bordering Niagara Region municipalities (geographic adjacency only).
export const NEARBY_CITIES: Record<string, string[]> = {
  "st-catharines": ["niagara-on-the-lake", "thorold", "lincoln"],
  "niagara-falls": ["niagara-on-the-lake", "thorold", "welland", "fort-erie"],
  "welland": ["thorold", "pelham", "port-colborne", "niagara-falls"],
  "thorold": ["st-catharines", "niagara-falls", "welland", "pelham"],
  "port-colborne": ["welland", "wainfleet", "fort-erie"],
  "grimsby": ["lincoln", "west-lincoln"],
  "lincoln": ["st-catharines", "grimsby", "west-lincoln", "pelham"],
  "pelham": ["welland", "thorold", "lincoln", "west-lincoln"],
  "niagara-on-the-lake": ["st-catharines", "niagara-falls"],
  "fort-erie": ["niagara-falls", "port-colborne"],
  "wainfleet": ["port-colborne", "welland", "west-lincoln", "pelham"],
  "west-lincoln": ["grimsby", "lincoln", "pelham", "wainfleet"],
};

// Supporting articles per service, with short descriptive anchors.
export const SERVICE_ARTICLES: Record<string, Array<{ slug: string; anchor: string }>> = {
  "kitchen-renovations": [
    { slug: "kitchen-renovation-timeline-niagara", anchor: "How long a kitchen renovation takes" },
    { slug: "kitchen-renovation-cost-niagara-2024", anchor: "Kitchen renovation cost guide for Niagara" },
  ],
  "basement-finishing": [
    { slug: "basement-finishing-niagara-guide", anchor: "What to know before finishing your basement" },
    { slug: "home-renovation-permits-niagara-ontario", anchor: "Which renovations need a building permit" },
  ],
  "additions-adu": [
    { slug: "home-renovation-permits-niagara-ontario", anchor: "Building permits for Niagara renovations" },
    { slug: "best-home-renovations-for-resale-value-niagara", anchor: "Renovations that add the most resale value" },
  ],
  "general-contracting": [
    { slug: "how-to-choose-a-renovation-contractor-niagara", anchor: "How to choose a renovation contractor" },
    { slug: "home-renovation-permits-niagara-ontario", anchor: "Which renovations need a building permit" },
  ],
  "home-additions": [
    { slug: "best-home-renovations-for-resale-value-niagara", anchor: "Renovations that add the most resale value" },
    { slug: "home-renovation-permits-niagara-ontario", anchor: "Building permits for Niagara renovations" },
  ],
  "bathroom-renovations": [
    { slug: "bathroom-renovation-checklist-niagara", anchor: "Bathroom renovation planning checklist" },
    { slug: "bathroom-renovation-trends-niagara-2024", anchor: "Current bathroom renovation trends" },
  ],
  "windows-and-doors": [
    { slug: "energy-efficient-renovations-niagara", anchor: "Energy-efficient renovation upgrades" },
  ],
  "roofing": [
    { slug: "energy-efficient-renovations-niagara", anchor: "Energy-efficient renovation upgrades" },
  ],
  "flooring": [
    { slug: "basement-finishing-niagara-guide", anchor: "What to know before finishing your basement" },
  ],
};

// Services each article supports (drives the article's "related services" block).
export const ARTICLE_SERVICES: Record<string, string[]> = {
  "how-to-choose-a-renovation-contractor-niagara": ["general-contracting", "kitchen-renovations"],
  "home-renovation-permits-niagara-ontario": ["basement-finishing", "additions-adu", "home-additions"],
  "best-home-renovations-for-resale-value-niagara": ["kitchen-renovations", "basement-finishing", "additions-adu"],
  "kitchen-renovation-timeline-niagara": ["kitchen-renovations", "general-contracting"],
  "energy-efficient-renovations-niagara": ["windows-and-doors", "roofing", "home-additions"],
  "bathroom-renovation-checklist-niagara": ["bathroom-renovations", "basement-finishing"],
  "kitchen-renovation-cost-niagara-2024": ["kitchen-renovations", "general-contracting"],
  "bathroom-renovation-trends-niagara-2024": ["bathroom-renovations", "kitchen-renovations"],
  "basement-finishing-niagara-guide": ["basement-finishing", "additions-adu"],
};

// Largest municipalities by population, used when an article links to city-level pages.
export const ARTICLE_FEATURED_CITIES = ["st-catharines", "niagara-falls", "welland"];
