import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { FolderOpen, MoreVert, People } from "@mui/icons-material";
import type { Project } from "../../api/projects";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  onDelete?: (id: number) => void;
}

export default function ProjectCard({ project, onDelete }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        borderLeft: `4px solid ${project.color || "#8b5cf6"}`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${project.color || "#8b5cf6"} 0%, ${project.color || "#ec4899"} 100%)`,
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <FolderOpen />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {project.name}
        </Typography>
        <IconButton
          size="small"
          sx={{ color: "white" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreVert />
        </IconButton>
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
          {project.description || "Sin descripción"}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="h6" color="primary">
              {project._count?.tasks || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              tareas
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <People fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {(project._count?.members || 0) + 1}
            </Typography>
          </Box>
        </Box>

        {project.owner && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: "0.875rem",
                bgcolor: "primary.main",
              }}
            >
              {project.owner.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {project.owner.username}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Creado {new Date(project.createdAt).toLocaleDateString("es-MX")}
        </Typography>
      </CardActions>
    </Card>
  );
}
