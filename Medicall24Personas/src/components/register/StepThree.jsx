import { useEffect, useState } from "react";
import axios from "axios";

const StepThree = ({ paymentMethod }) => {
  const [detailPayment, setDetailPayment] = useState({});
  console.log('paymentMethod', paymentMethod);
  const getDetailPayment = async () => {
    const productId = 15;

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
    <div className="max-w-md mx-auto mt-12 bg-white p-6 border-x border-gray-300">
      {/* Título principal */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Detalles de Compra
      </h1>

      {/* Método de Pago */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition">
        <span className="text-gray-700 font-medium">Método de Pago</span>
        <span className="text-gray-600">
        {detailPayment.paymentMethod === "BANCOLOMBIA_TRANSFER"
          ? "Bancolombia"
          : detailPayment.paymentMethod === "CARD"
          ? "Tarjeta"
          : detailPayment.paymentMethod || "---"}
      </span>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition">
        <span className="text-gray-700 font-medium">Subtotal</span>
        <span className="text-gray-600">{detailPayment.subtotal || "---"}</span>
      </div>

      {/* IVA */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition">
        <span className="text-gray-700 font-medium">IVA</span>
        <span className="text-gray-600">{detailPayment.iva || "---"}</span>
      </div>

      {/* Comisión */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition">
        <span className="text-gray-700 font-medium">Comisión</span>
        <span className="text-gray-600">{detailPayment.commission || "---"}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg mt-4 border border-green-200 hover:bg-green-100 transition">
        <span className="text-green-700 font-semibold text-lg">Total</span>
        <span className="text-green-700 font-bold text-lg">
          {detailPayment.total || "---"}
        </span>
      </div>
    </div>
  );
};

export default StepThree;
