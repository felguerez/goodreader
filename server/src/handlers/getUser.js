function getUser(req, res) {
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);
  if (req.user) {
    res.status(200).send(JSON.stringify({ user: req.user }));
  } else {
    res.status(404).end();
  }
}

module.exports = { getUser };
