import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="#home" className="flex items-center gap-2 mb-4 group">
              <Ticket className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl tracking-tight">DEKO<span className="text-primary">TIX</span></span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Your premium destination for the most exclusive live events and concert experiences.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                X
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                IG
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                FB
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                YT
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#overview" className="hover:text-primary transition-colors">Event Info</Link></li>
              <li><Link href="#tickets" className="hover:text-primary transition-colors">Tickets</Link></li>
              <li><Link href="#venue" className="hover:text-primary transition-colors">Venue</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#faq" className="hover:text-primary transition-colors">Help Center / FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Ticket Transfer</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Purchase Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 TixPro Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs">Secure payments powered by</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
              <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-[10px] font-bold">MC</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
