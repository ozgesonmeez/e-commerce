import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import aboutHero from "../assets/aboutHero.png";
import videoImage from "../assets/video.png";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import pinkGirl from "../assets/pinkgirl.png";
import hooli from "../assets/hooli.png";
import lyft from "../assets/lyft.png";
import leaf from "../assets/leaf.png";
import stripe from "../assets/stripe.png";
import aws from "../assets/aws.png";
import reddit from "../assets/reddit.png";

function AboutPage() {
  const stats = [
    {
      value: "15K",
      label: "Happy Customers",
    },
    {
      value: "150K",
      label: "Monthly Visitors",
    },
    {
      value: "15",
      label: "Countries Worldwide",
    },
    {
      value: "100+",
      label: "Top Partners",
    },
  ];

  const teamMembers = [
    {
      image: team1,
      name: "Gökhan Özdemir",
      role: "Project Manager",
    },
    {
      image: team2,
      name: "Özge Sönmez",
      role: "Full Stack Developer",
    },
    {
      image: team3,
      name: "Damla Çalış",
      role: "Frontend Developer",
    },
  ];

  const companies = [
  { image: hooli, alt: "Hooli" },
  { image: lyft, alt: "Lyft" },
  { image: leaf, alt: "Leaf" },
  { image: stripe, alt: "Stripe" },
  { image: aws, alt: "AWS" },
  { image: reddit, alt: "Reddit" },
];
 

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="overflow-hidden">
        <div className="max-w-[1050px] min-h-[620px] mx-auto px-6">
          <div className="min-h-[620px] flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left py-16 lg:py-0">
              <p className="text-[#252B42] text-[16px] font-bold">
                ABOUT COMPANY
              </p>

              <h1 className="text-[#252B42] text-[44px] lg:text-[58px] leading-[1.15] font-bold mt-8">
                ABOUT US
              </h1>

              <p className="text-[#737373] text-[20px] leading-[30px] max-w-[380px] mt-8 mx-auto lg:mx-0">
                We know how large objects will act, but things on a small scale.
              </p>

              <button
                type="button"
                className="mt-8 bg-[#23A6F0] text-white px-10 py-4 rounded-[5px] font-bold hover:bg-[#1b8fd4] transition"
              >
                Get Quote Now
              </button>
            </div>

            <div className="relative w-full lg:w-1/2 min-h-[520px] flex items-end justify-center">
              <div className="absolute w-[360px] h-[360px] md:w-[430px] md:h-[430px] rounded-full bg-[#FFE9E9] bottom-[55px]" />

              <div className="absolute w-[75px] h-[75px] rounded-full bg-[#FFE9E9] left-[20px] md:left-[35px] top-[80px]" />

              <div className="absolute w-[18px] h-[18px] rounded-full bg-[#977DF4] right-[25px] top-[150px]" />

              <div className="absolute w-[34px] h-[34px] rounded-full bg-[#FFE9E9] right-[25px] top-[240px]" />

              <div className="absolute w-[14px] h-[14px] rounded-full bg-[#977DF4] left-[55px] bottom-[105px]" />

              <img
                src={aboutHero}
                alt="Shopping woman"
                className="relative z-10 w-full max-w-[520px] max-h-[560px] object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="max-w-[1050px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-[420px]">
            <p className="text-[#E74040] text-[14px]">
              Problems trying
            </p>

            <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold mt-5">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </h2>
          </div>

          <div className="max-w-[530px] flex items-center">
            <p className="text-[#737373] text-[14px] leading-[20px]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-[#252B42] text-[48px] lg:text-[58px] leading-none font-bold">
                {stat.value}
              </h3>

              <p className="text-[#737373] text-[14px] font-bold mt-4">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section className="max-w-[1050px] mx-auto px-6 py-20">
        <div className="relative rounded-[20px] overflow-hidden">
          <img
            src={videoImage}
            alt="About video"
            className="w-full h-[320px] md:h-[540px] object-cover"
          />

          <button
            type="button"
            aria-label="Play video"
            className="absolute inset-0 m-auto w-[90px] h-[90px] rounded-full bg-[#23A6F0] text-white flex items-center justify-center shadow-lg"
          >
            <span className="text-[28px] translate-x-[3px]">▶</span>
          </button>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-[1050px] mx-auto px-6 py-24">
        <div className="text-center max-w-[610px] mx-auto">
          <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold">
            Meet Our Team
          </h2>

          <p className="text-[#737373] text-[14px] leading-[20px] mt-4">
            Problems trying to resolve the conflict between the two major
            realms of Classical physics: Newtonian mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {teamMembers.map((member) => (
            <article key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[320px] object-cover"
              />

              <h3 className="text-[#252B42] text-[16px] font-bold mt-7">
                {member.name}
              </h3>

              <p className="text-[#737373] text-[14px] font-bold mt-2">
                {member.role}
              </p>

              <div className="flex justify-center gap-5 text-[#23A6F0] mt-4">
                <FaFacebook size={20} />
                <FaInstagram size={20} />
                <FaTwitter size={20} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMPANIES */}
      <section className="bg-[#FAFAFA] py-20">
        <div className="max-w-[1050px] mx-auto px-6">
          <div className="text-center max-w-[610px] mx-auto">
            <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold">
              Big Companies Are Here
            </h2>

            <p className="text-[#737373] text-[14px] leading-[20px] mt-4">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-8 items-center mt-16">
  {companies.map((company) => (
    <div
      key={company.alt}
      className="flex justify-center items-center"
    >
      <img
        src={company.image}
        alt={company.alt}
       className="h-[52px] w-auto object-contain opacity-70 hover:opacity-100 transition"
      />
    </div>
  ))}
</div>
        </div>
      </section>

      {/* WORK WITH US */}
      <section className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          <div className="w-full lg:w-[58%] bg-[#2A7CC7] text-white flex items-center">
            <div className="w-full max-w-[600px] ml-auto px-10 lg:px-16 py-20">
              <p className="text-[16px] font-bold">
                WORK WITH US
              </p>

              <h2 className="text-[40px] leading-[50px] font-bold mt-5">
                Now Let&apos;s grow Yours
              </h2>

              <p className="text-[14px] leading-[20px] max-w-[440px] mt-6">
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th
                century.
              </p>

              <button
                type="button"
                className="mt-7 border border-white px-10 py-4 rounded-[5px] font-bold hover:bg-white hover:text-[#2A7CC7] transition"
              >
                Button
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[42%] min-h-[400px] lg:min-h-[500px]">
            <img
              src={pinkGirl}
              alt="Work With Us"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;