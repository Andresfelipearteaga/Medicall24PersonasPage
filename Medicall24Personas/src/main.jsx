import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/main.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CompraPage from './pages/CompraPage.jsx'
import PruebaPage from './pages/PruebaPage.jsx'
import CountryPage from './pages/filterCountry.jsx'
import BexaPage from './pages/person/bexaPage.jsx';
import FindDoctor from './pages/person/findDoctor.jsx';
import FilterUser from './pages/filterUser.jsx';
import CompanyPage from './pages/company/companyPage.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* pages */}
        <Route path="/Examen-Bexa" element={<BexaPage />} />
        <Route path="/Consulta-Paciente" element={<FindDoctor />} />
        <Route path="/" element={<CountryPage />} />
        <Route path="/inicio" element={<FilterUser />} />
        <Route path="/empresas" element={<CompanyPage />} />
        <Route path="/compra" element={<CompraPage />} />
        <Route path="/prueba" element={<PruebaPage />} />


      </Routes>
    </Router>
  </Provider>,

)
