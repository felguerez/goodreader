function loginRequired(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ status: "Please log in" });
  }
  return next();
}

module.exports = { loginRequired };
