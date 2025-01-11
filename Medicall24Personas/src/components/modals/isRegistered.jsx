import PropTypes from "prop-types";

const Modal = ({ isOpen, handleNext }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg text-center font-semibold text-gray-800">¡Ya te encuentras registrado!</h3>
    <p className="mt-4 text-gray-600">
      Te vamos a redirigir para que culmines el proceso de compra de tu plan de telemedicina.
    </p>
    <div className="mt-6 text-center">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Siguiente
          </button>
        </div>
      </div>

  </div>
  );
};

export default Modal;


Modal.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
};