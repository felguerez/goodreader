function login(req, res) {
  const user = req.user;
  console.log("user in login:", user);
  req.logIn(user, (err) => {
    console.log("when does logIn  get called?");
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json({ user });
  });
}

module.exports = { login };
