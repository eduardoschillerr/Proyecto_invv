// Modificación del frontend (LoginPage.jsx)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Enviando datos:", { nombre: username, password: password });
    
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        nombre: username,
        password: password,
      }, {
        // Agregar estas opciones para ver más detalles de la respuesta
        validateStatus: function (status) {
          return status < 500; // Resolver solo si el código de estado es menor que 500
        }
      });
      
      console.log("Respuesta del servidor:", response.data);
      
      if (response.status === 200) {
        // Guardar información del usuario en localStorage
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("is_admin", response.data.esatus);
        localStorage.setItem("nombre", response.data.nombre);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token || "no-token"); // Por si implementas tokens después

        // Redirigir según el rol del usuario
        navigate("/home");
      } else {
        // Mostrar mensaje de error específico del servidor
        setError(response.data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error completo:", error);
      
      if (error.response) {
        
        console.error("Datos de respuesta:", error.response.data);
        console.error("Estado HTTP:", error.response.status);
        setError(error.response.data.error || "Error del servidor");
      } else if (error.request) {
        
        console.error("No se recibió respuesta del servidor");
        setError("No se pudo conectar con el servidor. Verifique su conexión.");
      } else {
        
        console.error("Error de configuración:", error.message);
        setError("Error al configurar la solicitud: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}