import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Unidades() {
    const [unidades, setUnidades] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUnidades() {
            try {
                const response = await axios.get("http://localhost:8000/api/Unidad/"); 
                setUnidades(response.data); 
            } catch (error) {
                console.error("Error al cargar las unidades:", error);
            }
        }
        fetchUnidades();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Unidades
            </h1>
            <div>
                <ul className="space-y-4">
                    {unidades.map((unidad) => ( 
                        <li
                            onClick={() => {
                                navigate('/Unidades/' + unidad.id); 
                            }}
                            key={unidad.id} 
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-bold text-gray-800">
                                {unidad.nombre}
                            </h2>
                            <p className="text-gray-600">Ubicación: {unidad.ubicacion}</p>
                            <p className="text-gray-600">
                                Estatus: {unidad.esatus ? "Activo" : "Inactivo"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}