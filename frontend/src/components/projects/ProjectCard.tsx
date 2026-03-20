import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FolderOpen, MoreVert, People, Delete } from "@mui/icons-material";
import type { Project } from "../../api/projects";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../deleteModal";

interface Props {
  project: Project;
  onDelete?: (id: number) => void;
}

export default function ProjectCard({ project, onDelete }: Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    onDelete?.(project.id);
    setDeleteModalOpen(false);
  };
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
          background: "background.paper",
          borderTop: `4px solid ${project.color || "#8b5cf6"}`,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${project.color || "#8b5cf6"} 0%, ${project.color || "#ec4899"} 100%)`,
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            overflow: "hidden",
          }}
        >
          <FolderOpen sx={{ flexShrink: 0 }} />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {project.name}
          </Typography>
          <IconButton
            size="small"
            sx={{ color: "white" }}
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={handleDeleteClick}>
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Eliminar proyecto</ListItemText>
            </MenuItem>
          </Menu>
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
                {project._count?.task || 0}
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
              <Typography variant="caption" color="text.secondary">
                Owner: {project.owner.username}
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
      <DeleteDialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="¿Eliminar proyecto?"
        itemName={project.name}
        description={`Estás a punto de eliminar ${project.name}. Esta acción no se puede deshacer.`}
      />
    </>
  );
}
