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
import { createTaskSchema } from "../../schemas/task.schema";

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

    const result = createTaskSchema.safeParse({
      title,
      description,
      status: status,
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
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
          <Typography variant="h6">Create New Task</Typography>
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
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            autoFocus
            placeholder="Ex:Taskflow Development"
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            placeholder="Describe what this project is about..."
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_progress">In Progres</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Assigned to</InputLabel>
            <Select
              value={assigneeId}
              label="Asignado a"
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              <MenuItem value="">Unassigned</MenuItem>
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
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !title}
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
