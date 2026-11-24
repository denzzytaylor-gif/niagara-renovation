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

const serviceBodyTemplates: Record<string, (city: string, landmark: string, neigh: string) => string> = {
  "kitchen-renovations": (city, landmark, neigh) =>
    `When ${city} homeowners decide to invest in a kitchen renovation, they are making one of the most impactful decisions they can for their property's value and their family's everyday quality of life. A professionally renovated kitchen transforms not just a room, but the entire character of a home — opening up living spaces, modernizing the aesthetic, and creating a functional hub where families naturally gather. Niagara Renovation Company has delivered hundreds of kitchen renovations throughout ${city} and all of Niagara Region, and we bring proven expertise to every project we take on.\n\nKitchens in ${city} ${landmark} span a wide range of eras and styles — from galley kitchens in post-war bungalows to the large open-plan layouts of newer builds across neighbourhoods like ${neigh}. Our team understands the structural considerations and design possibilities unique to each housing type, and we tailor every renovation to suit the specific characteristics of your home. Whether you are looking to open up a closed-off kitchen to the living area, add a large island for entertaining, or simply refresh cabinetry and countertops to bring a dated space up to current standards, we have the skills and experience to execute your vision.\n\nOur kitchen renovation service covers every element of the project — custom cabinetry design and installation, countertop supply and installation (quartz, granite, or laminate), kitchen island construction, tile backsplash, under-cabinet and pot-light lighting, plumbing rough-in and fixture installation, electrical upgrades, and new flooring. We manage every trade under one roof, which means no coordination headaches, no finger-pointing between contractors, and a single point of accountability for the entire project.\n\nWhat sets us apart for ${city} homeowners is our commitment to transparency throughout the process. You receive a detailed written quote before any work begins — clearly outlining all costs, materials (with brand and specification details), the project timeline, and the payment schedule. There are no surprise charges, no scope changes without your approval, and no final invoice that looks different from the estimate you signed. Our 5-year workmanship warranty ensures that our commitment to your satisfaction continues long after the last cabinet door is hung. Call (647) 797-9471 today or fill out the form above to arrange your free, no-obligation ${city} kitchen renovation consultation.`,

  "bathroom-renovations": (city, landmark, neigh) =>
    `A beautifully renovated bathroom can feel transformative — and for ${city} homeowners, a bathroom renovation is consistently one of the most rewarding investments you can make in your home. Whether you are dreaming of a master ensuite with heated floors, a walk-in tile shower, and a freestanding soaker tub, or simply need a practical main bathroom refresh with a new vanity and updated fixtures, Niagara Renovation Company delivers exceptional bathroom renovations throughout ${city} and all of Niagara Region.\n\nHomes in ${city} ${landmark} present a fascinating variety of bathroom layouts and renovation opportunities. From the tight, awkward layouts common in older homes across areas like ${neigh} to the generous ensuite footprints found in newer builds, our team has the design expertise and construction experience to work within any constraint and maximize every square foot. We have completed bathrooms ranging from simple, elegant powder rooms to elaborate master ensuite transformations with custom tile work, double floating vanities, niche shelving, and steam showers.\n\nOur complete bathroom renovation service includes full demolition and debris removal, custom tile shower and tub surrounds, frameless glass shower enclosures, freestanding and built-in tub installation, custom vanity and countertop work, heated floor (in-floor radiant) systems, toilet and fixture upgrades, exhaust fan and lighting installation, and all required plumbing and electrical work. We handle the building permit process entirely — you will never need to interact with the building department yourself.\n\n${city} homeowners choose Niagara Renovation Company because we understand that a bathroom renovation is a significant disruption to your household, and we work with focused efficiency to complete the project as quickly as possible without sacrificing quality. Our tradespeople are skilled, our subcontractors are vetted, and our project managers are experienced at keeping timelines tight. Every bathroom renovation we complete is backed by our comprehensive 5-year workmanship warranty. Contact us at (647) 797-9471 or fill out the form above to get your free ${city} bathroom renovation estimate.`,

  "basement-finishing": (city, landmark, neigh) =>
    `Your unfinished basement is one of the most significant untapped assets in your ${city} home. A professionally finished basement can add hundreds of square feet of premium living space, dramatically increase your property's market value, and provide the flexible space your family needs — whether that means a family recreation room, a home theatre, a home office, a guest suite, or a fully equipped legal rental unit that generates monthly income. Niagara Renovation Company has transformed hundreds of unfinished basements across ${city} and all of Niagara Region into beautiful, functional, code-compliant living spaces.\n\nBasement finishing in ${city} homes ${landmark} requires expertise in the specific moisture management challenges and structural characteristics of this region. Properties across neighbourhoods like ${neigh} present a variety of below-grade conditions — from basements with excellent natural drainage to older homes that require targeted waterproofing interventions before any finishing work can responsibly begin. Our process always starts with a thorough moisture assessment and an honest conversation about what we find before we commit to any scope of work.\n\nOur complete basement finishing service covers every phase of the project: waterproofing assessment and remediation (if required), steel stud or wood framing, spray foam rim joist insulation and wall insulation, drywall, taping, and painting, pot light and electrical panel upgrades, bathroom rough-in and full bathroom finishing (optional), egress window installation (required for legal bedrooms), luxury vinyl plank or carpet flooring, and all required building permits and inspections. In Ontario, a building permit is mandatory for basement finishing, and we manage the entire application and inspection process on your behalf.\n\nWe are transparent about timelines and costs from day one. A typical open-concept basement recreation room takes 6–10 weeks. A basement with a full bathroom and wet bar takes 10–14 weeks. A legal basement suite takes 12–16 weeks including all permits and inspections. Whatever your ${city} basement finishing project requires, call (647) 797-9471 or fill out the form above to get your free consultation and detailed written estimate.`,

  "general-contracting": (city, landmark, neigh) =>
    `Complex renovation projects require more than skilled tradespeople — they require a general contractor with the organizational expertise, project management capability, and multi-trade coordination experience to keep every moving piece on schedule, on budget, and on spec. Niagara Renovation Company's general contracting division serves ${city} homeowners and commercial clients who need a single, accountable professional to manage entire renovation projects from initial design through final inspection.\n\nAs a full-service general contractor operating throughout ${city} ${landmark}, we take complete ownership of your renovation project. We source and vet all sub-trades, coordinate delivery schedules for long-lead materials, manage the permit and inspection process with local building departments, and maintain consistent communication with you throughout the build. For homeowners in areas like ${neigh} undertaking large-scale renovations, our general contracting service eliminates the single biggest source of renovation stress: managing multiple contractors who each care only about their own scope.\n\nOur general contracting service is the right fit for projects that involve multiple trades working in sequence — such as full home renovations, gut renovations of kitchens and bathrooms simultaneously, home additions that require structural engineering, or commercial tenant improvements with tight lease-start deadlines. We have established relationships with licensed and vetted electricians, plumbers, HVAC technicians, tile setters, cabinetmakers, and finish carpenters throughout Niagara Region, allowing us to assemble the right team for your specific project.\n\nEvery general contracting engagement begins with a thorough scope discussion, followed by a detailed written contract that specifies the full scope of work, materials, payment schedule, timeline, and change-order process. There are no surprises mid-project and no disputes at the end. Our 5-year workmanship warranty covers all work we manage. For general contracting in ${city}, call (647) 797-9471 or fill out the form above to discuss your project with our team.`,

  "additions-adu": (city, landmark, neigh) =>
    `An accessory dwelling unit (ADU) is one of the most practical ways for a ${city} homeowner to add a second, self-contained home to an existing lot — a detached garden suite in the backyard, a converted garage, a coach house above a garage, or a legal secondary suite in the basement. Ontario's Planning Act now permits additional residential units on most residential lots, and Niagara Renovation Company designs and builds ADUs in ${city} from the first zoning review through to occupancy.

Every ADU project in ${city} ${landmark} starts with the property itself. Lot size, setbacks, lot coverage, servicing, and access all shape what can be built, and properties across areas like ${neigh} vary considerably. Before you commit to anything, we review your lot against the municipality's current rules for additional residential units and tell you plainly which options are realistic — a detached garden suite, a garage conversion, or a secondary suite inside the existing house.

Our ADU service covers the full scope: design and permit drawings, building permit applications, foundations for detached suites, framing, insulation and exterior cladding, separate electrical service where required, water and sewer connections, a full kitchen and bathroom, a separate entrance, the fire separation and egress a secondary suite requires, and complete interior finishing to move-in ready condition.

Homeowners build ADUs for different reasons — rental income to help offset a mortgage, a place for aging parents or adult children to live independently nearby, or long-term flexibility and property value. If what you need is more space attached to your own living area rather than a separate unit, our home additions service is the better fit. To find out what your ${city} property allows, call (647) 797-9471 or fill out the form above.`,

  "decks-outdoor": (city, landmark, neigh) =>
    `Niagara Region's exceptional summers make outdoor living one of the most rewarding home improvement investments you can make — and for ${city} homeowners, a professionally designed and built deck or outdoor living space transforms your property and your lifestyle. Niagara Renovation Company designs and builds custom decks, pergolas, covered patios, and complete outdoor living spaces throughout ${city} and all of Niagara Region, bringing the same quality craftsmanship and attention to detail to outdoor projects as we do to every interior renovation we complete.\n\nOutdoor projects in ${city} ${landmark} require materials and construction techniques that stand up to Niagara's full range of seasonal conditions — from humid summers to freeze-thaw cycling in winter. Our deck and outdoor living projects are engineered and built for longevity, using pressure-treated lumber, composite decking (Trex, Fiberon, TimberTech), stainless steel fasteners, and proper drainage detailing that prevents the premature deterioration common in decks built with inferior materials or methods. Homeowners in areas like ${neigh} have trusted us to build outdoor structures that still look and perform beautifully a decade after installation.\n\nOur complete outdoor living service includes custom deck design and construction, pergola and covered structure fabrication and installation, stone and concrete patio construction, outdoor kitchen rough-in and installation, privacy screening and railing systems (glass, cable, aluminum, wood), and exterior lighting. We handle all building permit applications — in Ontario, any deck over 600mm above grade requires a permit, and we manage this process entirely on your behalf.\n\nA beautiful outdoor space is an extension of your interior living area, and we design every project to feel integrated with your home's architecture and your family's lifestyle. Whether you want a simple pressure-treated deck for weekend barbecues, a multi-level composite deck with built-in lighting and a hot tub pad, or a full outdoor kitchen and entertainment area, we have the expertise to deliver it. Contact us at (647) 797-9471 or fill out the form above for your free ${city} outdoor living consultation.`,

  "commercial-renovations": (city, landmark, neigh) =>
    `Commercial renovation projects in ${city} demand a contractor with the professionalism, project management capability, and commercial construction experience to deliver on time, within budget, and with minimal disruption to your business operations. Niagara Renovation Company provides comprehensive commercial renovation services throughout ${city} and all of Niagara Region — from office fit-outs and retail renovations to restaurant build-outs, medical clinic upgrades, and multi-unit residential improvements.\n\nThe commercial market in ${city} ${landmark} is active and growing, with businesses across areas like ${neigh} investing in renovations that improve customer experience, reflect their brand, and bring aging spaces up to current standards and code compliance. Our commercial renovation team understands the unique demands of working in occupied or partially occupied spaces — tight timelines, phased construction to maintain operations, after-hours work to minimize disruption, and strict adherence to commercial building code and fire code requirements.\n\nOur commercial renovation service covers the full scope of commercial construction: demolition and structural modifications, commercial-grade framing and drywall, commercial flooring (LVT, polished concrete, carpet tile), drop ceiling and suspended ceiling systems, commercial electrical and lighting upgrades, HVAC modifications, commercial plumbing rough-in and installation, millwork and custom cabinetry, commercial bathroom renovations, accessibility upgrades (AODA compliance), and all required building permits and inspections. For tenant improvement (TI) projects, we work directly with both commercial tenants and building owners to deliver fit-outs within TI allowance budgets and on lease-start deadlines.\n\nNiagara Region businesses trust Niagara Renovation Company because we understand that a commercial renovation is not just a construction project — it is an investment in your business's future. We take that responsibility seriously. Contact us at (647) 797-9471 or fill out the form above to discuss your ${city} commercial renovation project.`,

  "roofing": (city, landmark, neigh) =>
    `Your roof is your home's first line of defence against Niagara's weather — and when it needs attention, choosing the right roofing contractor in ${city} is one of the most important decisions you can make as a homeowner. Niagara Renovation Company provides professional roofing services throughout ${city} and all of Niagara Region, from full roof replacements and repairs to new construction roofing for home additions and new builds. Our roofing team brings the expertise, quality materials, and workmanship standards that ${city} homeowners deserve.\n\nRoofs in ${city} homes ${landmark} are exposed to Niagara's full seasonal range — including heavy snowfall, ice dams, freeze-thaw cycling, and summer heat that accelerates shingle deterioration. Properties across areas like ${neigh} vary in age and roof style, from the low-slope and hip roofs common on post-war bungalows to the steep-pitched gable roofs of Victorian-era homes. Our roofing team has experience with every roof configuration and every material category, and we assess each roof individually to recommend the most appropriate and cost-effective solution for your specific home.\n\nOur roofing service covers complete roof replacement (asphalt shingles, architectural shingles, metal roofing), emergency and non-emergency roof repairs, flat roof systems (TPO, modified bitumen, EPDM), eavestroughing (eavestroughs and downspouts), ventilation upgrades (ridge vents, soffit vents, power ventilators), and ice and water shield installation for improved weather protection. All roofing work is performed by our experienced, insured roofing crew — we do not subcontract our roofing to third parties.\n\nA failing roof affects not just your home's exterior, but can cause interior water damage, mould, and insulation failure that multiplies the cost of remediation. Addressing roofing issues promptly is always less expensive than waiting. For a free roofing assessment and estimate in ${city}, call (647) 797-9471 or fill out the form above. We provide honest assessments and clear written quotes — no high-pressure tactics, no unnecessary upselling.`,

  "flooring": (city, landmark, neigh) =>
    `New flooring is one of the most transformative renovations a ${city} homeowner can undertake — and one of the best value-for-money improvements available. Whether you are replacing worn carpet with hardwood, upgrading outdated ceramic tile with large-format porcelain, or installing luxury vinyl plank throughout a basement renovation, the right flooring choice elevates every room it touches. Niagara Renovation Company provides professional flooring installation throughout ${city} and all of Niagara Region, with expertise across every flooring category and a commitment to installation quality that ensures your new floors perform beautifully for decades.\n\nFlooring needs in ${city} homes ${landmark} vary considerably by housing type and neighbourhood. Older homes in established areas like ${neigh} often have original hardwood beneath layers of vinyl or carpet — and refinishing or restoring that original wood can be one of the most cost-effective and character-preserving flooring choices available. Newer builds benefit from luxury vinyl plank or engineered hardwood, which offer the look of natural wood with superior moisture resistance and dimensional stability across Niagara's seasonal humidity swings.\n\nOur flooring service covers installation of solid hardwood, engineered hardwood, luxury vinyl plank and tile (LVP/LVT), laminate, ceramic and porcelain tile, natural stone tile, and carpet. We also provide hardwood floor refinishing and staining services for existing hardwood that has worn but still has serviceable life. Our flooring installers are experienced craftspeople who pay close attention to subfloor preparation — the most critical and frequently overlooked factor in long-term flooring performance. A perfectly installed floor on a poor subfloor will crack, squeak, and separate. We never cut corners on prep.\n\nFor ${city} homeowners renovating multiple rooms or entire homes, we provide package pricing and consistent installation quality across all areas. We supply materials through our trade accounts, passing savings on to our clients while ensuring consistent quality. For your free ${city} flooring estimate, call (647) 797-9471 or fill out the form above.`,

  "painting": (city, landmark, neigh) =>
    `Professional painting is one of the highest-return renovations available to ${city} homeowners — delivering dramatic visual transformation at a fraction of the cost of structural renovations. But the difference between a professional paint job and an amateur one is immediately visible, and lasting. Niagara Renovation Company provides interior and exterior painting services throughout ${city} and all of Niagara Region, using premium paints and expert technique to deliver results that look flawless and stand the test of time.\n\nHomes in ${city} ${landmark} benefit from professional painting in different ways depending on property age and style. Older homes in areas like ${neigh} often have original trim millwork, plaster walls, and architectural details that require skilled painting technique to look their best — proper preparation, careful cut-in work, and the right sheen choices for each surface. Modern homes benefit from crisp, contemporary colour palettes applied with the precision and coverage consistency that only professional equipment and technique can deliver.\n\nOur interior painting service includes full room preparation (furniture moving, surface protection, patching and caulking), ceiling painting, wall painting, trim and door painting, and cleanup — leaving your home cleaner than we found it. Our exterior painting service includes thorough surface preparation (pressure washing, scraping, sanding, and priming), caulking of all joints and penetrations, and application of premium exterior paint in the appropriate finish for each surface. We use Benjamin Moore, Sherwin-Williams, and equivalent premium paints — because quality paint applied professionally is the only path to results that last.\n\nColour consultation is included with every painting project. Our experienced painters can advise on colour selection, sheen choices, and accent wall strategies that work for your specific space and lighting conditions. For ${city} homeowners looking for professional painting results, call (647) 797-9471 or fill out the form above for your free estimate.`,

  "windows-and-doors": (city, landmark, neigh) =>
    `Replacing the windows and doors in your ${city} home is one of the most impactful upgrades you can make for comfort, energy efficiency, and curb appeal. Old, drafty windows and deteriorating doors are among the largest sources of heat loss in Ontario homes — and in Niagara Region's climate, the impact on comfort and utility costs is significant year-round. Niagara Renovation Company provides professional window and door replacement throughout ${city} and all of Niagara Region, supplying and installing Energy Star certified products that deliver measurable improvements in every home we work in.\n\nWindow and door replacement in ${city} homes ${landmark} requires attention to the specific characteristics of each property's construction era. Older homes in established neighbourhoods like ${neigh} may have original wood window frames, masonry surrounds, or architectural features that require careful consideration during replacement — ensuring the new units integrate properly and maintain the character of the home. Newer homes may have vinyl windows approaching the end of their service life due to seal failure or frame distortion. Our team assesses every opening individually and specifies the right product and installation approach for your home.\n\nOur window and door service covers supply and installation of casement, double-hung, awning, picture, slider, and bay/bow windows in vinyl, fibreglass, and wood-clad profiles. We also supply and install entry doors (fibreglass, steel, wood), patio doors (sliding and French), storm doors, interior doors and hardware, and garage doors. All installations include proper flashing, air sealing, and insulation to prevent water infiltration and air leakage — the two most common causes of window replacement failures in Ontario.\n\nMany Energy Star certified window and door products qualify for federal rebates under the Canada Greener Homes program. We can advise you on which products qualify and how to access available grants. For your free ${city} window and door replacement estimate, call (647) 797-9471 or fill out the form above.`,

  "home-additions": (city, landmark, neigh) =>
    `A professionally built home addition is the most powerful way to add square footage, functionality, and value to your ${city} property without the disruption and cost of moving. Whether you are building a rear addition to expand your main living area, adding a second storey, constructing a garage with living space above, or enclosing a porch into a year-round sunroom, Niagara Renovation Company has the expertise, experience, and local permit knowledge to deliver your ${city} home addition from design through completion.\n\nHome additions in ${city} ${landmark} require a contractor who understands local zoning regulations, lot coverage rules, setback requirements, and the Niagara Region building permit process. Properties across areas like ${neigh} vary significantly in lot size, existing footprint, and permitted building envelope — and navigating these regulations correctly from the beginning saves considerable time and money. Our team has successfully permitted and built additions throughout ${city} and all of Niagara Region, and we handle every step of the approval process on your behalf.\n\nOur home addition service is truly full-service: site assessment and feasibility review, design consultation and permit drawing coordination (with licensed designers or architects as required), foundation and structural work, framing, roofing tie-in, insulation and air barrier, exterior cladding and windows, electrical, plumbing, HVAC extension, drywall, flooring, cabinetry, and all interior and exterior finishing. We manage every trade involved in your addition project, eliminating the coordination complexity and accountability gaps that derail DIY-managed addition projects.\n\nA quality home addition built by licensed, insured contractors with proper permits is a permanent, insurable improvement to your ${city} property — reflected in your home's appraised value and desirability to future buyers. Unpermitted additions create legal and financial complications that far outweigh any short-term savings. For a free consultation and estimate on your ${city} home addition, call (647) 797-9471 or fill out the form above today.`,
};

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

function getBodyCopy(serviceName: string, serviceSlug: string, cityName: string, cityLandmark: string, neighbourhoods: string[]): string {
  const neigh = neighbourhoods.length > 0 ? neighbourhoods.slice(0, 3).join(", ") : cityName;
  const template = serviceBodyTemplates[serviceSlug];
  if (template) return template(cityName, cityLandmark, neigh);
  return `Looking for trusted ${serviceName.toLowerCase()} experts in ${cityName}, Ontario? Niagara Renovation Company has been delivering exceptional ${serviceName.toLowerCase()} services to homeowners in ${cityName} for over 15 years. Our team works ${cityLandmark}, serving established neighbourhoods including ${neigh}. We take pride in the quality craftsmanship and personal service we bring to every project in this community.\n\nOur ${serviceName.toLowerCase()} service in ${cityName} covers every aspect of the project — from initial design consultation and detailed written estimates through to final inspection and handover. We handle building permits, coordinate all required sub-trades, and manage every phase of your renovation under a single contract with a single point of accountability. Whether you have a straightforward update or a complex transformation in mind, we have the skills and local experience to bring your vision to life.\n\nWe provide detailed written estimates at no cost and no obligation, handle all required permits, and back every project with our comprehensive 5-year workmanship warranty. Our ${cityName} clients consistently praise our attention to detail, respect for their homes, and commitment to finishing on schedule and within budget. We are fully licensed in Ontario and carry comprehensive commercial liability insurance and WSIB coverage for all workers on your property.\n\nNiagara Renovation Company's reputation in ${cityName} is built on repeat business and referrals from satisfied homeowners who trust us to deliver outstanding results. We would be honoured to add your project to our portfolio and your name to our list of ${cityName} families who recommend us to their neighbours. Call (647) 797-9471 or fill out the form above to get your free, no-obligation ${cityName} ${serviceName.toLowerCase()} quote today.`;
}

export default async function CityServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = CITIES.find(c => c.slug === citySlug);
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!city || !service) return notFound();

  const servicePhrase = cityServiceInlinePhrase[service.slug] ?? service.name.toLowerCase();
  const override = cityServiceOverrides[`${city.slug}/${service.slug}`];
  const serviceLabel = override?.serviceLabel ?? service.name;
  const bodyCopy = getBodyCopy(service.name, service.slug, city.name, city.landmark, (city as CityServiceData).neighbourhoods ?? []);
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
  const faqs = override?.faqs ?? defaultFaqs;

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
          {(override?.planningItems ?? serviceKeyInclusions[service.slug]) && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              {override ? (
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">{override.planningHeading}</h3>
              ) : (
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">What&apos;s Included</h3>
              )}
              <ul className="grid sm:grid-cols-2 gap-2">
                {(override?.planningItems ?? serviceKeyInclusions[service.slug]).map((item, i) => (
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
          {(override?.body ?? bodyCopy.split("\n\n").filter(p => p.trim())).map((paragraph, i) => (
            <p key={i} className="text-gray-700 text-lg leading-relaxed mb-5">{paragraph.trim()}</p>
          ))}
        </div>
      </section>

      {/* TRUST SIGNALS (hidden on override pages: unconfirmed claims) */}
      {!override && (
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
            {override ? override.localInsight : (city as CityServiceData).cityDesc}
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
          {!override && (
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
