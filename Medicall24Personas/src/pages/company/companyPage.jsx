import InfoPlan from "../../components/companyPage/InfoPlan";
import GetPlan from "../../components/companyPage/GetPlan";
import ViewIndex from "../../components/companyPage/ViewIndex";
import InfoText from "../../components/companyPage/InfoText";
import ViewSimulatedSection from "../../components/companyPage/ViewSimulatedSection";
import ModalPrice from "../../components/companyPage/ModalGetPlan";
import Header from "../../components/findDoctorPage/Header";

import { useState, useEffect } from "react";

const styles = `
 html {
    scroll-behavior: smooth;
  }


  .animate-slide-in {
    animation: slide-in 1s ease-out;
  }

  .animate-float-left {
    animation: float-left 3s ease-in-out infinite;
  }

  @keyframes float-left {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scrollUp {
    0% {
      transform: translateY(
        100%
      ); /* Empuja el contenido hacia abajo inicialmente */
    }
    100% {
      transform: translateY(0); /* El contenido vuelve a su posición original */
    }
  }

  .bg-simulated {
    

  } `

const CompanyPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // UseEffect para bloquear el scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (isModalOpen) {
      // Bloquea el scroll en el body
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura el scroll del body cuando el modal esté cerrado
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto'; // Asegurarse de restaurar el scroll al desmontar
    };
  }, [isModalOpen]);
    return (
        <main>
            <Header />
        <style>{styles}</style>
         <section
      className="bg-gray-200 py-24 h-full px-24 md:px-4">
      <ViewIndex />
    </section>
    <section className="py-12 px-24 md:px-4">
      <InfoText />
    </section>
    <section id="plan" className="py-12 px-24 md:px-4">
      <InfoPlan />
    </section>
    <section className="py-12 md:px-4">
      <ViewSimulatedSection openModal={openModal}/>
    </section>
    <section className="py-2 px-24 md:px-4">
        <GetPlan />
    </section>
    {isModalOpen && <ModalPrice onClose={closeModal} />}
        </main>
    );
};

export default CompanyPage;