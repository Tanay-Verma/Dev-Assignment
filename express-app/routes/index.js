import { Router } from "express";
import { User } from "../db/db.js";
import { validateEmail } from "../utils/helper.js";
export const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  let user = {};
  try {
    if (validateEmail(email)) {
      user = await User.findOne({ email });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
  res.json(user);
});
