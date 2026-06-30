import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const columns = [
    {
      title: "Company Info",
      links: ["About Us", "Carrier", "We are hiring", "Blog"],
    },
    {
      title: "Legal",
      links: ["About Us", "Carrier", "We are hiring", "Blog"],
    },
    {
      title: "Features",
      links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
    },
    {
      title: "Resources",
      links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
    },
  ];

  return (
    <footer className="bg-white">
      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-[#252B42] text-[24px] font-bold">
            Bandage
          </h2>

          <div className="flex gap-5 text-[#23A6F0]">
            <FaFacebook size={22} />
            <FaInstagram size={22} />
            <FaTwitter size={22} />
          </div>
        </div>
      </div>

      <div className="max-w-[1050px] mx-auto px-6 py-12 border-t border-[#E6E6E6]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[#252B42] text-[16px] font-bold mb-5">
                {column.title}
              </h3>

              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[#737373] text-[14px] font-bold"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-[#252B42] text-[16px] font-bold mb-5">
              Get In Touch
            </h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="border border-[#E6E6E6] bg-[#F9F9F9] px-4 py-3 w-full text-[14px]"
              />

              <button className="bg-[#23A6F0] text-white px-5 text-[14px]">
                Subscribe
              </button>
            </div>

            <p className="text-[#737373] text-[12px] mt-2">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-6 py-6 text-[#737373] text-[14px] font-bold">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;