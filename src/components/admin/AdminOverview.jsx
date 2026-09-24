import {
  Package,
  Scissors,
  MessageSquare,
  TrendingUp,
  Check,
  AlertCircle,
} from "lucide-react";
export const AdminOverview = ({
  products,
  orders,
  customRequests,
  reviews,
  onUpdateOrderStatus,
  onApproveReview,
  onNavigateTab,
  onSelectCustomRequest,
}) => {
  const pendingOrders = orders.filter(
    (o) =>
      o.status === "Processing" ||
      o.status === "Pending" ||
      o.status === "Confirmed",
  );
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.numericTotal || 0),
    0,
  );
  const pendingRequests = customRequests.filter(
    (r) => r.status === "Pending" || r.status === "Reviewing",
  );
  const pendingReviews = reviews.filter((r) => r.status === "pending");
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Executive Summary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Atelier Dashboard
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Real-time status of orders, inventory, custom requests, and
            testimonials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab("custom-requests")}
            className="bg-[#5A171B] text-[#FFF8ED] hover:bg-[#4A1719] px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-colors"
          >
            Review Custom Inquiries ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="bg-[#FFF8ED] border border-[#D8BFA0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D] font-medium">
              Total Sales Volume
            </span>
            <div className="w-8 h-8 rounded-full bg-[#123C36]/10 text-[#123C36] flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-3xl text-[#5A171B] font-medium">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h3>
            <p className="text-[11px] text-[#765C4D] mt-1">
              Across {orders.length} client orders
            </p>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="bg-[#FFF8ED] border border-[#D8BFA0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D] font-medium">
              Orders In Production
            </span>
            <div className="w-8 h-8 rounded-full bg-[#B47A24]/10 text-[#B47A24] flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-3xl text-[#5A171B] font-medium">
              {pendingOrders.length}
            </h3>
            <p className="text-[11px] text-[#765C4D] mt-1">
              {orders.filter((o) => o.status === "Delivered").length} orders
              completed
            </p>
          </div>
        </div>

        {/* Card 3: Custom Requests */}
        <div className="bg-[#FFF8ED] border border-[#D8BFA0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D] font-medium">
              Custom Requests
            </span>
            <div className="w-8 h-8 rounded-full bg-[#5A171B]/10 text-[#5A171B] flex items-center justify-center">
              <Scissors size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-3xl text-[#5A171B] font-medium">
              {pendingRequests.length}
            </h3>
            <p className="text-[11px] text-[#765C4D] mt-1">
              {customRequests.length} total bespoke inquiries
            </p>
          </div>
        </div>

        {/* Card 4: Reviews Moderation */}
        <div className="bg-[#FFF8ED] border border-[#D8BFA0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#765C4D] font-medium">
              Pending Reviews
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${pendingReviews.length > 0 ? "bg-[#B47A24] text-[#FFF8ED]" : "bg-[#EBD8BD] text-[#765C4D]"}`}
            >
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif text-3xl text-[#5A171B] font-medium">
                {pendingReviews.length}
              </h3>
              {pendingReviews.length > 0 && (
                <span className="text-[10px] uppercase tracking-wider text-[#B47A24] font-semibold">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#765C4D] mt-1">
              {reviews.filter((r) => r.status === "approved").length} published
              testimonials
            </p>
          </div>
        </div>
      </div>

      {/* Pending Reviews Moderation Quick Alert (if any) */}
      {pendingReviews.length > 0 && (
        <div className="bg-[#FFF8ED] border-2 border-[#B47A24] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#5A171B]">
              <AlertCircle size={18} className="text-[#B47A24]" />
              <h3 className="font-serif text-lg font-medium">
                Pending Customer Testimonials Awaiting Approval (
                {pendingReviews.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("reviews")}
              className="text-xs text-[#B47A24] hover:underline uppercase tracking-wider font-semibold"
            >
              Go to Moderation Queue →
            </button>
          </div>
          <p className="text-xs text-[#765C4D] mb-4">
            Customer reviews remain private until approved here. Click "Approve
            & Publish" to feature them on the boutique homepage.
          </p>
          <div className="space-y-3">
            {pendingReviews.slice(0, 2).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F6E9D5]/40 border border-[#D8BFA0] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-medium text-[#5A171B]">
                      {rev.customerName}
                    </span>
                    <span className="text-[10px] text-[#B47A24] font-semibold">
                      ★ {rev.rating}/5
                    </span>
                    {rev.occasion && (
                      <span className="text-[10px] text-[#765C4D]">
                        ({rev.occasion})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4A1719] italic mt-1 font-light">
                    "{rev.review}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onApproveReview(rev.id)}
                    className="bg-[#123C36] hover:bg-[#0e2c28] text-[#FFF8ED] px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center gap-1"
                  >
                    <Check size={12} />
                    <span>Approve & Publish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Columns: Recent Orders & Recent Custom Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Orders */}
        <div className="lg:col-span-7 bg-[#FFF8ED] border border-[#D8BFA0] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8BFA0]/40 mb-4">
            <h3 className="font-serif text-xl text-[#5A171B]">
              Recent Client Orders
            </h3>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs text-[#B47A24] hover:underline uppercase tracking-wider font-semibold"
            >
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D8BFA0]/40 text-[#765C4D] uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-medium">Order ID</th>
                  <th className="py-2.5 font-medium">Client</th>
                  <th className="py-2.5 font-medium">Amount</th>
                  <th className="py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8BFA0]/30">
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#F6E9D5]/30 transition-colors"
                  >
                    <td className="py-3 font-mono font-medium text-[#5A171B]">
                      {order.id}
                    </td>
                    <td className="py-3 text-[#4A1719] font-medium">
                      {order.customerName}
                    </td>
                    <td className="py-3 font-serif text-sm font-medium text-[#5A171B]">
                      {order.totalAmount}
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(order.id, e.target.value)
                        }
                        className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 border rounded-xs ${order.status === "Delivered" ? "bg-[#123C36]/10 text-[#123C36] border-[#123C36]/30" : "bg-[#B47A24]/10 text-[#B47A24] border-[#B47A24]/30"}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Custom Made Inquiries */}
        <div className="lg:col-span-5 bg-[#FFF8ED] border border-[#D8BFA0] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8BFA0]/40 mb-4">
            <h3 className="font-serif text-xl text-[#5A171B]">
              Custom Inquiries
            </h3>
            <button
              onClick={() => onNavigateTab("custom-requests")}
              className="text-xs text-[#B47A24] hover:underline uppercase tracking-wider font-semibold"
            >
              All Requests →
            </button>
          </div>

          <div className="space-y-3">
            {customRequests.slice(0, 4).map((req) => (
              <div
                key={req.id}
                onClick={() => onSelectCustomRequest(req)}
                className="p-3 bg-[#F6E9D5]/30 border border-[#D8BFA0]/50 hover:border-[#B47A24] cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#5A171B]">
                      {req.name}
                    </h4>
                    <p className="text-[10px] text-[#B47A24] uppercase tracking-wider font-semibold">
                      {req.dressType}
                    </p>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#5A171B] text-[#FFF8ED]">
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-[#765C4D] line-clamp-1 mt-1 font-light italic">
                  "{req.customerMessage}"
                </p>
                <div className="mt-2 text-[10px] text-[#765C4D] flex justify-between">
                  <span>Occasion: {req.occasion}</span>
                  <span className="text-[#5A171B] font-medium font-mono">
                    {req.requestedDate.split(",")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
