import HeroSection from "@/components/sections/HeroSection";
import EventOverviewSection from "@/components/sections/EventOverviewSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import TicketsSection from "@/components/sections/TicketsSection";
import VenueSection from "@/components/sections/VenueSection";
import FAQSection from "@/components/sections/FAQSection";
import SponsorsNewsletterSection from "@/components/sections/SponsorsNewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventOverviewSection />
      <ScheduleSection />
      <TicketsSection />
      <VenueSection />
      <FAQSection />
      <SponsorsNewsletterSection />
    </>
  );
}
