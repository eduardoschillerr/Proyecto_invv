import { useEffect, useState } from "react";
import { GetAllProyectos } from "../../api/proyectos.api.jsx";
import { ProyectosCard } from "./proyectos_card.jsx";
import { Link } from 'react-router-dom';

export function Proyectos_Lista() {
    const [proyectos, setProyectos] = useState([]);
    const [Proyecto, setProyecto] = useState([]);
    
    useEffect(() => {
        async function loadProyecto() {
            const res = await GetAllProyectos();
            setProyecto(res.data);
        }
        loadProyecto();
    }, []);

    return (

        <div className="min-h-screen bg-white-100 p-6">
            

            <div className="grid grid-cols-1  gap-4">
                {Proyecto.map((proyecto) => (
                    <ProyectosCard
                        key={proyecto.id}
                        Proyecto={proyecto}
                    />
                ))}
            </div>


            <li>
                <Link
                    to="/InvestigadoresFormPage"
                    className="text-white-800"
                    >
                    Añadir 
                </Link>
            </li>
        </div>
    );
}
