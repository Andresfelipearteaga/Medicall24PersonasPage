import { Info } from "lucide-react";

const Stepper = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Regístrate en MEDICALL24" },
    { id: 2, label: "Elige el método de pago" },
    { id: 3, label: "Finaliza la compra" },
  ];

  return (
    <ol className="flex sm:flex-col sm:items-start items-center justify-center sm:space-x-4 sm:w-full sm:space-y-4 flex space-x-8 space-y-0 rtl:space-x-reverse">
      {steps.map((step) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <li
            key={step.id}
            className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
              isCompleted
                ? "text-pink-600"
                : isActive
                ? "text-pink-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 sm:w-6 sm:h-6 border rounded-full shrink-0 transition-all ${
                isCompleted
                  ? "bg-pink-600 border-pink-600"
                  : isActive
                  ? "border-pink-600"
                  : "border-gray-500 dark:border-gray-400"
              }
              ${step.id ===1 ? 'ml-4': 'ml-0'}
              `}
            >
              {isCompleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.id
              )}
            </span>
            <span className="relative flex items-center">
              <h3 className={`font-medium sm:text-xs md:text-base leading-tight`}>{step.label}</h3>
              {step.id === 1 && (
                <div className="ml-2 group relative flex">
                  <Info className="w-5 h-5 text-gray-500 hover:text-pink-600 cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-72">
                  <p className="mb-2">
                La paciente beneficiaria del paquete de tamizaje para detectar Cáncer de Mama, se deberá registrar en la App MEDICALL24, que será la aplicación que se deberá utilizar para solicitar y gestionar las citas para el examen BEXA y para acceder al resto de los servicios que este incluye.
              </p>
              <p>
                Si tienes dudas, vuelve a leer los términos y condiciones.
              </p>
                  </div>
                </div>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
