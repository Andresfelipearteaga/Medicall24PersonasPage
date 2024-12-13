import { useState } from "react";
import card from "../../assets/SVG/card.svg";
import pse from "../../assets/SVG/pse.svg";
import ban from "../../assets/SVG/Ban.svg";
import nequi from "../../assets/SVG/nequi.svg";

const PaymentForm = ({ onFormDataChange }) => {
  const [selectedMethod, setSelectedMethod] = useState("CARD");
  const [formDataPayment, setFormDataPayment] = useState({
    type: selectedMethod
  });

  const handleInputChange = (field, value) => {
    setFormDataPayment((prev) => {
      const updatedData = { ...prev, [field]: value };
      onFormDataChange(updatedData);
      return updatedData;
    });
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setFormDataPayment({
      type: method
    });
    setFormDataPayment({}); // Limpiar los datos al cambiar el método
    onFormDataChange({ type: method,}); // Informar al componente padre del cambio
  };

  const renderForm = () => {
    switch (selectedMethod) {
      case "CARD":
        return (
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
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cvv" className="block font-medium mb-2">
                    CVV
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
            </form>
          </div>
        );
      case "PSE":
        return (
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
                  onChange={(e) => handleInputChange("personType", e.target.value)}
                >
                  <option value="natural">Natural</option>
                  <option value="juridica">Jurídica</option>
                </select>
              </div>
              <div>
                <label htmlFor="bank" className="block font-medium mb-2">
                  Banco
                </label>
                <input
                  type="text"
                  id="bank"
                  placeholder="Nombre del Banco"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("bank", e.target.value)}
                />
              </div>
            </form>
          </div>
        );
      case "BANCOLOMBIA_TRANSFER":
        return (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold mb-4">Pago con Bancolombia</h3>
            {/* <form className="space-y-4">
              <div>
                <label htmlFor="accountType" className="block font-medium mb-2">
                  Tipo de Cuenta
                </label>
                <input
                  type="text"
                  id="accountType"
                  placeholder="Ahorros / Corriente"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("accountType", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="accountNumber" className="block font-medium mb-2">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  placeholder="XXXXXXXXXX"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="idNumber" className="block font-medium mb-2">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  id="idNumber"
                  placeholder="XXXXXXXXX"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                />
              </div>
            </form> */}
          </div>
        );
      case "NEQUI":
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-12 mt-6">
        Selecciona un Método de Pago
      </h2>
      <div className="flex justify-around mb-2">
        <button
          onClick={() => handleMethodChange("CARD")}
          className={`flex flex-col items-center justify-center w-18 h-18 px-4 rounded-lg ${
            selectedMethod === "CARD" ? "border-pink-600 bg-pink-100" : "border-gray-300"
          }`}
        >
          <img src={card} alt="card" className="w-10 h-10" />
          <span className="text-pink-600 font-medium">Tarjeta</span>
        </button>
        <button
          onClick={() => handleMethodChange("PSE")}
          className={`flex flex-col items-center justify-center w-18 h-18 px-4 rounded-lg ${
            selectedMethod === "PSE" ? "border-blue-600 bg-blue-100" : "border-gray-300"
          }`}
        >
          <img src={pse} alt="card" className="w-10 h-10" />
          <span className="text-blue-600 font-medium">PSE</span>
        </button>
        <button
          onClick={() => handleMethodChange("BANCOLOMBIA_TRANSFER")}
          className={`flex flex-col items-center justify-center w-32 h-32 px-4 rounded-lg ${
            selectedMethod === "BANCOLOMBIA_TRANSFER"
              ? "border-yellow-600 bg-yellow-100"
              : "border-gray-300"
          }`}
        >
          <img src={ban} alt="card" className="w-10 h-10" />
          <span className="text-yellow-600 font-medium">Bancolombia</span>
        </button>
        <button
          onClick={() => handleMethodChange("NEQUI")}
          className={`flex flex-col items-center justify-center w-18 h-18 px-4 rounded-lg ${
            selectedMethod === "NEQUI" ? "border-fuchsia-600 bg-fuchsia-100" : "border-gray-300"
          }`}
        >
          <img src={nequi} alt="card" className="w-10 h-10" />
          <span className="text-fuchsia-600 font-medium">Nequi</span>
        </button>
      </div>
      <div className="p-4 border border-gray-300 rounded-lg">{renderForm()}</div>
    </div>
  );
};

export default PaymentForm;
