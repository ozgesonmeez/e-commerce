import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function OrderSummary() {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const subtotal = cart
    .filter((item) => item.checked)
    .reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );

  const shipping = subtotal > 0 ? 29.99 : 0;

  const discount = subtotal >= 200 ? subtotal * 0.1 : 0;

  const total = subtotal + shipping - discount;
  const history = useHistory();

  return (
    <div className="bg-white rounded-lg border border-[#E6E6E6] p-6 h-fit sticky top-6">
      <h2 className="text-[22px] font-bold text-[#252B42] mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 text-[15px]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-[20px] font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

    <button
  onClick={() => history.push("/order")}
  className="w-full mt-8 bg-[#23A6F0] text-white py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
>
  Create Order
</button>
    </div>
  );
}

export default OrderSummary;