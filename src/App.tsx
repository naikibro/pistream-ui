import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Button, Typography, Stack } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function App() {
  const [status, setStatus] = useState<
    "unknown" | "capturing" | "stopped" | "error"
  >("unknown");
  const [imageUrl, setImageUrl] = useState(
    `${BASE_URL}/image?timestamp=${Date.now()}`
  );
  const [apiConnected, setApiConnected] = useState(true);

  // Keep track of previous API status
  const prevApiConnected = useRef<boolean>(true);

  useEffect(() => {
    checkStatus();

    const imageInterval = setInterval(() => {
      setImageUrl(`${BASE_URL}/image?timestamp=${Date.now()}`);
    }, 3000);

    const statusInterval = setInterval(checkStatus, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/status`);
      const newStatus = res.data.status;

      if (!prevApiConnected.current) {
        toast.success("✅ API Reconnected!");
      }

      prevApiConnected.current = true;
      setApiConnected(true);
      setStatus(newStatus);
    } catch (error) {
      console.error("Error fetching status:", error);

      if (prevApiConnected.current) {
        toast.error("❌ API Disconnected!");
      }

      prevApiConnected.current = false;
      setApiConnected(false);
      setStatus("error");
    }
  };

  const handleStart = async () => {
    toast.promise(
      axios.post(`${BASE_URL}/start`).then(() => {
        setStatus("capturing");
      }),
      {
        loading: "Starting capture...",
        success: "✅ Capture started!",
        error: "❌ Failed to start capture.",
      }
    );
  };

  const handleStop = async () => {
    toast.promise(
      axios.post(`${BASE_URL}/stop`).then(() => {
        setStatus("stopped");
      }),
      {
        loading: "Stopping capture...",
        success: "🛑 Capture stopped!",
        error: "❌ Failed to stop capture.",
      }
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Toaster position="top-right" />
      <Typography variant="h4" gutterBottom>
        Image Capture Dashboard
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, color: apiConnected ? "inherit" : "red" }}
      >
        Current Status: <strong>{status}</strong>
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={!apiConnected || status === "capturing"}
        >
          Start Capture
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleStop}
          disabled={!apiConnected || status === "stopped"}
        >
          Stop Capture
        </Button>
      </Stack>

      {/* Show the latest image if capturing */}
      {status === "capturing" && (
        <img
          key={imageUrl}
          src={imageUrl}
          alt="Latest Capture"
          width="640"
          height="360"
          style={{ border: "1px solid #ccc", background: "black" }}
        />
      )}
    </Container>
  );
}

export default App;
