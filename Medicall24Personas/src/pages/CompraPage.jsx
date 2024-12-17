import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";
import StepThree from "../components/register/StepThree";
import Stepper from "../components/register/Stepper";
import Modal from "../components/modals/isRegistered";
import ModalNotRegistered from "../components/modals/isNotRegistered";
import ModalTerms from "../components/modals/Term&Cond";
import ModalConfirm from "../components/modals/ConfirmData";
import "../styles/heightDinamic.css";
// import Finally from "../components/finally/FinallyVoucher";
import pse from "../json/formPse.json";
import nequi from "../json/formNequi.json";
import card from "../json/formCard.json";
import ban from "../json/formBancolombia.json";
import { useSelector, useDispatch } from "react-redux";
import { setUpdatedFormDataPaid } from "../store/slices/paidObject";
import usePreventUnload from "../hooks/usePreventUnload";




import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

const StepWizard = () => {
  const [isDirty, setIsDirty] = usePreventUnload();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState({});
  const [modal, setModal] = useState(false);
  const [isModalOpenTerm, setIsModalOpenTerm] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formDataPayment, setFormDataPayment] = useState({});
  const [transaction, setTransaction] = useState(null);
  const [paidObject, setPaidObject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepClass, setStepClass] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const Finally = lazy(() => import("../components/finally/FinallyVoucher"));
  const formData = useSelector((state) => state.formData.formData);
  const localFormData = useSelector((state) => state.localFormData);

  const combinedFormData = {
    ...formData,
    ...localFormData,
  }; 

  useEffect(() => {
  }, [localFormData]);


  const validateFormData = () => {
    console.log('formdata', formData);
    const type = formData.type || "CARD";
    // Validación para "PSE"
    if (type === "PSE") {
      return (
        formData.userType &&
        formData.financialInstitutionCode &&
        localFormData.address &&
        localFormData.phone
      );
    }

    // Validación para "card"
    if (type === "CARD") {
      return (
        formData.number &&
        formData.cardHolder &&
        formData.expMonth &&
        formData.expYear &&
        formData.installments &&
        formData.cvc &&
        localFormData.address &&
        localFormData.phone
      );

    }

    // Validación para "ban" (puedes añadir más campos según sea necesario)
    if (type === "BANCOLOMBIA_TRANSFER") {
      return localFormData.address && localFormData.phone;
    }

    if (type === "NEQUI") {
      return formData.phoneNumber && localFormData.phone && localFormData.address;
    }

    // Agregar validaciones para otros tipos si es necesario
    return false;
  };

  const isButtonDisabled = !validateFormData();



  const updateNestedField = (obj, key, value) => {
    for (const field in obj) {
      if (field === key) {
        obj[field] = value;
      } else if (typeof obj[field] === "object" && obj[field] !== null) {
        updateNestedField(obj[field], key, value);
      }
    }
  };

  const preparePaymentData = () => {
    console.log('combinedformdata', combinedFormData);
    const type = combinedFormData.type || "CARD"; // Obtener el tipo de pago del objeto recibido
    console.log("Tipo de pago:", type);
  
    // Seleccionar la plantilla adecuada según el tipo
    let template = null;
    if (type === "PSE") {
      template = pse;
    } else if (type === "CARD") {
      template = card;
    } else if (type === "BANCOLOMBIA_TRANSFER") {
      template = ban;
    } else if (type === "NEQUI") {
      template = nequi;
    }  
    // Crear y actualizar la plantilla con los datos de combinedFormData
    const updatedFormData = JSON.parse(JSON.stringify(template));
  
    if (combinedFormData) {
      // Campos específicos
      if (combinedFormData.typeId) {
        updateNestedField(updatedFormData, "userLegalIdType", combinedFormData.typeId);
      }
  
      if (combinedFormData.identification) {
        updateNestedField(updatedFormData, "userLegalId", combinedFormData.identification);
      }
  
      const combinedNames = [combinedFormData.name1, combinedFormData.name2].filter(Boolean).join(" ");
      const combinedLastNames = [combinedFormData.lastName1, combinedFormData.lastName2].filter(Boolean).join(" ");
  
      updateNestedField(updatedFormData, "names", combinedNames);
      updateNestedField(updatedFormData, "lastNames", combinedLastNames);
    }
  
    if (!updatedFormData.phoneNumber && combinedFormData.phone) {
      updateNestedField(updatedFormData, "phoneNumber", combinedFormData.phone);
    }
  
    if (combinedFormData.email) {
      updatedFormData.email = combinedFormData.email;
    }
  
    // Actualizar todos los demás campos genéricos
    for (const [key, value] of Object.entries(combinedFormData)) {
      updateNestedField(updatedFormData, key, value);
    }  
    return updatedFormData;
  };


 const dataPayment = () => {
  // Procesar los datos fuera del setFormDataPayment
  const updatedFormData = preparePaymentData();
  console.log("updatedFormData", updatedFormData);

  // Usar el resultado procesado para actualizar el estado y despachar acciones
  setFormDataPayment(updatedFormData);
  dispatch(setUpdatedFormDataPaid(updatedFormData));
  setPaidObject(updatedFormData);
  setPaymentMethod(updatedFormData.paymentMethod.type);

  // Proceder al siguiente paso después de un tiempo
  setTimeout(() => {
    console.log("paidObject", updatedFormData);
    nextStep();
  }, 2000);
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

  // const renderStepContent = (step) => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <StepOne onRegisterData={onRegisterData} modalOpen={modalOpen} status={status} next={next} />
  //       );
  //     case 2:
  //       return (
  //         <StepTwo payload={payload}/>
  //       );
  //     case 3:
  //       return (
  //         <StepThree ref={buyProductRef} />
  //       );
  //       case 4:
  //       return (
  //         <FinallyNequi transactionId={transaction} />
  //       );
  //     default:
  //       return null;
  //   }
  // };
  
  const onRegisterData = (data) => {
    setPayload(data);
    loadPayloadToFormData(data);
    console.log('payload', payload);
  };

  const fetchData = async () => {
    console.log('payload', payload);

    handleCloseModalConfirm();
    // Mostrar el modal con mensaje de "Cargando"
    setStatus("load");
    setIsModalOpen(true);

    try {
      // Realizar la petición POST con axios para registrar al usuario
      const response = await axios.post('https://medicallapi-test.azurewebsites.net/api/Patients', payload);
      console.log('response', response.data);
      // Verificar si el registro fue exitoso
      if (response.data.user) {
        setStatus("success");
        setIsSuccess(true);
        setIsUserRegistered(true)
      } else if (response.data.error) {
        setStatus("error");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setStatus("error");
      setIsSuccess(false);
    }
  };

  const registered = () => {
    setIsUserRegistered(true)
  }

  // Cerrar el modal y redirigir si es exitoso
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      // Redirigir si el registro es exitoso
      setCurrentStep(2) // Cambiar la ruta según corresponda
    }
  };

  const modalOpen = (isUserRegistered) => {
    if (isUserRegistered) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(2);
    setModal(false);
  };

  const BASE_URL = "https://medicallapi-test.azurewebsites.net/api/Payments";
  const performPurchase = async ()=> {
    if (!paidObject) {
      console.error("No se ha proporcionado ningún objeto de pago.");
      return;
    }
    try {
      // const type = paidObject.paymentMethod.type;
      const createTransactionResponse = await axios.post(`${BASE_URL}/PatientPlan`, paidObject,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVzZXIiOiIyIiwiTml0RW1wcmVzYSI6IjkwMDAwNTk1NSJ9.BpWh-T-iKMa4WgUAUokCA58mzXLnhvHjJXRdoxKGZT4`,
          },
        }
      );
  
      const { success, message, data } = createTransactionResponse.data;
  
      if (!success || message !== "Transacción generada exitosamente!.") {
        throw new Error("Algo ha pasado con la transacción, inténtelo más tarde.");
      }
  
      console.log("Transacción generada exitosamente:", data);
  
      // Segunda solicitud: Consultar el estado de la transacción
      const { transactionId } = data;
      setTransaction(transactionId);

      const type = paidObject.paymentMethod.type; 
  
      if (type === "PSE" || type === "BANCOLOMBIA_TRANSFER") {
      const asyncPaymentUrl = await checkAsyncPaymentUrl(transactionId);
  
        if (asyncPaymentUrl) {
          // Redirigir a la URL en una nueva pestaña
          window.open(asyncPaymentUrl, '_blank');
        } else {
          console.error("No se pudo obtener una URL válida para el pago.");
        }
      } else if (type === "CARD") {
        // Redireccionar a la página de pago
        setCurrentStep(4);
      } else if (type === "NEQUI") {
        // Redireccionar a la página de pago
        setCurrentStep(4);
      }

  
      return {
        success: true,
        transactionData: data,
      };
    } catch (error) {
      console.error("Error en la compra:", error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  };
const checkAsyncPaymentUrl = async (transactionId) => {
  const maxAttempts = 100;
  const delay = 1000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      // Realiza la solicitud al endpoint
      const statusResponse = await axios.get(`${BASE_URL}/GetStatusOrder/${transactionId}`);
      const paymentData = statusResponse.data?.data?.payment_method;

      // Verifica si async_payment_url está disponible
      if (paymentData?.extra?.async_payment_url) {
        console.log("URL de pago obtenida:", paymentData.extra.async_payment_url);
        return paymentData.extra.async_payment_url;
      }

      console.log(`Intento ${attempts + 1}: URL aún no disponible, reintentando...`);
    } catch (error) {
      console.error(`Error al obtener el estado de la transacción en el intento ${attempts + 1}:`, error.message);
    }

    // Espera antes de volver a intentar
    await new Promise((resolve) => setTimeout(resolve, delay));
    attempts += 1;
  }

  console.error("Se alcanzó el máximo número de intentos sin obtener una URL válida.");
  return null;
};

useEffect(() => {
  if (currentStep === 1) setStepClass('step-1');
  else if (currentStep === 2) setStepClass('step-2');
  else if (currentStep === 3) setStepClass('step-3');
  else if (currentStep === 4) setStepClass('step-4');
}, [currentStep]);

  const OpenTerm = () => setIsModalOpenTerm(true);
  const handleCloseModalTerm = () => setIsModalOpenTerm(false);

  const handleNextToConfirm = () => {
    handleCloseModalTerm();
    setIsModalOpenConfirm(true)};
  const handleCloseModalConfirm = () => setIsModalOpenConfirm(false);


  return (
        <div className="relative w-full max-w-4xl mx-auto bg-white p-6 h-auto shadow-md rounded-md" onChange={() => setIsDirty(true)}  >
               <Stepper currentStep={currentStep} />
        {/* Contenedor de los pasos */}
      
        <div className={`${stepClass} relative overflow-hidden`}>
          {/* Paso 1 */}
          <br />
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
            }`}
          >
            <StepOne onRegisterData={onRegisterData} modalOpen={modalOpen} next={next} onSuccessfulRegistration={isUserRegistered} registered={registered} />
          </div>
          {/* Paso 2 */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
            }`}
          >
            <StepTwo payload={payload}/>
          </div>
          {/* Paso 3 */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
            }`}
          >
            {currentStep === 3 && (
                  <StepThree paymentMethod={paymentMethod}/>
            )}
    
            {/* <StepThree paymentMethod={paymentMethod}/> */}
          </div>
          {/* Paso 4 */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
              currentStep === 4 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
            }`}
          >
              {currentStep === 4 && (

            <Suspense fallback={<div>Cargando...</div>}>
            <Finally transactionId={transaction} />
            </Suspense>
              )}
          </div>
        </div>

      
          {/* Navegación entre pasos */}
         
 
          <div className="flex justify-between mt-6">
          {currentStep != 4 && (
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
            >
              Anterior
            </button>
          )}

            {isUserRegistered && currentStep === 1 ? ( 
              <button
                className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
                onClick={nextStep}
              >
                Siguiente
              </button>
            ) : isUserRegistered && currentStep === 2 ? ( 
              <button
                onClick={dataPayment}
                disabled={isButtonDisabled}
                className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
              >
                Siguiente
              </button>
               ) : isUserRegistered && currentStep === 3 ? ( 
              <button
                onClick={performPurchase}
                className="w-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 transition-all disabled:opacity-50"
              >
                Comprar
              </button>
            ) : currentStep != 4 && ( // Si no está registrado y no es el paso 3
              <button
                onClick={OpenTerm}
                disabled={disabled}
                className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
              >
                Registrarse
              </button>
            )}
        </div>
            <ModalConfirm isOpenConfirm={isModalOpenConfirm} onCloseConfirm={handleCloseModalConfirm} payload={payload} registrar={fetchData} />
            <ModalTerms isOpenTerm={isModalOpenTerm} onCloseTerm={handleCloseModalTerm} NextToConfirm={handleNextToConfirm} />
            <Modal isOpen={modal} handleNext={handleNextStep} />
            <ModalNotRegistered 
              status={status} 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
            />
      </div>

    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    //   <div className="w-full max-w-5xl bg-white  shadow-lg rounded-lg p-8">
    //   <div className="flex justify-between mt-6">  
    //       {/* <h1 className="text-2xl font-bold text-center text-gray-700">
    //      Paso {currentStep}
    //     </h1> */}
    //         <Stepper currentStep={currentStep} />

    //         {currentStep === 2 ? (
    //       <button
    //         onClick={dataPayment}
    //         disabled={isButtonDisabled}
    //         className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
    //       >
    //         Siguiente
    //       </button>
    //     ) : currentStep === 3 ? (
    //       <button
    //         onClick={performPurchase}
    //         className="w-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-600 transition-all disabled:opacity-50"
    //       >
    //         Comprar
    //       </button>
    //     ) : (
    //       <button
    //         onClick={fetchData}
    //         disabled={disabled}
    //         className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-all disabled:opacity-50"
    //       >
    //         Registrarse
    //       </button>
    //     )}
    //     </div>
        

    //     <div
    //       className="transition duration-500 ease-in-out" 
    //       key={currentStep}
    //       onChange={() => setIsDirty(true)}
    //     >
    //       {renderStepContent(currentStep)}
    //     </div>

        
        
    //   </div>
    //   <Modal isOpen={modal} message="Ya estás registrado, redirigiendo..." />
    //   <ModalNotRegistered 
    //     message={message} 
    //     isOpen={isModalOpen} 
    //     onClose={handleCloseModal} 
    //   />
    // </div>
  );
};

export default StepWizard;
