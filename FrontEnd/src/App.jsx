import {BrowserRouter,Routes, Route,useLocation} from 'react-router-dom';
import {Home} from './pages/home';

import { LoginPage } from "./pages/LoginPage";


import {Estudiantes} from './pages/estudiantes';
import {Proyectos} from './pages/proyectos';
import {Investigadores} from './pages/investigadores';
import {Eventos} from './pages/eventos';      
import {Articulos} from './pages/articulos';
import {Areas} from './pages/areas';
import { Unidades } from './pages/unidades';
import { Lineas } from './pages/lineas';

import {Navigation} from './components/navigation';

import { ArticulosFormPage } from './pages/articulosFormPage';
import { LineasFormPage } from './pages/lineasFormPage';
import { AreaFormPage } from './pages/areaFormPage';
import { ProyectosFormPage } from './pages/proyectosFormPage';
import { InvestigadoresFormPage } from './pages/investigadoresFormPage';
import { InvestigadoresDet } from './pages/investigadoresDet';
import {Toaster} from 'react-hot-toast';
import React from "react";

import {Dashboard}  from './components/Dashboard';
// import {ResearcherDetail}  from './components/ResearcherDetail';


function App() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <>
      {/* Renderiza Navigation solo si no estás en la página de login */}
      {/* {location.pathname !== "/login" && <Navigation />} */}
      {location.pathname !== "/" && <Navigation />}

      <div className={location.pathname === "/" ? "" : "ml-82"}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/investigadores" element={<Investigadores />} />
          <Route path="/investigadores/:id" element={<InvestigadoresDet />} />
          <Route path="/investigadoresFormPage/:id" element={<InvestigadoresFormPage />} />
          <Route path="/investigadoresFormPage" element={<InvestigadoresFormPage />} />
          <Route path="/proyectosFormPage/:id" element={<ProyectosFormPage />} />
          <Route path="/proyectosFormPage" element={<ProyectosFormPage />} />
          <Route path="/lineasFormPage/:id" element={<LineasFormPage />} />
          <Route path="/lineasFormPage" element={<LineasFormPage />} />
          <Route path="/areaFormPage/:id" element={<AreaFormPage />} />
          <Route path="/areaFormPage" element={<AreaFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/articulosFormPage/:id" element={<ArticulosFormPage />} />
          <Route path="/articulosFormPage" element={<ArticulosFormPage />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/lineas" element={<Lineas />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}