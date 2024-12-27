import medico from '../../assets/medico.webp';

const InfoText = () => {
  return (
<div className="container mx-auto flex flex-row md:flex-col items-center justify-center gap-8">
  <div className="w-full md:w-2/2 text-left md:text-center">
    <h1 className="text-5xl md:text-xl font-bold leading-tight">
      <span className="font-bold bg-gradient-to-r from-pink-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">Acceso rápido</span> <span className="text-gray-600">a la salud sin salir del trabajo</span>
       </h1>
       <p className="mt-4 font-regular text-gray-600">
         Disminuye el ausentismo laboral con el plan de Telemedicina para trabajadores y sus familias.
       </p>
       <p className="mt-4 font-regular text-gray-600">
 
         Atención rápida, segura y de calidad, garantizada a través de la App para dispositivos móviles MEDICALL24.      </p>
       <p className="mt-4 font-regular text-gray-600">
 
         Nuestros profesionales y especialistas realizan consultas, emiten diagnósticos y prescriben tratamientos de manera remota.      </p>
       <p className="mt-4 font-regular text-gray-600">
         Los pacientes pueden descargar historias clínicas, fórmulas de medicamentos, órdenes médicas, remisiones y certificados de incapacidad.      </p>
  </div>
  <div className="w-full md:w-2/2 rounded-3xl overflow-hidden">
    <img src={medico} alt="imagen" className="w-full h-auto transition-transform transform scale-100 hover:scale-110 hover:rotate-1 hover:translate-y-[-5px] duration-300" />
  </div>
</div>


);
};

export default InfoText;


