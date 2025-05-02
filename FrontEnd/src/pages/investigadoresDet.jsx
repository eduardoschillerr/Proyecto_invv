import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function InvestigadoresDet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [investigador, setInvestigador] = useState(null);

    useEffect(() => {
        async function fetchInvestigador() {
            try {
              const response = await axios.get(`http://localhost:8000/api/Investigador/${id}/`);
              setInvestigador(response.data);
            } catch (error) {
                console.error('Error al cargar el investigador:', error);
            }
        }
        fetchInvestigador();
    }, [id]);

    if (!investigador) {
        return <p>Cargando detalles del investigador...</p>;
    }

    return (
        <div> 
            
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-blue900-2xl font-bold">{investigador.nombre}</h1>
                <h1 className="font-bold mb-4 text-blue-500 border-b border-blue-500">Informacion General</h1> 
                <br />

            
                <p><strong>Email:</strong> {investigador.email}</p>
                <p><strong>Teléfono:</strong> {investigador.tel}</p>
                
                <p><strong>Nivel Educativo:</strong> {investigador.nivel_edu_descripcion}</p>
                <p><strong>Nivel SNII:</strong> {investigador.snii_nivel}</p>
                <p><strong>Área:</strong> {investigador.area_nombre}</p>
            </div>
            
            <div className="p-6 bg-white shadow-md rounded-lg mt-4">
                <p><strong>Estudiantes:</strong></p>
                <ul>
                    {investigador.estudiantes.map(est => (
                        <li key={est.id}>{est.nombre} - {est.carrera}</li>
                    ))}
                </ul>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg mt-4">
                <p><strong>Lineas de investigacion:</strong></p>
                <ul>
                    {investigador.lineas_detalle.map(est => (
                        <li key={est.id}>{est.nombre}</li>
                    ))}
                </ul>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg mt-4">
                <p><strong>Articulos:</strong></p>
                <ul>
                    {investigador.articulos_detalle.map(articulo => (
                        <li key={articulo.id}>
                            {articulo.titulo} - (Publicado el {articulo.fecha_publicacion})
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg mt-4">
                <p><strong>Proyectos:</strong></p>
                <ul>
                    {investigador.proyectos_detalle.map(proyecto => (
                        <li key={proyecto.id}>
                            {proyecto.nombre} - ({proyecto.fecha_inicio} - {proyecto.fecha_fin})
                        </li>
                    ))}
                </ul>
            </div>

            
            
            
            <button 
                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate(`/investigadoresFormPage/${id}`)}
                
            >
                Editar Investigador
            </button>

            <button 
                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate(`/investigadores/`)}
                
            >
                Volver
            </button>
            <button
                onClick={() => navigate(`/dashboard/${investigador.id}`)}
                className="text-indigo-600 hover:text-indigo-900"
                >
                Ver Dashboard
            </button>

        </div>
    );
}
    
    
    