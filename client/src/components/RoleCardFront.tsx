import {
  Box,
  Fade,
  Tooltip,
  tooltipClasses,
  Typography,
  type TooltipProps,
} from "@mui/material";
import { testRole } from "../constants";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
  },
});

export const RoleCardFront = ({
  activeIndex,
  index,
}: {
  index: number;
  activeIndex?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const showDescription = activeIndex === index;

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      setOffsetX(width * 0.5);
      const height = cardRef.current.offsetHeight;
      setOffsetY(height * -0.35);
    }
  }, []);

  const cardContent = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "292px",
        minWidth: "164px",
        aspectRatio: 1.5,
        background:
          "linear-gradient(180deg, #07070B00 0%, #07070BFF 100%), #1A1B1D",
        boxShadow: "0px 4px 12px #0000001F",
        borderRadius: "12px",
        paddingTop: "20%",
        paddingBottom: "10%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "60%",
          aspectRatio: 1,
          bgcolor: "#EEBCAF66",
          borderRadius: "100%",
          filter: "blur(30px)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        component="img"
        src={testRole.img}
        alt={testRole.title}
        sx={{
          zIndex: 2,
          position: "relative",
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
      ></Box>
      <Typography
        textAlign="center"
        variant="h2"
        color="#EEBCAF"
        fontSize="clamp(24px, 2vw, 28px)"
      >
        {testRole.title}
      </Typography>
    </Box>
  );
  return showDescription ? (
    <CustomTooltip
      title={
        <Box
          sx={{
            p: "24px",
            borderRadius: "12px",
            borderBottomLeftRadius: 0,
            border: "2px solid #62626280",
            background: "linear-gradient(20deg, #292929 10%, #8484840D 100%)",
            boxShadow: "0px 4px 12px #00000040",
            color: "text.secondary",
            height: "144px",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{testRole.description}</Typography>
        </Box>
      }
      followCursor
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: {
          timeout: 300, // швидкість анімації
        },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: { offset: [offsetX, offsetY] },
            },
          ],
        },
      }}
    >
      <div ref={cardRef}>{cardContent}</div>
    </CustomTooltip>
  ) : (
    cardContent
  );
};
