import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import trustedOne from "../../assets/images/landingpageImages/trustedTeamOne.png";
import trustedTwo from "../../assets/images/landingpageImages/trustedTeamTwo.png";
import trustedThree from "../../assets/images/landingpageImages/trustedTeamThree.png";

const Trust = () => {
  return (
    <div className="bg-[#fff] py-10">
      <div className="text-center  py-10">
        <p className="text-[#1E1F24] font-bold text-5xl">
          Trusted by Teams Worldwide
        </p>
        <p className="text-[#8E8E93] font-normal text-2xl">
          See how our project management platform has helped teams like yours
          deliver projects efficiently and effectively
        </p>
      </div>
      <div className=" w-9/12  mx-auto">
        <div className=" flex items-center justify-center w-full h-full text-[#FFFFFF]">
          {/* Carousel for desktop and large size devices */}
          <CarouselProvider
            className="lg:block  hidden"
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={3}
            visibleSlides={2.3}
            step={1}
            infinite={true}
            isPlaying={true}
            orientation="horizontal"
            interval={2000}
            playDirection={"forward"}
          >
            <div className="w-full relative flex items-center justify-center">
              <div className="w-full h-full mx-auto overflow-hidden ">
                <Slider>
                  <div
                    id="slider"
                    className="h-full flex lg:gap-[1.15625rem]  items-center justify-center transition ease-out duration-700 "
                  >
                    <Slide index={0}>
                      <div>
                        <img
                          src={trustedTwo}
                          alt="trustedOne"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Slide>

                    <Slide index={1}>
                      <div>
                        <img
                          src={trustedThree}
                          alt="trustedOne"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Slide>
                    <Slide index={2}>
                      <div>
                        <img
                          src={trustedOne}
                          alt="trustedOne"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Slide>
                    <Slide index={3}>
                      <div>
                        <img
                          src={trustedTwo}
                          alt="trustedOne"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Slide>
                  </div>
                </Slider>
              </div>
            </div>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default Trust;
