import { Box, Typography } from "@mui/material";
import smoke from "../assets/smoke.png";
import type { Event } from "../data/types";

export const EventCard = ({ event }: { event: Event }) => {
  const { title, description, date, imgUrl } = event;
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100%",
        minHeight: "308px",
        padding: 4,
        borderRadius: "12px",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderRadius: "12px",
          padding: "1px",
          background:
            "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0), transparent)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          maxWidth: "80%",
          fontWeight: 400,
        }}
      >
        {date}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: "50%",
          lineHeight: "140%",
        }}
      >
        {description}
      </Typography>

      <Box
        component="img"
        src={imgUrl}
        alt="eventImage"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 10,
          minWidth: "35%",
          maxWidth: "45%",
          maxHeight: "120%",
          objectFit: "contain",
        }}
      />

      <Box
        component="img"
        src={smoke}
        alt="smoke"
        sx={{
          position: "absolute",
          top: "-100%",
          left: "40%",
          width: "650px",
          height: "950px",
          transform: "rotateX(60deg)",
          opacity: 0.8,
        }}
      />

      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "100%",
          left: "75%",
          transform: "translate(-50%, -50%)",
          fontSize: "60px",
          color: "#FAECEA",
          textTransform: "uppercase",
          zIndex: 3,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
