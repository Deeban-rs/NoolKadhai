import { useState } from "react";
import { ShoppingBag, Heart, Menu, X, Scissors } from "lucide-react";
import { NoolKadhaiLogo } from "../common/NoolKadhaiLogo";
export const Navbar = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  cartCount,
  onOpenCart,
  onSwitchToAdmin,
  onOpenCustomModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "custom", label: "Made For You", onClick: onOpenCustomModal },
    { id: "about", label: "Our Story" },
    { id: "orders", label: "My Orders" },
  ];
  const handleNavClick = (link) => {
    if (link.onClick) {
      link.onClick();
    } else {
      setActiveTab(link.id);
    }
    setMobileMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 bg-[#F6E9D5]/95 backdrop-blur-md border-b border-[#D8BFA0]/50 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5A171B] hover:text-[#B47A24] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Brand Logo */}
          <div onClick={() => setActiveTab("home")}>
            <NoolKadhaiLogo variant="navbar" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.25em] font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id && link.id !== "custom";
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`relative py-1 transition-colors group ${isActive ? "text-[#5A171B] font-semibold" : "text-[#765C4D] hover:text-[#5A171B]"}`}
                >
                  <span className="flex items-center gap-1">
                    {link.id === "custom" && (
                      <Scissors size={12} className="text-[#B47A24]" />
                    )}
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#B47A24] transform transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Wishlist, Cart, Owner Portal Switch */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[#5A171B]">
            {/* Wishlist */}
            <button
              onClick={() => setActiveTab("wishlist")}
              className="relative p-1.5 hover:text-[#B47A24] transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className={wishlistCount > 0 ? "fill-[#5A171B]" : ""}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#B47A24] text-[#FFF8ED] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 hover:text-[#B47A24] transition-colors"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#5A171B] text-[#F6E9D5] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D8BFA0]/40 bg-[#F6E9D5] px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-left text-sm uppercase tracking-[0.2em] font-medium py-2 text-[#4A1719] hover:text-[#B47A24] border-b border-[#D8BFA0]/20 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.id === "custom" && (
                  <Scissors size={14} className="text-[#B47A24]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
