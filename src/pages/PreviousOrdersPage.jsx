import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Package,
  CalendarDays,
  MapPin,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

import { fetchOrders } from "../store/actions/clientActions.js";

function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const orders = useSelector((state) => state.client.orders || []);
console.log(orders);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
      return;
    }

    dispatch(fetchOrders()).finally(() => {
      setLoading(false);
    });
  }, [dispatch, history]);

  const formatPrice = (price) => {
  if (price === undefined || price === null) return "-";

  const numberPrice = Number(String(price).replace("$", ""));

  if (Number.isNaN(numberPrice)) return "-";

  return `$${numberPrice.toFixed(2)}`;
};
  const formatDate = (date) => {
    if (!date) return "Tarih bilgisi yok";

    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="bg-[#FAFAFA] min-h-[70vh] py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
            Siparişlerim
          </h1>

          <div className="bg-white border border-[#E6E6E6] rounded-xl p-8">
            <p className="text-[#737373] font-bold">
              Siparişler yükleniyor...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="mb-8">
          <p className="text-[#737373] text-[14px] font-bold">
            Bandage Account
          </p>
          <h1 className="text-[30px] md:text-[38px] font-bold text-[#252B42] mt-2">
            Siparişlerim
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EAF6FF] text-[#23A6F0] mx-auto flex items-center justify-center mb-5">
              <ShoppingBag size={32} />
            </div>

            <h2 className="text-[#252B42] text-[22px] font-bold">
              Henüz siparişin yok
            </h2>

            <p className="text-[#737373] text-[14px] mt-3 mb-6">
              İlk siparişini oluşturmak için ürünleri keşfetmeye başlayabilirsin.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#23A6F0] text-white px-6 py-3 rounded-md font-bold"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <details
                key={order.id}
                className="group bg-white border border-[#E6E6E6] rounded-2xl p-5 md:p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#EAF6FF] text-[#23A6F0] flex items-center justify-center">
                        <Package size={24} />
                      </div>

                      <div>
                        <h2 className="text-[#252B42] font-bold text-[18px]">
                          Sipariş #{order.id}
                        </h2>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#737373] text-[13px] mt-1">
                          <span className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            {formatDate(order.order_date)}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            Adres ID: {order.address_id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-left md:text-right">
                        <p className="text-[#737373] text-[12px] font-bold">
                          Toplam
                        </p>
                        <p className="text-[#23856D] text-[18px] font-bold">
                          {formatPrice(order.price)}
                        </p>
                      </div>

                      <ChevronDown
                        size={22}
                        className="text-[#737373] group-open:rotate-180 transition"
                      />
                    </div>
                  </div>
                </summary>

                <div className="mt-6 border-t border-[#E6E6E6] pt-5">
                  <h3 className="font-bold text-[#252B42] mb-4">
                    Sipariş Ürünleri
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.products?.map((product, index) => (
                      <div
                        key={`${product.product_id}-${index}`}
                        className="border border-[#E6E6E6] rounded-xl p-4 bg-[#FAFAFA]"
                      >
                        <p className="text-[#252B42] font-bold">
                          Ürün ID: {product.product_id}
                        </p>

                        <p className="text-[#737373] text-[14px] mt-2">
                          Adet:{" "}
                          <span className="font-bold text-[#252B42]">
                            {product.count}
                          </span>
                        </p>

                        <p className="text-[#737373] text-[14px] mt-1">
                          Detay:{" "}
                          <span className="font-bold text-[#252B42]">
                            {product.detail || "Detay yok"}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default PreviousOrdersPage;