import { useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <header
      className={`${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 left-0 right-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-400 via-yellow-300 to-orange-200 shadow-md transition-transform duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Selección de país */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-800">Elije tu país:</span>
          <select
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          >
            <option value="Colombia">Colombia</option>
            <option value="México">México</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
          </select>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Continuar
          </button>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 transition duration-300 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Logo */}
        <div>
          <img
            src="https://via.placeholder.com/100x40?text=Logo"
            alt="Logo"
            className="h-10 object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
