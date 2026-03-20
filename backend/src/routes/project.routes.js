import { Router } from "express";
import {
  getMyProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getMemberProjects,
} from "../controllers/project.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/project", authenticate, getMyProjects);
router.get("/project/member", authenticate, getMemberProjects);
router.get("/project/:id", authenticate, getProjectById);
router.post("/project/create", authenticate, createProject);
router.put("/project/update/:id", authenticate, updateProject);
router.delete("/project/delete/:id", authenticate, deleteProject);

export default router;
