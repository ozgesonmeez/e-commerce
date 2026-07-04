import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleFavorite } from "../store/actions/shoppingCartActions.js";

function ProductCard({
  id,
  image,
  title,
  department,
  oldPrice,
  price,
  gender = "kadin",
  categoryName = "urun",
  categoryId = 1,
}) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.shoppingCart.favorites || []);

  const product = {
    id,
    name: title,
    title,
    department,
    oldPrice,
    price,
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

  return (
    <div className="relative w-full sm:w-[239px]">
      <button
        type="button"
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <Heart
          size={20}
          className={
            isFavorite ? "fill-red-500 text-red-500" : "text-[#252B42]"
          }
        />
      </button>

      <Link to={`/product/${id}`} className="block cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full sm:w-[239px] h-[360px] sm:h-[427px] object-cover"
        />

        <div className="text-center py-6">
          <h3 className="text-[#252B42] text-[16px] font-bold">
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
            <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
            <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
            <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
            <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;