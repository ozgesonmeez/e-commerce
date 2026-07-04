import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import OrderSummary from "../components/OrderSummary";

import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  toggleCartItem,
  clearCart,
} from "../store/actions/shoppingCartActions.js";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart || []);

  const getPriceNumber = (price) => {
    return Number(String(price).replace("$", ""));
  };

  const formatPrice = (price) => {
    return `$${getPriceNumber(price).toFixed(2)}`;
  };

  if (cart.length === 0) {
    return (
      <main className="bg-[#FAFAFA] min-h-screen py-12 px-4">
        <div className="max-w-[700px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-8 md:p-10 text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#EAF6FF] text-[#23A6F0] mx-auto flex items-center justify-center mb-6">
            <ShoppingCart size={38} />
          </div>

          <h1 className="text-[30px] font-bold text-[#252B42]">
            Sepetin Boş
          </h1>

          <p className="text-[#737373] text-[15px] mt-3 mb-8">
            Beğendiğin ürünleri sepete ekleyerek alışverişe başlayabilirsin.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-[#23A6F0] text-white px-8 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
          >
            Alışverişe Başla
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-[30px] md:text-[38px] font-bold text-[#252B42]">
            Shopping Cart
          </h1>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="border border-red-500 text-red-500 px-5 py-2.5 rounded-md font-bold hover:bg-red-50 transition"
          >
            Sepeti Temizle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="flex flex-col gap-5">
            {cart.map((item) => {
              const unitPrice = getPriceNumber(item.product.price);
              const totalPrice = unitPrice * item.count;

              return (
                <div
                  key={item.product.id}
                  className="bg-white border border-[#E6E6E6] rounded-2xl p-5 flex flex-col md:flex-row items-center gap-5 shadow-sm hover:shadow-md transition"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleCartItem(item.product.id))}
                    className="w-5 h-5"
                  />

                  <img
                    src={item.product.images?.[0]?.url}
                    alt={item.product.name}
                    className="w-[110px] h-[130px] object-cover rounded-md"
                  />

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-[#252B42] text-[16px] font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-[#737373] text-[14px] mt-2 line-clamp-2">
                      {item.product.description}
                    </p>

                    <p className="text-[#23856D] text-[16px] font-bold mt-3">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseCartItem(item.product.id))
                      }
                      className="w-9 h-9 border border-[#E6E6E6] rounded-md font-bold hover:bg-[#FAFAFA] transition"
                    >
                      -
                    </button>

                    <span className="font-bold min-w-[20px] text-center">
                      {item.count}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(increaseCartItem(item.product.id))
                      }
                      className="w-9 h-9 border border-[#E6E6E6] rounded-md font-bold hover:bg-[#FAFAFA] transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-[#252B42] font-bold min-w-[90px] text-center md:text-right">
                    {formatPrice(totalPrice)}
                  </p>

                  <button
                    type="button"
                    onClick={() => dispatch(removeCartItem(item.product.id))}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>

          <OrderSummary />
        </div>
      </div>
    </main>
  );
}

export default CartPage;