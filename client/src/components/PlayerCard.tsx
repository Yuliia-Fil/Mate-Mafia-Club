import { Avatar, Box, Typography } from "@mui/material";
import type { Player } from "../data/types";

export const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "240px",
        minWidth: "190px",
        borderRadius: "12px",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 12px #0000001F",
        padding: "20px 20px 28px",
        margin: "0 auto",
      }}
    >
      <Avatar
        sx={{
          width: "90%",
          height: "auto",
          aspectRatio: 1,
          margin: "0 auto 20px",
        }}
        alt={player.name}
        src={player.avatarUrl}
      ></Avatar>
      <Box>
        <Typography marginBottom="10px" fontSize="15px" fontWeight={600}>
          {player.name}
        </Typography>
        <Typography color="#C2C2C2" fontSize={"13px"}>
          {player.username}
        </Typography>
      </Box>
    </Box>
  );
};
