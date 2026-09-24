import { Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Ornament } from "../common/Ornament";
import { NoolKadhaiLogo } from "../common/NoolKadhaiLogo";
export const Footer = ({ onNavigate, onOpenCustomModal, onSwitchToAdmin }) => {
  return (
    <footer className="bg-[#4A1719] text-[#F6E9D5] pt-16 pb-12 border-t-2 border-[#B47A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header & Tagline */}
        <div className="text-center mb-12 flex flex-col items-center">
          <NoolKadhaiLogo variant="footer" />
          <Ornament variant="needle" className="my-5 opacity-40" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-8 border-y border-[#D8BFA0]/20 text-xs">
          {/* Col 1: About */}
          <div>
            <h4 className="font-serif text-base text-[#FFF8ED] tracking-wide mb-4 font-normal">
              The Salem Atelier
            </h4>
            <p className="text-[#D8BFA0] leading-relaxed font-light mb-4 text-[13px]">
              Handcrafted Indian fashion boutique dedicated to timeless
              silhouettes, bridal zardosi, and precision customized apparel.
            </p>
            <div className="flex items-center gap-2 text-[#B47A24] text-[11px] tracking-widest uppercase">
              <span>Pure Weaves</span> • <span>Heirloom Stitches</span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4 className="font-serif text-base text-[#FFF8ED] tracking-wide mb-4 font-normal">
              Boutique Portfolios
            </h4>
            <ul className="space-y-2.5 text-[#D8BFA0]">
              <li>
                <button
                  onClick={() => onNavigate("collections")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Bridal Blouses & Maggam
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("collections")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Contemporary Western Wear
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomModal}
                  className="hover:text-[#B47A24] transition-colors flex items-center gap-1"
                >
                  <span>Custom Made Bespoke</span>
                  <span className="text-[9px] text-[#B47A24] font-mono">
                    [Inquiry]
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("collections")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Heritage Ethnic Silk Silhouettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("collections")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Festive Soiree Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Concierge */}
          <div>
            <h4 className="font-serif text-base text-[#FFF8ED] tracking-wide mb-4 font-normal">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-[#D8BFA0]">
              <li>
                <button
                  onClick={() => onNavigate("orders")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Track My Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomModal}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Book Fitting Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Craftsmanship & Fabric Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("wishlist")}
                  className="hover:text-[#B47A24] transition-colors"
                >
                  Saved Pieces (Wishlist)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Atelier */}
          <div>
            <h4 className="font-serif text-base text-[#FFF8ED] tracking-wide mb-4 font-normal">
              Connect With Us
            </h4>
            <div className="space-y-3 text-[#D8BFA0]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#B47A24] shrink-0 mt-0.5" />
                <span className="text-[13px] leading-snug">
                  42, Fairlands Cross Road, Salem, Tamil Nadu - 636016
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#B47A24] shrink-0" />
                <span className="text-[13px]">+91 94432 18900</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#B47A24] shrink-0" />
                <span className="text-[13px]">atelier@noolkadhai.com</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Instagram size={15} className="text-[#B47A24] shrink-0" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#FFF8ED] hover:text-[#B47A24] transition-colors"
                >
                  @noolkadhai
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D8BFA0]/70 gap-4">
          <p>
            © {/* @__PURE__ */ new Date().getFullYear()} Nool Kadhai Atelier.
            All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart size={11} className="text-[#B47A24] fill-[#B47A24]" />
            <span>in Salem, Tamil Nadu</span>
          </div>
          {/* Hidden/discreet trigger for boutique owner: triple-click or alt-click on the diamond */}
          <button
            onClick={(e) => {
              if (e.altKey || e.detail >= 3) {
                onSwitchToAdmin();
              }
            }}
            aria-hidden="true"
            tabIndex={-1}
            className="text-[#D8BFA0]/30 hover:text-[#D8BFA0]/50 text-[10px] cursor-default select-none transition-colors"
            title=""
          >
            ❖
          </button>
        </div>
      </div>
    </footer>
  );
};
