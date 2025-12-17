const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // session
    req.session.user = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      cart: user.cart,
      favourites: user.favourites,
    };
    req.session.isLoggedIn = true;

    return res.status(200).json({
      success: true,
      userType: user.userType,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getMe = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({
      user: null,
    });
  }

  res.status(200).json({
    user: req.session.user,
  });
};

exports.postLogout = (req, res, next) => {
  console.log("LOGOUT HIT");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    // Clear the session cookie
    res.clearCookie("connect.sid");

    // Send JSON response for React
    res.json({ success: true, message: "Logged out successfully" });
  });
};

exports.postSignup = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name should be larger than 2 letters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Should contain only alphabets"),

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
      "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password do not match");
      }
      return true;
    }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ success: true, message: "Signup successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Signup failed" });
    }
  },
];
