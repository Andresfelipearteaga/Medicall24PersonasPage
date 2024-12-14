import { useEffect, useState } from "react";
import axios from "axios";

const StepThree = () => {
  const [detailPayment, setDetailPayment] = useState({});

  const getDetailPayment = async () => {
    const productId = 15;
    const paymentMethod = 'BANCOLOMBIA_TRANSFER';

    if (productId && paymentMethod) {
      try {
        const response = await axios.post(
          "https://medicallapi-test.azurewebsites.net/api/Payments/GetDetailPayment",
          { productId, paymentMethod }
        );
        console.log(response.data);
        setDetailPayment(response.data);
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
      }
    }
  };

  useEffect(() => {
    getDetailPayment();
  }, []);


  return (
    <div className="payment-details rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
    <h2 className="text-xl font-medium text-gray-800">Método de pago</h2>
    <p className="text-base text-gray-600">{detailPayment.paymentMethod}</p>
  
    <div className="flex justify-between items-center text-base text-gray-600">
      <h2>Subtotal</h2>
      <p>{detailPayment.subtotal}</p>
    </div>
  
    <div className="flex justify-between items-center text-base text-gray-600">
      <h2>Iva: </h2>
      <p> { detailPayment.iva}</p>
    </div>
  
    <div className="flex justify-between items-center text-base text-gray-600 font-semibold">
      <h2>Comisión</h2>  <p>{detailPayment.commission}</p>
    </div>
  
    <div className="flex justify-between items-center text-lg font-bold text-green-500">
      <h2>Total</h2>
      <p>{detailPayment.total}</p>
    </div>
  </div>
 
  );
}

export default StepThree;

