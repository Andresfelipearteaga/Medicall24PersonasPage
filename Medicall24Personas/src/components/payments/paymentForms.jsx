import { useState, useEffect } from "react";
import card from "../../assets/SVG/card.svg";
import pse from "../../assets/SVG/pse.svg";
import ban from "../../assets/SVG/Ban.svg";
import visa from "../../assets/SVG/visa.svg";
import mastercard from "../../assets/SVG/mastercard.svg";
// import nequi from "../../assets/SVG/nequi.svg";
import axios from "axios";


const PaymentForm = ({ onFormDataChange }) => {
  const [selectedMethod, setSelectedMethod] = useState("CARD"); // Método inicial
  const [formValues, setFormValues] = useState({}); // Almacena valores del formulario
  const [bankPse, setBankPse] = useState([]);
  const [formDataPayment, setFormDataPayment] = useState({
    type: selectedMethod,
  });



      const handleInputChange = (field, value) => {
        setFormValues((prev) => {
          const updatedData = { ...prev, [field]: value }; // Mantén los valores existentes y actualiza el campo específico
          onFormDataChange(updatedData); // Envía el objeto completo actualizado al callback
          console.log('updatedata2',updatedData);
          return updatedData; // Devuelve el objeto actualizado para actualizar el estado
        });
      };

 // Maneja el cambio de método de pago
const onMethodChange = (method) => {
  setSelectedMethod(method);
  handleMethodChange(method);

  const resetData = {
    type: method,
    ...(method === "CARD" && {
      financialInstitutionCode: "0",
      userType: "PERSON",
      phoneNumber: "",
    }),
    ...(method === "PSE" && {
        number: "",
        cvc: "",
        expMonth: "",
        expYear: "",
        cardHolder: "",
      installments: "0",
      phoneNumber: "",
      userType: "",
      financialInstitutionCode: "0",
    }),
    ...(method === "BANCOLOMBIA_TRANSFER" && {
      financialInstitutionCode: "0",
      userType: "PERSON",
        number: "",
        cvc: "",
        expMonth: "",
        expYear: "",
      installments: "0",
      phoneNumber: "",
    }),
    ...(method === "NEQUI" && {
        number: "",
        cvc: "",
        expMonth: "",
        expYear: "",
        cardHolder: "",
      installments: "0",
      financialInstitutionCode: "0",
      userType: "PERSON",
    }),
  };

  // Actualiza `formValues` y llama a `onFormDataChange`
  setFormValues((prev) => {
    const updatedData = { ...prev, ...resetData };
    onFormDataChange(updatedData); // Envía los datos actualizados al padre
    return updatedData; // Devuelve el objeto actualizado
  });
};

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setFormDataPayment({
      type: method,
    });
    onFormDataChange({ type: method });

  };

  const loadBankPse = async () => {
    try {
      const response = await axios.get(
        "https://medicallapi.azurewebsites.net/api/Payments/FinancialInstitutions"
      );
      setBankPse(response.data.data);
    } catch (error) {
      console.error("Error al cargar el banco:", error);
    }
  };

  useEffect(() => {
    loadBankPse();
  }, []);

  const methods = [
    {
      id: "CARD",
      // icon: <CreditCard className="w-12 h-12 text-pink-500" />,
      label: "Tarjeta de crédito\no débito",
      activeColor: "border-2 border-white shadow-lg bg-white",
      textColor: "text-gray-600"
    },
    {
      id: "PSE",
      // icon: <Landmark className="w-12 h-12 text-blue-500" />,
      label: "PSE",
      activeColor: "border-2 border-white shadow-lg bg-white",
      textColor: "text-gray-600"
    },
    {
      id: "BANCOLOMBIA_TRANSFER",
      // icon: <BanknotesIcon className="w-12 h-12 text-yellow-500" />,
      label: "Bancolombia",
      activeColor: "border-2 border-white shadow-lg bg-white",
      textColor: "text-gray-600"
    }
  ];

  return (
    <div className="w-full mx-auto flex flex-col">
      <h2 className={`text-2xl font-bold text-gray-700 text-center mb-6 ${selectedMethod === 'CARD' ? 'mt-6': 'mt-0' }`}>
        Selecciona un Método de Pago
      </h2>
      <div className="flex justify-around w-full mb-8">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`
            flex flex-col items-center justify-center 
            w-full max-w-[140px] p-2 rounded-xl 
            transition-all duration-300 ease-in-out
            border-2 hover:shadow-lg
            ${selectedMethod === method.id 
              ? `${method.activeColor} border-opacity-100` 
              : 'border-gray-200 border-opacity-50 bg-gray-50'}
            group
          `}
        >
          <div className="mb-2 opacity-100 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center">
            {method.id === "CARD" && <img src={visa} alt="card" className="w-10 h-10" />}
            {method.id === "CARD" && <img src={mastercard} alt="card" className="w-10 h-10" />}
            </div>
            {method.id === "PSE" && <img src={pse} alt="card" className="w-10 h-10" />}
            {method.id === "BANCOLOMBIA_TRANSFER" && <img src={ban} alt="card" className="w-10 h-10" />}
          </div>
          <span className={`
            text-center font-semibold text-sm
            ${selectedMethod === method.id 
              ? method.textColor 
              : 'text-gray-600'}
            group-hover:text-opacity-100
          `}>
            {method.label}
          </span>
        </button>
      ))}
    </div>

{/* 
      <div className="flex justify-around w-full mb-4 space-x-4">
        <button
          onClick={() => onMethodChange("CARD")}
          className={`flex flex-col items-center justify-center w-full max-w-[120px] p-4 rounded-xl transition-all duration-300 ease-in-out border-2 hover:shadow-lg ${
            selectedMethod === "CARD" ? "border-pink-600 bg-gray-100 text-pink-600 border-opacity-100" : "border-gray-200 border-opacity-50 bg-white"
          }group`}
        >
          <div className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <img src={visa} alt="card" className="w-10 h-10" />
          <img src={mastercard} alt="card" className="w-10 h-10" /></div>
          <span className="text-gray-600 font-medium">Tarjeta de crédito <br /> o débito</span>
        </button>
        <button
          onClick={() => onMethodChange("PSE")}
          className={`flex flex-col items-center justify-center w-18 h-18 px-4 rounded-lg ${
            selectedMethod === "PSE" ? "border-blue-600 bg-blue-100" : "border-gray-300"
          }`}
        >
          <img src={pse} alt="pse" className="w-10 h-10" />
          <span className="text-blue-600 font-medium">PSE</span>
        </button>
        <button
          onClick={() => onMethodChange("BANCOLOMBIA_TRANSFER")}
          className={`flex flex-col items-center justify-center w-32 h-32 px-4 rounded-lg ${
            selectedMethod === "BANCOLOMBIA_TRANSFER"
              ? "border-yellow-600 bg-yellow-100"
              : "border-gray-300"
          }`}
        >
          <img src={ban} alt="ban" className="w-10 h-10" />
          <span className="text-yellow-600 font-medium">Bancolombia</span>
        </button> */}
        {/* <button
          onClick={() => onMethodChange("NEQUI")}
          className={`flex flex-col items-center justify-center w-18 h-18 px-4 rounded-lg ${
            selectedMethod === "NEQUI" ? "border-fuchsia-600 bg-fuchsia-100" : "border-gray-300"
          }`}
        >
          <img src={nequi} alt="nequi" className="w-10 h-10" />
          <span className="text-fuchsia-600 font-medium">Nequi</span>
        </button> */}
      {/* </div> */}

      <div className="flex-grow p-4 rounded-lg overflow-y-auto" style={{ minHeight: "250px" }}>
        {selectedMethod === "CARD" && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold mb-4">Pago con Tarjeta</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block font-medium mb-2">
                  Número de Tarjeta sin espacios
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="XXXXXXXXXXXXXXXX"
                  className="w-full p-2 border border-gray-300 rounded"

                  onChange={(e) => handleInputChange("number", e.target.value)}
                />
              </div>

              <div>
              <label htmlFor="cardName" className="block font-medium mb-2">
                Nombre de la Tarjeta
              </label>
              <input
                type="text"
                id="cardName"
                placeholder=""
                className="w-full p-2 border border-gray-300 rounded"

                onChange={(e) => handleInputChange("cardHolder", e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-between">
              <div>
                <label htmlFor="month" className="block font-medium mb-2">
                  Fecha de Expiración
                </label>
                <select
                  id="month"
                  className="p-2 border border-gray-300 rounded w-16 mr-2"

                  onChange={(e) => handleInputChange("expMonth", e.target.value)}
                >
                  <option value=""></option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  id="year"
                  className="p-2 border border-gray-300 rounded w-16"

                  onChange={(e) => handleInputChange("expYear", e.target.value)}
                >
                  <option value=""></option>
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    const yearLastTwoDigits = year.toString().slice(-2);
                    return (
                      <option key={i} value={yearLastTwoDigits}>
                        {yearLastTwoDigits}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="installments" className="block font-medium mb-2">
                  Cuotas
                </label>
                <select
                  id="installments"
                  className="p-2 border border-gray-300 rounded w-20"
                  onChange={(e) => handleInputChange("installments", e.target.value)}
                >
                  <option value=""></option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cvc" className="block font-medium mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="XXX"
                  className="w-20 p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("cvc", e.target.value)}
                />
              </div>
              </div>
              {/* Otros campos de tarjeta */}
            </form>
          </div>
        )}

        {selectedMethod === "PSE" && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold mb-4">Pago con PSE</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="person" className="block font-medium mb-2">
                  Tipo de persona
                </label>
                <select
                  id="person"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                >
                  <option value="" disabled selected>
                    Seleccione tipo de persona
                  </option>
                  <option value="0">Natural</option>
                  <option value="1">Jurídica</option>
                </select>
              </div>
              <div>
              <label htmlFor="bank" className="block font-medium mb-2">
                Lista de Bancos
              </label>
              <select
                id="bank"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleInputChange("financialInstitutionCode", e.target.value)}
              >
                <option value="" disabled selected>Seleccione el banco</option>
                {bankPse.map((bank) => (
                  <option key={bank.financial_institution_code} value={bank.financial_institution_code}>
                    {bank.financial_institution_name}
                  </option>
                ))}
              </select>
            </div>
            </form>
          </div>
        )}

        {selectedMethod === "BANCOLOMBIA_TRANSFER" && (
          <div className="animate-fade-in flex flex-col items-center justify-center">
            <h3 className="text-xl text-gray-700 font-bold mb-4 text-center">
              Pagarás con Bancolombia
            </h3>
            <span className="flex items-center justify-center w-16 h-16 border rounded-full shrink-0 transition-all bg-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        )}

        {selectedMethod === "NEQUI" && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold mb-4">Pago con Nequi</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="phoneNumber" className="block font-medium mb-2">
                  Número de Teléfono Asociado a Nequi
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder=""
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
