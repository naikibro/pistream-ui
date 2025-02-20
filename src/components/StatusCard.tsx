import { Box, Card, CircularProgress, Typography } from "@mui/material";

interface StatusCardProps {
  status: string;
  apiConnected: boolean;
  loading: boolean;
}

export default function StatusCard({
  status,
  apiConnected,
  loading,
}: StatusCardProps) {
  return (
    <Card
      sx={{
        mb: 3,
        p: { xs: 2, md: 3 },
        textAlign: "center",
        background: "#f5f5f5",
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: apiConnected ? "green" : "red",
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Current Status: {loading ? "Loading..." : <strong>{status}</strong>}
        </Typography>
        {loading && (
          <CircularProgress
            size={25}
            sx={{ ml: { md: 2 }, mt: { xs: 1, md: 0 } }}
          />
        )}
      </Box>
    </Card>
  );
}
