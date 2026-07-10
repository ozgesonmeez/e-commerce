import { CalendarDays, ChevronRight, MessageSquare } from "lucide-react";

import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import blog5 from "../assets/blog5.png";
import blog6 from "../assets/blog6.png";

function BlogPage() {
  const posts = [
    {
      image: blog1,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
    {
      image: blog2,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
    {
      image: blog3,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
    {
      image: blog4,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
    {
      image: blog5,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
    {
      image: blog6,
      title: "Koudetat à la Maison #1 (L’intégrale)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments",
    },
  ];

  return (
    <main className="bg-white">
      <section className="max-w-[1050px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {posts.map((post, index) => (
            <article
              key={`${post.title}-${index}`}
              className="bg-white border border-[#E6E6E6] shadow-sm"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[300px] object-cover"
                />

                <span className="absolute top-5 left-5 bg-[#E74040] text-white text-[12px] font-bold px-3 py-1 rounded-[3px]">
                  NEW
                </span>
              </div>

              <div className="px-6 py-7">
                <div className="flex items-center gap-4 text-[12px]">
                  <span className="text-[#8EC2F2]">Google</span>
                  <span className="text-[#737373]">Trending</span>
                  <span className="text-[#737373]">New</span>
                </div>

                <h2 className="text-[#252B42] text-[22px] leading-[30px] font-bold mt-3">
                  {post.title}
                </h2>

                <p className="text-[#737373] text-[14px] leading-[20px] mt-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between gap-4 mt-6 text-[12px] text-[#737373]">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#23A6F0]" />
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#23856D]" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 text-[#737373] text-[14px] font-bold mt-7 hover:text-[#23A6F0] transition"
                >
                  Learn More
                  <ChevronRight size={18} className="text-[#23A6F0]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogPage;