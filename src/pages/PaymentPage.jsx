import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react";

import {
  fetchCardList,
  addCard,
  updateCard,
  deleteCard,
} from "../store/actions/clientActions.js";
import {
  setPayment,
  completeOrder,
} from "../store/actions/shoppingCartActions.js";
import OrderSummary from "../components/OrderSummary";

function PaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showForm, setShowForm] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const creditCards = useSelector((state) => state.client.creditCards || []);
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const selectedAddress = useSelector((state) => state.shoppingCart.address || {});
  const selectedPayment = useSelector((state) => state.shoppingCart.payment || {});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const getPriceNumber = (price) => {
    return Number(String(price).replace("$", ""));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
      return;
    }

    if (cart.length === 0) {
      history.push("/cart");
      return;
    }

    if (!selectedAddress?.id) {
      history.push("/order");
      return;
    }

    dispatch(fetchCardList());
  }, [dispatch, history, cart.length, selectedAddress]);

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

        toast.success("Kart başarıyla güncellendi!");
      } else {
        await dispatch(
          addCard({
            card_no: data.card_no,
            expire_month: Number(data.expire_month),
            expire_year: Number(data.expire_year),
            name_on_card: data.name_on_card,
          })
        );

        toast.success("Kart başarıyla eklendi!");
      }

      reset();
      setEditingCard(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Kart kaydedilemedi.");
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
      toast.success("Kart başarıyla silindi!");

      if (selectedCardId === cardId) {
        setSelectedCardId(null);
        dispatch(setPayment({}));
      }
    } catch {
      toast.error("Kart silinemedi.");
    }
  };

  const handleCompleteOrder = async () => {
    if (!selectedAddress?.id) {
      toast.error("Lütfen teslimat adresi seç.");
      history.push("/order");
      return;
    }

    if (!selectedPayment?.card_no) {
      toast.error("Lütfen ödeme kartı seç.");
      return;
    }

    try {
      setIsCompleting(true);

      const checkedCart = cart.filter((item) => item.checked);

      const orderData = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: selectedPayment.card_no,
        card_name: selectedPayment.name_on_card,
        card_expire_month: selectedPayment.expire_month,
        card_expire_year: selectedPayment.expire_year,
        card_ccv: 321,
        price: checkedCart.reduce(
          (total, item) =>
            total + getPriceNumber(item.product.price) * item.count,
          0
        ),
        products: checkedCart.map((item) => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.name,
        })),
      };

      await dispatch(completeOrder(orderData));

      toast.success("Sipariş başarıyla tamamlandı!");
      history.push("/order-success");
    } catch (error) {
      toast.error("Sipariş tamamlanamadı.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="mb-8">
          <p className="text-[#737373] text-[14px] font-bold">
            Checkout
          </p>
          <h1 className="text-[30px] md:text-[38px] font-bold text-[#252B42] mt-2">
            Sipariş Oluştur
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[24px] font-bold text-[#252B42]">
                  2. Adım - Ödeme Bilgileri
                </h2>
                <p className="text-[#737373] text-[14px] mt-1">
                  Siparişini tamamlamak için ödeme kartını seç.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingCard(null);
                  reset();
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white px-5 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
              >
                <Plus size={18} />
                {showForm ? "Formu Kapat" : "Yeni Kart Ekle"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-5"
              >
                <input
                  placeholder="Kart Numarası"
                  className="border border-[#E6E6E6] p-3 rounded-md md:col-span-2 focus:outline-none focus:border-[#23A6F0]"
                  {...register("card_no", { required: true })}
                />

                <input
                  placeholder="Kart Üzerindeki İsim"
                  className="border border-[#E6E6E6] p-3 rounded-md md:col-span-2 focus:outline-none focus:border-[#23A6F0]"
                  {...register("name_on_card", { required: true })}
                />

                <input
                  placeholder="Son Kullanma Ayı"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("expire_month", { required: true })}
                />

                <input
                  placeholder="Son Kullanma Yılı"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("expire_year", { required: true })}
                />

                <button
                  type="submit"
                  className="bg-[#2DC071] text-white py-3 rounded-md font-bold md:col-span-2 hover:bg-[#26a862] transition"
                >
                  {editingCard ? "Kartı Güncelle" : "Kartı Kaydet"}
                </button>
              </form>
            )}

            {creditCards.length === 0 ? (
              <div className="border border-dashed border-[#BDBDBD] rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#EAF6FF] text-[#23A6F0] mx-auto flex items-center justify-center mb-4">
                  <CreditCard size={30} />
                </div>

                <p className="text-[#737373] font-bold">
                  Kayıtlı kartın yok. Devam etmek için yeni kart ekle.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {creditCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    className={`border rounded-2xl p-5 cursor-pointer bg-[#FAFAFA] transition hover:shadow-md ${
                      selectedCardId === card.id
                        ? "border-[#23A6F0] ring-2 ring-[#EAF6FF]"
                        : "border-[#E6E6E6]"
                    }`}
                  >
                    <div className="flex justify-between gap-3 mb-3">
                      <span className="text-[#23A6F0] font-bold text-[13px]">
                        {selectedCardId === card.id ? "Seçili Kart" : "Kart"}
                      </span>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCard(card);
                          }}
                          className="text-[#23A6F0] hover:scale-110 transition"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCard(card.id);
                          }}
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-[#252B42] font-bold">
                      {card.name_on_card}
                    </h3>

                    <p className="text-[#737373] mt-2">
                      **** **** **** {String(card.card_no)?.slice(-4)}
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
              type="button"
              disabled={!selectedCardId || isCompleting}
              onClick={handleCompleteOrder}
              className={`py-3 rounded-md font-bold text-white transition ${
                selectedCardId && !isCompleting
                  ? "bg-[#23A6F0] hover:bg-[#1b8fd4]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isCompleting ? "Sipariş Tamamlanıyor..." : "Siparişi Tamamla"}
            </button>

            <button
              type="button"
              onClick={() => history.push("/order")}
              className="py-3 rounded-md font-bold border border-[#23A6F0] text-[#23A6F0] hover:bg-[#EAF6FF] transition"
            >
              Adrese Geri Dön
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;