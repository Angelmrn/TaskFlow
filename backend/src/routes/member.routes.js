import { Router } from "express";
import {
  getProjectMembers,
  addProjectMember,
  updateProjectMember,
  deleteProjectMember,
} from "../controllers/member.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/project/:projectId/members", authenticate, getProjectMembers);
router.post("/project/:projectId/member/add", authenticate, addProjectMember);
router.put(
  "/project/:projectId/member/update/:userId",
  authenticate,
  updateProjectMember,
);
router.delete(
  "/project/:projectId/member/delete/:userId",
  authenticate,
  deleteProjectMember,
);

export default router;
