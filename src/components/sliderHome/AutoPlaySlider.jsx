import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext,GrPrevious } from "react-icons/gr";

const slidesData = [
  { title: 'Slide 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://media.istockphoto.com/id/2079720850/photo/mechanic-fixing-a-bicycle-at-the-repair-shop-and-using-a-digital-tablet.jpg?s=1024x1024&w=is&k=20&c=-hI34tBPjLuVCeuT5Xh0TrjdPDa73bm3S6K75kzMCKk=' },
  { title: 'Slide 2', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/id/1328822779/photo/using-special-tool-man-in-work-uniform-repairs-white-automobile-indoors-conception-of-car.jpg?s=1024x1024&w=is&k=20&c=5Y22N7v00mhsA4h5Ox6Sd-LjWhGJW2AAdMWHV8JZ8go=' },
  { title: 'Slide 3', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', image: 'https://media.istockphoto.com/id/1945279630/photo/auto-mechanic-showing-data-on-the-computer-for-mature-grey-haired-male-customer.jpg?s=1024x1024&w=is&k=20&c=bggkFWe6TIzC-6U2cnAIWE8w1gnlgEj1bLUCh7TL8Ko=' },
];

const AutoPlaySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      }
    ],
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    }
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="relative overflow-hidden h-[500px]">
      <Slider {...settings} ref={sliderRef}>
        {slidesData.map((slide, index) => (
          <div key={index}>
            <img src={slide.image} alt={slide.title} className="w-full object-fill" />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-36 text-white">
        <h2 className="text-2xl font-bold">{slidesData[currentSlide].title}</h2>
        <p className="text-center">{slidesData[currentSlide].text}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Learn More</button>
      </div>
      <button className="absolute top-1/2 -translate-y-1/2 left-8 bg-black bg-opacity-70 text-white px-4 py-4 rounded-full hover:bg-black hover:text-cardHoverBg" onClick={goToPrevSlide}>
        <GrPrevious />

      </button>
      <button className="absolute top-1/2 -translate-y-1/2 right-8 bg-black bg-opacity-70 text-white px-4 py-4 rounded-full hover:bg-black hover:text-cardHoverBg" onClick={goToNextSlide}>
        <GrNext />
      </button>
    </div>
  );
};

export default AutoPlaySlider;
