import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import initRoutes from "./routes/index.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5001;
initRoutes(app);
const server = http.createServer(app);

connectDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
