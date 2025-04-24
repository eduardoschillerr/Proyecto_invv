import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';

import {Estudiantes} from './pages/estudiantes';
import {Proyectos} from './pages/proyectos';

import {Investigadores} from './pages/investigadores';
import {Navigation} from './components/navigation';
import { InvestigadoresFormPage } from './pages/investigadoresFormPage';
import { InvestigadoresDet } from './pages/investigadoresDet';
import {Toaster} from 'react-hot-toast';
import React from "react";


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

          <Route path="/estudiantes" element={<Estudiantes />} />
        </Routes>
        <Toaster />
      </div>

    </BrowserRouter>
  )
}

export default App