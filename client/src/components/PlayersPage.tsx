import { Box } from "@mui/material";
import { PlayerCard } from "./PlayerCard";
import { useEffect, useState } from "react";
import type { Player } from "../data/types";
import { getData } from "../utils/fetch";
import { paths } from "../data/constants";
import { SearchBar } from "./SearchBar";

export const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getData(paths.PLAYERS, setPlayers);
  }, []);
  return (
    <Box>
      <SearchBar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          columnGap: "16px",
          rowGap: "40px",
          marginTop: "40px",
        }}
      >
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </Box>
    </Box>
  );
};
