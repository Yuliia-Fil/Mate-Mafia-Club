import { Button } from "@mui/material";
import { paths } from "../data/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../data/theme";

export const StartGameButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === paths.GAME) {
      window.location.reload();
    } else {
      navigate(paths.GAME);
    }
  };

  return (
    <Button
      onClick={handleClick}
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
      {location.pathname === paths.GAME ? "Завершити гру" : "Почати гру"}
    </Button>
  );
};
