import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { theme } from "../data/theme";
import Logo from "../assets/logo.svg";
import MMC from "../assets/mmc.svg";
import Menu from "../assets/menu.svg?react";
import { navLinks } from "../data/constants";
import { useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { StartGameButton } from "./StartGameButton";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
            gap: "24px",
            justifyContent: "space-between",
            alignItems: {
              xs: "left",
              sm: "left",
              md: "center",
            },
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
            <img
              src={MMC}
              alt="MMC"
              style={{ height: "18px", width: "72px" }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              gap: "40px",
            }}
          >
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: {
                xs: "100%",
                sm: "100%",
                md: "fit-content",
              },
            }}
          >
            <IconButton
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                },
              }}
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </IconButton>
            <StartGameButton />
          </Box>
        </Box>
      </AppBar>
      <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};
