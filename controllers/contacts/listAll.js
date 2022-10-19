const { Contact } = require("../../models");

async function listAll(req, res) {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.json({
    page,
    limit,
    contacts,
  });
}

module.exports = listAll;
