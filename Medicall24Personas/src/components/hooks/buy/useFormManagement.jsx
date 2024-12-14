import { useState, useEffect } from 'react';
import axios from 'axios';

const useFormManagement = () => {
  // Estados relacionados con contraseñas y errores
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Estado para manejar tipos de identificación
  const [typeIds, setTypeIds] = useState([]);

  // Estado para manejar errores del formulario
  const [formErrors, setFormErrors] = useState({
    identification: '',
    email: '',
  });

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
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
    epsId: 0,
    regimenId: 0,
  });

  // Cargar tipos de identificación
  useEffect(() => {
    const fetchTypeIds = async () => {
      try {
        const response = await axios.get(
          "https://medicallapi-test.azurewebsites.net/api/Users/GetTypeIdentification/paciente"
        );
        setTypeIds(response.data);
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };
    fetchTypeIds();
  }, []);

  // Validar identificación
  const validateIdentification = (value) => {
    if (!/^[0-9]*$/.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        identification: 'La identificación solo debe contener números.',
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, identification: '' }));
    }
  };

  // Validar correo electrónico
  const validateEmail = (value) => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'Este campo debe contener un correo electrónico válido.',
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // Validar contraseñas
  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      setPasswordError(false);
      setErrorMessage('');
    }
  };

  // Manejar cambios en el formulario
  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  // Validar formulario
  useEffect(() => {
    const { name1, lastName1, email, identification, password } = formData.user;
    const allFieldsValid =
      name1 &&
      lastName1 &&
      email &&
      identification &&
      !formErrors.email &&
      !formErrors.identification;
    const passwordsMatch = password === confirmPassword && !passwordError;

    setIsValid(allFieldsValid && passwordsMatch);
  }, [formData, confirmPassword, passwordError, formErrors]);

  return {
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    passwordError,
    isValid,
    typeIds,
    formErrors,
    formData,
    setFormData,
    handleFormChange,
    validateIdentification,
    validateEmail,
    validatePassword,
  };
};

export default useFormManagement;
