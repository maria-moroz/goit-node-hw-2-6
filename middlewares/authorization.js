const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { SECRET_KEY } = process.env;

async function authorization(req, res, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
}

module.exports = authorization;
