require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    {
    productCode: "NK-PRD-01",
    name: "Antique Zardosi Silk Bridal Blouse",
    category: "Bridal Blouse",
    price: "₹14,800",
    numericPrice: 14800,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Pure Mulberry Raw Silk with Cotton Voile Lining",
    color: "Deep Crimson Burgundy",
    sizes: ["32", "34", "36", "38", "40", "Custom Measurement"],
    stock: 6,
    isNew: true,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-02",
    name: "Pure Kanchipuram Temple Border Silk Saree",
    category: "Silk Saree",
    price: "₹22,500",
    numericPrice: 22500,
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Pure Mulberry Handloom Silk with Zari",
    color: "Forest Emerald & Temple Gold",
    sizes: ["Standard 6.2m with Blouse Piece"],
    stock: 4,
    isNew: true,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-03",
    name: "Muted Oudh Hand-Pleated Overlay Gown",
    category: "Western Wear",
    price: "₹18,900",
    numericPrice: 18900,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Fluid Habotai Silk & Fine Tulle",
    color: "Soft Beige & Champagne Ochre",
    sizes: ["XS", "S", "M", "L", "Custom Fit"],
    stock: 4,
    isNew: true,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-04",
    name: "Royal Aari-Work Velvet Potli & Blouse Set",
    category: "Festive Collection",
    price: "₹16,400",
    numericPrice: 16400,
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Micro Velvet & Tussar Silk",
    color: "Wine Burgundy",
    sizes: ["32", "34", "36", "38", "Custom Measurement"],
    stock: 5,
    isNew: false,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-05",
    name: "Bespoke Heirloomed Bridal Ensemble",
    category: "Custom Made",
    price: "₹34,000",
    numericPrice: 34000,
    image:
      "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Custom Banarasi Silk / Pure Raw Silk",
    color: "Tailored to Customer Choice",
    sizes: ["Tailored to Exact Body Measurements"],
    stock: 10,
    isNew: true,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-06",
    name: "Chanderi Hand-Block Printed Anarkali Dress",
    category: "Ethnic Wear",
    price: "₹12,200",
    numericPrice: 12200,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Pure Chanderi Silk with Mulmul Lining",
    color: "Warm Sand Beige & Ochre Gold",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    isNew: false,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-07",
    name: "Cutwork Maggam Work Bridal Blouse",
    category: "Bridal Blouse",
    price: "₹15,900",
    numericPrice: 15900,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Heavy Raw Silk",
    color: "Deep Plum Wine",
    sizes: ["34", "36", "38", "40"],
    stock: 5,
    isNew: false,
    isVisible: true,
    },

    {
    productCode: "NK-PRD-08",
    name: "Sculpted Peplum Silk Blazer & Trouser",
    category: "Western Wear",
    price: "₹17,500",
    numericPrice: 17500,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    ],
    fabric: "Matka Silk & Tussar Blend",
    color: "Antique Khaki Beige",
    sizes: ["S", "M", "L"],
    stock: 7,
    isNew: true,
    isVisible: true,
    },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected for product seeding");

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Product seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();