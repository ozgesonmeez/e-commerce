import ProductSection from "../components/ProductSection";
import CategoryCard from "../components/CategoryCard";

import cloths1 from "../assets/cloths1.png";
import cloths2 from "../assets/cloths2.png";
import cloths3 from "../assets/cloths3.png";
import cloths4 from "../assets/cloths4.png";
import cloths5 from "../assets/cloths5.png";

function ShopPage() {
  const categories = [
    cloths1,
    cloths2,
    cloths3,
    cloths4,
    cloths5,
  ];

  return (
    <main className="bg-[#FAFAFA]">
      {/* Shop Header */}
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

      {/* Categories */}
      <section className="max-w-[1050px] mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-[15px]">
          {categories.map((image, index) => (
            <CategoryCard
              key={index}
              image={image}
            />
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-[#737373] text-[14px] font-bold">
              Showing all 12 results
            </p>

            <div className="flex items-center gap-3">
              <select className="border border-[#DDDDDD] text-[#737373] text-[14px] px-4 py-3 rounded-[5px]">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <button className="bg-[#23A6F0] text-white text-[14px] font-bold px-5 py-3 rounded-[5px]">
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductSection />
    </main>
  );
}

export default ShopPage;