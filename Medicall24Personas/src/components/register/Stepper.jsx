const Stepper = ({ currentStep }) => {
    const steps = [
      { id: 1, label: "Registro en Medicall24" },
      { id: 2, label: "Metodo de Pago" },
      { id: 3, label: "Detalles de Compra" },
    ];
  
    return (
      <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
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
                className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 transition-all ${
                  isCompleted
                    ? "bg-pink-600 border-pink-600"
                    : isActive
                    ? "border-pink-600"
                    : "border-gray-500 dark:border-gray-400"
                }`}
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
              <span>
                <h3 className="font-medium leading-tight">{step.label}</h3>
              </span>
            </li>
          );
        })}
      </ol>
    );
  };
  
  export default Stepper;
  