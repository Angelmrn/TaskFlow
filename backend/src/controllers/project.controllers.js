import { prisma } from "../prisma.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";

export const getMyProjects = async (req, res) => {
  try {
    const { userId } = req.user;
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        owner: {
          select: { id: true, username: true },
        },
        _count: {
          select: { task: true, members: true },
        },
      },
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        owner: {
          select: { id: true, username: true },
        },
        _count: {
          select: { task: true, members: true },
        },
      },
    });
    if (!project) {
      return res.status(401).json({
        message: "Project not found",
      });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const result = createProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.errors,
      });
    }
    const { userId } = req.user;
    const { name, description, color } = result.data;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        color,
        ownerId: userId,
      },
    });
    res.status(201).json({
      message: "Project create successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const result = updateProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.errors,
      });
    }
    const { id } = req.params;
    const { userId } = req.user;
    const project = await prisma.project.update({
      where: {
        id: parseInt(id),
        ownerId: userId, //solo el owner puede actualizarlo
      },
      data: result.data,
    });
    res.json({
      message: "Project Update successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.ownerId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Project with deleted succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
