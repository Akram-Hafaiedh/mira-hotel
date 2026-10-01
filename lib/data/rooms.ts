export type RoomCategory = "standard" | "family" | "deluxe" | "vip";

export type RoomAmenity =
  | "King bed"
  | "Queen bed"
  | "Twin beds"
  | "Sofa bed"
  | "Soaking tub"
  | "Rain shower"
  | "Work desk"
  | "Balcony"
  | "Terrace"
  | "City view"
  | "Garden view"
  | "Sea view"
  | "Minibar"
  | "Nespresso"
  | "Smart TV"
  | "Kitchenette"
  | "Dining table"
  | "Walk-in closet"
  | "Bathtub"
  | "Accessibility";

export type GalleryShot = {
  src: string;
  label: string;
  alt: string;
};

export type Room = {
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  longDescription: string;
  sizeSqm: number;
  guests: number;
  beds: string;
  priceFrom: number;
  unitsAvailable: number;
  /** Shown on the homepage “Featured rooms” grid */
  featured: boolean;
  amenities: RoomAmenity[];
  highlight: string;
  image: string;
  imageAlt: string;
  gallery: GalleryShot[];
};

export const categoryLabel: Record<RoomCategory, string> = {
  standard: "Standard",
  family: "Family & group",
  deluxe: "Deluxe",
  vip: "VIP & suites",
};

export const categoryOrder: RoomCategory[] = [
  "standard",
  "family",
  "deluxe",
  "vip",
];

export const rooms: Room[] = [
  {
    slug: "courtyard-queen",
    name: "Courtyard Queen",
    category: "standard",
    tagline: "Quiet light over the inner garden.",
    description:
      "A composed queen room facing the courtyard — soft textiles, a writing desk, and morning sun through linen curtains.",
    longDescription:
      "The Courtyard Queen is our most requested room for longer stays. Filtered light from the garden keeps the space calm through the day. A compact desk supports focused work; evenings settle into layered lighting. Bath includes a walk-in rain shower and house-milled amenities.",
    sizeSqm: 28,
    guests: 2,
    beds: "1 queen",
    priceFrom: 240,
    unitsAvailable: 8,
    featured: true,
    amenities: [
      "Queen bed",
      "Rain shower",
      "Work desk",
      "Garden view",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "Garden-facing",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Courtyard Queen primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Courtyard Queen — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Courtyard Queen — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Courtyard Queen — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
        label: "Work corner",
        alt: "Courtyard Queen — work corner",
      },
      {
        src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
        label: "Garden view",
        alt: "Courtyard Queen — garden view",
      },
    ],
  },
  {
    slug: "garden-twin",
    name: "Garden Twin",
    category: "standard",
    tagline: "Two beds, garden quiet, easy mornings.",
    description:
      "Twin beds facing soft courtyard light — ideal for friends or colleagues who want separate sleep without noise from the avenue.",
    longDescription:
      "A practical twin layout with the same garden orientation as the Courtyard Queen. Beds are full-size; the desk sits under the window. Bath is compact with a rain shower. Strong value for midweek stays.",
    sizeSqm: 30,
    guests: 2,
    beds: "2 twins",
    priceFrom: 250,
    unitsAvailable: 6,
    featured: false,
    amenities: [
      "Twin beds",
      "Rain shower",
      "Work desk",
      "Garden view",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "Twin · garden",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Garden Twin primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Garden Twin — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Garden Twin — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Garden Twin — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
        label: "Desk",
        alt: "Garden Twin — desk",
      },
      {
        src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
        label: "Outlook",
        alt: "Garden Twin — outlook",
      },
    ],
  },
  {
    slug: "atelier-twin",
    name: "Atelier Twin",
    category: "standard",
    tagline: "Two beds, one quiet studio rhythm.",
    description:
      "Twin beds and a generous work wall — suited to friends, colleagues, or anyone who prefers separate sleep and a clear desk.",
    longDescription:
      "Studio-inspired layout: twins along one wall, continuous desk under the window, storage out of the way. North light is steady. Bath is efficient with a rain shower.",
    sizeSqm: 30,
    guests: 2,
    beds: "2 twins",
    priceFrom: 260,
    unitsAvailable: 6,
    featured: false,
    amenities: [
      "Twin beds",
      "Rain shower",
      "Work desk",
      "City view",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "Work-forward",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Atelier Twin primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Atelier Twin — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        label: "Work wall",
        alt: "Atelier Twin — work wall",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Atelier Twin — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Atelier Twin — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=1600&q=80",
        label: "City light",
        alt: "Atelier Twin — city light",
      },
    ],
  },
  {
    slug: "city-king",
    name: "City King",
    category: "deluxe",
    tagline: "Wide glass, long views, a slower evening.",
    description:
      "Corner king with floor-to-ceiling windows toward the avenue. Separate seating, soaking tub, and a minibar for late arrivals.",
    longDescription:
      "Space without spectacle: warm stone, charcoal upholstery, oak. The bath pairs a soaking tub with a rain shower. Sofa can take an occasional third guest on request.",
    sizeSqm: 36,
    guests: 2,
    beds: "1 king",
    priceFrom: 320,
    unitsAvailable: 10,
    featured: true,
    amenities: [
      "King bed",
      "Soaking tub",
      "Rain shower",
      "City view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Work desk",
    ],
    highlight: "Corner light",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "City King primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "City King — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "City King — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=80",
        label: "City view",
        alt: "City King — city view",
      },
      {
        src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "City King — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
        label: "Seating",
        alt: "City King — seating",
      },
    ],
  },
  {
    slug: "harbor-king",
    name: "Harbor King",
    category: "deluxe",
    tagline: "Water light in the mornings, soft evenings.",
    description:
      "King room oriented toward the waterfront edge of Cascadia — broader glass, calmer palette, and a bath with a deep tub.",
    longDescription:
      "Harbor King sits on the higher floors facing the water. Interiors stay restrained so the view does the work. Minibar and Nespresso are stocked; the desk faces the glass.",
    sizeSqm: 34,
    guests: 2,
    beds: "1 king",
    priceFrom: 340,
    unitsAvailable: 7,
    featured: false,
    amenities: [
      "King bed",
      "Bathtub",
      "Rain shower",
      "Sea view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Work desk",
    ],
    highlight: "Water view",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Harbor King primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Harbor King — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
        label: "View",
        alt: "Harbor King — view",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Harbor King — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Harbor King — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
        label: "Desk",
        alt: "Harbor King — desk",
      },
    ],
  },
  {
    slug: "family-connecting",
    name: "Family Connecting",
    category: "family",
    tagline: "Two rooms, one door between.",
    description:
      "A queen room linked to a twin — space for parents and kids (or two couples) without giving up privacy.",
    longDescription:
      "Connecting pair: primary queen with bath, secondary twin with its own shower. Shared small lounge niche at the join. Booked as one stay; ideal for families up to five.",
    sizeSqm: 52,
    guests: 5,
    beds: "1 queen + 2 twins",
    priceFrom: 420,
    unitsAvailable: 4,
    featured: true,
    amenities: [
      "Queen bed",
      "Twin beds",
      "Rain shower",
      "City view",
      "Nespresso",
      "Smart TV",
      "Dining table",
    ],
    highlight: "Connecting",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Family Connecting primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
        label: "Primary bedroom",
        alt: "Family Connecting — primary bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        label: "Twin room",
        alt: "Family Connecting — twin room",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Family Connecting — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        label: "Connecting door",
        alt: "Family Connecting — connecting door",
      },
      {
        src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
        label: "Lounge niche",
        alt: "Family Connecting — lounge niche",
      },
    ],
  },
  {
    slug: "loft-group",
    name: "Loft Group",
    category: "family",
    tagline: "Open plan for crews and celebrations.",
    description:
      "High-ceiling loft with king, sofa bed, and a compact kitchenette — built for groups who want one shared base.",
    longDescription:
      "Open loft on the top of the wing: king bed, sofa bed for two, dining table for six, kitchenette with sink and induction. Bath has a rain shower. Not a formal suite — more a social base for friends or small teams.",
    sizeSqm: 56,
    guests: 6,
    beds: "1 king + sofa bed",
    priceFrom: 460,
    unitsAvailable: 3,
    featured: false,
    amenities: [
      "King bed",
      "Sofa bed",
      "Kitchenette",
      "Dining table",
      "Rain shower",
      "City view",
      "Smart TV",
      "Nespresso",
    ],
    highlight: "Group loft",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Loft Group primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
        label: "Living",
        alt: "Loft Group — living",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        label: "Sleeping",
        alt: "Loft Group — sleeping",
      },
      {
        src: "https://images.unsplash.com/photo-1600566752229-250ed234291c?auto=format&fit=crop&w=1600&q=80",
        label: "Kitchenette",
        alt: "Loft Group — kitchenette",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Loft Group — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
        label: "Outlook",
        alt: "Loft Group — outlook",
      },
    ],
  },
  {
    slug: "terrace-suite",
    name: "Terrace Suite",
    category: "vip",
    tagline: "Private outdoor edge above the street.",
    description:
      "King bed, separate lounge, and a furnished terrace for morning coffee or a last drink under the skyline.",
    longDescription:
      "Signature suite: living area separated from the bedroom; terrace wide enough for two chairs and a small table. Sand linen, pale oak, black metal. Bath includes soaking tub and rain shower.",
    sizeSqm: 48,
    guests: 3,
    beds: "1 king + sofa",
    priceFrom: 480,
    unitsAvailable: 3,
    featured: true,
    amenities: [
      "King bed",
      "Soaking tub",
      "Rain shower",
      "Terrace",
      "City view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Work desk",
    ],
    highlight: "Private terrace",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Terrace Suite primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        label: "Lounge",
        alt: "Terrace Suite — lounge",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Terrace Suite — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80",
        label: "Terrace",
        alt: "Terrace Suite — terrace",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Terrace Suite — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        label: "Skyline",
        alt: "Terrace Suite — skyline",
      },
    ],
  },
  {
    slug: "panorama-suite",
    name: "Panorama Suite",
    category: "vip",
    tagline: "Corner glass, full living room, quiet luxury.",
    description:
      "Our largest suite: king bedroom, full lounge, dining for four, and floor-to-ceiling corner windows.",
    longDescription:
      "Panorama is the top of the house — corner exposure, walk-in closet, double vanity bath with soaking tub. Service includes turndown on request. Limited to two keys on the floor.",
    sizeSqm: 62,
    guests: 3,
    beds: "1 king + sofa",
    priceFrom: 620,
    unitsAvailable: 2,
    featured: false,
    amenities: [
      "King bed",
      "Soaking tub",
      "Rain shower",
      "Walk-in closet",
      "City view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Dining table",
      "Work desk",
    ],
    highlight: "Corner suite",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Panorama Suite primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Panorama Suite — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80",
        label: "Living room",
        alt: "Panorama Suite — living room",
      },
      {
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Panorama Suite — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80",
        label: "Corner view",
        alt: "Panorama Suite — corner view",
      },
      {
        src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
        label: "Entry",
        alt: "Panorama Suite — entry",
      },
    ],
  },
  {
    slug: "accessible-queen",
    name: "Accessible Queen",
    category: "standard",
    tagline: "Same calm standard, clearer circulation.",
    description:
      "Queen room planned for mobility access — wider paths, roll-in shower, and controls at reachable height.",
    longDescription:
      "Built on the Courtyard plan with adjusted clearances, roll-in shower, and lowered switches. Garden-facing when available. Reserve early; inventory is limited.",
    sizeSqm: 30,
    guests: 2,
    beds: "1 queen",
    priceFrom: 250,
    unitsAvailable: 2,
    featured: false,
    amenities: [
      "Queen bed",
      "Rain shower",
      "Accessibility",
      "Garden view",
      "Nespresso",
      "Smart TV",
      "Work desk",
    ],
    highlight: "Accessible",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Accessible Queen primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Accessible Queen — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
        label: "Roll-in shower",
        alt: "Accessible Queen — roll-in shower",
      },
      {
        src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Accessible Queen — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
        label: "Desk",
        alt: "Accessible Queen — desk",
      },
      {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80",
        label: "View",
        alt: "Accessible Queen — view",
      },
    ],
  },
  {
    slug: "executive-king",
    name: "Executive King",
    category: "deluxe",
    tagline: "Desk-first, evening-ready.",
    description:
      "King room with a serious work surface, blackout layers, and a bath meant for a long soak after meetings.",
    longDescription:
      "Aimed at midweek business stays: large desk, strong lighting, quiet HVAC, and a soaking tub. City view on higher floors. Minibar stocked for late check-ins.",
    sizeSqm: 34,
    guests: 2,
    beds: "1 king",
    priceFrom: 310,
    unitsAvailable: 8,
    featured: false,
    amenities: [
      "King bed",
      "Soaking tub",
      "Work desk",
      "City view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Rain shower",
    ],
    highlight: "Business",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Executive King primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Executive King — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1600&q=80",
        label: "Work desk",
        alt: "Executive King — work desk",
      },
      {
        src: "https://images.unsplash.com/photo-1600607688969-a5dba95f6a0e?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Executive King — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=80",
        label: "Entrance",
        alt: "Executive King — entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1616137466211-f939a420be44?auto=format&fit=crop&w=1600&q=80",
        label: "City",
        alt: "Executive King — city",
      },
    ],
  },
  {
    slug: "skyline-vip",
    name: "Skyline VIP",
    category: "vip",
    tagline: "The top key — lounge, terrace, and silence.",
    description:
      "VIP floor suite with private lounge, furnished terrace, walk-in closet, and dedicated check-in when requested.",
    longDescription:
      "Skyline VIP is limited to one key. Separate lounge, dining for four, terrace, and a bath with tub and rain shower. Includes priority desk service in the demo narrative — still mock booking only.",
    sizeSqm: 70,
    guests: 4,
    beds: "1 king + sofa bed",
    priceFrom: 780,
    unitsAvailable: 1,
    featured: false,
    amenities: [
      "King bed",
      "Sofa bed",
      "Terrace",
      "Walk-in closet",
      "Soaking tub",
      "Rain shower",
      "City view",
      "Minibar",
      "Dining table",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "VIP floor",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Skyline VIP primary view",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80",
        label: "Lounge",
        alt: "Skyline VIP — lounge",
      },
      {
        src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
        label: "Bedroom",
        alt: "Skyline VIP — bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
        label: "Terrace",
        alt: "Skyline VIP — terrace",
      },
      {
        src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
        label: "Bathroom",
        alt: "Skyline VIP — bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1600&q=80",
        label: "Bar & dining",
        alt: "Skyline VIP — bar & dining",
      },
    ],
  },
];

export function roomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function roomsByCategory(category: RoomCategory | "all"): Room[] {
  if (category === "all") return rooms;
  return rooms.filter((r) => r.category === category);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function totalUnitsListed(): number {
  return rooms.reduce((sum, r) => sum + r.unitsAvailable, 0);
}

export function featuredRooms(): Room[] {
  return rooms.filter((r) => r.featured);
}
