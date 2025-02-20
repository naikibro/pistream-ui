import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.1.104:3001";

export function useStream() {
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

  return { status, apiConnected, loading, handleStart, handleStop };
}
