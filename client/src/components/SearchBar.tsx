import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { theme } from "../data/theme";
import { useState } from "react";
import SortIcon from "../assets/sortIcon.svg?react";
import FilterIcon from "../assets/filterIcon.svg?react";
import search from "../assets/search.svg";
import { useLocation } from "react-router-dom";
import { eventsSortFields, paths, playersSortFields } from "../data/constants";
import { SortMenu } from "./SortMenu";
import { FilterMenu } from "./FilterMenu";

export const SearchBar = () => {
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
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Пошук..."
        sx={{
          width: "214px",
          "& .MuiOutlinedInput-root": {
            height: "45px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "1000px",
            boxSizing: "border-box",
            "& fieldset": {
              borderColor: theme.palette.text.secondary,
            },
            "& input": {
              padding: "0 8px",
              color: theme.palette.text.primary,
              "&::placeholder": {
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: theme.palette.text.primary,
                opacity: 1,
              },
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={search} />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex">
        {currentPath === paths.EVENTS && (
          <Box position="relative">
            <Button
              sx={{
                width: "91px",
                height: "40px",
                borderRadius: "1000px",
                marginRight: "40px",
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
            {filterOpen && <FilterMenu setFilterOpen={setFilterOpen} />}
          </Box>
        )}
        <Box position="relative">
          <Button
            sx={{
              width: "91px",
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
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
