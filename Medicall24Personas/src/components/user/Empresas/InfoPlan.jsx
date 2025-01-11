
import icon from '../../../assets/camitemverde.png';
import paciente from '../../../assets/paciente.webp';


const InfoPlan = () => {
    const items = [
        { icon: "user-md", text: "Medicina General" },
        { icon: "user-md", text: "Psicología" },
        { icon: "user-md", text: "Pediatría" },
      ];
      
    return (
<div className="container mx-auto flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8">
  <div className="w-6/12 md:w-2/5 rounded-3xl overflow-hidden">
    <img src={paciente} alt="image" className="w-full h-auto transition-transform transform scale-100 hover:scale-110 hover:rotate-1 hover:translate-y-[-5px] duration-300" />
  </div>
  <div className="w-full md:w-2/2 text-left md:text-center flex flex-col justify-center items-center">
    <span className="text-5xl md:text-4xl sm:text-3xl font-bold text-gray-700 mt-10 mb-6 ml-16 md:ml-0 sm:ml-0">Plan de Telemedicina para 12 meses</span>

    <div className="text-center items-center mb-0">


      <ul className="flex gap-14 md:gap-2 sm:gap-2 mt-2 mb-8 items-center justify-center">
        {items.map((item, index) => (
          <li className="flex flex-row items-center" key={index}>
            <div className="rounded-full flex items-center justify-center w-7 h-auto">
              <img src={icon} alt="Descripción" className="w-full h-auto" />
            </div>
            <p className="ml-2 text-base md:text-xl text-gray-700 font-semibold">{item.text }</p>
          </li>
        ))}
      </ul>

    </div>

      <div className="w-10/12 rounded-lg overflow-hidden mb-6 md:w-full sm:w-full">
        <table className="w-full bg-white">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 md:px-0 py-3 text-center font-bold text-base md:text-lg sm:text-lg">Valor mensual del plan para el usuario tomador</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 bg-gray-100 transition-colors duration-200">
                <th className="px-4 py-3 text-base md:text-lg sm:text-lg text-center font-bold text-gray-600"><span className="text-sm md:text-lg sm:text-lg font-bold text-pink-600">Desde</span> $19,960 COP</th>
              </tr>
          </tbody>
        </table>
    
      </div>

      <div className="w-10/12 rounded-lg overflow-hidden sm:w-full md:w-full">
        <p className="text-left text-base md:text-lg font-regular mb-4 sm:text-lg text-gray-700 mb-4">El tomador del plan puede registrar 3 usuarios adicionales con tarifas preferenciales</p> 
        <table className="w-full border-collapse bg-white shadow-lg">
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 border-r border-gray-200 py-3 text-base sm:text-lg md:text-lg text-center font-regular text-gray-700">
                  Segundo usuario
                </td>
                <td className="px-4 py-3 border-r border-gray-200 text-base md:text-lg sm:text-lg text-center font-bold text-gray-700">
                    <span className="text-sm md:text-lg sm:text-lg font-bold text-pink-600">Desde</span> $6,000 COP
                </td>
                <td className="px-4 py-3 text-base md:text-lg sm:text-lg text-center font-medium text-gray-700">
                  Descuento <span className="font-bold">70%</span>
                </td>
              </tr>
              <tr className="transition-colors duration-200">
                <td className="px-4 py-3 border-r sm:text-lg border-gray-200 text-base md:text-lg text-center font-regular text-gray-700">
                Tercer usuario
                </td>
                <td className="px-4 py-3 border-r sm:text-lg border-gray-200 text-base md:text-lg text-center font-bold text-gray-700">
                    <span className="text-sm md:text-lg sm:text-lg font-bold text-pink-600">Desde</span> $4,000 COP

                </td>
                <td className="px-4 py-3 text-base md:text-lg  sm:text-lgtext-center font-medium text-gray-700">
                    Descuento <span className="font-bold">80%</span>
                </td>
              </tr>
              <tr className="bg-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 border-r border-gray-200 py-3 sm:text-lg text-base md:text-lg text-center font-regular text-gray-700">
                Cuarto usuario
                </td>
                <td className="px-4 py-3 border-r border-gray-200 text-base sm:text-lg md:text-lg text-center font-bold text-gray-700">
                    <span className="text-sm md:text-lg sm:text-lg font-bold text-pink-600">Desde</span> $2,000 COP
                </td>
                <td className="px-4 py-3 text-base md:text-lg sm:text-lg text-center font-medium text-gray-700">
                Descuento <span className="font-bold">90%</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-left text-xs md:text-lg sm:text-lg font-medium text-gray-700 mt-6">
            Valor total del plan al mes por los 4 usuarios: <span className="font-bold text-gray-700">$31,960 COP</span> |      Valor promedio por usuario al mes: <span className="font-bold text-gray-700">$7,990 COP</span>
          </p>
          <div className="flex flex-row justify-center">
            <a href="/Term&Cond" target="_blank" className="text-center">
              <button id="btn-term-1" className="text-base md:text-lg sm:text-lg font-medium text-gray-700 mt-2 underline">
                Ver términos y condiciones
                </button>
            </a>
          </div>

  </div>
</div>
</div>

);
};  

export default InfoPlan;

