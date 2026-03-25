import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  Edit,
  Delete,
  ArrowBack,
  AddTask,
  PersonAdd,
} from "@mui/icons-material";
import { getProjectById, deleteProject, updateProject } from "../api/projects";
import type { Project } from "../api/projects";
import DeleteDialog from "../components/deleteModal";
import { getTaskByProjectId, deleteTask, updateTask } from "../api/task";
import type { Task } from "../api/task";
import TaskCard from "../components/tasks/TaskCard";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import AddMemberModal from "../components/members/addMemberModal";
import { createProjectSchema } from "../schemas/project.schema";
import { updateTaskSchema } from "../schemas/task.schema";
import EditIcon from "@mui/icons-material/Edit";

const COLORS = [
  { name: "Morado", value: "#8b5cf6" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#10b981" },
  { name: "Naranja", value: "#f97316" },
  { name: "Rojo", value: "#ef4444" },
];

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editColor, setEditColor] = useState("");
  const [tasks, setTask] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  useEffect(() => {
    loadProject();
    loadTasks();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectById(Number(projectId));
      const projectData = Array.isArray(data) ? data[0] : data;
      setProject(projectData);

      setEditName(projectData.name);
      setEditDescription(projectData.description || "");
      setEditColor(projectData.color || COLORS[0].value);
    } catch (err: any) {
      setError(err.message || "Error al cargar el proyecto");
    } finally {
      setLoading(false);
    }
  };
  const loadTasks = async () => {
    try {
      const data = await getTaskByProjectId(Number(projectId));
      setTask(data);
    } catch (err: any) {
      setError(err.message || "Error Loading Tasks");
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(Number(projectId));
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al eliminar el proyecto");
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(Number(projectId), taskId);
      setTask((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err: any) {
      setError(err.message || "Error deleting task");
    }
  };

  const handleEditSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setEditError("");
    const result = createProjectSchema.safeParse({
      name: editName,
      description: editDescription,
      color: editColor,
    });
    if (!result.success) {
      setEditError(result.error.issues[0].message);
      return;
    }
    try {
      await updateProject(
        { name: editName, description: editDescription, color: editColor },
        Number(projectId),
      );
      setEditModalOpen(false);
      loadProject();
    } catch (err: any) {
      setEditError(err.message || "Error al actualizar");
    }
  };

  const handleEditTask = async (
    taskId: number,
    data: {
      title: string;
      description: string;
      status: string;
      assigneeId?: number;
    },
  ) => {
    const result = updateTaskSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      setEditError(errorMessage);
      throw new Error(errorMessage);
    }
    try {
      await updateTask(data, Number(projectId), taskId);
      await loadTasks();
    } catch (err: any) {
      const errorMsg = err.message || "Error al editar tarea";
      setEditError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error || "Proyecto no encontrado"}</Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", gap: 2 }}>
        <IconButton onClick={() => navigate("/")} sx={{ mt: 0.5 }}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: project.color || "#8b5cf6",
                overflow: "hidden",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.name}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              whiteSpace: "pre-wrap",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description || "No description"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAdd />}
            onClick={() => setAddMemberModalOpen(true)}
          >
            Add Member
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Tasks
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setModalOpen(true)}
            startIcon={<AddTask />}
          >
            New Task
          </Button>
        </Box>

        {project._count?.task === 0 ? (
          <Card
            variant="outlined"
            sx={{ borderStyle: "dashed", textAlign: "center", py: 5 }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                There are no tasks in this project
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create the first task to start working.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setModalOpen(true)}
                startIcon={<AddTask />}
              >
                New Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {tasks.map((task) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
                <TaskCard
                  task={task}
                  projectId={Number(projectId)}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  error={editError}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {deleteModalOpen && (
        <DeleteDialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteProject}
          title="¿Eliminar Proyecto?"
          itemName={project.name}
          description={`Estás a punto de eliminar el proyecto ${project.name}. Esta acción no se puede deshacer y eliminará todas las tareas asociadas.`}
        />
      )}

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleEditSubmit}>
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EditIcon />
              <Typography variant="h6">Edit Project</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {editError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {editError}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Color
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {COLORS.map((c) => (
                  <Box
                    key={c.value}
                    onClick={() => setEditColor(c.value)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: c.value,
                      cursor: "pointer",
                      border: editColor === c.value ? "3px solid #000" : "none",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <CreateTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={async () => {
          await loadTasks();
          await loadProject();
        }}
        projectId={Number(projectId)}
      />
      <AddMemberModal
        open={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
        onSuccess={() => setAddMemberModalOpen(false)}
        projectId={Number(projectId)}
      />
    </Container>
  );
}
