import womenImage from "../assets/women.png";
import videoImage from "../assets/video.png";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import pinkGirl from "../assets/pinkgirl.png";
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

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto min-h-[700px]">
        <div className="flex flex-col lg:flex-row items-center min-h-[700px]">
          <div className="w-full lg:w-1/2 px-10 lg:px-32 text-center lg:text-left">
            <p className="text-[16px] font-bold text-[#252B42]">
              ABOUT COMPANY
            </p>

           <h1 className="text-[40px] lg:text-[58px] font-bold text-[#252B42] mt-6 whitespace-nowrap">
  ABOUT US
</h1>

            <p className="text-[#737373] text-[20px] mt-6 max-w-[380px] mx-auto lg:mx-0">
              We know how large objects will act, but things on a small scale.
            </p>

            <button className="mt-8 bg-[#23A6F0] text-white px-8 py-4 rounded-[5px] font-bold">
              Get Quote Now
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={womenImage}
              alt="About"
              className="w-full max-w-[570px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Problems + Stats Section */}
      <section className="max-w-[1050px] mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-[400px]">
            <h3 className="text-[#E74040] text-[14px] font-bold">
              Problems trying
            </h3>

            <p className="text-[#252B42] text-[24px] leading-[32px] font-bold mt-4">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </p>
          </div>

          <div className="max-w-[450px]">
            <p className="text-[#737373] text-[14px] leading-[20px]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-16 mt-20">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <h2 className="text-[58px] font-bold text-[#252B42]">
                {stat.value}
              </h2>

              <p className="text-[#737373] font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-[1050px] mx-auto px-4 py-20">
  <div className="relative rounded-[20px] overflow-hidden">
    <img
      src={videoImage}
      alt="Video"
      className="w-full h-[540px] object-cover"
    />

    <button className="absolute inset-0 m-auto w-[90px] h-[90px] rounded-full bg-[#23A6F0] text-white text-[32px] flex items-center justify-center">
      ▶
    </button>
  </div>
</section>
<section className="max-w-[1050px] mx-auto py-20">
  <div className="text-center">
    <h2 className="text-[40px] font-bold text-[#252B42]">
      Meet Our Team
    </h2>

    <p className="text-[#737373] mt-4">
      Problems trying to resolve the conflict between
      the two major realms of Classical physics:
      Newtonian mechanics
    </p>
  </div>
</section>
<div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
  {teamMembers.map((member) => (
    <div key={member.name} className="text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-[240px] h-[240px] object-cover"
      />

      <h3 className="text-[#252B42] text-[16px] font-bold mt-6">
        {member.name}
      </h3>

      <p className="text-[#737373] text-[14px] font-bold mt-2">
        {member.role}
      </p>
    </div>
  ))}
</div>
<section className="max-w-[1440px] mx-auto mt-20">
  <div className="flex flex-col lg:flex-row">

    <div className="w-full lg:w-1/2 bg-[#2A7CC7] text-white flex items-center">
      <div className="px-16 py-20">

        <h5 className="text-[16px] font-bold mb-4">
          WORK WITH US
        </h5>

        <h2 className="text-[40px] font-bold mb-6">
          Now Let's grow Yours
        </h2>

        <p className="text-[14px] leading-[20px] max-w-[440px] mb-8">
          The gradual accumulation of information about atomic
          and small-scale behavior during the first quarter
          of the 20th
        </p>

        <button className="border border-white px-10 py-4 rounded-[5px] font-bold">
          Button
        </button>

      </div>
    </div>

    <div className="w-full lg:w-1/2">
      <img
        src={pinkGirl}
        alt="Work With Us"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</section>
    </main>
  );
}

export default AboutPage;