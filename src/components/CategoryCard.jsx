function CategoryCard({ image }) {
  return (
    <div className="w-[190px] h-[223px]">
      <img
        src={image}
        alt="category"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default CategoryCard;