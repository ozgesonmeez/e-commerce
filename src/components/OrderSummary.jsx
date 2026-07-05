import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function OrderSummary() {
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const history = useHistory();
  const location = useLocation();

  const getPriceNumber = (price) => {
    return Number(String(price).replace("$", ""));
  };

  const subtotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => {
      return sum + getPriceNumber(item.product.price) * item.count;
    }, 0);

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 150
      ? 0
      : 29.99;

  const discount = subtotal >= 200 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;
  const freeShippingRemaining = 150 - subtotal;

  const isCartPage = location.pathname === "/cart";
  const isOrderPage = location.pathname === "/order";
  const isPaymentPage = location.pathname === "/payment";

  const handleNextStep = () => {
    if (isCartPage) {
      history.push("/order");
    }

    if (isOrderPage) {
      history.push("/payment");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 h-fit sticky top-6 shadow-sm">
      <h2 className="text-[22px] font-bold text-[#252B42] mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 text-[15px]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div>
          <div className="flex justify-between">
            <span>Shipping</span>

            {shipping === 0 ? (
              <span className="text-[#2DC071] font-bold">FREE</span>
            ) : (
              <span>${shipping.toFixed(2)}</span>
            )}
          </div>

          {subtotal > 0 && subtotal < 150 && (
            <p className="text-[12px] text-[#737373] mt-2">
              Add ${freeShippingRemaining.toFixed(2)} more for free shipping.
            </p>
          )}

          {subtotal >= 150 && (
            <p className="text-[12px] text-[#2DC071] font-bold mt-2">
              Free shipping unlocked!
            </p>
          )}
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

      {!isPaymentPage && (
        <>
          <button
            type="button"
            onClick={handleNextStep}
            disabled={subtotal === 0}
            className="w-full mt-8 bg-[#23A6F0] text-white py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isCartPage ? "Siparişi Tamamla" : "Ödemeye Geç"}
          </button>

          <p className="text-[#737373] text-[12px] mt-3 text-center">
            {isCartPage
              ? "Bir sonraki adımda teslimat adresini seçeceksin."
              : "Bir sonraki adımda ödeme bilgilerini ekleyeceksin."}
          </p>
        </>
      )}

      {isPaymentPage && (
        <p className="text-[#737373] text-[12px] mt-6 text-center">
          Kartını seçtikten sonra siparişini tamamlayabilirsin.
        </p>
      )}
    </div>
  );
}

export default OrderSummary;