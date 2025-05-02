import { useEffect, useState } from "react";
import { Getallinvestigadores } from "../../api/investigadores.api.jsx";
import { InvestigadoresCard } from "./components/investigadores_card.jsx";
import { Link } from 'react-router-dom';

export function estudiantes_lista() {
    const [Estudiante, setEstudiante] = useState([]);

    useEffect(() => {
        async function loadEstudiante() {
            const res = await GetAllEstudiante();
            setEstudiante(res.data);
        }
        loadEstudiante();
    }, []);

    return (

        <div className="min-h-screen bg-white-100 p-6">
            

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Estudiante.map((estudiante) => (
                    <InvestigadoresCard
                        key={estudiante.id}
                        Estudiante={estudiante}
                    />
                ))}
            </div>


            <li>
                <Link
                    to="/InvestigadoresFormPage"
                    className="text-white-800"
                    >
                    Añadir Estudiante
                </Link>
            </li>
        </div>
    );
}
