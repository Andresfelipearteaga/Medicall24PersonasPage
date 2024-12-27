import icoLogo from '../../assets/SVG/icoLogo.svg';
import seguro from '../../assets/seguro.png';
import incluye from '../../assets/incluye2.png';

const GetPlan = () => {

  return (
    <main>
      <span className="container mx-auto flex">
        <p className="text-5xl mb-10 text-gray-700 font-bold md:text-2xl md:text-center">
          Por la compra del plan el tomador podrá adquirir
        </p>
      </span>
      <div className="container mx-auto flex flex-row md:flex-col items-center justify-center gap-8">
        <div className="w-full md:w-2/2 text-left md:text-center">
          <div className="w-auto">
            <p className="font-bold text-pink-700 text-3xl mb-0 sm:text-2xl">
              Póliza de vida
            </p>
            <div className="mb-8">
              <p className="font-semibold text-gray-600 text-lg mb-4 sm:text-lg">
                Por <span className="font-bold">$2,500 COP</span> mensuales
              </p>
              <p className="text-gray-600 text-lg mb-4 sm:text-lg">Amparos:</p>

              {/* Amparo 1 */}
              <div className="flex items-center md:text-left">
                <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
                <p className="text-gray-600 font-semibold text-base">
                  Muerte por cualquier causa
                </p>
              </div>

              {/* Amparo 2 */}
              <div className="flex items-center md:text-left">
                <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
                <p className="text-gray-600 font-semibold text-base">
                  Incapacidad total y permanente por enfermedad o accidente
                </p>
              </div>

              {/* Amparo 3 */}
              <div className="flex items-center md:text-left">
                <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
                <p className="text-gray-600 font-semibold text-base">
                  Enfermedades graves
                </p>
              </div>
              <a href="/Term&Cond" target="_blank">
                <button
                  id="btn-term-2"
                  className="font-bold text-gray-600 text-ls mb-2 mt-2 ml-4 sm:text-ls underline"
                >
                  Ver términos y condiciones
                </button>
              </a>
            </div>

            <p className="font-bold text-pink-700 text-3xl mb-0 sm:text-2xl">
              Póliza de accidentes personales
            </p>
            <p className="font-semibold text-gray-600 text-lg mb-4 sm:text-lg">
              Por <span className="font-bold">$2,000 COP</span> mensuales
            </p>
            <p className="text-gray-600 text-lg mb-4 sm:text-lg">Amparos:</p>

            {/* Amparo 4 */}
            <div className="flex items-center md:text-left">
              <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
              <p className="text-gray-600 font-semibold text-base">
                Muerte accidental
              </p>
            </div>

            {/* Amparo 5 */}
            <div className="flex items-center md:text-left">
              <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
              <p className="text-gray-600 font-semibold text-base">
                Invalidez accidental y/o desmembración
              </p>
            </div>

            {/* Amparo 6 */}
            <div className="flex items-center md:text-left">
              <img src={icoLogo} alt="imagen" className="w-4 h-6 mr-3" />
              <p className="text-gray-600 font-semibold text-base">
                Auxilio funerario
              </p>
            </div>
            <a href="/Term&Cond" target="_blank">
              <button
                id="btn-term-1"
                className="text-gray-600 text-ls mb-2 mt-2 ml-4 sm:text-ls underline"
              >
                Ver términos y condiciones
              </button>
            </a>

            <img
              src={incluye}
              alt="valor poliza"
              className="w-8/12 mt-6 md:w-full"
            />
          </div>
        </div>
        <div className="w-auto md:w-1/2">
          <img
            src={seguro}
            alt="mano"
            className="md:hidden w-96 h-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default GetPlan;
