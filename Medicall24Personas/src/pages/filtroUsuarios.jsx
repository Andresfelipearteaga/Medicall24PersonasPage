import "../styles/filterUser.css";
import Footer from "../components/common/Footer";
import HeaderStart from "../components/common/HeaderFilterUser";
import PlanesTelemedicina from "../components/user/Filtro/PlanesTelemedicina";
import PlanesEmpresa from "../components/user/Filtro/PlanesEmpresa";
import ServiciosBexa from "../components/user/Filtro/ServiciosBexa";

const FilterUser = () => {
  
  return (
    <main>
    <HeaderStart />
    <section>
      <PlanesTelemedicina />
    </section>
    <section>
      <PlanesEmpresa />
    </section>
    <section>
      <ServiciosBexa />
    </section>
    <Footer />
    </main>
   
  );
};

export default FilterUser;