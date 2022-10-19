const createError = require("http-errors");
const { Contact } = require("../../models");

async function getById(req, res) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
}

module.exports = getById;
