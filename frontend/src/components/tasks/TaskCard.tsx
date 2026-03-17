import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import type { Task } from "../../api/task";
import DeleteDialog from "../deleteModal";
import { getProjectMembers, type Member } from "../../api/members";

interface Props {
  task: Task;
  projectId: number;
  onDelete?: (id: number) => void;
  onEdit?: (
    id: number,
    data: {
      title: string;
      description: string;
      status: string;
      assigneeId?: number;
    },
  ) => void;
}

export default function TaskCard({ task, projectId, onDelete, onEdit }: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [status, setStatus] = useState(task.status || "pending");
  const [members, setMembers] = useState<Member[]>([]);
  const [assigneeId, setAssigneeId] = useState<string>(
    task.assigneeId ? String(task.assigneeId) : "",
  );
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || "",
  );

  const handleDeleteTask = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    onDelete?.(task.id);
    setDeleteModalOpen(false);
  };
  const handleEditSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit?.(task.id, {
      title: editTitle,
      description: editDescription,
      status,
      assigneeId: assigneeId !== "" ? Number(assigneeId) : undefined,
    });
    setEditModalOpen(false);
  };
  useEffect(() => {
    if (editModalOpen) {
      getProjectMembers(projectId).then(setMembers).catch(console.error);
    }
  }, [editModalOpen, projectId]);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <Box
          sx={{
            background: "gray",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {task.title}
          </Typography>
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "40px",
            }}
          >
            {task.description || "Sin descripcion"}
          </Typography>
          {task.assignee ? (
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>Hola</Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>Adios</Box>
          )}
        </CardContent>
        <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Creado {new Date(task.createdAt).toLocaleDateString("es-MX")}
          </Typography>
        </CardActions>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
          <IconButton size="small" onClick={() => setEditModalOpen(true)}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteTask}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </Box>
      </Card>
      <DeleteDialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="¿Eliminar proyecto?"
        itemName={task.title}
        description={`Estás a punto de eliminar ${task.title}. Esta acción no se puede deshacer.`}
      />
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleEditSubmit}>
          <DialogTitle>Editar Tarea</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Título"
              margin="normal"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Descripción"
              margin="normal"
              multiline
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="pending">Pendiente</MenuItem>
                <MenuItem value="in_progress">En progreso</MenuItem>
                <MenuItem value="completed">Completado</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Asignado a</InputLabel>
              <Select
                value={assigneeId}
                label="Asignado a"
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                <MenuItem value="">Sin asignar</MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.userId} value={String(member.userId)}>
                    {" "}
                    {member.user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
