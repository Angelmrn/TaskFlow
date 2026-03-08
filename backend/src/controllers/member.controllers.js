import { prisma } from "../prisma.js";
import {
  createMemberSchema,
  updateMemberSchema,
} from "../schemas/member.schema.js";

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const members = await prisma.projectMember.findMany({
      where: { projectId: parseInt(projectId) },
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
    });
    res.json(members);
  } catch (error) {
    console.error("Error fetching project members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const result = createMemberSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: result.error.errors });
    }
    const { projectId } = req.params;
    const member = await prisma.projectMember.create({
      data: {
        ...result.data,
        projectId: parseInt(projectId),
      },
    });
    res.status(200).json({
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    console.error("Error adding project member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProjectMember = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const result = updateMemberSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: result.error.errors });
    }
    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          userId: parseInt(userId),
          projectId: parseInt(projectId),
        },
      },
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    await prisma.projectMember.update({
      where: {
        projectId_userId: {
          userId: parseInt(userId),
          projectId: parseInt(projectId),
        },
      },
      data: result.data,
    });
    res.json({ message: "Member updated successfully" });
  } catch (error) {
    console.error("Error updating project member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProjectMember = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          userId: parseInt(userId),
          projectId: parseInt(projectId),
        },
      },
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          userId: parseInt(userId),
          projectId: parseInt(projectId),
        },
      },
    });
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting project member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
