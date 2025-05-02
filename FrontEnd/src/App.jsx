import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';

import {Estudiantes} from './pages/estudiantes';
import {Proyectos} from './pages/proyectos';
import {Investigadores} from './pages/investigadores';
import {Eventos} from './pages/eventos';      
import {Articulos} from './pages/articulos';
import {Areas} from './pages/areas';
import { Unidades } from './pages/unidades';
import { Lineas } from './pages/lineas';

import {Navigation} from './components/navigation';
import { InvestigadoresFormPage } from './pages/investigadoresFormPage';
import { InvestigadoresDet } from './pages/investigadoresDet';
import {Toaster} from 'react-hot-toast';
import React from "react";

import {Dashboard}  from './components/Dashboard';
// import {ResearcherDetail}  from './components/ResearcherDetail';


function App() {
  return (
    
    <BrowserRouter>

      <Navigation />
      <div className='ml-82'>
        
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/investigadores" element={<Investigadores />} />
          <Route path="/investigadores/:id" element={<InvestigadoresDet />} /> 
          <Route path="/investigadoresFormPage/:id" element={<InvestigadoresFormPage />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/lineas" element={<Lineas />} />
          
          {/* <Route path="/proyectos/:id" element={<ProyectosDet />} /> */}
          {/* <Route path="/eventos/:id" element={<EventosDet />} /> */}
          <Route path="/estudiantes" element={<Estudiantes />} />

          


          <Route path="/dashboard/:id" element={<Dashboard />} />
          
        </Routes>
        <Toaster />
      </div>

    </BrowserRouter>
  )
}

export default App