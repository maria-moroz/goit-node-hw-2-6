const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function updateAvatar(req, res, next) {
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${req.user._id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", fileName);

    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({
      avatarUrl,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
}

module.exports = updateAvatar;
