import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  toggleCartItem,
} from "../store/actions/shoppingCartActions.js";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedTotal = cart
    .filter((item) => item.checked)
    .reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );

  if (cart.length === 0) {
    return (
      <main className="max-w-[1050px] mx-auto px-4 py-20">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-6">
          Shopping Cart
        </h1>

        <p className="text-[#737373] font-bold">
          Your cart is empty.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1050px] mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col gap-5">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white border border-[#E6E6E6] rounded-md p-5 flex flex-col md:flex-row items-center gap-5"
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
                className="w-[100px] h-[120px] object-cover"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[#252B42] text-[16px] font-bold">
                  {item.product.name}
                </h2>

                <p className="text-[#737373] text-[14px] mt-2">
                  {item.product.description}
                </p>

                <p className="text-[#23856D] text-[16px] font-bold mt-3">
                  ${item.product.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseCartItem(item.product.id))}
                  className="w-8 h-8 border rounded"
                >
                  -
                </button>

                <span className="font-bold">{item.count}</span>

                <button
                  onClick={() => dispatch(increaseCartItem(item.product.id))}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
              </div>

              <p className="text-[#252B42] font-bold min-w-[90px] text-right">
                ${(item.product.price * item.count).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeCartItem(item.product.id))}
                className="text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E6E6E6] rounded-md p-6 mt-8 flex justify-between items-center">
          <span className="text-[20px] font-bold text-[#252B42]">
            Selected Total
          </span>

          <span className="text-[24px] font-bold text-[#23856D]">
            ${selectedTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </main>
  );
}

export default CartPage;