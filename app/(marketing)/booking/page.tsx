import type { Metadata } from "next";
import { BookingForm } from "@/components/marketing/booking-form";

export const metadata: Metadata = {
  title: "Book",
  description: "Request a stay at Mira Hotel — demo booking flow, no payment.",
};

type Props = {
  searchParams: Promise<{ room?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const { room } = await searchParams;

  return (
    <div className="px-4 py-14 sm:px-6 sm:py-16">
      <BookingForm initialRoomSlug={room} />
    </div>
  );
}