import React, { useEffect, useState } from "react";
import axios from "axios";

export function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        async function fetchEstudiantes() {
            try {
                const response = await axios.get("http://localhost:8000/api/Estudiante/");
                setEstudiantes(response.data);
            } catch (error) {
                console.error("Error al cargar los estudiantes:", error);
            }
        }
        fetchEstudiantes();
    }, []);

    return (

        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Página de Estudiantes
            </h1>
            <div>
                <ul className="space-y-4">
                    {estudiantes.map((estudiante) => (
                        <li
                            key={estudiante.id}
                            className="bg-white shadow-md rounded-lg p-4"
                        >  
                            <h2 className="text-xl font-bold text-gray-800">
                                {estudiante.nombre}
                            </h2>
                            <p className="text-gray-600">{estudiante.carrera}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}