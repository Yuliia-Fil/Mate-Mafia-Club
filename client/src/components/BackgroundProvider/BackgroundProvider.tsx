import { useLocation } from "react-router-dom";
import style from "./BackgroundProvider.module.scss";
import { Box } from "@mui/material";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import { paths } from "../../constants";

type BackgroundProps = {
  children: React.ReactNode;
};

type Elips = {
  left: string;
  top: string;
};

const createElipses = (height: number): Elips[] => {
  const elCount = Math.floor(height / 400);

  const topR = 100;
  const topL = Math.max(height * 0.1, 650);
  const topM = height * 0.2;
  const topIncrement = 0.2 * height;
  const topMIncrement = 0.3 * height;

  const elipses = Array.from({ length: elCount }, (_, index) => {
    const n = index % 3;
    const k = Math.floor(index / 3);

    if (n === 0) {
      return {
        top: topR + topIncrement * k + "px",
        left: "80%",
      };
    }
    if (n === 1) {
      return {
        top: topL + topIncrement * k + "px",
        left: "1%",
      };
    } else {
      return {
        top: topM + topMIncrement * k + "px",
        left: "18%",
      };
    }
  });

  return elipses;
};

export const BackgroundProvider = ({ children }: BackgroundProps) => {
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
    case paths.GAME:
      cl = "game";
      break;
    case paths.PLAYERS:
      cl = "players";
      break;
    case paths.RULES:
      cl = "rules";
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
