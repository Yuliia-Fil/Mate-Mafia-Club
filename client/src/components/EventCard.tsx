import { Box, Typography } from "@mui/material";
import smoke from "../assets/smoke.png";
import { theme } from "../theme";
import type { Event } from "../types";

export const EventCard = ({ event }: { event: Event }) => {
  const { title, description, date, imgUrl } = event;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "914px",
        minHeight: "308px",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.text.secondary}`,
        borderRight: "none",
        padding: 4,

        // "&::before, &::after": {
        //   content: '""',
        //   position: "absolute",
        //   left: "30%",
        //   width: "50%",
        //   height: "11px",
        //   background: `${theme.palette.background.default}`,
        // },
        // "&::before": { top: -1 },
        // "&::after": { bottom: -1 },
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
          bottom: 10,
          right: 10,
          width: "450px",
          height: "350px",
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
