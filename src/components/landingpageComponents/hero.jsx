import { Link } from "react-router-dom";
import HeroImage from "../../assets/svgs/hero.svg";

const Hero = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between  px-4 lg:px-0">
      {/* Content */}
      <div className="w-full lg:w-1/2 lg:pr-8 flex flex-col gap-5">
        <h1 className="text-xl sm:text-3xl text-center lg:text-left lg:text-4xl font-bold md:leading-10 lg:leading-16 tracking-wider text-black">
          Optimize Your Productivity and <span className="text-primaryGreen">Performance</span>
        </h1>
        <p className="text-base text-center lg:text-left lg:text-lg font-medium text-secondaryGrey">
          Flowease is that vision made real. It's your one-stop shop for
          streamlining accountability, task management, and reveling in shared
          success.
        </p>

        <div className="md:flex flex-col md:flex-row gap-6 mt-3 hidden">
          <Link to="/create-payment" className="route-link">
            <button className="bg-primaryBlue md:w-[220px] w-full text-[#ffff] rounded-md py-5 font-bold">
              Get Started
            </button>
          </Link>
          
        </div>

        <div className="md:hidden w-full">
         

          <div className="flex w-full gap-6 mt-3">
            <Link to="/signup" className="route-link w-full">
              <button className="  text-primaryGreen w-full rounded-md p-2 font-bold">
                Sign up
              </button>
            </Link>
            <Link to="/signin" className="w-full">
              <button className="border border-primaryGreen bg-primaryGreen text-[#ffff] w-full rounded-md p-2 font-bold">
            Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full text-center lg:w-1/2 lg:mt-8 mt-7">
        <img className="w-full h-auto mx-auto" src={HeroImage} alt="svg" />
      </div>
    </div>
  );
};

export default Hero;