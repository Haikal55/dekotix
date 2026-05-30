"use client";

import { motion } from "framer-motion";
import { eventData } from "@/data/event";
import { MapPin, Navigation, Car, Train } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VenueSection() {
  return (
    <section id="venue" className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Location</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Venue</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Venue Image and Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            <div className="aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-border/50 relative shadow-2xl bg-card">
              <div className="absolute inset-0 pointer-events-none">
                <iframe
                  src={eventData.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 text-white mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{eventData.location}</h3>
                </div>
                <p className="text-white/80 max-w-md ml-13">{eventData.address}</p>
              </div>
            </div>
          </motion.div>

          {/* Transportation Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold mb-6">Getting There</h3>
            <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
              The stadium is easily accessible via public transport, ride-hailing apps, and personal vehicles. We highly recommend using public transportation to avoid heavy traffic.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                  <Train className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Public Transit</h4>
                  <p className="text-muted-foreground text-sm">Take the Commuter Line to Ancol Station, then transfer to the free shuttle bus provided on event day.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Ride Hailing</h4>
                  <p className="text-muted-foreground text-sm">Dedicated drop-off and pick-up zones are located at the West Gate. Use code TIXPRO for a discount on Grab/Gojek.</p>
                </div>
              </div>
            </div>

            <a href={eventData.mapExternalUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-fit">
                <Navigation className="w-5 h-5 mr-2" />
                Open in Google Maps
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
