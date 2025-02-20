import { useEffect } from "react";
import Hls from "hls.js";

function VideoPlayer() {
  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    const hlsUrl = `${import.meta.env.VITE_BASE_URL}/hls/index.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    }
  }, []);

  return <video id="video" controls></video>;
}

export default VideoPlayer;
