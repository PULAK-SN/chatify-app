import { genetareToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const name = typeof fullName === "string" ? fullName.trim() : "";
  const normalisedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const pass = typeof password === "string" ? password : "";

  try {
    if (!name || !normalisedEmail || !pass) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // check if the email is valid: regex
    const emailRegex =
      /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (!emailRegex.test(normalisedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existing = await User.findOne({ email: normalisedEmail });

    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      fullName: name,
      email: normalisedEmail,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      genetareToken(savedUser._id, res);

      return res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      //   TODO: send a welcome email to user
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller: ", error);
    res.status(500).json({ mssage: "Internal server error" });
  }
};
