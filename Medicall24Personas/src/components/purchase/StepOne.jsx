import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import visibilityOff from "../../assets/SVG/visibility_off.svg";
import visibility from "../../assets/SVG/visibility.svg";
// import usePreventUnload from "../../hooks/usePreventUnload";

const StepOne = ({ onRegisterData, modalOpen, next, onSuccessfulRegistration, registered, showPasswordisUserRegistered }) => {
    // const [isDirty, setIsDirty] = usePreventUnload();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [typeIds, setTypeIds] = useState([]);
  const [formErrors, setFormErrors] = useState({
    identification: '',
    email: '',
  });  const [formData, setFormData] = useState({
    user: {
        identification: '',
        typeId: '',
        name1: '',
        name2: '',
        lastName1: '',
        lastName2: '',
        email: '',
        password: '',
      },
      epsId: null, 
      regimenId: null,
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


      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };

      // Validar identificación
    const validateIdentification = (value) => {
        if (!/^[0-9]*$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, identification: 'La identificación solo debe contener números.' }));
        } else {
        setFormErrors((prev) => ({ ...prev, identification: '' }));
        }
    };

      // Validar correo electrónico
    const validateEmail = (value) => {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, email: 'Este campo debe contener un correo electrónico válido.' }));
        } else {
        setFormErrors((prev) => ({ ...prev, email: '' }));
        }
    };

      // Manejar cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'identification') validateIdentification(value);
    if (name === 'email') validateEmail(value);

    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
      
    }));
    };

    const checkUserRegistration = async () => {
        const { typeId, identification } = formData.user;
    
        if (typeId && identification) {
          try {
            const response = await axios.post(
              "https://medicallapi-test.azurewebsites.net/api/Users/GetUser",
              { identification, typeId }
            );
            const DataUser = response.data.user;
            console.log(DataUser);
            if (DataUser) {
              setFormData((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    id: DataUser.id,
                    identification: DataUser.identification,
                    typeId: DataUser.typeId,
                    name1: DataUser.name1,
                    name2: DataUser.name2,
                    lastName1: DataUser.lastname1,
                    lastName2: DataUser.lastname2,
                    email: DataUser.email,
                    password: DataUser.password,
                },
            }));

            console.log("modal", true);
            setIsUserRegistered(true)
            registered()
            modalOpen(true);
            } else {
            setIsUserRegistered(false)
            modalOpen(false);            }
          } catch (error) {
            console.error("Error al verificar el usuario:", error);
          }
        }
      };



   // Pasar datos al componente padre
   useEffect(() => {
    onRegisterData(formData);
  }, [formData]);


  useEffect(() => {
    const { name1, lastName1, email, identification, password, typeId } = formData.user;
    const allFieldsValid = name1 && lastName1 && email && identification && typeId && password && !formErrors.email && !formErrors.identification;
    const passwordsMatch = password === confirmPassword && !passwordError;

    setIsValid(allFieldsValid && passwordsMatch);

}, [formData, confirmPassword, passwordError, formErrors]);

 useEffect(() => {
    next(isValid);
  }, [isValid, next]);
 
  useEffect(() => {
    setIsUserRegistered(onSuccessfulRegistration)
  }, [onSuccessfulRegistration])

  // Manejar cambios en los campos para Validar si las contraseñas coinciden
// Manejar cambios en los campos para Validar si las contraseñas coinciden
const handleChangePassword = (e) => {
    const { name, value } = e.target;
  
    if (name === 'password') {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value
        }
      }));
  
      // Verificar inmediatamente si las contraseñas coinciden
      if (confirmPassword && value !== confirmPassword) {
        setPasswordError(true);
        setErrorMessage('Las contraseñas no coinciden.');
      } else if (confirmPassword && value === confirmPassword) {
        setPasswordError(false);
        setErrorMessage('');
      }
    }
  
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
  
      // Validar confirmación de contraseña
      if (value !== formData.user.password) {
        setPasswordError(true);
        setErrorMessage('Las contraseñas no coinciden.');
      } else {
        setPasswordError(false);
        setErrorMessage('');
      }
    }
  };


  return (
      <div className="bg-white rounded-lg p-6 w-full">
       <form className="space-y-4" autoComplete="off">
  {/* Fila 1 */}
  <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
    <div>
      <label className="block text-gray-700 font-medium text-sm mb-1" htmlFor="typeId">
        Tipo de Identificación
      </label>
      <select
        required
        id="typeId"
        name="typeId"
        value={formData.user.typeId || ""}
        disabled={isUserRegistered}
        onChange={handleChange}
        onBlur={checkUserRegistration}
        className="w-full px-3 py-1.5 text-sm border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
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
      <label className="block text-gray-700 font-medium text-sm mb-1" htmlFor="identification">
        <span className="text-red-600">*</span> Identificación
      </label>
      <input
        required
        type="text"
        id="identification"
        name="identification"
        value={formData.user.identification || ""}
        disabled={isUserRegistered}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          handleChange({ target: { name: "identification", value } });
        }}
        onBlur={checkUserRegistration}
        className={`w-full px-3 py-1.5 text-sm border-2 disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md transition-all ${
          formErrors.identification ? "border-red-500 focus:ring-red-500" : "focus:ring-pink-600"
        }`}
      />
      {formErrors.identification && (
        <p className="text-red-500 text-xs mt-1">{formErrors.identification}</p>
      )}
    </div>
  </div>

  {/* Fila 2 */}
  <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
  <div>
              <label className="block text-gray-700 text-sm  font-medium mb-1" htmlFor="name1"><span className="text-red-600">*</span> Primer Nombre</label>
              <input
                required
                type="text"
                id="name1"
                name="name1"
                value={formData.user.name1 || ""}
                disabled={isUserRegistered} 
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name2">Segundo Nombre</label>
              <input
                type="text"
                id="name2"
                name="name2"
                value={formData.user.name2 || ""}
                disabled={isUserRegistered} 
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastName1"><span className="text-red-600">*</span> Primer Apellido</label>
              <input
                type="text"
                required
                id="lastName1"
                name="lastName1"
                value={formData.user.lastName1 || ""}
                disabled={isUserRegistered} 
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastName2">Segundo Apellido</label>
              <input
                type="text"
                id="lastName2"
                name="lastName2"
                value={formData.user.lastName2 || ""}
                disabled={isUserRegistered} 
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
  </div>

  {/* Fila 3 */}
  <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
    <div>
      <label className="block text-gray-700 font-medium text-sm mb-1" htmlFor="email">
        <span className="text-red-600">*</span> Correo Electrónico
      </label>
      <input
        required
        type="email"
        id="email"
        name="email"
        value={formData.user.email || ""}
        disabled={isUserRegistered}
        onChange={handleChange}
        className={`w-full px-3 text-sm py-1.5 border-2 disabled:bg-gray-200 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md transition-all ${
          formErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-pink-600"
        }`}
      />
      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
    </div>
  </div>

  {/* Fila 4 */}
  {showPasswordisUserRegistered && (
       <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
       <div>
         <label className="block text-gray-700  text-sm font-medium mb-1" htmlFor="name2"><span className="text-red-600">*</span> Contraseña</label>
         <div className="flex items-center space-x-2">
         <input
           required
           type={showPassword ? "text" : "password"}
           id="password"
           name="password"
           value={formData.user.password || ""}
           disabled={isUserRegistered} 
           onChange={handleChangePassword}
           className="w-full px-4  text-sm py-2 border-2 disabled:bg-gray-200 disabled:text-gray-600  rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
         />
         <button type="button" onClick={togglePasswordVisibility} className="text-gray-600 hover:text-gray-800 focus:outline-none">
           {showPassword ? (
             <img src={visibility} alt="show password" className="w-5 h-5" />
           ) : (
             <img src={visibilityOff} alt="hide password" className="w-5 h-5" />
           )}
         </button>
         </div>
       </div>
       <div>
         <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="lastName1"><span className="text-red-600">*</span> Confirmar Contraseña</label>
         <div className="flex items-center space-x-2">
         <input
          required
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangePassword}
          disabled={isUserRegistered} 
          className={`w-full text-sm px-4 py-2 border-2 disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md transition-all ${passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-pink-600'}`}
        />

         <button type="button" onClick={toggleConfirmPasswordVisibility} className="text-gray-600 hover:text-gray-800 focus:outline-none">
           {showConfirmPassword ? (
             <img src={visibility} alt="show password" className="w-5 h-5" />
           ) : (
             <img src={visibilityOff} alt="hide password" className="w-5 h-5" />
           )}
         </button>
         </div>

                 {passwordError && (
     <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
   )}
       </div>
     </div> 
  )}
</form>

        <p className="mt-5"><span className="text-red-600" >*</span>Campos obligatorios</p>
      </div>
 
  );
}

export default StepOne;



StepOne.propTypes = {
  onRegisterData: PropTypes.func,
  status: PropTypes.number,
  modalOpen: PropTypes.func,
  next: PropTypes.func,
};
