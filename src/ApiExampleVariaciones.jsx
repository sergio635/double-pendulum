import React, { useState, useEffect } from 'react';

/**
 * VARIACIÓN 1: Consulta simple con fetch
 * La forma más básica de consultar una API
 */
export const EjemploSimple = () => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h3>Ejemplo Simple</h3>
      {datos ? (
        <div>
          <h4>{datos.title}</h4>
          <p>{datos.body}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

/**
 * VARIACIÓN 2: Con botón para hacer la consulta manualmente
 */
export const EjemploConBoton = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerUsuarios = async () => {
    setCargando(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Ejemplo con Botón</h3>
      <button
        onClick={obtenerUsuarios}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {cargando ? 'Cargando...' : 'Obtener Usuarios'}
      </button>

      <div style={{ marginTop: '20px' }}>
        {usuarios.map(usuario => (
          <div key={usuario.id} style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px'
          }}>
            <strong>{usuario.name}</strong> - {usuario.email}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * VARIACIÓN 3: Con parámetros de búsqueda
 */
export const EjemploConParametros = () => {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const consultarPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    consultarPosts();
  }, [userId]); // Se ejecuta cada vez que userId cambia

  return (
    <div style={{ padding: '20px' }}>
      <h3>Ejemplo con Parámetros</h3>

      <div>
        <label>Seleccionar Usuario ID: </label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          {[1, 2, 3, 4, 5].map(id => (
            <option key={id} value={id}>Usuario {id}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Posts del Usuario {userId}:</h4>
        {posts.map(post => (
          <div key={post.id} style={{
            padding: '15px',
            margin: '10px 0',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            borderLeft: '4px solid #2196F3'
          }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * VARIACIÓN 4: Con método POST (enviar datos)
 */
export const EjemploPost = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [respuesta, setRespuesta] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const enviarPost = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          body: contenido,
          userId: 1
        })
      });

      const data = await response.json();
      setRespuesta(data);
      setTitulo('');
      setContenido('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Ejemplo POST (Enviar Datos)</h3>

      <form onSubmit={enviarPost} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          style={{
            padding: '10px 20px',
            backgroundColor: enviando ? '#ccc' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: enviando ? 'not-allowed' : 'pointer'
          }}
        >
          {enviando ? 'Enviando...' : 'Enviar Post'}
        </button>
      </form>

      {respuesta && (
        <div style={{
          padding: '15px',
          backgroundColor: '#c8e6c9',
          borderRadius: '4px',
          borderLeft: '4px solid #4CAF50'
        }}>
          <h4>Respuesta del servidor:</h4>
          <pre>{JSON.stringify(respuesta, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

/**
 * VARIACIÓN 5: Hook personalizado para reutilizar lógica
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la petición');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Componente que usa el hook personalizado
export const EjemploConHookPersonalizado = () => {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/photos?_limit=5'
  );

  if (loading) return <p>Cargando fotos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h3>Ejemplo con Hook Personalizado</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {data && data.map(photo => (
          <div key={photo.id} style={{ textAlign: 'center' }}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <p style={{ fontSize: '12px', marginTop: '5px' }}>
              {photo.title.substring(0, 30)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Componente principal que muestra todas las variaciones
 */
const ApiExampleVariaciones = () => {
  const [ejemploActual, setEjemploActual] = useState('simple');

  const ejemplos = {
    simple: <EjemploSimple />,
    boton: <EjemploConBoton />,
    parametros: <EjemploConParametros />,
    post: <EjemploPost />,
    hook: <EjemploConHookPersonalizado />
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Variaciones de Consultas a API con React
      </h1>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button onClick={() => setEjemploActual('simple')} style={buttonStyle}>
          Simple
        </button>
        <button onClick={() => setEjemploActual('boton')} style={buttonStyle}>
          Con Botón
        </button>
        <button onClick={() => setEjemploActual('parametros')} style={buttonStyle}>
          Con Parámetros
        </button>
        <button onClick={() => setEjemploActual('post')} style={buttonStyle}>
          POST (Enviar)
        </button>
        <button onClick={() => setEjemploActual('hook')} style={buttonStyle}>
          Hook Personalizado
        </button>
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        {ejemplos[ejemploActual]}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#673AB7',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s'
};

export default ApiExampleVariaciones;
