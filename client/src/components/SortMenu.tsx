import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { theme } from "../data/theme";
import SortIcon from "../assets/sortIcon.svg?react";
import CloseIcon from "../assets/closeIcon.svg?react";
import type { Form } from "../data/types";
import { useState, type Dispatch, type SetStateAction } from "react";

export const SortMenu = ({
  forms,
  setSortOpen,
}: {
  forms: Form[];
  setSortOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        width: "244px",
        position: "absolute",
        right: 0,
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
        <SortIcon
          style={{
            color: "white",
          }}
        />
        <Typography variant="button">Сортування</Typography>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSortOpen(false);
            setSelectedValue("");
          }}
        />
      </Box>
      {forms.map((form) => {
        return (
          <FormControl
            key={form.label}
            sx={{
              borderBottom: `1px solid ${theme.palette.text.secondary}`,
              padding: "0 16px 16px",
              gap: "8px",
            }}
          >
            <FormLabel id="sort" sx={{ fontSize: "16px" }}>
              {form.label}
            </FormLabel>
            <RadioGroup
              aria-labelledby="sort"
              name="sort-group"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {form.options.map((option) => {
                return (
                  <FormControlLabel
                    key={option.label}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
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
          onClick={() => {
            setSortOpen(false);
            setSelectedValue("");
          }}
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
        >
          Ок
        </Button>
      </Box>
    </Box>
  );
};
