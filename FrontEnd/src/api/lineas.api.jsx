import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/LineasInvestigacion/' // Cambia la URL según tu configuración
});

export const GetallLineas = () => {
    return api.get('/'); // Obtener todas las líneas
}


export const GetLineaById = (id) => {
    return api.get(`/${id}/`); // Obtener una línea por ID
}


export const UpdateLinea = (id, data) => {
    return api.put(`/${id}/`, data); // Actualizar una línea por ID
}

export const CreateLinea = (linea) => {
    return api.post('/', linea); // Crear una nueva línea
}

export const DeleteLinea = (id) => {
    return api.delete(`/${id}/`); // Eliminar una línea por ID
}