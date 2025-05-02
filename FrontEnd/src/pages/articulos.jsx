import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function Articulos() {
    const [articulos, setArticulos] = useState([]); // Estado para almacenar los artículos
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArticulos() {
            try {
                const response = await axios.get("http://localhost:8000/api/Articulo/"); // Endpoint para artículos
                setArticulos(response.data); // Guardar los artículos en el estado
            } catch (error) {
                console.error("Error al cargar los artículos:", error);
            }
        }
        fetchArticulos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Página de Artículos
            </h1>
            <div>
                <ul className="space-y-4">
                    {articulos.map((articulo) => ( // Iterar sobre el estado "articulos"
                        <li
                            onClick={() => {
                                navigate('/Articulo/' + articulo.id); // Navegar al detalle del artículo
                            }}
                            key={articulo.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >  
                            <h2 className="text-xl font-bold text-gray-800">
                                {articulo.titulo}
                            </h2>
                            <p className="text-gray-600">{articulo.resumen}</p>
                            <p className="text-gray-600">
                                <strong>Fecha de publicación:</strong> {articulo.fecha_publicacion}
                            </p>
                            <p className="text-blue-600">
                                <strong>Autores:</strong> 
                            </p>
                            <ul className="list-disc pl-5 text-gray-600">
                                {articulo.investigadores.map((investigador, index) => (
                                    <li key={index}>{investigador}</li> 
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}