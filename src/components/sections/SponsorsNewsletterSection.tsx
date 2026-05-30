"use client";

import { motion } from "framer-motion";
import { sponsorsData } from "@/data/event";
import { Button } from "@/components/ui/button";

export default function SponsorsNewsletterSection() {
  return (
    <section className="py-24 bg-card/50 border-t border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Sponsors */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Supported By</span>
            <h3 className="text-2xl md:text-3xl font-bold">Official Partners & Sponsors</h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {sponsorsData.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-32 md:w-48 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center"
              >
                {/* We use an img tag with SVG logos for crisp rendering */}
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-w-full max-h-full object-contain filter brightness-200 contrast-100"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 to-background rounded-3xl p-1 border border-primary/20 shadow-2xl shadow-primary/10"
        >
          <div className="bg-background/90 backdrop-blur-xl rounded-[23px] p-8 md:p-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Never Miss an Update</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
              Subscribe to our newsletter to receive the latest news, exclusive offers, and early access to future events.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-grow h-12 px-4 rounded-lg bg-card border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
              />
              <Button type="submit" size="lg" className="h-12 px-8">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
