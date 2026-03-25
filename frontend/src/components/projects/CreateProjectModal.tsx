import { useState } from "react";
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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { createProject } from "../../api/projects";
import { createProjectSchema } from "../../schemas/project.schema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const COLORS = [
  { name: "Naranja", value: "#d18b59" },
  { name: "Rojo", value: "#ce5959" },
  { name: "Amarillo", value: "#dfba4e" },
  { name: "Cyan", value: "#06b6d4" },
];

export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = createProjectSchema.safeParse({ name, description, color });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await createProject({ name, description, color });
      setName("");
      setDescription("");
      setColor(COLORS[0].value);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear proyecto");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setName("");
      setDescription("");
      setColor(COLORS[0].value);
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Add />
          <Typography variant="h6">Create New Project</Typography>
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
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            autoFocus
            placeholder="Ex: Taskflow Development"
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

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Color del Proyecto
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <Box
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: c.value,
                    cursor: "pointer",
                    border:
                      color === c.value
                        ? "3px solid #000"
                        : "2px solid transparent",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  title={c.name}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {name || "Project name"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                opacity: 0.9,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {description || "Project Description"}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading || !name}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
