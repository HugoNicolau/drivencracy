import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import pollRoutes from "./routes/pollRoutes.js"
import choiceRoutes from "./routes/choiceRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(pollRoutes);
app.use(choiceRoutes);
app.use(voteRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));