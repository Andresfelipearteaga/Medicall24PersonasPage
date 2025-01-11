
const Button = ({ label, className, dataTarget }) => {
  return (
    <a href="#plan" className="w-5/12">
    <button
      className={`bg-orange-500 hover:bg-orange-500 hover:scale-110 transition duration-300 text-white font-bold py-2 px-6 border-b-4 border-orange-500 hover:border-orange-400 rounded-3xl cursor-pointer mt-6 ${className}`}
      data-target={dataTarget}
    >
      {label}
    </button>
    </a>

  );
};

export default Button;
