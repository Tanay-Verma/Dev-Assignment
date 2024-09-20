import { Router } from "express";
import { User } from "../db/db.js";
import { validateEmail } from "../utils/helper.js";
export const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0, _id: 0 });
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
      user = await User.findOne({ email }, { __v: 0, _id: 0 });
      if (user === null) {
        res.status(404);
      }
    } else {
      user = { error: "Invalid email" };
      res.status(400);
    }
  } catch (error) {
    console.error(error);
    user = { error: "Internal Server Error" };
    res.status(500);
  } finally {
    res.json(user);
  }
});

router.post("/user", async (req, res) => {
  const { name, email, age } = req.body;
  let newUser = {};
  try {
    if (validateEmail(email)) {
      newUser = await User.create({
        name,
        email,
        age: age === undefined || age === null || isNaN(age) ? null: age,
      });
      res.status(201);
    } else {
      newUser = { error: "Invalid email" };
      res.status(400);
    }
  } catch (error) {
    console.error(error);
    newUser = { error: "Internal Server Error" };
    res.status(500);
  } finally {
    res.json(newUser);
  }
});
