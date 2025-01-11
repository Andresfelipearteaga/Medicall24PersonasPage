import { useState } from "react";
// import styles from "../../../styles/AnimateSpinnerInForm.css";
import DotSpinner from "../../modals/Loader";


const CotizeFormTwo = ({ onSubmit, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [users, setUsers] = useState("");
  const [options, setOptions] = useState({
    extraUsers: false,
    lifeInsurance: false,
    accidentInsurance: false,
  });
  const [comments, setComments] = useState("");

  const handleCheckboxChange = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      users: parseInt(users, 10),
      options,
      comments,
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      onSubmit(formData);
      goToBack();
    }, 1000);
  };

  const goToBack = () => {
    setTimeout(() => {
      onBack();
      setTimeout(() => {
        reload();
      }, 1000);
    }, 3000);
  };

  const reload = () => {
    setSent(false);
    setUsers("");
    setOptions({
      extraUsers: false,
      lifeInsurance: false,
      accidentInsurance: false,
    });
    setComments("");
  };

  const isFormValid = () => users.trim() !== "";

  return (

    <div className="flex items-center justify-center py-12 px-6 w-full h-screen">
      <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg shadow-2xl p-8">
        {loading ? (
          // Mostrar Spinner mientras se procesa
          <div className="flex flex-col items-center justify-center h-full">
            <DotSpinner />
          </div>
        ) : sent ? (
          // Mostrar mensaje de enviado
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">¡Solicitud enviada!</h2>
            <p className="text-lg text-gray-500">En las próximas horas estaremos enviando la cotización al correo electrónico ingresado.</p>

          </div>
        ) : (
          // Mostrar formulario
          <>
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Ingresa los detalles del plan
            </h2>
            <form onSubmit={handleFormSubmit}>
              {/* Cantidad de usuarios tomadores */}
              <div className="mb-5">
                <label
                  htmlFor="users"
                  className="mb-3 block text-base font-semibold text-gray-600"
                >
                  Cantidad de usuarios tomadores
                </label>
                <input
                  required
                  type="text"
                  name="users"
                  id="users"
                  placeholder="Ingresa la cantidad de usuarios"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
                  value={users}
                  onInput={(e) =>
                    setUsers(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>

              {/* Opciones */}
              <div className="mb-5">
                <label className="mb-3 block text-base font-semibold text-gray-600">
                  Opciones
                </label>
                <div className="flex flex-col space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="extraUsers"
                      value="3 usuarios adicionales"
                      checked={options.extraUsers}
                      onChange={() => handleCheckboxChange("extraUsers")}
                      className="mr-3"
                    />
                    Incluir 3 usuarios adicionales
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="lifeInsurance"
                      value="Póliza de vida por $2,500"
                      checked={options.lifeInsurance}
                      onChange={() => handleCheckboxChange("lifeInsurance")}
                      className="mr-3"
                    />
                    Incluir una póliza de vida para cada tomador por $2,500
                    mensuales
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="accidentInsurance"
                      value="Póliza de accidentes por $2,000"
                      checked={options.accidentInsurance}
                      onChange={() => handleCheckboxChange("accidentInsurance")}
                      className="mr-3"
                    />
                    Incluir una póliza de accidentes personales para cada tomador
                    por $2,000 mensuales
                  </label>
                </div>
              </div>

              {/* Comentarios */}
              <div className="mb-5">
                <label
                  htmlFor="comments"
                  className="mb-3 block text-base font-semibold text-gray-600"
                >
                  Comentarios
                </label>
                <textarea
                  name="comments"
                  id="comments"
                  placeholder="Escribe tus comentarios aquí"
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder-pink-600"
                  rows="3"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
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
                  Enviar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CotizeFormTwo;
