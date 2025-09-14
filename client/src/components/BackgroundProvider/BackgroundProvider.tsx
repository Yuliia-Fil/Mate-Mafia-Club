import { useLocation } from "react-router-dom";
import style from "./BackgroundProvider.module.scss";
import { Box } from "@mui/material";
import { theme } from "../../data/theme";
import { useEffect, useState } from "react";
import { paths } from "../../data/constants";
import type { Elips } from "../../data/types";
import { createElipses } from "../../utils/createElipses";

export const BackgroundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentPath = useLocation().pathname;
  const [elipses, setElipses] = useState<Elips[]>([]);
  let cl = "";
  const needElipses = currentPath !== paths.HOME;

  switch (currentPath) {
    case paths.HOME:
      cl = "home";
      break;
    case paths.EVENTS:
      cl = "events";
      break;
  }

  useEffect(() => {
    setElipses(createElipses(document.documentElement.scrollHeight));
  }, [currentPath]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setElipses(createElipses(document.documentElement.scrollHeight));
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      className={style[cl]}
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {needElipses &&
        elipses.map((el) => (
          <Box
            key={el.top}
            sx={{
              position: "absolute",
              top: el.top,
              left: el.left,
              width: "300px",
              height: "250px",
              bgcolor: "#EEBCAF66",
              borderRadius: "100%",
              filter: "blur(150px)",
            }}
          ></Box>
        ))}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1300px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: {
            xs: "48px 16px 0",
            sm: "48px 32px 0",
            md: "48px 60px 0",
          },
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
