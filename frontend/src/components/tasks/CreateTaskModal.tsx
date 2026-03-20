import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { postNewTask } from "../../api/task";
import { getProjectMembers, type Member } from "../../api/members";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectId: number;
}

export default function CreateTaskModal({
  open,
  onClose,
  onSuccess,
  projectId,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [member, setMember] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (assigneeId !== "" && Number(assigneeId) < 1) {
      setError("El id del asignado debe ser valido");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await postNewTask(
        {
          title,
          description,
          status: status || "pending",
          assigneeId: assigneeId !== "" ? Number(assigneeId) : undefined,
        },
        projectId,
      );
      setTitle("");
      setDescription("");
      setStatus("");
      setAssigneeId("");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al crear una tarea");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setAssigneeId("");
      setError("");
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      getProjectMembers(projectId).then(setMember).catch(console.error);
    }
  }, [open, projectId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Add />
          <Typography variant="h6">Crear Nueva Tarea</Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Titulo de la Tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            autoFocus
            placeholder="Ej: Desarrollo de TaskFlow"
          />

          <TextField
            fullWidth
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            placeholder="Describe de qué trata este proyecto..."
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
              {member.map((member) => (
                <MenuItem key={member.userId} value={String(member.userId)}>
                  {" "}
                  {member.user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !title}
          >
            {loading ? "Creando..." : "Crear Tarea"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
