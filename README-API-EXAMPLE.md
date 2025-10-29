# Ejemplo de React con consulta a API

Este es un ejemplo simple de cómo consultar una API usando React con hooks modernos.

## Archivos creados

- **src/ApiExample.jsx**: Componente React que consulta la API de JSONPlaceholder
- **src/index-api.js**: Punto de entrada para el ejemplo de React
- **api-example.html**: Página HTML para ver el ejemplo
- **webpack.config-api.js**: Configuración de webpack para el ejemplo

## Características del componente

El componente `ApiExample` demuestra:

1. **useState**: Para manejar el estado (datos, carga, errores)
2. **useEffect**: Para ejecutar la consulta a la API cuando el componente se monta
3. **async/await**: Para hacer consultas asíncronas
4. **fetch API**: Para consultar la API REST
5. **Manejo de errores**: Con try-catch
6. **Estados de carga**: Mostrando feedback al usuario

## Cómo usar

### Opción 1: Compilar y ejecutar con webpack-dev-server

```bash
# Si hay problemas de compatibilidad con Node.js, usar:
export NODE_OPTIONS=--openssl-legacy-provider

# Ejecutar el servidor de desarrollo
npm run start:api
```

Esto abrirá automáticamente tu navegador con el ejemplo.

### Opción 2: Solo compilar

```bash
# Compilar el bundle
export NODE_OPTIONS=--openssl-legacy-provider
npm run build:api

# Luego abrir api-example.html en tu navegador
```

## Estructura del código

### 1. Importaciones

```javascript
import React, { useState, useEffect } from 'react';
```

### 2. Estados

```javascript
const [datos, setDatos] = useState([]);      // Datos de la API
const [cargando, setCargando] = useState(true); // Estado de carga
const [error, setError] = useState(null);       // Errores
```

### 3. Consulta a la API

```javascript
useEffect(() => {
  const consultarAPI = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

      if (!respuesta.ok) {
        throw new Error('Error al consultar la API');
      }

      const datosJSON = await respuesta.json();
      setDatos(datosJSON);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  consultarAPI();
}, []);
```

## API utilizada

El ejemplo usa **JSONPlaceholder** (https://jsonplaceholder.typicode.com/), una API REST gratuita para testing y prototipos.

## Personalización

Puedes cambiar la URL de la API en el componente:

```javascript
const respuesta = await fetch('TU_URL_API_AQUI');
```

## Ejemplos de otras APIs públicas

- **Pokemon API**: https://pokeapi.co/api/v2/pokemon?limit=10
- **Rick and Morty API**: https://rickandmortyapi.com/api/character
- **GitHub API**: https://api.github.com/users/github
- **OpenWeatherMap**: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY

## Notas

- El componente incluye estilos en línea para no depender de CSS externos
- Usa sintaxis moderna de React (hooks)
- Maneja correctamente estados de carga y errores
- Es totalmente funcional y puede ser extendido según tus necesidades
