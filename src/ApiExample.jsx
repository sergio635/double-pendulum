import React, { useState, useEffect } from 'react';

/**
 * Componente simple de React que consulta una API
 * Este ejemplo usa JSONPlaceholder, una API REST gratuita para testing
 */
const ApiExample = () => {
  // Estado para almacenar los datos de la API
  const [datos, setDatos] = useState([]);
  // Estado para manejar la carga
  const [cargando, setCargando] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función para consultar la API
    const consultarAPI = async () => {
      try {
        setCargando(true);
        // Consulta a JSONPlaceholder (API de ejemplo)
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        // Verificar si la respuesta es exitosa
        if (!respuesta.ok) {
          throw new Error('Error al consultar la API');
        }

        // Convertir la respuesta a JSON
        const datosJSON = await respuesta.json();

        // Actualizar el estado con los datos
        setDatos(datosJSON);
        setError(null);
      } catch (err) {
        // Manejar errores
        setError(err.message);
        setDatos([]);
      } finally {
        // Terminar el estado de carga
        setCargando(false);
      }
    };

    // Ejecutar la consulta
    consultarAPI();
  }, []); // El array vacío significa que solo se ejecuta una vez al montar el componente

  // Renderizar el componente
  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Ejemplo de Consulta a API con React</h1>

      {/* Mostrar mensaje de carga */}
      {cargando && <p style={styles.mensaje}>Cargando datos...</p>}

      {/* Mostrar mensaje de error */}
      {error && <p style={styles.error}>Error: {error}</p>}

      {/* Mostrar los datos */}
      {!cargando && !error && (
        <div>
          <h2 style={styles.subtitulo}>Posts obtenidos de la API:</h2>
          {datos.map((post) => (
            <div key={post.id} style={styles.card}>
              <h3 style={styles.cardTitulo}>{post.title}</h3>
              <p style={styles.cardContenido}>{post.body}</p>
              <small style={styles.cardId}>ID: {post.id}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Estilos en línea para el componente
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  titulo: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  subtitulo: {
    color: '#555',
    marginBottom: '20px',
  },
  mensaje: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    padding: '15px',
    borderRadius: '5px',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardTitulo: {
    color: '#1976d2',
    marginTop: '0',
    marginBottom: '10px',
    textTransform: 'capitalize',
  },
  cardContenido: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  cardId: {
    color: '#999',
    fontSize: '12px',
  },
};

export default ApiExample;
