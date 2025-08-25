import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { EventCard } from "./EventCard";
import { theme } from "../theme";
import sortSelect from "../assets/sortSelect.svg";
// import { useEffect, useState } from "react";

// type Event = {
//   title: "string";
//   description: "string";
//   date: "2025-08-25T12:56:52.794Z";
//   type: "string";
// };

const events = [
  {
    title: "Мафіозний марафон",
    description:
      "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
    date: "10 жовтня, 2025",
    img: "/assets/testEventImg.png",
  },
  {
    title: "Мафіозний марафон",
    description:
      "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
    date: "10 жовтня, 2025",
    img: "/assets/testEventImg.png",
  },
  {
    title: "Мафіозний марафон",
    description:
      "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
    date: "10 жовтня, 2025",
    img: "/assets/testEventImg.png",
  },
  {
    title: "Мафіозний марафон",
    description:
      "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
    date: "10 жовтня, 2025",
    img: "/assets/testEventImg.png",
  },
];

export const Events = () => {
  //   const [events, setEvents] = useState<Event[]>([]);

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:8000/events")
  //       .then((res) => res.json())
  //       .then(setEvents)
  //       .catch(console.log);
  //   }, []);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Пошук"
          sx={{
            width: "214px",
            height: "45px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.paper,
              borderRadius: "1000px",
              "& fieldset": {
                borderColor: "secondary", // 1px бордер
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#666",
              },
            },
            input: {
              color: "text.primary",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={sortSelect} alt="" />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <Button
          sx={{
            width: "91px",
            height: "40px",
            borderRadius: "1000px",
          }}
          variant="contained"
          onClick={() => {}}
        >
          <img src={sortSelect}></img>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "300px",
          marginTop: "80px",
        }}
      >
        {events.map((_, index) => (
          <EventCard key={index} />
        ))}
      </Box>
    </Box>
  );
};
