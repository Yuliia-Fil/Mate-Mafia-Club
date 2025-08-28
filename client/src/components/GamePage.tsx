import { Box } from "@mui/material";
import { RoleCardFlip } from "./RoleCardFlip";

export const GamePage = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))",
        gap: "24px",
        marginTop: "80px",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
        <RoleCardFlip key={el} />
      ))}
    </Box>
  );
};
