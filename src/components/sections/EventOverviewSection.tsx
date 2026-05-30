"use client";

import { motion } from "framer-motion";
import { eventData } from "@/data/event";
import { MapPin, Users, CalendarDays, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function EventOverviewSection() {
  const stats = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      label: "Venue",
      value: eventData.location,
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      label: "Capacity",
      value: eventData.capacity,
    },
    {
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
      label: "Date",
      value: eventData.formattedDate,
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      label: "Duration",
      value: eventData.duration,
    },
  ];

  return (
    <section id="overview" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${eventData.artist.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-3xl font-bold text-white mb-2">{eventData.artist.name}</h3>
                <p className="text-white/80 line-clamp-3">{eventData.artist.bio}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="mb-2">
              <span className="text-primary font-medium tracking-wider uppercase text-sm">About The Event</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              An Unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Live Experience
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {eventData.description}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
