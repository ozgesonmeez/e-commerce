import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

import {
  fetchProducts,
  setFilter,
  setSort,
  setOffset,
} from "../store/actions/productActions.js";

import cloths1 from "../assets/cloths1.png";
import cloths2 from "../assets/cloths2.png";
import cloths3 from "../assets/cloths3.png";
import cloths4 from "../assets/cloths4.png";
import cloths5 from "../assets/cloths5.png";

function ShopPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const productList = useSelector((state) => state.product.productList);
  const total = useSelector((state) => state.product.total);
  const fetchState = useSelector((state) => state.product.fetchState);
  const filter = useSelector((state) => state.product.filter);
  const sort = useSelector((state) => state.product.sort);
  const limit = useSelector((state) => state.product.limit);
const offset = useSelector((state) => state.product.offset);

  const [filterInput, setFilterInput] = useState(filter);

  const categories = [cloths1, cloths2, cloths3, cloths4, cloths5];

  const totalPages = Math.ceil(total / limit);
const currentPage = Math.floor(offset / limit) + 1;

const handlePageChange = (page) => {
  const newOffset = (page - 1) * limit;
  dispatch(setOffset(newOffset));
};

  useEffect(() => {
   dispatch(
  fetchProducts({
    category: categoryId,
    filter,
    sort,
    limit,
    offset,
  })
);
  }, [dispatch, categoryId, filter, sort, limit, offset]);

  const handleFilter = () => {
    dispatch(setFilter(filterInput));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <main className="bg-[#FAFAFA]">
      <section className="max-w-[1050px] mx-auto px-4 py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-bold text-[#252B42]">
            Shop
          </h1>

          <div className="flex gap-2 text-[14px] font-bold">
            <span className="text-[#252B42]">Home</span>
            <span className="text-[#BDBDBD]">{">"}</span>
            <span className="text-[#737373]">Shop</span>
          </div>
        </div>
      </section>

      <section className="max-w-[1050px] mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-[15px]">
          {categories.map((image, index) => (
            <CategoryCard key={index} image={image} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#737373] text-[14px] font-bold">
              Showing all {total} results
            </p>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Search"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                className="border border-[#DDDDDD] text-[#737373] text-[14px] px-4 py-3 rounded-[5px]"
              />

              <select
                value={sort}
                onChange={handleSortChange}
                className="border border-[#DDDDDD] text-[#737373] text-[14px] px-4 py-3 rounded-[5px]"
              >
                <option value="">Sort</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="rating:asc">Rating: Low to High</option>
                <option value="rating:desc">Rating: High to Low</option>
              </select>

              <button
                onClick={handleFilter}
                className="bg-[#23A6F0] text-white text-[14px] font-bold px-5 py-3 rounded-[5px]"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          {fetchState === "FETCHING" && (
            <p className="text-center text-[#737373] font-bold">
              Loading products...
            </p>
          )}

          {fetchState === "FAILED" && (
            <p className="text-center text-red-500 font-bold">
              Products could not be loaded.
            </p>
          )}

          {fetchState === "FETCHED" && (
            <div className="flex flex-wrap justify-center gap-[30px]">
              {productList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.images?.[0]?.url}
                  title={product.name}
                  department={product.category?.title || "Product"}
                  oldPrice={`$${product.price}`}
                  price={`$${product.price}`}
                />
              ))}
            </div>
          )}
        </div>

        {fetchState === "FETCHED" && totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-12">
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    {[...Array(totalPages)].slice(0, 5).map((_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded ${
            currentPage === page
              ? "bg-[#23A6F0] text-white"
              : "bg-white text-[#23A6F0]"
          }`}
        >
          {page}
        </button>
      );
    })}

    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
      </section>
    </main>
  );
}

export default ShopPage;