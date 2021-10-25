import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { slidersContent } from "../sliderConfig";

import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

export default function Slider() {
  return (
    <Swiper modules={[Navigation]} navigation loop>
      {slidersContent.map((slide) => {
        return (
          <SwiperSlide key={slide.id}>
            <img src={slide.img} alt="spiderman portrait" />
            <div className="hero-img-overlay"></div>
            <h1>
              {slide.title.length > 50
                ? `${slide.title.slice(0, 49)}...`
                : slide.title}
            </h1>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
