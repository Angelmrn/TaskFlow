import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import memberRoutes from "./routes/member.routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to TaskFlow API" });
});

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api", memberRoutes);

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
