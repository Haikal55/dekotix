import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
      schedules: true,
      faqs: true,
      sponsors: true
    }
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <EventsClient initialEvents={events} />
    </div>
  );
}
