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

        <div className="grid grid-cols-1 md:grid-cols-[510px_240px_240px] gap-6 md:gap-[30px] mt-10 md:mt-[48px]">
          {/* MEN */}
          <div className="relative h-[500px] md:h-[500px] overflow-hidden rounded-md">
            <img
              src={men}
              alt="Men"
              className="w-full h-full object-cover object-top"
            />

            <div className="absolute bottom-6 left-6 bg-white px-9 py-3">
              <span className="text-[16px] font-bold text-[#252B42]">
                MEN
              </span>
            </div>
          </div>

          {/* WOMEN */}
          <div className="relative h-[500px] md:h-[500px] overflow-hidden rounded-md">
            <img
              src={women}
              alt="Women"
              className="w-full h-full object-cover object-top"
            />

            <div className="absolute bottom-6 left-6 bg-white px-8 py-3">
              <span className="text-[16px] font-bold text-[#252B42]">
                WOMEN
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6 md:gap-[30px]">
            <div className="relative h-[235px] overflow-hidden rounded-md">
              <img
                src={accessories}
                alt="Accessories"
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute bottom-6 left-6 bg-white px-5 py-3">
                <span className="text-[16px] font-bold text-[#252B42]">
                  ACCESSORIES
                </span>
              </div>
            </div>

            <div className="relative h-[235px] overflow-hidden rounded-md">
              <img
                src={kids}
                alt="Kids"
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute bottom-6 left-6 bg-white px-8 py-3">
                <span className="text-[16px] font-bold text-[#252B42]">
                  KIDS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorsPick;