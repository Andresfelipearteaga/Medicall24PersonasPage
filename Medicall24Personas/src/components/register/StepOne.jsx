import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";



const StepOne = ({ onRegisterData }) => {

  const [confirmPassword, setConfirmPassword] = useState('');
  const [correctMessage, setCorrectMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [typeIds, setTypeIds] = useState([]);
  const [formData, setFormData] = useState({
    identification: "",
    typeId: "",
    password: "",
    name1: "",
    name2: "",
    lastName1: "",
    lastName2: "",
    gender: "",
    birthday: "",
    email: "",
    myProperty: 9999,
    phone: "",
    address: "",
    country: "",
    departmentId: "23",
    municipalityId: 429,
    activityId: 9999,
    civilStatus: "",
    personInCharge: "",
    relationshipPerson: "",
    phonePerson: "",
    avatar: ""
    
  });

    // Cargar tipos de identificación
    useEffect(() => {
        const fetchTypeIds = async () => {
          try {
            const response = await axios.get("https://medicallapi-test.azurewebsites.net/api/Users/GetTypeIdentification/paciente");
            console.log(response.data);
            setTypeIds(response.data);
          } catch (error) {
            console.error("Error al cargar tipos de identificación:", error);
          }
        };
        fetchTypeIds();
      }, []);


      // Manejar cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));


    };

   // Pasar datos al componente padre
   useEffect(() => {
    onRegisterData(formData);
  }, [formData, onRegisterData]);

 


  // Manejar cambios en los campos para Validar si las contraseñas coinciden
  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Verificar inmediatamente si las contraseñas coinciden
      if (confirmPassword && value !== confirmPassword) {
        setPasswordError(true);
        setErrorMessage('Las contraseñas no coinciden.');
    } else if (confirmPassword && value === confirmPassword) {
        setPasswordError(false);
        setErrorMessage('');
        setCorrectMessage('Las contraseñas coinciden.');
      } else {
        setCorrectMessage('');
      }
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value);

      // Validar confirmación de contraseña
      if (value !== formData.password) {
        setPasswordError(true);
        setErrorMessage('Las contraseñas no coinciden.');
        setCorrectMessage('');
      } else {
        setPasswordError(false);
        setErrorMessage('');
        setCorrectMessage('Las contraseñas coinciden.');
      }
    }

  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
      <div className="bg-white rounded-lg p-6 w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="typeId">Tipo de Identificación</label>
              <select
                required
                id="typeId"
                name="typeId"
                value={formData.typeId}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              >
                <option value="">Seleccione</option>
                {typeIds.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.description}
                </option>
              ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="identification">Identificación</label>
              <input
                required
                type="text"
                id="identification"
                name="identification"
                value={formData.identification}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name1">Primer Nombre</label>
              <input
                required
                type="text"
                id="name1"
                name="name1"
                value={formData.name1}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name2">Segundo Nombre</label>
              <input
                type="text"
                id="name2"
                name="name2"
                value={formData.name2}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="lastName1">Primer Apellido</label>
              <input
                type="text"
                required
                id="lastName1"
                name="lastName1"
                value={formData.lastName1}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="lastName2">Segundo Apellido</label>
              <input
                type="text"
                id="lastName2"
                name="lastName2"
                value={formData.lastName2}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
          </div>

          {/* Fila 3 */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name1">Correo Electrónico</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
          </div>

         {/* Fila 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name2">Contraseña</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChangePassword}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="lastName1">Confirmar Contraseña</label>
              <input
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChangePassword}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md transition-all ${
                    passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-pink-600'
                  }`}
              />
                      {passwordError && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
                        {correctMessage && (
          <p className="text-green-600 text-sm mt-1">{correctMessage}</p>
        )}
            </div>
          </div>    

          <input type="submit" value="Registrar" />
        </form>
      </div>
 
  );
}

export default StepOne;



StepOne.propTypes = {
  onRegisterData: PropTypes.func,
};
