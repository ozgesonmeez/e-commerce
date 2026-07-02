import { useEffect } from "react";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/productActions.js";

function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const womenCategories = categories.filter((category) => category.gender === "k");
  const menCategories = categories.filter((category) => category.gender === "e");

  const createCategoryPath = (category) => {
    const genderPath = category.gender === "k" ? "kadin" : "erkek";
    const categoryName = slugify(category.title);

    return `/shop/${genderPath}/${categoryName}/${category.id}`;
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "Pages", path: "/" },
  ];

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

      <div className="flex items-center h-[58px] px-[38px] bg-white relative">
        <Link
          to="/"
          className="text-[24px] leading-[32px] font-bold text-[#252B42] w-[187px]"
        >
          Bandage
        </Link>

        <nav className="hidden md:flex gap-[15px] items-center">
          <Link
            to="/"
            className="text-[14px] leading-[24px] font-bold text-[#737373]"
          >
            Home
          </Link>

          <div className="relative group">
            <Link
              to="/shop"
              className="text-[14px] leading-[24px] font-bold text-[#737373]"
            >
              Shop ▾
            </Link>

            <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-lg p-8 gap-16 z-50 min-w-[520px]">
              <div>
                <h3 className="text-[#252B42] font-bold mb-4">Kadın</h3>

                <div className="flex flex-col gap-3">
                  {womenCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={createCategoryPath(category)}
                      className="text-[#737373] text-[14px] font-bold"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#252B42] font-bold mb-4">Erkek</h3>

                <div className="flex flex-col gap-3">
                  {menCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={createCategoryPath(category)}
                      className="text-[#737373] text-[14px] font-bold"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-[14px] leading-[24px] font-bold text-[#737373]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-[15px] text-[#23A6F0] text-[14px] leading-[24px] font-bold">
          {user?.name ? (
            <div className="flex items-center gap-[5px]">
              <User size={16} />
              <span>{user.name}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-[5px]">
                <User size={16} />
                Login
              </Link>

              <span>/</span>

              <Link to="/signup">Register</Link>
            </>
          )}

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