import { Box, Button, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { iconLinks, paths } from "../data/constants";
import ArrowRight from "../assets/arrowright.svg?react";

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        paddingBottom: { xs: "80px", sm: "56px", md: "40px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: "32px", sm: "40px", md: "40px" },
          flexDirection: "column",
          alignItems: "center",
          margin: "auto 0",
        }}
      >
        <Typography
          variant="inherit"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: "56px", sm: "75px", md: "100px" },
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "5%",
            textAlign: "center",
          }}
        >
          Mate Mafia Club
        </Typography>
        <Typography
          variant="body2"
          display="block"
          width="60%"
          textAlign="center"
        >
          Збирайте друзів, створюйте кімнати та дізнайтесь, хто з вас справжній
          мафіозі.
        </Typography>
        <Button
          variant="text"
          color="primary"
          component={NavLink}
          to={paths.RULES}
          sx={{
            borderRadius: "1000px",
            textTransform: "none",
            marginTop: "8px",
            fontSize: "18px",
            lineHeight: "24px",
            display: "flex",
            gap: "16px",
            padding: "20px",
          }}
        >
          Дізнатися більше
          <ArrowRight />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "24px",
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
