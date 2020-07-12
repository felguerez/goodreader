function loginRequired(req, res, next) {
  console.log("req.session:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ status: "Please log in" });
  }
  return next();
}

module.exports = { loginRequired };
