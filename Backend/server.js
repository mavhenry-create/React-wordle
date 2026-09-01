import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ exposedHeaders: ["x-guest-id"] }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
