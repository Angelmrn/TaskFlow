import { Router } from "express";
import {
  getProjectMembers,
  addProjectMember,
  updateProjectMember,
  deleteProjectMember,
} from "../controllers/member.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  isProjectMember,
  isProjectOwner,
} from "../middlewares/project.middleware.js";

const router = Router();

router.get(
  "/project/:projectId/members",
  authenticate,
  isProjectMember,
  getProjectMembers,
);
router.post(
  "/project/:projectId/member/add",
  authenticate,
  isProjectOwner,
  addProjectMember,
);
router.put(
  "/project/:projectId/member/update/:userId",
  authenticate,
  isProjectOwner,
  updateProjectMember,
);
router.delete(
  "/project/:projectId/member/delete/:userId",
  authenticate,
  isProjectOwner,
  deleteProjectMember,
);

export default router;
