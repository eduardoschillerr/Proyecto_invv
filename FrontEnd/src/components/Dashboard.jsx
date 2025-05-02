import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export const Dashboard = () => {
  const { id } = useParams();
  const [estudiantesData, setEstudiantesData] = useState({ estudiantes: [] });
  const [proyectosData, setProyectosData] = useState({ proyectos: [] });
  const [eventosData, setEventosData] = useState({ eventos: [] });
  const [loading, setLoading] = useState(true);

  const [totales, setTotales] = useState({
    estudiantes: 0,
    proyectos: 0,
    eventos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Solicitud para estudiantes
        const estudiantesResponse = await axios.get(`/api/investigadores/${id}/stats`);
        console.log('Datos de estudiantes recibidos:', estudiantesResponse.data);
        setEstudiantesData(estudiantesResponse.data);

        // Calcular total de puntos de estudiantes
        const totalEstudiantes = estudiantesResponse.data.estudiantes.reduce((acc, item) => acc + item.puntos, 0);

        // Solicitud para proyectos
        const proyectosResponse = await axios.get(`/api/investigadores/${id}/proyecto_stats`);
        console.log('Datos de proyectos recibidos:', proyectosResponse.data);
        setProyectosData(proyectosResponse.data);

        // Calcular total de puntos de proyectos
        const totalProyectos = proyectosResponse.data.proyectos.reduce((acc, item) => acc + item.puntos, 0);

        // Solicitud para eventos
        const eventosResponse = await axios.get(`/api/investigadores/${id}/evento_stats`);
        console.log('Datos de eventos recibidos:', eventosResponse.data);
        setEventosData(eventosResponse.data);

        // Calcular total de puntos de eventos
        const totalEventos = eventosResponse.data.eventos.reduce((acc, item) => acc + item.puntos, 0);

        // Actualizar totales
        setTotales({
          estudiantes: totalEstudiantes,
          proyectos: totalProyectos,
          eventos: totalEventos,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Dashboard del Investigador
      </h1>

      {/* Tabla de Totales */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Totales de Puntos</h2>
        <table className="table-auto w-full text-center border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Estudiantes</th>
              <th className="border border-gray-300 px-4 py-2">Proyectos</th>
              <th className="border border-gray-300 px-4 py-2">Eventos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">{totales.estudiantes}</td>
              <td className="border border-gray-300 px-4 py-2">{totales.proyectos}</td>
              <td className="border border-gray-300 px-4 py-2">{totales.eventos}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Gráfico de Estudiantes */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Estadísticas de Estudiantes</h2>
        {estudiantesData.estudiantes.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={estudiantesData.estudiantes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="puntos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">No hay datos disponibles para los estudiantes.</p>
        )}
      </div>

      {/* Gráfico de Proyectos */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Estadísticas de Proyectos</h2>
        {proyectosData.proyectos.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={proyectosData.proyectos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="puntos" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">No hay datos disponibles para los proyectos.</p>
        )}
      </div>

      {/* Gráfico de Eventos */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Estadísticas de Eventos</h2>
        {eventosData.eventos.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={eventosData.eventos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="puntos" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">No hay datos disponibles para los eventos.</p>
        )}
      </div>
    </div>
  );
};