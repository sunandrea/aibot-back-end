const { User } = require("../../models/users.model");

const ressetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(404).json({
        message: "Invalid token, user not found",
      });
    }
    user.password = password;
    user.resetPasswordToken = "";
    await user.save();
    const { password: userPassword, ...userResponse } = user._doc;
    res.status(200).json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

module.exports = ressetPassword;
