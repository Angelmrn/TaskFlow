import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { addProjectMember } from "../../api/members";
import { getUsers, type User } from "../../api/auth";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectId: number;
}

export default function AddMemberModal({
  open,
  onClose,
  onSuccess,
  projectId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      setError("Selecciona un usuario");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await addProjectMember(projectId, {
        userId: Number(userId),
        role,
      });
      setUserId("");
      setRole("member");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al agregar miembro");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRole("member");
      setUserId("");
      setError("");
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      const loadUsers = async () => {
        try {
          const data = await getUsers();
          setUsers(data);
        } catch (err) {
          console.error(err);
        }
      };
      loadUsers();
    }
  }, [open, projectId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd />
          <Typography variant="h6">Add Member</Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select
              value={userId}
              label="User"
              onChange={(e) => setUserId(e.target.value)}
            >
              <MenuItem value="">Select a user</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={String(user.id)}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
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
            disabled={loading || !userId}
          >
            {loading ? "Adding..." : "Add Member"}{" "}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
