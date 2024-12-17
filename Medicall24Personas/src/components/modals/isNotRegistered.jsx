
const Modal = ({ isOpen, status, onClose }) => {
  if (!isOpen) return null; // Si isOpen es false, no mostrar el modal

  const renderContent = () => {
    if (status === "load") {
      return <p className="text-center">Registrando...</p>;
    } else if (status === "success") {
      return (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">¡Bienvenido a Medicall24!</h3>
          <p className="mt-4 text-gray-600">
            Te vamos a redireccionar para que culmines el proceso de compra de tu plan de telemedicina.
          </p>
        </div>
      );
    } else if (status === "error") {
      return (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">¡Error!</h3>
          <p className="mt-4 text-gray-600">
            Hubo un error al registrar tu cuenta. Por favor, inténtalo de nuevo más tarde.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Estado del Registro</h2>
        {renderContent()}
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

