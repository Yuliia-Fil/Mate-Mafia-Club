import { Box } from "@mui/material";
import { RoleCardFlip } from "./RoleCardFlip";
import { useEffect, useState } from "react";
import { getData } from "../utils/fetch";
import { paths } from "../constants";
import type { RoleCard } from "../types";

export const GamePage = () => {
  const [cards, setCards] = useState<RoleCard[]>([]);

  useEffect(() => {
    getData(paths.CARDS_RANDOM, setCards);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))",
        gap: "24px",
        marginTop: "80px",
      }}
    >
      {cards.map((card) => (
        <RoleCardFlip card={card} key={card.id} />
      ))}
    </Box>
  );
};
