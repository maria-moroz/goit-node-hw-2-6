const createError = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

async function signup(req, res) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarUrl = gravatar.url(email);
  const newUser = new User({ email, password, subscription, avatarUrl });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: { email, subscription, avatarUrl },
  });
}

module.exports = signup;
