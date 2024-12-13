import PropTypes from "prop-types";
import Loader from "./Loader";

const Modal = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <Loader />
      </div>
    </div>
  );
};

export default Modal;


Modal.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
};