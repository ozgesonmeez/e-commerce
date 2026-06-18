import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import ProductSection from "../components/ProductSection";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";
import product7 from "../assets/product7.png";
import product8 from "../assets/product8.png";

function ProductDetailPage() {
  const { productId } = useParams();

  const mockProducts = [
    {
      id: 1,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product1,
    },
    {
      id: 2,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product2,
    },
    {
      id: 3,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product3,
    },
    {
      id: 4,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product4,
    },
    {
      id: 5,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product5,
    },
    {
      id: 6,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product6,
    },
    {
      id: 7,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product7,
    },
    {
      id: 8,
      name: "Graphic Design",
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      price: "$6.48",
      oldPrice: "$16.48",
      image: product8,
    },
  ];

  const product = mockProducts.find(
    (item) => item.id === Number(productId)
  );

  if (!product) {
    return (
      <main className="max-w-[1050px] mx-auto px-4 py-20">
        <h1 className="text-[32px] font-bold text-[#252B42]">
          Product Not Found
        </h1>

        <Link
          to="/shop"
          className="inline-block mt-6 text-[#23A6F0] font-bold"
        >
          ← Back to Shop
        </Link>
      </main>
    );
  }

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

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="bg-[#FAFAFA] flex justify-center items-center p-4 h-[450px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="flex gap-4 mt-5">
              <div className="w-[100px] h-[75px] border border-[#DDDDDD] p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-[100px] h-[75px] border border-[#DDDDDD] p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 pt-4">
            <h1 className="text-[#252B42] text-[24px] font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="text-[#F3CD03] text-[18px]">
                ★★★★★
              </div>

              <p className="text-[#737373] text-[14px] font-bold">
                10 Reviews
              </p>
            </div>

            <div className="flex gap-3 mt-5 text-[24px] font-bold">
              <span className="text-[#BDBDBD] line-through">
                {product.oldPrice}
              </span>

              <span className="text-[#252B42]">
                {product.price}
              </span>
            </div>

            <p className="mt-2 text-[#737373] text-[14px] font-bold">
              Availability :
              <span className="text-[#23A6F0] ml-2">
                In Stock
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
                <button className="bg-[#23A6F0] text-white text-[14px] font-bold px-6 py-3 rounded-[5px]">
                  Select Options
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

          <div className="mt-12 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h3 className="text-[#252B42] text-[24px] font-bold">
                the quick fox jumps over
              </h3>

              <p className="mt-4 text-[#737373] text-[14px] leading-[22px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor
                do met sent. RELIT official consequent door ENIM RELIT
                Mollie.
              </p>

              <p className="mt-4 text-[#737373] text-[14px] leading-[22px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor
                do met sent. RELIT official consequent door ENIM RELIT
                Mollie.
              </p>
            </div>

            <div className="flex-1">
              <h3 className="text-[#252B42] text-[24px] font-bold">
                the quick fox jumps over
              </h3>

              <ul className="mt-4 space-y-3 text-[#737373] text-[14px] font-bold">
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="text-[#252B42] text-[24px] font-bold">
                the quick fox jumps over
              </h3>

              <ul className="mt-4 space-y-3 text-[#737373] text-[14px] font-bold">
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
                <li>{">"} the quick fox jumps over the lazy dog</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
          <ProductSection />
    </main>
  );
}

export default ProductDetailPage;