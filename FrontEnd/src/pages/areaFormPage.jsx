import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateArea, DeleteArea, UpdateArea } from "../api/areas.api.jsx";
import axios from "axios";

export function AreaFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [unidades, setUnidades] = useState([]); 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  useEffect(() => {
    async function fetchArea() {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/Areas/${id}`);
          const area = response.data;
          setValue("nombre", area.nombre);
          setValue("unidad", area.unidad.toString()); // Asignar el ID de la unidad
          setValue("esatus", area.esatus.toString());
        } catch (error) {
          console.error("Error al cargar el área:", error);
        }
      }
    }
  
    async function fetchUnidades() {
      try {
        const response = await axios.get('http://localhost:8000/api/Unidad/');
        setUnidades(response.data); // Actualizar el estado con las unidades obtenidas
      } catch (error) {
        console.error('Error al cargar las unidades:', error);
      }
    }
  
    fetchUnidades();
    fetchArea();
  }, [id, setValue]);

  
    



  const onSubmit = async (data) => {
    try {
      if (id) {
        // Actualizar área existente
        const response = await UpdateArea(id, data);
        console.log("Área actualizada:", response.data);
        alert("Área actualizada exitosamente");
      } else {
        // Crear nueva área
        const response = await CreateArea(data);
        console.log("Área creada:", response.data);
        alert("Área creada exitosamente");
      }
      navigate("/areas"); // Redirigir a la lista de áreas
    } catch (error) {
      console.error("Error al guardar el área:", error);
    }
  };

  // Manejar la eliminación del área
  const handleDelete = async () => {
    try {
      if (id) {
        const response = await DeleteArea(id);
        console.log("Área eliminada:", response.data);
        alert("Área eliminada exitosamente");
        navigate("/areas"); // Redirigir a la lista de áreas
      }
    } catch (error) {
      console.error("Error al eliminar el área:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Área" : "Crear Área"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Área
          </label>
          <input
            {...register("nombre", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre del Área"
          />
          {errors.nombre && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        
        {/* Unidad */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad">
            Unidad
        </label>
        <select
            {...register("unidad", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unidad"
        >
            <option value="">Seleccione una unidad</option>
            {unidades.map(unidad => (
            <option key={unidad.id} value={unidad.id}>
                {unidad.nombre}
            </option>
            ))}
        </select>
        {errors.unidad && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>


        {/* Estatus */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="esatus">
            Estatus
          </label>
          <select
            {...register("esatus", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="esatus"
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
          {errors.esatus && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? "Actualizar" : "Crear"}
          </button>
          {id && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}