const createError = require("http-errors");
const gravatar = require("gravatar");
const shortid = require("shortid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

async function signup(req, res) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarUrl = gravatar.url(email);
  const verificationToken = shortid();
  const newUser = new User({
    email,
    password,
    subscription,
    avatarUrl,
    verificationToken,
  });

  newUser.setPassword(password);
  await newUser.save();

  const verificationEmail = {
    to: email,
    subject: "Email verification",
    html: `<p>Please <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">click here</a> to continue with the registration</p>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    user: { email, subscription, avatarUrl, verificationToken },
  });
}

module.exports = signup;
