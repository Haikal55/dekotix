"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeatingMap } from "@/components/ui/SeatingMap";
import { ticketsData, eventData } from "@/data/event";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function BuyTicketsPage() {
  // Store quantities for each ticket ID
  const [quantities, setQuantities] = useState<Record<string, number>>(
    ticketsData.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, prev[id] + delta);
      // Optional: limit max tickets per person to 4
      if (newQty > 4) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  // Helper to parse price string "IDR 2.750.000" to number 2750000
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  };

  const totalPrice = ticketsData.reduce((total, ticket) => {
    return total + parsePrice(ticket.price) * quantities[ticket.id];
  }, 0);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Select Tickets</h1>
          <p className="text-muted-foreground text-lg">{eventData.title} - {eventData.formattedDate}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Seating Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:col-span-7 flex flex-col"
          >
            <Card className="border-border/50 bg-card/40 backdrop-blur-md sticky top-24">
              <CardHeader>
                <CardTitle>Venue Layout</CardTitle>
                <CardDescription>Hover over sections to see details. All numbered seating will be assigned automatically.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-2 md:p-6 bg-black/20 rounded-b-xl">
                <SeatingMap />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Ticket Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 mb-24">
              {ticketsData.map((ticket) => (
                <Card key={ticket.id} className={`border-border/50 overflow-hidden transition-all duration-200 ${quantities[ticket.id] > 0 ? 'ring-2 ring-primary bg-primary/5' : 'bg-card/40 hover:bg-card/60'}`}>
                  <div className="flex flex-col sm:flex-row items-stretch">
                    {/* Color Indicator */}
                    <div className={`h-2 sm:h-auto sm:w-3 shrink-0 ${ticket.color}`} />
                    
                    <div className="flex-grow p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-bold uppercase tracking-tight leading-none mb-1">
                          {ticket.name}
                        </h3>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest mb-2 block">
                          {ticket.subtitle}
                        </span>
                        <span className="text-lg font-semibold text-primary">
                          {ticket.price}
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center sm:justify-end gap-3 sm:gap-4 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full border-border hover:bg-background"
                          onClick={() => updateQuantity(ticket.id, -1)}
                          disabled={quantities[ticket.id] === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center font-bold text-lg tabular-nums">
                          {quantities[ticket.id]}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                          onClick={() => updateQuantity(ticket.id, 1)}
                          disabled={quantities[ticket.id] >= 4}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Checkout Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: totalTickets > 0 ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">Total ({totalTickets} tickets)</span>
            <span className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
              {formatPrice(totalPrice)}
            </span>
          </div>
          
          <Link href="/checkout">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Checkout Now
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
