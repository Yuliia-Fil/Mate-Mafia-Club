import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { pageTitles } from "../data/constants";

type Props = {
  path: string;
};

type Page = {
  path: string;
  title: string;
  subtitle: string;
};

export const PageTitle = ({ path }: Props) => {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const currentPage = pageTitles.find((p) => p.path === path) || null;
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
            lineHeight: 1.4,
          }}
        >
          {page.subtitle}
        </Typography>
      </Box>
    )
  );
};
