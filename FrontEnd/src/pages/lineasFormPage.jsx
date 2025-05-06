import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { CreateLinea, DeleteLinea, UpdateLinea } from "../api/lineas.api.jsx";
import axios from "axios";


export function LineasFormPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const params = useParams();

    async function fetchLineas() {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:8000/api/LineasInvestigacion/${id}`);
                const linea = response.data;
                setValue("nombre", linea.nombre);
                setValue("institucional", linea.descripcion.toString());
                setValue("esatus", linea.esatus.toString());
                if (data.imagen[0]) {
                    formData.append("imagen", data.imagen[0]); 
                }
            } catch (error) {
                console.error("Error al cargar la línea:", error);
            }
        }
    }


    useEffect(() => {
        async function fetchLineas() {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/LineasInvestigacion/${id}`);
                    const linea = response.data;
                    setValue("nombre", linea.nombre);
                    setValue("esatus", linea.esatus.toString());
                    setValue("imagen", linea.imagen);
                } catch (error) {
                    console.error("Error al cargar la línea:", error);
                }
            }
        }
    
    fetchLineas();
    fetchLineas(); 

    },[id, setValue]);

    const onSubmit = handleSubmit(async (data) => {
            try {
                const formData = new FormData();
    
                // Agregar todos los campos al FormData
                for (const key in data) {
                    formData.append(key, data[key]);
                }
    
                // Agregar el archivo de imagen si existe
                if (data.imagen && data.imagen[0]) {
                    formData.append("imagen", data.imagen[0]); // `data.imagen` es un array de archivos
                }
    
                if (params.id) {
                    // Editar investigador existente
                    const response = await UpdateLinea(params.id, formData);
                    console.log('Linea actualizada:', response.data);
                    alert('Linea actualizada exitosamente');
                } else {
                    // Crear un nuevo investigador
                    const response = await CreateLinea(formData);
                    console.log('Linea creado:', response.data);
                    alert('Linea creado exitosamente');
                }
                navigate("/lineas");
            } catch (error) {
                console.error('Error al guardar la linea:', error);
                alert('Hubo un error al guardar la linea');
            }
        });
    



    return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              {id ? "Editar Línea" : "Crear Nueva Línea"}
            </h1>
    
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre de la línea"
                  className={`w-full px-3 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
              </div>
    
              {/* Estatus */}
              <div>
                <label htmlFor="esatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Estatus
                </label>
                <select
                  id="esatus"
                  className={`w-full px-3 py-2 border ${errors.esatus ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                  {...register("esatus", { required: true })}
                >
                  <option value="">Seleccione un estatus</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
                {errors.esatus && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
              </div>
    
              {/* Imagen */}
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("imagen", { required: false })}
                  accept="image/*"
                />
              </div>
    
              {/* Botones */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {id ? "Actualizar" : "Guardar"}
                </button>
    
                <button
                  type="button"
                  onClick={() => navigate("/lineas")}
                  className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancelar
                </button>

                {params.id && (
                    <button 
                      type="button"
                      onClick={async () => {
                          const accept = window.confirm('¿Está seguro de eliminar esta linea?');
                          if (accept) {
                            try {
                              await DeleteLinea(params.id);
                              navigate("/lineas");
                            } catch (error) {
                              console.error('Error al eliminar la Linea:', error);
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

