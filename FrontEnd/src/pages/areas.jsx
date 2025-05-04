import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Areas() {
  const [areas, setAreas] = useState([]); // Estado para almacenar las áreas
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await axios.get("http://localhost:8000/api/Areas/"); // Endpoint para áreas
        setAreas(response.data); // Guardar las áreas en el estado
      } catch (error) {
        console.error("Error al cargar las áreas:", error);
      }
    }
    fetchAreas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Página de Áreas</h1>
      <div>
        <ul className="space-y-4">
          {areas.map((area) => ( 
            <li
              onClick={() => {
                navigate("/areaFormPage/" + area.id); 
              }}
              key={area.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800">{area.nombre}</h2>
            </li>
          ))}
        </ul>
        


        <div className="mt-4">
          <Link
            to="/areaFormPage"
            className="text-white-800"
          >
            Añadir Nueva Área
          </Link>
        </div>
      </div>
    </div>
  );
}