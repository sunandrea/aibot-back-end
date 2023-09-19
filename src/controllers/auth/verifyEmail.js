const path = require('path');
const { createError } = require('../../helpers');
const { User } = require('../../models/users.model');

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw createError(
      401,
      'Sorry, can’t find an account associated with this address'
    );
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: '',
  });
  res.sendFile(path.join(__dirname, '../../public/registration-success.html'));
};

module.exports = verifyEmail;
