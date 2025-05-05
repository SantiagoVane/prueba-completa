


# Prueba técnica - Desarrollador Backend
Proyecto desarrollado como parte de una prueba técnica. 
Incluye un sistema de autenticación con roles (admin y cliente), 
gestión de productos y órdenes, construido con stack MERN + Tailwind CSS.

---

## Estructura del proyecto

backend/ # API REST con Node.js, Express, TypeScript y MongoDB
frontend/ # Interfaz en React, TypeScript y Tailwind CSS
.gitignore
README.md

---

## Tecnologías usadas

### Backend

- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Rutas protegidas por roles ('admin', 'client')

### Frontend

- React.js + Vite
- TypeScript
- Tailwind CSS
- Axios para consumo de API
- Context API para gestión de estado

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

bash
git clone https://github.com/SantiagoVane/prueba-completa.git
cd prueba-completa

### 2. Configurar y ejecutar el backend

cd backend-prueba-tecnica
npm install

Crear un archivo .env que contenga:

MONGO_URI=mongodb://localhost:27017/tienda
JWT_SECRET=claveSecreta
PORT=3000

Se ejecuta el desarrollo: 

npm run dev

El backend quedará disponible en: http://localhost:3000

Nota: Puede haber conflicto con los puertos, en esos casos lo mejor sería darle de baja al puerto
mediante el cmd de windows o cambiar el puerto en el .env

### 3. Configurar y ejecutar el frontend

cd ../frontend
npm install

Crea un archivo .env en frontend/:

VITE_API_URL=http://localhost:3000

y ejecutamos el desarrollo

npm run dev

La app se abrirá en: http://localhost:5173

# Funcionalidades
### Usuarios
- Registro y login con JWT
- Roles: admin y client

### Productos
- Crear, editar y eliminar productos (solo admin)
- Ver productos (todos)

### Órdenes
- Crear orden (solo client)
- Ver órdenes propias (client) o todas (admin)

# Notas
- Puedes usar MongoDB Compass para ver la base de datos gráficamente.

# Autor
Luis Santiago Vanegas Bedoya, Estudiante noveno semestre Ingeniería de sistemas

