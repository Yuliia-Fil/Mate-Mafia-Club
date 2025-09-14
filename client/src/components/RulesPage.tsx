import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { rules } from "../data/constants";
import { PageTitle } from "./PageTitle";
import { RolesSlider } from "./RolesSlider/RolesSlider";

export const RulesPage = () => {
  return (
    <>
      <RolesSlider />
      <PageTitle path="custom" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "16px", sm: "24px" },
        }}
      >
        {rules.map((rule) => (
          <Accordion
            sx={{
              padding: { xs: "16px", sm: "24px 48px" },
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
                <ExpandMoreIcon color="secondary" sx={{ fontSize: 32 }} />
              }
              aria-controls={rule.title}
              id={rule.title}
              sx={{
                width: "100%",
                "&.Mui-expanded": {
                  borderBottom: "1px solid #FFFFFF29",
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: "32px", sm: "40px" },
                  margin: "auto 0",
                }}
              >
                {rule.img}
              </Typography>
              <Box
                width={"100%"}
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
                  sx={{ maxWidth: "80%" }}
                >
                  {rule.subtitle}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "16px" }}>
              <ul style={{ gap: "8px", margin: 0, padding: 0 }}>
                {rule.description.map((r) => (
                  <li style={{ lineHeight: "1.4" }} key={r}>
                    {r}
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};
