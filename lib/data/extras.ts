/** Optional stay extras for the mock checkout — no real charges */

export type StayExtra = {
  id: string;
  name: string;
  description: string;
  /** Flat fee or per night */
  pricing: "per_night" | "per_stay";
  amount: number;
};

export const stayExtras: StayExtra[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Continental breakfast for all guests, each morning of the stay.",
    pricing: "per_night",
    amount: 28,
  },
  {
    id: "late-checkout",
    name: "Late checkout",
    description: "Keep the room until 3:00 PM on departure day (subject to availability).",
    pricing: "per_stay",
    amount: 45,
  },
  {
    id: "airport-transfer",
    name: "Airport transfer",
    description: "One-way private transfer from Cascadia International (demo rate).",
    pricing: "per_stay",
    amount: 65,
  },
  {
    id: "parking",
    name: "On-site parking",
    description: "Reserved space in the hotel garage for the full stay.",
    pricing: "per_night",
    amount: 22,
  },
];

export function extraCost(
  extra: StayExtra,
  nights: number,
  guests: number,
): number {
  if (extra.id === "breakfast") {
    // per night × guests
    return extra.amount * nights * guests;
  }
  if (extra.pricing === "per_night") {
    return extra.amount * nights;
  }
  return extra.amount;
}

export type PaymentMethod = "pay_at_hotel" | "card_on_file";

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  pay_at_hotel: "Pay at hotel",
  card_on_file: "Card on file (demo)",
};
