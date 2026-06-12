import men from "../assets/men.png";
import women from "../assets/women.png";
import accessories from "../assets/accessories.png";
import kids from "../assets/kids.png";

function EditorsPick() {
  return (
    <section className="bg-[#FAFAFA] min-h-[770px] py-[80px]">
      <div className="max-w-[1050px] mx-auto">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#252B42] text-center">
          EDITOR'S PICK
        </h2>

        <p className="text-[14px] leading-[20px] font-normal tracking-[0.2px] text-center text-[#737373] mt-[10px]">
          Problems trying to resolve the conflict between
        </p>

        <div className="grid grid-cols-[510px_240px_240px] gap-[30px] mt-[48px]">
          {/* MEN */}
          <div className="h-[500px] overflow-hidden">
            <img
              src={men}
              alt="Men"
              className="w-full h-full object-cover"
            />
          </div>

          {/* WOMEN */}
          <div className="h-[500px] overflow-hidden">
            <img
              src={women}
              alt="Women"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ACCESSORIES + KIDS */}
          <div className="flex flex-col gap-[30px]">
            <div className="relative h-[235px] overflow-hidden">
              <img
                src={accessories}
                alt="Accessories"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-[24px] left-[24px] bg-white px-[20px] py-[12px]">
                <span className="text-[16px] font-bold text-[#252B42]">
                  ACCESSORIES
                </span>
              </div>
            </div>

            <div className="relative h-[235px] overflow-hidden">
              <img
                src={kids}
                alt="Kids"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-[24px] left-[24px] bg-white px-[28px] py-[12px]">
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