"use client";

import { motion } from "framer-motion";
import { ticketsData, onSaleData } from "@/data/event";
import { Button } from "@/components/ui/button";
import { SeatingMap } from "@/components/ui/SeatingMap";
import Link from "next/link";

export default function TicketsSection() {
  return (
    <section id="tickets" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Secure Your Spot</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Ticket Categories</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column: Seating Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full flex items-center justify-center min-h-[400px]"
          >
            <SeatingMap />
          </motion.div>

          {/* Right Column: Ticket List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {ticketsData.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col rounded-xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex items-stretch min-h-[80px]">
                  {/* Color Indicator */}
                  <div className={`w-16 shrink-0 ${ticket.color}`} />
                  
                  {/* Info */}
                  <div className="flex flex-col justify-center flex-grow py-3 px-6">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none mb-1 text-white">
                      {ticket.name}
                    </h3>
                    <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
                      {ticket.subtitle}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-end px-6 py-3 shrink-0">
                    <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {ticket.price}
                    </span>
                  </div>
                </div>

                {/* Benefits / Details (Only shown if benefits exist) */}
                {ticket.benefits && ticket.benefits.length > 0 && (
                  <div className="p-6 border-t border-border/50 bg-background/50">
                    <ul className="space-y-2">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80 uppercase font-medium">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          {onSaleData.map((onSale, index) => (
            <motion.div 
              key={onSale.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="w-full sm:w-[300px]"
            >
              <Link href={onSale.link} className="w-full block">
                <Button 
                  className="w-full h-auto py-4 flex flex-col items-center justify-center bg-card border-border border hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-foreground group"
                  variant="outline"
                >
                  <span className="text-base font-bold mb-1 text-white">{onSale.title}</span>
                  <span className="text-xs text-white/70">{onSale.subtitle}</span>
                </Button>
              </Link>
              <div className="text-center mt-3">
                <p className="text-[10px] md:text-xs text-muted-foreground leading-tight whitespace-pre-line">
                  {onSale.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
