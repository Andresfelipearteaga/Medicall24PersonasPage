import { TriangleAlert } from "lucide-react";


const ProductCotize = ({
    productName,  
    packageValue,
    discount,
    totalToPay,
    discountValue,
    onCloseTerm,
    openModalTerm,
    productId,
    isValidCode,
}) => {
    console.log(isValidCode, packageValue, discount, totalToPay, discountValue);
  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onCloseTerm}>
    {isValidCode ?
        <div
            className="bg-white w-11/12 max-w-xl rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
        {/* Encabezado */}
            <div className="flex justify-between items-center bg-pink-600 text-white px-6 py-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">{productName}</h2>
            <button
                onClick={onCloseTerm}
                className="text-white hover:text-gray-300 transition-colors duration-200"
            >
                ✕
            </button>
            </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Valor del paquete */}
            <div className="flex justify-between items-center text-lg text-gray-600">
                <span> {productId === 1 ? "Valor del paquete:" : "Valor del servicio:"}</span>
                <span className="text-gray-800 font-semibold">
                ${packageValue.toLocaleString()}
                </span>
            </div>

          {/* Descuento */}
          {discount > 0 
          ?
                <div className="flex justify-between items-center text-lg text-gray-600">
                <span>Descuento del {discount}%:</span>
                <span className="text-gray-800 font-semibold">
                    -${discountValue.toLocaleString()}
                </span>
                </div>
           :
           <div className="flex justify-between items-center text-lg text-gray-600">
           <span>Descuento del {discount}%:</span>
           <span className="text-gray-800 font-semibold">
               ${discountValue.toLocaleString()}
           </span>
           </div>
          }

          {/* Valor total */}
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                <span>Valor a pagar:</span>
                <span className="text-pink-600">
                ${totalToPay.toLocaleString()}
                </span>
            </div>
            </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 px-6 py-4 bg-gray-100 rounded-b-lg">
            <button
                onClick={onCloseTerm}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
            >
                Cerrar
            </button>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200" onClick={openModalTerm}>
                Continuar
            </button>
        </div>
      </div>
     :   <div
     className="bg-white w-11/12 max-w-xl rounded-lg shadow-xl"
     onClick={(e) => e.stopPropagation()}
 >
 {/* Contenido */}
 <div className="p-6">
        <div className="flex flex-col justify-center items-center space-y-6">
            <TriangleAlert className="w-20 h-20 text-pink-600" />
            <p className="text-gray-700 text-lg">
            El código promocional ingresado no es válido.
        </p>
        <div className="flex justify-center">
            <button
                className="bg-pink-600 w-auto text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg mt-2 text-sm"
                onClick={onCloseTerm}
            >
                Cerrar
            </button>
        </div>
        </div>
      
    </div>
    </div>
        }
    </div>
  );
};

export default ProductCotize;
