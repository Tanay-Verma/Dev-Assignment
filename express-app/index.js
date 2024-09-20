import express from "express";
import cors from "cors";
import {router} from "./routes/index.js";
import { connectToMongoDB } from "./db/db.js";
const app = express();

app.use(cors())

app.use(router);

app.listen(3000, () => {
    connectToMongoDB()
});
