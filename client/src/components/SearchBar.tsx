import { Box, Button } from "@mui/material";
import { theme } from "../data/theme";
import { useState } from "react";
import SortIcon from "../assets/sortIcon.svg?react";
import FilterIcon from "../assets/filterIcon.svg?react";
import { useLocation } from "react-router-dom";
import { eventsSortFields, paths, playersSortFields } from "../data/constants";
import { SortMenu } from "./SortMenu";
import { FilterMenu } from "./FilterMenu";
import type { PageKey } from "../data/types";
import { QueryMenu } from "./QueryMenu";

export const SearchBar = ({ pageKey }: { pageKey: PageKey }) => {
  const currentPath = useLocation().pathname;
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <QueryMenu pageKey={pageKey} />
      <Box
        sx={{
          display: "flex",
          gap: { xs: "16px", sm: "40px" },
        }}
      >
        {currentPath === paths.EVENTS && (
          <Box
            sx={{
              position: "relative",
              maxWidth: "50%",
            }}
          >
            <Button
              sx={{
                width: "91px",
                maxWidth: "calc(100%-8px)",
                height: "40px",
                borderRadius: "1000px",
                border: `1px solid ${theme.palette.text.secondary}`,
                backgroundColor: filterOpen
                  ? "#FFFFFF"
                  : theme.palette.background.paper,
              }}
              variant="contained"
              onClick={() => {
                setFilterOpen((p) => !p);
                setSortOpen(false);
              }}
            >
              <FilterIcon
                style={{
                  color: filterOpen ? "black" : "white",
                }}
              />
            </Button>
            {filterOpen && (
              <FilterMenu pageKey={pageKey} setFilterOpen={setFilterOpen} />
            )}
          </Box>
        )}
        <Box
          sx={{
            position: "relative",
            maxWidth: "50%",
          }}
        >
          <Button
            sx={{
              width: "91px",
              maxWidth: "calc(100%-8px)",
              height: "40px",
              borderRadius: "1000px",
              backgroundColor: sortOpen
                ? "#FFFFFF"
                : theme.palette.background.paper,
              border: `1px solid ${theme.palette.text.secondary}`,
            }}
            variant="contained"
            onClick={() => {
              setFilterOpen(false);
              setSortOpen((p) => !p);
            }}
          >
            <SortIcon
              style={{
                color: sortOpen ? "black" : "white",
              }}
            />
          </Button>
          {sortOpen && (
            <SortMenu
              forms={
                currentPath === paths.EVENTS
                  ? eventsSortFields
                  : playersSortFields
              }
              setSortOpen={setSortOpen}
              pageKey={pageKey}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
