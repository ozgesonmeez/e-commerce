import men from "../assets/men.png";
import women from "../assets/women.png";
import accessories from "../assets/accessories.png";
import kids from "../assets/kids.png";

function EditorsPick() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-[80px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#252B42] text-center">
          EDITOR'S PICK
        </h2>

        <p className="text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] mt-[10px]">
          Problems trying to resolve the conflict between
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[510px_240px_240px] gap-[30px] mt-[48px]">
          <div className="relative h-[420px] md:h-[500px] overflow-hidden">
            <img src={men} alt="Men" className="w-full h-full object-cover" />
            <div className="absolute bottom-[24px] left-[24px] bg-white px-[36px] py-[12px]">
              <span className="text-[16px] font-bold text-[#252B42]">MEN</span>
            </div>
          </div>

          <div className="relative h-[420px] md:h-[500px] overflow-hidden">
            <img src={women} alt="Women" className="w-full h-full object-cover" />
            <div className="absolute bottom-[24px] left-[24px] bg-white px-[28px] py-[12px]">
              <span className="text-[16px] font-bold text-[#252B42]">WOMEN</span>
            </div>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="relative h-[240px] md:h-[235px] overflow-hidden">
              <img src={accessories} alt="Accessories" className="w-full h-full object-cover" />
              <div className="absolute bottom-[24px] left-[24px] bg-white px-[20px] py-[12px]">
                <span className="text-[16px] font-bold text-[#252B42]">
                  ACCESSORIES
                </span>
              </div>
            </div>

            <div className="relative h-[240px] md:h-[235px] overflow-hidden">
              <img src={kids} alt="Kids" className="w-full h-full object-cover" />
              <div className="absolute bottom-[24px] left-[24px] bg-white px-[28px] py-[12px]">
                <span className="text-[16px] font-bold text-[#252B42]">KIDS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorsPick;