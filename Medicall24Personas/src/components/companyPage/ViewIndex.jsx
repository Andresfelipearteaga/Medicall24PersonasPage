import video from '../../assets/video.mp4';
import cam from '../../assets/camitemverde.png';

import ButtomModal from './buttomModal';

const styles = `
/* Animación para que los elementos entren desde arriba */
  @keyframes slideDown {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  /* Animación para que los elementos entren desde abajo */
  @keyframes slideUp {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  /* Animación para desvanecerse */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Aplicación de animaciones */
  .animate-slide-down {
    animation: slideDown 1s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 1s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  
  .delay-400 {
    animation-delay: 0.4s;
  }
    
`;

const ViewIndex = () => {
  return (
    
<main>
    <style>{styles}</style>
  <div className="container mx-auto mb-12 flex flex-row md:flex-col items-center justify-center gap-8 ">
    <div className="w-full md:w-2/2 text-center">
      <div className="flex flex-col justify-center text-left animate-slide-down opacity-0">
        <h1 className="text-gray-600 text-5xl md:text-2xl md:text-center font-bold mb-8 animate-fade-in">
          Plan de Telemedicina para Empresas
        </h1>
        <div className="flex items-center space-x-2 md:justify-center">
          <span className="text-gray-600 font-semibold">Desde</span><span className="font-bold text-pink-600 text-6xl">$7,990</span> <span className="text-pink-600 text-xl font-bold">COP</span>
        </div>

        <p className="text-gray-600 mb-2 delay-200 md:text-center font-semibold">
          Valor promedio por usuario al mes
          </p>
        
          <div className="flex flex-row md:flex-col items-center mt-6 mb-6 space-x-2">
            <img src={cam} alt="cam" className="w-6 h-auto" />
            <p className="text-gray-600 text-lg font-semibold md:text-center">Consultas ilimitadas de Medicina General, Psicología y Pediatría</p>
          </div>

        <div className="flex flex-row md:justify-center flex-wrap gap-4 opacity-0 animate-slide-up delay-400">
          <ButtomModal label="Comprar plan" className="w-auto plan-btn-section" dataTarget="planes"   onClick={() => {
        document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}/>
        </div>


      </div>
    </div>
    <div className="w-full md:w-10/12">
      <div className="relative w-full h-96 overflow-hidden rounded-3xl">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
  </main>
);
};

export default ViewIndex;