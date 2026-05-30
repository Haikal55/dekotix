"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Ticket, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Event Info", href: "/#overview" },
  { name: "Tickets", href: "/#tickets" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Ticket className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold text-xl tracking-tight">DEKO<span className="text-primary">TIX</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard" className="hidden lg:inline-flex">
                <Button variant="ghost" className="text-sm font-medium gap-2">
                  <UserCircle className="w-5 h-5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" className="hidden lg:inline-flex">
                <Button variant="ghost" className="text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/buy-tickets">
              <Button>Buy Tickets</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2 border-t border-border">
                {session ? (
                  <Link href="/dashboard" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <UserCircle className="w-5 h-5" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                )}
                <Link href="/buy-tickets" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Buy Tickets</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
