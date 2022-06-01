import React from "react";
import Slider from "react-slick";
import banner1 from "../../assets/images/banner_1.jpg";
import banner2 from "../../assets/images/banner_2.jpg";
import banner3 from "../../assets/images/banner_3.jpg";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";
import slide5 from "../../assets/images/slide5.png";
import slide8 from "../../assets/images/slide8.png";
import slide9 from "../../assets/images/slide9.png";
import slide11 from "../../assets/images/slide11.png";
import "./style.scss";

export const Advertise = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };
  return (
    <>
      <div className="pb-4 slides">
        <Slider {...settings}>
          <div>
            <img src={slide1} width="100%"  alt="" />
          </div>
          <div>
            <img src={slide2} width="100%"alt="" />
          </div>
          <div>
            <img src={slide3} width="100%"alt="" />
          </div>
          <div>
            <img src={slide4} width="100%"  alt="" />
          </div>
          <div>
            <img src={slide5} width="100%" alt="" />
          </div>
          <div>
            <img src={slide8} width="100%" alt="" />
          </div>
          <div>
            <img src={slide9} width="100%" alt="" />
          </div>
          <div>
            <img src={slide11} width="100%" height="400px" alt="" />
          </div>
        </Slider>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-4 m-4 c-12 mb-3">
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner1} alt="" />
              </a>
            </div>
          </div>
          <div className="col l-4 m-4 c-12 mb-3">
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner2} alt="" />
              </a>
            </div>
          </div>
          <div className="col l-4 m-4 c-12 mb-3">
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner3} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
