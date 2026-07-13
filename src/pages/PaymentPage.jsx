import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Check,
  CircleHelp,
  CreditCard,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  Trash2,
} from "lucide-react";

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

  const creditCards = useSelector(
    (state) => state.client.creditCards || []
  );

  const cart = useSelector(
    (state) => state.shoppingCart.cart || []
  );

  const selectedAddress = useSelector(
    (state) => state.shoppingCart.address || {}
  );

  const selectedPayment = useSelector(
    (state) => state.shoppingCart.payment || {}
  );

  const [paymentMode, setPaymentMode] = useState("saved");
  const [selectedCardId, setSelectedCardId] = useState(
    selectedPayment?.id || null
  );
  const [editingCard, setEditingCard] = useState(null);
  const [paymentCvv, setPaymentCvv] = useState("");
  const [useThreeDSecure, setUseThreeDSecure] =
    useState(false);
  const [installment, setInstallment] =
    useState("single");
  const [isCompleting, setIsCompleting] =
    useState(false);

  const currentYear = new Date().getFullYear();

  const months = Array.from(
    { length: 12 },
    (_, index) => index + 1
  );

  const years = Array.from(
    { length: 15 },
    (_, index) => currentYear + index
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      card_no: "",
      name_on_card: "",
      expire_month: "",
      expire_year: "",
    },
  });

  const watchedCardNumber = watch("card_no");

  const checkedCart = useMemo(
    () => cart.filter((item) => item.checked),
    [cart]
  );

  const getPriceNumber = (price) => {
    if (typeof price === "number") {
      return price;
    }

    return Number(
      String(price)
        .replace("$", "")
        .replace("₺", "")
        .replace(",", ".")
        .trim()
    );
  };

  const productsTotal = useMemo(() => {
    return checkedCart.reduce(
      (total, item) =>
        total +
        getPriceNumber(item.product.price) *
          item.count,
      0
    );
  }, [checkedCart]);

  const cleanCardNumber = (value) =>
    String(value || "").replace(/\D/g, "");

  const formatCardNumber = (value) => {
    return cleanCardNumber(value)
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const maskCardNumber = (value) => {
    const cleaned = cleanCardNumber(value);

    if (!cleaned) {
      return "**** **** **** ****";
    }

    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "tr-TR",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info(
        "Ödeme adımına devam etmek için giriş yapmalısın."
      );
      history.push("/login");
      return;
    }

    if (cart.length === 0) {
      toast.info("Sepetinde ürün bulunmuyor.");
      history.push("/cart");
      return;
    }

    if (!selectedAddress?.id) {
      toast.info(
        "Önce teslimat adresini seçmelisin."
      );
      history.push("/order");
      return;
    }

    dispatch(fetchCardList());
  }, [
    dispatch,
    history,
    cart.length,
    selectedAddress?.id,
  ]);

  useEffect(() => {
    if (selectedPayment?.id) {
      setSelectedCardId(selectedPayment.id);
    }
  }, [selectedPayment]);

useEffect(() => {
  if (creditCards.length === 0) {
    setPaymentMode("new");
    setSelectedCardId(null);
    dispatch(setPayment({}));
    return;
  }

  setPaymentMode("saved");

  const selectedCardStillExists = creditCards.some(
    (card) => card.id === selectedCardId
  );

  if (!selectedCardStillExists) {
    const firstCard = creditCards[0];

    setSelectedCardId(firstCard.id);
    dispatch(setPayment(firstCard));
  }
}, [creditCards]);

  const resetCardForm = () => {
    reset({
      card_no: "",
      name_on_card: "",
      expire_month: "",
      expire_year: "",
    });

    setEditingCard(null);
  };

  const switchToNewCard = () => {
    setPaymentMode("new");
    setSelectedCardId(null);
    setPaymentCvv("");
    dispatch(setPayment({}));
    resetCardForm();
  };

  const switchToSavedCard = () => {
    setPaymentMode("saved");
    setEditingCard(null);
    resetCardForm();
  };

  const handleCardNumberChange = (event) => {
    const formattedValue = formatCardNumber(
      event.target.value
    );

    setValue("card_no", formattedValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSelectCard = (card) => {
    setSelectedCardId(card.id);
    setPaymentCvv("");
    dispatch(setPayment(card));
  };

  const handleEditCard = (card) => {
    setPaymentMode("new");
    setEditingCard(card);

    setValue(
      "card_no",
      formatCardNumber(card.card_no),
      {
        shouldValidate: true,
      }
    );

    setValue(
      "name_on_card",
      card.name_on_card,
      {
        shouldValidate: true,
      }
    );

    setValue(
      "expire_month",
      String(card.expire_month),
      {
        shouldValidate: true,
      }
    );

    setValue(
      "expire_year",
      String(card.expire_year),
      {
        shouldValidate: true,
      }
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteCard = async (cardId) => {
    const shouldDelete = window.confirm(
      "Bu kartı silmek istediğine emin misin?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await dispatch(deleteCard(cardId));

      if (selectedCardId === cardId) {
        setSelectedCardId(null);
        setPaymentCvv("");
        dispatch(setPayment({}));
      }

      if (editingCard?.id === cardId) {
        resetCardForm();
      }

      toast.success("Kart başarıyla silindi.");
    } catch (error) {
      console.error(
        "Delete card error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Kart silinemedi."
      );
    }
  };

  const saveCard = async (data) => {
    const cardData = {
      card_no: cleanCardNumber(data.card_no),
      name_on_card: data.name_on_card
        .trim()
        .toUpperCase(),
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
    };

    try {
      let savedCard;

      if (editingCard) {
        savedCard = await dispatch(
          updateCard({
            id: editingCard.id,
            ...cardData,
          })
        );

        toast.success(
          "Kart bilgileri güncellendi."
        );
      } else {
        savedCard = await dispatch(
          addCard(cardData)
        );

        toast.success("Kart başarıyla kaydedildi.");
      }

      await dispatch(fetchCardList());

      const paymentCard = {
        ...cardData,
        id:
          savedCard?.id ||
          savedCard?.payload?.id ||
          editingCard?.id,
      };

      dispatch(setPayment(paymentCard));
if (paymentCard.id) {
  setSelectedCardId(paymentCard.id);
}

setPaymentMode("saved");
resetCardForm();

return paymentCard;
    } catch (error) {
      console.error(
        "Card save error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Kart kaydedilemedi."
      );

      throw error;
    }
  };

  const submitNewCard = async (data) => {
    await saveCard(data);
  };

  const validateOrder = () => {
    if (!selectedAddress?.id) {
      toast.error(
        "Lütfen teslimat adresi seç."
      );
      history.push("/order");
      return false;
    }

    if (checkedCart.length === 0) {
      toast.error(
        "Sipariş için en az bir ürün seçmelisin."
      );
      history.push("/cart");
      return false;
    }

    if (!selectedPayment?.card_no) {
      toast.error(
        "Lütfen ödeme yapacağın kartı seç."
      );
      return false;
    }

    if (!/^\d{3}$/.test(paymentCvv)) {
      toast.error(
        "Lütfen 3 haneli geçerli bir CVV gir."
      );
      return false;
    }

    return true;
  };

  const sendOrder = async () => {
    if (!validateOrder()) {
      return;
    }

    try {
      setIsCompleting(true);

      const orderData = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),

        card_no: cleanCardNumber(
          selectedPayment.card_no
        ),

        card_name:
          selectedPayment.name_on_card,

        card_expire_month:
          Number(
            selectedPayment.expire_month
          ),

        card_expire_year:
          Number(
            selectedPayment.expire_year
          ),

        card_ccv: Number(paymentCvv),

        price: Number(
          productsTotal.toFixed(2)
        ),

        products: checkedCart.map(
          (item) => ({
            product_id: item.product.id,
            count: item.count,
            detail: item.product.name,
          })
        ),
      };

      await dispatch(
        completeOrder(orderData)
      );

      setPaymentCvv("");

      toast.success(
        "Sipariş başarıyla tamamlandı."
      );

      history.push("/order-success");
    } catch (error) {
      console.error(
        "Complete order error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Sipariş tamamlanamadı."
      );
    } finally {
      setIsCompleting(false);
    }
  };

  const handlePayWithNewCard =
    handleSubmit(async (data) => {
      try {
        const paymentCard =
          await saveCard(data);

        dispatch(setPayment(paymentCard));

        if (!/^\d{3}$/.test(paymentCvv)) {
          toast.error(
            "Lütfen 3 haneli geçerli bir CVV gir."
          );
          return;
        }

        try {
          setIsCompleting(true);

          const orderData = {
            address_id: selectedAddress.id,
            order_date:
              new Date().toISOString(),

            card_no: cleanCardNumber(
              paymentCard.card_no
            ),

            card_name:
              paymentCard.name_on_card,

            card_expire_month:
              Number(
                paymentCard.expire_month
              ),

            card_expire_year:
              Number(
                paymentCard.expire_year
              ),

            card_ccv: Number(paymentCvv),

            price: Number(
              productsTotal.toFixed(2)
            ),

            products: checkedCart.map(
              (item) => ({
                product_id:
                  item.product.id,
                count: item.count,
                detail:
                  item.product.name,
              })
            ),
          };

          await dispatch(
            completeOrder(orderData)
          );

          setPaymentCvv("");

          toast.success(
            "Sipariş başarıyla tamamlandı."
          );

          history.push(
            "/order-success"
          );
        } catch (error) {
          console.error(
            "Complete order error:",
            error.response?.data ||
              error
          );

          toast.error(
            error.response?.data
              ?.message ||
              "Sipariş tamamlanamadı."
          );
        } finally {
          setIsCompleting(false);
        }
      } catch {
        // Kart kaydetme hatası saveCard içinde gösteriliyor.
      }
    });

  return (
    <main className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          <section>
            <div className="border-b border-[#E6E6E6] pb-5 mb-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-[#252B42] text-[24px] md:text-[28px] font-bold">
                  Kart Bilgileri
                </h1>

                <button
                  type="button"
                  onClick={
                    paymentMode === "new"
                      ? switchToSavedCard
                      : switchToNewCard
                  }
                  className="text-left text-[#737373] text-[14px] underline underline-offset-4 hover:text-[#F27A1A] transition"
                >
                  {paymentMode === "new"
                    ? "Kayıtlı kartımla ödeme yap"
                    : "Yeni kart ile ödeme yap"}
                </button>
              </div>
            </div>

            {paymentMode === "new" ? (
              <form
                onSubmit={submitNewCard}
                className="max-w-[760px]"
              >
                <div className="mb-6">
                  <label
                    htmlFor="card_no"
                    className="block text-[#333333] text-[15px] font-semibold mb-3"
                  >
                    Kart Numarası
                  </label>

                  <div className="relative">
                    <input
                      id="card_no"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      {...register("card_no", {
                        required:
                          "Kart numarası zorunludur.",
                        validate: (value) =>
                          cleanCardNumber(value)
                            .length === 16 ||
                          "Kart numarası 16 haneli olmalıdır.",
                      })}
                      onChange={
                        handleCardNumberChange
                      }
                      className={`w-full h-[54px] rounded-md border bg-[#FAFAFA] px-4 pr-14 text-[#252B42] outline-none transition ${
                        errors.card_no
                          ? "border-red-500"
                          : "border-[#D9D9D9] focus:border-[#F27A1A]"
                      }`}
                    />

                    <CreditCard
                      size={22}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />
                  </div>

                  {errors.card_no && (
                    <p className="text-red-500 text-[12px] mt-2">
                      {
                        errors.card_no
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="name_on_card"
                    className="block text-[#333333] text-[15px] font-semibold mb-3"
                  >
                    Kart Üzerindeki İsim
                  </label>

                  <input
                    id="name_on_card"
                    type="text"
                    autoComplete="cc-name"
                    placeholder="AD SOYAD"
                    className={`w-full h-[54px] rounded-md border bg-[#FAFAFA] px-4 uppercase outline-none transition ${
                      errors.name_on_card
                        ? "border-red-500"
                        : "border-[#D9D9D9] focus:border-[#F27A1A]"
                    }`}
                    {...register(
                      "name_on_card",
                      {
                        required:
                          "Kart üzerindeki isim zorunludur.",
                        minLength: {
                          value: 3,
                          message:
                            "Geçerli bir isim giriniz.",
                        },
                      }
                    )}
                  />

                  {errors.name_on_card && (
                    <p className="text-red-500 text-[12px] mt-2">
                      {
                        errors.name_on_card
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_140px] gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="expire_month"
                      className="block text-[#333333] text-[15px] font-semibold mb-3"
                    >
                      Son Kullanma Tarihi
                    </label>

                    <select
                      id="expire_month"
                      autoComplete="cc-exp-month"
                      className={`w-full h-[54px] rounded-md border bg-[#FAFAFA] px-4 outline-none transition ${
                        errors.expire_month
                          ? "border-red-500"
                          : "border-[#D9D9D9] focus:border-[#F27A1A]"
                      }`}
                      {...register(
                        "expire_month",
                        {
                          required:
                            "Ay seçiniz.",
                        }
                      )}
                    >
                      <option value="">
                        Ay
                      </option>

                      {months.map(
                        (month) => (
                          <option
                            key={month}
                            value={month}
                          >
                            {String(
                              month
                            ).padStart(
                              2,
                              "0"
                            )}
                          </option>
                        )
                      )}
                    </select>

                    {errors.expire_month && (
                      <p className="text-red-500 text-[12px] mt-2">
                        {
                          errors
                            .expire_month
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div className="sm:pt-[33px]">
                    <select
                      id="expire_year"
                      autoComplete="cc-exp-year"
                      aria-label="Son kullanma yılı"
                      className={`w-full h-[54px] rounded-md border bg-[#FAFAFA] px-4 outline-none transition ${
                        errors.expire_year
                          ? "border-red-500"
                          : "border-[#D9D9D9] focus:border-[#F27A1A]"
                      }`}
                      {...register(
                        "expire_year",
                        {
                          required:
                            "Yıl seçiniz.",
                        }
                      )}
                    >
                      <option value="">
                        Yıl
                      </option>

                      {years.map(
                        (year) => (
                          <option
                            key={year}
                            value={year}
                          >
                            {year}
                          </option>
                        )
                      )}
                    </select>

                    {errors.expire_year && (
                      <p className="text-red-500 text-[12px] mt-2">
                        {
                          errors
                            .expire_year
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="new-card-cvv"
                      className="flex items-center gap-1 text-[#333333] text-[15px] font-semibold mb-3"
                    >
                      CVV

                      <CircleHelp
                        size={17}
                        className="text-[#F27A1A]"
                      />
                    </label>

                    <input
                      id="new-card-cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="CVV"
                      maxLength={3}
                      value={paymentCvv}
                      onChange={(event) =>
                        setPaymentCvv(
                          event.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(0, 3)
                        )
                      }
                      className="w-full h-[54px] rounded-md border border-[#D9D9D9] bg-[#FAFAFA] px-4 outline-none transition focus:border-[#F27A1A]"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer mb-7">
                  <input
                    type="checkbox"
                    checked={
                      useThreeDSecure
                    }
                    onChange={(event) =>
                      setUseThreeDSecure(
                        event.target
                          .checked
                      )
                    }
                    className="peer sr-only"
                  />

                  <span className="w-5 h-5 flex shrink-0 items-center justify-center rounded border border-[#D9D9D9] bg-white peer-checked:border-[#F27A1A] peer-checked:bg-[#F27A1A]">
                    {useThreeDSecure && (
                      <Check
                        size={14}
                        strokeWidth={3}
                        className="text-white"
                      />
                    )}
                  </span>

                  <span className="flex items-center gap-2 text-[#444444] text-[14px] font-medium">
                    <ShieldCheck
                      size={18}
                      className="text-[#333333]"
                    />

                    3D Secure ile ödemek
                    istiyorum
                  </span>
                </label>

                {editingCard && (
                  <div className="flex flex-wrap gap-3 mb-7">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting
                      }
                      className="h-11 px-6 rounded-md bg-[#F27A1A] text-white text-[14px] font-semibold hover:bg-[#dc6c13] transition disabled:bg-gray-400"
                    >
                      {isSubmitting
                        ? "Güncelleniyor..."
                        : "Kartı Güncelle"}
                    </button>

                    <button
                      type="button"
                      onClick={
                        resetCardForm
                      }
                      className="h-11 px-6 rounded-md border border-[#D9D9D9] text-[#333333] text-[14px] font-semibold hover:bg-[#FAFAFA] transition"
                    >
                      İptal
                    </button>
                  </div>
                )}

                <div className="border-t border-[#E6E6E6] pt-6">
                  <div className="flex items-start gap-3 text-[#737373] text-[12px] leading-5">
                    <LockKeyhole
                      size={17}
                      className="mt-0.5 shrink-0 text-[#F27A1A]"
                    />

                    <p>
                      Kart bilgileriniz
                      güvenli bağlantı
                      üzerinden işlenir. CVV
                      bilginiz kayıt edilmez.
                    </p>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                {creditCards.length === 0 ? (
                  <div className="max-w-[760px] border border-dashed border-[#D9D9D9] rounded-lg px-6 py-12 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFF4EA] flex items-center justify-center">
                      <CreditCard
                        size={27}
                        className="text-[#F27A1A]"
                      />
                    </div>

                    <h2 className="text-[#252B42] font-bold mb-2">
                      Kayıtlı kartınız
                      bulunmuyor
                    </h2>

                    <p className="text-[#737373] text-[14px] mb-5">
                      Ödeme yapmak için yeni
                      bir kart ekleyebilirsiniz.
                    </p>

                    <button
                      type="button"
                      onClick={
                        switchToNewCard
                      }
                      className="h-11 px-6 rounded-md bg-[#F27A1A] text-white font-semibold hover:bg-[#dc6c13] transition"
                    >
                      Yeni Kart Ekle
                    </button>
                  </div>
                ) : (
                  <div className="max-w-[760px] grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creditCards.map(
                      (card) => {
                        const isSelected =
                          selectedCardId ===
                          card.id;

                        return (
                          <article
                            key={
                              card.id
                            }
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              handleSelectCard(
                                card
                              )
                            }
                            onKeyDown={(
                              event
                            ) => {
                              if (
                                event.key ===
                                  "Enter" ||
                                event.key ===
                                  " "
                              ) {
                                handleSelectCard(
                                  card
                                );
                              }
                            }}
                            className={`relative rounded-lg border p-5 cursor-pointer transition ${
                              isSelected
                                ? "border-[#F27A1A] bg-[#FFF9F5] shadow-sm"
                                : "border-[#E6E6E6] bg-white hover:border-[#F27A1A]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? "border-[#F27A1A]"
                                      : "border-[#BDBDBD]"
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="w-3 h-3 rounded-full bg-[#F27A1A]" />
                                  )}
                                </span>

                                <CreditCard
                                  size={
                                    22
                                  }
                                  className="text-[#F27A1A]"
                                />
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  aria-label="Kartı düzenle"
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();
                                    handleEditCard(
                                      card
                                    );
                                  }}
                                  className="text-[#737373] hover:text-[#F27A1A] transition"
                                >
                                  <Pencil
                                    size={
                                      17
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  aria-label="Kartı sil"
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();
                                    handleDeleteCard(
                                      card.id
                                    );
                                  }}
                                  className="text-[#737373] hover:text-red-500 transition"
                                >
                                  <Trash2
                                    size={
                                      17
                                    }
                                  />
                                </button>
                              </div>
                            </div>

                            <p className="mt-6 text-[#252B42] text-[17px] font-semibold tracking-[1px]">
                              {maskCardNumber(
                                card.card_no
                              )}
                            </p>

                            <div className="flex items-end justify-between gap-4 mt-5">
                              <div>
                                <p className="text-[#9B9B9B] text-[10px] uppercase mb-1">
                                  Kart Sahibi
                                </p>

                                <p className="text-[#333333] text-[13px] font-semibold uppercase">
                                  {
                                    card.name_on_card
                                  }
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-[#9B9B9B] text-[10px] uppercase mb-1">
                                  Son Kullanma
                                </p>

                                <p className="text-[#333333] text-[13px] font-semibold">
                                  {String(
                                    card.expire_month
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                                  /
                                  {String(
                                    card.expire_year
                                  ).slice(
                                    -2
                                  )}
                                </p>
                              </div>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>
                )}

                {selectedCardId && (
                  <div className="max-w-[760px] mt-6 border border-[#E6E6E6] rounded-lg bg-[#FAFAFA] p-5">
                    <label
                      htmlFor="saved-card-cvv"
                      className="flex items-center gap-2 text-[#333333] text-[14px] font-semibold mb-3"
                    >
                      Güvenlik Kodu

                      <CircleHelp
                        size={16}
                        className="text-[#F27A1A]"
                      />
                    </label>

                    <input
                      id="saved-card-cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="CVV"
                      maxLength={3}
                      value={paymentCvv}
                      onChange={(event) =>
                        setPaymentCvv(
                          event.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(0, 3)
                        )
                      }
                      className="w-full max-w-[180px] h-[48px] rounded-md border border-[#D9D9D9] bg-white px-4 outline-none transition focus:border-[#F27A1A]"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 border border-[#E6E6E6] rounded-md overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E6E6E6] bg-[#FAFAFA]">
                <span className="w-5 h-5 rounded-full border-2 border-[#F27A1A] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F27A1A]" />
                </span>

                <div>
                  <h2 className="text-[#333333] text-[15px] font-semibold">
                    Kart ile Öde
                  </h2>

                  <p className="text-[#737373] text-[11px] mt-1">
                    Kart ile ödemenizi
                    güvenli şekilde
                    gerçekleştirebilirsiniz.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 border-b md:border-b-0 md:border-r border-[#E6E6E6]">
                  <h3 className="text-[#333333] text-[14px] font-semibold mb-4">
                    Kart Bilgileri
                  </h3>

                  <div className="flex items-center gap-3">
                    <div className="h-7 px-3 rounded border border-[#E6E6E6] bg-white flex items-center text-[10px] font-bold text-[#333333]">
                      VISA
                    </div>

                    <div className="h-7 px-3 rounded border border-[#E6E6E6] bg-white flex items-center text-[10px] font-bold text-[#333333]">
                      Mastercard
                    </div>

                    <div className="h-7 px-3 rounded border border-[#E6E6E6] bg-white flex items-center text-[10px] font-bold text-[#333333]">
                      TROY
                    </div>
                  </div>

                  {watchedCardNumber && (
                    <p className="mt-4 text-[#737373] text-[12px]">
                      Kart:{" "}
                      {formatCardNumber(
                        watchedCardNumber
                      )}
                    </p>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-[#333333] text-[14px] font-semibold mb-1">
                    Taksit Seçenekleri
                  </h3>

                  <p className="text-[#737373] text-[11px] mb-4">
                    Kartınıza uygun taksit
                    seçeneğini seçiniz.
                  </p>

                  <label className="flex items-center justify-between gap-4 cursor-pointer rounded-md border border-[#E6E6E6] p-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="installment"
                        value="single"
                        checked={
                          installment ===
                          "single"
                        }
                        onChange={(
                          event
                        ) =>
                          setInstallment(
                            event.target
                              .value
                          )
                        }
                        className="accent-[#F27A1A]"
                      />

                      <span className="text-[#333333] text-[13px] font-medium">
                        Tek Çekim
                      </span>
                    </div>

                    <span className="text-[#333333] text-[13px] font-semibold">
                      {formatPrice(
                        productsTotal
                      )}{" "}
                      ₺
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:sticky lg:top-6 self-start">
            <OrderSummary />

            <button
  type="button"
  disabled={isCompleting || isSubmitting}
  onClick={
    paymentMode === "new"
      ? handlePayWithNewCard
      : sendOrder
  }
  className="w-full h-[48px] mt-4 rounded-md bg-[#23A6F0] text-white text-[14px] font-bold hover:bg-[#1D8FD1] transition disabled:bg-[#BDBDBD] disabled:cursor-not-allowed"
>
  {isCompleting
    ? "Ödeme İşleniyor..."
    : editingCard
      ? "Kartı Güncelle"
      : "Ödeme Yap"}
</button>

            <div className="mt-4 rounded-md border border-[#E6E6E6] bg-white p-4">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={17}
                  className="mt-0.5 shrink-0 text-[#737373]"
                />

                <p className="text-[#737373] text-[11px] leading-5">
                  Kart bilgileriniz
                  güvenli ödeme altyapısı
                  ile korunmaktadır.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                history.push("/order")
              }
              className="w-full mt-4 text-[#737373] text-[13px] font-semibold hover:text-[#F27A1A] transition"
            >
              Adres Bilgilerine Geri Dön
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;