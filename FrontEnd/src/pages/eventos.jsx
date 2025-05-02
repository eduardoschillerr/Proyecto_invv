import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function Eventos() {
    const [eventos, setEventos] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEventos() {
            try {
                const response = await axios.get("http://localhost:8000/api/Evento/"); // Endpoint para eventos
                setEventos(response.data); // Guardar los eventos en el estado
            } catch (error) {
                console.error("Error al cargar los eventos:", error);
            }
        }
        fetchEventos();
    }, []);

    return (
        <div className="max-w-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Página de Eventos
            </h1>
            <div>
                <ul className="space-y-4">
                    {eventos.map((evento) => ( // Cambié "evento" para iterar sobre el estado "eventos"
                        <li
                            onClick={() => {
                                navigate('/Evento/' + evento.id); // Navegar al detalle del evento
                            }}
                            key={evento.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >  
                            <h2 className="text-xl font-bold text-gray-800">
                                {evento.nombre}
                            </h2>
                            <p className="text-gray-600">{evento.descripcion}</p>
                            <p className="text-blue-700">Organizador</p>
                            <p className="text-gray-600">{evento.organizador}</p>
                            <p className="text-gray-600">{evento.ubicacion}</p>
                        
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}