import { useState } from "react";
import { RoleCardBack } from "../RoleCard/RoleCardBack";
import { RoleCardFront } from "../RoleCard/RoleCardFront";
import type { RoleCard } from "../../data/types";

export const RoleCardFlip = ({ card }: { card: RoleCard }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{
        perspective: "1000px",
        cursor: !flipped ? "pointer" : "default",
      }}
      onClick={() => {
        if (!flipped) {
          setFlipped(true);
        }
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <RoleCardBack />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <RoleCardFront card={card} activeIndex={13} />
        </div>
      </div>
    </div>
  );
};
