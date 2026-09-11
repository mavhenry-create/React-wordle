import express from "express";
import "dotenv/config";
import cors from "cors";
import { createAuth0 } from '@auth0/auth0-express';
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";



const app = express();
const PORT = process.env.PORT || 3000;

app.use(createAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  sessionSecret: process.env.AUTH0_SESSION_SECRET,
  appBaseUrl: process.env.APP_BASE_URL
}));

app.use(cors({ origin: "http://localhost:5173",
    credentials: true, }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
  if (res.status(500)) {
    res.json({ message: "Internal Server Error" });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
