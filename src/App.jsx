import { useState, useEffect } from "react";
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_REQUESTS,
  INITIAL_REVIEWS,
  INITIAL_CUSTOMERS,
} from "./data/mockData";
import { Navbar } from "./components/customer/Navbar";
import { Hero } from "./components/customer/Hero";
import { NewArrivals } from "./components/customer/NewArrivals";
import { CollectionsOverview } from "./components/customer/CollectionsOverview";
import { CustomMadeSection } from "./components/customer/CustomMadeSection";
import { AboutSection } from "./components/customer/AboutSection";
import { CustomerReviews } from "./components/customer/CustomerReviews";
import { Footer } from "./components/customer/Footer";
import { CollectionsPage } from "./components/customer/CollectionsPage";
import { ProductDetailModal } from "./components/customer/ProductDetailModal";
import { CustomizationModal } from "./components/customer/CustomizationModal";
import { CartDrawer } from "./components/customer/CartDrawer";
import { OrdersPage } from "./components/customer/OrdersPage";
import { WishlistPage } from "./components/customer/WishlistPage";
import { AddReviewModal } from "./components/customer/AddReviewModal";
import { NoolKadhaiLogo } from "./components/common/NoolKadhaiLogo";
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminOverview } from "./components/admin/AdminOverview";
import { AdminProducts } from "./components/admin/AdminProducts";
import { AdminOrders } from "./components/admin/AdminOrders";
import { AdminCustomRequests } from "./components/admin/AdminCustomRequests";
import { AdminReviews } from "./components/admin/AdminReviews";
import { AdminCustomers } from "./components/admin/AdminCustomers";
import { Toast } from "./components/common/Toast";
import { Store, Menu, X } from "lucide-react";
export default function App() {
  const [viewMode, setViewMode] = useState("customer");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customRequests, setCustomRequests] = useState(INITIAL_CUSTOM_REQUESTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [customerTab, setCustomerTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState(["NK-PRD-01", "NK-PRD-04"]);
  const [cart, setCart] = useState([
    {
      product: INITIAL_PRODUCTS[0],
      selectedSize: "36",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customPrefillProduct, setCustomPrefillProduct] = useState(null);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [adminTab, setAdminTab] = useState("overview");
  const [selectedCustomRequestForDetail, setSelectedCustomRequestForDetail] =
    useState(null);
  const [adminMobileMenuOpen, setAdminMobileMenuOpen] = useState(false);

  // Discreet Owner / Admin Access for Boutique Staff (Alt+Shift+A or #admin in URL)
  useEffect(() => {
    const handleCheckAdminTrigger = () => {
      if (
        window.location.hash.toLowerCase() === "#admin" ||
        window.location.search.toLowerCase().includes("admin=true")
      ) {
        setViewMode("admin");
      }
    };
    handleCheckAdminTrigger();
    window.addEventListener("hashchange", handleCheckAdminTrigger);

    const handleKeyDown = (e) => {
      // Alt + Shift + A or Ctrl + Alt + A to toggle Owner Admin Portal
      if ((e.altKey && e.shiftKey && (e.key === "A" || e.key === "a")) || (e.ctrlKey && e.altKey && (e.key === "A" || e.key === "a"))) {
        e.preventDefault();
        setViewMode((prev) => (prev === "admin" ? "customer" : "admin"));
        showToast("Switched portal mode (Owner Access)");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", handleCheckAdminTrigger);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigateToCustomerTab = (tab) => {
    setCustomerTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showToast = (msg) => {
    setToastMessage(msg);
  };
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Piece removed from saved items");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Piece saved to your boutique wishlist");
        return [...prev, productId];
      }
    });
  };
  const handleAddToCart = (product, size) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size,
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (Size ${size}) to shopping bag`);
  };
  const handleUpdateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };
  const handleRemoveCartItem = (productId, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size),
      ),
    );
  };
  const handleCompleteCheckout = (orderData) => {
    const newOrderId = `NK-ORD-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const totalNumeric = cart.reduce(
      (sum, item) => sum + item.product.numericPrice * item.quantity,
      0,
    );
    const newOrder = {
      id: newOrderId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        size: c.selectedSize,
        quantity: c.quantity,
        price: c.product.price,
        image: c.product.image,
      })),
      totalAmount: `₹${totalNumeric.toLocaleString("en-IN")}`,
      numericTotal: totalNumeric,
      date: /* @__PURE__ */ new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      paymentStatus: orderData.paymentMethod,
      status: "Processing",
      shippingAddress: orderData.shippingAddress,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === orderData.customerPhone);
      if (existing) {
        return prev.map((c) =>
          c.phone === orderData.customerPhone
            ? { ...c, ordersCount: c.ordersCount + 1 }
            : c,
        );
      }
      return [
        {
          id: `CUST-0${prev.length + 1}`,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          ordersCount: 1,
          totalSpent: `₹${totalNumeric.toLocaleString("en-IN")}`,
          joinedDate: "Mar 2026",
          status: "New",
        },
        ...prev,
      ];
    });
    setCart([]);
    showToast(
      `Order ${newOrderId} confirmed! Our Salem atelier is preparing your pieces.`,
    );
    return newOrderId;
  };
  const handleOpenCustomWithProduct = (product) => {
    setSelectedProduct(null);
    setCustomPrefillProduct(product);
    setIsCustomModalOpen(true);
  };
  const handleSubmitCustomRequest = (data) => {
    const newId = `NK-CST-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      ...data,
      id: newId,
      requestedDate: `${/* @__PURE__ */ new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}, ${/* @__PURE__ */ new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "Pending",
      internalNotes: "New inquiry submitted by client via boutique website.",
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    showToast(`Bespoke request ${newId} submitted. Master tailor assigned.`);
    return newId;
  };
  const handleSubmitReview = (reviewData) => {
    const newRev = {
      id: `REV-${Math.floor(100 + Math.random() * 900)}`,
      customerName: reviewData.customerName,
      rating: reviewData.rating,
      review: reviewData.review,
      date: /* @__PURE__ */ new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "pending",
      // REQUIRED: Held for owner moderation
      occasion: reviewData.occasion,
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast("Your testimonial has been submitted for atelier verification.");
  };
  const handleUpdateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };
  const handleUpdateCustomRequestStatus = (requestId, status) => {
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r)),
    );
    showToast(`Bespoke request ${requestId} marked as ${status}`);
  };
  const handleSaveInternalNotes = (requestId, notes) => {
    setCustomRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, internalNotes: notes } : r,
      ),
    );
    showToast("Atelier internal notes saved.");
  };
  const handleApproveReview = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "approved" } : r)),
    );
    showToast("Review approved! It is now live on the boutique storefront.");
  };
  const handleRejectReview = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "rejected" } : r)),
    );
    showToast("Review marked as rejected.");
  };
  const handleDeleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showToast("Review deleted from records.");
  };
  const handleAddProduct = (prod) => {
    const newId = `NK-PRD-${Math.floor(10 + Math.random() * 90)}`;
    setProducts((prev) => [{ ...prod, id: newId }, ...prev]);
    showToast(`Added new piece "${prod.name}" to catalog.`);
  };
  const handleUpdateProduct = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" specifications.`);
  };
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast("Product removed from catalog.");
  };
  const handleToggleVisibility = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isVisible: !p.isVisible } : p,
      ),
    );
    const prod = products.find((p) => p.id === productId);
    showToast(`Toggled visibility for ${prod?.name}`);
  };
  const handleSelectCategoryFromOverview = (cat) => {
    setSelectedCategory(cat);
    navigateToCustomerTab("collections");
  };
  const pendingReviewsCount = reviews.filter(
    (r) => r.status === "pending",
  ).length;
  const pendingCustomRequestsCount = customRequests.filter(
    (r) => r.status === "Pending" || r.status === "Reviewing",
  ).length;
  return (
    <div className="min-h-screen paper-texture flex flex-col font-sans selection:bg-[#B47A24] selection:text-[#FFF8ED]">
      {/* ========================================================= */}
      {/* 1. CUSTOMER STOREFRONT VIEW                               */}
      {/* ========================================================= */}
      {viewMode === "customer" && (
        <div className="flex-1 flex flex-col">
          {/* Main Navigation */}
          <Navbar
            activeTab={customerTab}
            setActiveTab={navigateToCustomerTab}
            wishlistCount={wishlist.length}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onSwitchToAdmin={() => setViewMode("admin")}
            onOpenCustomModal={() => {
              setCustomPrefillProduct(null);
              setIsCustomModalOpen(true);
            }}
          />

          {/* Main Customer Content Pages */}
          <main className="flex-1">
            {customerTab === "home" && (
              <>
                <Hero
                  onExploreCollection={() => {
                    setSelectedCategory("All");
                    navigateToCustomerTab("collections");
                  }}
                  onCreateYourLook={() => {
                    setCustomPrefillProduct(null);
                    setIsCustomModalOpen(true);
                  }}
                />

                <NewArrivals
                  products={products}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onViewAll={() => {
                    setSelectedCategory("All");
                    navigateToCustomerTab("collections");
                  }}
                />

                <CollectionsOverview
                  onSelectCategory={handleSelectCategoryFromOverview}
                />

                <CustomMadeSection
                  onOpenCustomModal={() => {
                    setCustomPrefillProduct(null);
                    setIsCustomModalOpen(true);
                  }}
                />

                <CustomerReviews
                  reviews={reviews}
                  onOpenAddReview={() => setIsAddReviewOpen(true)}
                />
              </>
            )}

            {customerTab === "collections" && (
              <div className="bg-white min-h-[70vh]">
                <CollectionsPage
                  products={products}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                />
              </div>
            )}

            {customerTab === "about" && (
              <div>
                <AboutSection />
                <CustomMadeSection
                  onOpenCustomModal={() => {
                    setCustomPrefillProduct(null);
                    setIsCustomModalOpen(true);
                  }}
                />
              </div>
            )}

            {customerTab === "orders" && (
              <div className="bg-[#F6E9D5]/40 min-h-[70vh]">
                <OrdersPage
                  orders={orders}
                  onExploreCollections={() => {
                    setSelectedCategory("All");
                    navigateToCustomerTab("collections");
                  }}
                />
              </div>
            )}

            {customerTab === "wishlist" && (
              <div className="bg-white min-h-[70vh]">
                <WishlistPage
                  products={products}
                  wishlistIds={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onExploreCollections={() => {
                    setSelectedCategory("All");
                    navigateToCustomerTab("collections");
                  }}
                />
              </div>
            )}
          </main>

          {/* Customer Footer */}
          <Footer
            onNavigate={navigateToCustomerTab}
            onOpenCustomModal={() => {
              setCustomPrefillProduct(null);
              setIsCustomModalOpen(true);
            }}
            onSwitchToAdmin={() => setViewMode("admin")}
          />

          {/* Modals & Drawers */}
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            isWishlisted={
              selectedProduct ? wishlist.includes(selectedProduct.id) : false
            }
            onToggleWishlist={handleToggleWishlist}
            onOpenCustomWithProduct={handleOpenCustomWithProduct}
          />

          <CustomizationModal
            isOpen={isCustomModalOpen}
            onClose={() => {
              setIsCustomModalOpen(false);
              setCustomPrefillProduct(null);
            }}
            prefilledProduct={customPrefillProduct}
            onSubmitRequest={handleSubmitCustomRequest}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCompleteCheckout={handleCompleteCheckout}
            onNavigateToOrders={() => navigateToCustomerTab("orders")}
          />

          <AddReviewModal
            isOpen={isAddReviewOpen}
            onClose={() => setIsAddReviewOpen(false)}
            onSubmitReview={handleSubmitReview}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. BOUTIQUE OWNER ADMIN DASHBOARD                         */}
      {/* ========================================================= */}
      {viewMode === "admin" && (
        <div className="flex-1 flex flex-col lg:flex-row bg-[#F6E9D5]/30 min-h-screen">
          {/* Mobile Admin Header */}
          <div className="lg:hidden bg-[#4A1719] text-[#FFF8ED] p-3.5 flex items-center justify-between border-b border-[#D8BFA0]/30">
            <div className="flex items-center gap-2.5">
              <NoolKadhaiLogo
                variant="mark"
                light={true}
                className="w-8 h-8 flex-shrink-0"
              />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-lg font-bold">NOOL</span>
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: '"Noto Serif Tamil", serif' }}
                  >
                    கதை
                  </span>
                </div>
                <span className="text-[9px] text-[#B47A24] block uppercase tracking-wider">
                  Owner Portal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("customer")}
                className="text-xs text-[#FFF8ED] bg-[#5A171B] px-3 py-1 border border-[#D8BFA0]/40 flex items-center gap-1"
              >
                <Store size={12} />
                <span>Store</span>
              </button>
              <button
                onClick={() => setAdminMobileMenuOpen(!adminMobileMenuOpen)}
                className="p-1 text-[#FFF8ED]"
              >
                {adminMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Desktop & Responsive Sidebar */}
          <div
            className={`${adminMobileMenuOpen ? "block" : "hidden"} lg:block`}
          >
            <AdminSidebar
              currentTab={adminTab}
              setCurrentTab={(t) => {
                setAdminTab(t);
                setAdminMobileMenuOpen(false);
              }}
              pendingReviewsCount={pendingReviewsCount}
              pendingCustomRequestsCount={pendingCustomRequestsCount}
              onSwitchToCustomer={() => setViewMode("customer")}
            />
          </div>

          {/* Main Admin Workspace */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
            {adminTab === "overview" && (
              <AdminOverview
                products={products}
                orders={orders}
                customRequests={customRequests}
                reviews={reviews}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onApproveReview={handleApproveReview}
                onNavigateTab={(tab) => setAdminTab(tab)}
                onSelectCustomRequest={(req) => {
                  setSelectedCustomRequestForDetail(req);
                  setAdminTab("custom-requests");
                }}
              />
            )}

            {adminTab === "products" && (
              <AdminProducts
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onToggleVisibility={handleToggleVisibility}
              />
            )}

            {adminTab === "orders" && (
              <AdminOrders
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            )}

            {adminTab === "custom-requests" && (
              <AdminCustomRequests
                requests={customRequests}
                onUpdateRequestStatus={handleUpdateCustomRequestStatus}
                onSaveInternalNotes={handleSaveInternalNotes}
                selectedRequestFromOverview={selectedCustomRequestForDetail}
                onClearSelectedFromOverview={() =>
                  setSelectedCustomRequestForDetail(null)
                }
              />
            )}

            {adminTab === "reviews" && (
              <AdminReviews
                reviews={reviews}
                onApproveReview={handleApproveReview}
                onRejectReview={handleRejectReview}
                onDeleteReview={handleDeleteReview}
              />
            )}

            {adminTab === "customers" && (
              <AdminCustomers customers={customers} />
            )}
          </div>
        </div>
      )}

      {/* Boutique Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
