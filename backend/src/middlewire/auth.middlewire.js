import jwt, { decode } from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unouthorized - no token provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ message: "Unouthorized - not a valid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protected route middlewire,", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
