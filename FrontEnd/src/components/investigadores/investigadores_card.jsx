import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function InvestigadoresCard({ Investigador }) {
  const navigate = useNavigate();
  const [areaNombre, setAreaNombre] = useState('');

  useEffect(() => {
    async function fetchAreaNombre() {
      try {
        // Usa el ID del área para hacer la solicitud
        const response = await axios.get(`http://localhost:8000/api/Areas/${Investigador.area}`);
        setAreaNombre(response.data.nombre); 
      } catch (error) {
        console.error('Error al cargar el nombre del área:', error);
      }
    }

    if (Investigador.area) {
      fetchAreaNombre();
    }
  }, [Investigador.area]);

  return (
    <div
      onClick={() => {
        navigate('/investigadores/' + Investigador.id);
      }}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >  
      {Investigador.imagen && (
      <img
        src={Investigador.imagen}
        
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      )}

      
      <h1 className="text-xl font-bold text-gray-800 mb-2">
        {Investigador.nombre}
      </h1>
      <p className="text-gray-600">{areaNombre || 'Cargando área...'}</p>
      <hr className="mt-4 border-gray-300" />

    </div>
  );
}