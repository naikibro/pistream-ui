import { Container, Typography, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useStream } from "./components/useStream";
import StatusCard from "./components/StatusCard";
import ControlButtons from "./components/ControlButtons";
import VideoPlayer from "./components/VideoPlayer";

export default function App() {
  const { status, apiConnected, loading, handleStart, handleStop } =
    useStream();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 6 }, // Responsive padding
      }}
    >
      <Toaster position="top-right" />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Responsive typography
      >
        Pi Stream
      </Typography>

      <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto" }}>
        <StatusCard
          status={status}
          apiConnected={apiConnected}
          loading={loading}
        />
        <ControlButtons
          status={status}
          apiConnected={apiConnected}
          loading={loading}
          handleStart={handleStart}
          handleStop={handleStop}
        />
        <VideoPlayer />
      </Box>
    </Container>
  );
}
