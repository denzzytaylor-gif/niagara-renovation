import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import CTABanner from "@/components/CTABanner";
import Breadcrumb from "@/components/Breadcrumb";
import CityGrid from "@/components/CityGrid";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { SERVICES, TESTIMONIALS, SERVICE_IMAGES } from "@/lib/data";
import IMAGES from "@/lib/images.json";

export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map(s => ({ service: s.slug }));
}

const serviceDetails: Record<string, {
  intro: string;
  included: string[];
  faq: { q: string; a: string }[];
}> = {
  "kitchen-renovations": {
    intro: "Your kitchen is the heart of your home, and a well-designed renovation transforms the way your family lives and entertains. At Niagara Renovation Company, we specialize in full kitchen renovations across Niagara Region — from custom cabinetry and quartz countertops to premium appliance packages and open-concept layouts. Whether you want a modern minimalist kitchen, a warm traditional space, or a bold contemporary design, we work closely with you to create a kitchen that reflects your style and meets your family's needs.\n\nOur kitchen renovation service covers every element of the project under one roof — custom or semi-custom cabinetry, countertop supply and installation (quartz, granite, laminate), kitchen island design and construction, tile backsplash, under-cabinet and pot-light lighting, plumbing rough-in and fixture installation, electrical upgrades, and new flooring. Managing every trade eliminates coordination headaches and gives you a single point of accountability from demolition to final walkthrough.\n\nWe provide detailed written quotes before any work begins, with no surprise charges and no scope changes without your written approval. Our 5-year workmanship warranty ensures our commitment to your kitchen extends long after the last cabinet door is hung. Call (647) 797-9471 or fill out the form above to arrange your free, no-obligation Niagara kitchen renovation consultation.",
    included: [
      "Custom or semi-custom cabinetry design and installation",
      "Countertop supply and installation (quartz, granite, laminate)",
      "Kitchen island design and construction",
      "Tile backsplash installation",
      "Under-cabinet and pot-light lighting",
      "Plumbing rough-in and fixture installation",
      "Electrical upgrades and panel work",
      "Flooring installation (tile, hardwood, LVP)",
    ],
    faq: [
      { q: "How long does a kitchen renovation take in Niagara?", a: "A standard kitchen renovation typically takes 4–6 weeks from demolition to completion. Larger or more complex projects may take 8–10 weeks. We provide a detailed timeline at the estimate stage." },
      { q: "Do I need permits for a kitchen renovation?", a: "Permits are required if you're moving walls, changing plumbing locations, or doing electrical upgrades. We handle all permits on your behalf as part of our full-service offering." },
      { q: "Can I stay in my home during the renovation?", a: "Yes, most homeowners stay in their home during a kitchen renovation. We set up a temporary kitchen area and maintain a clean, safe worksite throughout the project." },
      { q: "What kitchen cabinet brands do you work with?", a: "We work with a range of suppliers from mid-range to premium, including local Ontario cabinet makers. We'll recommend options that suit your budget and aesthetic preferences." },
      { q: "How do I get a quote for my kitchen renovation?", a: "Simply fill out the form on this page or call us at (647) 797-9471. We'll arrange a free in-home consultation and provide a detailed written estimate within 48 hours — no obligation." },
    ],
  },
  "bathroom-renovations": {
    intro: "A beautifully renovated bathroom adds immediate value to your home and improves your daily quality of life. Niagara Renovation Company delivers stunning bathroom renovations throughout Niagara Region, Ontario — from elegant master ensuite transformations to practical main bath upgrades and accessible barrier-free designs. Our experienced bathroom renovation team handles everything from tile selection and heated floor installation to custom vanities and frameless glass shower enclosures. We understand that bathrooms are the most used rooms in your home, so we work efficiently to minimize disruption and complete your renovation as quickly as possible without sacrificing any quality.",
    included: [
      "Full demolition and disposal",
      "Custom tile shower and tub surrounds",
      "Frameless glass shower enclosures",
      "Freestanding and built-in tub installation",
      "Custom vanity and countertop installation",
      "Heated floor (in-floor radiant) systems",
      "Toilet, faucet, and fixture upgrades",
      "Exhaust fan and lighting installation",
    ],
    faq: [
      { q: "How long does a bathroom renovation take?", a: "A standard bathroom renovation takes 2–3 weeks. A master ensuite with custom tile work may take 4–5 weeks. We provide a detailed schedule at the quoting stage." },
      { q: "Can you make my bathroom accessible?", a: "Yes! We design and build barrier-free, accessible bathrooms with roll-in showers, grab bars, comfort-height toilets, and wider doorways to accommodate mobility needs." },
      { q: "What's the most popular bathroom renovation in Niagara?", a: "Walk-in tile showers with frameless glass enclosures are extremely popular right now, along with double vanities and freestanding soaker tubs for master ensuites." },
      { q: "Do I need a permit for a bathroom renovation?", a: "Permits are required for any structural changes, plumbing relocations, or electrical work. We manage all permits and inspections as part of our service." },
      { q: "How do I get started with my bathroom renovation?", a: "Fill out the form on this page or call us at (647) 797-9471. We provide a free in-home consultation and detailed written estimate with no obligation." },
    ],
  },
  "basement-finishing": {
    intro: "Your unfinished basement is one of the most valuable untapped assets in your Niagara Region home. Niagara Renovation Company transforms unfinished basements into beautiful, functional living spaces — finished family rooms, home theatres, home offices, legal basement suites, in-law apartments, and rental units that generate real monthly income. A professionally renovated basement is one of the highest-return investments a Niagara homeowner can make, adding substantial square footage and market value without the cost of an addition.\n\nEvery basement renovation starts with a moisture assessment. Niagara Region's climate means moisture management is non-negotiable — we identify and address any water intrusion before a single stud goes up, ensuring your finished basement stays dry, comfortable, and mould-free for decades. From spray foam rim joist insulation and drainage solutions to vapour barriers and sump system review, we handle moisture first so your investment is protected.\n\nOur complete basement renovation service covers framing, insulation, drywall, painting, flooring, pot lights, electrical panel upgrades, bathroom rough-in and finishing, egress windows for legal bedrooms, and all required building permits. Whether you're creating a recreational space for your family, a legal rental suite for income, or an in-law apartment for a family member, our team delivers code-compliant, professionally finished basements across all 12 Niagara Region municipalities.",
    included: [
      "Moisture assessment and waterproofing remediation",
      "Steel stud or wood framing and vapour barrier",
      "Spray foam rim joist and batt wall insulation",
      "Drywall, taping, mudding, and painting",
      "Pot light and electrical panel upgrades",
      "Full bathroom or powder room rough-in and finishing",
      "Flooring installation (LVP, carpet, tile)",
      "Egress window installation for legal bedrooms",
      "Legal basement suite and in-law apartment builds",
      "Building permit applications and inspection management",
    ],
    faq: [
      { q: "Do I need a permit to renovate my basement?", a: "Yes, a building permit is required to finish or renovate a basement in Ontario. We manage the entire permit process — application, drawings, and all required inspections at each stage." },
      { q: "How long does a basement renovation take?", a: "A standard open-concept basement rec room takes 6–10 weeks. A basement with a full bathroom and wet bar takes 10–14 weeks. A legal basement suite with separate entrance takes 12–16 weeks including permits." },
      { q: "Can you build a legal basement suite for rental income?", a: "Yes. We design and build legal basement suites with separate entrances, full kitchens, bathrooms, egress windows, and separate electrical panels — meeting all Ontario Building Code and local zoning requirements for a rentable unit." },
      { q: "What moisture issues should I address before finishing?", a: "We assess every basement for water infiltration, efflorescence, grading issues, and drainage before starting. We address any moisture sources first — this is essential for a lasting, dry finished basement in Niagara's climate." },
      { q: "How do I get a free basement renovation estimate?", a: "Fill out the form on this page or call us at (647) 797-9471. We'll arrange a free in-home consultation and provide a detailed written estimate within 48 hours — no obligation." },
    ],
  },
  "home-additions": {
    intro: "When your family has outgrown your home, a well-planned addition is the best way to gain the space you need without the disruption and cost of moving. Niagara Renovation Company designs and builds home additions throughout Niagara Region — main floor extensions, second-storey additions, sunrooms, garage conversions, and in-law suites — built to integrate seamlessly with your existing home.\n\nOur team of architects, engineers, and skilled tradespeople works with you from initial design through to the final coat of paint, matching rooflines, exterior cladding, trim details, and interior finishes so the addition looks like it was always part of the home. We handle all permit applications, structural engineering coordination, and required inspections on your behalf — you never need to deal with the building department yourself.\n\nOur home addition service is truly full-service: site feasibility, architectural design, foundation and structural work, framing, insulation, roofing, windows and exterior cladding, electrical, plumbing, drywall, flooring, cabinetry, and all interior finishing. A quality addition built by licensed, insured contractors with proper permits is a permanent, insurable improvement reflected in your property's appraised value. Contact us at (647) 797-9471 or fill out the form above to start planning your addition today.",
    included: [
      "Architectural design and engineering",
      "Building permit applications and management",
      "Full foundation and structural work",
      "Framing, insulation, and exterior cladding",
      "Roofing to match existing",
      "Windows and exterior doors",
      "Interior finishing (drywall, flooring, trim)",
      "Electrical and plumbing integration",
    ],
    faq: [
      { q: "How long does a home addition take?", a: "A room addition typically takes 3–4 months. A full two-story addition or complex project can take 5–7 months. Design and permit approval add 4–8 weeks before construction begins." },
      { q: "Do I need to move out during construction?", a: "In most cases, you can remain in your home during construction. We sequence the work to maintain access and security. For very large additions, temporary relocation may be advisable for part of the project." },
      { q: "Will the addition match the rest of my house?", a: "Yes, matching your existing home is a priority. We carefully match rooflines, exterior cladding, windows, and interior finishes so the addition looks like an original part of the home." },
      { q: "What permits are required for a home addition in Ontario?", a: "Home additions require building, electrical, plumbing, and HVAC permits. We manage all permit applications and coordinate all required inspections throughout the project." },
      { q: "How do I get started with a home addition?", a: "Contact us at (647) 797-9471 or fill out the form on this page. We'll schedule a free consultation, discuss your vision, and provide a detailed written estimate at no cost." },
    ],
  },
  "roofing": {
    intro: "Your roof is your home's first line of defense against Ontario's harsh climate — from heavy snow loads and ice dams in winter to summer heat and severe thunderstorms. When it's time for a roof replacement or major repair, you need a contractor you can trust to do the job right. Niagara Renovation Company provides expert roofing services throughout Niagara Region, using premium shingles from industry-leading manufacturers with full labor and material warranties. Our roofing crews are experienced with all roofing systems including asphalt shingles, architectural shingles, metal roofing, flat roofing, and ice and water shield installation — ensuring your new roof will protect your home for decades to come.",
    included: [
      "Full tear-off of existing roofing",
      "Decking inspection, repair, and replacement",
      "Ice and water shield installation",
      "Synthetic underlayment",
      "Premium architectural or 3-tab shingles",
      "Proper ventilation system installation",
      "New flashing (valleys, chimneys, skylights)",
      "Complete cleanup and disposal",
    ],
    faq: [
      { q: "How long does a roof replacement take?", a: "Most residential roof replacements are completed in 1–3 days. Large or complex roofs with multiple valleys, dormers, or chimneys may take 3–5 days." },
      { q: "How often should a roof be replaced?", a: "Asphalt shingles typically last 20–30 years in Ontario's climate. If your roof is approaching that age, showing granule loss, or has multiple layers, it's time for a replacement." },
      { q: "Do you offer roof repairs as well as replacements?", a: "Yes! We offer comprehensive repair services for missing shingles, flashing failures, ice dam damage, and more. We'll advise you honestly on whether repair or replacement makes more financial sense." },
      { q: "What roofing materials do you use?", a: "We use premium materials from manufacturers like IKO, GAF, and Owens Corning. We offer standard 3-tab shingles, dimensional architectural shingles, designer shingles, and metal roofing options." },
      { q: "How do I get a free roofing estimate?", a: "Call us at (647) 797-9471 or fill out the form on this page. We'll inspect your roof and provide a detailed written estimate at no cost or obligation." },
    ],
  },
  "flooring": {
    intro: "New flooring can completely transform the look and feel of your home. Niagara Renovation Company installs beautiful, durable flooring throughout Niagara Region homes — including hardwood, engineered hardwood, tile, natural stone, laminate, and luxury vinyl plank (LVP). Our experienced flooring installers take pride in precision cuts, tight seams, and seamless transitions that result in a finished product that looks showroom-worthy. Whether you want the timeless warmth of real hardwood in your living room, elegant porcelain tile in your entryway, or durable, waterproof LVP in your basement — we have the expertise and product knowledge to guide you through the selection process and deliver flawless installation.",
    included: [
      "Subfloor assessment and preparation",
      "Removal and disposal of existing flooring",
      "Hardwood flooring supply and installation",
      "Engineered hardwood installation",
      "Luxury vinyl plank (LVP) installation",
      "Porcelain and ceramic tile installation",
      "Laminate flooring installation",
      "Baseboards and transitions",
    ],
    faq: [
      { q: "What type of flooring is best for Niagara homes?", a: "Luxury vinyl plank (LVP) is extremely popular for its durability, waterproof properties, and realistic wood look. Hardwood remains the premium choice for living areas, while porcelain tile is ideal for kitchens and bathrooms." },
      { q: "How long does flooring installation take?", a: "A typical room takes 1–2 days. Whole-home flooring projects usually take 3–5 days depending on size, material, and subfloor preparation required." },
      { q: "Can you install hardwood over concrete?", a: "Engineered hardwood and LVP can be installed over concrete. Solid hardwood typically requires a wood subfloor. We assess your subfloor and recommend the best flooring options for your specific situation." },
      { q: "Do you supply the flooring materials?", a: "Yes! We supply all flooring materials at competitive trade prices. We can also install flooring you've purchased elsewhere. We'll guide you through product selection to ensure quality and compatibility." },
      { q: "How do I get a free flooring estimate?", a: "Fill out the form on this page or call (647) 797-9471. We'll assess your space and provide a detailed written estimate with no obligation." },
    ],
  },
  "painting": {
    intro: "A fresh coat of paint is one of the most cost-effective ways to transform your home — and professional results make all the difference. Niagara Renovation Company provides premium interior and exterior painting services throughout Niagara Region, Ontario. Our painting crews use top-quality paints from Benjamin Moore and Sherwin-Williams, proper preparation techniques (filling, sanding, priming), and meticulous masking to deliver a flawless finish that will last for years. Whether you're refreshing a single room, painting your entire interior before selling, or protecting and beautifying your home's exterior, our painters will deliver a clean, smooth, professional result on time and on budget.",
    included: [
      "Thorough wall repair (holes, cracks, dents)",
      "Surface cleaning and preparation",
      "Primer application as needed",
      "Two coats of premium paint",
      "Trim, baseboard, and door painting",
      "Ceiling painting",
      "Exterior surface preparation and painting",
      "Complete cleanup and protection of floors/furniture",
    ],
    faq: [
      { q: "What paint brands do you use?", a: "We use premium paints from Benjamin Moore and Sherwin-Williams. These brands offer superior coverage, durability, and washability compared to budget brands. We can match any colour you choose." },
      { q: "How long does interior painting take?", a: "A standard room takes 1 day. A whole-home interior paint (average 2,000 sq ft) typically takes 4–6 days including proper preparation and two coats." },
      { q: "Do I need to move my furniture?", a: "We ask that you remove small items and valuables. Our crew will move larger furniture as needed, cover floors and remaining items with drop cloths, and return everything to its original place." },
      { q: "Do you paint exterior as well?", a: "Yes! We provide complete exterior painting services including proper power washing, surface preparation, priming bare wood, and applying two coats of premium exterior paint or solid stain." },
      { q: "How do I get a free painting estimate?", a: "Call us at (647) 797-9471 or fill out the form on this page for a free, no-obligation quote. We respond within 2 business hours." },
    ],
  },
  "windows-and-doors": {
    intro: "Old, drafty windows and doors are one of the biggest sources of energy loss in Ontario homes. Replacing them with modern, energy-efficient units not only makes your home more comfortable but can significantly reduce your heating and cooling costs. Niagara Renovation Company supplies and installs premium energy-efficient windows and doors throughout Niagara Region, working with top Canadian manufacturers to offer a wide selection of styles, finishes, and glazing options. From casement and double-hung windows to patio doors and beautiful front entry door systems, our installation team ensures a weathertight fit, perfect operation, and a clean, professional finish inside and out — transforming both the appearance and performance of your home. Niagara's climate, with cold winters, freeze-thaw cycles, and humid summers, demands windows and doors that perform at the highest level year-round. Our products are specifically specified for Ontario's climate zones, with triple-pane glazing options, warm-edge spacer technology, and thermally broken frames that eliminate condensation and cold drafts. Every installation is completed by trained, certified technicians who understand the specific requirements of Niagara-area homes.",
    included: [
      "In-home measurement and product consultation",
      "Premium Energy Star certified window supply",
      "Complete window installation and finishing",
      "Exterior capping and caulking",
      "Interior trim and casing",
      "Entry door and patio door installation",
      "Weatherstripping and threshold installation",
      "Haul-away and disposal of old units",
    ],
    faq: [
      { q: "What window brands do you install?", a: "We work with quality Canadian manufacturers including Gentek, Enerview, and WindowSeal West. All products are Energy Star certified for Ontario's climate zone." },
      { q: "How long does window replacement take?", a: "A typical window replacement of 10–15 windows is usually completed in 1–2 days. We install windows one at a time to minimize exposure and maintain security throughout the process." },
      { q: "Will new windows reduce my energy bills?", a: "Yes! Modern triple-pane or high-efficiency double-pane windows with low-e coating and argon fill can reduce heat loss through windows by 40–60% compared to older single-pane units." },
      { q: "Do you offer front door replacement?", a: "Absolutely! We offer a wide selection of fiberglass and steel entry door systems, including decorative glass options, sidelights, and transom windows for stunning curb appeal and security." },
      { q: "How do I get a free window and door estimate?", a: "Fill out the form on this page or call (647) 797-9471. We'll measure your windows, discuss your options, and provide a detailed written estimate at no cost." },
    ],
  },
  "general-contracting": {
    intro: "When your renovation project involves multiple trades, complex sequencing, or significant structural changes, you need an experienced general contractor who can coordinate everything seamlessly. Niagara Renovation Company provides full-service general contracting throughout Niagara Region — managing everything from initial design and engineering through permit applications, trade scheduling, material procurement, site supervision, and final inspection.\n\nAs a licensed general contractor, we take complete responsibility for the outcome of your project. We work with a carefully vetted network of licensed sub-trades — electricians, plumbers, HVAC technicians, roofers, and specialty contractors — managing their work to ensure quality, safety, and schedule compliance at every stage. For homeowners and property investors planning whole-home renovations, complex structural remodels, multi-unit residential projects, or significant additions requiring comprehensive engineering, our general contracting team has the systems and experience to deliver.\n\nOur detailed pre-construction planning process ensures surprises are minimized, budgets are respected, and timelines are realistic from day one. Every project includes a comprehensive written contract covering the full scope of work, materials, payment schedule, timeline, and change-order process. We serve homeowners and property investors across all 12 Niagara Region municipalities — call (647) 797-9471 or fill out the form above to discuss your project.",
    included: [
      "Complete project management and site supervision",
      "Design coordination and architectural liaison",
      "Building permit applications and management",
      "Licensed sub-trade hiring and scheduling",
      "Material procurement and supply chain management",
      "Budget tracking and transparent financial reporting",
      "Structural and engineering coordination",
      "Final inspection and occupancy permit support",
    ],
    faq: [
      { q: "What is the difference between a general contractor and a renovation company?", a: "A licensed general contractor takes legal and financial responsibility for the entire project — hiring sub-trades, pulling permits, and managing all aspects of construction. As a full-service renovation company and licensed GC, Niagara Renovation Company provides both the hands-on trade work and the project management oversight." },
      { q: "Do I need a general contractor for my renovation?", a: "For renovations involving multiple trades, structural changes, or permits, a general contractor is strongly recommended. A GC coordinates all trades, manages timelines, and ensures the work meets Ontario Building Code — protecting you from the risks of managing independent contractors yourself." },
      { q: "How do you handle unexpected issues during construction?", a: "Unexpected conditions are a reality in renovation. We address them transparently — documenting the issue, presenting options with honest cost implications, and recommending the best path forward. We never proceed with scope changes without your written approval." },
      { q: "Do you provide a written contract?", a: "Yes. Every project includes a comprehensive written contract covering scope of work, materials, timeline, payment schedule, and warranty terms. We do not proceed without a signed agreement that protects both parties." },
      { q: "How do I get started with a general contracting project?", a: "Call us at (647) 797-9471 or fill out our contact form. We'll schedule a consultation, review your project, and provide a detailed scope and estimate at no charge." },
    ],
  },
  "additions-adu": {
    intro: "Accessory dwelling units are one of the smartest investments a Niagara Region homeowner can make right now. Whether you're building a detached garden suite in your backyard, converting a garage into a self-contained apartment, creating a legal basement suite, or constructing an above-garage secondary unit, Niagara Renovation Company designs and builds ADUs throughout Niagara Region — from concept and zoning review through permits, construction, and final occupancy certificate.\n\nOntario's Planning Act now permits additional residential units in most residential zones, and Niagara's municipalities have updated their zoning bylaws to allow garden suites and secondary units on most residential properties. Our team reviews your specific property's zoning, lot coverage, setbacks, and municipal requirements before any commitment — so you know exactly what's permitted on your lot before you invest a dollar.\n\nA well-designed ADU in Niagara Region generates meaningful rental income that can significantly offset your mortgage or provide comfortable accommodation for aging family members. We have completed garden suites, garage conversions, detached coach houses, above-garage apartments, and legal basement suites throughout Niagara Falls, St. Catharines, Welland, Grimsby, Thorold, Fort Erie, and across the region. Our ADU builds include full architectural drawings, permit coordination, foundation and structural work, separate electrical service, full plumbing, insulation, and complete interior and exterior finishing — built to Ontario Building Code and ready for occupancy.",
    included: [
      "Site assessment and zoning/bylaw review",
      "Architectural design and engineering drawings",
      "Building permit applications and management",
      "Foundation and structural work for detached suites",
      "Full framing, insulation, and exterior cladding",
      "Separate electrical service and panel installation",
      "Plumbing rough-in and full bathroom/kitchen finishing",
      "Interior finishing, flooring, trim, and painting",
    ],
    faq: [
      { q: "Is an ADU legal in my Niagara Region municipality?", a: "Ontario's Planning Act now permits additional residential units in most residential zones. Specific setbacks, coverage limits, and design standards vary by municipality. We review your property's zoning before any commitment and advise you on exactly what is permitted." },
      { q: "What types of ADUs can you build?", a: "We build detached garden suites, garage conversion suites, above-garage apartments, basement secondary suites, and attached in-law additions. Each type has different permit, design, and construction requirements that we navigate on your behalf." },
      { q: "How long does it take to build a detached garden suite?", a: "A detached garden suite typically takes 4–6 months from permit issuance to occupancy — including 4–8 weeks for permit approval. We provide a detailed schedule at the quoting stage." },
      { q: "Can a garden suite generate rental income?", a: "Yes. A well-designed ADU in Niagara Region can generate substantial monthly rental income, significantly offsetting your mortgage. Many homeowners find that an ADU pays for itself within a reasonable timeframe in the current rental market." },
      { q: "How do I find out if I can build an ADU on my property?", a: "Contact us at (647) 797-9471 for a free consultation. We'll review your address, confirm what's permitted under local zoning, and walk you through the entire process from concept to keys." },
    ],
  },
  "decks-outdoor": {
    intro: "A beautifully designed outdoor living space extends your home's usable square footage, elevates your lifestyle, and adds meaningful value to your property. Niagara Renovation Company designs and builds custom decks, pergolas, covered patios, outdoor kitchens, and complete outdoor living environments for homeowners throughout Niagara Region, Ontario. Niagara's climate — with warm, sunny summers and the scenic beauty of the escarpment, vineyards, and lakefront settings — makes outdoor living a priority for many local homeowners. We work with premium materials including pressure-treated lumber, composite decking (Trex, TimberTech), natural hardwoods, and low-maintenance aluminum systems to create outdoor spaces that are as durable as they are beautiful. Our outdoor living projects begin with a thorough understanding of how you want to use the space — whether you entertain large groups, want a quiet retreat, need play space for kids, or dream of al fresco dining with an outdoor kitchen. We then design a space that maximizes your yard, works with your home's architecture, and uses materials suited to your lifestyle and maintenance preferences. Every deck and structure we build is designed to Ontario Building Code, properly permitted, and built on engineered footings that will remain stable through freeze-thaw cycles for years to come. We are proud to have transformed hundreds of backyards across Niagara Falls, St. Catharines, Grimsby, Niagara-on-the-Lake, and throughout the region.",
    included: [
      "Custom deck design and engineering",
      "Building permit application and management",
      "Engineered footing and post installation",
      "Composite, hardwood, or pressure-treated decking",
      "Custom pergola and shade structure construction",
      "Glass or aluminum railing systems",
      "Outdoor kitchen and BBQ station installation",
      "Lighting, electrical, and gas rough-in",
    ],
    faq: [
      { q: "Do I need a permit for a deck in Niagara Region?", a: "Yes. Decks over 24 inches above grade require a building permit in Ontario municipalities. We handle the permit application and ensure your deck is engineered to meet all local building code requirements." },
      { q: "What is the best decking material for Niagara's climate?", a: "Composite decking (Trex, TimberTech) is extremely popular for Niagara homeowners because it is impervious to moisture, freeze-thaw damage, and insect damage. It looks beautiful, never needs staining, and lasts decades. Pressure-treated lumber remains a cost-effective option for larger structures." },
      { q: "How long does a deck build take?", a: "A standard deck (200–400 sq ft) typically takes 5–10 business days to build once permits are approved. Permit approval usually takes 3–6 weeks. We schedule projects around permit timelines to minimize wait time." },
      { q: "Can you add a covered roof or pergola to my existing deck?", a: "Absolutely. We design and build covered pergolas, full roof structures, screen enclosures, and louvered aluminum systems that transform an existing deck into a true four-season outdoor room." },
      { q: "How do I get a free deck estimate?", a: "Fill out the form on this page or call us at (647) 797-9471. We'll visit your property, discuss your vision, and provide a detailed written estimate at no cost or obligation." },
    ],
  },
  "commercial-renovations": {
    intro: "When your business space no longer reflects the quality of your brand, affects staff productivity, or fails to meet the expectations of your clients, it is time to invest in a professional commercial renovation. Niagara Renovation Company provides expert commercial renovation services throughout Niagara Region — from office fit-outs and retail store renovations to restaurant remodels, medical and dental office upgrades, industrial facility improvements, and multi-unit residential projects. We understand that commercial clients have unique needs that differ fundamentally from residential renovation. Downtime costs money. Work must often be phased around business operating hours. Specifications must meet commercial building codes, accessibility requirements, and tenant improvement standards. Our commercial team is experienced in managing these requirements, delivering projects that minimize business disruption, meet all applicable Ontario Building Code and Accessibility for Ontarians with Disabilities Act (AODA) standards, and complete on the aggressive schedules that commercial clients demand. We work with property owners, business owners, property managers, and commercial real estate professionals across Niagara Falls, St. Catharines, Welland, Grimsby, and throughout the region. Our commercial renovation services span tenant improvement fit-outs for new leases, full gut-renovations of existing commercial spaces, exterior commercial upgrades, and phased renovation programs for occupied facilities. Every commercial project is managed by a dedicated project manager who provides regular reporting, transparent budget tracking, and proactive communication throughout the project lifecycle.",
    included: [
      "Commercial space planning and design",
      "Building permit applications (commercial)",
      "Structural alterations and mezzanines",
      "Commercial electrical, data, and AV rough-in",
      "Plumbing and mechanical upgrades",
      "Accessible washroom installations (AODA)",
      "Commercial flooring, ceilings, and wall finishes",
      "Signage, storefront, and exterior upgrades",
    ],
    faq: [
      { q: "Can you work around our business hours?", a: "Yes. We regularly schedule commercial renovation work in phases, after hours, or on weekends to minimize disruption to your operations. We discuss scheduling in detail before any contract is signed." },
      { q: "Do you handle commercial building permits?", a: "Yes. We manage all commercial building permit applications, drawings, and inspections. Commercial permits require additional documentation including architectural and engineering drawings, fire code compliance, and AODA accessibility review." },
      { q: "Do you do tenant improvement (TI) work?", a: "Tenant improvement is a significant part of our commercial work. We work directly with commercial tenants and their landlords to deliver fit-outs on schedule and within TI allowance budgets, often on accelerated timelines for lease-start deadlines." },
      { q: "What types of commercial spaces do you renovate?", a: "We renovate offices, retail stores, restaurants and cafes, medical and dental clinics, hair salons, fitness studios, light industrial facilities, and multi-unit residential buildings throughout Niagara Region." },
      { q: "How do I get a commercial renovation estimate?", a: "Call us at (647) 797-9471 or fill out our contact form. We'll arrange a site visit, review your space and requirements, and provide a detailed commercial renovation estimate at no charge." },
    ],
  },
};

const serviceSEO: Record<string, { title: string; description: string }> = {
  "basement-finishing": {
    title: "Basement Renovations in Niagara Region | Finished Basements & Legal Suites",
    description: "Basement renovations in Niagara Region for finished basements, legal suites, in-law apartments and living space upgrades. Licensed contractor. Request a quote today.",
  },
  "kitchen-renovations": {
    title: "Kitchen Renovations in Niagara Region | Custom Kitchen Remodels",
    description: "Kitchen renovations in Niagara Region with custom layouts, cabinetry, countertops, flooring and full project management. Licensed contractor. Request a quote.",
  },
  "additions-adu": {
    title: "ADU Builder in Niagara Region | Garden Suites & Legal Units",
    description: "ADU builder in Niagara Region for garden suites, garage conversions, legal basement suites and accessory dwelling units. Request a property assessment today.",
  },
  "general-contracting": {
    title: "General Contractor in Niagara Region | Full Home Renovations",
    description: "General contractor in Niagara Region for full home renovations, additions, kitchens, basements and multi-trade projects. Licensed & insured. Request a quote.",
  },
  "home-additions": {
    title: "Home Additions in Niagara Region | Add More Living Space",
    description: "Home additions in Niagara Region for room extensions, second storeys, sunrooms and garage conversions. Licensed contractor. Request a quote today.",
  },
};

const serviceNiagaraH2: Record<string, string> = {
  "basement-finishing": "Finished Basement Renovation Services Across Niagara",
  "kitchen-renovations": "Custom Kitchen Renovations for Niagara Homeowners",
  "additions-adu": "ADU and Garden Suite Builds Across Niagara Region",
  "general-contracting": "General Contracting for Niagara Renovation Projects",
  "home-additions": "Home Addition Services for Niagara Properties",
};

const serviceRelatedLinks: Record<string, Array<{ href: string; label: string }>> = {
  "basement-finishing": [
    { href: "/services/additions-adu", label: "ADU Builds & Legal Suites" },
    { href: "/services/bathroom-renovations", label: "Bathroom Renovations" },
    { href: "/services/flooring", label: "Flooring Installation" },
    { href: "/services/general-contracting", label: "General Contracting" },
    { href: "/contact", label: "Get a Free Estimate" },
  ],
  "kitchen-renovations": [
    { href: "/services/general-contracting", label: "Full Home Renovations" },
    { href: "/services/flooring", label: "Flooring Installation" },
    { href: "/services/bathroom-renovations", label: "Bathroom Renovations" },
    { href: "/contact", label: "Get a Free Estimate" },
  ],
  "additions-adu": [
    { href: "/services/basement-finishing", label: "Basement Renovations" },
    { href: "/services/home-additions", label: "Home Additions" },
    { href: "/services/general-contracting", label: "General Contracting" },
    { href: "/contact", label: "Request a Property Assessment" },
  ],
  "general-contracting": [
    { href: "/services/basement-finishing", label: "Basement Renovations" },
    { href: "/services/kitchen-renovations", label: "Kitchen Renovations" },
    { href: "/services/additions-adu", label: "ADU Builds" },
    { href: "/services/home-additions", label: "Home Additions" },
    { href: "/contact", label: "Get a Free Estimate" },
  ],
  "home-additions": [
    { href: "/services/additions-adu", label: "ADU Builds & Garden Suites" },
    { href: "/services/general-contracting", label: "General Contracting" },
    { href: "/services/kitchen-renovations", label: "Kitchen Renovations" },
    { href: "/contact", label: "Get a Free Estimate" },
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!service) return { title: "Service Not Found" };
  const image = SERVICE_IMAGES[service.slug] || SERVICE_IMAGES["kitchen-renovations"];
  const seo = serviceSEO[service.slug];

  const title = seo?.title ?? `${service.name} in Niagara Region, ON`;
  const description = seo?.description ?? `Expert ${service.name.toLowerCase()} in Niagara Region, Ontario. Licensed & insured contractors. Free estimates. Call (647) 797-9471.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.niagararenovationcompany.com/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.niagararenovationcompany.com/services/${service.slug}`,
      images: [{ url: image, width: 1400, height: 788, alt: `${service.name} in Niagara Region, Ontario` }],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!service) return notFound();

  const details = serviceDetails[service.slug];
  const testimonial = TESTIMONIALS.find(t => t.service === service.name) || TESTIMONIALS[0];
  const serviceImage = SERVICE_IMAGES[service.slug] || SERVICE_IMAGES["kitchen-renovations"];

  const serviceTypeMap: Record<string, string> = {
    "basement-finishing": "Basement Renovation",
    "kitchen-renovations": "Kitchen Renovation",
    "additions-adu": "Accessory Dwelling Unit Construction",
    "general-contracting": "General Contracting",
    "home-additions": "Home Addition Construction",
    "bathroom-renovations": "Bathroom Renovation",
    "roofing": "Roofing",
    "flooring": "Flooring Installation",
    "painting": "Painting",
    "windows-and-doors": "Window and Door Installation",
    "decks-outdoor": "Deck Construction",
    "commercial-renovations": "Commercial Renovation",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "serviceType": serviceTypeMap[service.slug] ?? service.name,
    "description": serviceSEO[service.slug]?.description ?? service.shortDesc,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Niagara Renovation Company",
      "telephone": "+16477979471",
      "url": "https://www.niagararenovationcompany.com",
    },
    "areaServed": { "@type": "AdministrativeArea", "name": "Niagara Region, Ontario" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "description": "Free estimate — no obligation",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.niagararenovationcompany.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.niagararenovationcompany.com/services" },
      { "@type": "ListItem", "position": 3, "name": service.name, "item": `https://www.niagararenovationcompany.com/services/${service.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": details.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const processSteps = [
    { step: "1", title: "Free Consultation", desc: "We visit your home, assess your project, discuss your vision, and answer all your questions — at no cost or obligation." },
    { step: "2", title: "Detailed Quote", desc: "You receive a comprehensive written quote outlining all costs, materials, timeline, and payment schedule within 48 hours." },
    { step: "3", title: "Project Execution", desc: "Our skilled team gets to work, keeping you informed every step of the way and maintaining a clean, safe worksite." },
    { step: "4", title: "Final Walkthrough", desc: "We do a thorough walkthrough with you, address any concerns, and ensure you are 100% satisfied before we consider the job done." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${service.slug}` },
          ]} />
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={serviceImage}
          alt={`${service.name} in Niagara Region`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {service.name} in Niagara Region, Ontario
              </h1>
              <p className="text-gray-300 text-xl mb-6">{service.shortDesc}</p>
              <ul className="space-y-2 mb-6" data-track="service-hero">
                {["Licensed & Insured Contractors", "Free Detailed Estimates", "5-Year Workmanship Warranty", "Serving All of Niagara Region"].map((item, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <LeadForm defaultService={service.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 text-lg leading-relaxed">{details.intro}</p>
        </div>
      </section>

      {/* WHY NIAGARA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-5">{serviceNiagaraH2[service.slug] ?? `${service.name} Services in Niagara Region`}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Niagara Renovation Company has completed {service.name.toLowerCase()} projects in every corner of Niagara Region — from the urban neighbourhoods of St. Catharines and Niagara Falls to the wine country estates of Lincoln, the waterfront communities of Port Colborne and Fort Erie, and the growing suburbs of Grimsby and Pelham. Our deep familiarity with local building departments, permit processes, and regional building inspectors means your project moves forward without unnecessary delays.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We understand that Niagara homes come in every style and era — from century-old heritage properties that require sensitive, skilled renovation to modern builds that demand precision and contemporary design expertise. Our team includes tradespeople who have spent decades working specifically in this region, giving us a level of local knowledge that out-of-region contractors simply cannot match. We know the materials that perform best in Niagara&apos;s climate, the suppliers who stock them, and the techniques that deliver lasting results in local conditions.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            When you choose Niagara Renovation Company for your {service.name.toLowerCase()}, you&apos;re choosing a contractor with roots in this community — one that stands behind its work long after the project is complete. We offer a comprehensive 5-year workmanship warranty on all {service.name.toLowerCase()} work, backed by a company with the reputation, insurance, and financial stability to honour it. Hundreds of Niagara homeowners have trusted us with their most valuable asset. We would be honoured to earn your trust as well.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`What's Included in Our ${service.name}`}
            subtitle="Every project includes our full-service approach — we handle everything from start to finish."
            image={serviceImage}
            imageAlt={`${service.name} work in Niagara Region`}
          />
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {details.included.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Our proven 4-step process ensures a smooth, stress-free renovation experience."
            image={IMAGES.services_page.how_it_works}
            imageAlt="Professional renovation process"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">{step.step}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`${service.name} FAQs`}
            subtitle="Common questions from Niagara homeowners about this service."
            image={serviceImage}
            imageAlt={`${service.name} frequently asked questions`}
          />
          <div className="space-y-4">
            {details.faq.map((faq, i) => (
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

      {/* TESTIMONIAL */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real feedback from Niagara homeowners who trusted us with their renovation."
            image={serviceImage}
            imageAlt={`${service.name} client testimonial`}
          />
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <div className="flex justify-center gap-0.5 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-gray-700 italic mb-4">&ldquo;{testimonial.text}&rdquo;</blockquote>
            <p className="font-bold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.city} &middot; {testimonial.service}</p>
          </div>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Serving All Niagara Municipalities"
            subtitle={`We provide ${service.name.toLowerCase()} to homeowners in every Niagara community. Click your city to learn more.`}
            image={serviceImage}
            imageAlt={`${service.name} service area across Niagara Region`}
          />
          <CityGrid serviceSlug={service.slug} />
        </div>
      </section>

      {/* RELATED SERVICES */}
      {serviceRelatedLinks[service.slug] && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Related Services</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceRelatedLinks[service.slug].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-sm text-red-600 font-medium border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
