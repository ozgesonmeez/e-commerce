import ProductCard from "./ProductCard";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";
import product7 from "../assets/product7.png";
import product8 from "../assets/product8.png";

function ProductSection() {
  const products = [
    {
        id: 1,
      image: product1,
      title: "Graphic Design",
      department: "English Department",
      oldPrice: "$16.48",
      price: "$6.48",
    },
    {
        id: 2,
      image: product2,
      title: "Graphic Design",
      department: "English Department",
      oldPrice: "$16.48",
      price: "$6.48",
    },
    {
        id: 3,
      image: product3,
      title: "Graphic Design",
      department: "English Department",
      oldPrice: "$16.48",
      price: "$6.48",
    },
    {
  id: 4,
  image: product4,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
},
{
  id: 5,
  image: product5,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
},
{
  id: 6,
  image: product6,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
},
{
  id: 7,
  image: product7,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
},
{
  id: 8,
  image: product8,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
},
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="text-center mb-[80px]">
        <p className="text-[#737373] text-[20px]">
          Featured Products
        </p>

        <h2 className="text-[#252B42] text-[24px] font-bold mt-2">
          BESTSELLER PRODUCTS
        </h2>

        <p className="text-[#737373] text-[14px] mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="max-w-[1124px] mx-auto flex flex-wrap justify-center gap-[30px]">
        {products.map((product) => (
  <ProductCard
    key={product.id}
    id={product.id}
    image={product.image}
    title={product.title}
    department={product.department}
    oldPrice={product.oldPrice}
    price={product.price}
  />
))}
      </div>
    </section>
  );
}

export default ProductSection;