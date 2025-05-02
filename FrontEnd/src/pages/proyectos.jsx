// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export function Proyectos() {
//     const [proyectos, setProyectos] = useState([]);

//     useEffect(() => {
//         async function fetchProyectos() {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/Proyecto/");
//                 console.log("Datos de la API:", response.data); // Inspecciona los datos
//                 setProyectos(response.data);
//             } catch (error) {
//                 console.error("Error al cargar los proyectos:", error);
//             }
//         }
//         fetchProyectos();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <h1 className="text-4xl font-bold text-center mb-8">
//                 Página de Proyectos
//             </h1>
//             <div>
//                 <ul className="space-y-4">
//                     {proyectos.map((proyecto) => (
//                         <li
//                             key={proyecto.id}
//                             className="bg-white shadow-md rounded-lg p-4"
//                         >  
//                             <h2 className="text-xl font-bold text-gray-800">
//                                 {proyecto.nombre}
//                             </h2>
//                             <p className="text-gray-600">
//                                 {proyecto.descripcion}
//                             </p>
//                             <p className="text-blue-600">
//                                 Área: {proyecto.area ? proyecto.area.nombre : "Área no disponible"}
//                             </p>
//                             <p className="text-blue-600">
//                                 Investigadores: {proyecto.investigadores}
//                             </p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

import { Proyectos_Lista } from '../components/proyectos/proyectos_lista.jsx';

export function Proyectos() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Página de proyectos
            </h1>
            <Proyectos_Lista />
        </div>
    );
}