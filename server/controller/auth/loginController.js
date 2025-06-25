const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login };
