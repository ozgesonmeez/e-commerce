import post1 from "../assets/post1.png";
import post2 from "../assets/post2.png";
import post3 from "../assets/post3.png";

function FeaturedPosts() {
  const posts = [
    { id: 1, image: post1 },
    { id: 2, image: post2 },
    { id: 3, image: post3 },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1050px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#23A6F0] text-[14px] font-bold">
            Practice Advice
          </p>

          <h2 className="text-[#252B42] text-[40px] font-bold mt-2">
            Featured Posts
          </h2>

          <p className="text-[#737373] text-[14px] mt-3 max-w-[470px] mx-auto">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md">
              <div className="relative">
                <img
                  src={post.image}
                  alt="Featured Post"
                  className="w-full h-[300px] object-cover"
                />

                <span className="absolute top-5 left-5 bg-[#E74040] text-white text-[14px] font-bold px-3 py-1 rounded">
                  NEW
                </span>
              </div>

              <div className="p-6">
                <div className="flex gap-4 text-[12px] mb-3">
                  <span className="text-[#8EC2F2]">Google</span>
                  <span className="text-[#737373]">Trending</span>
                  <span className="text-[#737373]">New</span>
                </div>

                <h3 className="text-[#252B42] text-[20px] leading-[30px]">
                  Loudest à la Madison #1 <br />
                  {"(L'integral)"}
                </h3>

                <p className="text-[#737373] text-[14px] leading-[20px] mt-3">
                  We focus on ergonomics and meeting you where you work.
                  It&apos;s only a keystroke away.
                </p>

                <div className="flex justify-between text-[#737373] text-[12px] mt-6">
                  <span>22 April 2021</span>
                  <span>10 comments</span>
                </div>

                <button className="text-[#737373] text-[14px] font-bold mt-6">
                  Learn More &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPosts;