import { useLocation } from "react-router-dom";
import style from "./BackgroundProvider.module.scss";
import { paths } from "../../path";
import { Box } from "@mui/material";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

type BackgroundProps = {
  children: React.ReactNode;
};

type Elips = {
  left: string;
  top: string;
};

const createElipses = (height: number): Elips[] => {
  const elCount = Math.floor(height / 250);

  const topR = 100;
  const topL = height * 0.12;
  const topM = height * 0.27;
  const topIncrement = 0.3 * height;
  const topMIncrement = 0.5 * height;

  const elipses = Array.from({ length: elCount }, (_, index) => {
    const n = (index + 3) % 3;
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

  console.log(elipses);

  return elipses;
};

export const BackgroundProvider = ({ children }: BackgroundProps) => {
  const currentPath = useLocation().pathname;
  const [elipses, setElipses] = useState<Elips[]>([]);
  let cl = "";
  const needElipses =
    currentPath !== paths.HOME && currentPath !== paths.PLAYERS;

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
