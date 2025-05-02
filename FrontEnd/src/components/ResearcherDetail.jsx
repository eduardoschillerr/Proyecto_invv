// // src/components/ResearcherDetail.jsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import axios from 'axios';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// const ResearcherDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [researcher, setResearcher] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResearcherData = async () => {
//       try {
//         const response = await axios.get(`/api/investigador-stats/${id}/`);
//         setResearcher(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching researcher data:', error);
//         setError('Error al cargar los datos del investigador');
//         setLoading(false);
//       }
//     };

//     fetchResearcherData();
//   }, [id]);

//   const goBack = () => {
//     navigate('/');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="spinner-border text-primary" role="status">
//           <span className="sr-only">Cargando...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-xl font-semibold text-red-600">{error}</h2>
//         <button 
//           onClick={goBack}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Volver al Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Preparar datos para las gráficas
//   const categoryPoints = [
//     { name: 'Estudiantes', value: researcher.estudiantes.maestria.total + researcher.estudiantes.doctorado.total },
//     { name: 'Líneas', value: researcher.lineas.puntos },
//     { name: 'Proyectos', value: researcher.proyectos.total },
//     { name: 'Artículos', value: researcher.articulos.total },
//     { name: 'Materias', value: researcher.materias.puntos },
//     { name: 'Eventos', value: researcher.eventos.total }
//   ];

//   const estudiantesData = [
//     { name: 'Activos (M)', value: researcher.estudiantes.maestria.activo * 1 },
//     { name: 'Desertores (M)', value: researcher.estudiantes.maestria.desertor * 2 },
//     { name: 'Egresados (M)', value: researcher.estudiantes.maestria.egresado * 3 },
//     { name: 'Titulados (M)', value: researcher.estudiantes.maestria.titulado * 5 },
//     { name: 'Activos (D)', value: researcher.estudiantes.doctorado.activo * 1 },
//     { name: 'Desertores (D)', value: researcher.estudiantes.doctorado.desertor * 3 },
//     { name: 'Egresados (D)', value: researcher.estudiantes.doctorado.egresado * 5 },
//     { name: 'Titulados (D)', value: researcher.estudiantes.doctorado.titulado * 8 }
//   ].filter(item => item.value > 0);

//   const proyectosData = [
//     { name: 'En proceso', value: researcher.proyectos.proceso * 3 },
//     { name: 'Terminados', value: researcher.proyectos.terminado * 7 },
//     { name: 'Instalados', value: researcher.proyectos.instalado * 10 }
//   ].filter(item => item.value > 0);

//   const eventosData = [
//     { name: 'Congresos', value: researcher.eventos.congreso * 3 },
//     { name: 'Talleres', value: researcher.eventos.taller * 1 },
//     { name: 'Conferencias', value: researcher.eventos.conferencia * 5 },
//     { name: 'Diplomados', value: researcher.eventos.diplomado * 3 },
//     { name: 'Charlas', value: researcher.eventos.charla * 1 }
//   ].filter(item => item.value > 0);

//   return (
//     <div className="py-4">
//       <div className="flex justify-between items-center mb-6">
//         <button 
//           onClick={goBack}
//           className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//         >
//           &larr; Volver
//         </button>
//         <h1 className="text-2xl font-bold text-blue-800">Perfil del Investigador</h1>
//         <div></div> {/* Elemento vacío para mantener la flexbox centrada */}
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//         <h2 className="text-xl font-bold mb-4 text-blue-700">{researcher.nombre}</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-3 rounded-md">
//             <h3 className="font-semibold text-blue-800">Área</h3>
//             <p>{researcher.area}</p>
//           </div>
//           <div className="bg-green-50 p-3 rounded-md">
//             <h3 className="font-semibold text-green-800">Total de Puntos</h3>
//             <p className="text-2xl font-bold">{researcher.puntos_totales}</p>
//           </div>
//           <div className="bg-purple-50 p-3 rounded-md">
//             <h3 className="font-semibold text-purple-800">Líneas de Investigación Institucionales</h3>
//             <p>{researcher.lineas.institucionales}</p

export default function ResearcherDetail() {
    return <div>Detalles del Investigador</div>;
  }