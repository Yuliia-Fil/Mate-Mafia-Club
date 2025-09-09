import { Box, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";

export const RoleCardBack = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "292px",
        minWidth: "164px",
        aspectRatio: 2 / 2.85,
        minHeight: "256px",
        bgcolor: "#1A1B1D",
        boxShadow: "0px 4px 12px #0000001F",
        borderRadius: "12px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "30%",
          width: "55%",
          aspectRatio: 1,
          bgcolor: "#EEBCAF66",
          borderRadius: "100%",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            zIndex: 2,
            position: "relative",
            width: "32px",
            height: "34px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.05%",
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "18px !important",
          }}
        >
          Mate Mafia <br />
          Club
        </Typography>
      </Box>
    </Box>
  );
};
