import {Router} from "express"
export const router = Router();

router.get("/users", (req, res) => {
    res.json([{name: "John", age: 30, email: "a@a.com"}, {name: "Jane", age: 25, email: "b@b.com"}])
})