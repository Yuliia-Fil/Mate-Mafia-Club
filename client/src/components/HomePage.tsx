import { Box, Button, IconButton, Typography } from "@mui/material";
import facebook from "../assets/facebook.svg";
import telegram from "../assets/telegram.svg";
import instagram from "../assets/instagram.svg";
import { NavLink } from "react-router-dom";
import { paths } from "../path";

export const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      width="100%"
      height="100%"
      marginTop="150px"
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "45px",
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "100px",
            textTransform: "uppercase",
            letterSpacing: "5%",
          }}
        >
          Mate Mafia Club
        </Typography>
        <Typography variant="body2" display="block" width="55%">
          Збирайте друзів, створюйте кімнати та дізнайтесь, хто з вас справжній
          мафіозі.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        component={NavLink}
        to={paths.RULES}
        sx={{
          borderRadius: "1000px",
          textTransform: "none",
        }}
      >
        Дізнатися більше
      </Button>
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          position: "absolute",
          bottom: "40px",
        }}
      >
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 0 8px #ffffff80",
              transform: "scale(1.1)",
            },
          }}
        >
          <img
            src={facebook}
            alt={facebook}
            style={{ width: 24, height: 24 }}
          />
        </IconButton>

        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 0 8px #ffffff80",
              transform: "scale(1.1)",
            },
          }}
        >
          <img
            src={telegram}
            alt={telegram}
            style={{ width: 24, height: 24 }}
          />
        </IconButton>

        <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 0 8px #ffffff80",
              transform: "scale(1.1)",
            },
          }}
        >
          <img
            src={instagram}
            alt={instagram}
            style={{ width: 24, height: 24 }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
