module.exports = (req, res, next) => {
  if (
    req.session.isLoggedIn &&
    req.session.user &&
    req.session.user.userType === "admin"
  ) {
    return res.redirect("/admin/product-listed");
  } else if (
    req.session.isLoggedIn &&
    req.session.user &&
    req.session.user.userType === "user"
  ) {
    return res.redirect("/");
  }
  next();
};
