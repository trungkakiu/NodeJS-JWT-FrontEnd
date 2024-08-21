// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { ToastContainer, toast } from 'react-toastify';
// import RouteApi from '../../Service/RouteApi';
// import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomePage = (props) =>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <>
            <div className="">
                <div className="col-12 row">
                    <div className="col-3 left-content" >
                        <div className="App-Header"></div>
                        <div className="App-section">
                            <div className="App-cards"></div>
                            <div className="App-left-contents"></div>
                        </div>
                            
                    </div>
                    <div className="col-9 right-content">
                            <div className="App-right-header slider-wrapper">
                            <div>
                                <h2> Simple Slider</h2>
                                <Slider {...settings}>
                                    <div>
                                        <img src="" alt="Slide 1" />
                                    </div>
                                    <div>
                                        <img src="image2.jpg" alt="Slide 2" />
                                    </div>
                                    <div>
                                        <img src="image3.jpg" alt="Slide 3" />
                                    </div>
                                </Slider>
                            </div>
                            </div>
                            <div className="App-theme-picture-1"></div>
                            <div className="App-theme-picture-2"></div>
                            <div className="App-theme-picture-3"></div>
                            <div className="App-theme-picture-4"></div>
                            <div className="App-Header-dashborad">
                                <div className="App-table"></div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;