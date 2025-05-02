import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/Proyecto/'
});

export const GetAllProyectos = () => {
    return api.get('/'); 
};

export const GetProyectoByID = (id) => {
    return api.get(`/${id}/`); // Asegúrate de que esta ruta coincida con la del backend
};

export const UpdateProyecto = (id, data) => {
    return api.put(`/${id}/`, data); // Usa PUT para actualizar todos los campos
};

export const CreateProyecto = (Proyecto) => {
    return api.post('/', Proyecto); 
};

export const DeleteProyecto = (id) => {
    return api.delete(`/${id}/`); 
};