const FilterCard = ({ content, onClick, className }) => {
  return (
    <div
      className={`border border-gray-500 p-2 px-4 w-fit rounded-full hover:border-(--hero-color) transition-colors capitalize ${className}`}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default FilterCard;
