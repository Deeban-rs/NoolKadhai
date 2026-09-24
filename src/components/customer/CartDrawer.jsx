import { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Ornament } from "../common/Ornament";
export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteCheckout,
  onNavigateToOrders,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paid");
  const [completedOrderId, setCompletedOrderId] = useState(null);
  if (!isOpen) return null;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.numericPrice * item.quantity,
    0,
  );
  const formattedSubtotal = `₹${subtotal.toLocaleString("en-IN")}`;
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    const orderId = onCompleteCheckout({
      customerName: name,
      customerEmail:
        email || `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
      customerPhone: phone,
      shippingAddress: address,
      paymentMethod,
    });
    setCompletedOrderId(orderId);
  };
  const handleCloseAll = () => {
    setIsCheckingOut(false);
    setCompletedOrderId(null);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#4A1719]/60 backdrop-blur-xs transition-opacity"
        onClick={handleCloseAll}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8ED] border-l-2 border-[#D8BFA0] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#D8BFA0]/50 flex items-center justify-between bg-[#F6E9D5]/60">
            <div className="flex items-center gap-2 text-[#5A171B]">
              <ShoppingBag size={18} />
              <h3 className="font-serif text-xl tracking-tight font-medium">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-[#765C4D]">
                ({cartItems.length})
              </span>
            </div>
            <button
              onClick={handleCloseAll}
              className="p-1.5 text-[#765C4D] hover:text-[#5A171B] transition-colors rounded-full"
              aria-label="Close bag"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {completedOrderId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-[#123C36] text-[#FFF8ED] rounded-full mx-auto flex items-center justify-center border border-[#B47A24]">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="font-serif text-2xl text-[#5A171B]">
                  Order Placed Successfully!
                </h4>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B47A24] font-semibold">
                  Order ID: {completedOrderId}
                </p>
                <p className="text-xs text-[#765C4D] leading-relaxed">
                  Thank you, <strong className="text-[#5A171B]">{name}</strong>.
                  Your handcrafted piece is queued for tailoring and packaging
                  at our Salem atelier.
                </p>
                <Ornament variant="diamond" className="my-4" />
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleCloseAll();
                      onNavigateToOrders();
                    }}
                    className="w-full bg-[#5A171B] text-[#FFF8ED] py-3 text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    Track in "My Orders"
                  </button>
                  <button
                    onClick={handleCloseAll}
                    className="text-xs text-[#765C4D] hover:text-[#5A171B] py-2 underline"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8BFA0]/40">
                  <h4 className="font-serif text-lg text-[#5A171B]">
                    Delivery & Shipping
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[11px] text-[#B47A24] hover:underline"
                  >
                    ← Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Full Shipping Address *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Door / Flat No, Street, Landmark, City, State, PIN Code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Paid")}
                      className={`p-2.5 border text-center font-medium transition-all ${paymentMethod === "Paid" ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
                    >
                      Prepaid (UPI / Card)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Cash on Delivery")}
                      className={`p-2.5 border text-center font-medium transition-all ${paymentMethod === "Cash on Delivery" ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#123C36] hover:bg-[#0e2c28] text-[#FFF8ED] py-3 text-xs uppercase tracking-[0.2em] font-medium shadow-md transition-colors"
                  >
                    Confirm & Authorize Order ({formattedSubtotal})
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={40} className="mx-auto text-[#D8BFA0]" />
                <h4 className="font-serif text-xl text-[#5A171B]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#765C4D] max-w-xs mx-auto">
                  Explore our handcrafted collections and discover pieces made
                  to be treasured.
                </p>
                <Ornament variant="needle" className="my-4" />
                <button
                  onClick={handleCloseAll}
                  className="bg-[#5A171B] text-[#FFF8ED] px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 bg-[#F6E9D5]/30 border border-[#D8BFA0]/40"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-20 aspect-[3/4] bg-[#EBD8BD] shrink-0 overflow-hidden border border-[#D8BFA0]/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h5 className="font-serif text-sm text-[#5A171B] font-medium leading-snug">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() =>
                              onRemoveItem(item.product.id, item.selectedSize)
                            }
                            className="text-[#765C4D] hover:text-[#5A171B] p-1"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#765C4D]">
                          Size:{" "}
                          <span className="font-medium text-[#5A171B]">
                            {item.selectedSize}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#D8BFA0] bg-[#FFF8ED]">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity - 1,
                              )
                            }
                            className="p-1 hover:bg-[#F6E9D5] text-[#765C4D]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1,
                              )
                            }
                            className="p-1 hover:bg-[#F6E9D5] text-[#765C4D]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-medium text-[#5A171B]">
                          ₹
                          {(
                            item.product.numericPrice * item.quantity
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Button (only if cart has items & not done) */}
          {cartItems.length > 0 && !completedOrderId && !isCheckingOut && (
            <div className="p-6 border-t border-[#D8BFA0]/50 bg-[#F6E9D5]/40 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#765C4D]">
                  <span>Subtotal:</span>
                  <span className="font-serif text-base text-[#5A171B] font-medium">
                    {formattedSubtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#765C4D]">
                  <span>Shipping:</span>
                  <span className="text-[#123C36] font-medium">
                    Complimentary Boutique Delivery
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D8BFA0]/30 flex justify-between font-serif text-lg text-[#5A171B]">
                <span>Estimated Total:</span>
                <span>{formattedSubtotal}</span>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] py-3.5 px-6 uppercase text-xs tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} className="text-[#B47A24]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#765C4D]">
                <ShieldCheck size={12} className="text-[#123C36]" />
                <span>
                  Encrypted checkout & personalized Salem atelier quality check
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
