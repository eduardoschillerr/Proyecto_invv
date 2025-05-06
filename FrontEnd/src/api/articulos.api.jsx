import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/Articulo/'
});

export const GetallArticulos = () => {
    return api.get('/'); 
};

export const GetArticuloById = (id) => {
    return api.get(`/${id}/`); // Asegúrate de que esta ruta coincida con la del backend
};

export const UpdateArticulo = (id, data) => {
    return api.put(`/${id}/`, data); // Usa PUT para actualizar todos los campos
};

export const CreateArticulo = (Area) => {
    return api.post('/', Area); 
};

export const DeleteArticulo = (id) => {
    return api.delete(`/${id}/`); 
};