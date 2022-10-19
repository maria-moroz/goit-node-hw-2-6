const createError = require("http-errors");
const { User } = require("../../models");

async function signup(req, res) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const newUser = new User({ email, password, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: { email, subscription },
  });
}

module.exports = signup;
