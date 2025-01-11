import { useState } from "react";
import SimulatedSection from "./SimulatedSection";
import video from '../../../assets/videoSectionSimulate.mp4';

const ViewSimulatedSection = ( { openModal } ) => {
  const [activeDiv, setActiveDiv] = useState(1);


  // Función para mostrar la tabla
//   const showIndex = () => {
//     setActiveDiv(1);
//   };

  // Función para mostrar el formulario
  const ShowSimulated = () => {
    setActiveDiv(2);
  };

  const handleChildAction = (newActiveDiv) => {
    setActiveDiv(newActiveDiv); // Actualiza el estado en el padre
  };

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden py-96">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`
            absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-50 
            transform transition duration-500 ease-in-out
            ${activeDiv === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div 
          className={`
            absolute top-0 left-0 w-full h-full
            transform transition duration-500 ease-in-out
            ${activeDiv === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          {/* Botón de ir a Formulario */}
          <div className="relative h-full flex flex-col items-center justify-center" onClick={ShowSimulated}>
            <span className="text-center text-5xl font-bold text-white md:text-5xl sm:text-xl">Utilice el simulador y arme un plan para sus trabajadores</span>
            <button 
            className='bg-orange-500 text-white font-bold py-2 px-6 border-b-4 border-orange-500 rounded-3xl w-5/12 mt-10 w-auto md:w-96 md:text-2xl hover:bg-orange-500 hover:scale-110 transition duration-300 hover:border-orange-400 cursor-pointer'
            >
            Abrir simulador
            </button>
          </div>
        </div>

        {/* Div del Formulario */}
        <div 
          className={` bg-gray-100 py-12
            absolute top-0 left-0 w-full
            transform transition duration-500 ease-in-out
            ${activeDiv === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
        >
          <div className="relative h-full overflow-hidden">
            <SimulatedSection onParentAction={handleChildAction} openModal={openModal}/>
          </div>
        </div>
</main>
  );
};

export default ViewSimulatedSection;