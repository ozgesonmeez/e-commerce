import vitaMen from "../assets/vita-men.png";

function VitaBanner() {
  return (
    <section className="bg-[#23856D] w-full overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6 min-h-[520px] flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white text-center lg:text-left py-14 z-10">
          <p className="text-[16px] font-bold mb-8">SUMMER 2020</p>

          <h2 className="text-white text-[40px] lg:text-[58px] leading-[50px] lg:leading-[70px] font-bold max-w-[430px]">
            Vita Classic Product
          </h2>

          <p className="text-[14px] leading-[20px] mt-6 max-w-[360px] mx-auto lg:mx-0">
            We know how large objects will act, We know how are objects will act,
            We know
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-8 mt-8">
            <span className="text-[24px] font-bold">$16.48</span>

            <button className="bg-[#2DC071] text-white px-8 py-4 rounded-[5px] text-[14px] font-bold">
              ADD TO CART
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={vitaMen}
            alt="Vita Classic Product"
            className="max-h-[470px] lg:max-h-[500px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default VitaBanner;