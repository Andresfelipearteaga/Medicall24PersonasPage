import { useState } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import PaymentForm from "../payments/paymentForms";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/slices/formDataSlice";
import { setLocalFormData } from "../../store/slices/dataAddSlice";


const StepTwo = ({ payload, dataPayment }) => {

  const dispatch = useDispatch();

  const [localFormData, setLocalFormDataAdd] = useState({
    address: "",
    phone: "",
  });

  let fullName = '';
  let fullLastName = '';
  
  if (payload.user) {
    const { name1, name2, lastName1, lastName2 } = payload.user;

    const names = [name1, name2].filter(Boolean).join(' '); 
    const lastNames = [lastName1, lastName2].filter(Boolean).join(' '); 
  
    fullName = names;
    fullLastName = lastNames;
  }

    // Manejar cambios en los campos address y phone
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // Actualizar localFormData para los campos address y phone
      setLocalFormDataAdd((prevData) => {
        const updatedData = {
          ...prevData,
          [name]: value,
        };
        dispatch(setLocalFormData(updatedData));
        return updatedData;

      });
    };

    // Pasar datos finales al componente padre
    const onFormDataChange = (data) => {
      const updatedData = {
        ...payload.user, // Mantener los datos previos
        ...data,   // Combinar con los datos del formulario
              };
              console.log('updatedata32', updatedData);

      dispatch(setFormData(updatedData)); // Enviar los datos actualizados al padre

    };
     

  return (
    <div className="bg-white rounded-lg p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Columna izquierda */}
    <div>
      <form className="space-y-6" autoComplete="off">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-12 mt-6">Datos del comprador</h2>
        {/* Fila 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="typeId"
            >
              <span className="text-red-600">*</span> Tipo de Identificación
            </label>
            <select
              disabled
              id="typeId"
              name="typeId"
              value={payload.user?.typeId || ""}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
            >
              <option value="">Seleccione</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
  
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="identification"
            >
             <span className="text-red-600">*</span> Identificación
            </label>
            <input
              disabled
              type="text"
              id="identification"
              name="identification"
              value={payload.user?.identification || ""}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
        </div>
  
        {/* Fila 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
  
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
        </div>
  
        {/* Fila 3 */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            disabled
            type="email"
            id="email"
            name="email"
            value={payload.user?.email || ""}
            className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
          />
        </div>
  
        {/* Fila 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              required
              type="text"
              id="address"
              name="address"
              value={localFormData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
            />
          </div>
  
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phone"
            >
              Teléfono
            </label>
            <input
              required
              type="text"
              id="phone"
              name="phone"
              value={localFormData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  
    {/* Columna derecha */}
    <div className="flex justify-center items-center">
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
