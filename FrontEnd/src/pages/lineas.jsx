import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export function Lineas() {
    const [lineas, setLineas] = useState([]); // Estado para almacenar las líneas
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLineas() {
            try {
                const response = await axios.get("http://localhost:8000/api/LineasInvestigacion/"); // Endpoint para líneas
                setLineas(response.data); // Guardar las líneas en el estado
            } catch (error) {
                console.error("Error al cargar las líneas:", error);
            }
        }
        fetchLineas();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Líneas de Investigación
            </h1>
            <div>
                <ul className="space-y-4">
                    {lineas.map((linea) => ( 
                        <li
                            onClick={() => {
                                navigate('/lineasFormPage/' + linea.id); // Navegar al detalle de la línea
                            }}
                            key={linea.id} 
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-bold text-gray-800">
                                {linea.nombre}
                            </h2>
                            {linea.imagen && (
                                <img
                                 src={linea.imagen}
                                 alt={`Imagen de ${linea.nombre}`}
                                 className="w-full h-48 object-cover rounded-md mt-4"
                                />
                            )}
                            
                        </li>
                    ))}
                </ul>
            </div>


            <div className="mt-4">
                <Link
                    to="/lineasFormPage/" 
                    className="text-white-800"
                >
                    Añadir Nueva Linea
                </Link>
            </div>

        </div>
    );
}