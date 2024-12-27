
import { useState, useEffect } from "react";
import Loader from "./Loader";


const TermsModal = ({ isOpenTerm, onCloseTerm, dataPayment }) => {
    const [accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        dataPayment();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    const handleChange = (e) => {
      setAccept(e.target.checked);
      console.log('checked', accept);
    };

    useEffect(() => {
        if (!isOpenTerm) {
          setAccept(false);
        }
      }, [isOpenTerm]);

    if (!isOpenTerm) return null;


  return (
    <div className="flex items-center justify-center h-auto">
      {/* Modal */}
      {isOpenTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg">
            Título
            </div>

            {/* Contenido */}
            <div className="px-6 py-4 max-h-96 overflow-y-auto">
        <input type="checkbox" name="accept" id="accept"  className="w-5 h-5 bg-gray-100 border-gray-300 rounded mt-4 mr-2" onChange={handleChange} />
        <label htmlFor="accept" className="text-lg text-gray-700">
            Aceptar      
              </label>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={onCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <button
                disabled={!accept}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                onClick={handleNext}
             >
              {loading ? <Loader /> : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsModal;
