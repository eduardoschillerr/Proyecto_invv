import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateArticulo, DeleteArticulo, UpdateArticulo } from "../api/articulos.api.jsx";
import axios from "axios";

export function ArticulosFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const params = useParams();
    
    

    useEffect(() => {
        
        async function fetchArticulo() {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/Articulo/${id}/`);
                    const articulo = response.data;

                    // Establecer los valores del formulario
                    setValue("titulo", articulo.titulo);
                    setValue("descripcion", articulo.descripcion.toString());
                    setValue("fecha_publicacion", articulo.fecha_publicacion);
                    setValue("enlace", articulo.enlace);
                } catch (error) {
                    console.error("Error al cargar el artículo:", error);
                }
            }
        }

        
        fetchArticulo();
    }, [id, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
    
            // Agregar todos los campos al FormData
            for (const key in data) {
                if (key === "investigadores") {
                    // Si es el campo de investigadores, agregar cada ID individualmente
                    data[key].forEach((id) => formData.append("investigadores", id));
                } else {
                    formData.append(key, data[key]);
                }
            }
    
            if (id) {
                // Editar artículo existente
                const response = await UpdateArticulo(id, formData);
                console.log("Artículo actualizado:", response.data);
                alert("Artículo actualizado exitosamente");
            } else {
                // Crear un nuevo artículo
                const response = await CreateArticulo(formData);
                console.log("Artículo creado:", response.data);
                alert("Artículo creado exitosamente");
            }
            navigate("/articulos");
        } catch (error) {
            console.error("Error al guardar el artículo:", error);
            alert("Hubo un error al guardar el artículo");
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {id ? "Editar Artículo" : "Crear Nuevo Artículo"}
                </h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Título */}
                    <div>
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            placeholder="Título del artículo"
                            className={`w-full px-3 py-2 border ${errors.titulo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("titulo", { required: true })}
                        />
                        {errors.titulo && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            placeholder="Descripción del artículo"
                            className={`w-full px-3 py-2 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("descripcion", { required: true })}
                        ></textarea>
                        {errors.descripcion && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
                    </div>

                    {/* Fecha de publicación */}
                    <div>
                        <label htmlFor="fecha_publicacion" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Publicación
                        </label>
                        <input
                            type="date"
                            id="fecha_publicacion"
                            className={`w-full px-3 py-2 border ${errors.fecha_publicacion ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("fecha_publicacion", { required: true })}
                        />
                        {errors.fecha_publicacion && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
                    </div>

                    
                    <div>
                        <label htmlFor="enlace" className="block text-sm font-medium text-gray-700 mb-1">
                            Enlace
                        </label>
                        <input
                            type="url"
                            id="enlace"
                            placeholder="Enlace al artículo"
                            className={`w-full px-3 py-2 border ${errors.enlace ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("enlace", { required: true })}
                        />
                        {errors.enlace && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            {id ? "Actualizar" : "Guardar"}
                        </button>



                        {id && (
                            <button
                                type="button"
                                onClick={async () => {
                                    const accept = window.confirm("¿Está seguro de eliminar este artículo?");
                                    if (accept) {
                                        try {
                                            await DeleteArticulo(id);
                                            navigate("/articulos");
                                        } catch (error) {
                                            console.error("Error al eliminar el artículo:", error);
                                        }
                                    }
                                }}
                                className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ml-auto"
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}