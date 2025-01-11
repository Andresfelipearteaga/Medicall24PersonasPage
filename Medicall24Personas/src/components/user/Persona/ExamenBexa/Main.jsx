import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

import { CheckCircle, ChevronRight, Info } from "lucide-react";
// import fondo from '../../assets/fondoBexa.png'
// import incluye from '../../assets/incluye.png'
// import bexa from '../../assets/bexa.png'

import TermCondBexaPackage from "../../../modals/TermCondBexaPackage";
import TermCondBexaPackageNext from "../../../modals/TermCondBexaPackageNext";
import TermCondBexaNext from "../../../modals/TermCondBexaNext";
import TermCondBexa from "../../../modals/TermCondBexa";
import ProductCotize from "../../../modals/ProductCotize";

const MainContent = ( { codigosxproductos, productos } ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodePackage, setPromoCodePackage] = useState("");

  const [discount, setDiscount] = useState(0);
  const [isOpenModalTerm, setIsOpenModalTerm] = useState(false);
  const [isOpenModalTermNext, setIsOpenModalTermNext] = useState(false);
  const [isOpenModalTermPackage, setIsOpenModalTermPackage] = useState(false);
  const [isOpenModalTermPackageNext, setIsOpenModalTermPackageNext] =
    useState(false);
  const [isOpenModalCotize, setIsOpenModalCotize] = useState(false);
  const [name, setName] = useState(null);
  const [value, setValue] = useState(null);
  const [id, setId] = useState(null);
  const [isValidCode, setIsValidCode] = useState(true);
  const [applicableCode, setApplicableCode] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  const openModal = () => {
    if (id === 1) {
      handleOpenModalTermPackageNext();
    } else {
      handleOpenModalTermNext();

    }
  };

  const handleAccept = () => {
    if (applicableCode) {
      console.log('applicableCode', applicableCode);
      dispatch(setProduct(applicableCode));
    } else {
      console.log('productInfo', productInfo);
      dispatch(setProduct(productInfo));
    }
    handleCloseModalTermNext();
    setTimeout(() => {
      navigate('/compra');
    }, 2000);
  }

  const handleOpenModalTerm = () => {
    setIsOpenModalTerm(true);
  };
  const handleCloseModalTerm = () => {
    setIsOpenModalTerm(false);
  };

  const handleOpenModalTermNext = () => {
    setIsOpenModalTermNext(true);
    setIsOpenModalCotize(false);

  };

  const handleCloseModalTermNext = () => {
    setIsOpenModalTermNext(false);
  };
  const handleOpenModalTermPackage = () => {
    setIsOpenModalTermPackage(true);
    setIsOpenModalCotize(false);
    
  };
  const handleCloseModalTermPackage = () => {
    setIsOpenModalTermPackage(false);
  };

  const handleOpenModalTermPackageNext = () => {
    setIsOpenModalTermPackageNext(true);
    setIsOpenModalCotize(false);
    
  };
  const handleCloseModalTermPackageNext = () => {
    setIsOpenModalTermPackageNext(false);

  };

  const handleOpenModalCotize = (product) => {
    console.log('product', product);
    setProductInfo(product);
    setName(product.nombre);
    setValue(product.valor_cop);
    setId(product.id_producto);
    setIsOpenModalCotize(true);
  };
  const handleCloseModalCotize = () => {
    setIsOpenModalCotize(false);
  };

  // // Lista de códigos promocionales con sus respectivos descuentos
  // const promoCodes = {
  //   CODE5: 5,
  //   CODE10: 10,
  //   CODE15: 15,
  //   CODE20: 20,
  // };


  const handleInputChange = (e) => {
    const code = e.target.value.toUpperCase();
    setPromoCode(code);
    console.log('code',code);
    console.log('codigosxproductos',codigosxproductos);
      // Obtener el producto con id 2
    const productId = productos.find((product) => product.id_producto === 17);
    const applicablePromo = codigosxproductos.find(
      (promo) =>  promo.id_producto === productId.id_producto && promo.cod_promo === code
    
    );
    
    console.log('productId',productId);
    console.log('applicablePromo',applicablePromo);

    if (!code){
      setDiscount(0);
      setIsValidCode(true);
      setProductInfo(productId);
      setApplicableCode(null);

    } else if (applicablePromo) {
      setApplicableCode(applicablePromo);
      setDiscount(applicablePromo.procentaje_descuento_compra);
      setIsValidCode(true);
    } else {
      setDiscount(0); // Código inválido
      setIsValidCode(false);
    }
  };


  
  const handleInputChangePackage = (e) => {
    const code = e.target.value.toUpperCase();
    setPromoCodePackage(code);
    console.log('code',code);
    console.log('codigosxproductos',codigosxproductos);
      // Obtener el producto con id 2
    const productId = productos.find((product) => product.id_producto === 16);
    const applicablePromo = codigosxproductos.find(
      (promo) =>  promo.id_producto === productId.id_producto && promo.codigo_promocional === code
    );
    
    console.log('productId',productId);
    console.log('applicablePromo',applicablePromo);

    if (!code){
      setDiscount(0);
      setIsValidCode(true);
      setProductInfo(productId);
      setApplicableCode(null);

    } else if (applicablePromo) {
      setApplicableCode(applicablePromo);
      setDiscount(applicablePromo.procentaje_descuento);
      setIsValidCode(true);
    } else {
      setDiscount(0); // Código inválido
      setIsValidCode(false);
    }
  };

  const discountValue = (value * discount) / 100;
  const totalToPay = value - discountValue;

  const Description = () => (
    <span className="flex items-center space-x-2">
      <ChevronRight className="w-6 h-6 text-pink-600" />
      <p className="text-gray-700 text-sm md:text-lg sm:text-lg">
        Sin dolor, sin radiación, con resultados inmediatos.
      </p>
    </span>
  );

  const Price = () => (
    <p className="text-xl text-gray-700 flex items-center space-x-2">
      Por solo
      <span className="text-6xl font-semibold ml-2">$135.000</span>
    </p>
  );

  const AdditionalServices = () => (
    <div className="space-y-4 mt-6">
      <p className="text-gray-700 text-sm md:text-base sm:text-base">
        Incluye:
      </p>
      <ServiceItem
        icon={
          <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
        }
        text="Valoración por Medicina General"
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
        }
        text="Educación para el auto examen"
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
        }
        text="Historia clínica de la atención"
      />
    </div>
  );

  const ServiceItem = ({ icon, text }) => (
    <div className="flex items-center space-x-2">
      {icon}
      <p className="text-gray-700 text-sm md:text-base sm:text-base">{text}</p>
    </div>
  );

  return (
    <main className="mx-auto">
      {/* Section 1: Text Left, Image Right */}

      <section className="grid grid-cols-2 -mt-12 md:grid-cols-1 sm:grid-cols-1 gap-8 items-center px-24 md:px-8 sm:px-8 py-16 h-[750px] md:h-auto sm:h-auto bexa">
        {/* Contenido */}
        <div className="space-y-5  md:flex md:flex-col md:items-center sm:flex sm:flex-col">
          {/* Título */}
          <h2 className="text-4xl md:text-center md:text-2xl sm:text-2xl font-bold text-gray-600 leading-tight tracking-wide">
            Examen BEXA para Detectar Masas en Mama
          </h2>

          {/* Descripción */}
          <Description />

          {/* Precio */}
          <Price />

          {/* Nuevos servicios */}
          <AdditionalServices />

          {/* Código promocional */}
          <div>
            <label
              htmlFor="promoCode"
              className="block text-gray-700 text-sm mb-2 mt-8"
            >
              Si tienes un código promocional ingrésalo
            </label>
            <input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={handleInputChange}
              className="w-1/2 sm:w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
              placeholder="Código promocional"
            />
          </div>

          {/* Botón de compra */}
          <div className="flex flex-col w-1/2 sm:w-full">
            <button
              className="bg-pink-600 w-full text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg font-bold services-bexa text-sm"
              onClick={() => handleOpenModalCotize(productos.find((product) => product.id_producto === 17))}
            >
              Comprar
            </button>
                    {/* Términos y condiciones */}
          <p
            onClick={handleOpenModalTerm}
            className="cursor-pointer text-center mt-6 text-gray-600 text-sm underline"
          >
            Ver Términos y Condiciones
          </p>
          </div>

  
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
      <section
        id="servicio"
        className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-12 items-center px-24 py-12 md:px-4 sm:px-4"
      >
        {/* Contenedor del Video */}
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
          <video
            className="w-full h-full rounded-2xl object-cover object-right"
            src="https://medicall24.com.co/wp-content/uploads/2025/01/bexa3.mp4"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Contenedor de Información */}
        <div className="space-y-4 p-8 bg-gray-100 rounded-lg shadow-lg transition-transform duration-300 md:flex md:flex-col md:items-center md:justify-center">
          {/* Título */}
          <h2 className="text-4xl md:text-center sm:text-2xl font-bold text-gray-600 hover:text-pink-500 transition-colors duration-200">
            Paquete de Tamizaje para Detectar Cáncer de Mama
          </h2>


          {/* Precio */}
          <p className="text-xl text-gray-700 flex items-center space-x-2">
            Por solo
            <span className="text-6xl font-semibold ml-2">$249.500</span>
          </p>

          {/* Servicios incluidos */}
          <p className="mt-6 md:text-center text-gray-700 text-sm font-semibold">
            Servicios que incluye:
          </p>

          <ul className="space-y-4">
            {/* Examen BEXA */}
            <li className="flex md:items-center md:justify-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
              <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
              <span className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
                Examen BEXA para detectar masas en mama
              </span>
              <div className="ml-2 group relative flex">
                <Info className="w-5 h-5 text-gray-500 hover:text-pink-600 cursor-pointer" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-72 sm:-translate-x-72">
                  <p className="text-white ml-2 text-sm md:text-base sm:text-base">
                    Incluye:
                  </p>
                  {/* Valoración por Medicina General */}
                  <ul>
          
                  <li className="flex items-center  space-x-3 group hover:translate-x-2 transition-transform duration-200">
                    <ChevronRight className="w-6 h-6 text-white group-hover:text-orange-600 transition-colors duration-200" />
                    <span className="text-white text-sm transition-colors duration-200">
                      Valoración por Medicina General
                    </span>
                  </li>

                  {/* Educación para el auto examen */}
                  <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                    <ChevronRight className="w-6 h-6 text-white group-hover:text-orange-600 transition-colors duration-200" />
                    <span className="text-white text-sm transition-colors duration-200">
                      Educación para el auto examen
                    </span>
                  </li>

                  {/* Historia clínica */}
                  <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                    <ChevronRight className="w-6 h-6 text-white group-hover:text-orange-600 transition-colors duration-200" />
                    <span className="text-white text-sm transition-colors duration-200">
                      Historia clínica de la atención
                    </span>
                  </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Ecografía de mama */}
            <li className="flex md:items-center md:justify-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
              <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
              <span className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
                Ecografía de mama
              </span>
            </li>

            {/* Consultas complementarias */}
            <li>
              <div className="flex md:items-center md:justify-center space-x-3 group hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
                  Consultas complementarias por:
                </span>
              </div>
              <ul className="ml-8 mt-2 md:ml-0 space-y-2">
                <li className="flex md:items-center md:justify-center space-x-3">
                  <ChevronRight className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-600 text-sm">Ginecología</span>
                </li>
                <li className="flex md:items-center md:justify-center space-x-3">
                  <ChevronRight className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-600 text-sm">Mastología</span>
                </li>
                <li className="flex md:items-center md:justify-center space-x-3">
                  <ChevronRight className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-600 text-sm">Psicología</span>
                </li>
              </ul>
            </li>
          </ul>

          {/* Código promocional */}
          <div className="mt-4 md:flex md:flex-col md:items-center md:justify-center">
            <label
              htmlFor="promoCode"
              className="block text-gray-700 md:text-center text-sm mb-2"
            >
              Si tienes un código promocional ingrésalo
            </label>
            <input
              id="promoCodePackage"
              type="text"
              value={promoCodePackage}
              onChange={handleInputChangePackage}
              className="w-2/3 sm:w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
              placeholder="Código promocional"
            />
          </div>

          <div className="flex justify-center md:items-center flex-col w-2/3 md:w-full sm:w-full">
          {/* Botón de Acción */}
          <button
            className="bg-pink-600 w-auto md:w-1/3 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg mt-2 mb-4 text-sm"
            onClick={() => handleOpenModalCotize(productos.find((product) => product.id_producto === 16))}
          >
            Comprar Paquete
          </button>
          

          <p
            onClick={handleOpenModalTermPackage}
            className="cursor-pointer text-center text-gray-600 text-sm underline"
          >
            Ver Términos y Condiciones
          </p>
          </div>

        </div>

 
      </section>
      <div className="flex justify-center items-center mb-12">
          <p className="text-center text-gray-700 text-base"> Precios válidos para Colombia.</p>
        </div>
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

      {isOpenModalCotize && (
        <ProductCotize
          productName={name}
          packageValue={value}
          promoCode={promoCode}
          discount={discount}
          totalToPay={totalToPay}
          handleInputChange={handleInputChange}
          discountValue={discountValue}
          productId={id}
          onCloseTerm={handleCloseModalCotize}
          openModalTerm={openModal}
          isValidCode={isValidCode}
        />
      )}
      {isOpenModalTerm && (
        <div className="flex items-center justify-center">
          <TermCondBexa onCloseTerm={handleCloseModalTerm} />
        </div>
      )}
      {isOpenModalTermNext && (
        <div className="flex items-center justify-center">
          <TermCondBexaNext handleAccept={handleAccept} onCloseTerm={handleCloseModalTermNext} />
        </div>
      )}

      {isOpenModalTermPackage && (
        <div className="flex items-center justify-center">
          <TermCondBexaPackage onCloseTerm={handleCloseModalTermPackage} />
        </div>
      )}
      {isOpenModalTermPackageNext && (
        <div className="flex items-center justify-center">
          <TermCondBexaPackageNext
            onCloseTerm={handleCloseModalTermPackageNext}
          />
        </div>
      )}
    </main>
  );
};

export default MainContent;
