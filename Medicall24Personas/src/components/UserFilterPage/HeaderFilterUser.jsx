import { useState } from 'react'
import ico from '../../assets/SVG/icoLogo.svg'
import menu from '../../assets/SVG/menu.svg'
import DropdownMenu from './DropDownMenuPerson';

function HeaderStart() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  return (
    <nav className="bg-white text-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border-t-2  border-pink-600">
      <div className="container mx-auto flex items-center justify-evenly md:justify-between py-4 px-6">
        {/* Logo */}
        <img src={ico} alt="Logo" className="hidden md:block select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex" />
        {/* Menu Hamburguesa (Mobile) */}
                <button
        className="w-10 h-10 flex justify-center items-center relative hidden md:block"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        {/* Contenedor de íconos */}
        <div className="relative w-12 h-6">
            {/* Ícono de menú */}
            <span
            className={`absolute mt-2 ml-1 transition-all duration-500 ${
                menuOpen ? "opacity-0 scale-0 z-0" : "opacity-100 scale-100 z-10"
            }`}
            >
            <img src={menu} alt="Menu" className="w-auto h-auto" />
            </span>
            {/* Ícono de cerrar */}
            <span
            className={`absolute text-3xl font-bold text-gray-800 transition-all duration-500 ${
                menuOpen ? "opacity-100 scale-100 z-10" : "opacity-0 scale-0 z-0"
            }`}
            >
            ✕
            </span>
        </div>
        </button>

        {/* Opciones del menú (Desktop) */}
        <ul className="md:hidden flex items-center gap-14 text-md font-medium text-gray-600">
          {/* <li><img src={ico.src} alt="Logo" className=" select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex" /></li> */}
          <DropdownMenu />

          <li><a href="https://medicall24.com.co/profesionalesindependientes/" className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold" target='_blank'>Profesionales Independientes</a></li>
          <li><a href="https://medicall24.com.co/instituciones-ips/" className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold" target='_blank'>Instituciones IPS</a></li>
          <li><a href="https://medicall24.com.co/entidades/" className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold" target='_blank'>Entidades de Salud</a></li>
          <li><a href="/empresas" className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold" target='_blank'>Empresas</a></li>
        </ul>
      </div>

      <div
  className={`absolute top-0 mt-16 left-0 w-full bg-white text-black z-50 overflow-hidden transition-all duration-1000 ease-in-out hidden md:block ${
    menuOpen ? "h-full" : "h-0"
  }`}
>
  <ul
    className={`space-y-8 text-2xl font-semibold text-gray-600 ml-10 mt-14 transition-opacity duration-1000 ${
      menuOpen ? "opacity-100" : "opacity-0"
    }`}
  >
    {/* Dropdown para "Personas" */}
    <li className="relative">
      <div
        className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle del dropdown
      >
        Personas
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ml-2 mt-2 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {dropdownOpen && (
        <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg text-lg font-medium w-96">
          <li className="px-4 py-2 hover:bg-gray-100">
            <a
              href="/Consulta-Paciente"
                target='_blank'
              className="block text-gray-600 hover:text-pink-600"
              onClick={() => setMenuOpen(false)}
            >
              ¿Cómo encontrar un médico?
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <a
                target='_blank'
              href="/Examen-Bexa"
              className="block text-gray-600 hover:text-pink-600"
              onClick={() => setMenuOpen(false)}
            >
              Examen BEXA
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <a
              href="#"
              className="block text-gray-600 hover:text-pink-600"
              onClick={() => setMenuOpen(false)}
            >
              Planes de Telemedicina
            </a>
          </li>
        </ul>
      )}
    </li>
    <li>
      <a
        href="https://medicall24.com.co/profesionalesindependientes/"
        className="hover:text-gray-400"
        onClick={() => setMenuOpen(false)}
      >
        Profesionales Independientes
      </a>
    </li>
    <li>
      <a
        href="https://medicall24.com.co/instituciones-ips/"
        className="hover:text-gray-400"
        onClick={() => setMenuOpen(false)}
      >
        Instituciones Ips
      </a>
    </li>
    <li>
      <a
        href="https://medicall24.com.co/entidades/"
        className="hover:text-gray-400"
        onClick={() => setMenuOpen(false)}
      >
        Entidades de Salud
      </a>
    </li>
    <li>
      <a
        href="/empresas"
        className="hover:text-gray-400"
        onClick={() => setMenuOpen(false)}
      >
        Empresas
      </a>
    </li>
  </ul>
</div>
    </nav>
  )
}

export default HeaderStart