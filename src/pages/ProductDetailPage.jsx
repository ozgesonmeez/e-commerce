import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Eye } from "lucide-react";

import ProductSection from "../components/ProductSection";
import { fetchProduct } from "../store/actions/productActions.js";
import { addToCart } from "../store/actions/shoppingCartActions.js";
import { toast } from "react-toastify";

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) => state.product.selectedProduct);
  const fetchState = useSelector((state) => state.product.fetchState);
  

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
  dispatch(addToCart(product));
  toast.success("Product added to cart!");
};

  if (fetchState === "FETCHING") {
    return (
      <main className="max-w-[1050px] mx-auto px-4 py-20">
        <p className="text-center text-[#737373] font-bold">
          Loading product...
        </p>
      </main>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <main className="max-w-[1050px] mx-auto px-4 py-20">
        <h1 className="text-[32px] font-bold text-[#252B42]">
          Product Not Found
        </h1>

        <Link to="/shop" className="inline-block mt-6 text-[#23A6F0] font-bold">
          ← Back to Shop
        </Link>
      </main>
    );
  }

  const imageUrl = product?.images?.[0]?.url;

  return (
    <main className="bg-white">
      <section className="max-w-[1050px] mx-auto px-4 py-10">
        <div className="flex gap-2 text-[14px] font-bold mb-10">
          <Link to="/" className="text-[#252B42]">
            Home
          </Link>
          <span className="text-[#BDBDBD]">{">"}</span>
          <Link to="/shop" className="text-[#737373]">
            Shop
          </Link>
        </div>

        <button
          onClick={() => history.goBack()}
          className="mb-8 text-[#23A6F0] font-bold"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="bg-[#FAFAFA] flex justify-center items-center p-4 h-[450px]">
              <img
                src={imageUrl}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="flex gap-4 mt-5">
              {product?.images?.map((image) => (
                <div
                  key={image.index}
                  className="w-[100px] h-[75px] border border-[#DDDDDD] p-1"
                >
                  <img
                    src={image.url}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 pt-4">
            <h1 className="text-[#252B42] text-[24px] font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="text-[#F3CD03] text-[18px]">★★★★★</div>

              <p className="text-[#737373] text-[14px] font-bold">
                {product.rating} Rating
              </p>
            </div>

            <div className="flex gap-3 mt-5 text-[24px] font-bold">
              <span className="text-[#252B42]">${product.price}</span>
            </div>

            <p className="mt-2 text-[#737373] text-[14px] font-bold">
              Availability :
              <span className="text-[#23A6F0] ml-2">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <p className="mt-8 text-[#858585] text-[14px] leading-[22px] max-w-[450px]">
              {product.description}
            </p>

            <div className="border-t border-[#BDBDBD] mt-8 pt-7">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#23A6F0]"></div>
                <div className="w-7 h-7 rounded-full bg-[#2DC071]"></div>
                <div className="w-7 h-7 rounded-full bg-[#E77C40]"></div>
                <div className="w-7 h-7 rounded-full bg-[#252B42]"></div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
  onClick={handleAddToCart}
  className="bg-[#23A6F0] text-white text-[14px] font-bold px-6 py-3 rounded-[5px]"
>
 Sepete Ekle
</button>

                <button className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center">
                  <Heart size={18} />
                </button>

                <button className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center">
                  <ShoppingCart size={18} />
                </button>

                <button className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <p className="mt-6 text-[#737373] text-[14px]">
              Product ID: {productId}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#ECECEC] mt-10">
        <div className="max-w-[1050px] mx-auto px-4 py-10">
          <div className="flex justify-center gap-10 text-[14px] font-bold text-[#737373]">
            <span>Description</span>
            <span>Additional Information</span>
            <span>
              Reviews <span className="text-[#23856D]">(0)</span>
            </span>
          </div>

          <div className="mt-12">
            <h3 className="text-[#252B42] text-[24px] font-bold">
              Product Description
            </h3>

            <p className="mt-4 text-[#737373] text-[14px] leading-[22px]">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      <ProductSection />
    </main>
  );
}

export default ProductDetailPage;