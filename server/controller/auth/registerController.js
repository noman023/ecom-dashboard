const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { name, email, userRole, password } = req.body;

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle image
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.filename;
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      userRole,
      password: hashedPassword,
      image: imageUrl, // Save image filename/path
    });

    // Save user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register };
