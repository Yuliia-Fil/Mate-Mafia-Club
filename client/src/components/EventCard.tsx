import { Box, Typography } from "@mui/material";
import smoke from "../assets/smoke.png";
import type { Event } from "../data/types";

export const EventCard = ({ event }: { event: Event }) => {
  const { title, description, date, imgUrl } = event;
  const dateObj = new Date(date);

  const dateUkr = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "24px", sm: "32px", md: "40px" },
        justifyContent: "space-evenly",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        marginTop: { xs: "85px", sm: "140px", md: "80px" },
        padding: { xs: 1.5, sm: 2, md: 4 },
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
          background: {
            xs: "linear-gradient(to top, rgba(255,255,255,0.4), transparent)",
            md: "linear-gradient(to right, rgba(255,255,255,0.4), transparent, transparent)",
          },
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
          fontSize: {
            xs: "14px",
            sm: "20px",
            md: "24px",
          },
        }}
      >
        {dateUkr}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: { sm: "100%", md: "50%" },
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
          bottom: {
            xs: "85%",
            sm: "80%",
            md: 0,
          },
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
          bottom: {
            xs: "30%",
            sm: 0,
            md: "-100%",
          },
          left: "50%",
          width: "55%",
          aspectRatio: 0.66,
          transform: "rotateX(60deg)",
          opacity: 0.7,
        }}
      />

      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: {
            xs: "15%",
            sm: "15%",
            md: "100%",
          },
          left: { xs: "75%", sm: "70%", md: "75%" },
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "20px", sm: "40px", md: "60px" },
          width: { xs: "55%", sm: "60%", md: "50%" },
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
