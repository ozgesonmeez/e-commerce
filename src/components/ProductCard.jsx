import { Link } from "react-router-dom";
function ProductCard({
  id,
  image,
  title,
  department,
  oldPrice,
  price,
}) {
  return (

    <Link to={`/product/${id}`} className="block w-[239px] cursor-pointer">
    <div className="w-[239px]">
      <img
        src={image}
        alt={title}
        className="w-[239px] h-[427px] object-cover"
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
    </div>
    </Link>
  );
}

export default ProductCard;