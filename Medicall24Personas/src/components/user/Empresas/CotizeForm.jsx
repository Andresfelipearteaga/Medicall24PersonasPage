import { useState } from 'react';

const CotizeForm = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const [nit, setNit] = useState("");
  const [dv, setDv] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");

  const handleNext = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    if (phone && nit && dv && email && social) {
      onNext({ phone, nit, dv, email, social });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const isFormValid = () => {
    return (
      phone.trim() !== "" &&
      nit.trim() !== "" &&
      dv.trim() !== "" &&
      email.trim() !== "" &&
      social.trim() !== ""
    );
  };

  return (
    <div className="flex items-center justify-center py-12 px-6 w-full h-screen">
      <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg shadow-2xl p-8">
        {/* Título del formulario */}
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Ingresa los datos de la Empresa
        </h2>

        {/* Formulario */}
        <form onSubmit={handleNext}>
          {/* Campo NIT y DV */}
          <div className="mb-5">
            <label
              htmlFor="nit"
              className="mb-3 block text-base font-semibold text-gray-600"
            >
              NIT
            </label>
            <div className="flex space-x-2">
              <input
                required
                type="text"
                name="nit"
                value={nit}
                id="nit"
                placeholder="Ingresa el NIT"
                className="w-4/5 rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
                onInput={(e) => setNit(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <input
                required
                type="text"
                value={dv}
                name="verificacion"
                id="verificacion"
                placeholder="DV"
                maxLength={1}
                className="w-1/5 rounded-md border border-gray-300 bg-white py-3 px-3 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600 text-center"
                onInput={(e) => setDv(e.target.value.replace(/[^0-9]/g, ""))}
              />
            </div>
          </div>

          {/* Razón Social */}
          <div className="mb-5">
            <label
              htmlFor="razon-social"
              className="mb-3 block text-base font-semibold text-gray-600"
            >
              Razón Social
            </label>
            <input
              required
              type="text"
              name="razon-social"
              id="razon-social"
              placeholder="Ingresa la Razón Social"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
              onInput={(e) => setSocial(e.target.value)}
            />
          </div>

          {/* Teléfono */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-semibold text-gray-600"
            >
              Teléfono de contacto
            </label>
            <input
              required
              type="text"
              value={phone}
              name="phone"
              id="phone"
              placeholder="Ingresa un número de teléfono"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
              onInput={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-semibold text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Ingresa un correo electrónico"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Botón de envío */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="submit"
              className={`bg-orange-500 text-white font-bold py-2 px-6 border-b-4 border-orange-500 rounded-3xl w-auto ${
                isFormValid()
                  ? "hover:bg-orange-600 hover:scale-110 transition duration-300 hover:border-orange-400 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CotizeForm;
