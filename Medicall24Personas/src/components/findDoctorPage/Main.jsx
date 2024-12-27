import { useState } from "react";

import { CheckCircle, ChevronRight } from "lucide-react";
// import fondo from '../../assets/fondoBexa.png'
// import incluye from '../../assets/incluye.png'
// import bexa from '../../assets/bexa.png'

import TermCondBexa from "./TermCondBexa";
import TermCondBexaNext from "./TermCondBexaNext";


const MainContent = ( ) => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const packageValue = 249500;
    const [isOpenModalTerm, setIsOpenModalTerm] = useState(false);
    const [isOpenModalTermNext, setIsOpenModalTermNext] = useState(false);

    const handleOpenModalTerm = () => {
      setIsOpenModalTerm(true)
    };
    const handleCloseModalTerm = () => {
      setIsOpenModalTerm(false)
    }; 

    const handleOpenModalTermNext = () => {
      setIsOpenModalTermNext(true)
    };
    const handleCloseModalTermNext = () => {
      setIsOpenModalTermNext(false)
      
    }; 


     // Lista de códigos promocionales con sus respectivos descuentos
    const promoCodes = {
      "CODE5": 5,
      "CODE10": 10,
      "CODE15": 15,
      "CODE20": 20,
    };

    const handleInputChange = (e) => {
      const code = e.target.value.toUpperCase(); // Asegurar que sea insensible a mayúsculas/minúsculas
      setPromoCode(code);
  
      if (promoCodes[code]) {
        setDiscount(promoCodes[code]);
      } else {
        setDiscount(0); // Código inválido
      }
    };
  
    const discountValue = (packageValue * discount) / 100;
    const totalToPay = packageValue - discountValue;
    

    return (
      <main className="mx-auto space-y-6">
        {/* Section 1: Text Left, Image Right */}
        
        <section className="grid grid-cols-2 md:grid-cols-1 gap-8 items-center px-24 md:px-8 py-16 h-[600px] md:h-auto bexa">
  {/* Contenido */}
  <div className="space-y-6 md:flex md:flex-col">
    <h2 className="text-4xl md:text-center md:text-2xl font-extrabold text-gray-600 leading-tight tracking-wide">
      Examen BEXA para la detección temprana del cáncer de mama
    </h2>
    <span className="flex items-center space-x-2">
      <ChevronRight className="w-6 h-6 text-pink-600" />
      <p className="text-gray-700 text-xl md:text-lg">Para mujeres de cualquier edad</p>
    </span>

    <span className="flex items-center space-x-2">
      <ChevronRight className="w-6 h-6 text-pink-600" />
      <p className="text-gray-700 text-xl md:text-lg">
        Sin dolor, sin radiación, con resultados inmediatos.
      </p>
    </span>

    <button
      className="bg-pink-600 w-auto text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg font-bold mt-12 services-bexa mt-12"
      onClick={() => {
        document
          .getElementById("servicio")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Comprar
    </button>
  </div>
  <div className="relative bg-gray-100 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
    <video
      className="w-full h-auto rounded-2xl"
      src="https://medicall24.com.co/wp-content/uploads/2024/12/bexa2.mp4"
      autoPlay
      loop
      muted
    />
  </div>
</section>

        <section id="servicio"
        className="grid grid-cols-2 md:grid-cols-1 gap-12 items-center px-24 py-12 md:px-4"
        >
        {/* Contenedor del Video */}
        <div className="space-y-6 p-6">
        <div className="block h-full transform hover:scale-105 transition duration-300">
        <img
            src="https://medicall24.com.co/wp-content/uploads/2024/12/dispositivo.png"
            alt="Consulta gratuita"
            className="w-auto h-auto object-cover"
            />
        </div>
        </div>

        {/* Contenedor de Información */}
        <div className="space-y-4 p-8 bg-gray-100 rounded-lg shadow-lg transition-transform duration-300">
            {/* Título */}
            <h2 className="text-4xl md:text-center md:text-2xl font-bold text-gray-600 hover:text-pink-500 transition-colors duration-200">
            Paquete de Tamizaje para Detectar Cáncer de Mama
            </h2>

            <p className="text-gray-700 text-lg">
                Servicios que incluye:
            </p>

            {/* Lista de Servicios */}
            <ul className="space-y-4">
            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-base group-hover:text-gray-700 transition-colors duration-200">
                Examen BEXA para detectar masas en mama
                </span>
            </li>
            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-base group-hover:text-gray-700 transition-colors duration-200">
                Ecografía de Mama
                </span>
            </li>
            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-base group-hover:text-gray-700 transition-colors duration-200">
                Consultas por Ginecología, Mastología y Psicología
                </span>
            </li>
{/*           
                      <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-12 h-12 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-lg group-hover:text-gray-700 transition-colors duration-200">
                Póliza de Vida que te cubre hasta 20 millones de pesos por diagnóstico de cáncer y enfermedades graves
                </span>
            </li> */}
            </ul>
            <div className="space-y-4 bg-gray-200 rounded-lg p-4 border-2 border-gray-300">
          {/* Valor del paquete */}
          <div className="flex justify-between items-center text-lg text-gray-600">
            <div className="text-left">Valor del paquete</div>
            <div className="text-right text-gray-700">${packageValue.toLocaleString()}</div>
          </div>

          {/* Campo para ingresar código promocional */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-lg">Ingrese código promocional</label>
            <input
              type="text"
              value={promoCode}
              onChange={handleInputChange}
              className="border rounded-lg p-2 mt-2"
              placeholder="Código promocional"
            />
          </div>

          {/* Descuento */}
          {discount > 0 && (
            <div className="flex justify-between items-center text-lg text-gray-600">
              <div className="text-left">Descuento del {discount}%</div>
              <div className="text-right text-gray-700">- ${discountValue.toLocaleString()}</div>
            </div>
          )}

          {/* Valor a pagar */}
          <div className="flex justify-between items-center text-2xl font-bold text-gray-600">
            <div className="text-left">Valor a pagar</div>
            <div className="text-right text-gray-700">${totalToPay.toLocaleString()}</div>
          </div>
        </div>

            {/* Botón de Acción */}
            <button className="bg-pink-600 w-full text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg mt-2"
            onClick={handleOpenModalTermNext}
            >
            Comprar Paquete
            </button>
    


            <p onClick={handleOpenModalTerm} className="cursor-pointer text-center text-gray-600 text-base underline">
            Ver Términos y Condiciones
            </p>
        </div>
        </section>


        {/* <section className="grid md:grid-cols-2 gap-12 items-center bg-gray-200 px-40 py-12">
        <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96 overflow-hidden md:order-first order-last">
            <img 
                src="https://medicall24.com.co/wp-content/uploads/2023/06/cdes2-min-2.jpg" 
                alt="image" 
                className="w-full h-full object-cover text-gray-500" 
            />
            </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-pink-600">Accede a una consulta gratuita</h2>
            <p className="text-gray-500 font-regular text-2xl">
                Accede a una consulta gratuita con nuestro servicio de telemedicina.
            </p>
            <a href="/prueba">
            <button className="bg-orange-600 text-xl font-semibold text-white px-6 py-3 rounded-full hover:bg-orange-500 hover:scale-110 hover:translate-y-1 hover:font-bold transition duration-300 flex items-center justify-center space-x-2">
              Acceder a consulta <span><VideoIcon className="w-6 h-6 ml-2" /></span>
            </button>
            </a>
              </div>
        </section> */}
  
        {/* Section 3: 3 Columns with Image Placeholders */}
        {/* <section className="grid md:grid-cols-3 gap-8 px-40 py-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-gray-500" />
            </div>
          ))}
        </section> */}
  
        {/* Section 4: Large Centered Title */}
        {/* <section
            className="relative bg-cover bg-center px-40 py-16 text-gray-800"
            style={{ backgroundImage: `url(${fondo})` }}
            >
            <div className="absolute inset-0"></div>

            <div className="relative max-w-7xl mx-auto grid grid-cols-2 gap-8 text-white">
                <div className="text-center">
                <p className="text-4xl leading-0 mb-6 text-gray-600">
                Paquete de <span className="text-pink-600 font-extrabold" >tamizaje</span> para detectar <span className="text-pink-600 font-extrabold">cáncer de seno</span>
                </p>

                <div className="text-4xl font-bold mb-8">
                    <span className="text-pink-600 font-extrabold"> $ 199.600</span>
                    <span className="text-xl text-pink-600 ml-2">COP</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <img
                        src={incluye}
                        alt="Incluye"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                    <div></div>
                </div>

                <div className="mt-6">
                    <img
                    src={bexa}
                    alt="Producto Bexa"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                </div>

                <div></div>
            </div>
            </section> */}
        {isOpenModalTerm &&
        <div className="flex items-center justify-center">
            <TermCondBexa onCloseTerm={handleCloseModalTerm}/>
            </div>
        }
        {isOpenModalTermNext &&
        <div className="flex items-center justify-center">
            <TermCondBexaNext onCloseTerm={handleCloseModalTermNext}/>
            </div>
        }

      </main>
    );
  };

  export default MainContent;