import { Link } from "react-router-dom";
import EditorsPick from "../components/EditorsPick";
import ProductSection from "../components/ProductSection";
import heroImage from "../assets/hero.jpg";
import VitaBanner from "../components/VitaBanner";
import NeuralBanner from "../components/NeuralBanner";
import FeaturedPosts from "../components/FeaturedPosts";

function HomePage() {
  return (
    <>
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto">
          <div
            className="h-[716px] bg-no-repeat bg-center flex items-center"
            style={{
              backgroundImage: `url(${heroImage})`,
              
            }}
          >
            <div className="w-full px-6 md:px-[60px]">
              <div className="max-w-[520px] text-center md:text-left">
                <p className="text-white text-[14px] md:text-[16px] font-bold mb-5 md:mb-6">
                  SUMMER 2020
                </p>

                <h1 className="text-white text-[40px] md:text-[58px] leading-[50px] md:leading-[80px] font-bold mb-5 md:mb-6">
                  NEW COLLECTION
                </h1>

                <p className="text-white text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] mb-7 max-w-[430px] mx-auto md:mx-0">
                  We know how large objects will act, but things on a small scale.
                </p>

                <Link
                  to="/shop"
                  className="inline-block bg-[#2DC071] text-white text-[18px] md:text-[24px] font-bold px-[34px] md:px-[40px] py-[13px] md:py-[15px] rounded-[5px]"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorsPick />
      <ProductSection />
      <VitaBanner />
      <NeuralBanner />
      <FeaturedPosts />
    </>
  );
}

export default HomePage;