"use client";

import { motion } from "framer-motion";
import { scheduleData } from "@/data/event";

export default function ScheduleSection() {
  return (
    <section className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Timeline</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Event Schedule</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {scheduleData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background transform -translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 text-left"}`}>
                    <div className="bg-background border border-border/50 p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                      <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                        {item.time}
                      </span>
                      <h4 className="text-xl font-bold mb-2 text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
