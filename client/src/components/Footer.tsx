import { AppBar, Box, IconButton, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { theme } from "../data/theme";
import Logo from "../assets/logo.svg";
import MMC from "../assets/mmc.svg";
import { iconLinks, navLinks, paths } from "../data/constants";

export const Footer = ({ path }: { path: string }) => {
  if (path === paths.HOME) {
    return;
  }
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #ffffff80",
          paddingBlock: { xs: "18px", sm: "56px" },
          marginTop: { xs: "48px", sm: "120px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: { xs: 1, sm: 1, md: "unset" },
          }}
        >
          <NavLink to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "21px", width: "24px" }}
            />
          </NavLink>
          <img src={MMC} alt="MMC" style={{ height: "18px", width: "72px" }} />
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            gap: "32px",
            flex: { xs: 1, sm: 1, md: "unset" },
            justifyContent: "center",
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "18px",
                  fontWeight: 300,
                  "&:hover": {
                    textDecoration: "underline",
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
            gap: "24px",
            flex: { xs: 1, sm: 1, md: "unset" },
            justifyContent: "center",
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
                  color: "text.secondary",
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
        <Link
          href="https://maps.app.goo.gl/poUam3pb8SnMtidJ6"
          underline="hover"
          color="text.secondary"
          flex="1"
          display={"flex"}
          justifyContent={"right"}
          sx={{ flex: { xs: 1, sm: 1, md: "unset" } }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: { xs: "14px", sm: "14px", md: "18px" } }}
          >
            м. Київ, Мафіозний узвіз, 13
          </Typography>
        </Link>
      </Box>
    </AppBar>
  );
};
