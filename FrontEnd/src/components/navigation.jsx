
import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="bg-blue-950 text-white h-screen w-50 fixed top-0 left-0 shadow-md">
            <div className="p-1">
                <h1 className="text- font-bold mb-3">CITAEQ</h1>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/home"
                            className="block text-white-500 hover:bg-blue-700 p-2 rounded"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/investigadores"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Investigadores
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/proyectos"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/estudiantes"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Estudiantes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/eventos"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/articulos"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Articulos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/areas"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Areas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/unidades"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Unidades
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/lineas"
                            className="block text-white hover:bg-blue-700 p-2 rounded"
                        >
                            Lineas
                        </Link>
                    </li>
                </ul>   
            </div>
        </nav>
    );
}