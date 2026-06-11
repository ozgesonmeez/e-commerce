function HomePage() {
  return (
    <section className="bg-[#00B5D8] min-h-[520px] flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-[60px]">
        <p className="text-white text-[16px] font-bold mb-6">
          SUMMER 2020
        </p>

        <h1 className="text-white text-[58px] leading-[80px] font-bold mb-6">
          NEW COLLECTION
        </h1>

        <p className="text-white text-[20px] leading-[30px] mb-6 max-w-[420px]">
          We know how large objects will act, but things on a small scale.
        </p>

        <button className="bg-[#2DC071] text-white text-[24px] font-bold px-[40px] py-[15px] rounded-[5px]">
          SHOP NOW
        </button>
      </div>
    </section>
  );
}

export default HomePage;