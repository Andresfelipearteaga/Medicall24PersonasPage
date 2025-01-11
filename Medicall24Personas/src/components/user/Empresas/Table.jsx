import useGetValuePlan from '../../../hooks/useGetValuePlan';
import icon from '../../../assets/camitemverde.png';


const items = [
  { icon: "user-md", text: "Medicina General" },
  { icon: "user-md", text: "Psicología" },
  { icon: "user-md", text: "Pediatría" },
];

const styles = `
.custom-input::placeholder {
    font-size: 0.9rem;
    font-weight: lighter;
  }
    
`;

  


// Mapeo de los rangos de "Tope de Usuarios" y los valores del plan correspondientes
const planValues = [
  { tope: 1000, valor: 29992 },
  { tope: 1500, valor: 29992 },
  { tope: 2000, valor: 29992 },
  { tope: 3000, valor: 28795 },
  { tope: 4000, valor: 27646 },
  { tope: 6000, valor: 26543 },
  { tope: 8000, valor: 25484 },
  { tope: 12000, valor: 24467 },
  { tope: 16000, valor: 23491 },
  { tope: 24000, valor: 22553 },
  { tope: 32000, valor: 21654 },
  { tope: 48000, valor: 20790 },
  { tope: 64000, valor: 19960 },
];

const Table = ( { onNext, openModal } ) => {
  const { tope, setTope, valorPlan, setValorPlan } = useGetValuePlan();

  const handleNext = () => {
    if (tope && valorPlan) {
      onNext({ tope, valorPlan });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  // const handleSubmit = () => {
  //   console.log(valorPlan);
  //   onActivate(valorPlan);
  // };

  // Función que actualiza el valor del plan según el tope de usuarios
const handleTopeChange = (e) => {
  const inputValue = e.target.value.replace(/,/g,'');
  setTope(inputValue);

  if (inputValue === "") {
    setValorPlan("");
    return;
  }

  const topeNumber = Number(inputValue);

  if (isNaN(topeNumber)) {
    setTope("");
    setValorPlan("");
    return
  }  

  setTope(topeNumber.toLocaleString("es-US"));


  if (topeNumber > 0 && topeNumber < 1000) {
    // Si el tope es menor a 1000 pero mayor a 0, usa el valor de 1000
    const plan = planValues.find((item) => item.tope === 1000);
    if (plan) {
      setValorPlan(plan.valor);
    } else {
      setValorPlan(""); 
    }
  } else {
    // Lógica normal para valores mayores o iguales a 1000
    const plan = planValues.reduce((current, next) => {
      if (topeNumber >= current.tope && topeNumber < next.tope) {
        return current;
      }
      return next;
    });
      if (plan && topeNumber >= plan.tope) {
        setValorPlan(plan.valor);
      } else {
        setValorPlan(""); // Si no encuentra un valor válido
      }
    }
  };
  const calculateValues = () => {
    const formatTope = tope.replace(/,/g,'');
    if (valorPlan !== "") {
      const originalValue = 29992;
      const discount = Math.round(((originalValue - valorPlan) / originalValue) * 100);
      const valueMonthly = valorPlan * formatTope;
      const valueAnnually = valueMonthly * 12;
      return { discount, valueMonthly, valueAnnually };
    }
    return { discount: "0", valueMonthly: "0", valueAnnually: "0" }; 
  };

  const { discount, valueMonthly, valueAnnually } = calculateValues();

  return (

<div className="p-6 md:p-12">
      <style>{styles}</style>
      {/* Título */}
      <h1 className="text-5xl md:text-4xl sm:text-2xl font-bold text-center mb-8 text-pink-600">
        Plan de Telemedicina para 12 meses
      </h1>

      {/* 3 Items con imágenes */}
      <ul className="flex space-x-4 mb-10 justify-center">
        {items.map((item, index) => (
          <li className="flex flex-row items-center" key={index}>
       
            <div className="rounded-full flex items-center justify-center w-7 h-auto">
              <img src={icon} alt="Descripción" className="w-full h-auto hover:scale-110 transition ease-in-out" />
            </div>
        
            <p className="ml-2 text-xl md:text-lg sm:text-base text-gray-700 font-bold ">{item.text }</p>
          </li>
        ))}
      </ul>

      {/* Label pequeño y Input */}
      <label className="block text-ls md:text-xl font-medium text-gray-500 mb-2 text-center">
        Ingresa la cantidad de usuarios tomadores del plan
      </label>
      <div className="flex flex-row justify-center items-center">
      <input
        id="tope"
        type="text"
        value={tope}
        onChange={handleTopeChange}
        className="custom-input w-4/10 md:w-6/12 self-center p-2 text-gray-600 font-bold placeholder-gray-400 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-orange-500 mb-0"
        placeholder="Cantidad de tomadores"
      />
      </div>
  
      {/* Tabla de precios */}
      <div className="flex items-center justify-center w-full">
      <button onClick={openModal} className="md:text-xl plan-btn bg-transparent font-bold text-pink-600 px-4 py-2 rounded-lg text-underline mb-4 hover:scale-110 transition ease-in-out transform">
        Ver escala de precios
      </button>
      
    </div>
      {/* Descripción */}
      <p className="text-center text-xl md:text-lg font-bold mb-4 text-gray-700 mb-4">Valor del mes para cada usuario tomador</p>

 
      {/* Label grande */}
      <label className="block text-center text-6xl md:text-4xl sm:text-5xl font-bold text-gray-700 mb-6 hover:text-pink-600 transition ease-in-out">
         {valorPlan !== "" ? `$ ${valorPlan.toLocaleString("en-US")}` : "$0"}
      </label>

      {/* 3 Inputs en línea horizontal */}
      <div className="flex flex-row md:text-lg md:flex-col sm:text-base sm:flex-col justify-between items-start md:items-center gap-4 mt-6">
  {[
    { label: "Descuento", value: `${discount}%`, symbol: "%" },
    { label: "Valor mensual del plan", value: `$${valueMonthly.toLocaleString("en-US")}`, symbol: "$" },
    { label: "Valor anual del plan", value: `$${valueAnnually.toLocaleString("en-US")}`, symbol: "$" },
  ].map((item, index) => (
    <div key={index} className="flex flex-col items-start md:items-center w-full">
      {/* Texto alineado con su input */}
      <label className="text-lg font-semibold text-gray-600 mb-2">{item.label}</label>
      <div className="flex items-center w-full">
        {/* Símbolo pegado al input */}
        {/* <span className="text-gray-500 text-sm mr-2">{item.symbol}</span> */}
        <input
          disabled
          type="text"
          value={item.value}
          className="w-full text-gray-600 font-bold p-2 border-x-0 border-t-0 border-gray-400 focus:outline-none bg-white border-2 border-gray-200"
          placeholder={item.value}
        />
      </div>
    </div>
  ))}

</div>
<div className='flex items-center justify-center'>
<button 
  className={`bg-orange-500 text-white font-bold py-2 px-6 border-b-4 border-orange-500 rounded-3xl w-5/12 mt-10 w-auto ${tope.trim() === "" ? 'opacity-50' : 'hover:bg-orange-500 hover:scale-110 transition duration-300 hover:border-orange-400 cursor-pointer'}`}
  disabled={tope.trim() === ""}
  onClick={handleNext}>
  Solicitar Cotización
</button>
</div>

    </div>

    
  );
};

export default Table;
