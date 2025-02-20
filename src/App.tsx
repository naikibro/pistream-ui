import { useEffect, useState } from "react";
import axios from "axios";
import "video.js/dist/video-js.css";
import {
  Container,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Card,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import VideoPlayer from "./components/VideoPlayer";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.1.104:3001";

function App() {
  const [status, setStatus] = useState<
    "unknown" | "capturing" | "stopped" | "error"
  >("unknown");
  const [apiConnected, setApiConnected] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/status`);
      setStatus(res.data.status);
      if (!apiConnected) toast.success("✅ API Reconnected!");
      setApiConnected(true);
    } catch (error) {
      console.error("Error fetching status:", error);
      if (apiConnected) toast.error("❌ API Disconnected!");
      setApiConnected(false);
      setStatus("error");
    }
  };

  const handleStart = async () => {
    setLoading(true);
    toast
      .promise(
        axios.post(`${BASE_URL}/start`).then(() => setStatus("capturing")),
        {
          loading: "Starting capture...",
          success: "✅ Capture started!",
          error: "❌ Failed to start capture.",
        }
      )
      .finally(() => setLoading(false));
  };

  const handleStop = async () => {
    setLoading(true);
    toast
      .promise(
        axios.post(`${BASE_URL}/stop`).then(() => setStatus("stopped")),
        {
          loading: "Stopping capture...",
          success: "🛑 Capture stopped!",
          error: "❌ Failed to stop capture.",
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Toaster position="top-right" />
      <Typography variant="h4" gutterBottom>
        🎥 Pi Stream Dashboard
      </Typography>

      <Card sx={{ mb: 3, p: 2, background: "#f5f5f5", textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: apiConnected ? "green" : "red" }}
        >
          Current Status: {loading ? "Loading..." : <strong>{status}</strong>}
        </Typography>
        {loading && <CircularProgress size={30} />}
      </Card>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={!apiConnected || status === "capturing" || loading}
        >
          Start Stream
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleStop}
          disabled={!apiConnected || status === "stopped" || loading}
        >
          Stop Stream
        </Button>
      </Stack>

      {/* ✅ Video.js Player */}
      <VideoPlayer />
    </Container>
  );
}

export default App;
