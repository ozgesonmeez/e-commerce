import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addressList = useSelector((state) => state.client.addressList);

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

    dispatch(fetchAddressList());
  }, [dispatch, history]);

 const onSubmit = async (data) => {
  try {
    if (editingAddress) {
      await dispatch(updateAddress({ ...data, id: editingAddress.id }));
      toast.success("Address updated successfully!");
    } else {
      await dispatch(addAddress(data));
      toast.success("Address added successfully!");
    }

    reset();
    setShowForm(false);
    setEditingAddress(null);
  } catch (error) {
    toast.error("Address could not be saved.");
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
    toast.success("Address deleted successfully!");
  } catch (error) {
    toast.error("Address could not be deleted.");
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[24px] font-bold text-[#252B42]">
                Step 1 - Address
              </h2>

              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#23A6F0] text-white px-5 py-3 rounded-md font-bold"
              >
                {showForm ? "Close Form" : "Add New Address"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                <input
                  placeholder="Title"
                  className="border p-3 rounded-md"
                  {...register("title", { required: "Title is required" })}
                />

                <input
                  placeholder="Name"
                  className="border p-3 rounded-md"
                  {...register("name", { required: "Name is required" })}
                />

                <input
                  placeholder="Surname"
                  className="border p-3 rounded-md"
                  {...register("surname", { required: "Surname is required" })}
                />

                <input
                  placeholder="Phone"
                  className="border p-3 rounded-md"
                  {...register("phone", { required: "Phone is required" })}
                />

                <input
                  placeholder="City"
                  className="border p-3 rounded-md"
                  {...register("city", { required: "City is required" })}
                />

                <input
                  placeholder="District"
                  className="border p-3 rounded-md"
                  {...register("district", { required: "District is required" })}
                />

                <input
                  placeholder="Neighborhood"
                  className="border p-3 rounded-md"
                  {...register("neighborhood", {
                    required: "Neighborhood is required",
                  })}
                />

                <textarea
                  placeholder="Address"
                  className="border p-3 rounded-md md:col-span-2"
                  {...register("address", { required: "Address is required" })}
                />

                <button
                  type="submit"
                  className="bg-[#2DC071] text-white py-3 rounded-md font-bold md:col-span-2"
                >
                  Save Address
                </button>
              </form>
            )}

            {addressList.length === 0 ? (
              <p className="text-[#737373] font-bold">
                You do not have any saved address.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addressList.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => handleSelectAddress(address)}
                    className={`border rounded-md p-5 cursor-pointer bg-[#FAFAFA] ${
                      selectedAddressId === address.id
                        ? "border-[#23A6F0]"
                        : "border-[#E6E6E6]"
                    }`}
                  >
                    <div className="flex justify-end gap-3 mb-3">
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleEditAddress(address);
    }}
    className="text-[#23A6F0] text-[14px] font-bold"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteAddress(address.id);
    }}
    className="text-red-500 text-[14px] font-bold"
  >
    Delete
  </button>
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
                      {address.neighborhood}, {address.district} /{" "}
                      {address.city}
                    </p>

                    <p className="text-[#737373] text-[14px] mt-1">
                      {address.address}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <OrderSummary />
        </div>
      </div>
    </main>
  );
}

export default OrderPage;