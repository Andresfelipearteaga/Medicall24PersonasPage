
import bexa6 from "../../../assets/bexa6.png";

const ServiciosBexa = () => {
  return (
<main
  className="mx-auto py-6 sm:px-6 lg:px-20"
  style={{
    backgroundImage:
      "url('https://medicall24.com.co/wp-content/uploads/2025/01/bexa5.png')",
    backgroundSize: "cover",
    backgroundPositionY: "70%",
  }}
>
  <div className="grid grid-cols-6 items-center mt-5 gap-8">
    {/* Espacio izquierdo */}
    <div className="col-span-2 hidden lg:block"></div>

    {/* Contenido principal */}
    <div className="col-span-4 flex flex-col items-start lg:items-center lg:ml-auto space-y-12">
      {/* Títulos */}
      <div className="text-left lg:text-center">
        <p className="text-5xl sm:text-4xl font-regular text-gray-600">
          Examen <span className="font-extrabold">Bexa</span>
        </p>
        <p className="text-3xl sm:text-2xl text-gray-600 mt-4">
          Para la detección temprana
        </p>
        <p className="text-3xl sm:text-2xl text-gray-600">
          del cáncer de mama
        </p>
      </div>
        {/* Imagen */}
        <div className="w-2/4 sm:w-72 h-auto overflow-hidden rounded-lg">
        <img
            src= {bexa6}
            alt="samara"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center top" }} 
        />
        </div>

      {/* Botones */}
      <div className="flex flex-col space-y-10 w-2/4 sm:w-3/4">
        <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-600 hover:text-white hover:border-b-2 hover:border-pink-500 duration-300 appearance-none block h-12 bg-transparent border-2 border-pink-600 text-center rounded-xl font-medium text-2xl text-pink-600">
          Más información
        </button>
        <button className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-12 bg-pink-600 text-center rounded-xl font-medium text-2xl text-white">
          Comprar
        </button>
      </div>
    </div>
  </div>
</main>

  );
};

export default ServiciosBexa;
