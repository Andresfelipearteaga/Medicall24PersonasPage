import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";
import StepThree from "../components/register/StepThree";
import Stepper from "../components/register/Stepper";
import Modal from "../components/modals/isRegistered";



import { useState } from "react";
// import axios from "axios";

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState({});
  const [status, setStatus] = useState(null);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formDataPayment, setFormDataPayment] = useState({
    typeId: "",
    identification: "",
    names: "",
    lastNames: "",
    email: "",
    address: "",
    phone: "",
    productId: 15,
    paymentMethod: {
      type: "string",
      installments: 0,
      card: {
        number: "string",
        cvc: "string",
        expMonth: "string",
        expYear: "string",
        cardHolder: "string"
      },
      userType: "PERSON",
      paymentDescription: "Compra de Plan de telemedicina",
      phoneNumber: "string",
      userLegalIdType: "string",
      userLegalId: "string",
      financialInstitutionCode: 0
  }
});

const updateNestedField = (obj, key, value) => {
  for (const field in obj) {
    if (field === key) {
      obj[field] = value;
    } else if (typeof obj[field] === "object" && obj[field] !== null) {
      updateNestedField(obj[field], key, value);
    }
  }
};

const dataPayment = (data) => {
  const dataUser = data.user;
  console.log('dataUser', dataUser);
  setFormDataPayment((prevFormData) => {
    const updatedFormData = { ...prevFormData };

     // Actualizar campos específicos
     if (data.typeId) {
      updateNestedField(updatedFormData, "userLegalIdType", dataUser.typeId);
    }
    if (data.identification) {
      updateNestedField(updatedFormData, "userLegalId", dataUser.identification);
    }

    const combinedNames = [dataUser.name1, dataUser.name2].filter(Boolean).join(" ");
    const combinedLastNames = [dataUser.lastName1, dataUser.lastName2].filter(Boolean).join(" ");

    updateNestedField(updatedFormData, "names", combinedNames);
    updateNestedField(updatedFormData, "lastNames", combinedLastNames);

    for (const [key, value] of Object.entries(data)) {
      updateNestedField(updatedFormData, key, value);
    }
    console.log('dataformdata', formDataPayment);
    return updatedFormData;
  });
};

const loadPayloadToFormData = (payload) => {
  setFormDataPayment((prevFormData) => {
    const updatedFormData = { ...prevFormData };

      // Copiar valores específicos al formulario
      if (payload.typeId) {
        updateNestedField(updatedFormData, "userLegalIdType", payload.typeId);
      }
      if (payload.identification) {
        updateNestedField(updatedFormData, "userLegalId", payload.identification);
      }
  
      // Combinar nombres y apellidos del payload
      const combinedNames = [payload.name1, payload.name2].filter(Boolean).join(" ");
      const combinedLastNames = [payload.lastName1, payload.lastName2].filter(Boolean).join(" ");
  
      updateNestedField(updatedFormData, "names", combinedNames);
      updateNestedField(updatedFormData, "lastNames", combinedLastNames);

     // Actualizar con el resto de los campos del payload
     for (const [key, value] of Object.entries(payload)) {
        updateNestedField(updatedFormData, key, value);
    }
    return updatedFormData;
  });
};

  const next = (isValid) => {
    if (!isValid) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

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
          <StepOne onRegisterData={onRegisterData} modalOpen={modalOpen} status={status} next={next} />
        );
      case 2:
        return (
          <StepTwo payload={payload} dataPayment={dataPayment}/>
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
  
  const onRegisterData = (data) => {
    setPayload(data);
    loadPayloadToFormData(data);
    console.log('payload', payload);
  };

  const fetchData = async () => {
    setStatus(200);
  };

  const modalOpen = (isUserRegistered) => {
    if (isUserRegistered) {
      setModal(true);
      setTimeout(() => {
        setCurrentStep(2);
        setModal(false);
      }, 2000);
    } else {
      setModal(false);
    }
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
            disabled={disabled}
            className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50
            "
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
      <Modal isOpen={modal} message="Ya estás registrado, redirigiendo..." />

    </div>
  );
};

export default StepWizard;
