import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function Areas() {
    const [areas, setAreas] = useState([]); // Estado para almacenar los artículos
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAreas() {
            try {
                const response = await axios.get("http://localhost:8000/api/Areas/"); // Endpoint para artículos
                setAreas(response.data); // Guardar los artículos en el estado
            } catch (error) {
                console.error("Error al cargar los artículos:", error);
            }
        }
        fetchAreas();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Página de Areas
            </h1>
            <div>
                <ul className="space-y-4">
                    {areas.map((areas) => ( // Iterar sobre el estado "articulos"
                        <li
                            onClick={() => {
                                navigate('/Areas/' + areas.id); // Navegar al detalle del artículo
                            }}
                            key={areas.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >  
                            <h2 className="text-xl font-bold text-gray-800">
                                {areas.nombre}
                            </h2>
                            {/* <ul className="list-disc pl-5 text-gray-600">
                                {areas.investigadores.map((investigador, index) => (
                                    <li key={index}>{investigador}</li> 
                                ))}
                            </ul> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}