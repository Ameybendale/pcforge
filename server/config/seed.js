import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Vertex RTX 4080 Super",
    slug: "vertex-rtx-4080-super",
    category: "graphics-cards",
    brand: "Vertex",
    price: 949,
    compareAtPrice: 1049,
    stock: 18,
    description: "16GB GDDR6X graphics card built for 4K gaming and creator workloads, triple-fan cooling with a reinforced backplate.",
    specs: [
      { label: "Memory", value: "16GB GDDR6X" },
      { label: "Boost Clock", value: "2610 MHz" },
      { label: "Power Draw", value: "320W" },
      { label: "Interface", value: "PCIe 4.0 x16" },
    ],
    images: [],
    rating: 4.7,
    numReviews: 212,
    featured: true,
  },
  {
    name: "Core X9-14900K",
    slug: "core-x9-14900k",
    category: "processors",
    brand: "CoreLogic",
    price: 589,
    stock: 34,
    description: "24-core flagship desktop processor with unlocked multiplier for extreme overclocking headroom.",
    specs: [
      { label: "Cores / Threads", value: "24 / 32" },
      { label: "Boost Clock", value: "5.8 GHz" },
      { label: "Socket", value: "LGA1700" },
      { label: "TDP", value: "125W base / 253W turbo" },
    ],
    images: [],
    rating: 4.8,
    numReviews: 340,
    featured: true,
  },
  {
    name: "PulseDDR 32GB Kit (2x16GB)",
    slug: "pulseddr-32gb-6400",
    category: "memory",
    brand: "Pulse",
    price: 139,
    stock: 76,
    description: "Low-latency DDR5 memory kit with aluminum heat spreaders, tuned XMP 3.0 profiles.",
    specs: [
      { label: "Capacity", value: "32GB (2x16GB)" },
      { label: "Speed", value: "DDR5-6400" },
      { label: "Latency", value: "CL32" },
      { label: "Voltage", value: "1.4V" },
    ],
    images: [],
    rating: 4.6,
    numReviews: 158,
    featured: true,
  },
  {
    name: "NovaDrive 2TB NVMe",
    slug: "novadrive-2tb-nvme",
    category: "storage",
    brand: "Nova",
    price: 149,
    stock: 92,
    description: "Gen4 NVMe SSD with sustained sequential reads up to 7300MB/s and a graphene thermal layer.",
    specs: [
      { label: "Capacity", value: "2TB" },
      { label: "Interface", value: "PCIe 4.0 NVMe" },
      { label: "Read Speed", value: "7300 MB/s" },
      { label: "Write Speed", value: "6600 MB/s" },
    ],
    images: [],
    rating: 4.7,
    numReviews: 289,
    featured: true,
  },
  {
    name: "Frame Z790 Apex",
    slug: "frame-z790-apex",
    category: "motherboards",
    brand: "Frame",
    price: 429,
    stock: 21,
    description: "ATX motherboard with DDR5 support, 20-phase power delivery, and triple M.2 slots with active cooling.",
    specs: [
      { label: "Chipset", value: "Z790" },
      { label: "Form Factor", value: "ATX" },
      { label: "Memory Support", value: "DDR5, up to 128GB" },
      { label: "M.2 Slots", value: "3x Gen4" },
    ],
    images: [],
    rating: 4.5,
    numReviews: 97,
    featured: false,
  },
  {
    name: "Voltage 850W Gold",
    slug: "voltage-850w-gold",
    category: "power-supplies",
    brand: "Voltage",
    price: 119,
    stock: 58,
    description: "Fully modular 80+ Gold power supply with a 0dB silent mode and 10-year warranty.",
    specs: [
      { label: "Wattage", value: "850W" },
      { label: "Efficiency", value: "80+ Gold" },
      { label: "Modularity", value: "Fully Modular" },
      { label: "Fan", value: "135mm Fluid Dynamic" },
    ],
    images: [],
    rating: 4.6,
    numReviews: 134,
    featured: false,
  },
  {
    name: "Monolith ATX Mid Tower",
    slug: "monolith-atx-mid-tower",
    category: "cabinets",
    brand: "Monolith",
    price: 99,
    stock: 40,
    description: "Tempered glass mid-tower with mesh front intake, tool-less panels, and room for a 360mm radiator.",
    specs: [
      { label: "Form Factor", value: "ATX / mATX / ITX" },
      { label: "Max GPU Length", value: "400mm" },
      { label: "Radiator Support", value: "Up to 360mm" },
      { label: "Included Fans", value: "3x 120mm ARGB" },
    ],
    images: [],
    rating: 4.4,
    numReviews: 176,
    featured: false,
  },
  {
    name: "Cryo 240 AIO Cooler",
    slug: "cryo-240-aio",
    category: "cooling",
    brand: "Cryo",
    price: 89,
    stock: 65,
    description: "240mm liquid cooler with dual PWM fans and an infinity-mirror pump head.",
    specs: [
      { label: "Radiator Size", value: "240mm" },
      { label: "Fan Speed", value: "600–2000 RPM" },
      { label: "Socket Support", value: "LGA1700 / AM5" },
      { label: "Noise Level", value: "≤ 28 dBA" },
    ],
    images: [],
    rating: 4.5,
    numReviews: 88,
    featured: false,
  },
];

const run = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  process.exit();
};

run();
