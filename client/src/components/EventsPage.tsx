import { Box, Typography } from "@mui/material";
import { EventCard } from "./EventCard";

import { useEffect, useMemo, useState } from "react";
import type { Event } from "../data/types";
import { getData } from "../utils/fetch";
import { paths } from "../data/constants";
import { SearchBar } from "./SearchBar";
import { useSearchParams } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getData(paths.EVENTS, setEvents);
  }, []);

  const sortedAndFilteredEvents = useMemo(() => {
    const sortField = searchParams.get("events_sort");
    const queryField = searchParams.get("events_query");
    const filterFields = searchParams.getAll("events_filter");
    const typeFilters = filterFields.filter((f) => f.includes("type_"));
    const dateFilters = filterFields.filter((f) => f.includes("date_"));

    let resultEvents = [...events];

    if (queryField) {
      resultEvents = resultEvents.filter(
        (e) =>
          e.description.toLowerCase().includes(queryField) ||
          e.title.toLowerCase().includes(queryField)
      );
    }

    if (sortField) {
      resultEvents.sort((e1, e2) => {
        const date1 = new Date(e1.date).getTime();
        const date2 = new Date(e2.date).getTime();

        switch (sortField) {
          case "new":
            return date1 - date2;
          case "old":
            return date2 - date1;
          default:
            return 0;
        }
      });
    }

    if (typeFilters.length > 0) {
      resultEvents = resultEvents.filter((e) =>
        typeFilters.some((el) => el.includes(e.type))
      );
    }

    if (dateFilters.length > 0) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();

      const startOfWeek = new Date(today);
      startOfWeek.setDate(day - today.getDay() + 1);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      dateFilters.forEach((filter) => {
        switch (filter) {
          case "date_day":
            resultEvents = resultEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day
              );
            });
            break;

          case "date_week":
            resultEvents = resultEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return eventDate >= startOfWeek && eventDate <= endOfWeek;
            });
            break;

          case "date_month":
            resultEvents = resultEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month
              );
            });
            break;
        }
      });
    }

    return resultEvents;
  }, [events, searchParams]);

  return (
    <Box>
      <SearchBar pageKey="events" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "80px 0",
          gap: { xs: "140px", sm: "140px", md: "100px" },
        }}
      >
        {sortedAndFilteredEvents.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
        {sortedAndFilteredEvents.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: "48px" }}
          >
            Подій за заданими вами параметрами не знайдено
          </Typography>
        )}
      </Box>
    </Box>
  );
};
