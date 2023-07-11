import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Lazy } from "swiper";
import "swiper/swiper.less";
SwiperCore.use([Lazy]);

function Slider({ data, item: component, ...other }) {
  const slideWidth = component.props.slideWidth || 0;

  return (
    <Swiper
      spaceBetween={slideWidth / 20}
      dir="rtl"
      slidesPerView={"auto"}
      {...other}
    >
      {data.map((item) => (
        <SwiperSlide key={item._id || item}>
          {React.cloneElement(component, {
            ...component.props,
            data: item,
            isLazy: true,
          })}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
