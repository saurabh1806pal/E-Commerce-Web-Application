// core module
const express = require("express");
const path = require("path");

//external Module
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://root:root@my-projects.mzuqz2t.mongodb.net/ecomstore?appName=my-projects";

// Local Module
const authRouter = require("./src/routes/auth.routes");

// Express Modules
const app = express();
const { default: mongoose } = require("mongoose");
const adminRouter = require("./src/routes/admin.routes");
const userRouter = require("./src/routes/user.routes");
const PORT = 4000;

// Creating a Session to create and destroy User Session
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "session",
});
app.use(
  session({
    secret: "TXS-YYT-UIO-IXC-ZNI",
    resave: false,
    saveUninitialized: true,
    store,
  })
);
// Sending data to EJS codes
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Set Engines, Views and CSS
app.set("view engine", "ejs"); // ✅ Set view engine
app.set("views", path.join(__dirname, "src", "views")); // ✅ Set views folder
app.use(express.static(path.join(__dirname, "src", "public"))); // Serve static files

// Routes

// 1️⃣ Authentication Route First
app.use(authRouter);

//2️⃣ Admin protection middleware
app.use("/admin", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/admin", adminRouter);
app.use(userRouter);

// Home route (specific)
app.get("/", (req, res) => {
  if (
    req.session.isLoggedIn &&
    req.session.user &&
    req.session.userType === "admin"
  ) {
    return res.redirect("/admin/add-product");
  } else {
    res.render("users/home");
  }
});
// Server
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
