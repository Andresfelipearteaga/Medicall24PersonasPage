import "../styles/filterUser.css";
import HeaderStart from "../components/UserFilterPage/HeaderFilterUser";

const FilterUser = () => {
    const styles = `
  html {
    overflow: hidden;
  }`;
  
  return (
    <>
      <style>{styles}</style>
    <HeaderStart />
     <main className="flex items-start justify-center min-h-screen" style={{backgroundImage: "url('https://medicall24.com.co/wp-content/uploads/2024/11/k1-scaled-1.jpg')", backgroundSize: "cover", backgroundPositionY: "130%", overflow: "hidden"}}>

<div className="flex flex-col items-center mt-5">
  <div>
    <img
      src="https://medicall24.com.co/wp-content/uploads/2024/11/Logom.png"
      className="w-48 h-auto"
      alt=""
      style={{pointerEvents: "none", userSelect: "none"}}
    />
  </div>
  <div>
    <img
      src="https://medicall24.com.co/wp-content/uploads/2024/11/Logom1.png"
      className="mt-5 w-80 h-auto"
      alt=""
      style={{pointerEvents: "none", userSelect: "none"}}
    />
  </div>
  <div>
  </div>
</div>
</main>
    </>
   
  );
};

export default FilterUser;