
const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // Si isOpen es false, no mostrar el modal

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Estado del Registro</h2>
        <p className="text-center">{message}</p>
        <div className="mt-6 text-center"> 
          <button 
            onClick={onClose} 
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

