import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { rules } from "../constants";
import { PageTitle } from "./PageTitle";
import { RolesSlider } from "./RolesSlider/RolesSlider";

export const RulesPage = () => {
  return (
    <>
      <RolesSlider />
      <PageTitle path="custom" />
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {rules.map((rule) => (
          <Accordion
            sx={{
              padding: "24px 48px",
              borderRadius: "12px",
              background: "linear-gradient(180deg, #292929 0%, #8484840D 100%)",
              boxShadow: "  0px 4px 12px #00000040",
              "&.Mui-expanded": {
                border: "2px solid #62626280",
              },
            }}
            key={rule.title}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon color="primary" sx={{ fontSize: 32 }} />
              }
              aria-controls={rule.title}
              id={rule.title}
              sx={{
                "&.Mui-expanded": {
                  borderBottom: "1px solid #FFFFFF29",
                },
              }}
            >
              <span style={{ fontSize: "40px" }}>{rule.img}</span>
              <Box
                marginLeft="16px"
                display={"flex"}
                gap={"8px"}
                flexDirection={"column"}
              >
                <Typography variant="h2" component="span">
                  {rule.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  component="span"
                >
                  {rule.subtitle}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ul style={{ gap: "8px" }}>
                {rule.description.map((r) => (
                  <li style={{ lineHeight: "1.4" }} key={r}>
                    {r}
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
