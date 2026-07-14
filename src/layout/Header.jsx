import { useEffect, useRef, useState } from "react";
import {
  Search,
  X,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  User,
  Menu,
  Package,
  LogOut,
  ChevronDown,
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileShop, setShowMobileShop] = useState(false);

  const [searchText, setSearchText] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });

  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const searchRef = useRef(null);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories || []);
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const favorites = useSelector((state) => state.shoppingCart.favorites || []);

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(user?.name || token);

  const cartCount = cart.reduce((total, item) => total + item.count, 0);
  const favoriteCount = favorites.length;

  const getPriceNumber = (price) => Number(String(price).replace("$", ""));

  const formatPrice = (price) => {
    const numberPrice = getPriceNumber(price);
    return `$${numberPrice.toFixed(2)}`;
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + getPriceNumber(item.product.price) * item.count;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
    history.push("/login");
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }

      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setShowFavorites(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCart(false);
        setShowFavorites(false);
        setShowMobileMenu(false);
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

  const closeMobileMenu = () => {
  setShowMobileMenu(false);
  setShowMobileShop(false);
};

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = searchText.trim();

    if (value) {
      history.push(`/shop?search=${encodeURIComponent(value)}`);
    } else {
      history.push("/shop");
    }

    setShowSearch(false);
    setShowMobileMenu(false);
  };

  const clearSearch = () => {
    setSearchText("");
    history.push("/shop");
    setShowSearch(false);
  };

  return (
    <header className="w-full font-montserrat bg-white">
      <div className="hidden md:block bg-[#252B42] text-white">
        <div className="max-w-[1440px] mx-auto h-[46px] px-6 lg:px-[38px] flex items-center justify-between text-[13px] lg:text-[14px] font-bold">
          <div className="flex items-center gap-5 lg:gap-[30px]">
            <div className="flex items-center gap-[5px]">
              <Phone size={16} />
              <span>(225) 555-0118</span>
            </div>

            <div className="flex items-center gap-[5px]">
              <Mail size={16} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          <p className="hidden lg:block">
            Follow Us and get a chance to win 80% off
          </p>

          <div className="flex items-center gap-[10px]">
            <span>Follow Us :</span>
            <FaInstagram size={16} />
            <FaYoutube size={16} />
            <FaFacebook size={16} />
            <FaTwitter size={16} />
          </div>
        </div>
      </div>

      <div className="border-b border-[#F2F2F2]">
        <div className="max-w-[1440px] mx-auto flex items-center h-[64px] px-5 md:px-6 lg:px-[38px] bg-white relative">
          <Link
            to="/"
            className="text-[24px] leading-[32px] font-bold text-[#252B42] md:w-[170px] lg:w-[187px] transition-all duration-300 hover:text-[#23A6F0] hover:scale-105"
          >
            Bandage
          </Link>

          <nav className="hidden md:flex gap-[14px] lg:gap-[18px] items-center">
            <Link to="/" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
              Home
            </Link>

            <div className="relative group">
              <Link to="/shop" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
                Shop ▾
              </Link>

              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl border border-[#E6E6E6] rounded-lg p-8 gap-16 z-50 min-w-[520px] dropdown-animation">
                <div>
                  <h3 className="text-[#252B42] font-bold mb-4">Kadın</h3>
                  <div className="flex flex-col gap-3">
                    {womenCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={createCategoryPath(category)}
                        className="text-[#737373] text-[14px] font-bold hover:text-[#23A6F0] transition"
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
                        className="text-[#737373] text-[14px] font-bold hover:text-[#23A6F0] transition"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/about" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
              About
            </Link>

            <Link to="/blog" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
              Blog
            </Link>

            <Link to="/contact" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
              Contact
            </Link>

            <Link to="/" className="text-[14px] leading-[24px] font-bold text-[#737373] hover:text-[#23A6F0] transition">
              Pages
            </Link>
          </nav>

          <div className="ml-auto hidden md:flex items-center gap-[14px] lg:gap-[15px] text-[#23A6F0] text-[14px] leading-[24px] font-bold">
            {isLoggedIn ? (
              <div className="relative group">
                <div className="flex items-center gap-[5px] cursor-pointer transition-all duration-200 hover:scale-105">
                  <User size={16} className="transition-all duration-200 group-hover:scale-110" />
                  <span>Hesabım</span>
                </div>

                <div className="absolute right-0 top-full hidden group-hover:flex flex-col bg-white shadow-xl border border-[#E6E6E6] rounded-md min-w-[230px] z-50 py-2 dropdown-animation">
                  <div className="px-4 py-3 border-b border-[#E6E6E6]">
                    <p className="text-[#E77C40] font-bold">
                      {user?.name || "Hesabım"}
                    </p>
                    <p className="text-[#737373] text-[12px] font-normal">
                      {user?.email || ""}
                    </p>
                  </div>

                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA] hover:text-[#23A6F0] transition">
                    <User size={16} />
                    Hesabım
                  </Link>

                  <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA] hover:text-[#23A6F0] transition">
                    <Package size={16} />
                    Tüm Siparişlerim
                  </Link>

                  <Link to="/favorites" className="flex items-center gap-3 px-4 py-3 text-[#737373] hover:bg-[#FAFAFA] hover:text-[#23A6F0] transition">
                    <Heart size={16} />
                    Favorilerim
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-left px-4 py-3 text-[#737373] hover:bg-[#FAFAFA] hover:text-red-500 transition"
                  >
                    <LogOut size={16} />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-[5px] hover:scale-105 transition">
                  <User size={16} />
                  Login
                </Link>

                <span>/</span>

                <Link to="/signup" className="hover:scale-105 transition">
                  Register
                </Link>
              </>
            )}

            <div ref={searchRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowCart(false);
                  setShowFavorites(false);
                }}
                className="transition-all duration-200 hover:scale-110"
              >
                <Search size={16} />
              </button>

              {showSearch && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-8 w-[280px] bg-white border border-[#E6E6E6] rounded-lg shadow-xl p-3 z-50 dropdown-animation"
                >
                  <div className="relative">
                    <input
                      autoFocus
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search products..."
                      className="w-full border border-[#E6E6E6] rounded-md px-3 py-2 pr-10 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
                    />

                    {searchText && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-red-500 transition"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            <div ref={cartRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowCart(!showCart);
                  setShowFavorites(false);
                  setShowSearch(false);
                }}
                className="relative cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110"
              >
                <ShoppingCart size={16} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-125">
                    {cartCount}
                  </span>
                )}
              </button>

              {showCart && (
                <div className="absolute right-0 top-8 w-[340px] bg-white border border-[#E6E6E6] rounded-lg shadow-xl p-4 z-50 text-[#252B42] dropdown-animation">
                  <h3 className="text-[16px] font-bold mb-4">
                    Shopping Cart
                  </h3>

                  {cart.length === 0 ? (
                    <p className="text-[#737373] text-[14px]">
                      Your cart is empty.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-3 border-b border-[#E6E6E6] pb-3"
                        >
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
                              {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between text-[14px] font-bold pt-2">
                        <span>Total</span>
                        <span className="text-[#23856D]">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>

                      <Link
                        to="/cart"
                        onClick={() => setShowCart(false)}
                        className="block text-center bg-[#23A6F0] text-white py-3 rounded-[5px] mt-2 hover:bg-[#1b8fd4] transition"
                      >
                        Go to Cart
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div ref={favoritesRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setShowCart(false);
                  setShowSearch(false);
                }}
                className="relative cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110"
              >
                <Heart
                  size={16}
                  className="transition-colors duration-200 hover:text-red-500"
                />

                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-125">
                    {favoriteCount}
                  </span>
                )}
              </button>

              {showFavorites && (
                <div className="absolute right-0 top-8 w-[320px] bg-white border border-[#E6E6E6] rounded-lg shadow-xl p-4 z-50 text-[#252B42] dropdown-animation">
                  <h3 className="font-bold mb-4">Favorites</h3>

                  {favorites.length === 0 ? (
                    <p className="text-[#737373] text-sm">
                      No favorite products.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {favorites.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 border-b pb-3"
                        >
                          <img
                            src={item.images?.[0]?.url}
                            alt={item.name}
                            className="w-14 h-16 object-cover"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-bold line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-[#23856D] font-bold mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => dispatch(removeFavorite(item.id))}
                            className="text-red-500 text-sm hover:scale-125 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <Link
                        to="/favorites"
                        onClick={() => setShowFavorites(false)}
                        className="block text-center bg-[#23A6F0] text-white py-3 rounded-[5px] mt-3 hover:bg-[#1b8fd4] transition"
                      >
                        View All Favorites
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex md:hidden items-center gap-5 text-[#252B42]">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="transition-all duration-200 hover:scale-110"
            >
              <Search size={20} />
            </button>

            <Link to="/favorites" className="relative transition-all duration-200 hover:-translate-y-1 hover:scale-110">
              <Heart size={20} />
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative transition-all duration-200 hover:-translate-y-1 hover:scale-110">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="transition-all duration-200 hover:scale-110"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {showSearch && (
        <form
          onSubmit={handleSearchSubmit}
          className="md:hidden bg-white border-t border-[#E6E6E6] px-5 py-4 dropdown-animation"
        >
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-3 pr-11 text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
            />

            {searchText && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373] hover:text-red-500 transition"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      )}

      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-[#E6E6E6] px-5 py-5 flex flex-col gap-4 text-[#737373] font-bold shadow-md dropdown-animation">
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
         <div>
  <button
    type="button"
    onClick={() => setShowMobileShop((current) => !current)}
    className="w-full flex items-center justify-between text-left"
  >
    <span>Shop</span>

    <ChevronDown
      size={19}
      className={`transition-transform duration-200 ${
        showMobileShop ? "rotate-180" : ""
      }`}
    />
  </button>

  {showMobileShop && (
    <div className="mt-4 ml-3 pl-4 border-l-2 border-[#E6E6E6] flex flex-col gap-5">
      <Link
        to="/shop"
        onClick={closeMobileMenu}
        className="text-[#23A6F0]"
      >
        Tüm Ürünler
      </Link>

      <div>
        <p className="text-[#252B42] font-bold mb-3">
          Kadın
        </p>

        <div className="flex flex-col gap-3">
          {womenCategories.map((category) => (
            <Link
              key={category.id}
              to={createCategoryPath(category)}
              onClick={closeMobileMenu}
              className="text-[14px] text-[#737373]"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[#252B42] font-bold mb-3">
          Erkek
        </p>

        <div className="flex flex-col gap-3">
          {menCategories.map((category) => (
            <Link
              key={category.id}
              to={createCategoryPath(category)}
              onClick={closeMobileMenu}
              className="text-[14px] text-[#737373]"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>

      {categories.length === 0 && (
        <p className="text-[13px] text-[#737373] font-normal">
          Kategoriler yükleniyor...
        </p>
      )}
    </div>
  )}
</div>
          <Link to="/about" onClick={closeMobileMenu}>
            About
          </Link>
          <Link to="/blog" onClick={closeMobileMenu}>
  Blog
</Link>
          <Link to="/contact" onClick={closeMobileMenu}>
            Contact
          </Link>

          <div className="border-t border-[#E6E6E6] pt-4 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={closeMobileMenu}>
                  Hesabım
                </Link>
                <Link to="/orders" onClick={closeMobileMenu}>
                  Siparişlerim
                </Link>
                <Link to="/favorites" onClick={closeMobileMenu}>
                  Favorilerim
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="text-left text-red-500 font-bold"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;