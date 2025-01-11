import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

const TermsModal = ({
  isOpenTerm,
  onCloseTerm,
  dataPayment,
  departamentos,
  aliados,
}) => {
  const [loading, setLoading] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [aliadosModal, setAliadosModal] = useState([]);
  const [selectedAliado, setSelectedAliado] = useState({
    departamento: "",
    municipio: "",
    aliado: "",
  });

  useEffect(() => {
    if (aliados.length > 0 && aliados[0].id_gestor !== null) {
      setSelectedAliado({
        departamento: "Córdoba", // Aquí ajusta el campo correspondiente
        municipio: "Montería", // Asegúrate de usar los nombres correctos
        aliado: aliados[0].nombre_prestador || "",
      });
    }
  }, [aliados]);

  const handleNext = () => {
    dataPayment();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Función para manejar cambios en el select de municipios
  const handleChangeMunicipio = (e) => {
    const municipioSeleccionado = e.target.value;

    // Actualizar el estado del municipio seleccionado
    setSelectedAliado((prevState) => ({
      ...prevState,
      municipio: municipioSeleccionado,
      aliado: "", // Limpiar aliado al cambiar de municipio
    }));

    console.log("Municipio seleccionado:", municipioSeleccionado);

    if (!municipioSeleccionado || municipioSeleccionado === "Seleccione") {
      setAliadosModal([]); // Limpiar aliados si no hay municipio válido seleccionado
    } else {
      // Filtrar aliados por municipio
      const aliadosFiltrados = aliados.filter(
        (aliado) => aliado.municipio === municipioSeleccionado
      );
      setAliadosModal(aliadosFiltrados);
    }
  };

  // Función para manejar cambios en el select de aliados
  const handleChangeAliado = (e) => {
    const aliadoSeleccionado = e.target.value;

    // Actualizar el estado del aliado seleccionado
    setSelectedAliado((prevState) => ({
      ...prevState,
      aliado: aliadoSeleccionado,
    }));

    console.log("Aliado seleccionado:", aliadoSeleccionado);
  };

  // Cargar municipios basados en el departamento seleccionado
  const getMunicipios = async (departamentoId) => {
    try {
      const response = await axios.get(
        `https://medicallapi-test.azurewebsites.net/api/Departments/ListMunicipalties/${departamentoId}`
      );
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error al cargar municipios:", error);
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;

    // Actualizar el estado del departamento seleccionado
    setSelectedAliado((prevState) => ({
      ...prevState,
      departamento: value,
      municipio: "", // Limpiar municipio al cambiar de departamento
      aliado: "", // Limpiar aliado al cambiar de departamento
    }));
    console.log("value", value);
    if (!value) {
      setMunicipios([]);
    } else {
      const departamentoId = departamentos.find((d) => {
        return d.nombre === value;
      })?.id;
      if (departamentoId) {
        await getMunicipios(departamentoId);
      }
    }
  };

  const validate =
    selectedAliado.departamento &&
    selectedAliado.municipio &&
    selectedAliado.aliado;

  if (!isOpenTerm) return null;

  return (
    <div className="flex items-center justify-center h-auto">
      {/* Modal */}
      {isOpenTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg text-center">
              ¡Ya casi terminas!
            </div>

            {/* Contenido */}
            <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
              <p>
                Recuerda que los servicios de salud del paquete de tamizaje para
                detectar Cáncer de Mama serán prestados en las siguientes
                ciudades de Colombia:
              </p>

              {aliados[0].id_gestor == !null ? (
                <div className="flex flex-row justify-center space-x-4 w-full">
                  <div className="w-1/3">
                    <label htmlFor="Departamento" className="text-sm">
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={selectedAliado.departamento}
                      disabled
                      className="px-2 text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-base"
                    />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="Municipio" className="text-sm">
                      Municipio
                    </label>
                    <input
                      type="text"
                      value={selectedAliado.municipio}
                      disabled
                      className="px-2 text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-base"
                    />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="Aliado" className="text-sm">
                      Aliado comercial
                    </label>
                    <input
                      type="text"
                      value={selectedAliado.aliado}
                      disabled
                      className="px-2 text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-base"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-center space-x-4 w-full">
                  <div className="w-1/3">
                    <label htmlFor="Departamento" className="text-sm">
                      Departamento
                    </label>
                    <select
                      name="departamento"
                      id="departamento"
                      className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                      onChange={handleChange}
                    >
                      <option value="">Seleccione</option>
                      {departamentos.map((departament) => (
                        <option key={departament.id} value={departament.name}>
                          {departament.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="Departamento" className="text-sm">
                      Municipio
                    </label>
                    <select
                      name="municipio"
                      id="municipio"
                      className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                      disabled={!municipios.length}
                      onChange={handleChangeMunicipio}
                    >
                      <option value="">Seleccione</option>
                      {municipios.map((municipio) => (
                        <option key={municipio.id} value={municipio.name}>
                          {municipio.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="Departamento" className="text-sm">
                      Aliado comercial
                    </label>

                    <select
                      name="ciudad"
                      id="ciudad"
                      className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                      disabled={!municipios.length}
                      onChange={handleChangeAliado}
                    >
                      <option value="">Seleccione</option>
                      {aliadosModal.map((aliado) => (
                        <option key={aliado.id} value={aliado.name}>
                          {aliado.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <p>
                La dirección exacta donde se prestarán los servicios de salud
                que incluye el paquete de tamizaje para detectar Cáncer de Mama,
                será enviada en la confirmación de la cita, una vez el usuario
                realice los pasos de solicitud de cita que se enviarán al correo
                electrónico que se ingresó para realizar el pago.
              </p>
              <p>Para continuar con el pago presiona el botón continuar.</p>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-between space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={onCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <button
                // disabled={!accept}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                onClick={handleNext}
                disabled={!validate}
              >
                {loading ? <Loader /> : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsModal;
