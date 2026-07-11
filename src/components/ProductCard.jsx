import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

import {
  addToCart,
  toggleFavorite,
} from "../store/actions/shoppingCartActions.js";

function ProductCard({
  id,
  image,
  title,
  department,
  oldPrice,
  price,
  stock,
  gender = "kadin",
  categoryName = "urun",
  categoryId = 1,
}) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.shoppingCart.favorites || []
  );

  const product = {
  id,
  name: title,
  title,
  department,
  oldPrice,
  price,
  stock,
  gender,
  categoryName,
  categoryId,
  images: [{ url: image }],
};

  const isFavorite = favorites.some((item) => item.id === id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(addToCart(product));
    toast.success("Ürün sepete eklendi!");
  };

  return (
    <div className="relative w-full sm:w-[239px] bg-white">
      {/* FAVORITE BUTTON */}
      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }
        className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <Heart
          size={20}
          className={
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-[#252B42] hover:text-red-500"
          }
        />
      </button>

      {/* CART BUTTON */}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label="Add to cart"
        className="absolute top-[60px] right-3 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#252B42] transition-all duration-200 hover:scale-110 hover:text-[#23A6F0]"
      >
        <ShoppingCart size={20} />
      </button>

      <Link to={`/product/${id}`} className="block cursor-pointer">
        <div className="w-full sm:w-[239px] h-[380px] sm:h-[427px] bg-[#FAFAFA] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain sm:object-cover"
          />
        </div>

        <div className="text-center py-6 px-2">
          <h3 className="text-[#252B42] text-[16px] font-bold line-clamp-2">
            {title}
          </h3>

          <p className="text-[#737373] text-[14px] font-bold mt-2">
            {department}
          </p>

          <div className="flex justify-center gap-2 mt-2 font-bold">
            <span className="text-[#BDBDBD] line-through">
              {oldPrice}
            </span>

            <span className="text-[#23856D]">
              {price}
            </span>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <div className="w-4 h-4 rounded-full bg-[#23A6F0]" />
            <div className="w-4 h-4 rounded-full bg-[#23856D]" />
            <div className="w-4 h-4 rounded-full bg-[#E77C40]" />
            <div className="w-4 h-4 rounded-full bg-[#252B42]" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;