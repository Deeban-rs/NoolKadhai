import { useState } from "react";
import { CheckCircle2, AlertCircle, ShoppingBag } from "lucide-react";
import { DecorativeHeader } from "../common/DecorativeHeader";
const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Processing",
  "Ready",
  "Delivered",
];
export const OrdersPage = ({ orders, onExploreCollections }) => {
  const [filter, setFilter] = useState("All");
  const filteredOrders = orders.filter(
    (ord) => filter === "All" || ord.status === filter,
  );
  const getStepProgress = (status) => {
    if (status === "Cancelled") return -1;
    return STATUS_STEPS.indexOf(status);
  };
  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <DecorativeHeader
        tagline="Client Concierge"
        title="My Orders & Delivery Tracking"
        subtitle="Follow the progress of your handcrafted pieces from Salem atelier cutting to doorstep delivery."
        ornamentVariant="needle"
      />

      {/* Filter Chips */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        {["All", "Processing", "Ready", "Delivered"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] font-medium border transition-all ${filter === st ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "bg-[#FFF8ED] text-[#765C4D] border-[#D8BFA0]/60 hover:border-[#B47A24]"}`}
          >
            {st}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-[#FFF8ED] border border-[#D8BFA0]/40 p-8">
          <ShoppingBag size={36} className="mx-auto text-[#D8BFA0] mb-3" />
          <h3 className="font-serif text-2xl text-[#5A171B]">
            No Orders Found
          </h3>
          <p className="text-xs text-[#765C4D] mt-2 mb-6">
            When you purchase a handcrafted piece, you can track every stage of
            its making here.
          </p>
          <button
            onClick={onExploreCollections}
            className="bg-[#5A171B] text-[#FFF8ED] px-7 py-3 text-xs uppercase tracking-[0.2em]"
          >
            Explore Boutique Collections
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredOrders.map((order) => {
            const currentStepIdx = getStepProgress(order.status);
            return (
              <div
                key={order.id}
                className="bg-[#FFF8ED] border border-[#D8BFA0] shadow-sm p-6 sm:p-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8BFA0]/40 gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl text-[#5A171B] font-medium">
                        {order.id}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 border ${order.status === "Delivered" ? "bg-[#123C36]/10 text-[#123C36] border-[#123C36]/30" : order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" : "bg-[#B47A24]/10 text-[#B47A24] border-[#B47A24]/30"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#765C4D] mt-1">
                      Placed on{" "}
                      <span className="font-medium">{order.date}</span> •
                      Recipient: {order.customerName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D]">
                      Total Amount
                    </p>
                    <p className="font-serif text-2xl text-[#5A171B] font-medium">
                      {order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Progress Tracker (if not cancelled) */}
                {order.status !== "Cancelled" ? (
                  <div className="py-6 border-b border-[#D8BFA0]/30">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold mb-4">
                      Atelier Progress & Shipping Status
                    </p>

                    <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center relative">
                      {STATUS_STEPS.map((step, idx) => {
                        const isCompleted = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                          <div
                            key={step}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-2 transition-all ${isCompleted ? "bg-[#123C36] text-[#FFF8ED]" : "bg-[#EBD8BD]/60 text-[#765C4D] border border-[#D8BFA0]"} ${isCurrent ? "ring-2 ring-[#B47A24] ring-offset-2" : ""}`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 size={15} />
                              ) : (
                                idx + 1
                              )}
                            </div>
                            <span
                              className={`text-[9px] sm:text-[10px] uppercase tracking-wider ${isCompleted ? "text-[#5A171B] font-semibold" : "text-[#765C4D]/60"}`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>
                      This order was cancelled. Please contact the concierge for
                      assistance.
                    </span>
                  </div>
                )}

                {/* Items in Order */}
                <div className="pt-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D] mb-3">
                    Items ({order.items.length})
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-[#F6E9D5]/30 p-3 border border-[#D8BFA0]/30"
                      >
                        <div className="w-14 h-16 bg-[#EBD8BD] overflow-hidden shrink-0 border border-[#D8BFA0]/50">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base text-[#5A171B] leading-snug">
                            {item.productName}
                          </h4>
                          <p className="text-[11px] text-[#765C4D]">
                            Size:{" "}
                            <span className="font-medium text-[#5A171B]">
                              {item.size}
                            </span>{" "}
                            • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-serif text-base text-[#5A171B] font-medium">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping info */}
                <div className="mt-4 pt-4 border-t border-[#D8BFA0]/30 flex flex-col sm:flex-row justify-between text-xs text-[#765C4D] gap-2">
                  <div>
                    <span className="font-medium text-[#5A171B]">
                      Dispatch Address:{" "}
                    </span>
                    <span>{order.shippingAddress}</span>
                  </div>
                  <div className="font-serif italic text-[#B47A24]">
                    Payment: {order.paymentStatus}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
