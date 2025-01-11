import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/main.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Compra from './pages/comprarProducto.jsx'
// import PruebaPage from './pages/PruebaPage.jsx'
import Home from './pages/Home.jsx'
import Bexa from './pages/bexa.jsx';
import FindDoctor from './pages/econtrarMedico.jsx';
import FilterUser from './pages/filtroUsuarios.jsx';
import Empresas from './pages/Empresas.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* pages */}
        <Route path="/" element={<Home />} />
        <Route path="/Examen-Bexa" element={<Bexa />} />
        <Route path="/Consulta-Paciente" element={<FindDoctor />} />
        <Route path="/inicio" element={<FilterUser />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/compra" element={<Compra />} />
        {/* <Route path="/prueba" element={<PruebaPage />} /> */}


      </Routes>
    </Router>
  </Provider>,

)
