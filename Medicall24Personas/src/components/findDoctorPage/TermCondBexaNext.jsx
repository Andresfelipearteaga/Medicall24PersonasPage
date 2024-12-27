import { CircleX } from "lucide-react";
import { useState, useEffect } from "react";


const TermCondBexa = ( { onCloseTerm }) => {
    const [accept, setAccept] = useState(false);

    const handleChange = (e) => {
      setAccept(e.target.checked);
    };

    useEffect(() => {
        if (onCloseTerm) {
          setAccept(false);
        }
      }, [onCloseTerm]);

    return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onCloseTerm}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-16 transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        
        <button className="absolute top-2 right-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" onClick={onCloseTerm} >
            <CircleX className="w-6 h-6 text-gray-600 hover:text-pink-600 transition-colors duration-200" />
        </button>
        
    <h1 className="text-xl font-bold text-gray-700 mb-6 text-center">Términos y condiciones del servicio</h1>
    <ul className="list-disc space-y-2 text-sm">
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
        <li> La prestación de los servicios que incluye el paquete será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, los cuales hacen parte de nuestra Alianza Comercial Estratégica.</li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-4 h-4 text-pink-600 mr-2 ml-2" /> */}
        <li>Los servicios serán prestados en la ciudad de Montería, Córdoba, Colombia.
        </li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-14 h-14 text-pink-600 mr-2 ml-2" /> */}
        <li>Para acceder al servicio la paciente deberá solicitar una cita utilizando la App para dispositivos móviles MEDICALL24, siguiendo las instrucciones que se envían al correo electrónico ingresado por el usuario durante el proceso de compra. Puede consultar las instrucciones aquí.</li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
    
        <li>El examen BEXA se realizará de acuerdo con la disponibilidad de la agenda del Prestador de Salud asignado al momento de la compra.</li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
        <li>La compra del paquete da derecho a la realización de un examen BEXA.
        </li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
   
        <li>En caso de inasistencia a una cita programada para realizar el examen BEXA, se aplicará un cobro adicional por valor de $ 30.000 COP para volver a programar la cita.</li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
        <li>La ecografía de mama se realizará a pacientes a las que se le detecte masas en seno con el examen BEXA.
        </li>
        </span>
        <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
        <li>
        Las consultas por Ginecología, Mastología y Psicología, se realizarán por solicitud de un médico, teniendo en cuanta los resultados de la ecografía, y podrán prestarse bajo la modalidad de telemedicina.</li>
        </span>
              <span className="flex flex-row items-start">
        {/* <CheckCheckIcon className="w-12 h-12 text-pink-600 mr-2 ml-2" /> */}
  
        {/* <li>La póliza de vida tiene vigencia de un año a partir del momento de la compra de paquete. Consulte los amparos y coberturas aquí.</li> */}
        </span>
    
   
     

    </ul>
    <input type="checkbox" name="accept" id="accept"  className="w-4 h-4 bg-gray-100 border-gray-300 rounded mt-2 mr-2 mb-4" onChange={handleChange} />
        <label htmlFor="accept" className="text-base text-gray-700">
            Acepto los términos y condiciones
        </label>
        
            <div className="px-6 flex justify-between space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={onCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <a href="/compra" target="_blank">
              <button
                disabled={!accept}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                onClick={onCloseTerm}
              >
                Aceptar
              </button>
              </a>

            </div>
        </div>
        </div>

        )}

export default TermCondBexa;




