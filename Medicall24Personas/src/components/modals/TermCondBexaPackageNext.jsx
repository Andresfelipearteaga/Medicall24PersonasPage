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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onCloseTerm}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-16 transition-all duration-300 overflow-scroll max-h-[600px]" onClick={(e) => e.stopPropagation()}>
        
        <button className="absolute top-2 right-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" onClick={onCloseTerm} >
            <CircleX className="w-6 h-6 text-gray-600 hover:text-pink-600 transition-colors duration-200" />
        </button>
        
    <h1 className="text-xl font-bold text-gray-700 mb-6 text-center uppercase">Acepta los Términos y condiciones del servicio</h1>
    <p className="text-sm text-gray-900 mb-4">
    Estos son los Términos y Condiciones para la prestación de los servicios que hacen parte del paquete de tamizaje para detectar Cáncer de Mama, comercializados por MEDICALL24 SAS (en adelante LA COMPAÑIA), por favor lea cuidadosamente.
    </p>
    <p className="text-sm text-gray-900 mb-4">
    Al hacer clic en la casilla “acepto los términos y condiciones”, usted habrá manifestado su aceptación sin restricciones de este aviso legal y, por lo tanto, de los Términos y Condiciones acá establecidos. Si usted no acepta los Términos y Condiciones establecidos aquí, usted no podrá acceder ni utilizar los servicios que hacen parte del paquete de tamizaje para detectar Cáncer de Mama.
    </p>
    <p className="text-sm text-gray-900 mb-4">
    LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios que hacen parte del paquete de tamizaje para detectar Cáncer de Mama.
    </p>
    <p className="text-sm text-gray-900 mb-4">
    Los presentes Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y LA COMPAÑÍA, y establecen las condiciones para acceder a los servicios que hacen parte del paquete de tamizaje para detectar Cáncer de Mama. Por lo anterior, es su obligación como usuario leer cuidadosamente los presentes Términos y Condiciones.
    </p>

    <h1 className="text-xl font-bold text-gray-700 mb-6 text-center">CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL PAQUETE DE TAMIZAJE PARA DETECTAR CÁNCER DE MAMA</h1>
    <p className="text-sm text-gray-900 mb-4">
    La prestación de los servicios de salud que incluye el paquete de tamizaje para detectar Cáncer de Mama será realizada por Prestadores de Salud habilitados por el Ministerio de salud de Colombia, los cuales hacen parte de nuestra Alianza Comercial Estratégica. LA COMPAÑÍA no es un Prestador de Salud, por lo tanto, no tiene responsabilidad alguna sobre la prestación de los servicios de salud que hacen parte del paquete de tamizaje para detectar Cáncer de Mama, los cuales, están a cargo de los Prestadores de Salud que hacen parte de la Alianza Comercial Estratégica. Consulte nuestros Aliados aquí.
    </p>
    <p className="text-sm text-gray-900 mb-4">
    Los servicios de salud del paquete de tamizaje para detectar Cáncer de Mama serán prestados en las siguientes ciudades de Colombia:
    </p>
    <div className="grid w-1/4 sm:w-1/2 grid-cols-2 gap-2 font-bold mb-4">
      {/* Encabezados */}
      <div>Ciudad</div>
      <div>Departamento</div>

      {/* Datos */}
      <div className="font-normal">Montería</div>
      <div className="font-normal">Córdoba</div>
    </div>
    <p className="text-sm text-gray-900 mb-4">
    Para continuar con el pago del paquete de tamizaje para detectar Cáncer de Mama, se deberá realizar el registro de la paciente que será beneficiaria del servicio. Este procedimiento podrá realizarse una vez sean aceptados los términos y condiciones aquí descritos.
    </p>    <p className="text-sm text-gray-900 mb-4">
    Con este registro la paciente queda automáticamente registrada en la App de Telemedicina MEDICALL24, que será la aplicación que se deberá utilizar para solicitar y gestionar las citas para el examen BEXA y para acceder al resto de los servicios que incluye el paquete de tamizaje para detectar Cáncer de Mama. 
    </p>    <p className="text-sm text-gray-900 mb-4">
    La dirección exacta donde se prestarán los servicios de salud que incluye el paquete de tamizaje para detectar Cáncer de Mama, será enviada en la confirmación de la cita, una vez el usuario realice los pasos de solicitud de cita que se enviarán al correo electrónico que se ingrese al realizar el pago. También puede consultar los pasos aquí.
    </p>    <p className="text-sm text-gray-900 mb-4">
    El examen BEXA se realizará de acuerdo con la disponibilidad de la agenda del Prestador de Salud asignado al momento de la compra, que se le notificará al correo electrónico que se ingrese al realizar el pago.
    </p>    <p className="text-sm text-gray-900 mb-4">
    La compra del paquete de tamizaje para detectar Cáncer de Mama da derecho a la realización de un examen BEXA. En caso de inasistencia de la paciente beneficiaria del plan a la cita programada para realizar el examen BEXA, se aplicará un cobro adicional por valor de $ 30.000 COP para volver a programar la cita. 
    </p>    <p className="text-sm text-gray-900 mb-4">
    La ecografía de mama solo se realizará a las pacientes que se le detecte masas en seno con el examen BEXA, cuando la solicite el profesional de la salud (médico) que lo realice. Se realizará máximo una consulta por Ginecología, Mastología y Psicología, siempre y cuando la solicite el profesional de la salud (médico) que realice la ecografía. Estas consultas se prestarán teniendo en cuenta la disponibilidad de la agenda del Prestador de Salud asignado, quien podrá atender a la paciente bajo la modalidad de telemedicina, a través de la App MEDICALL24.
    </p>    <p className="text-sm text-gray-900 mb-4">
    En caso de que la paciente tenga orden médica para realizarse una ecografía o para alguna de las consultas por Ginecología, Mastología y Psicología, deberá realizar la solicitud de la cita mediante la App de Telemedicina MEDICALL24, siguiendo los pasos de solicitud de cita que se enviarán al correo electrónico que se ingrese al realizar el pago.
    </p>
    <input type="checkbox" name="accept" id="accept"  className="w-4 h-4 bg-gray-100 border-gray-300 rounded mt-2 mr-2 mb-4" onChange={handleChange} />
        <label htmlFor="accept" className="text-base text-gray-700">
            Acepto los términos y condiciones
        </label>
        
            <div className="px-6 flex justify-between space-x-4 rounded-b-lg">
              <button
                onClick={onCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <a href="/compra">
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




