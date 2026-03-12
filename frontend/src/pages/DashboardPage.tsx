import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Add, FolderOpen, Assignment, People } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { getMyProjects } from "../api/projects.ts";
import type { Project } from "../api/projects.ts";
import ProjectCard from "../../src/components/projects/ProjectCard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    loadProjects();
  };

  const stats = {
    totalProjects: projects.length,
    ownedProjects: projects.filter((p) => p.ownerId === user?.id).length,
    memberProjects: projects.filter((p) => p.ownerId !== user?.id).length,
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Cargando proyectos...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              ¡Bienvenido, {user?.username}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gestiona tus proyectos y tareas en un solo lugar
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
              },
            }}
          >
            Nuevo Proyecto
          </Button>
        </Box>
      </Box>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {stats.totalProjects}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Proyectos
                </Typography>
              </Box>
              <FolderOpen sx={{ fontSize: 48, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {stats.ownedProjects}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Creados por mí
                </Typography>
              </Box>
              <People sx={{ fontSize: 48, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {stats.memberProjects}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Como Miembro
                </Typography>
              </Box>
              <People sx={{ fontSize: 48, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Assignment sx={{ fontSize: 48, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "2px dashed",
            borderColor: "divider",
          }}
        >
          <FolderOpen sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            No tienes proyectos aún
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Crea tu primer proyecto para comenzar a organizar tus tareas
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
          >
            Crear Primer Proyecto
          </Button>
        </Box>
      ) : (
        <>
          {/* Sección: Mis Proyectos */}
          {stats.ownedProjects > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Mis Proyectos
                </Typography>
                <Chip
                  label={stats.ownedProjects}
                  color="primary"
                  size="small"
                />
              </Box>

              {projects
                .filter((p) => p.ownerId === user?.id)
                .map((project) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
            </Box>
          )}

          {/* Sección: Proyectos Compartidos */}
          {stats.memberProjects > 0 && (
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Proyectos Compartidos
                </Typography>
                <Chip
                  label={stats.memberProjects}
                  color="secondary"
                  size="small"
                />
              </Box>

              {projects
                .filter((p) => p.ownerId !== user?.id)
                .map((project) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
            </Box>
          )}
        </>
      )}

      {/* Modal Crear Proyecto */}
    </Container>
  );
}
