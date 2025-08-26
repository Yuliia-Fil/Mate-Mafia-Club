import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
      <div>
        {rules.map((rule) => (
          <Accordion key={rule.title}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={rule.title}
              id={rule.title}
            >
              <span style={{ fontSize: "48px" }}>{rule.img}</span>
              <Typography component="span">{rule.title}</Typography>
              <Typography component="span">{rule.subtitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>{rule.description}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
