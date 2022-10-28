const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "mma.moroz.mariia@meta.ua",
    pass: META_PASSWORD,
  },
};

async function sendEmail(data) {
  const email = { ...data, from: "mma.moroz.mariia@meta.ua" };
  const transporter = nodemailer.createTransport(nodemailerConfig);
  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = sendEmail;
