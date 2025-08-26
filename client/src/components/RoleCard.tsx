import { Box, Typography } from "@mui/material";
import { testRole } from "../constants";

export const RoleCard = () => {
  return (
    <Box
      sx={{
        width: "292px",
        height: "447px",
        background:
          "linear-gradient(180deg, #07070B00 0%, #07070BFF 100%), #1A1B1D",
        boxShadow: "0px 4px 12px #0000001F",
        borderRadius: "12px",
        paddingTop: "64px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "170px",
          height: "170px",
          bgcolor: "#EEBCAF66",
          borderRadius: "100%",
          filter: "blur(30px)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          zIndex: 2,
          position: "relative",
        }}
      >
        <img src={testRole.img} alt={testRole.title} />
      </Box>
      <Typography
        textAlign="center"
        variant="h2"
        color="#EEBCAF"
        fontSize="28px"
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
