/** Demo dining — restaurant, hours, sample menu with food photos */

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
  image: string;
  imageAlt: string;
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const restaurant = {
  name: "The Courtyard",
  tagline:
    "Seasonal plates, quiet service, open to hotel guests and the street.",
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
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Fresh green salad with citrus",
      },
      {
        name: "Coastal crudo",
        description: "Day-boat fish, green chili oil, herbs, lime.",
        price: 22,
        dietary: ["gluten-free"],
        image:
          "https://images.unsplash.com/photo-1579631542720-3a87824fff86?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Raw fish crudo plated",
      },
      {
        name: "Roasted bone broth",
        description: "Slow stock, mushrooms, soft egg, grilled sourdough.",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Bowl of broth soup",
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
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Cooked fish dish with herbs",
      },
      {
        name: "Dry-aged strip, charcoal",
        description: "Cascade beef, potato, mustard greens.",
        price: 48,
        dietary: ["gluten-free"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Grilled steak on a plate",
      },
      {
        name: "Hand-cut pasta, wild mushrooms",
        description: "Brown butter, thyme, aged parmesan.",
        price: 28,
        dietary: ["vegetarian"],
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Pasta with mushrooms",
      },
      {
        name: "Charred cauliflower “steak”",
        description: "Tahini, pomegranate, herbs, flatbread.",
        price: 24,
        dietary: ["vegan"],
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Vegetable plate with cauliflower",
      },
    ],
  },
  {
    id: "sweets",
    title: "Sweets",
    items: [
      {
        name: "Olive oil cake",
        description: "Citrus, yogurt, sea salt.",
        price: 12,
        dietary: ["vegetarian"],
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Slice of cake dessert",
      },
      {
        name: "Dark chocolate pot",
        description: "70%, olive oil, flake salt.",
        price: 14,
        dietary: ["gluten-free"],
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Chocolate dessert in a cup",
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
