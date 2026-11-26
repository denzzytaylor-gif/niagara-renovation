// Local layer for the city x service pages.
//
// Why this exists: the old city x service copy was one long template per service
// with only the town name swapped, so Google saw near-duplicate pages and left
// most small-town pages "Crawled - currently not indexed". Each page is now built
// from facts about the specific municipality (housing stock, water, escarpment,
// heritage rules, private services) combined with service-specific guidance that
// changes depending on those facts.
//
// Rules for this file: no dollar amounts, no claims about past projects, warranties
// or response times, and only local facts that are well established. When a rule
// may vary, tell the reader to confirm it with the municipality.

export type Trait =
  | "lakeErie"
  | "lakeOntario"
  | "river"
  | "escarpment"
  | "heritage"
  | "privateServices"
  | "cottages"
  | "rural"
  | "students"
  | "older"
  | "newer"
  | "clay";

export interface CityLocal {
  /** Full municipal name, e.g. "Town of Fort Erie". */
  muni: string;
  /** Where the older housing is. Used mid-sentence. */
  older: string;
  /** Where the newer housing is. Used mid-sentence. */
  newer: string;
  /** Main waterway or lake, used mid-sentence. */
  water: string;
  /** One-sentence description of the setting. */
  setting: string;
  /** Distinct local facts, rotated across the 12 service pages. */
  facts: string[];
  /** Ordered by how much they shape renovation work in this town. */
  traits: Trait[];
}

export const CITY_LOCAL: Record<string, CityLocal> = {
  "niagara-falls": {
    muni: "City of Niagara Falls",
    older: "Chippawa, the older streets off Main Street and Ferry Street, and the post-war blocks around Stamford",
    newer: "the newer subdivisions toward the city's south and west edges",
    water: "the Welland River, known locally as Chippawa Creek",
    setting: "Niagara Falls stretches from the Niagara River gorge and the tourist district inland to farmland along the Welland River, so properties range from tight urban lots to rural parcels.",
    facts: [
      "Chippawa grew up where the Welland River meets the Niagara River, and many of its homes are older than the subdivisions around it.",
      "Much of the housing between Lundy's Lane and Thorold Stone Road dates from the post-war decades, with basements, wiring and windows that are often original or only partly updated.",
      "Around Fallsview and the tourist corridor, hotels sit close to older residential streets, so parking, deliveries and summer traffic are part of planning any project there.",
    ],
    traits: ["older", "river", "newer"],
  },
  "st-catharines": {
    muni: "City of St. Catharines",
    older: "downtown, Western Hill, Port Dalhousie and the older parts of Merritton",
    newer: "the north-end subdivisions and the newer townhome developments",
    water: "Twelve Mile Creek",
    setting: "St. Catharines runs from the Lake Ontario shore at Port Dalhousie through the Twelve Mile Creek valley to the escarpment edge, and it is the largest city in Niagara.",
    facts: [
      "Port Dalhousie's lakefront streets and the Martindale Pond rowing course give the north-west corner of the city some of its oldest housing.",
      "Merritton grew up around mills along the early Welland Canal, and many of its homes are modest early twentieth-century houses on narrow lots.",
      "Brock University sits on the escarpment at the city's southern edge, which keeps demand steady for basement suites and rental units in nearby neighbourhoods.",
    ],
    traits: ["older", "students", "lakeOntario", "newer"],
  },
  "welland": {
    muni: "City of Welland",
    older: "downtown, the streets along the old canal channel, Crowland and the east side",
    newer: "the newer subdivisions in the north end",
    water: "the Welland Recreational Waterway and the Welland River",
    setting: "Welland sits on flat, low ground where the Welland River crosses the old canal route, with today's ship canal bypassing the city to the east.",
    facts: [
      "The old canal channel through downtown is now the Welland Recreational Waterway, used for flatwater paddling and rowing.",
      "Dain City sits between the river and the canal at the south end, on low ground with older homes and larger lots.",
      "Much of Welland's housing dates from its industrial growth in the mid-twentieth century, so post-war bungalows and storey-and-a-half houses are common.",
    ],
    traits: ["older", "clay", "river", "newer"],
  },
  "thorold": {
    muni: "City of Thorold",
    older: "the old downtown around Front Street",
    newer: "Rolling Meadows and the newer subdivisions on the edges of the city",
    water: "Lake Gibson and the Welland Canal",
    setting: "Thorold sits on top of the Niagara Escarpment, where the Welland Canal climbs through its twinned flight locks, and it borders St. Catharines and Brock University.",
    facts: [
      "The twinned flight locks at Thorold lift ships up the escarpment, and the canal still divides the city in two.",
      "Downtown Thorold has a concentration of nineteenth-century brick and frame houses, some sitting on stone foundations.",
      "Being next to Brock University means many Thorold houses have been converted to student rentals or already have a secondary unit.",
    ],
    traits: ["older", "students", "escarpment", "newer"],
  },
  "port-colborne": {
    muni: "City of Port Colborne",
    older: "the streets near downtown, West Street and the older blocks along the canal",
    newer: "the newer subdivisions on the city's north side",
    water: "Lake Erie",
    setting: "Port Colborne sits at the Lake Erie end of the Welland Canal, with a working canal through its centre and shoreline cottage areas stretching east toward Sherkston and west along the lake.",
    facts: [
      "Lock 8 at Port Colborne is one of the longest canal locks in the world, and the canal splits the city into east and west sides.",
      "Shoreline areas east and west of town include seasonal cottages that have been converted for year-round living, often in stages over many years.",
      "Nickel Beach and the lakeshore streets take the brunt of wind coming off Lake Erie, which matters for roofs, siding, windows and decks.",
    ],
    traits: ["lakeErie", "cottages", "clay", "older"],
  },
  "grimsby": {
    muni: "Town of Grimsby",
    older: "the Main Street core and Grimsby Beach",
    newer: "the lakefront condominiums and townhomes near the QEW and the subdivisions built from the 1970s on",
    water: "Forty Mile Creek and Lake Ontario",
    setting: "Grimsby sits on a narrow strip between Lake Ontario and the Niagara Escarpment, so many properties are on slopes, near the escarpment or close to the lake.",
    facts: [
      "Grimsby Beach grew from a nineteenth-century camp meeting ground, and its small, decorated wooden cottages are among the most distinctive houses in Niagara.",
      "Forty Mile Creek runs from the escarpment through the town to the lake.",
      "Work close to the escarpment can fall within the Niagara Escarpment Commission's development control area, which brings a separate permit.",
    ],
    traits: ["escarpment", "lakeOntario", "older", "newer"],
  },
  "lincoln": {
    muni: "Town of Lincoln",
    older: "Jordan Village, Vineland and the older parts of Beamsville",
    newer: "the newer subdivisions in Beamsville and Vineland",
    water: "Twenty Mile Creek",
    setting: "Lincoln runs from the Lake Ontario shore up over the Beamsville Bench to the escarpment, and much of it is vineyards, orchards and farmland.",
    facts: [
      "Jordan Village sits above the Twenty Valley, with older homes that have been restored and extended over generations.",
      "Many rural properties in Lincoln are farm parcels with a house, outbuildings and their own water and septic arrangements.",
      "Parts of the Beamsville Bench fall within the Niagara Escarpment Commission's area of development control.",
    ],
    traits: ["rural", "escarpment", "older", "newer"],
  },
  "pelham": {
    muni: "Town of Pelham",
    older: "the original cores of Fonthill and Fenwick",
    newer: "East Fonthill and the subdivisions built around the town's edges in recent decades",
    water: "the headwaters of Twelve Mile Creek",
    setting: "Pelham sits on higher, rolling ground in the middle of Niagara, with Fonthill on a sandy ridge and farms, orchards and the Short Hills to the north.",
    facts: [
      "Fonthill sits on a raised sand and gravel ridge, which drains differently from the heavy clay further south in the region.",
      "Short Hills Provincial Park lies along Pelham's northern edge, with wooded valleys and creeks.",
      "Rural Pelham, around Ridgeville and Effingham, includes larger lots served by wells and septic systems.",
    ],
    traits: ["newer", "rural", "older"],
  },
  "niagara-on-the-lake": {
    muni: "Town of Niagara-on-the-Lake",
    older: "Old Town and Queenston",
    newer: "Virgil, Glendale and the newer parts of St. Davids",
    water: "the Niagara River and Lake Ontario",
    setting: "Niagara-on-the-Lake sits where the Niagara River meets Lake Ontario, with a historic Old Town, wine country, and newer communities inland.",
    facts: [
      "The Queen-Picton Heritage Conservation District covers the core of Old Town, and exterior changes to properties inside it need a heritage permit.",
      "Much of the land outside the urban areas is vineyards and orchards on protected agricultural land.",
      "Queenston, at the foot of the escarpment, has some of the oldest houses in the town.",
    ],
    traits: ["heritage", "older", "rural", "lakeOntario", "newer"],
  },
  "fort-erie": {
    muni: "Town of Fort Erie",
    older: "Bridgeburg, Ridgeway and Crystal Beach",
    newer: "the newer subdivisions in Stevensville and around Garrison Road",
    water: "the Niagara River and Lake Erie",
    setting: "Fort Erie wraps around the point where the Niagara River leaves Lake Erie, opposite Buffalo, with beach communities along the lake to the west.",
    facts: [
      "Crystal Beach was a summer resort for decades, and many of its houses began as seasonal cottages on small lots.",
      "Point Abino and the Lake Erie shoreline are exposed to strong westerly winds and winter storms.",
      "Bridgeburg, near the Peace Bridge, is one of the town's older neighbourhoods.",
    ],
    traits: ["cottages", "lakeErie", "older", "clay", "newer"],
  },
  "wainfleet": {
    muni: "Township of Wainfleet",
    older: "Wainfleet's farmhouses and the older cottages along Long Beach",
    newer: "the newer houses built on severed rural lots",
    water: "Lake Erie",
    setting: "Wainfleet is a rural township on the Lake Erie shore, with farmland, the Wainfleet Bog and a long strip of lakefront cottages.",
    facts: [
      "Most Wainfleet properties rely on private wells or cisterns and septic systems rather than municipal water and sewer.",
      "The Long Beach shoreline is made up largely of cottages, many of them now lived in year-round.",
      "The Wainfleet Bog is a large protected wetland in the north of the township.",
    ],
    traits: ["privateServices", "lakeErie", "cottages", "rural", "clay"],
  },
  "west-lincoln": {
    muni: "Township of West Lincoln",
    older: "Smithville's older centre and the farm properties across the township",
    newer: "the growing subdivisions in Smithville",
    water: "Twenty Mile Creek",
    setting: "West Lincoln is a largely agricultural township, with Smithville as its main urban area and hamlets such as Wellandport, Caistor Centre and Abingdon.",
    facts: [
      "Twenty Mile Creek runs through Smithville, and the south of the township drains toward the Welland River near Wellandport.",
      "Outside Smithville, most properties rely on private wells or cisterns and septic systems.",
      "Smithville is growing, so the township has a mix of new subdivision homes and long-established farm properties.",
    ],
    traits: ["privateServices", "rural", "newer", "clay", "older"],
  },
};

type C = { name: string; L: CityLocal; n: string[] };
type Faq = { q: string; a: string };

interface ServiceLocal {
  hero: (c: C) => string;
  lead: (c: C) => string;
  notes: Partial<Record<Trait, (c: C) => string>>;
  approvals: (c: C) => string;
  close: (c: C) => string;
  items: string[];
  traitItems: Partial<Record<Trait, string>>;
  traitFaqs: Partial<Record<Trait, (c: C) => Faq>>;
  permitFaq: (c: C) => Faq;
}

const lakeName = (L: CityLocal) => (L.traits.includes("lakeErie") ? "Lake Erie" : "Lake Ontario");
const n2 = (c: C) => (c.n.length > 1 ? `${c.n[0]} and ${c.n[1]}` : c.name);

const ESA = "Most electrical work also needs a separate notification to the Electrical Safety Authority (ESA).";
const NPCA = (c: C) =>
  `Work near ${c.L.water}, a shoreline, a wetland or a watercourse can also need a permit from the Niagara Peninsula Conservation Authority (NPCA), so check that early if your property is close to water.`;

export const SERVICE_LOCAL: Record<string, ServiceLocal> = {
  "kitchen-renovations": {
    hero: (c) => `Kitchen renovations for ${c.name} homes, planned around the house you have and the way you cook.`,
    lead: (c) =>
      `Kitchens in ${c.name} differ a lot depending on the age of the house. In ${c.L.older}, kitchens are often closed off, narrow or squeezed into a back corner, while kitchens in ${c.L.newer} usually have an open layout that mainly needs better storage, durable surfaces and lighting. Deciding early whether you are keeping the layout or changing it shapes everything that follows: budget, schedule, trades and approvals.`,
    notes: {
      older: (c) => `In older ${c.name} houses, removing upper cabinets or a wall often exposes plaster, older wiring or plumbing that has been extended over the years. Plan an allowance for what is found once the walls are open, and check the capacity of the electrical panel before adding an induction range, a second oven or island outlets.`,
      cottages: (c) => `A converted cottage kitchen in ${c.name} was rarely designed for full-time cooking. Floors may be uneven, the crawlspace or floor system may need reinforcing under a heavy stone countertop, and exterior walls may have little insulation behind the cabinets.`,
      privateServices: (c) => `On a property in ${c.name} served by a well and septic system, a kitchen redesign is a good time to think about water treatment under the sink and whether a garbage disposal is a sensible idea for the septic system. Many septic contractors advise against one.`,
      rural: (c) => `In rural ${c.name}, a farmhouse kitchen often doubles as the mudroom and the main entrance. Many owners plan for a durable floor, a bench or locker wall near the door, and a larger sink for garden produce or work clothes.`,
      students: (c) => `If a ${c.name} house is shared or rented, durable, easy-to-replace finishes usually make more sense than delicate ones: laminate or quartz counters, solid cabinet boxes and a range hood vented outdoors.`,
      heritage: (c) => `In ${c.name}'s heritage areas, kitchen work is usually interior and does not need heritage approval, but a new window, a vent through a front or side wall, or a rear addition to enlarge the kitchen may. Ask the Town before finalising the plan.`,
      newer: (c) => `In newer ${c.name} homes, the common upgrades are a larger island, taller upper cabinets, a pantry wall and better task lighting. Builder-grade cabinets often fail at the hinges and drawer boxes first, so check what is worth keeping.`,
      lakeErie: (c) => `Near ${lakeName(c.L)}, humid summers mean ventilation matters. A range hood ducted to the outside, not recirculating, keeps moisture and cooking smells from building up.`,
      escarpment: (c) => `On sloped lots near the escarpment in ${c.name}, the kitchen is sometimes a level above the yard. That affects where a patio door can go and how deliveries and dumpsters reach the house.`,
    },
    approvals: (c) =>
      `In ${c.name}, building permits are issued by the ${c.L.muni}. Replacing cabinets and counters within the same layout often does not need a permit, but removing or adding walls, moving plumbing, or making structural changes usually does. ${ESA} Confirm your scope with the ${c.L.muni} before demolition starts.`,
    close: (c) =>
      `Expect the kitchen to be out of use for part of the project, so set up a temporary space with a fridge, kettle and microwave, and confirm cabinet and appliance lead times before demolition. When comparing quotes for a kitchen in ${c.name}, ask what is included and excluded, who arranges permits and inspections, and how changes are approved. To talk through your plans, call (647) 797-9471 or use the form above.`,
    items: [
      "How you use the kitchen: prep, cooking and clean-up",
      "Whether walls, the sink or appliances will move",
      "Cabinet type: stock, semi-custom or custom",
      "Countertop material and edge details",
      "Ventilation ducted to the outside",
    ],
    traitItems: {
      older: "Condition of wiring, plumbing and plaster behind the old kitchen",
      cottages: "Floor structure and insulation in a converted cottage",
      privateServices: "Water treatment and septic-friendly fixtures",
      heritage: "Whether any exterior change needs heritage approval",
      students: "Durable finishes for a shared or rented home",
      rural: "A mudroom or entry zone next to the kitchen",
      newer: "What builder-grade cabinets are worth keeping",
    },
    traitFaqs: {
      older: (c) => ({ q: `What should I expect when renovating the kitchen in an older ${c.name} house?`, a: `Once cabinets and walls come out, older houses often show outdated wiring, extended plumbing, plaster walls and floors that are not level. Keep a contingency in the budget and check the electrical panel's capacity before choosing appliances.` }),
      cottages: (c) => ({ q: `Can a converted cottage kitchen in ${c.name} take stone countertops?`, a: `Often, but the floor system needs checking first. Cottages that were built for seasonal use may have lighter framing or a crawlspace that needs reinforcing under heavy counters and islands.` }),
      privateServices: (c) => ({ q: `Is a garbage disposal a good idea on a septic system in ${c.name}?`, a: `Many septic professionals advise against one, because food waste adds solids to the tank. Ask your septic contractor before planning one into a new kitchen.` }),
      heritage: (c) => ({ q: `Does a kitchen renovation in ${c.name}'s heritage district need heritage approval?`, a: `Interior work usually does not, but exterior changes such as a new window, a new vent through a wall or an addition can. Check with the Town of Niagara-on-the-Lake before finalising the design.` }),
      students: (c) => ({ q: `What finishes work best in a rented or shared kitchen in ${c.name}?`, a: `Choose durable, easily repaired materials: quartz or laminate counters, plywood or solid cabinet boxes, sheet vinyl or LVP floors and a range hood vented outdoors.` }),
      newer: (c) => ({ q: `Is it worth keeping the cabinets in a newer ${c.name} home?`, a: `Sometimes. If the boxes are solid and the layout works, replacing doors, hardware and counters can be enough. If drawers and hinges are failing, full replacement usually makes more sense.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for a kitchen renovation in ${c.name}?`, a: `It depends on the work. Like-for-like cabinet and counter replacement often does not need one, while removing walls, moving plumbing or structural changes usually do. Permits are issued by the ${c.L.muni}, and most electrical work also needs an ESA notification.` }),
  },

  "bathroom-renovations": {
    hero: (c) => `Bathroom renovations in ${c.name}: showers, tubs, vanities and layout changes, planned for your house.`,
    lead: (c) =>
      `Most bathroom projects in ${c.name} start with one of three goals: replacing a worn-out bathroom as it is, changing the layout to fit a larger shower or double vanity, or adding a bathroom where there was none. Bathrooms in ${c.L.older} tend to be small with plumbing that has been patched over the years, while bathrooms in ${c.L.newer} usually have more space but builder-grade finishes and fans that are too small for the room.`,
    notes: {
      older: (c) => `Older ${c.name} bathrooms may have cast iron drains, galvanized supply lines or a subfloor that has been softened by decades of small leaks. Opening the floor is often the only way to know, so plan for it.`,
      cottages: (c) => `In a former cottage in ${c.name}, bathroom plumbing may run through an unheated crawlspace. Insulating and protecting those lines from freezing matters as much as the finishes.`,
      privateServices: (c) => `With a well, hard water and iron are common, so a softener or filter protects new fixtures and glass. On a septic system, adding a bathroom can affect the system's required capacity, so check with the ${c.L.muni} before planning one.`,
      students: (c) => `In ${c.name} houses with several occupants, a second bathroom is often the most useful upgrade. Durable tile, a strong exhaust fan on a timer and a shut-off valve at every fixture make a shared bathroom easier to maintain.`,
      heritage: (c) => `In Old Town houses, bathrooms are often fitted into rooms that were never designed for plumbing. Routing drains and vents without disturbing original features takes careful planning.`,
      clay: (c) => `If a new basement bathroom is part of the plan, ${c.name}'s heavy clay soils can hold water against foundation walls, so check for moisture before finishing walls around the shower.`,
      newer: (c) => `In newer ${c.name} homes, the common changes are replacing a tub with a walk-in shower, adding a second sink and upgrading the exhaust fan.`,
      rural: (c) => `For rural ${c.name} properties, schedule fixture and tile deliveries carefully. A missing part can mean a long drive, so confirm everything is on site before demolition.`,
    },
    approvals: (c) =>
      `Replacing fixtures in the same location usually does not need a building permit, but adding a bathroom, moving drains or changing walls typically does. Permits in ${c.name} are issued by the ${c.L.muni}. ${ESA}`,
    close: (c) =>
      `A bathroom is small, but many trades have to work in sequence: demolition, plumbing, electrical, waterproofing, tile, glass and fixtures. Ask how waterproofing behind the shower will be done, what membrane is used and how long the room will be out of service. If it is your only bathroom in ${c.name}, plan for that time. To discuss your bathroom, call (647) 797-9471 or use the form above.`,
    items: [
      "Shower, tub or both",
      "Waterproofing behind tile",
      "Exhaust fan sized for the room",
      "Vanity size and storage",
      "Lighting at the mirror",
    ],
    traitItems: {
      older: "Condition of old drains, supply lines and subfloor",
      privateServices: "Water treatment and septic capacity",
      cottages: "Freeze protection for crawlspace plumbing",
      students: "A second bathroom for a shared house",
      heritage: "Routing plumbing without damaging original features",
      clay: "Foundation moisture for a basement bathroom",
    },
    traitFaqs: {
      privateServices: (c) => ({ q: `Can I add a bathroom to a ${c.name} house on a septic system?`, a: `Possibly, but adding a bathroom can change the required capacity of the septic system. Check with the ${c.L.muni} and a septic professional before designing it.` }),
      older: (c) => ({ q: `What hidden problems show up in older ${c.name} bathrooms?`, a: `Cast iron or galvanized pipes, rotted subfloor around the toilet or tub, and walls without proper waterproofing behind old tile are common. Plan a contingency for what demolition reveals.` }),
      cottages: (c) => ({ q: `How do I keep bathroom pipes from freezing in a converted cottage in ${c.name}?`, a: `Keep supply lines out of exterior walls where possible, insulate and heat the crawlspace or run lines inside heated space, and fit shut-off valves so the system can be drained if needed.` }),
      students: (c) => ({ q: `Is adding a second bathroom worth it in a shared ${c.name} house?`, a: `For houses with several occupants it is often the most practical upgrade. Check where drains can run and whether the change needs a permit before planning it.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for a bathroom renovation in ${c.name}?`, a: `Replacing fixtures in place usually does not. Adding a bathroom, moving drains or changing walls usually does. Permits are issued by the ${c.L.muni}, and most electrical work needs an ESA notification.` }),
  },

  "basement-finishing": {
    hero: (c) => `Basement finishing in ${c.name}: moisture first, then layout, insulation and finishes.`,
    lead: (c) =>
      `A finished basement is the most common way ${c.name} homeowners add living space without building outward. Whether the goal is a family room, a home office, a guest room or a separate suite, the first question is always the same: is the basement dry? Basements in ${c.L.older} often have older foundations and low ceilings, while those in ${c.L.newer} usually have poured walls and more height but still need a moisture check before anything is closed in.`,
    notes: {
      clay: (c) => `Much of ${c.name} sits on heavy clay, which drains slowly and can hold water against foundation walls after heavy rain or snowmelt. Check the grading, downspouts and sump pump before finishing, and look for staining or efflorescence on the walls.`,
      older: (c) => `Older ${c.name} basements can have stone, block or early poured foundations, low beams and ductwork that limit ceiling height. Measuring the clear height early tells you whether a bedroom or suite is realistic.`,
      students: (c) => `Near the university, many ${c.name} owners finish a basement as a separate unit. A secondary suite has to meet fire separation, egress and ceiling height requirements, which shapes the layout from the start.`,
      privateServices: (c) => `On a well and septic property in ${c.name}, a basement bathroom may need a sewage ejector pump, and an added bedroom can affect the septic system's required capacity.`,
      cottages: (c) => `Many former cottages in ${c.name} have a crawlspace rather than a full basement. Finishing is not always possible, but sealing and insulating the crawlspace can still make the house warmer and drier.`,
      lakeErie: (c) => `Close to ${lakeName(c.L)}, a high water table is common on low-lying lots, so a working sump pump and a backwater valve are worth checking before finishing.`,
      lakeOntario: (c) => `On lower lots near the ${lakeName(c.L)} shore, groundwater can sit higher than inland, so drainage and sump capacity matter.`,
      newer: (c) => `In newer ${c.name} homes, the basement may already have a bathroom rough-in. Check where it is before designing the layout around it.`,
      escarpment: (c) => `On sloped lots near the escarpment in ${c.name}, part of the basement may be at or above grade, which allows larger windows and sometimes a walk-out.`,
    },
    approvals: (c) =>
      `Finishing a basement usually needs a building permit from the ${c.L.muni}, especially when adding a bedroom, a bathroom or a separate unit. Bedrooms need an egress window that meets the Ontario Building Code. ${ESA}`,
    close: (c) =>
      `Plan the insulation and vapour control carefully, since that is what keeps a finished basement comfortable and free of mould. Then decide on flooring that tolerates the occasional damp day, lighting for a room with little daylight, and where storage and the mechanical room will go. To talk about your ${c.name} basement, call (647) 797-9471 or use the form above.`,
    items: [
      "Moisture check before anything is closed in",
      "Insulation and vapour control",
      "Clear ceiling height",
      "Egress windows for bedrooms",
      "Access to the furnace, panel and shut-offs",
    ],
    traitItems: {
      clay: "Grading, downspouts and sump pump",
      students: "Fire separation and egress for a secondary suite",
      privateServices: "Ejector pump and septic capacity",
      cottages: "Crawlspace sealing where there is no full basement",
      older: "Foundation type and low beams or ducts",
      lakeErie: "High water table and backwater valve",
    },
    traitFaqs: {
      clay: (c) => ({ q: `Why do basements in ${c.name} get damp?`, a: `Heavy clay soils drain slowly and can hold water against foundation walls. Poor grading, short downspouts and a failing sump pump make it worse. Fix those before finishing.` }),
      students: (c) => ({ q: `Can I turn my ${c.name} basement into a rental unit?`, a: `Possibly. A secondary suite has to meet zoning and Ontario Building Code requirements for fire separation, egress, ceiling height and separate heating or ventilation. Confirm with the ${c.L.muni} before designing it.` }),
      privateServices: (c) => ({ q: `Can I add a basement bathroom on a septic system in ${c.name}?`, a: `Usually with an ejector pump, but check that the septic system has enough capacity for the added fixtures and bedrooms. The ${c.L.muni} can confirm what is needed.` }),
      older: (c) => ({ q: `Is my older ${c.name} basement tall enough to finish?`, a: `Measure from the floor to the underside of beams and ducts. Rooms such as bedrooms have minimum height requirements under the Ontario Building Code, and low ducts can sometimes be rerouted.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit to finish a basement in ${c.name}?`, a: `In most cases, yes, especially when adding a bedroom, bathroom or separate unit. The ${c.L.muni} issues the permit, and most electrical work needs an ESA notification as well.` }),
  },

  "additions-adu": {
    hero: (c) => `ADUs and garden suites in ${c.name}: start with your lot, your servicing and the local rules.`,
    lead: (c) =>
      `An accessory dwelling unit (ADU) is a second, self-contained home on a residential property: a basement suite, a unit inside the existing house, or a detached garden suite or coach house. Ontario law now allows additional residential units on many lots, but what fits on a particular ${c.name} property depends on lot size, setbacks, servicing, parking and the ${c.L.muni}'s zoning by-law.`,
    notes: {
      privateServices: (c) => `In ${c.name}, most properties rely on a well and septic system. A second unit adds bedrooms and fixtures, so the septic system's capacity is often the deciding factor. Have it assessed before paying for design work.`,
      rural: (c) => `On rural parcels in ${c.name}, the rules for additional units can differ from those in town, and agricultural zoning may limit where a detached unit can go. Confirm with the ${c.L.muni}.`,
      students: (c) => `Near the university, many ${c.name} owners consider a basement unit for rental income. Weigh the construction, financing, tax and insurance costs against expected rent, and get independent advice.`,
      older: (c) => `In ${c.L.older}, lots are often narrow with little side yard, so a basement or interior unit is usually more realistic than a detached garden suite.`,
      heritage: (c) => `Inside a heritage conservation district, a detached garden suite or a new exterior entrance can need heritage approval as well as a building permit.`,
      escarpment: (c) => `If your property is within the Niagara Escarpment Commission's development control area, a new detached structure may need an NEC development permit as well as a building permit.`,
      cottages: (c) => `Older cottage lots in ${c.name} are often small, so there may not be room for a detached unit. Converting part of the existing house can be more practical.`,
      newer: (c) => `Newer ${c.name} subdivisions sometimes have deeper lots and a garage that could support a detached unit, but check servicing, setbacks and any restrictions on title.`,
    },
    approvals: (c) =>
      `Every ADU needs zoning compliance and a building permit from the ${c.L.muni}, reviewed against the Ontario Building Code for fire separation, egress, sound and servicing. Rules change, so confirm the current requirements for your property with the ${c.L.muni}'s planning and building staff before committing to a design.`,
    close: (c) =>
      `People build ADUs to house family, to earn rental income or for long-term flexibility. If what you need is more space attached to your own living area, a home addition may suit you better. To talk about what your ${c.name} property could allow, call (647) 797-9471 or use the form above.`,
    items: [
      "What zoning allows on your lot",
      "Basement, interior or detached unit",
      "Water, sewer and electrical servicing",
      "Fire separation, egress and sound",
      "Parking and a separate entrance",
    ],
    traitItems: {
      privateServices: "Septic capacity for added bedrooms",
      rural: "Rules for rural and agricultural parcels",
      heritage: "Heritage approval for exterior changes",
      escarpment: "Niagara Escarpment Commission permit",
      students: "Realistic rental income versus cost",
      cottages: "Small cottage lots and setbacks",
    },
    traitFaqs: {
      privateServices: (c) => ({ q: `Can I build an ADU on a septic system in ${c.name}?`, a: `It depends on whether the septic system can handle the added bedrooms and fixtures, or can be upgraded. Have it assessed and confirm the requirements with the ${c.L.muni} before design work.` }),
      escarpment: (c) => ({ q: `Does the Niagara Escarpment affect building an ADU in ${c.name}?`, a: `If the property is within the Niagara Escarpment Commission's development control area, a new structure may need an NEC development permit as well as a building permit.` }),
      heritage: (c) => ({ q: `Can I build a garden suite in a heritage district in ${c.name}?`, a: `Possibly, but exterior changes and new structures in a heritage conservation district usually need heritage approval as well as a building permit. Check with the Town first.` }),
      students: (c) => ({ q: `Is a basement rental unit worth it in ${c.name}?`, a: `It depends on construction and financing costs, taxes, insurance and realistic rent. Get independent financial advice and confirm what the ${c.L.muni} allows on your property.` }),
      rural: (c) => ({ q: `Are ADU rules different on rural land in ${c.name}?`, a: `They can be. Agricultural and rural zoning may limit the size or location of an additional unit. The ${c.L.muni}'s planning staff can confirm what applies.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for an ADU in ${c.name}?`, a: `Yes. An ADU needs zoning compliance and a building permit from the ${c.L.muni}, reviewed under the Ontario Building Code. Confirm the current rules before committing to a design.` }),
  },

  "home-additions": {
    hero: (c) => `Home additions in ${c.name}: more space attached to the house you already own.`,
    lead: (c) =>
      `An addition makes sense when you like where you live in ${c.name} but the house no longer fits: a bigger kitchen, a main-floor bedroom, a family room or a second storey. The size and shape of what you can build depend on lot coverage, setbacks and height limits in the ${c.L.muni}'s zoning by-law, and on how the new structure will tie into the existing roof, foundation and mechanical systems.`,
    notes: {
      older: (c) => `Adding onto an older house in ${c.L.older} means matching rooflines, brick or siding, and floor heights that may not be level. The existing foundation and framing need checking before a second storey is designed.`,
      newer: (c) => `In ${c.L.newer}, rear additions and sunrooms are common, but check for restrictions on title and the location of easements and services before choosing a footprint.`,
      heritage: (c) => `In the Queen-Picton Heritage Conservation District, additions need heritage approval and are usually expected to sit behind and below the original house.`,
      escarpment: (c) => `Near the escarpment in ${c.name}, slopes and the Niagara Escarpment Commission's development control area can both affect where and how an addition is built.`,
      clay: (c) => `${c.name}'s clay soils affect foundation design for an addition. Footings need to reach stable soil below frost depth, and drainage around the new walls needs planning.`,
      privateServices: (c) => `If an addition includes bedrooms or a bathroom, the septic system may need to be assessed for capacity, and its location limits where the addition can go.`,
      rural: (c) => `On larger rural lots in ${c.name}, there is usually room to build, but the septic bed, well and setbacks from farm buildings shape the footprint.`,
      lakeErie: (c) => `Near the ${lakeName(c.L)} shore, NPCA shoreline regulations can limit building toward the water.`,
      lakeOntario: (c) => `Near the ${lakeName(c.L)} shore or a creek, NPCA regulations can limit where an addition goes.`,
    },
    approvals: (c) =>
      `Every addition needs a building permit from the ${c.L.muni}, and some need a minor variance if they do not meet zoning. ${NPCA(c)}`,
    close: (c) =>
      `Ask how the addition will be tied into the existing roof and walls, how heating and cooling will be extended, and how much of the house will be disrupted during construction. If what you need is a separate unit rather than more space for your own household, an ADU may be the better fit. To discuss an addition in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Lot coverage, setbacks and height limits",
      "Foundation and structural design",
      "Roofline and exterior matching",
      "Heating, cooling and electrical capacity",
      "How you will live in the house during work",
    ],
    traitItems: {
      heritage: "Heritage approval for exterior design",
      escarpment: "Slopes and Escarpment Commission rules",
      clay: "Footings and drainage in clay soil",
      privateServices: "Septic bed and well location",
      older: "Matching an older house's materials",
    },
    traitFaqs: {
      heritage: (c) => ({ q: `Can I add onto a heritage house in ${c.name}?`, a: `Often, but inside a heritage conservation district an addition needs heritage approval, and its design is usually expected to respect the original house.` }),
      clay: (c) => ({ q: `Does clay soil in ${c.name} affect an addition?`, a: `Yes. Footings need to reach stable soil below frost depth, and drainage around the new foundation needs planning so water does not collect against it.` }),
      escarpment: (c) => ({ q: `Does the escarpment affect an addition in ${c.name}?`, a: `It can. Slopes affect foundation design, and properties in the Niagara Escarpment Commission's development control area may need an NEC permit as well as a building permit.` }),
      privateServices: (c) => ({ q: `Can I build an addition on a septic property in ${c.name}?`, a: `Usually, but the addition cannot go over the septic bed, and adding bedrooms or bathrooms may require a septic capacity review.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for a home addition in ${c.name}?`, a: `Yes. Additions need a building permit from the ${c.L.muni}, and some need a minor variance or a conservation authority permit depending on the property.` }),
  },

  "general-contracting": {
    hero: (c) => `General contracting in ${c.name} for renovations that involve several trades at once.`,
    lead: (c) =>
      `A general contractor is useful when a project in ${c.name} involves more than one trade working in sequence: a whole-floor renovation, a kitchen and bathroom together, an addition, or bringing an older house up to date. The contractor's job is to plan the order of work, schedule the trades, arrange permits and inspections, order materials and keep you informed.`,
    notes: {
      older: (c) => `In older ${c.name} homes, a whole-house renovation often turns up wiring, plumbing, insulation and structural issues that change the order of work. A clear process for approving changes protects both sides.`,
      heritage: (c) => `In Old Town, a general contractor also coordinates heritage approvals and works with materials and details that suit the house.`,
      rural: (c) => `On rural ${c.name} properties, scheduling matters more because trades and deliveries travel farther. Grouping work into fewer visits saves time.`,
      privateServices: (c) => `For well and septic properties, a large renovation is a good time to check water quality, the pressure tank and the age of the septic system.`,
      cottages: (c) => `Cottage-to-home conversions in ${c.name} often need insulation, heating, windows, plumbing and electrical work all at once, which is exactly where one coordinating contractor helps.`,
      students: (c) => `For ${c.name} rental properties, renovations often have to fit between tenancies, so a firm schedule and clear finish date matter.`,
      newer: (c) => `In newer ${c.name} homes, multi-trade projects are often finishing a basement, opening the main floor and replacing flooring throughout.`,
    },
    approvals: (c) =>
      `Permits in ${c.name} come from the ${c.L.muni}. On a multi-trade project, agree in writing who applies for permits, who books inspections, and who is responsible for any engineering or design drawings.`,
    close: (c) =>
      `Before signing, ask for a written scope of work, a payment schedule tied to completed stages, a schedule, and a clear change-order process. Ask who will be on site day to day. To talk through a larger project in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Written scope covering every trade",
      "Order of work and schedule",
      "Who handles permits and inspections",
      "Payment schedule by stage",
      "How changes are approved",
    ],
    traitItems: {
      older: "Contingency for what older walls hide",
      heritage: "Heritage approvals and suitable materials",
      rural: "Trade and delivery scheduling on rural sites",
      cottages: "Insulation, heating and services for year-round use",
      students: "Fitting work between tenancies",
    },
    traitFaqs: {
      older: (c) => ({ q: `Why do renovations on older ${c.name} homes change once work starts?`, a: `Opening walls often reveals outdated wiring, plumbing, missing insulation or structural issues. A written change-order process lets you approve added work before it happens.` }),
      cottages: (c) => ({ q: `What does converting a cottage to a year-round home in ${c.name} involve?`, a: `Usually insulation, heating, windows, plumbing protected from freezing, electrical upgrades and sometimes foundation work. Permits from the ${c.L.muni} are typically required.` }),
      rural: (c) => ({ q: `Does a rural location in ${c.name} affect a renovation schedule?`, a: `It can. Trades and deliveries travel farther, so planning work into fewer, well-organised site visits helps keep the project moving.` }),
    },
    permitFaq: (c) => ({ q: `Who handles permits on a general contracting project in ${c.name}?`, a: `Agree that in writing before work starts. Permits come from the ${c.L.muni}, and the contract should say who applies, who books inspections and who provides drawings.` }),
  },

  "decks-outdoor": {
    hero: (c) => `Decks and outdoor living in ${c.name}, built on proper footings for Niagara winters.`,
    lead: (c) =>
      `A deck in ${c.name} has to handle humid summers, freeze-thaw cycles and snow load. Most of a deck's lifespan comes down to what you cannot see: footings below frost depth, proper ledger attachment to the house, flashing, and joists spaced for the decking you choose. The decking itself is usually a choice between pressure-treated wood, cedar and composite.`,
    notes: {
      lakeErie: (c) => `Near ${lakeName(c.L)}, wind and wind-driven rain are harder on decks, railings and pergolas. Use corrosion-resistant fasteners and connectors, and think about wind exposure before adding a solid privacy wall or a roof.`,
      lakeOntario: (c) => `Close to ${lakeName(c.L)}, decks get more wind and moisture than inland ones. Corrosion-resistant hardware and good drainage under the deck help.`,
      clay: (c) => `${c.name}'s clay soils can heave with frost, so footings need to go below frost depth and sit on undisturbed soil.`,
      escarpment: (c) => `On sloped lots near the escarpment, decks are often high on one side, which means taller posts, bracing, guards and a permit.`,
      cottages: (c) => `Many older cottage decks in ${c.name} were built on shallow blocks. Replacing them with proper footings stops seasonal movement.`,
      heritage: (c) => `A deck at the back of a heritage house is usually less of an issue than a front porch, but in a heritage conservation district, visible exterior changes may need approval.`,
      rural: (c) => `On large rural lots in ${c.name}, decks are often bigger and farther from the house, so footing layout and access for materials matter.`,
      newer: (c) => `In ${c.L.newer}, decks often sit over a walk-out or tight side yard, so check grading and any restrictions on title.`,
      older: (c) => `On older ${c.name} houses, the rim joist or brick where a ledger would attach may not be suitable, and a freestanding deck is sometimes the better choice.`,
    },
    approvals: (c) =>
      `In ${c.name}, decks above a certain height off the ground, attached to the house or serving an exit usually need a building permit from the ${c.L.muni}. ${NPCA(c)}`,
    close: (c) =>
      `Decide early how you will use the space: dining, a hot tub, shade, privacy or a path to the yard. A hot tub needs a deck designed for its weight. Ask what spacing the joists will have, how the ledger is attached and flashed, and how deep the footings go. To plan a deck in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Footings below frost depth",
      "Ledger attachment and flashing",
      "Decking material and joist spacing",
      "Guards and stairs to code",
      "Hot tub or roof loads",
    ],
    traitItems: {
      lakeErie: "Wind exposure and corrosion-resistant hardware",
      lakeOntario: "Moisture and wind near the lake",
      clay: "Frost heave in clay soil",
      escarpment: "Tall posts and bracing on sloped lots",
      cottages: "Replacing old block footings",
      heritage: "Heritage approval for visible changes",
    },
    traitFaqs: {
      lakeErie: (c) => ({ q: `How do I build a deck that lasts near Lake Erie in ${c.name}?`, a: `Use corrosion-resistant fasteners and connectors, footings below frost depth, good ventilation under the deck and a design that accounts for wind on railings, pergolas and privacy walls.` }),
      clay: (c) => ({ q: `Why do decks in ${c.name} heave?`, a: `Clay soils expand with frost. Footings that are too shallow, or sit on fill, can lift over winter. Going below frost depth onto undisturbed soil prevents it.` }),
      escarpment: (c) => ({ q: `Do I need a permit for a raised deck on a sloped lot in ${c.name}?`, a: `Usually, yes. Decks above a certain height need a permit from the ${c.L.muni}, and high decks need proper guards, bracing and footings.` }),
      cottages: (c) => ({ q: `Should I replace the old cottage deck on my ${c.name} property?`, a: `If it sits on surface blocks and moves each season, replacing it with a deck on proper footings is usually the better long-term choice.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for a deck in ${c.name}?`, a: `It depends on height, size and whether it is attached to the house. Confirm with the ${c.L.muni}, and check with the NPCA if the property is close to water.` }),
  },

  "commercial-renovations": {
    hero: (c) => `Commercial renovations in ${c.name} for offices, shops, restaurants and clinics.`,
    lead: (c) =>
      `Commercial renovation in ${c.name} usually means fitting out a space for a new tenant, updating an older storefront, or adapting a building for a new use. The key differences from home renovation are the building code requirements for occupancy, fire separation, exits and accessibility, and the need to keep a business running or open on schedule.`,
    notes: {
      older: (c) => `Many commercial buildings in ${c.name}'s older districts are mixed-use, with apartments above shops. Work there has to account for fire separations between uses and for tenants living upstairs.`,
      heritage: (c) => `In Old Town's commercial core, storefronts and signage are within the heritage district, so exterior changes need heritage approval.`,
      students: (c) => `Near the university, food service and retail spaces turn over regularly, so quick, well-planned fit-outs are common.`,
      rural: (c) => `In rural ${c.name}, commercial work is often agricultural or farm-related: farm stores, tasting rooms and workshops, which may have their own zoning rules.`,
      newer: (c) => `Newer plazas in ${c.name} often have landlord design standards and approval steps that need to be built into the schedule.`,
      lakeErie: (c) => `Waterfront businesses in ${c.name} are often seasonal, so work is usually best scheduled in the off-season.`,
      lakeOntario: (c) => `Lakefront and tourist-area businesses are often busiest in summer, so off-season scheduling helps.`,
      cottages: (c) => `Seasonal businesses near the beach areas in ${c.name} usually renovate between fall and spring.`,
    },
    approvals: (c) =>
      `Commercial renovations in ${c.name} need a building permit from the ${c.L.muni} in most cases, and a change of use can also need zoning approval. Accessibility requirements apply to many commercial spaces. ${ESA}`,
    close: (c) =>
      `Ask about phasing, after-hours work, how dust and noise will be controlled, and how the schedule lines up with your lease or opening date. Confirm who provides the drawings. To discuss a commercial project in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Occupancy and change-of-use requirements",
      "Fire separation and exits",
      "Accessibility",
      "Phasing around business hours",
      "Landlord approvals",
    ],
    traitItems: {
      heritage: "Heritage approval for storefronts and signs",
      older: "Fire separation in mixed-use buildings",
      rural: "Zoning for farm-related businesses",
      lakeErie: "Off-season scheduling for seasonal businesses",
      newer: "Landlord design standards",
    },
    traitFaqs: {
      heritage: (c) => ({ q: `Does a storefront renovation in Old Town ${c.name} need heritage approval?`, a: `Exterior changes, including storefronts and often signage, inside a heritage conservation district usually need heritage approval as well as a building permit.` }),
      older: (c) => ({ q: `What should I know about renovating a mixed-use building in ${c.name}?`, a: `Fire separation between commercial and residential space, exits and sound all need attention, and tenants living above may need notice and access planning.` }),
      rural: (c) => ({ q: `Can I open a farm store or tasting room on a rural property in ${c.name}?`, a: `It depends on the zoning and the type of use. Confirm with the ${c.L.muni}'s planning staff before designing the space.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for a commercial renovation in ${c.name}?`, a: `Most commercial renovations need a building permit from the ${c.L.muni}, and a change of use may need zoning approval. Electrical work needs an ESA notification.` }),
  },

  "roofing": {
    hero: (c) => `Roof replacement and repair in ${c.name}, matched to your house and its exposure.`,
    lead: (c) =>
      `Most ${c.name} homes have asphalt shingle roofs, with metal roofing increasingly common on cottages, farmhouses and newer homes. A roof usually needs attention because shingles are curling or losing granules, there is a leak around a chimney, vent or skylight, or ice is building up at the eaves. The right fix depends on the age of the roof, the decking underneath, and the attic ventilation.`,
    notes: {
      lakeErie: (c) => `Near ${lakeName(c.L)}, wind is the main threat. Shingles rated for high wind, proper nailing, and secure ridge and edge details help keep a roof intact through winter storms.`,
      lakeOntario: (c) => `Close to ${lakeName(c.L)}, roofs see more wind and moisture. Good flashing and secure edges matter.`,
      older: (c) => `Older houses in ${c.L.older} may have several layers of shingles, board sheathing or a chimney that needs rebuilding. Ask whether the old layers will be removed and how the decking will be checked.`,
      cottages: (c) => `Converted cottages in ${c.name} often have low-slope roofs, little attic space and no ventilation. Adding insulation for year-round use without adding ventilation can cause condensation and ice dams.`,
      heritage: (c) => `In the heritage district, roofing materials visible from the street may need heritage approval, particularly on designated buildings.`,
      rural: (c) => `Rural ${c.name} properties often have barns and outbuildings as well as the house. Metal roofing is common on those for its long life.`,
      newer: (c) => `Newer ${c.name} homes often have complex roofs with many valleys. Valleys and step flashing are where most leaks start.`,
      escarpment: (c) => `On the escarpment, higher ground and exposure can mean stronger winds, which affects shingle choice and installation.`,
      students: (c) => `For rental properties in ${c.name}, scheduling roof work around tenants and giving notice is part of planning.`,
    },
    approvals: (c) =>
      `Replacing shingles with similar materials usually does not need a building permit in ${c.name}, but structural changes to the roof, new dormers or a change to a heavier material may. Confirm with the ${c.L.muni}.`,
    close: (c) =>
      `When comparing roofing quotes, ask about removal of old layers, decking replacement, underlayment, ice and water shield at the eaves and valleys, ventilation, and flashing at chimneys and walls. Ask how the property will be protected during tear-off. To arrange a roof assessment in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Condition of the decking under the shingles",
      "Ice and water shield at eaves and valleys",
      "Attic ventilation and insulation",
      "Flashing at chimneys, walls and vents",
      "Eavestroughs and downspouts",
    ],
    traitItems: {
      lakeErie: "Wind-rated shingles and nailing",
      older: "Removing old layers and rebuilding chimneys",
      cottages: "Ventilation in a low-slope cottage roof",
      heritage: "Heritage approval for visible materials",
      rural: "Metal roofing for outbuildings",
    },
    traitFaqs: {
      lakeErie: (c) => ({ q: `What roofing holds up best near Lake Erie in ${c.name}?`, a: `Shingles rated for high wind, installed with the manufacturer's high-wind nailing pattern, or a properly fastened metal roof. Edge and ridge details matter as much as the material.` }),
      cottages: (c) => ({ q: `Why does my converted cottage in ${c.name} get ice dams?`, a: `Heat escaping into a poorly ventilated, poorly insulated roof melts snow, which refreezes at the eaves. Air sealing, insulation and ventilation together fix it.` }),
      older: (c) => ({ q: `Should old shingle layers be removed on my ${c.name} house?`, a: `Usually, yes. Removing old layers lets the decking be inspected and repaired, and avoids adding weight.` }),
      heritage: (c) => ({ q: `Does a roof replacement in the heritage district need approval?`, a: `It can, especially if the material or appearance changes. Check with the Town of Niagara-on-the-Lake before choosing materials.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit to replace my roof in ${c.name}?`, a: `Like-for-like reroofing usually does not, but structural changes, dormers or heavier materials may. Confirm with the ${c.L.muni}.` }),
  },

  "flooring": {
    hero: (c) => `Flooring installation in ${c.name}: the right material for each room, on a properly prepared subfloor.`,
    lead: (c) =>
      `New flooring changes how a ${c.name} home looks and feels, but the material is only half the decision. The other half is the subfloor: whether it is flat, solid and dry enough for what you want to install. Hardwood, engineered wood, luxury vinyl plank, laminate and tile all have different requirements for flatness, moisture and expansion.`,
    notes: {
      older: (c) => `Older houses in ${c.L.older} often have original hardwood under carpet or vinyl. Refinishing it can be a good alternative to replacing it. Floors may also be out of level, which affects large-format tile and click flooring.`,
      cottages: (c) => `Cottage floors in ${c.name} often sit over crawlspaces and move with the seasons. Luxury vinyl or engineered wood copes better than solid hardwood where humidity swings.`,
      clay: (c) => `In ${c.name} basements on clay soil, moisture under a concrete slab is common, so use a vapour barrier or a material that tolerates damp, such as luxury vinyl plank or tile.`,
      students: (c) => `For rentals in ${c.name}, luxury vinyl plank is the usual choice because it is water-resistant and individual planks can be replaced.`,
      heritage: (c) => `In heritage homes, original wide-plank or softwood floors are often worth keeping and repairing rather than covering.`,
      newer: (c) => `Newer ${c.name} homes often have carpet upstairs and laminate or vinyl on the main floor. Replacing them is usually straightforward, but check the subfloor for squeaks first.`,
      lakeErie: (c) => `Near ${lakeName(c.L)}, humid summers mean wood floors need to acclimatise and need expansion gaps.`,
      lakeOntario: (c) => `With lake humidity, wood floors need time to acclimatise and room to expand.`,
      privateServices: (c) => `In rural homes with radiant or wood heat, choose flooring rated for the heat source.`,
    },
    approvals: (c) =>
      `Flooring work in ${c.name} does not usually need a building permit, unless it is part of a larger renovation or involves structural repairs to the floor.`,
    close: (c) =>
      `Ask how the subfloor will be checked and prepared, what underlay is used, how transitions between rooms will be handled, and whether baseboards and doors will be removed and refitted. To talk through flooring for your ${c.name} home, call (647) 797-9471 or use the form above.`,
    items: [
      "Subfloor flatness and condition",
      "Moisture, especially in basements",
      "Underlay and sound control",
      "Transitions between rooms",
      "Baseboards and door clearance",
    ],
    traitItems: {
      older: "Original hardwood worth refinishing",
      cottages: "Seasonal movement over a crawlspace",
      clay: "Slab moisture in basements",
      students: "Water-resistant, replaceable planks",
      heritage: "Repairing original floors",
    },
    traitFaqs: {
      older: (c) => ({ q: `Is there hardwood under the carpet in my older ${c.name} house?`, a: `Often there is. Lift a corner in a closet to check. Original hardwood can often be sanded and refinished instead of replaced.` }),
      clay: (c) => ({ q: `What flooring works in a ${c.name} basement?`, a: `Luxury vinyl plank and tile tolerate moisture best. Test the slab for moisture first and use a vapour barrier or underlay rated for concrete.` }),
      cottages: (c) => ({ q: `What flooring suits a converted cottage in ${c.name}?`, a: `Engineered wood or luxury vinyl cope better with humidity changes than solid hardwood, especially over a crawlspace.` }),
      students: (c) => ({ q: `What is the most durable flooring for a ${c.name} rental?`, a: `Luxury vinyl plank is water-resistant, hard-wearing and individual planks can be replaced if damaged.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit for new flooring in ${c.name}?`, a: `Usually not, unless the work is part of a larger renovation or involves structural floor repairs. The ${c.L.muni} can confirm.` }),
  },

  "painting": {
    hero: (c) => `Interior and exterior painting in ${c.name}, with the preparation that makes paint last.`,
    lead: (c) =>
      `Most of the result of a paint job comes from preparation: cleaning, scraping, filling, sanding, caulking and priming. In ${c.name}, exterior paint also has to handle freeze-thaw cycles, sun and humidity, so surface condition and timing matter as much as the paint.`,
    notes: {
      older: (c) => `In older ${c.name} homes, built before the late 1970s, paint may contain lead. Disturbing it by sanding or scraping needs safe work practices, and testing is a sensible first step.`,
      heritage: (c) => `In the heritage district, exterior colours and materials on designated properties may need heritage review, and wood trim and siding should be repaired rather than replaced where possible.`,
      lakeErie: (c) => `Near ${lakeName(c.L)}, wind and moisture are hard on exterior paint, so good preparation and a quality exterior coating matter more than usual.`,
      lakeOntario: (c) => `Near ${lakeName(c.L)}, moisture and sun wear exterior paint faster, especially on south and west faces.`,
      cottages: (c) => `Cottage siding in ${c.name} is often wood that has been painted many times. Peeling layers need to come off before new paint will hold.`,
      students: (c) => `For rentals in ${c.name}, scuff-resistant finishes in halls and kitchens and a consistent colour scheme make touch-ups easier between tenants.`,
      newer: (c) => `In newer ${c.name} homes, interior repaints are common after drywall settles. Nail pops and cracks should be fixed first.`,
      rural: (c) => `On rural ${c.name} properties, outbuildings, fences and barns are often part of an exterior painting project.`,
    },
    approvals: (c) =>
      `Painting in ${c.name} does not usually need a building permit. In a heritage conservation district, exterior changes may need approval, so check with the ${c.L.muni} first.`,
    close: (c) =>
      `Exterior painting in Niagara is usually best done in late spring to early fall, on dry days. Ask what preparation is included, how many coats, which products, and how furniture, floors and gardens will be protected. To plan painting in ${c.name}, call (647) 797-9471 or use the form above.`,
    items: [
      "Surface preparation and repairs",
      "Primer where needed",
      "Paint type and sheen for each surface",
      "Number of coats",
      "Protection of floors, furniture and gardens",
    ],
    traitItems: {
      older: "Lead paint testing in older homes",
      heritage: "Heritage review for exterior colours",
      lakeErie: "Wind and moisture exposure",
      cottages: "Stripping peeling layers on wood siding",
      students: "Scuff-resistant finishes for rentals",
    },
    traitFaqs: {
      older: (c) => ({ q: `Could my older ${c.name} house have lead paint?`, a: `Homes built before the late 1970s may. Test before sanding or scraping, and use safe work practices to contain dust.` }),
      heritage: (c) => ({ q: `Do I need approval to repaint a heritage house in ${c.name}?`, a: `For designated properties and in the heritage conservation district, exterior changes may need review. Check with the Town of Niagara-on-the-Lake before choosing colours.` }),
      lakeErie: (c) => ({ q: `How long does exterior paint last near Lake Erie in ${c.name}?`, a: `It depends on preparation, product and exposure. Wind and moisture shorten paint life on exposed sides, so thorough preparation and a good exterior coating matter.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit to paint my house in ${c.name}?`, a: `Usually not. In a heritage conservation district, exterior changes may need approval from the ${c.L.muni}.` }),
  },

  "windows-and-doors": {
    hero: (c) => `Window and door replacement in ${c.name}: comfort, efficiency and proper installation.`,
    lead: (c) =>
      `New windows and doors make a ${c.name} home quieter, less drafty and easier to heat and cool, but installation matters as much as the product. Flashing, air sealing and insulation around each opening decide whether a new window stays dry and draft-free. Choices include frame material (vinyl, fibreglass or wood-clad), glazing, and the style of each opening.`,
    notes: {
      older: (c) => `In older houses in ${c.L.older}, window openings are often out of square, and original wood windows sit in brick or plaster. A full-frame replacement may be needed to fix rot and insulate properly.`,
      heritage: (c) => `In the Queen-Picton Heritage Conservation District, window and door replacements visible from the street usually need heritage approval, and repairing original wood windows is often preferred.`,
      lakeErie: (c) => `Near ${lakeName(c.L)}, wind-driven rain tests every window. Correct flashing and sill pans prevent water getting behind the frame.`,
      lakeOntario: (c) => `With wind off ${lakeName(c.L)}, careful flashing and air sealing matter.`,
      cottages: (c) => `Converted cottages in ${c.name} often still have single-glazed or aluminium windows. Replacing them is one of the biggest comfort upgrades for year-round living.`,
      students: (c) => `In rentals, bedroom windows need to meet egress requirements, which is worth checking when replacing them.`,
      newer: (c) => `Windows in newer ${c.name} homes can fail at the seals, showing fog between panes. Sometimes the glass unit alone can be replaced.`,
      rural: (c) => `On rural properties, larger windows facing fields and views are common, and wind exposure is higher.`,
      escarpment: (c) => `On the escarpment, exposure to wind is higher, so frame strength and installation matter.`,
    },
    approvals: (c) =>
      `Replacing windows in the same size openings usually does not need a building permit in ${c.name}, but enlarging an opening or adding a new door often does. Confirm with the ${c.L.muni}.`,
    close: (c) =>
      `Ask whether the quote is for an insert or full-frame installation, how flashing and air sealing will be done, how interior and exterior trim will be finished, and whether any products qualify for current energy-efficiency programs. To talk about windows and doors for your ${c.name} home, call (647) 797-9471 or use the form above.`,
    items: [
      "Insert or full-frame installation",
      "Flashing and sill pans",
      "Air sealing and insulation",
      "Frame material and glazing",
      "Egress in bedrooms",
    ],
    traitItems: {
      older: "Out-of-square openings and rotted frames",
      heritage: "Heritage approval for visible windows",
      lakeErie: "Wind-driven rain",
      cottages: "Replacing single-glazed cottage windows",
      newer: "Replacing failed glass units only",
    },
    traitFaqs: {
      heritage: (c) => ({ q: `Can I replace windows on a heritage house in ${c.name}?`, a: `In the heritage conservation district, visible replacements usually need heritage approval, and repair of original windows is often preferred. Check with the Town first.` }),
      older: (c) => ({ q: `Do older ${c.name} houses need full-frame window replacement?`, a: `When frames are rotted or openings are out of square, full-frame replacement allows proper flashing and insulation. Inserts work where the existing frame is sound.` }),
      lakeErie: (c) => ({ q: `How do I stop windows leaking near Lake Erie in ${c.name}?`, a: `Proper flashing, a sill pan and air sealing during installation keep wind-driven rain out. Ask how each will be handled.` }),
      newer: (c) => ({ q: `Why are my windows foggy between the panes in ${c.name}?`, a: `The seal has failed. In many cases the sealed glass unit can be replaced without replacing the whole window.` }),
    },
    permitFaq: (c) => ({ q: `Do I need a permit to replace windows in ${c.name}?`, a: `Same-size replacements usually do not. Enlarging openings or adding a door often does. Confirm with the ${c.L.muni}.` }),
  },
};

const TIMELINE_NOTE: Partial<Record<Trait, string>> = {
  heritage: "Where heritage approval is needed, allow time for that review before the building permit. ",
  privateServices: "On well and septic properties, a septic assessment can add a step before design is final. ",
  rural: "On rural sites, trade travel and deliveries can stretch the schedule a little. ",
  cottages: "Converted cottages often reveal extra work once walls and floors are opened. ",
  lakeErie: "Exterior work near the lake is easiest to schedule outside the windiest months. ",
  escarpment: "If a Niagara Escarpment Commission permit is needed, it comes before the building permit. ",
  students: "For rentals, work is often timed between tenancies, so book early. ",
  older: "Older houses often reveal extra work once walls are opened, so build in some slack. ",
  newer: "Newer homes are usually quicker, since fewer surprises turn up behind the walls. ",
};

export interface LocalPage {
  hero: string;
  body: string[];
  planningItems: string[];
  faqs: Faq[];
  insight: string;
  insightExtra: string;
}

/** Builds the locally specific content for a city x service page, or null if unknown. */
export function buildLocalPage(citySlug: string, cityName: string, neighbourhoods: string[], serviceSlug: string, serviceIndex: number): LocalPage | null {
  const L = CITY_LOCAL[citySlug];
  const S = SERVICE_LOCAL[serviceSlug];
  if (!L || !S) return null;
  const c: C = { name: cityName, L, n: neighbourhoods };

  const notes = L.traits
    .map((t) => S.notes[t])
    .filter((f): f is (c: C) => string => Boolean(f))
    .slice(0, 4)
    .map((f) => f(c));

  const traitItems = L.traits
    .map((t) => S.traitItems[t])
    .filter((s): s is string => Boolean(s))
    .slice(0, 2);

  const traitFaq = L.traits.map((t) => S.traitFaqs[t]).find(Boolean);

  const faqs: Faq[] = [
    S.permitFaq(c),
    ...(traitFaq ? [traitFaq(c)] : []),
    {
      q: `How long does the work take in ${cityName}?`,
      a: `It depends on the scope, any approvals the ${L.muni} requires, and material lead times. ${TIMELINE_NOTE[L.traits[0]] ?? ""}Ask for a written schedule before work starts.`,
    },
    {
      q: `How do I get in touch about a project in ${n2(c)}?`,
      a: `Call (647) 797-9471, fill out the form above, or email info@niagararenovationcompany.com with your address and a short description of what you'd like to do.`,
    },
  ];

  const fact = L.facts[serviceIndex % L.facts.length];
  const fact2 = L.facts[(serviceIndex + 1) % L.facts.length];
  const cityIndex = Object.keys(CITY_LOCAL).indexOf(citySlug);

  // Alternate the generic closing advice with a town-specific close so that
  // neighbouring towns do not end every page with the same paragraph.
  const localClose = `${fact} If you are planning work in ${c.n.slice(0, 3).join(", ") || cityName} or elsewhere in ${cityName}, start with the questions above, then talk to the ${L.muni} about the approvals your project needs. To discuss it with us, call (647) 797-9471 or use the form above.`;
  const close = (cityIndex + serviceIndex) % 2 === 0 ? S.close(c) : localClose;

  return {
    hero: S.hero(c),
    body: [S.lead(c), ...notes, S.approvals(c), close],
    planningItems: [...S.items, ...traitItems],
    faqs,
    insight: `${L.setting} ${fact}`,
    insightExtra: fact2,
  };
}
