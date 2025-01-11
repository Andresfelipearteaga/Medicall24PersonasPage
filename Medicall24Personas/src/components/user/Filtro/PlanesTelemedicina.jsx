import samara from "../../../assets/samara.png";

const PlanesTelemedicina = () => {
  return (
    <main
      className="mx-auto py-16 flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8"
      style={{
        backgroundImage:
          "url('https://medicall24.com.co/wp-content/uploads/2025/01/fondoPLanesInicio.png')",
        backgroundSize: "cover",
        backgroundPositionY: "70%",
      }}
    >
      <div className="flex flex-row sm:flex-col items-center mt-5 gap-16">
        <div className="flex flex-col items-center">
          <p className="text-5xl sm:text-4xl font-regular text-center text-pink-600">
            Planes de
          </p>
          <p className="text-7xl sm:text-5xl font-bold text-center text-pink-600">
            Telemedicina
          </p>

          <p className="text-3xl sm:text-2xl text-center text-gray-600 mt-6">
            Acceso rápido a la salud
          </p>
          <p className="text-3xl sm:text-2xl text-center text-gray-600">
            desde cualquier zona del país{" "}
          </p>

          <div className="flex flex-col w-2/3  space-y-8 mt-8">
            <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-600 hover:text-white hover:border-b-2 hover:border-pink-500 duration-300 appearance-none block h-10 bg-transparent border-2 border-pink-600 text-center rounded-xl font-medium text-2xl text-pink-600">
              Mas información
            </button>

            <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl text-white">
              Comprar
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <div className="w-full sm:w-52 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="w-full sm:w-64 h-72 sm:h-64 overflow-hidden rounded-lg">
                <img
                  src="https://medicall24.com.co/wp-content/uploads/2025/01/22711327-scaled.webp"
                  alt="samara"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlanesTelemedicina;
