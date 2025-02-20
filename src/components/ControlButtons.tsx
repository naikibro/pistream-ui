import { Button, Stack } from "@mui/material";

interface ControlButtonsProps {
  status: string;
  apiConnected: boolean;
  loading: boolean;
  handleStart: () => void;
  handleStop: () => void;
}

export default function ControlButtons({
  status,
  apiConnected,
  loading,
  handleStart,
  handleStop,
}: ControlButtonsProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 3 }}
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 3, width: "100%" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleStart}
        disabled={!apiConnected || status === "capturing" || loading}
        sx={{
          width: { xs: "100%", sm: "auto" },
          maxWidth: "250px",
        }}
      >
        Start Stream
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleStop}
        disabled={!apiConnected || status === "stopped" || loading}
        sx={{
          width: { xs: "100%", sm: "auto" },
          maxWidth: "250px",
        }}
      >
        Stop Stream
      </Button>
    </Stack>
  );
}
