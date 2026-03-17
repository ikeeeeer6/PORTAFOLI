import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/CarouselImages.css';

export const CarouselImages = ({ images, carName, onImageClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={image}
              alt={`${carName} - Imagen ${index + 1}`}
              className="carousel-image"
              onClick={() => onImageClick && onImageClick(index)}
              style={{ cursor: onImageClick ? 'zoom-in' : 'default' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
