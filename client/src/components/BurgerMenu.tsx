import { Box, Drawer, IconButton, List, Typography } from "@mui/material";
import { theme } from "../data/theme";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/constants";
import CloseIcon from "../assets/closeIcon.svg?react";
import Logo from "../assets/logo.svg";
import MMC from "../assets/mmc.svg";

export const BurgerMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
      <Box
        sx={{
          width: "100vw",
          bgcolor: theme.palette.background.default,
          height: "100%",
          padding: { xs: "48px 16px", sm: "48px 32px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        role="presentation"
        onClick={() => setMenuOpen(false)}
      >
        <Box
          sx={{
            width: "100%",
            pb: "24px",
            borderBottom: "1px solid #FFFFFF29",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
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
          <IconButton
            sx={{ marginRight: "auto" }}
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ mt: "60px" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              style={{
                display: "block",
                textDecoration: "none",
                marginTop: "16px",
                padding: "12px 24px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "18px",
                  fontWeight: 300,
                }}
              >
                {link.title}
              </Typography>
            </NavLink>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
