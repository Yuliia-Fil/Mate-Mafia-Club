import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "./RolesSlider.scss";
import { RoleCardFront } from "../RoleCard/RoleCardFront";
import { useEffect, useState } from "react";
import type { RoleCard } from "../../data/types";
import { getData } from "../../utils/fetch";
import { paths } from "../../data/constants";
import { Box, Typography, useMediaQuery } from "@mui/material";

export const RolesSlider = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const [activeIndex, setActiveIndex] = useState(3);
  const [roleCards, setRoleCards] = useState<RoleCard[]>([]);

  useEffect(() => {
    getData(paths.CARDS, setRoleCards);
  }, []);

  return (
    <>
      <Swiper
        effect={"cards"}
        modules={[EffectCards, Pagination, Navigation]}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={3}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        speed={1000}
        slidesPerView="auto"
        cardsEffect={{
          slideShadows: true,
          rotate: false,
          perSlideOffset: 50, // зсув картки по Y
        }}
        navigation={isDesktop}
        pagination={{
          clickable: true,
        }}
        spaceBetween={-150}
      >
        {roleCards.map((card, index) => (
          <SwiperSlide
            key={card.id}
            style={{
              width: "100%",
              maxWidth: "292px",
            }}
          >
            <RoleCardFront
              card={card}
              index={index}
              activeIndex={activeIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isMobile && (
        <Box
          sx={{
            m: "24px auto 72px",
            p: "8px 16px",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "292px",
          }}
        >
          <Typography variant="body1">
            {roleCards[activeIndex].description}
          </Typography>
        </Box>
      )}
    </>
  );
};
