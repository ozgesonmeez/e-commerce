import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { toast } from "react-toastify";

import ProductSection from "../components/ProductSection";
import { fetchProduct } from "../store/actions/productActions.js";
import {
  addToCart,
  toggleFavorite,
} from "../store/actions/shoppingCartActions.js";

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = useSelector((state) => state.product.selectedProduct);
  const fetchState = useSelector((state) => state.product.fetchState);
  const favorites = useSelector((state) => state.shoppingCart.favorites || []);

  const isFavorite = favorites.some((item) => item.id === product?.id);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.images?.[0]?.url) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const getPriceNumber = (price) => Number(String(price).replace("$", ""));

  const formatPrice = (price) => {
    const numberPrice = getPriceNumber(price);
    return `$${numberPrice.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Ürün sepete eklendi!");
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(product));

    if (isFavorite) {
      toast.info("Ürün favorilerden kaldırıldı.");
    } else {
      toast.success("Ürün favorilere eklendi!");
    }
  };

  if (fetchState === "FETCHING" || !product || !product.id) {
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

  const images = product.images || [];
  const stockText = product.stock > 0 ? "Stokta Var" : "Stokta Yok";

  return (
    <main className="bg-[#FAFAFA]">
      <section className="max-w-[1180px] mx-auto px-4 md:px-6 py-8 md:py-14">
        <div className="flex flex-wrap gap-2 text-[14px] font-bold mb-8">
          <Link to="/" className="text-[#252B42]">
            Home
          </Link>
          <span className="text-[#BDBDBD]">{">"}</span>
          <Link to="/shop" className="text-[#737373]">
            Shop
          </Link>
          <span className="text-[#BDBDBD]">{">"}</span>
          <span className="text-[#737373]">Product Detail</span>
        </div>

        <button
          type="button"
          onClick={() => history.goBack()}
          className="mb-6 flex items-center gap-2 text-[#23A6F0] font-bold"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div className="bg-white border border-[#E6E6E6] rounded-2xl p-4 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 shadow-sm">
          <div>
            <div className="bg-[#FAFAFA] rounded-xl flex justify-center items-center p-5 h-[360px] md:h-[480px] lg:h-[560px]">
              <img
                src={selectedImage || images[0]?.url}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4 max-w-[520px]">
              {images.map((image, index) => (
                <button
                  key={image.index || index}
                  type="button"
                  onClick={() => setSelectedImage(image.url)}
                  className={`h-[74px] md:h-[88px] rounded-lg border p-2 bg-white hover:border-[#23A6F0] transition ${
                    selectedImage === image.url
                      ? "border-[#23A6F0]"
                      : "border-[#E6E6E6]"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 lg:pt-6">
            <p className="text-[#23A6F0] text-[14px] font-bold mb-3">
              Bandage Product
            </p>

            <h1 className="text-[#252B42] text-[26px] md:text-[34px] lg:text-[38px] font-bold leading-tight max-w-[520px]">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex text-[#F3CD03]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-[#737373] text-[14px] font-bold">
                {product.rating || 0} Rating
              </p>

              <p className="text-[#737373] text-[14px]">10 Reviews</p>
            </div>

            <p className="text-[#252B42] text-[30px] md:text-[34px] font-bold mt-6">
              {formatPrice(product.price)}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <CheckCircle
                size={18}
                className={product.stock > 0 ? "text-[#23856D]" : "text-red-500"}
              />
              <p className="text-[#737373] text-[14px] font-bold">
                Availability:
                <span className="text-[#23A6F0] ml-2">{stockText}</span>
              </p>
            </div>

            <p className="mt-7 text-[#737373] text-[14px] md:text-[15px] leading-[25px] max-w-[520px]">
              {product.description}
            </p>

            <div className="border-t border-[#E6E6E6] mt-8 pt-7">
              <p className="text-[#252B42] font-bold mb-3">Color</p>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#23A6F0] border-2 border-white shadow"
                ></button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#2DC071] border-2 border-white shadow"
                ></button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#E77C40] border-2 border-white shadow"
                ></button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#252B42] border-2 border-white shadow"
                ></button>
              </div>

              <p className="text-[#252B42] font-bold mt-7 mb-3">Size</p>

              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-10 rounded-md border font-bold ${
                      selectedSize === size
                        ? "bg-[#23A6F0] text-white border-[#23A6F0]"
                        : "bg-white text-[#252B42] border-[#E6E6E6]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="bg-[#23A6F0] text-white text-[14px] font-bold px-10 py-3.5 rounded-md hover:bg-[#1b8fd4] transition disabled:bg-gray-300"
                >
                  Sepete Ekle
                </button>

                <button
                  type="button"
                  onClick={handleFavorite}
                  className="w-11 h-11 rounded-full border border-[#E8E8E8] flex items-center justify-center bg-white"
                >
                  <Heart
                    size={19}
                    className={
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-[#252B42]"
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-11 h-11 rounded-full border border-[#E8E8E8] flex items-center justify-center bg-white"
                >
                  <ShoppingCart size={19} />
                </button>

                <button
                  type="button"
                  className="w-11 h-11 rounded-full border border-[#E8E8E8] flex items-center justify-center bg-white"
                >
                  <Eye size={19} />
                </button>
              </div>
            </div>

            <p className="mt-6 text-[#737373] text-[13px]">
              Product ID: {productId}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[#ECECEC] mt-4">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[14px] font-bold text-[#737373]">
            <span>Description</span>
            <span>Additional Information</span>
            <span>
              Reviews <span className="text-[#23856D]">(10)</span>
            </span>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#252B42] text-[24px] font-bold">
                Product Description
              </h3>

              <p className="mt-4 text-[#737373] text-[14px] leading-[24px]">
                {product.description}
              </p>
            </div>

            <div className="bg-[#FAFAFA] rounded-xl p-6">
              <h3 className="text-[#252B42] text-[20px] font-bold mb-4">
                Product Details
              </h3>

              <div className="flex justify-between py-2 border-b border-[#E6E6E6]">
                <span className="text-[#737373]">Stock</span>
                <span className="font-bold text-[#252B42]">{product.stock}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#E6E6E6]">
                <span className="text-[#737373]">Rating</span>
                <span className="font-bold text-[#252B42]">
                  {product.rating || 0}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-[#737373]">Selected Size</span>
                <span className="font-bold text-[#252B42]">
                  {selectedSize}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSection />
    </main>
  );
}

export default ProductDetailPage;