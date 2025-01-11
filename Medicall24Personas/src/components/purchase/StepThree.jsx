import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import axios from "axios";

const StepThree = ({ paymentMethod, productInfo, productWithDiscount, infoPayment }) => {
  const [detailPayment, setDetailPayment] = useState({});
  console.log('productWithDiscount', productWithDiscount);
  const getDetailPayment = async () => {

    if (productInfo && paymentMethod) {
        console.log('paymentMethod', paymentMethod);
        console.log('productId', productInfo.id_producto);
        const productId = productInfo.id_producto;
      try {
        const response = await axios.post(
          "https://medicallapi-test.azurewebsites.net/api/Payments/GetDetailPayment",
          { productId, paymentMethod }
        );
        console.log(response.data);
        setDetailPayment(response.data);
        infoPayment(response.data);
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
      }
    }
  };

  useEffect(() => {
    getDetailPayment();
  }, []);


    // Formateador de números con separadores de miles
    const formatNumber = (number) =>
      new Intl.NumberFormat("es-US").format(number || 0);
  
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 border rounded-lg border-gray-300">
      {/* Título principal */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Detalles de la compra
      </h1>

      <div className="flex sm:text-sm justify-center items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition">
        <span className="text-gray-600">
        {productInfo.nombre}
      </span>
      </div>

      {/* Método de Pago */}
      <div className="flex sm:text-sm justify-between items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition">
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
        <span className="text-gray-700 font-medium">Sub total</span>
        ${detailPayment.subtotal ? formatNumber(detailPayment.subtotal) : "0"} COP
        </div>

      {/* IVA */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition">
        <span className="text-gray-700 font-medium">IVA</span>
        <span className="text-gray-600">{detailPayment.iva || "0"}</span>
      </div>

      {/* Comisión */}
      <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Comisión de la transacción</span>
          <div className="relative group">
            <Info className="w-5 h-5 sm:mr-24 text-gray-500 hover:text-pink-600 cursor-pointer" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 sm:-translate-y-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white sm:text-xs p-2 rounded-lg shadow-md w-80 sm:w-60">
            Corresponde al valor que la entidad bancaria le cobra al usuario por el uso del método de pago seleccionado.
            </div>
          </div>
        </div>
        <span className="text-gray-700 font-medium">
          {detailPayment.commission
            ? formatNumber(detailPayment.commission)
            : "0"}{" "}
          COP
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg mt-4 border border-green-200 hover:bg-green-100 transition">
        <span className="text-green-700 font-semibold text-lg">Total</span>
        <span className="text-green-700 font-bold text-lg">
       ${detailPayment.total ? formatNumber(detailPayment.total) : "0"} COP
        </span>
      </div>
    </div>
  );
};

export default StepThree;
