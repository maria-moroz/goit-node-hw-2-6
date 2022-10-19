const createError = require("http-errors");
const { Contact } = require("../../models");

async function updateById(req, res) {
  const { body } = req;
  if (!body) {
    throw createError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = updateById;
