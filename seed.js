const mongoose = require('mongoose');
const dotenv = require('dotenv');
const RecycleCenter = require('./models/RecycleCenter');

console.log("🚀 Script started..."); // Debug 1

// Load env vars
const result = dotenv.config();
if (result.error) {
    console.log("❌ Error loading .env file:", result.error);
} else {
    console.log("✅ .env loaded.");
}

// Check if URI exists
if (!process.env.MONGO_URI) {
    console.error("❌ FATAL ERROR: MONGO_URI is missing. Check your .env file!");
    process.exit(1);
} else {
    console.log("Checking URI (first 10 chars):", process.env.MONGO_URI.substring(0, 20) + "...");
}

const seedData = [
    // --- AMRITSAR ---
    {
        name: "Amritsar Cantt Recycling Hub",
        address: "Cantonment Area, Amritsar, Punjab",
        acceptedMaterials: ["Plastic", "Metal", "E-Waste"],
        location: { type: "Point", coordinates: [74.8389, 31.6340] }
    },
    {
        name: "Golden Temple Eco-Bin",
        address: "Near Golden Temple Rd, Amritsar",
        acceptedMaterials: ["Organic", "Paper", "Food Waste"],
        location: { type: "Point", coordinates: [74.8765, 31.6200] }
    },
    // --- PATIALA ---
    {
        name: "Thapar Green Zone (Main Gate)",
        address: "Bhadson Rd, Thapar University, Patiala",
        acceptedMaterials: ["Plastic", "Paper", "Cans"],
        location: { type: "Point", coordinates: [76.3725, 30.3564] }
    },
    {
        name: "Patiala E-Waste Center",
        address: "Urban Estate Phase II, Patiala",
        acceptedMaterials: ["Electronics", "Batteries", "Glass"],
        location: { type: "Point", coordinates: [76.4032, 30.3400] }
    },
    // --- DUBAI ---
    {
        name: "Canadian University Dubai Recycling",
        address: "Al Mustaqbal St, City Walk, Dubai",
        acceptedMaterials: ["Plastic", "Paper", "Metal"],
        location: { type: "Point", coordinates: [55.2660, 25.2016] }
    }
];

const seedDB = async () => {
    try {
        console.log("⏳ Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔌 MongoDB Connected!');

        console.log("🧹 Clearing old data...");
        await RecycleCenter.deleteMany();

        console.log("🌱 Seeding new data...");
        await RecycleCenter.insertMany(seedData);

        console.log('✅ SUCCESS: Database seeded!');
        process.exit();
    } catch (err) {
        console.error("❌ ERROR:", err);
        process.exit(1);
    }
};

// --- CRITICAL: Execute the function ---
seedDB();