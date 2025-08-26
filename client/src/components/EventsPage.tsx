import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { EventCard } from "./EventCard";
import { theme } from "../theme";
import sortSelect from "../assets/sortSelect.svg";
import search from "../assets/search.svg";

// import { useEffect, useState } from "react";

// type Event = {
//   title: "string";
//   description: "string";
//   date: "2025-08-25T12:56:52.794Z";
//   type: "string";
// };

export const Events = () => {
  //   const [events, setEvents] = useState<Event[]>([]);

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:8000/events")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res);
  //         setEvents(res);
  //       })
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
          placeholder="Пошук..."
          sx={{
            width: "214px",
            "& .MuiOutlinedInput-root": {
              height: "45px",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "1000px",
              boxSizing: "border-box",
              "& fieldset": {
                borderColor: theme.palette.text.secondary,
              },
              "& input": {
                padding: "0 8px",
                color: theme.palette.text.primary,
                "&::placeholder": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: theme.palette.text.primary,
                  opacity: 1,
                },
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={search} />
              </InputAdornment>
            ),
          }}
        />

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
          margin: "80px 0",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <EventCard key={index} />
        ))}
      </Box>
    </Box>
  );
};
