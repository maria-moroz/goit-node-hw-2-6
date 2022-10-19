async function getCurrent(req, res) {
  const { email, subscription } = req.user;

  res.json({
    user: { email, subscription },
  });
}

module.exports = getCurrent;
