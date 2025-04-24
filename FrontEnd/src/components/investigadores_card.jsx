import {useNavigate} from 'react-router-dom'


 export function InvestigadoresCard({ Investigador }) {
   const navigate = useNavigate();



   return (
       <div
           onClick={() => {
               navigate('/investigadores/' + Investigador.id);
           }}
           className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
       >
           <h1 className="text-xl font-bold text-gray-800 mb-2">
               {Investigador.nombre}
           </h1>
           <p className="text-gray-600">{Investigador.area}</p>
           <hr className="mt-4 border-gray-300" />
       </div>
   );
 }

// import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export function InvestigadoresCard() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [investigador, setInvestigador] = useState(null);

//     useEffect(() => {
//         async function fetchInvestigador() {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/Investigador/${id}/`);
//                 setInvestigador(response.data);
//             } catch (error) {
//                 console.error('Error al cargar el investigador:', error);
//             }
//         }
//         fetchInvestigador();
//     }, [id]);

//     if (!investigador) {
//         return <p>Cargando datos del investigador...</p>;
//     }

//     return (
//         <div
//             onClick={() => {
//                 navigate('/investigadores/' + investigador.id);
//             }}
//             className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
//         >
//             <h1 className="text-xl font-bold text-gray-800 mb-2">
//                 {investigador.nombre}
//             </h1>
//             <p className="text-gray-600">{investigador.area_nombre}</p>
//             <hr className="mt-4 border-gray-300" />
//         </div>
//     );
// }