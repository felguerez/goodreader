function getUser(req, res) {
  res.send(JSON.stringify(req.body));
}

module.exports = { getUser };
