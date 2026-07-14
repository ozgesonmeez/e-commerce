import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import EditorsPick from "../components/EditorsPick";
import ProductSection from "../components/ProductSection";
import VitaBanner from "../components/VitaBanner";
import NeuralBanner from "../components/NeuralBanner";
import FeaturedPosts from "../components/FeaturedPosts";

import heroImage from "../assets/hero.jpg";
import womenHeroImage from "../assets/hero-women-coral.png";
import menHeroImage from "../assets/hero-men-navy.png";

const slides = [
  {
    image: heroImage,
    season: "SUMMER 2026",
    title: "NEW COLLECTION",
    description:
      "Discover fresh styles designed for bright and unforgettable summer days.",
  },
{
  image: womenHeroImage,
  season: "WOMEN'S FASHION",
  title: "MODERN STYLE",
  description:
    "Complete your wardrobe with comfortable and timeless pieces.",
},
{
  image: menHeroImage,
  season: "MEN'S COLLECTION",
  title: "FIND YOUR LOOK",
  description:
    "Explore this season's newest trends and create your own style.",
},
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showPreviousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const showNextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="relative h-[560px] md:h-[716px] overflow-hidden bg-[#23A6F0]">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={`absolute inset-0 bg-center bg-no-repeat transition-opacity duration-700 ${
                  index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
               style={{
  backgroundImage: `url(${slide.image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
              >
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 h-full flex items-center">
                  <div className="w-full px-14 md:px-[90px]">
                    <div
                      className={`max-w-[540px] text-center md:text-left transition-all duration-700 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0"
                      }`}
                    >
                      <p className="text-white text-[14px] md:text-[16px] font-bold mb-5 md:mb-6">
                        {slide.season}
                      </p>

                      <h1 className="text-white text-[38px] md:text-[58px] leading-[46px] md:leading-[70px] font-bold mb-5 md:mb-6">
                        {slide.title}
                      </h1>

                      <p className="text-white text-[17px] md:text-[20px] leading-[27px] md:leading-[30px] mb-7 max-w-[450px] mx-auto md:mx-0">
                        {slide.description}
                      </p>

                      <Link
                        to="/shop"
                        className="inline-block bg-[#2DC071] hover:bg-[#26a862] text-white text-[18px] md:text-[22px] font-bold px-8 md:px-10 py-3 md:py-4 rounded-[5px] transition"
                      >
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={showPreviousSlide}
              aria-label="Önceki slayt"
              className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 z-20 text-white hover:scale-110 transition"
            >
              <ChevronLeft size={48} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={showNextSlide}
              aria-label="Sonraki slayt"
              className="absolute right-3 md:right-7 top-1/2 -translate-y-1/2 z-20 text-white hover:scale-110 transition"
            >
              <ChevronRight size={48} strokeWidth={1.5} />
            </button>

            <div className="absolute z-20 bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`${index + 1}. slayta git`}
                  className={`h-[5px] rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-10 bg-white"
                      : "w-7 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
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