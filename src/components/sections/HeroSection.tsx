"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import Link from "next/link";

export default function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${eventData.images.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-lg">
              {eventData.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg text-white/90 mb-10 drop-shadow">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{eventData.formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{eventData.location}</span>
              </div>
            </div>



            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/buy-tickets" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg h-14 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                  Get Tickets Now
                </Button>
              </Link>
              <Button 
                onClick={() => setIsVideoOpen(true)}
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg h-14 px-8 bg-background/20 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Trailer Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/oZxD1_kXN0I?si=e_RhbdxaFSz_gv89&autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
