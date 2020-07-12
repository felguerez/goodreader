function logout(req, res) {
  req.logout();
  res.status(200).end();
}

module.exports = { logout };
