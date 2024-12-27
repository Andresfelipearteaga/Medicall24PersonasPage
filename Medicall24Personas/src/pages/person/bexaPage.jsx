
import Header from "../../components/findDoctorPage/Header";
import MainContent from "../../components/findDoctorPage/Main";
import Footer from "../../components/findDoctorPage/Footer";


const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <MainContent />
      <Footer /> 
    </div>
  );
};

export default Index;