import EditorsPick from "../components/EditorsPick";
import heroImage from "../assets/hero.jpg";
import ProductSection from "../components/ProductSection";

function HomePage() {
  return (
    <>  
    <section
  className="min-h-[716px] bg-cover bg-center flex items-center"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <div className="w-full max-w-[1440px] mx-auto px-[60px]">
    <div className="max-w-[500px]">
      <p className="text-white text-[16px] font-bold mb-6">
        SUMMER 2020
      </p>

      <h1 className="text-white text-[58px] leading-[80px] font-bold mb-6 ">
        NEW COLLECTION
      </h1>

      <p className="text-white text-[20px] leading-[30px] mb-6">
        We know how large objects will act, but things on a small scale.
      </p>

      <button className="bg-[#2DC071] text-white text-[24px] font-bold px-[40px] py-[15px] rounded-[5px]">
        SHOP NOW
      </button>
    </div>
  </div>
</section>
         <EditorsPick />
         <ProductSection />
         </>
  );
  
}

export default HomePage;