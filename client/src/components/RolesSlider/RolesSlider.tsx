import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "./RolesSlider.css";
import { RoleCard } from "../RoleCard";

export const RolesSlider = () => {
  return (
    <Swiper
      effect={"cards"}
      modules={[EffectCards, Pagination, Navigation]}
      grabCursor={true}
      centeredSlides={true}
      initialSlide={3}
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
      {[1, 2, 3, 4, 5, 6, 7].map((idx) => (
        <SwiperSlide key={idx} style={{ width: "292px" }}>
          <RoleCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
