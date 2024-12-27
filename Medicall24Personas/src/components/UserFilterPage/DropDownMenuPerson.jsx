import { useState } from "react";
import { ChevronDown } from 'lucide-react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="relative group">
      {/* Elemento principal */}
      <a
        href="#"
        className="transform transition duration-200 hover:scale-105 flex hover:text-pink-600 hover:font-semibold text-center"
        onClick={(e) => {
          e.preventDefault(); 
          setIsOpen(!isOpen);
        }}
      >
        Personas <span><ChevronDown className="w-6 h-6" /></span>
      </a>

      {/* Opciones desplegables */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64">
          <li className="hover:bg-pink-100">
            <a
              href="/Consulta-Paciente"
              className="block px-4 py-2 text-gray-700 text-sm hover:text-pink-600"
              target="_blank"
            >
            ¿Cómo encontrar un médico?
            </a>
          </li>
          <li className="hover:bg-pink-100">
            <a
              href="/Examen-Bexa"
              className="block px-4 py-2 text-gray-700 text-sm hover:text-pink-600"
              target="_blank"
            >
            Examen BEXA
            </a>
                    </li>
          <li className="hover:bg-pink-100">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 text-sm hover:text-pink-600"
              target="_blank"
            >
            Planes de Telemedicina
            </a>
          </li>
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
