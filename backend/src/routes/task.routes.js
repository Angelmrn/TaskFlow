import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isProjectMember } from "../middlewares/project.middleware.js";

const router = Router();

router.get(
  "/project/:projectId/tasks",
  authenticate,
  isProjectMember,
  getTasks,
);
router.post(
  "/project/:projectId/task/create",
  authenticate,
  isProjectMember,
  createTask,
);
router.put(
  "/project/:projectId/task/update/:id",
  authenticate,
  isProjectMember,
  updateTask,
);
router.delete(
  "/project/:projectId/task/delete/:id",
  authenticate,
  isProjectMember,
  deleteTask,
);

export default router;
