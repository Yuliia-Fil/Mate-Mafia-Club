import { Box } from "@mui/material";
import { EventCard } from "./EventCard";

import { useEffect, useState } from "react";
import type { Event } from "../data/types";
import { getData } from "../utils/fetch";
import { paths } from "../data/constants";
import { SearchBar } from "./SearchBar";

export const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getData(paths.EVENTS, setEvents);
  }, []);

  return (
    <Box>
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "80px 0",
          gap: { xs: "140px", sm: "140px", md: "100px" },
        }}
      >
        {events.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
      </Box>
    </Box>
  );
};
