const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Product = require("../models/Product");
const protect = require("../middleware/auth");

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (!product.isVisible) {
        return res.status(400).json({
          message: `${product.name} is not available`,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: `Invalid quantity for ${product.name}`,
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Only ${product.stock} item(s) available for ${product.name}`,
        });
      }

      const itemPrice = product.numericPrice;
      const itemTotal = itemPrice * quantity;

      orderItems.push({
        product: product._id,
        productCode: product.productCode,
        name: product.name,
        image: product.image,
        quantity,
        price: itemPrice,
        size: item.size || "",
      });

      subtotal += itemTotal;
    }

    const shippingCharge = subtotal >= 20000 ? 0 : 100;
    const totalAmount = subtotal + shippingCharge;

    const orderNumber = `NK-${Date.now()}`;

    const order = await Order.create({
      orderNumber,
      customer: req.user.userId,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCharge,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: -Number(item.quantity),
        },
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("items.product");

    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// Get logged-in customer's orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get customer orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Get one customer's own order
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user.userId,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});

module.exports = router;