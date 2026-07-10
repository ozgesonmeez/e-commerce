import contactBackground from "../assets/contact-model.jpg";

function ContactPage() {
  const cities = [
    {
      city: "Paris",
      address: "1901 Thorn ridge Cir.",
      zip: "75000 Paris",
      phone: "+451 215 215",
      fax: "+451 215 215",
    },
    {
      city: "New York",
      address: "2715 Ash Dr. San Jose,",
      zip: "75000 Paris",
      phone: "+451 215 215",
      fax: "+451 215 215",
    },
    {
      city: "Berlin",
      address: "4140 Parker Rd.",
      zip: "75000 Paris",
      phone: "+451 215 215",
      fax: "+451 215 215",
    },
    {
      city: "London",
      address: "3517 W. Gray St. Utica,",
      zip: "75000 Paris",
      phone: "+451 215 215",
      fax: "+451 215 215",
    },
  ];

  return (
    <main className="bg-[#252B42]">
      <section className="relative overflow-hidden bg-[#252B42]">
        {/* Arka plan görseli */}
        <img
          src={contactBackground}
          alt=""
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-top
            pointer-events-none
            select-none
          "
        />

        {/* Masaüstü koyu geçiş */}
        <div
          className="
            absolute
            inset-0
            hidden
            lg:block
            bg-gradient-to-r
            from-[#252B42]
            via-[#252B42]/80
            to-transparent
          "
        />

        {/* Mobil koyu katman */}
        <div className="absolute inset-0 bg-[#252B42]/90 lg:hidden" />

        <div
          className="
            relative
            z-10
            max-w-[1050px]
            mx-auto
            px-6
            py-16
            lg:py-0
            lg:min-h-[650px]
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:min-h-[650px]
              lg:items-center
              gap-14
              lg:gap-12
            "
          >
            {/* Sol alan */}
            <div className="w-full lg:w-[42%] text-white">
              <div className="max-w-[360px] mx-auto lg:mx-0 text-center lg:text-left">
                <h1
                  className="
                    text-[40px]
                    sm:text-[48px]
                    lg:text-[58px]
                    leading-[1.15]
                    font-bold
                  "
                >
                  CONTACT US
                </h1>

                <p
                  className="
                    mt-6
                    lg:mt-8
                    text-[16px]
                    sm:text-[18px]
                    lg:text-[20px]
                    leading-[28px]
                    lg:leading-[30px]
                  "
                >
                  Problems trying to resolve the conflict between the two major
                  realms of Classical physics: Newtonian mechanics
                </p>

                <button
                  type="button"
                  className="
                    mt-8
                    lg:mt-10
                    bg-[#23A6F0]
                    px-8
                    lg:px-10
                    py-4
                    rounded-[5px]
                    font-bold
                    hover:bg-[#1b8fd4]
                    transition
                  "
                >
                  CONTACT US
                </button>
              </div>
            </div>

            {/* Şehirler */}
            <div className="w-full lg:w-[58%]">
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-x-10
                  lg:gap-x-16
                  gap-y-10
                  lg:gap-y-12
                  text-white
                "
              >
                {cities.map((item) => (
                  <div
                    key={item.city}
                    className="
                      bg-[#252B42]/75
                      lg:bg-transparent
                      rounded-lg
                      lg:rounded-none
                      p-5
                      lg:p-0
                      backdrop-blur-[2px]
                      lg:backdrop-blur-none
                    "
                  >
                    <h3 className="text-[22px] font-bold">
                      {item.city}
                    </h3>

                    <p className="mt-4 text-[16px] font-bold leading-[24px]">
                      {item.address}
                    </p>

                    <div className="w-[52px] h-[2px] bg-[#23A6F0] mt-4 mb-4" />

                    <p className="font-bold">
                      {item.zip}
                    </p>

                    <p className="mt-4 text-[14px]">
                      Phone : {item.phone}
                    </p>

                    <p className="mt-3 text-[14px]">
                      Fax : {item.fax}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;