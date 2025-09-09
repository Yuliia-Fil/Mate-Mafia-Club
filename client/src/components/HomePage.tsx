import { Box, Button, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { iconLinks, paths } from "../data/constants";

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
        {iconLinks.map(({ href, Icon }) => {
          return (
            <IconButton
              key={href}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: "all 0.3s ease",
                fontSize: "24px",
                color: "white",
                padding: 0,
                "&:hover": {
                  boxShadow: "0 0 8px #ffffff80",
                  transform: "scale(1.1)",
                },
              }}
            >
              <Icon />
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
};
