import { Box, Typography } from "@mui/material";
import { paths } from "../path";
import { useEffect, useState } from "react";

type Props = {
  path: string;
};

type Page = {
  path: string;
  title: string;
  subtitle: string;
};

const data = [
  {
    path: paths.EVENTS,
    title: "Події",
    subtitle: "Тут ви знайдете всі заплановані ігри та зустрічі клубу",
  },
  {
    path: paths.PLAYERS,
    title: "Гравці",
    subtitle: "Знайомтеся з гравцями та учасниками нашого клубу",
  },
  {
    path: paths.RULES,
    title: "Ролі",
    subtitle: "Кожна роль має унікальні можливості та впливає на перебіг гри",
  },
];

export const PageTitle = ({ path }: Props) => {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const currentPage = data.find((p) => p.path === path) || null;
    setPage(currentPage);
  }, [path]);

  return (
    page && (
      <Box
        sx={{
          marginBlock: "80px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Typography variant="h1">{page.title}</Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            width: "547px",
            textAlign: "center",
          }}
        >
          {page.subtitle}
        </Typography>
      </Box>
    )
  );
};
