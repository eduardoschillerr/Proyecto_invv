import { useEffect, useState } from "react";
import { Getallinvestigadores } from "../../api/investigadores.api.jsx";
import { InvestigadoresCard } from "./investigadores_card.jsx";
import { Link } from 'react-router-dom';

export function Investigadores_lista() {
    const [Investigador, setInvestigador] = useState([]);

    useEffect(() => {
        async function loadinvestigadores() {
            const res = await Getallinvestigadores();
            setInvestigador(res.data);
        }
        loadinvestigadores();
    }, []);

    return (

        <div className="min-h-screen bg-white-100 p-6">
            

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Investigador.map((investigador) => (
                    <InvestigadoresCard
                        key={investigador.id}
                        Investigador={investigador}
                    />
                ))}
            </div>


            <li>
                <Link
                    to="/InvestigadoresFormPage"
                    className="text-white-800"
                    >
                    Añadir Investigador
                </Link>
            </li>
        </div>
    );
}
