function login(req, res, next) {
  const user = req.user;
  req.login(user, (err) => {
    if (err) {
      return next(err);
    }
    return res.send(JSON.stringify({ user }));
  });
}

module.exports = { login };
