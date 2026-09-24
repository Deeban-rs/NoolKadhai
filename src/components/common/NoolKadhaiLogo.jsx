import React from 'react';

/**
 * NoolKadhaiLogo Component
 * Renders the official Nool Kadhai brand logo matching the authentic atelier insignia:
 * - Golden sewing needle angled through the lettering
 * - Emerald green embroidery thread looping gracefully through the needle eye and beneath the script
 * - Rich maroon serif typography for "NOOL"
 * - Authentic Tamil calligraphy for "கதை"
 * - Handcrafted wooden spool wound in emerald green thread at the bottom
 */
export const NoolKadhaiLogo = ({
  variant = 'navbar',
  className = '',
  showTagline = true,
  showCategories = false,
  light = false,
}) => {
  const logoSrc = light ? '/assets/nool-kadhai-logo-light.svg' : '/assets/nool-kadhai-logo.svg';

  // 1. Navigation Bar Variant
  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-2 select-none group cursor-pointer ${className}`}>
        <img
          src={logoSrc}
          alt="NOOL கதை - Dress Your Story"
          className="h-11 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />
        {showTagline && (
          <div className="hidden xl:flex flex-col justify-center border-l border-[#D8BFA0]/60 pl-3 ml-1">
            <span className="text-[9px] uppercase tracking-[0.32em] text-[#B47A24] font-medium whitespace-nowrap">
              Dress Your Story
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#765C4D] font-light whitespace-nowrap">
              Haute Atelier
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. Full Master Emblem Variant (Hero, Showcases)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* The Official Logo Graphic */}
        <div className="relative w-64 sm:w-80 md:w-96 max-w-full">
          <img
            src={logoSrc}
            alt="NOOL கதை - Dress Your Story"
            className="w-full h-auto object-contain drop-shadow-xs"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Tagline: DRESS YOUR STORY with Ornamental Arrows */}
        {showTagline && (
          <div className="mt-2 flex items-center justify-center gap-3 w-full max-w-sm">
            <div className="flex items-center text-[#B47A24]">
              <span className="text-xs">⤅</span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#B47A24]" />
            </div>

            <span className="font-serif uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[#9E6924] font-semibold text-xs sm:text-sm whitespace-nowrap">
              Dress Your Story
            </span>

            <div className="flex items-center text-[#B47A24]">
              <span className="h-[1px] w-6 sm:w-10 bg-[#B47A24]" />
              <span className="text-xs">⬸</span>
            </div>
          </div>
        )}

        {/* Central Diamond Ornament Divider */}
        <div className="my-2.5 flex items-center justify-center gap-2 w-48 sm:w-56">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B47A24]/60" />
          <div className="flex items-center gap-1 text-[#B47A24]">
            <span className="w-1 h-1 rounded-full bg-[#B47A24]" />
            <span className="text-[10px]">❖</span>
            <span className="w-1 h-1 rounded-full bg-[#B47A24]" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B47A24]/60" />
        </div>

        {/* The Three Core Pillars from the Logo */}
        {showCategories && (
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#1D3D34] font-medium flex items-center justify-center gap-3 mt-0.5">
            <span>Bridal Blouse</span>
            <span className="text-[#B47A24]">•</span>
            <span>Western Wear</span>
            <span className="text-[#B47A24]">•</span>
            <span>Custom Made</span>
          </div>
        )}
      </div>
    );
  }

  // 3. Footer Variant (Tuned for Dark Burgundy Background)
  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Light Variant of the Official Logo */}
        <div className="relative w-56 sm:w-68 max-w-full mb-3">
          <img
            src="/assets/nool-kadhai-logo-light.svg"
            alt="NOOL கதை"
            className="w-full h-auto object-contain drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Tagline */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#B47A24] font-medium mb-1">
          Dress Your Story
        </p>

        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#D8BFA0]/80 font-light flex items-center gap-2 mt-2">
          <span>Bridal Blouse</span>
          <span className="text-[#B47A24]">•</span>
          <span>Western Wear</span>
          <span className="text-[#B47A24]">•</span>
          <span>Custom Made</span>
        </div>
      </div>
    );
  }

  // 4. Atelier Card Variant (Used in About Section)
  if (variant === 'card') {
    return (
      <div
        className={`relative bg-[#FBF7F0] border border-[#D8BFA0] p-7 sm:p-9 shadow-xl overflow-hidden rounded-xs ${className}`}
      >
        {/* Subtle decorative corner frames */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#B47A24]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#B47A24]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#B47A24]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#B47A24]/60 pointer-events-none" />

        {/* Top subtle ornament divider */}
        <div className="flex items-center justify-center gap-2 mb-3 opacity-75">
          <div className="h-[0.5px] w-14 bg-[#B47A24]" />
          <span className="text-[9px] text-[#B47A24]">❖</span>
          <div className="h-[0.5px] w-14 bg-[#B47A24]" />
        </div>

        {/* The Full Master Logo inside the Card */}
        <NoolKadhaiLogo
          variant="full"
          showTagline={true}
          showCategories={true}
        />

        {/* Social Signature at bottom */}
        <div className="mt-5 pt-4 border-t border-[#D8BFA0]/40 flex flex-col items-center justify-center text-center">
          <a
            href="https://instagram.com/noolkadhai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#5A171B] hover:text-[#B47A24] transition-colors font-medium tracking-wider"
          >
            <span className="w-4 h-4 rounded-full border border-[#5A171B] flex items-center justify-center text-[9px] font-bold">
              ◎
            </span>
            <span>@noolkadhai</span>
          </a>
          <div className="flex items-center gap-1 text-[#B47A24]/70 text-[9px] mt-1">
            <span>—</span>
            <span>❖</span>
            <span>—</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Compact Icon / Mark Variant (Hero Floating Seal, Admin Sidebar)
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Nool Kadhai Mark"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
