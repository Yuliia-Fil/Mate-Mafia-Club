import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "./RolesSlider.css";
import { RoleCardFront } from "../RoleCardFront";
import { useState } from "react";

export const RolesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(3);
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
      {[1, 2, 3, 4, 5, 6, 7].map((idx, index) => (
        <SwiperSlide key={idx} style={{ width: "292px" }}>
          <RoleCardFront index={index} activeIndex={activeIndex} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
