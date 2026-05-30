"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Ticket as TicketIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventData, scheduleData } from "@/data/event";
import Link from "next/link";

export default function TicketPage() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Mocked data for the generated ticket
  const ticketInfo = {
    userName: "JOHN DOE",
    category: "VIP",
    seatNumber: "34",
    gate: "GATE 3",
    bookingCode: "123456789",
    gateOpen: scheduleData.find(s => s.title.includes("Gate"))?.time || "15:00",
    showTime: "8 PM", // hardcoded to match the visual reference for demo
  };

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(ticketRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `DekoTix_${ticketInfo.bookingCode}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to download ticket:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[150px] opacity-60 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[150px] opacity-60 mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <TicketIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">You're All Set!</h1>
          <p className="text-muted-foreground text-sm">Your official E-Ticket has been generated.</p>
        </motion.div>

        {/* Ticket Container - Matching the Reference Image */}
        <motion.div
          ref={ticketRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.3 }}
          className="w-full relative shadow-2xl flex flex-col md:flex-row rounded-[2rem] overflow-hidden text-white"
          style={{
            background: "linear-gradient(135deg, #7c2275 0%, #3e1666 40%, #151a5a 100%)"
          }}
        >
          {/* Abstract background circles */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[20%] w-[40%] h-[60%] rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />
          <div className="absolute top-[10%] right-[5%] w-[30%] h-[40%] rounded-full bg-fuchsia-400/10 blur-3xl pointer-events-none" />

          {/* Left Side: Ticket Details */}
          <div className="flex-[3] p-8 md:p-12 relative z-10 flex flex-col justify-between min-h-[340px]">
            
            {/* Top Area */}
            <div className="flex flex-col gap-4 mt-2">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide text-white drop-shadow-md">
                MUSIC FESTIVAL
              </h2>
              
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-xl md:text-2xl font-bold tracking-widest">
                  21 DECEMBER | 8 PM
                </span>
                <span className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-wider">
                  47 W 13TH ST, NEW YORK, NY 10011, USA
                </span>
              </div>
            </div>

            {/* Bottom Info Pills */}
            <div className="flex flex-wrap gap-4 mt-12">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold text-fuchsia-400 uppercase tracking-widest pl-2">Name</span>
                <div className="bg-[#1a0b38]/60 backdrop-blur-sm border border-white/5 rounded-xl px-5 py-2.5 min-w-[120px]">
                  <span className="font-bold text-sm md:text-base">{ticketInfo.userName}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold text-fuchsia-400 uppercase tracking-widest pl-2">Zone</span>
                <div className="bg-[#1a0b38]/60 backdrop-blur-sm border border-white/5 rounded-xl px-5 py-2.5 min-w-[100px]">
                  <span className="font-bold text-sm md:text-base uppercase">GOLD</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold text-fuchsia-400 uppercase tracking-widest pl-2">Seat</span>
                <div className="bg-[#1a0b38]/60 backdrop-blur-sm border border-white/5 rounded-xl px-5 py-2.5 min-w-[80px]">
                  <span className="font-bold text-sm md:text-base">{ticketInfo.seatNumber}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold text-fuchsia-400 uppercase tracking-widest pl-2">Booking ID</span>
                <div className="bg-[#1a0b38]/60 backdrop-blur-sm border border-white/5 rounded-xl px-5 py-2.5 min-w-[140px]">
                  <span className="font-bold text-sm md:text-base">{ticketInfo.bookingCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider with Cutouts */}
          <div className="relative flex-none w-8 flex flex-col justify-between items-center py-0 hidden md:flex z-20">
            <div className="w-8 h-8 rounded-full bg-background -mt-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" />
            <div className="w-0 h-full border-dashed border-l-2 border-white/30 my-2" />
            <div className="w-8 h-8 rounded-full bg-background -mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Mobile Divider (Horizontal) */}
          <div className="relative w-full h-8 flex justify-between items-center px-0 md:hidden z-20">
            <div className="w-8 h-8 rounded-full bg-background -ml-4 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)]" />
            <div className="h-0 w-full border-dashed border-t-2 border-white/30 mx-2" />
            <div className="w-8 h-8 rounded-full bg-background -mr-4 shadow-[inset_2px_0_4px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Right Side: QR Code / Rotated Text */}
          <div className="flex-1 p-8 relative z-10 flex flex-col items-center justify-center min-h-[340px]">
            <div className="bg-white p-3 rounded-xl shadow-2xl mb-6 w-32 h-32 flex items-center justify-center">
              <QrCode className="w-full h-full text-black" strokeWidth={1.5} />
            </div>
            
            <div className="flex flex-col items-center text-center">
              <span className="text-xl font-bold tracking-widest uppercase">
                DEKOTIX
              </span>
              <span className="text-[10px] font-semibold text-cyan-400 tracking-widest uppercase mt-1">
                E-TICKET
              </span>
            </div>
          </div>
          
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto"
        >
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="h-12 px-8 shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            {isDownloading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Save Ticket
              </span>
            )}
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="h-12 px-8 bg-background/50 backdrop-blur-sm border-white/10 hover:bg-white/5 w-full sm:w-auto">
              Home
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
