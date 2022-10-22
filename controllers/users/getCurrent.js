async function getCurrent(req, res) {
  const { email, subscription, avatarUrl } = req.user;

  res.json({
    user: { email, subscription, avatarUrl },
  });
}

module.exports = getCurrent;
