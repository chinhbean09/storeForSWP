import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HeroSection = () => {
const carouselImages = [
  {
    img: "1.jpg",
    id: 1,
  },
  {
    img: "2.jpg",
    id: 2,
  },
  {
    img: "3.jpg",
    id: 3,
  },
  {
    img: "4.jpg",
    id: 4,
  },
  {
    img: "5.jpg",
    id: 5,
  },
];
  return (
    <Wrapper>
   <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect={"fade"}
      slidesPerView={1}
      loop={true}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
      onSwiper={() => {}}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onSlideChange={(swiper) => {}}
    >
      {carouselImages.map((img, i) => (
        <SwiperSlide key={img.id}>
          <div className="container">
            <img
              src={require(`../../public/images/${img.img}`)}
              alt=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </Wrapper>
  );
      }
export default HeroSection;
const Wrapper = styled.section`
.swiper-pagination-bullet-active {
  background-color: c.$Accent7 !important;
}

.swiper-button-next,
.swiper-button-prev  {
   color: c.$Accent7 ;

}
.container {

  img {
    width: 1270px !important;     
    height: 350px !important;
  }
}
`