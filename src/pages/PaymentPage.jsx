import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


import {
  fetchCardList,
  addCard,
  updateCard,
  deleteCard,
} from "../store/actions/clientActions.js";
import { setPayment } from "../store/actions/shoppingCartActions.js";
import OrderSummary from "../components/OrderSummary";
import { completeOrder } from "../store/actions/shoppingCartActions.js";

function PaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showForm, setShowForm] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  const creditCards = useSelector((state) => state.client.creditCards);

  const cart = useSelector((state) => state.shoppingCart.cart);
const selectedAddress = useSelector((state) => state.shoppingCart.address);
const selectedPayment = useSelector((state) => state.shoppingCart.payment);

 const {
  register,
  handleSubmit,
  reset,
  setValue,
} = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
      return;
    }

    dispatch(fetchCardList());
  }, [dispatch, history]);
  const handleCompleteOrder = async () => {
  try {
    const orderData = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: selectedPayment.card_no,
      card_name: selectedPayment.name_on_card,
      card_expire_month: selectedPayment.expire_month,
      card_expire_year: selectedPayment.expire_year,
      card_ccv: 321,
      price: cart
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.product.price * item.count, 0),
      products: cart
        .filter((item) => item.checked)
        .map((item) => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.name,
        })),
    };

    await dispatch(completeOrder(orderData));

    toast.success("Order completed successfully!");
    history.push("/");
  } catch (error) {
    toast.error("Order could not be completed.");
  }
};

  const onSubmit = async (data) => {
  try {
    if (editingCard) {
      await dispatch(
        updateCard({
          id: editingCard.id,
          card_no: data.card_no,
          expire_month: Number(data.expire_month),
          expire_year: Number(data.expire_year),
          name_on_card: data.name_on_card,
        })
      );

      toast.success("Card updated successfully!");
    } else {
      await dispatch(
        addCard({
          card_no: data.card_no,
          expire_month: Number(data.expire_month),
          expire_year: Number(data.expire_year),
          name_on_card: data.name_on_card,
        })
      );

      toast.success("Card added successfully!");
    }

    reset();
    setEditingCard(null);
    setShowForm(false);
  } catch (error) {
    toast.error("Card could not be saved.");
  }
};

  const handleSelectCard = (card) => {
    setSelectedCardId(card.id);
    dispatch(setPayment(card));
  };
  const handleEditCard = (card) => {
  setEditingCard(card);
  setShowForm(true);

  setValue("card_no", card.card_no);
  setValue("name_on_card", card.name_on_card);
  setValue("expire_month", card.expire_month);
  setValue("expire_year", card.expire_year);
};

const handleDeleteCard = async (cardId) => {
  try {
    await dispatch(deleteCard(cardId));
    toast.success("Card deleted successfully!");
  } catch {
    toast.error("Card could not be deleted.");
  }
};

  return (
    <main className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1050px] mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
          Create Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="bg-white border border-[#E6E6E6] rounded-md p-6">
            <h2 className="text-[24px] font-bold text-[#252B42] mb-6">
              Step 2 - Credit Card
            </h2>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#23A6F0] text-white px-5 py-3 rounded-md font-bold mb-6"
            >
              {showForm ? "Close Form" : "Add New Card"}
            </button>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                <input
                  placeholder="Card Number"
                  className="border p-3 rounded-md md:col-span-2"
                  {...register("card_no", { required: true })}
                />

                <input
                  placeholder="Name on Card"
                  className="border p-3 rounded-md md:col-span-2"
                  {...register("name_on_card", { required: true })}
                />

                <input
                  placeholder="Expire Month"
                  className="border p-3 rounded-md"
                  {...register("expire_month", { required: true })}
                />

                <input
                  placeholder="Expire Year"
                  className="border p-3 rounded-md"
                  {...register("expire_year", { required: true })}
                />

                <button
                  type="submit"
                  className="bg-[#2DC071] text-white py-3 rounded-md font-bold md:col-span-2"
                >
                  Save Card
                </button>
              </form>
            )}

            {creditCards.length === 0 ? (
              <p className="text-[#737373] font-bold">
                You do not have any saved card.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {creditCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    className={`border rounded-md p-5 cursor-pointer bg-[#FAFAFA] ${
                      selectedCardId === card.id
                        ? "border-[#23A6F0]"
                        : "border-[#E6E6E6]"
                    }`}
                  >
                    <div className="flex justify-end gap-3 mb-3">
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleEditCard(card);
    }}
    className="text-[#23A6F0] text-[14px] font-bold"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteCard(card.id);
    }}
    className="text-red-500 text-[14px] font-bold"
  >
    Delete
  </button>
</div>
                    

                    
                    <h3 className="text-[#252B42] font-bold">
                      {card.name_on_card}
                    </h3>

                    <p className="text-[#737373] mt-2">
                      **** **** **** {card.card_no?.slice(-4)}
                    </p>

                    <p className="text-[#737373] mt-1">
                      {card.expire_month}/{card.expire_year}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

         <div className="flex flex-col gap-4">
  <OrderSummary />

  <button
    disabled={!selectedCardId}
    onClick={handleCompleteOrder}
    className={`py-3 rounded-md font-bold text-white ${
      selectedCardId
        ? "bg-[#23A6F0]"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    Complete Order
  </button>
</div>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;