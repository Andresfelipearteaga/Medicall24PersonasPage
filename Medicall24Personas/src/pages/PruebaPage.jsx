import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";
import StepThree from "../components/register/StepThree";
import Stepper from "../components/register/Stepper";



import { useState } from "react";
// import axios from "axios";

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };



  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne onRegisterData={onRegisterData} status={status} />
        );
      case 2:
        return (
          <StepTwo payload={payload}/>
        );
      case 3:
        return (
          <StepThree />
        );
      case 4:
        return (
         <p>Paso 4</p>
        );
      case 5:
        return (
          <p>Paso 5</p>

        );
      case 6:
        return (
          <p>Paso 6</p>

        );
      default:
        return null;
    }
  };

  const [payload, setPayload] = useState({});
  const [status, setStatus] = useState(null);
  
  const onRegisterData = (data) => {
    setPayload(data);
    console.log('payload', payload);
  };

  const fetchData = async () => {
    setStatus(200);
  };



  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white  shadow-lg rounded-lg p-8">
      <div className="flex justify-between mt-6">  

          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
          >
            Anterior
          </button>
          {/* <h1 className="text-2xl font-bold text-center text-gray-700">
         Paso {currentStep}
        </h1> */}
                <Stepper currentStep={currentStep} />


        {status === 200 ? 
          <button
            onClick={nextStep}
            disabled={currentStep === 6}
            className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
          >
            Siguiente
          </button>
          :
          <button
            onClick={fetchData}
            className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all"
          >
            Registrarse
          </button>
          }
        </div>
        

        <div
          className="transition duration-500 ease-in-out"
          key={currentStep}
        >
          {renderStepContent(currentStep)}
        </div>


      </div>
    </div>
  );
};

export default StepWizard;
