import { Box, Typography } from "@mui/material";
import { PlayerCard } from "./PlayerCard";
import { useEffect, useMemo, useState } from "react";
import type { Player } from "../data/types";
import { getData } from "../utils/fetch";
import { paths } from "../data/constants";
import { SearchBar } from "./SearchBar";
import { useSearchParams } from "react-router-dom";

export const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getData(paths.PLAYERS, setPlayers);
  }, []);

  const sortedAndFilterPlayers = useMemo(() => {
    const sortField = searchParams.get("players_sort");
    const queryField = searchParams.get("players_query");
    let sortedAndFilteredPlayers = [...players];

    if (queryField) {
      sortedAndFilteredPlayers = sortedAndFilteredPlayers.filter(
        (p) =>
          p.name.toLowerCase().includes(queryField) ||
          p.username.toLowerCase().includes(queryField)
      );
    }

    if (sortField) {
      sortedAndFilteredPlayers.sort((p1, p2) => {
        switch (sortField) {
          case "ascName":
            return p1.name.localeCompare(p2.name);
          case "descName":
            return p2.name.localeCompare(p1.name);
          case "ascNick":
            return p1.username.localeCompare(p2.username);
          case "descNick":
            return p2.username.localeCompare(p1.username);
          default:
            return 0;
        }
      });
    }

    return sortedAndFilteredPlayers;
  }, [players, searchParams]);

  return (
    <Box>
      <SearchBar pageKey="players" />
      {sortedAndFilterPlayers.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            columnGap: "16px",
            rowGap: { xs: "16px", sm: "24px", md: "32px" },
            marginTop: { xs: "32px", sm: "40px" },
          }}
        >
          {sortedAndFilterPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", marginTop: "24px" }}
        >
          Гравців за заданими вами параметрами не знайдено
        </Typography>
      )}
    </Box>
  );
};
