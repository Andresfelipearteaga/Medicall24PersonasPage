import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentStatus = ({ transactionId }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const excludedFields = [
    'id', 'type', 'mdOrderId', 'reference', 'institutionId', 
    'subtotal', 'iva', 'commission', 'created', 'paymentDate', 
    'paymentRemoteIP', 'institution', 'productsOrder'
  ];

  useEffect(() => {
    // Función para consultar el estado de la transacción
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`https://medicallapi-test.azurewebsites.net/api/Payments/GetStatusOrder/${transactionId}`);
        setPaymentData(response.data);
        setMessage(response.data.message);

        // Verificar si la transacción fue aprobada
        if (response.data.message === 'La transacción ha sido aprobada.') {
          setIsApproved(true);
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    // Iniciar la consulta repetida cada segundo
    const intervalId = setInterval(() => {
      fetchPaymentStatus();
    }, 1000);

    // Limpiar el intervalo una vez que la transacción sea aprobada
    if (isApproved) {
      clearInterval(intervalId);
    }

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalId);

  }, [transactionId, isApproved]); 

  if (loading && !paymentData) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!paymentData) {
    return <div className="text-center">No se pudo obtener la información de la transacción.</div>;
  }

  const { order } = paymentData;

  const filteredOrder = Object.entries(order).filter(
    ([key]) => !excludedFields.includes(key)
  );
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Estado de la Transacción</h1>
        <p className="text-center text-xl font-semibold text-green-600">{message}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <tbody>
            {filteredOrder.map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b font-semibold">{key}</td>
                  <td className="px-4 py-2 border-b">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.location.href = '/'} 
            className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
