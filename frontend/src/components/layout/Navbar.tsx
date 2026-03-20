import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { Logout, TaskAlt } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TaskAlt sx={{ color: "#8b5cf6" }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#8b5cf6" }}>
            TaskFlow
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#8b5cf6",
              width: 32,
              height: 32,
              fontSize: "0.875rem",
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <IconButton
            size="small"
            onClick={handleLogout}
            sx={{ color: "black" }}
          >
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
