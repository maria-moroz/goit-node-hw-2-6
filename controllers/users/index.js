const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const repeatVerifyEmail = require("./repeatVerifyEmail");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  repeatVerifyEmail,
};
