// ================= CORE MODULES =================
const express = require("express");
const path = require("path");

// ================= EXTERNAL MODULES =================
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

// ================= LOCAL MODULES =================
const authRouter = require("./src/routes/auth.routes");
const adminRouter = require("./src/routes/admin.routes");

// ================= CONSTANTS =================
const PORT = 9999;
const DB_PATH =
  "mongodb+srv://root:root@my-projects.mzuqz2t.mongodb.net/ecomstore?appName=my-projects";

// ================= EXPRESS APP =================
const app = express();

// ================= SESSION STORE =================
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "session",
});

// ================= SESSION MIDDLEWARE =================
app.use(
  session({
    secret: "TXS-YYT-UIO-IXC-ZNI",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

// ================= LOCALS FOR EJS =================
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

// ================= BODY PARSERS =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));

// ================= ROUTES =================

// Authentication routes (login, signup, logout)
app.use(authRouter);

// Admin protection middleware
app.use("/admin", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

// Admin routes
app.use("/admin", adminRouter);

// ================= DATABASE & SERVER =================
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
