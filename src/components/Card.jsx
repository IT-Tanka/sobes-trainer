const Card = ({ title, value }) => {
  return (
    <div className="card p-6">
      <span className="badge mb-5">{title}</span>
      <p className="text-4xl font-bold leading-none">{value}</p>
    </div>
  );
};

export default Card;
