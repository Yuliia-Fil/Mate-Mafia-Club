import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { theme } from "../theme";
import search from "../assets/search.svg";
import sortSelect from "../assets/sortSelect.svg";
import { PlayerCard } from "./PlayerCard";
import { useEffect, useState } from "react";
import type { Player } from "../types";
import { getData } from "../utils/fetch";
import { paths } from "../constants";

export const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getData(paths.PLAYERS, setPlayers);
  }, []);
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          columnGap: "16px",
          rowGap: "40px",
          marginTop: "40px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <PlayerCard key={index} />
        ))}
      </Box>
    </Box>
  );
};
