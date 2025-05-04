import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { CreateProyecto, DeleteProyecto, UpdateProyecto } from "../api/proyectos.api.jsx";

export function ProyectosFormPage() {
  const { id } = useParams(); // Obtener el ID del proyecto de los params de url 
  const navigate = useNavigate(); 
  const [areas, setAreas] = useState([]); // Estado para almacenar las áreas disponibles


  // Configuración del formulario con react-hook-form
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      esatus: "En proceso",
      area_nombre: "",
    },
  });

  // Cargar datos del proyecto si se está editando
  useEffect(() => {
    async function fetchProyecto() {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/proyectos/${id}`);
          const { nombre, descripcion, fecha_inicio, fecha_fin, esatus, area_nombre } = response.data;
          setValue("nombre", nombre);
          setValue("descripcion", descripcion);
          setValue("fecha_inicio", fecha_inicio);
          setValue("fecha_fin", fecha_fin);
          setValue("esatus", esatus);
          setValue("area_nombre", area_nombre);
        } catch (error) {
          console.error("Error al cargar el proyecto:", error);
        }
      }
    }

    async function fetchAreas() {
        try {
            const response = await axios.get('http://localhost:8000/api/Areas/');
            setAreas(response.data);
        } catch (error) {
            console.error('Error al cargar las áreas:', error);
        }
    }
    fetchProyecto();
    fetchAreas(); 

  }, [id, setValue]);

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      if (id) {
        // Actualizar proyeto existente
            const response = await UpdateProyecto(id, data);
            console.log('Investigador actualizado:', response.data);
            alert('Investigador actualizado exitosamente');
      } else {
        // Crear nuevo proyecto
            const response = await CreateProyecto(data);
            console.log('Investigador creado:', response.data);
            alert('Investigador creado exitosamente');
      }
      navigate("/proyectos"); 
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
    }
  };

  // Manejar la eliminación del proyecto
  const handleDelete = async () => {
    try {
      if (id) {
        const response = await DeleteProyecto(id);
        navigate("/proyectos"); // Redirigir a la lista de proyectos
      }
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Proyecto" : "Crear Proyecto"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Proyecto
          </label>
          <input
            {...register("nombre", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre del Proyecto"
          />
          {errors.nombre && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            {...register("descripcion", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descripcion"
            placeholder="Descripción del Proyecto"
          />
          {errors.descripcion && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        {/* Fecha de Inicio */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
            Fecha de Inicio
          </label>
          <input
            {...register("fecha_inicio", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha_inicio"
            type="date"
          />
          {errors.fecha_inicio && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        {/* Fecha de Fin */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_fin">
            Fecha de Fin
          </label>
          <input
            {...register("fecha_fin", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha_fin"
            type="date"
          />
          {errors.fecha_fin && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
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
            <option value="En proceso">En proceso</option>
            <option value="Terminado">Terminado</option>
            <option value="Instalado en sitio">Instalado en sitio</option>
          </select>
          {errors.esatus && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
        </div>

        {/* Área */}
        <div className="mb-4">
            <label htmlFor="area_nombre" className="block text-gray-700 text-sm font-bold mb-2">
              Área
            </label>
            <select 
                id="area_nombre"
                className={`w-full px-3 py-2 border px3 focus:shadow-outline ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                {...register("area", { required: true })}
            >
                <option value="">Seleccione un área</option>
                {areas.map(area => (
                    <option key={area.id} value={area.id}>
                            {area.nombre}
                    </option>
                ))}
            </select>
            {errors.area && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
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