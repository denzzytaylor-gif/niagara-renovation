import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import CTABanner from "@/components/CTABanner";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import { CITIES, SERVICES, PHONE, SERVICE_IMAGES } from "@/lib/data";
import { serviceLocationTitle, serviceLocationDescription } from "@/lib/seo";
import { RELATED_SERVICES, NEARBY_CITIES, SERVICE_ANCHORS, SERVICE_ARTICLES } from "@/lib/links";
import { buildLocalPage } from "@/lib/local";

type CityServiceData = typeof CITIES[number];

export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

const cityServiceBodyH2: Record<string, (city: string) => string> = {
  "basement-finishing": (city) => `Finished Basement Renovation Services in ${city}`,
  "kitchen-renovations": (city) => `Kitchen Renovation Services in ${city}`,
  "additions-adu": (city) => `ADU Builds and Garden Suites in ${city}`,
  "general-contracting": (city) => `Full-Service General Contracting in ${city}`,
  "home-additions": (city) => `Home Addition Services for ${city} Properties`,
};

const serviceKeyInclusions: Record<string, string[]> = {
  "basement-finishing": [
    "Moisture assessment and waterproofing remediation",
    "Framing, insulation, drywall, and painting",
    "Pot lighting and electrical panel upgrades",
    "Bathroom rough-in and full bathroom finishing",
    "Flooring: LVP, carpet, or tile",
    "Legal suite and in-law apartment builds",
    "Building permit management",
  ],
  "kitchen-renovations": [
    "Custom or semi-custom cabinetry design and installation",
    "Quartz, granite, or laminate countertops",
    "Kitchen island design and construction",
    "Under-cabinet and pot-light lighting",
    "Plumbing, electrical, and flooring",
    "Full project management — one contract, one team",
    "Building permit coordination where required",
  ],
  "additions-adu": [
    "Property and zoning review before any commitment",
    "Architectural design and engineering drawings",
    "Building permit applications and management",
    "Full structural, framing, and exterior work",
    "Separate electrical service and plumbing",
    "Complete interior finishing to move-in ready",
    "Final occupancy certificate coordination",
  ],
  "general-contracting": [
    "Complete project management and site supervision",
    "Design coordination and permit management",
    "Licensed sub-trade hiring and scheduling",
    "Material procurement and supply chain management",
    "Budget tracking and transparent reporting",
    "Structural and engineering coordination",
    "Final inspection and occupancy support",
  ],
  "home-additions": [
    "Site feasibility and zoning review",
    "Architectural design and permit drawings",
    "Foundation, framing, and structural work",
    "Roofing tie-in and exterior cladding",
    "Electrical, plumbing, and HVAC extension",
    "Full interior finishing to match existing home",
    "Building permit management",
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = CITIES.find(c => c.slug === citySlug);
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!city || !service) return { title: "Not Found" };

  const image = SERVICE_IMAGES[service.slug] || SERVICE_IMAGES["kitchen-renovations"];
  const title = serviceLocationTitle(service.slug, service.name, city.name);
  const description = cityServiceOverrides[`${city.slug}/${service.slug}`]?.metaDescription ?? serviceLocationDescription(service.slug, service.name, city.name);

  return {
    title,
    description,
    alternates: { canonical: `https://www.niagararenovationcompany.com/${city.slug}/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.niagararenovationcompany.com/${city.slug}/${service.slug}`,
      images: [{ url: image, width: 1400, height: 788, alt: `${cityServiceOverrides[`${city.slug}/${service.slug}`]?.serviceLabel ?? service.name} in ${city.name}, Ontario` }],
    },
  };
}

// Mid-sentence wording where lower-casing the service name reads badly
// ("adus & garden suites"). Services not listed keep service.name.toLowerCase().
const cityServiceInlinePhrase: Record<string, string> = {
  "additions-adu": "ADU and garden suite construction",
};

// Singular project noun used in the FAQ questions ("a kitchen renovation project").
const cityServiceFaqNoun: Record<string, string> = {
  "basement-finishing": "basement renovation",
  "kitchen-renovations": "kitchen renovation",
  "additions-adu": "ADU or garden suite",
  "general-contracting": "general contracting",
  "home-additions": "home addition",
  "bathroom-renovations": "bathroom renovation",
  "decks-outdoor": "deck or outdoor living",
  "commercial-renovations": "commercial renovation",
  "roofing": "roofing",
  "flooring": "flooring",
  "painting": "painting",
  "windows-and-doors": "window and door",
};

// Page-specific copy for priority city pages. This copy avoids unconfirmed
// service or process promises, and on these routes the shared sections that
// carry such claims are reworded or hidden. All links are kept.
type CityServiceOverride = {
  metaDescription: string;
  offerDescription: string;
  /** Label used instead of the shared service name in breadcrumb, section headings,
   *  image alt text, link text and schema names (not the title or H1). */
  serviceLabel?: string;
  /** Page-specific H1 (the shared service name and page title are unchanged). */
  h1?: string;
  /** Optional label for the FAQ section heading only (defaults to serviceLabel). */
  faqHeadingLabel?: string;
  heroLine: string;
  bodyH2: string;
  bodySubtitle: string;
  planningHeading: string;
  planningItems: string[];
  body: string[];
  localInsight: string;
  faqs: { q: string; a: string }[];
  relatedIntro: string;
  nearbyIntro: string;
  /** Optional link text for this service in the "nearby communities" sentence (links unchanged). */
  nearbyAnchor?: string;
  ctaTitle: string;
  ctaSubtitle: string;
};

const contractorCheckFaq = (city: string) => ({
  q: `What should I check before hiring a contractor in ${city}?`,
  a: `Ask for proof of liability insurance and WSIB coverage, check references, and get the scope of work, price and payment schedule in writing before work starts.`,
});

const cityServiceOverrides: Record<string, CityServiceOverride> = {
  "niagara-falls/kitchen-renovations": {
    metaDescription: "Planning a kitchen renovation in Niagara Falls? Layout, cabinets, countertops, ventilation, lighting, and when a building permit or ESA notification may apply.",
    offerDescription: "Kitchen renovation projects for homeowners in Niagara Falls, Ontario.",
    heroLine: "Planning a kitchen renovation in Niagara Falls? Start with layout, materials and the approvals your project may need.",
    bodyH2: "Planning a Kitchen Renovation in Niagara Falls",
    bodySubtitle: "What to think about before work starts.",
    planningHeading: "Things to Plan For",
    planningItems: [
      "How you use the kitchen: prep, cooking and clean-up",
      "Layout changes such as walls, sink or plumbing moves",
      "Cabinet type: stock, semi-custom or custom",
      "Countertop material and edge details",
      "Ventilation: a range hood vented to the outside",
      "Lighting and electrical capacity",
      "Appliance sizes and delivery lead times",
      "Building permit and ESA notification requirements for your scope",
    ],
    body: [
      "Kitchens in Niagara Falls homes vary widely, from compact galley layouts in post-war bungalows to mid-century houses and newer open-plan builds in neighbourhoods such as Stamford, Chippawa and Glenview. A useful first step is deciding how much needs to change. Keeping the existing layout and replacing cabinets, countertops and flooring is a very different project from opening a wall, moving the sink or adding an island.",
      "Start with how the kitchen is used. Think about where you prep, cook and clean up, how many people work in the room at once, and where you need counter space beside the sink, cooktop and fridge. In a smaller post-war kitchen, opening a wall to the dining or living area can add space and light, but if that wall is load-bearing, a building permit is required, and the structural drawings and design requirements for the change should be confirmed with the City.",
      "Cabinetry is often one of the largest parts of a kitchen budget. Stock cabinets come in set sizes, semi-custom lines offer more sizes and finishes, and custom cabinets are built to fit the room. For countertops, quartz is non-porous and low-maintenance, granite is a natural stone that is usually resealed from time to time, and laminate costs less but is less resistant to heat and scratches.",
      "Plan ventilation, lighting and power early. A range hood that vents to the outside removes cooking moisture and odours more effectively than a recirculating one. Layered lighting, with ceiling lights, under-cabinet task lighting and pendants over an island, makes the room easier to work in. New appliances, island outlets or extra lighting can mean new circuits, so it is worth checking the capacity of your existing electrical panel.",
      "In older homes, opening walls or floors can uncover things that need attention, such as outdated wiring, older plumbing or uneven subfloors. Setting aside a contingency in your budget makes those surprises easier to deal with.",
      "Your scope also shapes the approvals involved. The City of Niagara Falls lists adding or removing walls and new or relocated plumbing among the work that requires a building permit, while minor cabinetry and flooring work may not need one. Most electrical work also requires a separate notification to the Electrical Safety Authority (ESA), even where a municipal building permit is also required. Before work starts, confirm your project with the City's Building Services and, for electrical work, with the ESA.",
      "Expect the kitchen to be out of use for part of the project. A temporary setup elsewhere in the house, with a microwave, kettle and fridge, helps, and so does confirming cabinet and appliance lead times before demolition begins. When you compare quotes, ask each contractor what is included and excluded, who arranges permits and inspections, and how changes are approved, and get the answers in writing. Niagara Renovation Company works on kitchen renovations for homeowners in Niagara Falls. To talk through your plans, call (647) 797-9471 or use the form above.",
    ],
    localInsight: "Niagara Falls homes range from post-war bungalows and mid-century houses to newer builds, from the tourist corridor to established residential areas inland.",
    faqs: [
      { q: "How do I get in touch about a kitchen renovation project in Niagara Falls?", a: "Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with a short description of your kitchen and what you'd like to change." },
      contractorCheckFaq("Niagara Falls"),
      { q: "How long does a kitchen renovation project take in Niagara Falls?", a: "It depends on the scope of work, any approvals needed, and lead times for cabinets, countertops and appliances. Ask for an expected schedule in writing before work starts." },
      { q: "Do I need a permit for a kitchen renovation in Niagara Falls?", a: "It depends on the work. The City of Niagara Falls lists adding or removing walls and new or relocated plumbing among the work that requires a building permit, while minor cabinetry and flooring work may not need one. Most electrical work also requires a separate ESA notification, even where a building permit is also required. Confirm your project with the City's Building Services and the ESA." },
    ],
    relatedIntro: "Related pages for Niagara Falls homeowners:",
    nearbyIntro: "In nearby communities, see",
    ctaTitle: "Have Questions About Your Kitchen?",
    ctaSubtitle: "Call or send a message to talk through your plans.",
  },
  "fort-erie/kitchen-renovations": {
    metaDescription: "Planning a kitchen renovation or remodel in Fort Erie? Layout, cabinets, counters and ventilation in older and former cottage homes, plus permit and ESA basics.",
    offerDescription: "Kitchen renovation projects for homeowners in Fort Erie, Ontario.",
    heroLine: "Planning a kitchen renovation in Fort Erie? Start with the house you have, the layout you need and the approvals your project may involve.",
    bodyH2: "Planning a Kitchen Renovation in Fort Erie",
    bodySubtitle: "What to think about before work starts.",
    planningHeading: "Things to Plan For",
    planningItems: [
      "How much of the layout needs to change",
      "Condition of walls, floors, wiring and plumbing behind the old kitchen",
      "Storage and counter space in a compact kitchen",
      "Cabinet type: stock, semi-custom or custom",
      "Countertop material and edge details",
      "Ventilation: a range hood vented to the outside",
      "Lighting and electrical panel capacity",
      "Building permit and ESA notification requirements for your scope",
    ],
    body: [
      "Fort Erie's housing includes former seasonal cottages that are now lived in year-round as well as older and newer family homes, in communities such as Crystal Beach, Ridgeway, Bridgeburg and Stevensville. That mix shapes what a kitchen renovation or remodel involves. A converted cottage may have a small kitchen that was not designed for full-time cooking, while a larger family home may simply need a layout that works better for the way the household uses it.",
      "A useful first step is deciding how much needs to change. Replacing cabinets, countertops and flooring within the existing layout is a very different project from removing a wall, moving the sink or adding an island. If you are thinking of opening the kitchen to a dining or living area, find out early whether the wall is load-bearing, since that affects the design, the structural details and the approvals involved.",
      "In a compact kitchen, storage and counter space matter most. Taller upper cabinets, deep drawers instead of lower shelves, a pantry cabinet and a continuous run of counter beside the sink and cooktop can make a small room far easier to work in. Stock cabinets come in set sizes, semi-custom lines offer more sizes and finishes, and custom cabinets are built to fit an awkward or out-of-square room. For countertops, quartz is non-porous and low-maintenance, granite is a natural stone that is usually resealed from time to time, and laminate costs less but is less resistant to heat and scratches.",
      "Homes that started as cottages or have been renovated in stages can hide surprises once the old kitchen comes out, such as older wiring, plumbing that has been extended over the years, uneven floors or limited insulation on exterior walls. It helps to plan for an inspection of what is behind the walls and to keep a contingency in the budget. Plan ventilation, lighting and power at the same time: a range hood vented to the outside removes cooking moisture better than a recirculating one, and new appliances, island outlets or added lighting can mean new circuits, so check the capacity of your electrical panel.",
      "Permit requirements depend on the scope of your renovation, especially if you are changing the layout or plumbing. Confirm the requirements for your project with Fort Erie's Building Department before work begins. Separately, most electrical work requires a notification to the Electrical Safety Authority (ESA), even where a municipal building permit is also required. For electrical work, confirm the requirements with the ESA.",
      "Expect the kitchen to be out of use for part of the project, so set up a temporary space with a microwave, kettle and fridge, and confirm cabinet, countertop and appliance lead times before demolition begins. When you compare quotes, ask each contractor what is included and excluded, who arranges permits and inspections, and how changes are approved, and get the answers in writing. Niagara Renovation Company works on kitchen renovations for homeowners in Fort Erie. To talk through your plans, call (647) 797-9471 or use the form above.",
    ],
    localInsight: "Fort Erie includes communities such as Crystal Beach, Ridgeway, Bridgeburg and Stevensville, with a mix of former seasonal cottages and year-round family homes.",
    faqs: [
      { q: "How do I get in touch about a kitchen renovation project in Fort Erie?", a: "Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with a short description of your kitchen and what you'd like to change." },
      contractorCheckFaq("Fort Erie"),
      { q: "How long does a kitchen renovation project take in Fort Erie?", a: "It depends on the scope of work, the condition of the existing space, any approvals needed, and lead times for cabinets, countertops and appliances. Ask for an expected schedule in writing before work starts." },
      { q: "Do I need a permit for a kitchen renovation in Fort Erie?", a: "Permit requirements depend on the scope of your renovation, especially if you are changing the layout or plumbing. Confirm the requirements for your project with Fort Erie's Building Department before work begins. Separately, most electrical work requires an ESA notification, even where a building permit is also required, so confirm electrical requirements with the ESA." },
    ],
    relatedIntro: "Related pages for Fort Erie homeowners:",
    nearbyIntro: "In nearby communities, see",
    ctaTitle: "Have Questions About Your Kitchen?",
    ctaSubtitle: "Call or send a message to talk through your plans.",
  },
  "st-catharines/kitchen-renovations": {
    metaDescription: "Planning a kitchen renovation or remodel in St. Catharines? Layout, cabinets, countertops and ventilation for older and newer homes, plus permit and ESA basics.",
    offerDescription: "Kitchen renovation projects for homeowners in St. Catharines, Ontario.",
    heroLine: "Planning a kitchen renovation in St. Catharines? Start with your home's layout, your materials and the approvals your project may need.",
    bodyH2: "Planning a Kitchen Renovation in St. Catharines",
    bodySubtitle: "What to think about before work starts.",
    planningHeading: "Things to Plan For",
    planningItems: [
      "How you use the kitchen: prep, cooking and clean-up",
      "Layout changes such as walls, sink or plumbing moves",
      "What older walls, wiring and plumbing may need",
      "Cabinet type: stock, semi-custom or custom",
      "Countertop material and edge details",
      "Ventilation: a range hood vented to the outside",
      "Lighting and electrical panel capacity",
      "Building permit and ESA notification requirements for your scope",
    ],
    body: [
      "St. Catharines has a wide mix of housing, from older homes to newer houses and townhomes, in neighbourhoods such as Port Dalhousie, Merritton, Haig and Grantham. The kitchen you start with depends a lot on the house. Some older homes have a narrow or closed-off kitchen, while newer homes may have an open layout that mainly needs better storage, finishes or lighting.",
      "Start by deciding how much needs to change. Replacing cabinets, countertops and flooring within the existing layout is a very different project from removing a wall, moving the sink or adding an island. In an older home, opening a closed kitchen to the dining room can add light and space, but find out early whether the wall is load-bearing, because that affects the structural design and the approvals involved. If you own a townhome that is part of a condominium corporation, check its rules before planning changes that affect plumbing, ventilation or shared walls.",
      "Older houses can reveal surprises once the walls and floors are opened, such as plaster walls, outdated wiring, older plumbing or floors that are no longer level. Building those possibilities into the plan, and keeping a contingency in the budget, makes them easier to deal with. It is also worth checking the capacity of the electrical panel, since new appliances, island outlets and added lighting can mean new circuits.",
      "Cabinetry is often one of the largest parts of a kitchen budget. Stock cabinets come in set sizes, semi-custom lines offer more sizes and finishes, and custom cabinets are built to fit rooms with uneven walls or unusual dimensions. For countertops, quartz is non-porous and low-maintenance, granite is a natural stone that is usually resealed from time to time, and laminate costs less but is less resistant to heat and scratches. Plan ventilation and lighting early too: a range hood vented to the outside removes cooking moisture and odours better than a recirculating one, and layered lighting makes the room easier to work in.",
      "Your scope also shapes the approvals involved. The City of St. Catharines lists removing or adding walls and installing or altering plumbing systems among the renovation work that requires a building permit. Most electrical work also requires a separate notification to the Electrical Safety Authority (ESA), even where a municipal building permit is also required. Before work starts, confirm your project with the City's Planning and Building Services and, for electrical work, with the ESA.",
      "Expect the kitchen to be out of use for part of the project, so set up a temporary space with a microwave, kettle and fridge, and confirm cabinet, countertop and appliance lead times before demolition begins. When you compare quotes, ask each contractor what is included and excluded, who arranges permits and inspections, and how changes are approved, and get the answers in writing. Niagara Renovation Company works on kitchen renovations for homeowners in St. Catharines. To talk through your plans, call (647) 797-9471 or use the form above.",
    ],
    localInsight: "St. Catharines includes neighbourhoods such as Port Dalhousie, Merritton, Haig and Grantham, with a mix of older homes, newer houses and townhomes.",
    faqs: [
      { q: "How do I get in touch about a kitchen renovation project in St. Catharines?", a: "Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with a short description of your kitchen and what you'd like to change." },
      contractorCheckFaq("St. Catharines"),
      { q: "How long does a kitchen renovation project take in St. Catharines?", a: "It depends on the scope of work, the condition of the existing space, any approvals needed, and lead times for cabinets, countertops and appliances. Ask for an expected schedule in writing before work starts." },
      { q: "Do I need a permit for a kitchen renovation in St. Catharines?", a: "It depends on the work. The City of St. Catharines lists removing or adding walls and installing or altering plumbing systems among the renovation work that requires a building permit. Most electrical work also requires a separate ESA notification, even where a building permit is also required. Confirm your project with the City's Planning and Building Services and the ESA." },
    ],
    relatedIntro: "Related pages for St. Catharines homeowners:",
    nearbyIntro: "In nearby communities, see",
    ctaTitle: "Have Questions About Your Kitchen?",
    ctaSubtitle: "Call or send a message to talk through your plans.",
  },
  "welland/additions-adu": {
    metaDescription: "Considering an ADU in Welland? What to check first: where the unit fits in your home, zoning, servicing and the approvals the City of Welland may require.",
    offerDescription: "ADU projects for homeowners in Welland, Ontario.",
    serviceLabel: "ADUs",
    faqHeadingLabel: "ADU",
    h1: "ADUs in Welland, Ontario",
    nearbyAnchor: "ADUs",
    heroLine: "Considering an ADU in Welland? Start with your house, your lot and the rules that apply.",
    bodyH2: "Planning an ADU in Welland",
    bodySubtitle: "Questions to answer before choosing a design.",
    planningHeading: "Questions to Answer First",
    planningItems: [
      "What the City of Welland's zoning allows on your property",
      "Where the unit could fit within your existing house",
      "Ceiling height, exits and fire separation",
      "Heating, ventilation and sound between units",
      "Water, sewer and electrical servicing for the new unit",
      "Parking and a separate entrance",
      "Building permit requirements under the Ontario Building Code",
    ],
    body: [
      "An accessory dwelling unit (ADU) is an additional self-contained dwelling on a residential property, such as a basement suite or another unit created within the existing house. In Welland, whether an ADU makes sense usually depends on the house you already have and how its space could be divided.",
      "Welland's neighbourhoods range from canal-side areas in Dain City to family-oriented streets in Crowland and Lincoln East, and the homes in them vary just as much. For a basement suite, practical questions include ceiling height, exits, fire separation, and heating and ventilation for the new unit. It also helps to think early about a separate entrance, parking, and how water, sewer and electrical service would be arranged for the second unit.",
      "What is permitted depends on your property, the provincial rules that apply and the City of Welland's zoning by-law, and construction is reviewed under the Ontario Building Code through a building permit. Confirm the current requirements for your specific project with the City of Welland's planning and building staff before committing to a design.",
      "People add an ADU for different reasons, such as housing a family member or creating a rental unit. If rental income is part of the plan, weigh it against the construction, financing, tax and insurance costs, and get independent financial advice. If you need more space connected to your own living area instead, a home addition may suit you better. Niagara Renovation Company works on ADU projects in Welland. To discuss your plans, call (647) 797-9471 or use the form above.",
    ],
    localInsight: "Known as the Rose City, Welland has neighbourhoods ranging from canal-side areas in Dain City to family-oriented streets in Crowland.",
    faqs: [
      { q: "How do I get in touch about an ADU project in Welland?", a: "Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with your address and a short description of the space you're thinking of converting." },
      contractorCheckFaq("Welland"),
      { q: "How long does an ADU project take in Welland?", a: "It depends on the existing space, the design, the permit review and construction. Any required approvals and permits need to be in place before the applicable work begins. Ask for an expected schedule in writing before work starts." },
      { q: "Do I need a permit for an ADU in Welland?", a: "Whether an ADU is possible on your property, and which approvals apply, depends on the property, the provincial rules that apply and the City of Welland's zoning by-law. Building a new unit is also subject to building permit review under the Ontario Building Code. Confirm the requirements for your specific project with the City's planning and building staff." },
    ],
    relatedIntro: "Related pages for Welland homeowners:",
    nearbyIntro: "In nearby communities, see",
    ctaTitle: "Thinking About an ADU?",
    ctaSubtitle: "Call or send a message to talk through your property and plans.",
  },
  "fort-erie/additions-adu": {
    metaDescription: "Considering an ADU in Fort Erie? Key questions for older and former cottage homes: zoning, servicing, year-round use and Town of Fort Erie approvals.",
    offerDescription: "ADU projects for homeowners in Fort Erie, Ontario.",
    serviceLabel: "ADUs",
    faqHeadingLabel: "ADU",
    h1: "ADUs in Fort Erie, Ontario",
    nearbyAnchor: "ADUs",
    heroLine: "Considering an ADU in Fort Erie? Start with your property, its servicing and the rules that apply.",
    bodyH2: "Planning an ADU in Fort Erie",
    bodySubtitle: "What to check before choosing a design.",
    planningHeading: "Questions to Answer First",
    planningItems: [
      "What the Town of Fort Erie's zoning allows on your property",
      "Condition of the existing structure and foundation",
      "Insulation and heating for year-round use",
      "Municipal water and sewer or private services",
      "Where the unit could fit within the existing house",
      "Parking, access and a separate entrance",
      "Building permit requirements under the Ontario Building Code",
    ],
    body: [
      "An accessory dwelling unit (ADU) is an additional self-contained dwelling on a residential property: for example, a basement suite or another unit created within the existing house.",
      "Many Fort Erie communities, including Crystal Beach and Ridgeway, have former seasonal cottages that are now lived in year-round, alongside family homes in areas such as Stevensville. If you are starting from an older or former cottage home, early questions include the condition of the existing structure and foundation, whether it is insulated for year-round living, and whether the property is connected to municipal water and sewer or relies on private services. Those answers affect whether an ADU is practical and how one could be laid out.",
      "Requirements depend on your property, the provincial rules that apply and the Town of Fort Erie's zoning by-law, and construction is reviewed under the Ontario Building Code through a building permit. Because rules can change, confirm the current requirements for your specific project with the Town of Fort Erie's planning and building staff before committing to a design.",
      "If rental income is part of your plan, compare it with the construction, financing, tax and insurance costs, and get independent financial advice. If what you need is more room attached to your own home rather than a separate unit, a home addition may be a better fit. Niagara Renovation Company works on ADU projects in Fort Erie. To discuss your property, call (647) 797-9471 or use the form above.",
    ],
    localInsight: "Many of Fort Erie's waterfront communities have shifted from seasonal cottages to year-round neighbourhoods, including Crystal Beach, Ridgeway, Bridgeburg and Stevensville.",
    faqs: [
      { q: "How do I get in touch about an ADU project in Fort Erie?", a: "Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with your address and a short description of the space you're thinking of converting." },
      contractorCheckFaq("Fort Erie"),
      { q: "How long does an ADU project take in Fort Erie?", a: "It depends on the existing space, the condition of the property, the design, the permit review and construction. Any required approvals and permits need to be in place before the applicable work begins. Ask for an expected schedule in writing before work starts." },
      { q: "Do I need a permit for an ADU in Fort Erie?", a: "Whether an ADU is possible on your property, and which approvals apply, depends on the property, the provincial rules that apply and the Town of Fort Erie's zoning by-law. Building a new unit is also subject to building permit review under the Ontario Building Code. Confirm the requirements for your specific project with the Town's planning and building staff." },
    ],
    relatedIntro: "Related pages for Fort Erie homeowners:",
    nearbyIntro: "In nearby communities, see",
    ctaTitle: "Thinking About an ADU?",
    ctaSubtitle: "Call or send a message to talk through your property and plans.",
  },
};

export default async function CityServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = CITIES.find(c => c.slug === citySlug);
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!city || !service) return notFound();

  const servicePhrase = cityServiceInlinePhrase[service.slug] ?? service.name.toLowerCase();
  const override = cityServiceOverrides[`${city.slug}/${service.slug}`];
  const serviceLabel = override?.serviceLabel ?? service.name;
  const local = override ? null : buildLocalPage(city.slug, city.name, (city as CityServiceData).neighbourhoods ?? [], service.slug, SERVICES.findIndex(s => s.slug === service.slug));
  const serviceImage = SERVICE_IMAGES[service.slug] || SERVICE_IMAGES["kitchen-renovations"];
  const pageDescription = override?.metaDescription ?? serviceLocationDescription(service.slug, service.name, city.name);

  const relatedServices = (RELATED_SERVICES[service.slug] ?? [])
    .map(slug => SERVICES.find(s => s.slug === slug))
    .filter((s): s is typeof SERVICES[number] => Boolean(s));
  const nearbyCities = (NEARBY_CITIES[city.slug] ?? [])
    .map(slug => CITIES.find(c => c.slug === slug))
    .filter((c): c is typeof CITIES[number] => Boolean(c));
  const articles = SERVICE_ARTICLES[service.slug] ?? [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.niagararenovationcompany.com" },
      { "@type": "ListItem", "position": 2, "name": city.name, "item": `https://www.niagararenovationcompany.com/${city.slug}` },
      { "@type": "ListItem", "position": 3, "name": serviceLabel, "item": `https://www.niagararenovationcompany.com/${city.slug}/${service.slug}` },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Niagara Renovation Company – ${serviceLabel} in ${city.name}`,
    "description": pageDescription,
    "url": `https://www.niagararenovationcompany.com/${city.slug}/${service.slug}`,
    "telephone": "+16477979471",
    "email": "info@niagararenovationcompany.com",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": "ON",
      "addressCountry": "CA",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceLabel,
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${serviceLabel} in ${city.name}`,
          "description": override?.offerDescription ?? `Professional ${servicePhrase} services for homeowners in ${city.name}, Ontario.`,
        },
      }],
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceLabel} in ${city.name}`,
    "description": pageDescription,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Niagara Renovation Company",
      "telephone": "+16477979471",
      "url": "https://www.niagararenovationcompany.com",
    },
    "areaServed": { "@type": "City", "name": city.name, "addressRegion": "ON", "addressCountry": "CA" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "description": "Free estimate — no obligation",
    },
  };

  // One FAQ source for both the visible FAQ section and the FAQPage schema,
  // so the two always match. Timeline answer avoids unverified start dates.
  const faqNoun = cityServiceFaqNoun[service.slug] ?? service.name.toLowerCase();
  const faqNounWithArticle = `${/^[aeiou]/i.test(faqNoun) ? "an" : "a"} ${faqNoun}`;
  const defaultFaqs = [
    { q: `How do I get a quote for ${faqNounWithArticle} project in ${city.name}?`, a: `Contact us for a free, no-obligation estimate. Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com. We respond within 2 business hours and provide a detailed written estimate.` },
    { q: `Are you licensed for ${faqNoun} work in ${city.name}, Ontario?`, a: `Yes, Niagara Renovation Company is fully licensed and insured throughout ${city.name} and all of Niagara Region. We carry comprehensive liability insurance and WSIB coverage for all workers.` },
    { q: `How long does ${faqNounWithArticle} project take in ${city.name}?`, a: `Project timelines vary based on scope and complexity. We'll discuss the expected timeline when we review your project. Call (647) 797-9471 to discuss your project in ${city.name}.` },
    { q: `Do you handle permits for ${faqNoun} projects in ${city.name}?`, a: `Yes, we manage all building permit applications and inspections. We are familiar with the local permit process and building department requirements in ${city.name}.` },
  ];
  const faqs = override?.faqs ?? local?.faqs ?? defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const trustSignals = [
    { title: "Licensed & Insured", desc: "Fully licensed Ontario contractor with comprehensive insurance." },
    { title: "Free Estimates", desc: "No cost, no obligation detailed written quotes." },
    { title: "One Contractor", desc: "Every trade on your project managed by a single point of contact." },
    { title: "5-Year Warranty", desc: "Comprehensive workmanship warranty on all projects." },
    { title: "On-Time Delivery", desc: "We commit to timelines and deliver on our promises." },
    { title: "Local Team", desc: "Your neighbours — proudly serving all of Niagara Region." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: city.name, href: `/${city.slug}` },
            { label: serviceLabel, href: `/${city.slug}/${service.slug}` },
          ]} />
        </div>
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-br from-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <div className="w-14 h-14 bg-red-600/20 border border-red-600/40 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              {override?.h1 ? (
                <h1 className="text-4xl md:text-5xl font-black mb-4">{override.h1}</h1>
              ) : (
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {service.name} in {city.name}, Ontario
              </h1>
              )}
              {override ? (
                <p className="text-gray-300 text-xl mb-6">{override.heroLine}</p>
              ) : local ? (
                <p className="text-gray-300 text-xl mb-6">{local.hero}</p>
              ) : (
              <p className="text-gray-300 text-xl mb-6">
                Expert {servicePhrase} serving {city.name} homeowners. Licensed, insured, and trusted across Niagara Region.
              </p>
              )}
              <a href="tel:6477979471" data-track="phone-click" className="inline-flex items-center gap-2 text-white hover:text-red-400 font-bold text-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE}
              </a>
            </div>
            <div>
              <LeadForm defaultCity={city.slug} defaultService={service.slug} {...(override ? { neutral: true } : {})} />
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={override?.bodyH2 ?? cityServiceBodyH2[service.slug]?.(city.name) ?? `Trusted ${service.name} Contractors in ${city.name}`}
            subtitle={override?.bodySubtitle ?? "Expert craftsmanship, local knowledge, and outstanding results — every time."}
            image={serviceImage}
            imageAlt={`${serviceLabel} in ${city.name}, Ontario`}
          />
          {(override?.planningItems ?? local?.planningItems ?? serviceKeyInclusions[service.slug]) && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              {override ? (
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">{override.planningHeading}</h3>
              ) : local ? (
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">What to Plan For in {city.name}</h3>
              ) : (
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">What&apos;s Included</h3>
              )}
              <ul className="grid sm:grid-cols-2 gap-2">
                {(override?.planningItems ?? local?.planningItems ?? serviceKeyInclusions[service.slug]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(override?.body ?? local?.body ?? []).map((paragraph, i) => (
            <p key={i} className="text-gray-700 text-lg leading-relaxed mb-5">{paragraph.trim()}</p>
          ))}
        </div>
      </section>

      {/* TRUST SIGNALS (hidden on override and local pages: unconfirmed claims, duplicate text) */}
      {!override && !local && (
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={service.slug === "commercial-renovations" ? `Why ${city.name} Businesses Choose Us` : `Why ${city.name} Homeowners Choose Us`}
            subtitle="Our commitment to quality, transparency, and service sets us apart."
            image={serviceImage}
            imageAlt={`Trusted renovation contractors in ${city.name}`}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trustSignals.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:border-red-200 transition-colors">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">{t.title}</h3>
                <p className="text-gray-600 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* LOCAL INSIGHT — unique city content for indexing */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">{serviceLabel} in {city.name}: Local Considerations</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            {override ? override.localInsight : local ? local.insight : (city as CityServiceData).cityDesc}
          </p>
          {((city as CityServiceData).neighbourhoods ?? []).length > 0 && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Neighbourhoods We Serve in {city.name}</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {((city as CityServiceData).neighbourhoods ?? []).map((n) => (
                  <span key={n} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200">
                    {n}
                  </span>
                ))}
              </div>
            </>
          )}
          {local && (
          <p className="text-gray-700 text-lg leading-relaxed">{local.insightExtra}</p>
          )}
          {!override && !local && (
          <p className="text-gray-700 text-lg leading-relaxed">
            Our {servicePhrase} crews are active throughout {city.name} and are familiar with local building permit requirements, preferred regional suppliers, and the specific construction characteristics common to homes in this community. Whether your home is in {((city as CityServiceData).neighbourhoods ?? []).slice(0, 2).join(", ") || city.name} or anywhere else in {city.name}, we bring the same standard of craftsmanship and accountability to every project we take on — backed by our 5-year workmanship warranty and comprehensive insurance coverage.
          </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">{override?.faqHeadingLabel ?? serviceLabel} FAQs for {city.name} Homeowners</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-red-600 transition-colors list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-red-600 text-xl">+</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED LOCAL SERVICES, NEARBY COMMUNITIES, SUPPORTING ARTICLES */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Planning More Work in {city.name}?</h2>
          {relatedServices.length > 0 && (override ? (
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {override.relatedIntro}{" "}
              {relatedServices.map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && (i === relatedServices.length - 1 ? " and " : ", ")}
                  <Link href={`/${city.slug}/${s.slug}`} className="text-red-600 font-medium hover:underline">
                    {SERVICE_ANCHORS[s.slug] ?? s.name.toLowerCase()}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Many {city.name} projects involve more than one trade. Alongside {servicePhrase}, we also handle{" "}
              {relatedServices.map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && (i === relatedServices.length - 1 ? " and " : ", ")}
                  <Link href={`/${city.slug}/${s.slug}`} className="text-red-600 font-medium hover:underline">
                    {SERVICE_ANCHORS[s.slug] ?? s.name.toLowerCase()}
                  </Link>
                </span>
              ))}
              {" "}in {city.name}, so related work can be planned and scheduled under one contract.
            </p>
          ))}
          {nearbyCities.length > 0 && (override ? (
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {override.nearbyIntro} {override.nearbyAnchor ?? SERVICE_ANCHORS[service.slug] ?? service.name.toLowerCase()} in{" "}
              {nearbyCities.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && (i === nearbyCities.length - 1 ? " and " : ", ")}
                  <Link href={`/${c.slug}/${service.slug}`} className="text-red-600 font-medium hover:underline">
                    {c.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We also provide {SERVICE_ANCHORS[service.slug] ?? service.name.toLowerCase()} in neighbouring{" "}
              {nearbyCities.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && (i === nearbyCities.length - 1 ? " and " : ", ")}
                  <Link href={`/${c.slug}/${service.slug}`} className="text-red-600 font-medium hover:underline">
                    {c.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          ))}
          {articles.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Helpful Reading</h3>
              <ul className="space-y-2">
                {articles.map(a => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`} className="text-red-600 font-medium hover:underline">
                      {a.anchor}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-4">
            <Link href={`/${city.slug}`} className="text-red-600 hover:underline font-medium">
              &larr; All Renovations in {city.name}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href={`/services/${service.slug}`} className="text-red-600 hover:underline font-medium">
              {serviceLabel} Across Niagara Region &rarr;
            </Link>
            <span className="text-gray-300">|</span>
            {override ? (
              <Link href="/contact" className="text-red-600 hover:underline font-medium">
                Contact Us &rarr;
              </Link>
            ) : (
            <Link href="/contact" className="text-red-600 hover:underline font-medium">
              Get a Free Quote &rarr;
            </Link>
            )}
          </div>
        </div>
      </section>

      {override ? <CTABanner minimal title={override.ctaTitle} subtitle={override.ctaSubtitle} /> : <CTABanner />}
    </>
  );
}
