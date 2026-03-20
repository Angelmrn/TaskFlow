import { Box } from "@mui/material";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />
      <Box component="main">{children}</Box>
    </Box>
  );
}
