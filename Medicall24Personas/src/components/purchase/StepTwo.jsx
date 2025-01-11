import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PaymentForm from "./paymentForms";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/slices/formDataSlice";
import { setLocalFormData } from "../../store/slices/dataAddSlice";


const StepTwo = ({ payload, dataPayment, getDepartamentos }) => {

  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [localFormData, setLocalFormDataAdd] = useState({
    address: "",
    phone: "",
    email: "",
    departamento: "",
    municipio: "",

  });
  

  const [departaments, setDepartaments] = useState([]);
  const [municipios, setMunicipios] = useState([]);


    // Sincronizar el estado local con `payload.user` solo cuando cambia
    useEffect(() => {
      if (payload.user) {
        const { email, address, phone } = payload.user;
        setLocalFormDataAdd((prevData) => ({
          ...prevData,
          email: email || "",
          address: address || "",
          phone: phone || "",
        }));
      }
    }, [payload.user]);

  // Cargar departamentos
  const getDepartaments = async () => {
    try {
      const response = await axios.get("https://medicallapi-test.azurewebsites.net/api/Departments/ListDepartments");

      // Limpiar nombres con espacios adicionales
      const cleanedDepartments = response.data.map((dept) => ({
        ...dept,
        nombre: dept.nombre.trim(), // Elimina espacios al inicio y final
      }));

      console.log('Departamentos limpios:', cleanedDepartments);
      setDepartaments(cleanedDepartments);
      getDepartamentos(cleanedDepartments);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
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

    useEffect(() => {
      getDepartaments()
    }, []);


  let fullName = '';
  let fullLastName = '';
  
  if (payload.user) {
    const { name1, name2, lastName1, lastName2 } = payload.user;

    const names = [name1, name2].filter(Boolean).join(' '); 
    const lastNames = [lastName1, lastName2].filter(Boolean).join(' '); 
  
    fullName = names;
    fullLastName = lastNames;
  }
// Manejar cambios en los campos address, phone, departamento y municipio
const handleChange = (e) => {
  const { name, value } = e.target;

  // Validar email si se cambia
  if (name === 'email') validateEmail(value);

  // Si cambia el departamento, cargar municipios y reiniciar municipio
  console.log('aqui', name, value);
  console.log('departamentos', departaments);
  if (name === 'departamento') {
    const departamentoId = departaments.find((d) => {
      console.log(`Comparando: "${d.nombre}" con "${value}"`);
      return d.nombre === value;
    })?.id;    console.log('departamentoId', departamentoId);
    getMunicipios(departamentoId); // Llamar la API para obtener municipios
    setLocalFormDataAdd((prevData) => {
      const updatedData = {
        ...prevData,
        departamento: value, // Actualizar departamento
        municipio: "", // Reiniciar municipio
      };
      console.log('updatedData departamento', updatedData);
      dispatch(setLocalFormData(updatedData));
      return updatedData;
    });
    return; // Salir después de manejar departamento
  }

  // Actualizar localFormData para los demás campos (address, phone, municipio)
  setLocalFormDataAdd((prevData) => {
    const updatedData = {
      ...prevData,
      [name]: value,
    };
    console.log('updatedData general', updatedData);
    dispatch(setLocalFormData(updatedData));
    return updatedData;
  });
};

      // Pasar datos finales al componente padre
      const onFormDataChange = (data) => {
        const updatedData = {
          ...payload.user, // Mantener los datos previos
          ...data, // Combinar con los datos del formulario
        };
        console.log('data', data);
        console.log('updatedata32', updatedData);

        dispatch(setFormData(updatedData)); // Enviar los datos actualizados al padre
      };
          // Validar correo electrónico
          const validateEmail = (value) => {
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
            setFormErrors((prev) => ({ ...prev, email: 'Este campo debe contener un correo electrónico válido.' }));
            } else {
            setFormErrors((prev) => ({ ...prev, email: '' }));
            }
        };




  return (
    <div className="bg-white rounded-lg p-6 w-full grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-6">
    {/* Columna izquierda */}
    <div>
      <form className="space-y-2" autoComplete="off">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-12 mt-6">Datos del comprador</h2>
        {/* Fila 1 */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label
              className="block text-gray-700 font-medium text-sm mb-1"
              htmlFor="typeId"
            >
          Tipo de Identificación
            </label>
            <select
              disabled
              id="typeId"
              name="typeId"
              value={payload.user?.typeId || ""}
              className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
            >
              <option value="">Seleccione</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
  
          <div>
            <label
              className="block text-gray-700 font-medium text-sm mb-1"
              htmlFor="identification"
            >
           Identificación
            </label>
            <input
              disabled
              type="text"
              id="identification"
              name="identification"
              value={payload.user?.identification || ""}
              className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
        </div>
  
        {/* Fila 2 */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="name1"
            >
              Nombres
            </label>
            <input
              disabled
              type="text"
              id="names"
              name="names"
              value={fullName}
              className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
  
          <div>
            <label
              className="block text-sm text-gray-700 font-medium mb-1"
              htmlFor="name2"
            >
              Apellidos
            </label>
            <input
              disabled
              type="text"
              id="lastNames"
              name="name2"
              value={fullLastName}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600 text-sm"
            />
          </div>
        </div>
  
        {/* Fila 3 */}
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="email"
          >
           <span className="text-red-600">*</span> Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={localFormData.email}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md text-sm transition-all disabled:bg-gray-200 disabled:text-gray-600 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-pink-600'}`}
          />
                    <p className="text-xs text-gray-700">A este correo electrónico se le enviará la información de tu compra.</p>
                  <p className={`text-red-500 text-sm mt-1 ${formErrors.email ? 'opacity-100' : 'opacity-0'}`}>Este campo debe contener un correo electrónico válido.</p>
        </div>
  
        {/* Fila 4 */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="address"
            >
              <span className="text-red-600">*</span>  Dirección
            </label>
            <input
              required
              type="text"
              id="address"
              name="address"
              placeholder="Ingresa tu dirección"
              value={localFormData.address}
              onChange={handleChange}
              className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
            />
          </div>
  
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="phone"
            >
              <span className="text-red-600">*</span>  Teléfono
            </label>
            <input
              required
              type="text"
              placeholder="Número de teléfono"
              id="phone"
              name="phone"
              value={localFormData.phone}
              onChange={(e) => {
                // Permitir solo números
                const value = e.target.value.replace(/\D/g, "");
                handleChange({ target: { name: "phone", value } });
              }}
              className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="address"
            >
              <span className="text-red-600">*</span>  Departamento
            </label>
              <select
            required
            id="departamento"
            name="departamento"
            value={localFormData.departamento}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200"
          >
            <option value="">Seleccione</option>
            {departaments.map((departament) => (
              <option key={departament.id} value={departament.name}>
                {departament.nombre}
              </option>
            ))}
          </select>
          </div>
  
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="phone"
            >
              <span className="text-red-600">*</span>  Municipio
            </label>
            <select
          required
          id="municipio"
          name="municipio"
          value={localFormData.municipio}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 text-sm disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
          disabled={!localFormData.departamento} // Deshabilitar hasta seleccionar un departamento
        >
          <option value="">Seleccione</option>
          {municipios.map((municipio) => (
            <option key={municipio.id} value={municipio.name}>
              {municipio.nombre}
            </option>
          ))}
        </select>
            
          </div>
        </div>
      </form>
    </div>
  
    {/* Columna derecha */}
    <div className="flex justify-center items-center w-full bg-gray-50 rounded-xl border-2 border-gray-300">
      <PaymentForm  onFormDataChange={onFormDataChange} />
    </div>
  </div>
 
  );
}

export default StepTwo;



StepTwo.propTypes = {
  onRegisterData: PropTypes.func,
  payload: PropTypes.object,
  status: PropTypes.number,
};
