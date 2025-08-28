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
    const height = document.documentElement.scrollHeight;

    setElipses(createElipses(height));
  }, [currentPath]);

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
          maxWidth: "1122px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "48px 80px 0",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
