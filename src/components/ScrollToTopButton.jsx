import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      className={`fixed bottom-8 right-8 z-[999] w-14 h-14 rounded-full bg-[#23A6F0]/90 backdrop-blur-md text-white shadow-xl hover:shadow-2xl border-2 border-white flex items-center justify-center transition-all duration-300 hover:bg-[#1b8fd4] hover:scale-110 active:scale-95 ${
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <ChevronUp size={28} strokeWidth={2.5} />
    </button>
  );
}

export default ScrollToTopButton;