import {Router} from "express"
export const router = Router();

router.get("/users", (req, res) => {
    res.json([{name: "John"}, {name: "Jane"}])
})