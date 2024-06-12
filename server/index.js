import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import donationRoutes from "./routes/donation.routes.js";
import path from "path";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const __dirname = path.resolve();

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  console.log(`Received code: ${code}`);
  try {
    const response = await axios.post("https://streamlabs.com/api/v1.0/token", {
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    });
    const accessToken = response.data.access_token;
    console.log(`Received access token: ${accessToken}`);
    res.json({ accessToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
});

app.use("/server/donation", donationRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
