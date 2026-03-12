import { prisma } from "../prisma.js";

export const isProjectMember = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.ownerId === userId) {
      return next();
    }

    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: parseInt(projectId),
          userId: userId,
        },
      },
    });
    if (!member) {
      return res
        .status(403)
        .json({ message: "You are not a member of this project" });
    }
    req.projectRole = member.role;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const isProjectOwner = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.ownerId !== userId) {
      return res.status(403).json({ message: "Not the owner of the project" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
