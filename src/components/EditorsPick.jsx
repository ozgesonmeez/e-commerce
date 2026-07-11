import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../store/actions/productActions.js";

function EditorsPick() {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.product.categories || []
  );

  useEffect(() => {
    // Kategoriler Redux'ta yoksa API'den çek.
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const slugify = (text = "") =>
    text
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const createCategoryPath = (category) => {
    const genderPath =
      category.gender === "k" ? "kadin" : "erkek";

    return `/shop/${genderPath}/${slugify(category.title)}/${category.id}`;
  };

  const topCategories = [...categories]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 5);

  if (topCategories.length === 0) {
    return (
      <section className="bg-[#FAFAFA] py-16 md:py-[80px]">
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const [featuredCategory, ...otherCategories] = topCategories;

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-[80px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#252B42] text-center">
          EDITOR&apos;S PICK
        </h2>

        <p className="text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] mt-[10px]">
          Explore our highest rated categories
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 md:mt-[48px]">
          {/* En yüksek puanlı kategori */}
          <Link
            to={createCategoryPath(featuredCategory)}
            className="relative h-[500px] overflow-hidden rounded-md group cursor-pointer"
          >
            <img
              src={featuredCategory.img}
              alt={featuredCategory.title}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

            <div className="absolute bottom-6 left-6 bg-white px-8 py-4">
              <h3 className="text-[16px] font-bold text-[#252B42] uppercase">
                {featuredCategory.title}
              </h3>

              <p className="text-[#737373] text-[12px] font-bold mt-1">
                Rating: {featuredCategory.rating}
              </p>
            </div>
          </Link>

          {/* Diğer dört kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherCategories.map((category) => (
              <Link
                key={category.id}
                to={createCategoryPath(category)}
                className="relative h-[238px] overflow-hidden rounded-md group cursor-pointer"
              >
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

                <div className="absolute bottom-5 left-5 bg-white px-5 py-3">
                  <h3 className="text-[15px] font-bold text-[#252B42] uppercase">
                    {category.title}
                  </h3>

                  <p className="text-[#737373] text-[11px] font-bold mt-1">
                    Rating: {category.rating}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorsPick;