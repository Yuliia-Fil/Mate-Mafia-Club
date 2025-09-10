import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { theme } from "../data/theme";
import FilterIcon from "../assets/filterIcon.svg?react";
import CloseIcon from "../assets/closeIcon.svg?react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { eventsFilterFields } from "../data/constants";
import { useSearchParams } from "react-router-dom";
import type { PageKey } from "../data/types";

export const FilterMenu = ({
  setFilterOpen,
  pageKey,
}: {
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
  pageKey: PageKey;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState(
    searchParams.getAll(`${pageKey}_filter`)
  );

  const handleOk = () => {
    const newParams = new URLSearchParams(searchParams);
    selectedValues.forEach((value) => {
      if (!newParams.has(`${pageKey}_filter`, value)) {
        newParams.append(`${pageKey}_filter`, value);
      }
    });
    setSearchParams(newParams);
    setFilterOpen(false);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(`${pageKey}_filter`);
    setSearchParams(newParams);
    setSelectedValues([]);
    setFilterOpen(false);
  };

  const handleChange = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues((prev) => prev.filter((el) => el !== value));
    } else {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.push(value);
      setSelectedValues(newSelectedValues);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        width: "244px",
        position: "absolute",
        right: 0,
        transform: "translateX(-20%)",
        top: "56px",
        zIndex: 10,
        padding: "24px",
        borderRadius: "12px",
        borderTopRightRadius: 0,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.text.secondary}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: "16px",
          borderBottom: `1px solid ${theme.palette.text.secondary}`,
        }}
      >
        <FilterIcon
          style={{
            color: "white",
          }}
        />
        <Typography variant="button">Фільтр</Typography>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFilterOpen(false);
          }}
        />
      </Box>
      {eventsFilterFields.map((f) => {
        return (
          <FormGroup
            sx={{
              borderBottom: `1px solid ${theme.palette.text.secondary}`,
              padding: "0 16px 16px",
              gap: "8px",
            }}
          >
            <FormLabel id="filter" sx={{ fontSize: "16px" }}>
              {f.label}
            </FormLabel>
            {f.options.map((o) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedValues.includes(o.value)}
                    onChange={() => handleChange(o.value)}
                  />
                }
                label={o.label}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ))}
          </FormGroup>
        );
      })}
      <Box sx={{ display: "flex", gap: "14px" }}>
        <Button
          sx={{
            border: `1px solid ${theme.palette.text.secondary}`,
            borderRadius: "1000px",
            padding: "8px 12px",
            fontSize: "14px",
            lineHeight: "24px",
            width: "50%",
          }}
          onClick={handleReset}
        >
          Cкинути
        </Button>
        <Button
          sx={{
            borderRadius: "1000px",
            padding: "8px 12px",
            fontSize: "14px",
            lineHeight: "24px",
            bgcolor: theme.palette.action.active,
            width: "50%",
          }}
          onClick={handleOk}
        >
          Ок
        </Button>
      </Box>
    </Box>
  );
};
