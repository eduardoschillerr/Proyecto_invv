import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="bg-blue-600 text-wh p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">CITAEQ</h1>
                <ul className="flex space-x-6">
                    <li >
                        <Link
                            to="/home"
                            className="text-white"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/investigadores"
                            className="text-white"
                        >
                            Investigadores
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

