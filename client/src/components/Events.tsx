import { Box, Select, TextField } from "@mui/material";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";
type Event = {
  title: "string";
  description: "string";
  date: "2025-08-25T12:56:52.794Z";
  type: "string";
};

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.log);
  }, []);

  return (
    <Box>
      <Box>
        <TextField></TextField>
        <Select></Select>
      </Box>
      <Box>
        {events.map(() => (
          <EventCard />
        ))}
      </Box>
    </Box>
  );
};
