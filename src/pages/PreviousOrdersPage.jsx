import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchOrders } from "../store/actions/clientActions.js";

function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const orders = useSelector((state) => state.client.orders);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
      return;
    }

    dispatch(fetchOrders());
  }, [dispatch, history]);

  return (
    <main className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1050px] mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-8">
          Previous Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-[#737373] font-bold">
            You do not have any previous orders.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <details
                key={order.id}
                className="bg-white border border-[#E6E6E6] rounded-md p-5"
              >
                <summary className="cursor-pointer font-bold text-[#252B42] flex justify-between">
                  <span>Order #{order.id}</span>
                  <span>${order.price}</span>
                </summary>

                <div className="mt-5 text-[#737373] text-[14px]">
                  <p>
                    <strong>Date:</strong> {order.order_date}
                  </p>

                  <p className="mt-2">
                    <strong>Address ID:</strong> {order.address_id}
                  </p>

                  <div className="mt-5">
                    <h3 className="font-bold text-[#252B42] mb-3">
                      Products
                    </h3>

                    <div className="flex flex-col gap-3">
                      {order.products?.map((product, index) => (
                        <div
                          key={index}
                          className="border border-[#E6E6E6] rounded-md p-3 bg-[#FAFAFA]"
                        >
                          <p>
                            <strong>Product ID:</strong>{" "}
                            {product.product_id}
                          </p>

                          <p>
                            <strong>Count:</strong> {product.count}
                          </p>

                          <p>
                            <strong>Detail:</strong> {product.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default PreviousOrdersPage;