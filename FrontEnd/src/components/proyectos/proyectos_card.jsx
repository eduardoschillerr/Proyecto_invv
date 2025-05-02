import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function ProyectosCard({ Proyecto }) {
  const navigate = useNavigate();
  const [areaNombre, setAreaNombre] = useState('');

  useEffect(() => {
    async function fetchAreaNombre() {
      try {
        const response = await axios.get(`http://localhost:8000/api/Areas/${Proyecto.Area.nombre}`);
        setAreaNombre(response.data.nombre); 
      } catch (error) {
        console.error('Error al cargar el nombre del área:', error);
      }
    }

    if (Proyecto.area) {
      fetchAreaNombre();
    }
  }, [Proyecto.area]);

  return (
    <li
      onClick={() => {
        navigate('/Proyecto/' + Proyecto.id);
      }}
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {Proyecto.nombre}
      </h2>
      <p className="text-gray-600 mb-2">
        <strong>Área:</strong> {Proyecto.area_nombre || 'Cargando área...'}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Descripción:</strong> {Proyecto.descripcion || 'Sin descripción'}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Estado</strong> {Proyecto.esatus || 'No disponible'}
      </p>

    </li>
  );
}