import IMAGES from "./images.json";
export const PHONE = "(647) 797-9471";
export const EMAIL = "info@niagararenovationcompany.com";
export const ADDRESS = "Niagara Region, Ontario";
export const YEAR_FOUNDED = 2008;

export const SERVICES = [
  { slug: "basement-finishing", name: "Basement Renovations", icon: "basement", shortDesc: "Finished basements, legal suites, in-law apartments, and rec rooms built to code." },
  { slug: "kitchen-renovations", name: "Kitchen Renovations", icon: "kitchen", shortDesc: "Transform your kitchen with custom cabinetry, countertops, and modern layouts." },
  { slug: "additions-adu", name: "ADU Builds & Additions", icon: "adu", shortDesc: "Garden suites, garage conversions, legal basement suites, and home additions." },
  { slug: "general-contracting", name: "General Contracting", icon: "contracting", shortDesc: "Full-service general contracting for complex multi-trade renovation projects." },
  { slug: "home-additions", name: "Home Additions", icon: "addition", shortDesc: "Add square footage with expertly built room additions, second storeys, and sunrooms." },
  { slug: "bathroom-renovations", name: "Bathroom Renovations", icon: "bathroom", shortDesc: "Luxury bathroom upgrades from walk-in showers to full suite transformations." },
  { slug: "decks-outdoor", name: "Decks & Outdoor Living", icon: "decks", shortDesc: "Custom decks, pergolas, patios, and outdoor living spaces for your home." },
  { slug: "commercial-renovations", name: "Commercial Renovations", icon: "commercial", shortDesc: "Professional commercial fit-outs, office renovations, and tenant improvements." },
  { slug: "roofing", name: "Roofing", icon: "roofing", shortDesc: "Full roof replacements and repairs using premium materials." },
  { slug: "flooring", name: "Flooring", icon: "flooring", shortDesc: "Hardwood, tile, laminate, and luxury vinyl flooring installation." },
  { slug: "painting", name: "Painting", icon: "painting", shortDesc: "Interior and exterior painting with premium paints and expert finishes." },
  { slug: "windows-and-doors", name: "Windows & Doors", icon: "windows", shortDesc: "Energy-efficient window and door replacement throughout your home." },
];

export const CITIES = [
  {
    slug: "niagara-falls",
    name: "Niagara Falls",
    landmark: "near Clifton Hill and the famous Niagara Falls waterfront",
    cityDesc: "Niagara Falls has a rich mix of post-war bungalows, mid-century homes, and newer builds spanning from the tourist corridor to established residential communities inland. Homeowners in Stamford, Chippawa, and the Glenview area are among the most active renovation investors in the region, drawn by strong real estate fundamentals and a growing appreciation for premium home upgrades.",
    neighbourhoods: ["Stamford", "Chippawa", "Queenston", "Lundy's Lane", "Glenview", "Fallsview"],
  },
  {
    slug: "st-catharines",
    name: "St. Catharines",
    landmark: "in the heart of the Garden City, near the historic Welland Canal",
    cityDesc: "As Niagara Region's largest city and commercial hub, St. Catharines offers a remarkably diverse housing stock — from century Victorian homes in Port Dalhousie and heritage properties in the Haig neighbourhood to modern townhomes in newer Grantham subdivisions. The Garden City's renovation market is thriving as homeowners across Merritton, Lakeshore, and Facer invest in meaningful upgrades.",
    neighbourhoods: ["Port Dalhousie", "Merritton", "Grantham", "Haig", "Facer", "Lakeshore"],
  },
  {
    slug: "welland",
    name: "Welland",
    landmark: "along the scenic Welland Canal corridor",
    cityDesc: "Known as the Rose City, Welland offers some of the most affordable housing in Niagara Region — and outstanding renovation potential for owners looking to dramatically increase property values. From canal-side neighbourhoods in Dain City to family-oriented streets in Crowland, renovation investments in Welland consistently deliver strong returns in a rising market.",
    neighbourhoods: ["Dain City", "Crowland", "Lincoln East", "Downtown Welland", "Rose City Park", "Forks Road"],
  },
  {
    slug: "thorold",
    name: "Thorold",
    landmark: "near the Thorold Tunnel and the scenic canal locks",
    cityDesc: "A compact city with a wealth of heritage architecture shaped by its storied history along the Welland Canal, Thorold is seeing significant renovation activity as buyers discover its charm and proximity to St. Catharines amenities. Neighbourhoods like Allanburg, Beaverdams, and Thorold South present a variety of renovation challenges and opportunities our team is well-equipped to handle.",
    neighbourhoods: ["Allanburg", "Beaverdams", "Thorold South", "Port Robinson", "Confederation Heights"],
  },
  {
    slug: "port-colborne",
    name: "Port Colborne",
    landmark: "along the beautiful Lake Erie shoreline",
    cityDesc: "Port Colborne's exceptional Lake Erie waterfront setting makes it one of Niagara's most desirable communities for cottage-to-permanent-home conversions and heritage property renovations. Areas like Humberstone, the Sugarloaf peninsula, and the Vale corridor are seeing increased renovation investment as year-round residents put down permanent roots along the shore.",
    neighbourhoods: ["Humberstone", "Sugarloaf", "Vale", "Gasline", "Killaly East", "Barker Street area"],
  },
  {
    slug: "grimsby",
    name: "Grimsby",
    landmark: "at the foot of the Niagara Escarpment with stunning lakeshore views",
    cityDesc: "Grimsby is one of Niagara Region's fastest-growing communities, with new developments along the QEW corridor complementing established family neighbourhoods nestled against the Escarpment. Areas like Casablanca, Grimsby Beach, and the Nelles Corners district are particularly popular for major kitchen and bathroom renovations as homeowners upgrade to match rising property values.",
    neighbourhoods: ["Casablanca", "Grimsby Beach", "Nelles Corners", "South Grimsby", "Maple Avenue area", "Hunter Road corridor"],
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    landmark: "in the heart of Niagara's wine country along the Twenty Valley",
    cityDesc: "Home to some of Ontario's most celebrated wine country real estate, Lincoln's communities of Beamsville, Vineland, and Jordan attract discerning homeowners who demand the highest quality craftsmanship. Renovation projects in Lincoln frequently involve heritage farmhouses and agricultural properties thoughtfully converted into contemporary family residences, requiring specialist skills and a deep respect for original character.",
    neighbourhoods: ["Beamsville", "Vineland", "Jordan", "Campden", "Ball's Falls area", "Tintern"],
  },
  {
    slug: "pelham",
    name: "Pelham",
    landmark: "in the charming community of Fonthill, surrounded by orchards and vineyards",
    cityDesc: "Fonthill has emerged as one of Niagara's most sought-after addresses, blending small-town charm with convenient access to major amenities and excellent schools. Pelham homeowners across Fonthill, Fenwick, and Ridgeville are investing heavily in renovations that enhance comfort, functionality, and long-term property values in this high-demand market.",
    neighbourhoods: ["Fonthill", "Fenwick", "Ridgeville", "Effingham", "Cream Street area", "Welland Road corridor"],
  },
  {
    slug: "niagara-on-the-lake",
    name: "Niagara-on-the-Lake",
    landmark: "in one of Canada's most picturesque heritage towns",
    cityDesc: "Home to some of Ontario's most architecturally significant residential properties, Niagara-on-the-Lake demands renovation contractors with a genuine respect for heritage design, period-appropriate materials, and strict local conservation guidelines. From Old Town character homes and estate properties along the river to newer builds in Glendale and Virgil, our team brings the precision and sensitivity these exceptional properties deserve.",
    neighbourhoods: ["Old Town", "Virgil", "St. Davids", "Queenston", "Glendale", "Niagara-on-the-Lake waterfront"],
  },
  {
    slug: "fort-erie",
    name: "Fort Erie",
    landmark: "along the Niagara River with views of Buffalo, New York",
    cityDesc: "Fort Erie's waterfront communities have transformed dramatically in recent years — from seasonal cottage retreats to thriving year-round family neighbourhoods — creating sustained demand for quality renovation contractors. Crystal Beach, Ridgeway, Bridgeburg, and Stevensville all feature significant renovation activity as property owners capitalize on rising values in this increasingly desirable cross-border community.",
    neighbourhoods: ["Crystal Beach", "Ridgeway", "Bridgeburg", "Stevensville", "Amigari Beach", "Point Abino area"],
  },
  {
    slug: "wainfleet",
    name: "Wainfleet",
    landmark: "in this peaceful rural municipality near Long Beach",
    cityDesc: "As one of Niagara's most rural and character-rich municipalities, Wainfleet offers unique properties along Long Beach, Marshville, and throughout the township that require specialized renovation expertise. Homeowners here appreciate our ability to work in rural settings, coordinate extended timelines, and source quality materials for projects that often involve older agricultural buildings, lakefront properties, and expansive rural estates.",
    neighbourhoods: ["Long Beach", "Wainfleet Village", "Marshville", "Dufferin Islands area", "Hwy 3 corridor", "Lakeshore Road area"],
  },
  {
    slug: "west-lincoln",
    name: "West Lincoln",
    landmark: "serving the communities of Smithville, Bismark, and Wellandport",
    cityDesc: "The growing communities of Smithville, Bismark, and Wellandport make up this expanding municipality where heritage farm properties and newer family subdivisions exist side by side. West Lincoln homeowners are increasingly choosing renovation over relocation — investing in kitchen transformations, basement developments, and additions that add living space without sacrificing their connection to this welcoming rural community.",
    neighbourhoods: ["Smithville", "Bismark", "Wellandport", "Caistor Centre", "North Grimsby", "Abingdon"],
  },
];

export const TESTIMONIALS = [
  { name: "Sarah M.", city: "St. Catharines", service: "Kitchen Renovations", text: "Niagara Renovation Company completely transformed our outdated kitchen. The team was professional, punctual, and the quality of work is outstanding. We get compliments every time someone visits!", rating: 5 },
  { name: "Mike D.", city: "Niagara Falls", service: "Bathroom Renovations", text: "They converted our old main bath into a luxurious spa-like retreat. Finished on schedule and on budget. Couldn't be happier with the result!", rating: 5 },
  { name: "Jennifer L.", city: "Welland", service: "Basement Finishing", text: "Our basement went from a storage dungeon to a beautiful rec room and home office. The crew was friendly, clean, and incredibly skilled. Highly recommend!", rating: 5 },
  { name: "Robert K.", city: "Grimsby", service: "Windows & Doors", text: "Had all 14 windows replaced and a new front door installed. The difference in energy bills and comfort is remarkable. Professional from quote to cleanup.", rating: 5 },
  { name: "Amanda T.", city: "Niagara-on-the-Lake", service: "Home Additions", text: "They built a beautiful sunroom addition on our heritage home, respecting the existing architecture perfectly. Truly talented craftsmen. Worth every penny.", rating: 5 },
];

export const SERVICE_IMAGES: Record<string, string> = IMAGES.services as Record<string, string>;
