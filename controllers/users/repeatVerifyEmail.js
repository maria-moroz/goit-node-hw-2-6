const createError = require("http-errors");
const shortid = require("shortid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

async function repeatVerifyEmail(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const verificationToken = shortid();

  const verificationEmail = {
    to: email,
    subject: "Email verification",
    html: `<p>Please <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">click here</a> to continue with the registration</p>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    message: "Verification email sent",
  });
}

module.exports = repeatVerifyEmail;
