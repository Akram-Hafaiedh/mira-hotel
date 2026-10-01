/** Demo dining — restaurant, hours, sample menu */

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const restaurant = {
  name: "The Courtyard",
  tagline: "Seasonal plates, quiet service, open to hotel guests and the street.",
  description:
    "Our ground-floor restaurant looks onto the inner garden. Breakfast is unhurried; dinner runs a short, changing menu with Cascadia produce and a compact wine list. No spectacle — just careful cooking and tables that are easy to book.",
  image:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Restaurant dining room with warm lighting",
  hours: [
    { label: "Breakfast", value: "7:00 – 10:30" },
    { label: "Lunch", value: "12:00 – 14:30" },
    { label: "Dinner", value: "18:00 – 22:00" },
    { label: "Bar", value: "17:00 – 23:00" },
  ],
  notes: [
    "Walk-ins welcome when space allows; dinner reservations preferred on weekends.",
    "Room service for in-house guests until 21:30.",
  ],
} as const;

export const menuSections: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      {
        name: "Garden chicory & citrus",
        description: "Bitter greens, blood orange, hazelnut, soft cheese.",
        price: 16,
        dietary: ["vegetarian"],
      },
      {
        name: "Coastal crudo",
        description: "Day-boat fish, green chili oil, herbs, lime.",
        price: 22,
        dietary: ["gluten-free"],
      },
      {
        name: "Roasted bone broth",
        description: "Slow stock, mushrooms, soft egg, grilled sourdough.",
        price: 14,
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      {
        name: "Market fish, browned butter",
        description: "Whatever landed this morning, greens, lemon.",
        price: 36,
        dietary: ["gluten-free"],
      },
      {
        name: "Dry-aged strip, charcoal",
        description: "Cascade beef, potato, mustard greens.",
        price: 48,
        dietary: ["gluten-free"],
      },
      {
        name: "Hand-cut pasta, wild mushrooms",
        description: "Brown butter, thyme, aged parmesan.",
        price: 28,
        dietary: ["vegetarian"],
      },
      {
        name: "Charred cauliflower “steak”",
        description: "Tahini, pomegranate, herb salad.",
        price: 24,
        dietary: ["vegan", "gluten-free"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Olive oil cake",
        description: "Citrus yogurt, seasonal fruit.",
        price: 12,
        dietary: ["vegetarian"],
      },
      {
        name: "Dark chocolate & sea salt",
        description: "Ganache, olive oil, flake salt.",
        price: 14,
        dietary: ["vegetarian", "gluten-free"],
      },
    ],
  },
];

export function formatMenuPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
