import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "./RolesSlider.css";
import { RoleCardFront } from "../RoleCardFront";
import { useEffect, useState } from "react";
import type { RoleCard } from "../../types";
import { getData } from "../../utils/fetch";
import { paths } from "../../constants";

export const RolesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [roleCards, setRoleCards] = useState<RoleCard[]>([]);

  useEffect(() => {
    getData(paths.CARDS, setRoleCards);
  }, []);

  return (
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
      navigation={true}
      pagination={{
        clickable: true,
      }}
      spaceBetween={-150}
    >
      {roleCards.map((card, index) => (
        <SwiperSlide key={card.id} style={{ width: "292px" }}>
          <RoleCardFront card={card} index={index} activeIndex={activeIndex} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
