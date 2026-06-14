function ProductCard({
  image,
  title,
  department,
  oldPrice,
  price,
}) {
  return (
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
          <span className="text-[#BDBDBD]">
            {oldPrice}
          </span>

          <span className="text-[#23856D]">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;