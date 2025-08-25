import { Box, Typography } from "@mui/material";
import testEventImg from "../assets/testEventImg.png";
import smoke from "../assets/smoke.png";
import { theme } from "../theme";

// type Event = {
//     title: string,
//     description: string,
//     date: string,
//     img: string,
// }

const testEvent = {
  title: "Мафіозний марафон",
  description:
    "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
  date: "10 жовтня, 2025",
  img: "/assets/testEventImg.png",
};

export const EventCard = () => {
  const { title, description, date } = testEvent;
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
        padding: 4,
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
        }}
      >
        {description}
      </Typography>

      <Box
        component="img"
        src={testEventImg}
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
          maxWidth: "50%",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
