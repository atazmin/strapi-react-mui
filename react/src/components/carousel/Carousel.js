import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'mui-image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import 'components/carousel/carousel.scss';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectCoverflow]);

export default function Carousel(props) {
  const slides = props.props.carouselSlides;
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  return (
    <Swiper
      // onSwiper={(swiper) => console.log(swiper)}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      loop={true}
      navigation={true}
      speed={2000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      className="carousel"
    >
      {slides.map((slide) => {
        const { id, url, alternativeText, caption } = isMobile
          ? slide.imageAttributesSmallSize
          : slide.imageAttributesLargeSize;

        return (
          <SwiperSlide key={id}>
            <RouterLink to={slide.imageLink}>
              <Image
                src={process.env.REACT_APP_IMAGES_ENDPOINT + url}
                alt={alternativeText}
                title={caption}
                showLoading
                duration={500}
              />
            </RouterLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
