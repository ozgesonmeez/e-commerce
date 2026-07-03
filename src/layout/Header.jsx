import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  User,
  Menu,
  Package,
  LogOut,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/productActions.js";
import { removeFavorite } from "../store/actions/shoppingCartActions.js";
import { setUser } from "../store/actions/clientActions.js";
import api from "../api/api.js";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const favorites = useSelector((state) => state.shoppingCart.favorites);

  const cartCount = cart.reduce((total, item) => total + item.count, 0);
  const favoriteCount = favorites.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
    history.push("/login");
  };

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
          <Link to="/" className="text-[14px] leading-[24px] font-bold text-[#737373]">
            Home
          </Link>

          <div className="relative group">
            <Link to="/shop" className="text-[14px] leading-[24px] font-bold text-[#737373]">
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

          {navLinks.map((link) => (
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
            <div className="relative group">
              <div className="flex items-center gap-[5px] cursor-pointer">
                <User size={16} />
                <span>{user.name}</span>
              </div>

              <div className="absolute right-0 top-full hidden group-hover:flex flex-col bg-white shadow-lg border border-[#E6E6E6] rounded-md min-w-[230px] z-50 py-2">
                <div className="px-4 py-3 border-b border-[#E6E6E6]">
                  <p className="text-[#E77C40] font-bold">{user.name}</p>
                  <p className="text-[#737373] text-[12px] font-normal">{user.email}</p>
                </div>

                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA]">
                  <Package size={16} />
                  Tüm Siparişlerim
                </Link>

                <Link to="/profile/personal-info" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA]">
                  <User size={16} />
                  Kullanıcı Bilgilerim
                </Link>

                <Link to="/favorites" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA]">
                  <Heart size={16} />
                  Favorilerim
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-left px-4 py-3 text-[#737373] hover:bg-[#FAFAFA]"
                >
                  <LogOut size={16} />
                  Çıkış Yap
                </button>
              </div>
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

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCart(!showCart)}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={16} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {showCart && (
              <div className="absolute right-0 top-8 w-[340px] bg-white border border-[#E6E6E6] rounded-lg shadow-lg p-4 z-50 text-[#252B42]">
                <h3 className="text-[16px] font-bold mb-4">Shopping Cart</h3>

                {cart.length === 0 ? (
                  <p className="text-[#737373] text-[14px]">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3 border-b border-[#E6E6E6] pb-3">
                        <img
                          src={item.product.images?.[0]?.url}
                          alt={item.product.name}
                          className="w-[60px] h-[70px] object-cover"
                        />

                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-[#252B42] line-clamp-2">
                            {item.product.name}
                          </p>

                          <p className="text-[#737373] text-[12px] mt-1">
                            Qty: {item.count}
                          </p>

                          <p className="text-[#23856D] text-[14px] font-bold mt-1">
                            ${item.product.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between text-[14px] font-bold pt-2">
                      <span>Total</span>
                      <span className="text-[#23856D]">
                        $
                        {cart
                          .reduce((total, item) => total + item.product.price * item.count, 0)
                          .toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to="/cart"
                      onClick={() => setShowCart(false)}
                      className="block text-center bg-[#23A6F0] text-white py-3 rounded-[5px] mt-2"
                    >
                      Go to Cart
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFavorites(!showFavorites)}
              className="relative cursor-pointer"
            >
              <Heart size={16} />

              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            {showFavorites && (
              <div className="absolute right-0 top-8 w-[320px] bg-white border border-[#E6E6E6] rounded-lg shadow-lg p-4 z-50 text-[#252B42]">
                <h3 className="font-bold mb-4">Favorites</h3>

                {favorites.length === 0 ? (
                  <p className="text-[#737373] text-sm">No favorite products.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {favorites.map((item) => (
                      <div key={item.id} className="flex gap-3 border-b pb-3">
                        <img
                          src={item.images?.[0]?.url}
                          alt={item.name}
                          className="w-14 h-16 object-cover"
                        />

                        <div className="flex-1">
                          <p className="text-sm font-bold line-clamp-2">{item.name}</p>
                          <p className="text-[#23856D] font-bold mt-1">${item.price}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => dispatch(removeFavorite(item.id))}
                          className="text-red-500 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <Link
                      to="/favorites"
                      onClick={() => setShowFavorites(false)}
                      className="block text-center bg-[#23A6F0] text-white py-3 rounded-[5px] mt-3"
                    >
                      View All Favorites
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex md:hidden items-center gap-6 text-[#252B42]">
          <Search size={20} />

          <Link to="/favorites" className="relative">
            <Heart size={20} />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Menu size={24} />
        </div>
      </div>
    </header>
  );
}

export default Header;