import { Avatar, Box, Typography } from "@mui/material";
import { testPlayer } from "../data/constants";
import type { Player } from "../data/types";

export const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <Box
      sx={{
        width: "210px",
        height: "280px",
        borderRadius: "12px",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 12px #0000001F",
        padding: "20px",
      }}
    >
      <Avatar
        sx={{
          width: "170px",
          height: "170px",
          marginBottom: "20px",
        }}
        alt={player.role}
        src={player.avatarUrl}
      ></Avatar>
      <Typography marginBottom="10px" fontSize="15px" fontWeight={600}>
        {player.role}
      </Typography>
      <Typography color="#C2C2C2" fontSize={"13px"}>
        {player.username}
      </Typography>
    </Box>
  );
};
