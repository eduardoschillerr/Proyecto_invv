import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/Areas/'
});

export const GetallAreas = () => {
    return api.get('/'); 
};

export const GetAreaById = (id) => {
    return api.get(`/${id}/`); // Asegúrate de que esta ruta coincida con la del backend
};

export const UpdateArea = (id, data) => {
    return api.put(`/${id}/`, data); // Usa PUT para actualizar todos los campos
};

export const CreateArea = (Area) => {
    return api.post('/', Area); 
};

export const DeleteArea = (id) => {
    return api.delete(`/${id}/`); 
};