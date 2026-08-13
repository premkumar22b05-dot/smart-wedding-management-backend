const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const authRoutes = require("./routes/authRoutes");
const weddingRoutes = require("./routes/weddingRoutes");
const weddingInvitationRoutes = require("./routes/weddingInvitationRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const venueRoutes = require("./routes/venueRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const guestRoutes = require("./routes/guestRoutes");
const weddingMediaRoutes = require("./routes/weddingMediaRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://smart-wedding-management-frontend-rkikpb730.vercel.app",
];
// ===============================
// Middleware
// ===============================
if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an Origin header
            // such as Postman/server-to-server requests.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS"),
            );
        },

        credentials: true,
    }),
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(compression());

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/weddings", weddingRoutes);

app.use("/api/wedding-invitations", weddingInvitationRoutes);

app.use("/api/vendors", vendorRoutes);

app.use("/api/venues", venueRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/guests", guestRoutes);

app.use("/api/wedding-media", weddingMediaRoutes);

app.use("/api/checklists", checklistRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/recommendations", recommendationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/upload", uploadRoutes);

// ===============================
// Default Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Smart Wedding Management & Planning System Backend is Running 🚀",
    version: "1.0.0",
  });
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

module.exports = app;