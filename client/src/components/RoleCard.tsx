import { Box, Typography } from "@mui/material";
import { testRole } from "../constants";

export const RoleCard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "292px",
        minWidth: "164px",
        aspectRatio: 1.5,
        background:
          "linear-gradient(180deg, #07070B00 0%, #07070BFF 100%), #1A1B1D",
        boxShadow: "0px 4px 12px #0000001F",
        borderRadius: "12px",
        paddingTop: "20%",
        paddingBottom: "10%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "60%",
          aspectRatio: 1,
          bgcolor: "#EEBCAF66",
          borderRadius: "100%",
          filter: "blur(30px)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        component="img"
        src={testRole.img}
        alt={testRole.title}
        sx={{
          zIndex: 2,
          position: "relative",
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
      ></Box>
      <Typography
        textAlign="center"
        variant="h2"
        color="#EEBCAF"
        fontSize="clamp(24px, 2vw, 28px)"
      >
        {testRole.title}
      </Typography>
      <Box
        sx={{
          display: "none",
        }}
      >
        {testRole.description}
      </Box>
    </Box>
  );
};
