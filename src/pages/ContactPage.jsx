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
      <section className="max-w-[1440px] mx-auto min-h-[757px]">
        <div className="flex flex-col lg:flex-row min-h-[757px]">

          <div className="w-full lg:w-[40%] flex items-center justify-center">
            <div className="max-w-[350px] text-white">

              <h1 className="text-[58px] font-bold">
                CONTACT US
              </h1>

              <p className="mt-8 text-[20px] leading-[30px]">
                Problems trying to resolve the conflict between
                the two major realms of Classical physics:
                Newtonian mechanics
              </p>

              <button className="mt-10 bg-[#23A6F0] px-10 py-4 rounded-[5px] font-bold">
                CONTACT US
              </button>

            </div>
          </div>

          <div className="w-full lg:w-[60%] flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 text-white">

              {cities.map((item, index) => (
                <div key={index}>
                  <h3 className="text-[24px] font-bold">
                    {item.city}
                  </h3>

                  <p className="mt-4 text-[20px] font-bold">
                    {item.address}
                  </p>

                  <div className="w-[60px] h-[2px] bg-[#23A6F0] mt-4 mb-4"></div>

                  <p className="font-bold">
                    {item.zip}
                  </p>

                  <p className="mt-4">
                    Phone : {item.phone}
                  </p>

                  <p className="mt-4">
                    Fax : {item.fax}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default ContactPage;