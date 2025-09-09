import { useState } from "react";
import { RoleCardBack } from "../RoleCard/RoleCardBack";
import { RoleCardFront } from "../RoleCard/RoleCardFront";
import type { RoleCard } from "../../data/types";
import { Box } from "@mui/material";

export const RoleCardFlip = ({ card }: { card: RoleCard }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <Box
      sx={{
        perspective: "1000px",
        cursor: !flipped ? "pointer" : "default",
        margin: "0 auto",
        width: "100%",
      }}
      onClick={() => {
        if (!flipped) {
          setFlipped(true);
        }
      }}
    >
      <Box
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <RoleCardBack />

        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <RoleCardFront card={card} activeIndex={13} />
        </Box>
      </Box>
    </Box>
  );
};
