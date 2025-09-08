import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../utils/fetch";
import { paths } from "../data/constants";
import type { RoleCard } from "../data/types";
import { RoleCardFlip } from "./RoleCard/RoleCardFlip";

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
      {cards.map((card, i) => (
        <RoleCardFlip card={card} key={i} />
      ))}
    </Box>
  );
};
