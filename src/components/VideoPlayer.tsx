import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Box } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.1.104:3000";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const hlsUrl = `${BASE_URL}/hls/index.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => console.error("Autoplay failed:", error));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl; // Safari fallback
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 3,
      }}
    >
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", maxWidth: "800px", borderRadius: "10px" }}
      />
    </Box>
  );
}
