import { AppBar, Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { theme } from "../theme";
import Logo from "../assets/logo.svg";
import MMC from "../assets/mmc.svg";

const navLinks = [
  { title: "Події", href: "/events" },
  { title: "Правила та ролі", href: "/rules" },
  { title: "Гравці", href: "/players" },
];

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        padding: "48px 160px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <NavLink to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "21px", width: "24px" }}
            />
          </NavLink>
          <img src={MMC} alt="MMC" style={{ height: "18px", width: "72px" }} />
        </Box>

        <Box sx={{ display: "flex", gap: "40px" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              style={{ textDecoration: "none" }}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Typography
                className="active"
                sx={{
                  position: "relative",
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "18px",
                  fontWeight: 300,
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    transition: "width 0.3s ease",
                    bottom: "-12px",
                    width: 0,
                    height: "1px",
                    backgroundColor: theme.palette.text.primary,
                  },
                  "&:hover::after": {
                    width: "42px",
                  },
                }}
              >
                {link.title}
              </Typography>
            </NavLink>
          ))}
        </Box>

        <Button
          component={NavLink}
          to="/game"
          sx={{
            textTransform: "none",
            bgcolor: theme.palette.action.active,
            width: "162px",
            height: "42px",
            color: theme.palette.text.primary,
            borderRadius: "10000px",
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          Почати гру
        </Button>
      </Box>
    </AppBar>
  );
};
