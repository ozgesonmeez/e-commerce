import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";

import {
  removeFavorite,
  addToCart,
  clearFavorites,
} from "../store/actions/shoppingCartActions.js";

function FavoritesPage() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.shoppingCart.favorites || []
  );

  return (
    <main className="bg-[#FAFAFA] py-10 md:py-12 min-h-screen">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-[28px] md:text-[36px] font-bold text-[#252B42]">
            Favorilerim
          </h1>

          {favorites.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearFavorites())}
              className="border border-red-500 text-red-500 px-5 py-2.5 rounded-md font-bold hover:bg-red-50 transition"
            >
              Favorileri Temizle
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-[700px] mx-auto bg-white border border-[#E6E6E6] rounded-2xl p-8 md:p-10 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-6">
              <Heart size={38} />
            </div>

            <h2 className="text-[30px] font-bold text-[#252B42]">
              Favorilerin Boş
            </h2>

            <p className="text-[#737373] text-[15px] mt-3 mb-8">
              Beğendiğin ürünleri favorilerine ekleyerek daha sonra kolayca
              ulaşabilirsin.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#23A6F0] text-white px-8 py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name || product.title}
                    className="w-full h-[300px] md:h-[320px] object-cover"
                  />
                </Link>

                <div className="p-5">
                  <h2 className="text-[#252B42] font-bold text-[16px] line-clamp-2">
                    {product.name || product.title}
                  </h2>

                  <p className="text-[#737373] text-[14px] mt-2">
                    {product.department}
                  </p>

                  <p className="text-[#23856D] font-bold mt-3">
                    {product.price}
                  </p>

                  <div className="flex flex-col gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(product))}
                      className="flex items-center justify-center gap-2 bg-[#23A6F0] text-white py-3 rounded-md font-bold hover:bg-[#1b8fd4] transition"
                    >
                      <ShoppingCart size={18} />
                      Sepete Ekle
                    </button>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFavorite(product.id))}
                      className="flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-md font-bold hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                      Favorilerden Kaldır
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default FavoritesPage;