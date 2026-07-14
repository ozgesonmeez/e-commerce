import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

import {
  fetchAddressList,
  addAddress,
  deleteAddress,
  updateAddress,
} from "../store/actions/clientActions.js";
import { setAddress } from "../store/actions/shoppingCartActions.js";
import OrderSummary from "../components/OrderSummary";

function OrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isAddressManagement =
    new URLSearchParams(location.search).get("mode") === "addresses";

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addressList = useSelector(
    (state) => state.client.addressList || []
  );
  const cart = useSelector(
    (state) => state.shoppingCart.cart || []
  );
  const selectedAddress = useSelector(
    (state) => state.shoppingCart.address
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
      return;
    }

    if (!isAddressManagement && cart.length === 0) {
      history.push("/cart");
      return;
    }

    dispatch(fetchAddressList());
  }, [
    dispatch,
    history,
    cart.length,
    isAddressManagement,
  ]);

  useEffect(() => {
    if (selectedAddress?.id) {
      setSelectedAddressId(selectedAddress.id);
    }
  }, [selectedAddress]);

  const onSubmit = async (data) => {
    try {
      if (editingAddress) {
        await dispatch(
          updateAddress({
            ...data,
            id: editingAddress.id,
          })
        );

        toast.success("Adres başarıyla güncellendi!");
      } else {
        await dispatch(addAddress(data));
        toast.success("Adres başarıyla eklendi!");
      }

      reset();
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Address save error:", error);
      toast.error("Adres kaydedilemedi.");
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    dispatch(setAddress(address));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowForm(true);
    reset(address);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId));
      toast.success("Adres başarıyla silindi!");

      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        dispatch(setAddress({}));
      }
    } catch (error) {
      console.error("Address delete error:", error);
      toast.error("Adres silinemedi.");
    }
  };

  const handleToggleForm = () => {
    setShowForm((currentValue) => !currentValue);
    setEditingAddress(null);
    reset();
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="mb-8">
          <p className="text-[#737373] text-[14px] font-bold">
            {isAddressManagement
              ? "Bandage Account"
              : "Checkout"}
          </p>

          <h1 className="text-[30px] md:text-[38px] font-bold text-[#252B42] mt-2">
            {isAddressManagement
              ? "Adreslerim"
              : "Sipariş Oluştur"}
          </h1>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 ${
            isAddressManagement
              ? ""
              : "lg:grid-cols-[1fr_320px]"
          }`}
        >
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[24px] font-bold text-[#252B42]">
                  {isAddressManagement
                    ? "Adres Bilgilerim"
                    : "1. Adım - Teslimat Adresi"}
                </h2>

                <p className="text-[#737373] text-[14px] mt-1">
                  {isAddressManagement
                    ? "Kayıtlı adreslerini ekleyebilir, düzenleyebilir ve silebilirsin."
                    : "Siparişinin teslim edileceği adresi seç."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleForm}
                className="inline-flex items-center justify-center gap-2 bg-[#23A6F0] text-white px-5 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
              >
                <Plus size={18} />

                {showForm
                  ? "Formu Kapat"
                  : "Yeni Adres Ekle"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-[#FAFAFA] border border-[#E6E6E6] rounded-xl p-5"
              >
                <input
                  placeholder="Adres Başlığı"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("title", {
                    required: "Adres başlığı zorunludur",
                  })}
                />

                <input
                  placeholder="Ad"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("name", {
                    required: "Ad zorunludur",
                  })}
                />

                <input
                  placeholder="Soyad"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("surname", {
                    required: "Soyad zorunludur",
                  })}
                />

                <input
                  placeholder="Telefon"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("phone", {
                    required: "Telefon zorunludur",
                  })}
                />

                <select
                  className="border border-[#E6E6E6] p-3 rounded-md bg-white focus:outline-none focus:border-[#23A6F0]"
                  {...register("city", {
                    required: "Şehir zorunludur",
                  })}
                >
                  <option value="">Şehir Seçiniz</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                  <option value="bursa">Bursa</option>
                  <option value="antalya">Antalya</option>
                </select>

                <input
                  placeholder="İlçe"
                  className="border border-[#E6E6E6] p-3 rounded-md focus:outline-none focus:border-[#23A6F0]"
                  {...register("district", {
                    required: "İlçe zorunludur",
                  })}
                />

                <textarea
                  placeholder="Mahalle, sokak, bina ve kapı numarası"
                  className="border border-[#E6E6E6] p-3 rounded-md md:col-span-2 focus:outline-none focus:border-[#23A6F0]"
                  {...register("neighborhood", {
                    required: "Adres detayı zorunludur",
                  })}
                />

                <div className="md:col-span-2">
                  {Object.values(errors).map(
                    (error, index) => (
                      <p
                        key={index}
                        className="text-red-500 text-sm"
                      >
                        {error.message}
                      </p>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#2DC071] text-white py-3 rounded-md font-bold md:col-span-2 hover:bg-[#26a862] transition"
                >
                  {editingAddress
                    ? "Adresi Güncelle"
                    : "Adresi Kaydet"}
                </button>
              </form>
            )}

            {addressList.length === 0 ? (
              <div className="border border-dashed border-[#BDBDBD] rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#EAF6FF] text-[#23A6F0] mx-auto flex items-center justify-center mb-4">
                  <MapPin size={30} />
                </div>

                <p className="text-[#737373] font-bold">
                  Kayıtlı adresin yok. Yeni bir adres
                  ekleyebilirsin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addressList.map((address) => (
                  <div
                    key={address.id}
                    onClick={() =>
                      handleSelectAddress(address)
                    }
                    className={`border rounded-2xl p-5 cursor-pointer bg-[#FAFAFA] transition hover:shadow-md ${
                      selectedAddressId === address.id
                        ? "border-[#23A6F0] ring-2 ring-[#EAF6FF]"
                        : "border-[#E6E6E6]"
                    }`}
                  >
                    <div className="flex justify-between gap-3 mb-3">
                      <span className="text-[#23A6F0] font-bold text-[13px]">
                        {selectedAddressId === address.id
                          ? "Seçili Adres"
                          : "Adres"}
                      </span>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          aria-label="Adresi düzenle"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="text-[#23A6F0] hover:scale-110 transition"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          aria-label="Adresi sil"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteAddress(
                              address.id
                            );
                          }}
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-[#252B42] font-bold text-[18px]">
                      {address.title}
                    </h3>

                    <p className="text-[#737373] text-[14px] mt-2">
                      {address.name} {address.surname}
                    </p>

                    <p className="text-[#737373] text-[14px] mt-1">
                      {address.phone}
                    </p>

                    <p className="text-[#737373] text-[14px] mt-3">
                      {address.neighborhood},{" "}
                      {address.district} / {address.city}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isAddressManagement && (
            <div className="flex flex-col gap-4">
              <OrderSummary />

              <button
                type="button"
                disabled={!selectedAddressId}
                onClick={() => history.push("/payment")}
                className={`w-full py-3 rounded-md font-bold text-white transition ${
                  selectedAddressId
                    ? "bg-[#23A6F0] hover:bg-[#1b8fd4]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Ödemeye Geç
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default OrderPage;