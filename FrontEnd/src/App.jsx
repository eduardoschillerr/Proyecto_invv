import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';
import {Investigadores} from './pages/investigadores';
import {Navigation} from './components/navigation';
import { InvestigadoresFormPage } from './pages/investigadoresFormPage';
import {Toaster} from 'react-hot-toast';



function App() {
  return (
    
    <BrowserRouter>

      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} /> 
        <Route path="/investigadores" element={<Investigadores/>} /> 
        <Route path="/investigadoresFormPage" element={<InvestigadoresFormPage />} />
        <Route path="/investigadores/:id" element={<InvestigadoresFormPage />} />
        <Route path="/investigadores/:id" element={<InvestigadoresDet />} />
        

      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App