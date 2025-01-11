
const tableData = [
  { users: "1.000", planValue: "$29.992", discount: "0%", monthly: "$29.991.865", yearly: "$359.902.375" },
  { users: "1.500", planValue: "$29.992", discount: "0%", monthly: "$44.987.797", yearly: "$539.853.562" },
  { users: "2.000", planValue: "$29.992", discount: "0%", monthly: "$59.983.729", yearly: "$719.804.750" },
  { users: "3.000", planValue: "$28.795", discount: "4%", monthly: "$86.385.416", yearly: "$1.036.624.990" },
  { users: "4.000", planValue: "$27.646", discount: "8%", monthly: "$110.584.656", yearly: "$1.327.015.873" },
  { users: "6.000", planValue: "$26.543", discount: "11%", monthly: "$159.258.213", yearly: "$1.911.098.554" },
  { users: "8.000", planValue: "$25.484", discount: "15%", monthly: "$203.871.389", yearly: "$2.446.456.666" },
  { users: "12.000", planValue: "$24.467", discount: "18%", monthly: "$293.604.865", yearly: "$3.523.258.381" },
  { users: "16.000", planValue: "$23.491", discount: "22%", monthly: "$375.852.715", yearly: "$4.510.232.576" },
  { users: "24.000", planValue: "$22.553", discount: "25%", monthly: "$541.283.336", yearly: "$6.495.400.038" },
  { users: "32.000", planValue: "$21.654", discount: "28%", monthly: "$692.913.625", yearly: "$8.314.963.501" },
  { users: "48.000", planValue: "$20.790", discount: "31%", monthly: "$997.897.805", yearly: "$11.974.773.658" },
  { users: "64.000", planValue: "$19.960", discount: "33%", monthly: "$1.277.440.000", yearly: "$15.329.280.000" },
];


const InteractiveTable = () => {
  return (
    <div className="container mx-auto px-2 py-1">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-pink-600 to-pink-800 text-white">
              <tr>
                {['Tope de Usuarios', 'Valor por Tomador', 'Descuento', 'Valor mensual del plan', 'Valor anual del plan'].map((header, idx) => (
                  <th 
                    key={idx} 
                    className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-b border-pink-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`
                    transition duration-300 ease-in-out 
                    hover:bg-pink-50 text-center text-xs
                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  `}
                >
                  {[row.users, row.planValue, row.discount, row.monthly, row.yearly].map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="px-2 py-2 text-sm border-b border-gray-200"
                    >
                      <span className="text-gray-800 font-medium text-sm text-center">{cell}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTable;
