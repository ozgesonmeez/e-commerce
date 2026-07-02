import neuralBanner from "../assets/neural-banner.png";

function NeuralBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-[58%]">
          <img
            src={neuralBanner}
            alt="Neural Universe"
            className="w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[42%] text-center lg:text-left">
          <p className="text-[#BDBDBD] text-[16px] font-bold mb-6">
            SUMMER 2020
          </p>

          <h2 className="text-[#252B42] text-[40px] font-bold leading-[50px] mb-6">
            Part of the Neural Universe
          </h2>

          <p className="text-[#737373] text-[14px] leading-[24px] mb-8 max-w-[420px] mx-auto lg:mx-0">
            We know how large objects will act, but things on a small scale just
            do not act that way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-[#2DC071] text-white font-bold px-8 py-4 rounded-md">
              BUY NOW
            </button>

            <button className="border border-[#2DC071] text-[#2DC071] font-bold px-8 py-4 rounded-md">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeuralBanner;