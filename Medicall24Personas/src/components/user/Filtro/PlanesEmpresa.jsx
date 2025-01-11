import cam from "../../../assets/camitemverde.png";

const PlanesEmpresa = () => {
  return (
    <main className="mx-auto flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8 bg-gray-100 py-16">
      <div className="flex flex-row sm:flex-col items-center mt-5 gap-16">
        <div>
          <div className="flex justify-center">
            <div className="w-full sm:w-52 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="w-80 sm:w-64 h-full sm:h-64 overflow-hidden rounded-lg">
                <img
                  src="https://medicall24.com.co/wp-content/uploads/2025/01/imagenEmpresa-scaled.webp"
                  alt="samara"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div>
            <p className="text-5xl sm:text-4xl font-regular text-center text-gray-500">
              Planes de
            </p>
            <p className="text-6xl sm:text-5xl font-bold text-center text-gray-500">
              Telemedicina
            </p>
            <p className="text-7xl sm:text-5xl font-extrabold text-center text-pink-600 mb-8">
              Para Empresas
            </p>
          </div>

          <div className="flex flex-col w-2/3 space-y-8">
            <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-600 hover:text-white hover:border-b-2 hover:border-pink-500 duration-300 appearance-none block h-10 bg-transparent border-2 border-pink-600 text-center rounded-xl font-medium text-2xl text-pink-600">
              Mas información
            </button>
            <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl text-white">
              Comprar
            </button>
          </div>

          <div>
            <p className="text-4xl sm:text-5xl text-center font-semibold text-orange-500 mt-12">
              Consultas Ilimitadas
            </p>
            <div className="flex justify-center gap-6 mt-6">
              {/* Primer icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-8 h-auto" />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  Medicina General
                </span>
              </div>

              {/* Segundo icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-8 h-auto" />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  Psicología
                </span>
              </div>

              {/* Tercer icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-8 h-auto" />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  Pediatría
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlanesEmpresa;
