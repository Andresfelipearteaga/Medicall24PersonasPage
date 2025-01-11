import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/common/Header";
import MainContent from "../components/user/Persona/ExamenBexa/Main";
import Footer from "../components/common/Footer";


const Index = () => {
  const [codigosxproductos, setCodigosxProductos] = useState([]);
  const [productos, setProductos] = useState([]);

const fetchCodigosXProductos = async () => {
  const url =
    "https://ukvjbkxaqzltngpbrdfi.supabase.co/rest/v1/codigos_x_productos?select=*";

  try {
    const response = await axios.get(url, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API, 
        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH, 
      },
    });

    // Procesa la respuesta
    console.log("Datos:", response.data);
    setCodigosxProductos(response.data);
    
  } catch (error) {
    // Maneja errores
    console.error("Error al obtener los códigos y productos:", error);
    throw error;
  }
};

const getProducts = async () => {
  const urlProducts =
    "https://ukvjbkxaqzltngpbrdfi.supabase.co/rest/v1/producto?select=*";

  try {
    const response = await axios.get(urlProducts, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API, 
        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH, 
      },
    });
    console.log("Datos:", response.data);
    setProductos(response.data);
    
  } catch (error) {
    // Maneja errores
    console.error("Error al obtener los códigos y productos:", error);
    throw error;
  }
};


useEffect(() => {
  fetchCodigosXProductos()
  getProducts()
}, []);



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <MainContent codigosxproductos={codigosxproductos} productos={productos} />
      <Footer /> 
    </div>
  );
};

export default Index;