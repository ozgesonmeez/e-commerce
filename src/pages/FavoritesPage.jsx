import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

import {
  removeFavorite,
  addToCart,
} from "../store/actions/shoppingCartActions.js";

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.shoppingCart.favorites || []);

  if (favorites.length === 0) {
    return (
      <main className="max-w-[1050px] mx-auto px-4 py-20 min-h-[60vh]">
        <h1 className="text-[32px] font-bold text-[#252B42] mb-6">
          Favorilerim
        </h1>

        <p className="text-[#737373] font-bold mb-6">
          Henüz favori ürünün yok.
        </p>

        <Link
          to="/shop"
          className="inline-block bg-[#23A6F0] text-white px-6 py-3 rounded-md font-bold"
        >
          Alışverişe Başla
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] py-10 md:py-12 min-h-[70vh]">
      <div className="max-w-[1050px] mx-auto px-4">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#252B42] mb-8">
          Favorilerim
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#E6E6E6] rounded-md overflow-hidden shadow-sm"
            >
              <Link to="/shop">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-[300px] md:h-[320px] object-cover"
                />
              </Link>

              <div className="p-5">
                <h2 className="text-[#252B42] font-bold text-[16px] line-clamp-2">
                  {product.name}
                </h2>

                <p className="text-[#737373] text-[14px] mt-2">
                  {product.department}
                </p>

                <p className="text-[#23856D] font-bold mt-3">
                  {product.price}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(product))}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#23A6F0] text-white py-3 rounded-md font-bold"
                  >
                    <ShoppingCart size={18} />
                    Sepete Ekle
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFavorite(product.id))}
                    className="flex items-center justify-center gap-2 border border-red-500 text-red-500 px-4 py-3 rounded-md font-bold"
                  >
                    <Trash2 size={18} />
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default FavoritesPage;