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
  Divider,
  Avatar,
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

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string; accent: string }
> = {
  pending: {
    label: "Pendiente",
    color: "#633806",
    bg: "#FAEEDA",
    dot: "#BA7517",
    accent: "#EF9F27",
  },
  in_progress: {
    label: "En progreso",
    color: "#0C447C",
    bg: "#E6F1FB",
    dot: "#185FA5",
    accent: "#378ADD",
  },
  completed: {
    label: "Completado",
    color: "#27500A",
    bg: "#EAF3DE",
    dot: "#3B6D11",
    accent: "#639922",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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

  const currentStatus = statusConfig[task.status] ?? statusConfig.pending;

  const handleDeleteConfirm = () => {
    onDelete?.(task.id);
    setDeleteModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 4,
          },
        }}
      >
        {/* Barra de color según status */}
        <Box sx={{ height: "4px", backgroundColor: currentStatus.accent }} />

        {/* Header */}
        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 0.75 }}>
            {task.title}
          </Typography>

          {/* Badge de status */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 1,
              py: 0.25,
              borderRadius: "20px",
              backgroundColor: currentStatus.bg,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: currentStatus.dot,
              }}
            />
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ color: currentStatus.color }}
            >
              {currentStatus.label}
            </Typography>
          </Box>
        </Box>

        {/* Descripción */}
        <CardContent sx={{ pt: 1, pb: 1, flexGrow: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "38px",
              lineHeight: 1.5,
            }}
          >
            {task.description || "Sin descripción"}
          </Typography>
        </CardContent>

        <Divider />

        {/* Footer — asignado + fecha */}
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {task.assignee ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: "10px",
                  fontWeight: 500,
                  backgroundColor: "#E6F1FB",
                  color: "#0C447C",
                }}
              >
                {getInitials(task.assignee.username)}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {task.assignee.username}
              </Typography>
            </Box>
          ) : (
            <Typography variant="caption" color="text.disabled">
              Sin asignar
            </Typography>
          )}

          <Typography variant="caption" color="text.disabled">
            {new Date(task.createdAt).toLocaleDateString("es-MX")}
          </Typography>
        </Box>

        {/* Acciones */}
        <CardActions sx={{ justifyContent: "flex-end", pt: 0, px: 1, pb: 1 }}>
          <IconButton size="small" onClick={() => setEditModalOpen(true)}>
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton size="small" onClick={() => setDeleteModalOpen(true)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </CardActions>
      </Card>

      {/* Modal eliminar */}
      <DeleteDialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="¿Eliminar tarea?"
        itemName={task.title}
        description={`Estás a punto de eliminar "${task.title}". Esta acción no se puede deshacer.`}
      />

      {/* Modal editar */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleEditSubmit}>
          <DialogTitle>Editar tarea</DialogTitle>
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
