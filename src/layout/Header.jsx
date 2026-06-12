import {
  Search,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  User,
  Menu,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Header() {
  const navLinks = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];

  return (
    <header className="font-montserrat">
      <div className="hidden md:flex bg-[#252B42] text-white h-[46px] items-center justify-between px-[38px] text-[14px] font-bold">
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-[5px]">
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </div>

          <div className="flex items-center gap-[5px]">
            <Mail size={16} />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>

        <p>Follow Us and get a chance to win 80% off</p>

        <div className="flex items-center gap-[10px]">
          <span>Follow Us :</span>
          <FaInstagram size={16} />
          <FaYoutube size={16} />
          <FaFacebook size={16} />
          <FaTwitter size={16} />
        </div>
      </div>

      <div className="flex items-center h-[58px] px-[38px] bg-white">
        <h1 className="text-[24px] leading-[32px] font-bold text-[#252B42] w-[187px]">
          Bandage
        </h1>

        <nav className="hidden md:flex gap-[15px]">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[14px] leading-[24px] font-bold text-[#737373]"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-[15px] text-[#23A6F0] text-[14px] leading-[24px] font-bold">
          <a href="#" className="flex items-center gap-[5px]">
            <User size={16} />
            Login / Register
          </a>
          <Search size={16} />
          <ShoppingCart size={16} />
          <Heart size={16} />
        </div>

        <div className="ml-auto flex md:hidden items-center gap-6 text-[#252B42]">
          <Search size={20} />
          <ShoppingCart size={20} />
          <Menu size={24} />
        </div>
      </div>
    </header>
  );
}

export default Header;