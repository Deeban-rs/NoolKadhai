import { useState } from "react";
import { Search, Eye, X } from "lucide-react";
const ALL_STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Ready",
  "Delivered",
  "Cancelled",
];
export const AdminOrders = ({ orders, onUpdateOrderStatus }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
    return matchStatus && matchSearch;
  });
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Order Fulfillment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Orders & Shipments
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Track customer orders, manage atelier production stages, and update
            dispatch status.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFF8ED] p-4 border border-[#D8BFA0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#765C4D]"
          />
          <input
            type="text"
            placeholder="Search by order ID, client name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F6E9D5]/50 border border-[#D8BFA0] pl-9 pr-3 py-1.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border ${statusFilter === "All" ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
          >
            All ({orders.length})
          </button>
          {ALL_STATUSES.map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border whitespace-nowrap ${statusFilter === st ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFF8ED] border border-[#D8BFA0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#D8BFA0] bg-[#F6E9D5]/60 text-[#765C4D] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Client Info</th>
              <th className="py-3 px-4 font-medium">Items Count</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Payment</th>
              <th className="py-3 px-4 font-medium">Status Progression</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8BFA0]/40">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#F6E9D5]/30 transition-colors"
              >
                <td className="py-3 px-4 font-mono font-medium text-[#5A171B]">
                  {order.id}
                </td>
                <td className="py-3 px-4 text-[#765C4D]">{order.date}</td>
                <td className="py-3 px-4">
                  <p className="font-medium text-[#4A1719]">
                    {order.customerName}
                  </p>
                  <p className="text-[10px] text-[#765C4D]">
                    {order.customerPhone}
                  </p>
                </td>
                <td className="py-3 px-4 text-[#765C4D]">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "piece" : "pieces"}
                </td>
                <td className="py-3 px-4 font-serif text-sm font-medium text-[#5A171B]">
                  {order.totalAmount}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-xs ${order.paymentStatus === "Paid" ? "bg-[#123C36]/10 text-[#123C36]" : "bg-[#B47A24]/10 text-[#B47A24]"}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onUpdateOrderStatus(order.id, e.target.value)
                    }
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 border rounded-xs ${order.status === "Delivered" ? "bg-[#123C36]/10 text-[#123C36] border-[#123C36]/30" : order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" : "bg-[#B47A24]/10 text-[#B47A24] border-[#B47A24]/30"}`}
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-1.5 text-[#5A171B] hover:text-[#B47A24] transition-colors inline-flex items-center gap-1"
                    title="View Full Order & Items"
                  >
                    <Eye size={14} />
                    <span className="text-[11px] underline">Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1719]/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 text-[#765C4D] hover:text-[#5A171B] border border-[#D8BFA0] rounded-full"
            >
              <X size={16} />
            </button>

            <div className="border-b border-[#D8BFA0]/40 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#5A171B]">
                  Order {selectedOrder.id}
                </h3>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 border ${selectedOrder.status === "Delivered" ? "bg-[#123C36]/10 text-[#123C36] border-[#123C36]/30" : "bg-[#B47A24]/10 text-[#B47A24] border-[#B47A24]/30"}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-xs text-[#765C4D] mt-1">
                Placed on {selectedOrder.date}
              </p>
            </div>

            {/* Customer Details */}
            <div className="bg-[#F6E9D5]/40 p-4 border border-[#D8BFA0] mb-5 space-y-1.5 text-xs">
              <p className="text-[10px] uppercase tracking-wider text-[#B47A24] font-semibold">
                Client & Dispatch Information
              </p>
              <p>
                <strong className="text-[#5A171B]">Name:</strong>{" "}
                {selectedOrder.customerName}
              </p>
              <p>
                <strong className="text-[#5A171B]">Phone:</strong>{" "}
                {selectedOrder.customerPhone}
              </p>
              <p>
                <strong className="text-[#5A171B]">Email:</strong>{" "}
                {selectedOrder.customerEmail}
              </p>
              <p>
                <strong className="text-[#5A171B]">Delivery Address:</strong>{" "}
                {selectedOrder.shippingAddress}
              </p>
              <p>
                <strong className="text-[#5A171B]">Payment:</strong>{" "}
                {selectedOrder.paymentStatus}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-[#765C4D] font-semibold">
                Items ({selectedOrder.items.length})
              </p>
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-[#FFF8ED] border border-[#D8BFA0]/50"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-14 object-cover border border-[#D8BFA0]/60 shrink-0"
                  />
                  <div className="flex-1">
                    <h5 className="font-serif text-sm font-medium text-[#5A171B]">
                      {item.productName}
                    </h5>
                    <p className="text-[11px] text-[#765C4D]">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-serif text-sm font-medium text-[#5A171B]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-[#D8BFA0]/40 pt-4 flex items-center justify-between font-serif text-lg text-[#5A171B]">
              <span>Grand Total:</span>
              <span>{selectedOrder.totalAmount}</span>
            </div>

            {/* Quick status change inside modal */}
            <div className="mt-6 pt-4 border-t border-[#D8BFA0]/40 flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#765C4D] font-medium">
                Update Status:
              </label>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  onUpdateOrderStatus(selectedOrder.id, newStatus);
                  setSelectedOrder({ ...selectedOrder, status: newStatus });
                }}
                className="bg-[#F6E9D5] border border-[#D8BFA0] px-3 py-1.5 text-xs text-[#4A1719]"
              >
                {ALL_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
