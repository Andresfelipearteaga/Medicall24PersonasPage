
import { useState } from "react";
import Loader from "./Loader";


const TermsModal = ({ isOpenTerm, onCloseTerm, dataPayment }) => {
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        dataPayment();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };


    if (!isOpenTerm) return null;


  return (
    <div className="flex items-center justify-center h-auto">
      {/* Modal */}
      {isOpenTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg text-center">
            ¡Ya casi terminas!
            </div>

            {/* Contenido */}
            <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
                <p>
                Recuerda que los servicios de salud del paquete de tamizaje para detectar Cáncer de Mama serán prestados en las siguientes ciudades de Colombia:</p> 

                <div className="grid w-1/4 sm:w-1/2 grid-cols-2 gap-2 font-bold mb-4">
              {/* Encabezados */}
              <div>Ciudad</div>
              <div>Departamento</div>

              {/* Datos */}
              <div className="font-normal">Montería</div>
              <div className="font-normal">Córdoba</div>
            </div>
       
                <p>
                La dirección exacta donde se prestarán los servicios de salud que incluye el paquete de tamizaje para detectar Cáncer de Mama, será enviada en la confirmación de la cita, una vez el usuario realice los pasos de solicitud de cita que se enviarán al correo electrónico que se ingresó para realizar el pago.  
                </p>
                <p>
                Para continuar con el pago presiona el botón continuar. 
                </p>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-between space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={onCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <button
                // disabled={!accept}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                onClick={handleNext}
             >
              {loading ? <Loader /> : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsModal;
