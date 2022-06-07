import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found!" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid Credentials!" });

    const token = jwt.sign({ email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  } catch (error) {

  }
}
export const signup = async (req, res) => {

}