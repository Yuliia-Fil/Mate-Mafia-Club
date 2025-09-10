import { InputAdornment, TextField } from "@mui/material";
import { theme } from "../data/theme";
import type { PageKey } from "../data/types";
import search from "../assets/search.svg";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const QueryMenu = ({ pageKey }: { pageKey: PageKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get(`${pageKey}_query`) || ""
  );

  const handleChange = (v: string) => {
    const validValue = v.trim().toLowerCase();
    const newParams = new URLSearchParams(searchParams);
    if (validValue) {
      newParams.set(`${pageKey}_query`, validValue);
      setSearchParams(newParams);
    } else {
      newParams.delete(`${pageKey}_query`);
      setSearchParams(newParams);
    }
    setValue(v);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Пошук..."
      value={value}
      sx={{
        width: "214px",
        maxWidth: "50%",
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
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    />
  );
};
