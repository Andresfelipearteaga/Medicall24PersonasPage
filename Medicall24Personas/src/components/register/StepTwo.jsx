
const StepOne = () => {


  return (
      <div className="bg-white rounded-lg p-6 w-full">
        <form className="space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name1">Correo Electrónico</label>
              <input
                type="text"
                id="name1"
                name="name1"
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
      

          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="typeId">Departamento</label>
              <select
                id="typeId"
                name="typeId"
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              >
                <option value="">Seleccione</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="typeId">Municipio</label>
              <select
                id="typeId"
                name="typeId"
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all mb-8"
              >
                <option value="">Seleccione</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
              </select>
            </div>
          </div>

          {/* Fila 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-gray-200">
          <div>
              <label className="block text-gray-700 font-medium mb-1 mt-4" htmlFor="name2">Contraseña</label>
              <input
                type="text"
                id="name2"
                name="name2"
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 mt-4" htmlFor="lastName1">Confirmar Contraseña</label>
              <input
                type="text"
                id="lastName1"
                name="lastName1"
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
              />
            </div>
          </div>
        </form>
      </div>
 
  );
}

export default StepOne;
