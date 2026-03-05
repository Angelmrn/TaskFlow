import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/project/:projectId/tasks", authenticate, getTasks);
router.post("/project/:projectId/task/create", authenticate, createTask);
router.put("/task/update/:id", authenticate, updateTask);
router.delete("/task/delete/:id", authenticate, deleteTask);

export default router;
