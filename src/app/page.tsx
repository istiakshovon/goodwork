import { CallToAction } from "@/components/call-to-action";
import { FocusAreas } from "@/components/focus-areas";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Newsletter } from "@/components/newsletter";
import { Stories } from "@/components/stories";
import { UpcomingEvents } from "@/components/upcoming-events";

export default function Home() {
  return (
    <>
    
      <main>
        <Hero />
        <FocusAreas />
        <HowItWorks />
        <UpcomingEvents />
        <Stories />
        <CallToAction />
        <Newsletter />
      </main>
     
    </>
  );
}
