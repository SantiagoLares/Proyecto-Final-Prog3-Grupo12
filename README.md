# Sistema de Inventario Básico - Proyecto Final Programación 3

Aplicación web full-stack desarrollada como trabajo final de la materia **Programación 3**.

El sistema está orientado a pequeños negocios que necesiten controlar su inventario de forma simple. Permite gestionar productos, categorías y movimientos de stock. Además, incluye autenticación de usuarios mediante JWT.

---

## Integrantes

- Santiago Lares
- Rodrigo Copreni
- Juan Ramírez
- Agustín Pascuali
- Agustín Cepeda

---

## Tecnologías utilizadas

### Frontend

- React 18
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express
- Sequelize
- JSON Web Token
- bcryptjs
- CORS
- Helmet
- Morgan

### Base de datos

- PostgreSQL 15

### Infraestructura

- Docker
- Docker Compose
- pgAdmin
- Redis
- Caddy

---

## Descripción general

El proyecto consiste en una aplicación web full-stack con frontend, backend, base de datos y servicios auxiliares, todo orquestado mediante Docker Compose.

La aplicación permite:

- Registrar usuarios.
- Iniciar sesión.
- Proteger rutas mediante JWT.
- Gestionar productos.
- Gestionar categorías.
- Registrar movimientos de inventario.
- Controlar entradas y salidas de stock.

---

## Arquitectura general

```txt
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Caddy     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌─────────────┐    ┌─────────────┐
                   │    Redis    │    │ PostgreSQL  │
                   │  (Cache)    │    │    (DB)     │
                   │   :6379     │    │   :5432     │
                   └─────────────┘    └─────────────┘
Servicio	Tecnología	Puerto	Función
Frontend	React 18	3000	Interfaz de usuario
Backend	Express + Sequelize	3001	API REST
Database	PostgreSQL 15	5432	Base de datos relacional
Cache	Redis 7	6379	Cache
Proxy	Caddy 2	80	Reverse proxy
pgAdmin	pgAdmin 4	5050	Administración visual de la base de datos
Estructura del proyecto
proyecto/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── App.js
│       └── App.css
│
├── database/
├── caddy/
├── pgadmin/
├── docker-compose.yml
└── README.md
Funcionalidades implementadas
Autenticación
Registro de usuario.
Login de usuario.
Generación de token JWT.
Protección de rutas privadas.
Perfil de usuario autenticado.
Cierre de sesión.
Hash de contraseñas con bcrypt.
Inventario
Listado de productos.
Creación de productos.
Eliminación de productos.
Listado de categorías.
Creación de categorías.
Eliminación de categorías.
Registro de movimientos de inventario.
Entradas y salidas de stock.
Relación entre productos y categorías.
Interfaz
Pantalla de login.
Pantalla de registro.
Dashboard principal.
Pantalla de perfil.
Pantalla de productos.
Pantalla de categorías.
Pantalla de movimientos.
Estilos CSS básicos para mejorar la presentación.
Requisitos previos

Para ejecutar el proyecto se necesita tener instalado:

Git
Docker
Docker Compose
Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/SantiagoLares/Proyecto-Final-Prog3-Grupo12.git
cd Proyecto-Final-Prog3-Grupo12

Construir e iniciar los servicios:

docker-compose up --build

También se puede iniciar en segundo plano con:

docker-compose up -d --build

Una vez iniciado el proyecto, se puede acceder a:

Recurso	URL
Frontend	http://localhost:3000
Backend API	http://localhost:3001/api
Health check	http://localhost:3001/health
pgAdmin	http://localhost:5050
Proxy Caddy	http://localhost
Migraciones y seeders

Para crear las tablas necesarias en la base de datos, ejecutar:

docker-compose exec backend sh
npx sequelize-cli db:migrate
exit

Para cargar datos de prueba:

docker-compose exec backend sh
npx sequelize-cli db:seed:all
exit

Si se necesita reiniciar completamente la base de datos:

docker-compose down -v
docker-compose up --build

Luego volver a ejecutar migraciones y seeders.

Usuario de prueba

Se puede registrar un usuario desde la pantalla de registro.

Usuario sugerido para pruebas:

Email: admin@inventario.com
Contraseña: 123456

Importante: la contraseña debe tener al menos 6 caracteres.

Endpoints principales
Autenticación
Método	Ruta	Descripción	Protegida
POST	/api/auth/register	Registrar usuario	No
POST	/api/auth/login	Iniciar sesión	No
GET	/api/auth/perfil	Obtener perfil del usuario autenticado	Sí
Productos
Método	Ruta	Descripción
GET	/api/productos	Listar productos
POST	/api/productos	Crear producto
PUT	/api/productos/:id	Editar producto
DELETE	/api/productos/:id	Eliminar producto

También se mantienen disponibles las rutas en inglés:

/api/products
Categorías
Método	Ruta	Descripción
GET	/api/categorias	Listar categorías
POST	/api/categorias	Crear categoría
PUT	/api/categorias/:id	Editar categoría
DELETE	/api/categorias/:id	Eliminar categoría

También se mantienen disponibles las rutas en inglés:

/api/categories
Movimientos
Método	Ruta	Descripción
GET	/api/movimientos	Listar movimientos
POST	/api/movimientos	Registrar movimiento de stock

También se mantienen disponibles las rutas en inglés:

/api/movements
Autenticación JWT

El sistema utiliza JSON Web Token para autenticar usuarios y proteger rutas privadas.

Flujo general:

El usuario se registra o inicia sesión.
El backend valida las credenciales.
Si los datos son correctos, el backend genera un token JWT.
El frontend guarda el token en localStorage.
Para acceder a rutas protegidas, el frontend envía el token en el header:
Authorization: Bearer TOKEN
El backend verifica el token mediante un middleware.
Si el token es válido, se permite continuar con la petición.

La contraseña del usuario no se guarda en texto plano. Antes de almacenarse, se hashea con bcrypt.

Modelo de datos
Usuario
Campo	Descripción
id	Identificador único
nombre	Nombre del usuario
email	Email del usuario
password	Contraseña hasheada
createdAt	Fecha de creación
updatedAt	Fecha de actualización
Categoría
Campo	Descripción
id	Identificador único
nombre	Nombre de la categoría
descripcion	Descripción de la categoría
createdAt	Fecha de creación
updatedAt	Fecha de actualización
Producto
Campo	Descripción
id	Identificador único
nombre	Nombre del producto
descripcion	Descripción del producto
sku	Código o identificador del producto
precio	Precio del producto
stock	Stock actual
stockMinimo	Stock mínimo recomendado
categoryId	Categoría asociada
createdAt	Fecha de creación
updatedAt	Fecha de actualización
Movimiento
Campo	Descripción
id	Identificador único
productId	Producto asociado
tipo	Tipo de movimiento
cantidad	Cantidad movida
descripcion	Descripción o motivo
createdAt	Fecha de creación
updatedAt	Fecha de actualización
Flujo de ramas

El equipo trabajó con un flujo de ramas para organizar el desarrollo.

main                   → versión final / entrega
dev                    → rama de integración
rama-santiago           → autenticación JWT y ajustes generales
alumno2-rodrigoCopreni  → funcionalidades asignadas
alumno3-JuanRamirez     → funcionalidades asignadas
alumno4-agustinPascuali → funcionalidades asignadas
alumno5-AgustinCepeda   → funcionalidades asignadas

La rama main se mantiene como versión final.
Los cambios se integran primero en dev y luego se pasan a main cuando el proyecto está probado.

Comandos útiles

Ver estado de contenedores:

docker-compose ps

Ver logs del backend:

docker-compose logs -f backend

Ver logs del frontend:

docker-compose logs -f frontend

Reiniciar backend:

docker-compose restart backend

Reiniciar frontend:

docker-compose restart frontend

Entrar al contenedor del backend:

docker-compose exec backend sh

Detener servicios:

docker-compose down

Detener servicios y borrar datos:

docker-compose down -v
Pruebas realizadas

Se probaron las siguientes funcionalidades:

Registro de usuario.
Login de usuario.
Acceso al perfil con token JWT.
Redirección en caso de token inválido.
Creación de usuario con contraseña válida.
Listado de productos.
Listado de categorías.
Registro de movimientos.
Ejecución de migraciones.
Ejecución de seeders.
Levantamiento completo del proyecto con Docker.
Problemas resueltos durante el desarrollo

Durante el desarrollo se resolvieron varios problemas comunes:

Configuración de Docker Desktop en Windows.
Permisos de push al repositorio original.
Creación de repositorio propio del grupo.
Organización de ramas main, dev y ramas por alumno.
Corrección de autenticación JWT.
Corrección de imports y exports en React.
Corrección de rutas entre frontend y backend.
Ejecución de migraciones para crear tablas faltantes.
Adaptación de respuestas del backend para evitar errores con .map() en React.
Mejora visual básica del frontend.
Estado del proyecto

El sistema se encuentra funcional para la entrega del trabajo práctico.

Permite autenticación de usuarios y gestión básica de inventario mediante productos, categorías y movimientos de stock.

Autores

Proyecto desarrollado por el Grupo 12 para la materia Programación 3.