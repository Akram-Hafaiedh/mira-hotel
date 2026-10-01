/** Demo experiences — hotel-led and local partners */

export type Experience = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  /** per person | per group | complimentary */
  pricingNote: string;
  image: string;
  imageAlt: string;
  category: "hotel" | "local" | "wellness";
  highlights: string[];
};

export const categoryLabel = {
  hotel: "Hotel-led",
  local: "Local partners",
  wellness: "Wellness",
} as const;

export const experiences: Experience[] = [
  {
    slug: "morning-garden-walk",
    name: "Morning garden walk",
    tagline: "Quiet paths before the city wakes.",
    description:
      "A guided half-hour through the courtyard and neighboring pocket parks with our concierge. Coffee on return in the lobby.",
    duration: "45 min",
    priceFrom: 0,
    pricingNote: "Complimentary for in-house guests",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Quiet garden path in soft morning light",
    category: "hotel",
    highlights: ["Small groups", "Daily at 8:00", "Weather dependent"],
  },
  {
    slug: "coastal-cycle",
    name: "Coastal cycle",
    tagline: "Harbor path, two hours, return by noon.",
    description:
      "E-bikes and a mapped route along the waterfront. Helmets and a simple picnic stop included. Book the day before.",
    duration: "2 hours",
    priceFrom: 55,
    pricingNote: "Per person",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bicycle along a coastal path",
    category: "local",
    highlights: ["E-bikes provided", "Max 6 guests", "Morning slots"],
  },
  {
    slug: "chef-table-dinner",
    name: "Chef’s table at The Courtyard",
    tagline: "Six courses, open kitchen edge.",
    description:
      "A seated counter for four facing the pass. Seasonal tasting with wine pairings available. Thursday–Saturday only.",
    duration: "2.5 hours",
    priceFrom: 145,
    pricingNote: "Per person · pairings extra",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Fine dining plates on a dark table",
    category: "hotel",
    highlights: ["4 seats", "Advance booking", "Dietary notes welcome"],
  },
  {
    slug: "spa-hour",
    name: "Spa hour",
    tagline: "Treatment room on the mezzanine.",
    description:
      "Partner therapists for massage and facial treatments. Book through the desk; rates include access to the quiet room after.",
    duration: "60–90 min",
    priceFrom: 120,
    pricingNote: "Per treatment",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Calm spa treatment room",
    category: "wellness",
    highlights: ["In-house suite", "Partner therapists", "Advance booking"],
  },
  {
    slug: "gallery-evening",
    name: "Gallery evening",
    tagline: "Two blocks over, after hours.",
    description:
      "Private viewing at a neighboring gallery with a short intro from the curator and a glass of wine. Limited to eight guests.",
    duration: "90 min",
    priceFrom: 40,
    pricingNote: "Per person",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Art gallery interior",
    category: "local",
    highlights: ["Evening only", "Max 8", "Seasonal schedule"],
  },
  {
    slug: "sunrise-yoga",
    name: "Sunrise yoga",
    tagline: "Terrace mats, soft light.",
    description:
      "Open-level practice on the upper terrace when weather allows. Mats provided; bring layers in cooler months.",
    duration: "50 min",
    priceFrom: 25,
    pricingNote: "Per person · free for suite guests",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Yoga practice in soft light",
    category: "wellness",
    highlights: ["Tue / Thu / Sat", "All levels", "Weather dependent"],
  },
];

export function experienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function formatExperiencePrice(amount: number): string {
  if (amount === 0) return "Complimentary";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
