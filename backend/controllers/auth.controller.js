import bcrypt from "bcryptjs";
import Candidates from "../models/user.model.js";

//controller for signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const existingUser = await Candidates.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username already exists" });
    }

    const existingEmail = await Candidates.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Candidates({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Failed to create new user" });
    }
  } catch (error) {
    console.error("Error during signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//controller for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await Candidates.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error during login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
