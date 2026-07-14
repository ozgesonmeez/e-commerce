import { Link, useHistory } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Shield,
  LogOut,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actions/clientActions.js";
import api from "../api/api.js";

function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const favorites = useSelector((state) => state.shoppingCart.favorites || []);
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const orders = useSelector((state) => state.client.orders || []);
  const addressList = useSelector((state) => state.client.addressList || []);

  const cartCount = cart.reduce((total, item) => total + item.count, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
    history.push("/login");
  };

  const stats = [
    {
      label: "Favori",
      value: favorites.length,
      icon: Heart,
      path: "/favorites",
    },
    {
      label: "Sepet",
      value: cartCount,
      icon: ShoppingCart,
      path: "/cart",
    },
    {
      label: "Sipariş",
      value: orders.length,
      icon: Package,
      path: "/orders",
    },
    {
      label: "Adres",
      value: addressList.length,
      icon: MapPin,
      path: "/order",
    },
  ];

  const menuItems = [
    {
      title: "Siparişlerim",
      description: `${orders.length} sipariş kaydı`,
      icon: Package,
      path: "/orders",
    },
    {
      title: "Favorilerim",
      description: `${favorites.length} favori ürün`,
      icon: Heart,
      path: "/favorites",
    },
    {
      title: "Adreslerim",
      description: `${addressList.length} kayıtlı adres`,
      icon: MapPin,
      path: "/order?mode=addresses"
    },
    {
      title: "Kullanıcı Bilgilerim",
      description: "Ad, soyad ve e-posta bilgilerini yönet",
      icon: User,
      path: "/profile/personal-info",
    },
    {
      title: "Güvenlik",
      description: "Şifre ve hesap güvenliği ayarları",
      icon: Shield,
      path: "/profile/security",
    },
  ];

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="mb-8">
          <p className="text-[#737373] font-bold text-[14px]">
            Bandage Account
          </p>
          <h1 className="text-[30px] md:text-[38px] font-bold text-[#252B42] mt-2">
            Hesabım
          </h1>
        </div>

        <section className="bg-white border border-[#E6E6E6] rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#23A6F0] text-white flex items-center justify-center shadow-md">
                <User size={36} />
              </div>

              <div>
                <p className="text-[#737373] text-[14px] font-bold">
                  Hoş geldin
                </p>
                <h2 className="text-[#252B42] text-[22px] md:text-[28px] font-bold">
                  {user?.name || "Kullanıcı"}
                </h2>
                <p className="text-[#737373] text-[13px] md:text-[14px] mt-1">
                  {user?.email || "E-posta bilgisi bulunamadı"}
                </p>
              </div>
            </div>

            <Link
              to="/shop"
              className="bg-[#23A6F0] text-white px-6 py-3 rounded-md font-bold text-center hover:bg-[#1b8fd4] transition"
            >
              Alışverişe Devam Et
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="border border-[#E6E6E6] rounded-xl p-4 hover:shadow-md transition bg-[#FAFAFA]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EAF6FF] text-[#23A6F0] flex items-center justify-center">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-[#252B42] text-[20px] font-bold">
                        {item.value}
                      </p>
                      <p className="text-[#737373] text-[12px] font-bold">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="bg-white border border-[#E6E6E6] rounded-2xl p-6 h-fit shadow-sm">
            <div className="flex items-center gap-4 pb-6 border-b border-[#E6E6E6]">
              <div className="w-14 h-14 rounded-full bg-[#23A6F0] text-white flex items-center justify-center">
                <User size={28} />
              </div>

              <div>
                <p className="text-[#252B42] font-bold">
                  {user?.name || "Kullanıcı"}
                </p>
                <p className="text-[#737373] text-[13px]">
                  {user?.email || "Giriş yapılmadı"}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-[#737373] hover:bg-[#FAFAFA] hover:text-[#23A6F0] transition"
                  >
                    <Icon size={18} />
                    <span className="font-bold text-[14px]">
                      {item.title}
                    </span>
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-red-500 hover:bg-red-50 transition text-left"
              >
                <LogOut size={18} />
                <span className="font-bold text-[14px]">Çıkış Yap</span>
              </button>
            </div>
          </aside>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="bg-white border border-[#E6E6E6] rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EAF6FF] text-[#23A6F0] flex items-center justify-center">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h2 className="text-[#252B42] font-bold text-[16px]">
                        {item.title}
                      </h2>
                      <p className="text-[#737373] text-[13px] mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={20} className="text-[#737373]" />
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="bg-white border border-red-200 rounded-2xl p-6 flex items-center justify-between hover:bg-red-50 transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <LogOut size={24} />
                </div>

                <div>
                  <h2 className="text-red-500 font-bold text-[16px]">
                    Çıkış Yap
                  </h2>
                  <p className="text-[#737373] text-[13px] mt-1">
                    Hesabından güvenli şekilde çıkış yap
                  </p>
                </div>
              </div>

              <ChevronRight size={20} className="text-red-500" />
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;