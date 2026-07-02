import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchAddressList } from "../store/actions/clientActions.js";

function OrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.client.user);
  const addressList = useSelector((state) => state.client.addressList);

  useEffect(() => {
    const token = localStorage.getItem("token");

   if (!token) {
  history.push("/login");
  return;
}
    dispatch(fetchAddressList());
  }, [dispatch, history, user]);

  return (
    <main className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1050px] mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
          Create Order
        </h1>

        <div className="bg-white border border-[#E6E6E6] rounded-md p-6">
          <h2 className="text-[24px] font-bold text-[#252B42] mb-6">
            Step 1 - Address
          </h2>

          {addressList.length === 0 ? (
            <p className="text-[#737373] font-bold">
              You do not have any saved address.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {addressList.map((address) => (
                <div
                  key={address.id}
                  className="border border-[#E6E6E6] rounded-md p-5 bg-[#FAFAFA]"
                >
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
                    {address.neighborhood}, {address.district} / {address.city}
                  </p>

                  <p className="text-[#737373] text-[14px] mt-1">
                    {address.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default OrderPage;