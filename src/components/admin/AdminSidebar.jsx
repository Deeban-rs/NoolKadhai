import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Scissors,
  MessageSquare,
  Users,
  Store,
} from "lucide-react";
import { NoolKadhaiLogo } from "../common/NoolKadhaiLogo";
export const AdminSidebar = ({
  currentTab,
  setCurrentTab,
  pendingReviewsCount,
  pendingCustomRequestsCount,
  onSwitchToCustomer,
}) => {
  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "products", label: "Products & Inventory", icon: ShoppingBag },
    { id: "orders", label: "Orders & Fulfillment", icon: Package },
    {
      id: "custom-requests",
      label: "Custom Made Requests",
      icon: Scissors,
      badge:
        pendingCustomRequestsCount > 0 ? pendingCustomRequestsCount : void 0,
    },
    {
      id: "reviews",
      label: "Review Moderation",
      icon: MessageSquare,
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : void 0,
      badgeColor: "bg-[#B47A24]",
    },
    { id: "customers", label: "Clients & Patrons", icon: Users },
  ];
  return (
    <aside className="w-64 bg-[#4A1719] text-[#F6E9D5] flex flex-col justify-between border-r border-[#D8BFA0]/30 shrink-0 min-h-screen">
      {/* Brand & Atelier Badge */}
      <div>
        <div className="p-6 border-b border-[#D8BFA0]/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B47A24] animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
              Atelier Management
            </span>
          </div>
          <div className="flex items-center gap-3">
            <NoolKadhaiLogo variant="mark" light={true} className="w-9 h-9 flex-shrink-0" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold text-[#FFF8ED]">
                  NOOL
                </span>
                <span
                  className="text-base font-bold text-[#FFF8ED]"
                  style={{ fontFamily: '"Noto Serif Tamil", serif' }}
                >
                  கதை
                </span>
              </div>
              <p className="text-[9px] text-[#D8BFA0]/80 font-mono">
                Owner Portal • Salem HQ
              </p>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-sm transition-colors ${isActive ? "bg-[#5A171B] text-[#FFF8ED] border-l-3 border-[#B47A24] shadow-xs" : "text-[#D8BFA0] hover:text-[#FFF8ED] hover:bg-[#5A171B]/50"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={16}
                    className={
                      isActive ? "text-[#B47A24]" : "text-[#D8BFA0]/70"
                    }
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== void 0 && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold text-[#FFF8ED] ${item.badgeColor || "bg-[#123C36]"}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Switch to Storefront Button */}
      <div className="p-4 border-t border-[#D8BFA0]/20 space-y-2">
        <div className="bg-[#5A171B]/60 p-3 rounded-sm border border-[#D8BFA0]/20 text-[11px] text-[#D8BFA0]">
          <p className="font-serif text-[#FFF8ED] text-xs">
            Live Storefront Sync
          </p>
          <p className="text-[10px] mt-0.5 text-[#D8BFA0]/70">
            Changes to orders, custom requests & approved reviews reflect
            immediately.
          </p>
        </div>

        <button
          onClick={onSwitchToCustomer}
          className="w-full flex items-center justify-center gap-2 bg-[#FFF8ED] text-[#4A1719] hover:bg-[#F6E9D5] py-2.5 px-3 text-xs uppercase tracking-[0.15em] font-semibold transition-colors rounded-sm shadow-sm"
        >
          <Store size={14} className="text-[#5A171B]" />
          <span>View Boutique Store</span>
        </button>
      </div>
    </aside>
  );
};
