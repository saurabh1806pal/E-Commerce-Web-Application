const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    isLoggedIn: false,
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("auth/login", {
      isLoggedIn: false,
      user: {},
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).render("auth/login", {
      isLoggedIn: false,
      user: {},
    });
  }
  if (user.userType === "admin") {
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/admin/product-listed");
  } else if (user.userType === "user") {
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/");
  }
};

exports.postLogout = (req, res, next) => {
  console.log("LOGOUT HIT");
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    isLoggedIn: false,
    user: {},
  });
};

exports.postSignup = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name should be larger than 2 letters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Should contain only Alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should contain minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password do not match");
      }
      return true;
    }),

  (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", {
        isLoggedIn: false,
        user: {},
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(400).render("auth/signup", {
          isLoggedIn: false,
        });
      });
  },
];
