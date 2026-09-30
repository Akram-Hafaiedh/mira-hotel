export type RoomAmenity =
  | "King bed"
  | "Queen bed"
  | "Twin beds"
  | "Soaking tub"
  | "Rain shower"
  | "Work desk"
  | "Balcony"
  | "City view"
  | "Garden view"
  | "Minibar"
  | "Nespresso"
  | "Smart TV";

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  sizeSqm: number;
  guests: number;
  beds: string;
  priceFrom: number;
  amenities: RoomAmenity[];
  highlight: string;
  /** Primary photo (Unsplash demo assets) */
  image: string;
  imageAlt: string;
  /** Extra photos for detail gallery */
  gallery: string[];
};

export const rooms: Room[] = [
  {
    slug: "courtyard-queen",
    name: "Courtyard Queen",
    tagline: "Quiet light over the inner garden.",
    description:
      "A composed queen room facing the courtyard — soft textiles, a writing desk, and morning sun through linen curtains.",
    longDescription:
      "The Courtyard Queen is our most requested room for longer stays. Filtered light from the garden keeps the space calm through the day. A compact desk supports focused work; evenings settle into a deep reading chair and layered lighting. Bath includes a walk-in rain shower and house-milled amenities.",
    sizeSqm: 28,
    guests: 2,
    beds: "1 queen",
    priceFrom: 240,
    amenities: [
      "Queen bed",
      "Rain shower",
      "Work desk",
      "Garden view",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "Garden-facing",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bright hotel bedroom with white linens and soft daylight",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "city-king",
    name: "City King",
    tagline: "Wide glass, long views, a slower evening.",
    description:
      "Corner king with floor-to-ceiling windows toward the avenue. Separate seating, soaking tub, and a minibar stocked for late arrivals.",
    longDescription:
      "Designed for guests who want space without spectacle. The City King opens to a broad urban view and keeps the palette restrained — warm stone, charcoal upholstery, and oak. The bath pairs a soaking tub with a rain shower. Ideal for two, with a sofa that converts for an occasional third guest on request.",
    sizeSqm: 36,
    guests: 2,
    beds: "1 king",
    priceFrom: 320,
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
    highlight: "Corner suite light",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern hotel suite with city view and king bed",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "atelier-twin",
    name: "Atelier Twin",
    tagline: "Two beds, one quiet studio rhythm.",
    description:
      "Twin beds and a generous work wall — suited to friends, colleagues, or anyone who prefers separate sleep and a clear desk.",
    longDescription:
      "The Atelier Twin borrows from studio layout: twin beds along one wall, a continuous desk under the window, and storage that stays out of the way. North light is steady and cool. Bath is efficient with a rain shower. A strong choice for business pairs or travelers who value personal space.",
    sizeSqm: 30,
    guests: 2,
    beds: "2 twins",
    priceFrom: 260,
    amenities: [
      "Twin beds",
      "Rain shower",
      "Work desk",
      "City view",
      "Nespresso",
      "Smart TV",
    ],
    highlight: "Work-forward",
    image:
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hotel room with twin beds and minimal furnishings",
    gallery: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "terrace-suite",
    name: "Terrace Suite",
    tagline: "Private outdoor edge above the street.",
    description:
      "Our largest stay: king bed, separate lounge, and a furnished terrace for morning coffee or a last drink under the skyline.",
    longDescription:
      "The Terrace Suite is Mira’s signature room. A full living area separates from the bedroom; the terrace is wide enough for two chairs and a small table. Interiors stay quiet — sand linen, pale oak, black metal fixtures. Bath includes both soaking tub and rain shower. Book early for weekends; inventory is limited to three suites.",
    sizeSqm: 48,
    guests: 3,
    beds: "1 king + sofa",
    priceFrom: 480,
    amenities: [
      "King bed",
      "Soaking tub",
      "Rain shower",
      "Balcony",
      "City view",
      "Minibar",
      "Nespresso",
      "Smart TV",
      "Work desk",
    ],
    highlight: "Private terrace",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Luxury hotel suite with elegant seating and warm light",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

export function roomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
