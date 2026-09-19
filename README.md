# Tarea 1 - API

## Datos del estudiante

**Nombre:** Dilan Zamora Sánchez
**Carné:** 2019167464

## Estado del proyecto

Finalizado.

## Enlace del video

(https://youtu.be/qk22P7i32U0)

---

# Introducción

En esta tarea se realizó una API REST utilizando Node.js y una base de datos SQL Server.

Como parte del trabajo también se utilizó Linux. En este caso se utilizó Ubuntu por medio de WSL 2 en Windows.

SQL Server se ejecutó utilizando Docker dentro de Ubuntu. Después se restauró la base de datos AdventureWorks2022 y se crearon los procedimientos CRUD.

La API fue realizada con Node.js y Express. Para realizar la conexión con SQL Server se utilizó la librería `mssql`.

El objetivo principal fue conocer de manera práctica cómo una aplicación puede comunicarse con una base de datos por medio de servicios web.

---

# Tecnologías utilizadas

Para realizar la tarea se utilizaron las siguientes herramientas:

- Windows
- WSL 2
- Ubuntu 26.04 LTS
- Docker Engine
- SQL Server 2022 Developer
- AdventureWorks2022
- Node.js
- Express
- Librería `mssql`
- Git
- GitHub
- curl para realizar pruebas

---

# Estructura general del proyecto

La forma en que se conectan las herramientas es la siguiente:

```text
Windows
   |
   v
WSL 2
   |
   v
Ubuntu
   |
   +----------------------+
   |                      |
   v                      v
Node.js / Express       Docker
   |                      |
   |                      v
   |                SQL Server 2022
   |                      |
   +--------------------->|
                          v
                  AdventureWorks2022
```

La API recibe una petición, por ejemplo `GET`, `POST`, `PUT` o `DELETE`.

Después Node.js se conecta con SQL Server y ejecuta un procedimiento almacenado.

Los procedimientos almacenados son los que realizan las operaciones sobre la base de datos.

---

# Estructura del repositorio

El proyecto fue organizado utilizando la plantilla proporcionada para la tarea.

```text
Tare-1_BasesDatos2/
│
├── Script sql/
│   ├── readme.md
│   └── procedures.sql
│
├── codigo/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── categoriaController.js
│   │   ├── routes/
│   │   │   └── categoriaRoutes.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── proyectos/
├── .gitignore
└── README.md
```

## Explicación de los archivos principales

### `Script sql/procedures.sql`

Contiene los procedimientos almacenados utilizados en SQL Server.

### `codigo/src/config/database.js`

Contiene la configuración utilizada para conectarse con SQL Server.

### `codigo/src/controllers/categoriaController.js`

Contiene las funciones que reciben las solicitudes de la API y llaman a los procedimientos almacenados.

### `codigo/src/routes/categoriaRoutes.js`

Contiene las rutas disponibles en la API.

### `codigo/src/server.js`

Es el archivo que inicia el servidor de Node.js y Express.

### `.env`

Contiene los datos necesarios para conectarse con SQL Server.

Este archivo no se sube al repositorio porque contiene información privada como la contraseña.

---

# Instalación

## 1. Instalar WSL

Para utilizar Linux desde Windows se utilizó WSL 2.

Primero se abre PowerShell como administrador.

Para ver las distribuciones disponibles se puede utilizar:

```powershell
wsl --list --online
```

Después se instala Ubuntu:

```powershell
wsl --install -d Ubuntu
```

Al terminar la instalación se reinicia la computadora.

Para comprobar que Ubuntu está utilizando WSL 2:

```powershell
wsl -l -v
```

El resultado debe ser parecido a:

```text
NAME       STATE       VERSION
Ubuntu     Running     2
```

Para entrar a Ubuntu desde PowerShell:

```powershell
wsl
```

---

# 2. Verificar Ubuntu

Dentro de Ubuntu se puede revisar la versión instalada con:

```bash
cat /etc/os-release
```

También se puede comprobar la arquitectura:

```bash
uname -m
```

En este proyecto se trabajó con:

```text
x86_64
```

---

# 3. Actualizar Ubuntu

Antes de instalar otros programas se actualizaron los paquetes:

```bash
sudo apt update
sudo apt upgrade -y
```

También se instalaron algunas herramientas básicas:

```bash
sudo apt install git curl wget ca-certificates gnupg -y
```

---

# 4. Instalación de Docker

Docker se utilizó para ejecutar SQL Server dentro de Linux.

Primero se instalaron los paquetes necesarios:

```bash
sudo apt install -y ca-certificates curl
```

Se creó la carpeta para las llaves:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Se descargó la llave oficial de Docker:

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
-o /etc/apt/keyrings/docker.asc
```

Se dieron permisos de lectura:

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Se agregó el repositorio de Docker:

```bash
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

Luego se actualizaron los paquetes:

```bash
sudo apt update
```

Se instaló Docker:

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Para comprobar la instalación:

```bash
docker --version
```

También:

```bash
docker compose version
```

Y una prueba sencilla:

```bash
docker run hello-world
```

Si aparece:

```text
Hello from Docker!
```

Docker está funcionando correctamente.

---

# 5. Instalar SQL Server 2022

Se descargó la imagen de SQL Server 2022:

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

Se creó un volumen para mantener los datos:

```bash
docker volume create sqlserver_data
```

Luego se creó el contenedor:

```bash
docker run \
-e "ACCEPT_EULA=Y" \
-e "MSSQL_SA_PASSWORD=TU_CONTRASENA" \
-e "MSSQL_PID=Developer" \
-p 1433:1433 \
--name sqlserver \
--hostname sqlserver \
-v sqlserver_data:/var/opt/mssql \
-d \
mcr.microsoft.com/mssql/server:2022-latest
```

`TU_CONTRASENA` debe cambiarse por una contraseña propia.

Para comprobar que SQL Server está funcionando:

```bash
docker ps
```

También se pueden revisar los mensajes del servidor:

```bash
docker logs sqlserver
```

Debe aparecer un mensaje parecido a:

```text
SQL Server is now ready for client connections
```

Si el contenedor está detenido se puede iniciar con:

```bash
docker start sqlserver
```

---

# 6. Instalar AdventureWorks2022

Se descargó la base de datos AdventureWorks2022:

```bash
curl -L -o AdventureWorks2022.bak \
https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2022.bak
```

Se creó una carpeta para el respaldo dentro del contenedor:

```bash
docker exec sqlserver mkdir -p /var/opt/mssql/backup
```

Después se copió el archivo al contenedor:

```bash
docker cp AdventureWorks2022.bak \
sqlserver:/var/opt/mssql/backup/AdventureWorks2022.bak
```

Para revisar los nombres internos del respaldo:

```bash
docker exec -it sqlserver \
/opt/mssql-tools18/bin/sqlcmd \
-S localhost \
-U sa \
-C
```

Después de ingresar a `sqlcmd`, se puede ejecutar:

```sql
RESTORE FILELISTONLY
FROM DISK='/var/opt/mssql/backup/AdventureWorks2022.bak';
GO
```

Los nombres utilizados fueron:

```text
AdventureWorks2022
AdventureWorks2022_log
```

Luego se restauró la base de datos:

```sql
RESTORE DATABASE AdventureWorks2022
FROM DISK='/var/opt/mssql/backup/AdventureWorks2022.bak'
WITH MOVE 'AdventureWorks2022'
TO '/var/opt/mssql/data/AdventureWorks2022.mdf',
MOVE 'AdventureWorks2022_log'
TO '/var/opt/mssql/data/AdventureWorks2022_log.ldf';
GO
```

Para verificar que la base fue creada:

```sql
SELECT name FROM sys.databases;
GO
```

Debe aparecer:

```text
AdventureWorks2022
```

Para salir de `sqlcmd`:

```text
EXIT
```

---

# Procedimientos almacenados

Para realizar el CRUD se utilizó la tabla:

```text
Production.ProductCategory
```

También se utilizó:

```text
Production.ProductSubcategory
```

para realizar la consulta con `JOIN`.

Los procedimientos almacenados creados fueron:

```text
sp_ListarCategorias
sp_InsertarCategoria
sp_ActualizarCategoria
sp_EliminarCategoria
sp_CategoriasConSubcategorias
```

El archivo se encuentra en:

```text
Script sql/procedures.sql
```

Para ejecutar el archivo se puede utilizar:

```bash
docker exec -i sqlserver \
/opt/mssql-tools18/bin/sqlcmd \
-S localhost \
-U sa \
-C \
-d AdventureWorks2022 \
< "Script sql/procedures.sql"
```

---

# Funcionamiento de la API

La API utiliza el puerto:

```text
3000
```

SQL Server utiliza el puerto:

```text
1433
```

Las operaciones disponibles son:

| Método | Ruta                      | Función                            |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/categorias`         | Mostrar categorías                 |
| GET    | `/api/categorias/detalle` | Mostrar categorías y subcategorías |
| POST   | `/api/categorias`         | Insertar una categoría             |
| PUT    | `/api/categorias/:id`     | Modificar una categoría            |
| DELETE | `/api/categorias/:id`     | Eliminar una categoría             |

---

# Configuración de Node.js

Primero se debe entrar a la carpeta del código:

```bash
cd codigo
```

Después se instalan las dependencias:

```bash
npm install
```

Se debe crear un archivo llamado:

```text
.env
```

Se puede utilizar como ejemplo:

```text
.env.example
```

El contenido debe tener esta forma:

```env
DB_USER=sa
DB_PASSWORD=TU_CONTRASENA
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=AdventureWorks2022
PORT=3000
```

La contraseña debe cambiarse por la contraseña utilizada al crear SQL Server.

El archivo `.env` no debe subirse a GitHub.

---

# Iniciar la API

Primero se revisa que SQL Server esté activo:

```bash
docker ps
```

Si no está activo:

```bash
docker start sqlserver
```

Luego se entra a la carpeta:

```bash
cd codigo
```

Y se inicia la API:

```bash
npm start
```

Debe aparecer:

```text
Servidor ejecutándose en http://localhost:3000
```

---

# Pruebas de funcionamiento

Se puede abrir una segunda terminal de Ubuntu para realizar las pruebas.

## Consultar categorías

```bash
curl http://localhost:3000/api/categorias
```

Ejemplo de resultado:

```json
[
  {
    "ProductCategoryID": 1,
    "Name": "Bikes"
  },
  {
    "ProductCategoryID": 2,
    "Name": "Components"
  }
]
```

---

## Consulta con JOIN

```bash
curl http://localhost:3000/api/categorias/detalle
```

Esta consulta muestra categorías junto con sus subcategorías.

Ejemplo:

```json
{
  "ProductCategoryID": 1,
  "Categoria": "Bikes",
  "ProductSubcategoryID": 1,
  "Subcategoria": "Mountain Bikes"
}
```

---

# Insertar una categoría

```bash
curl -X POST http://localhost:3000/api/categorias \
-H "Content-Type: application/json" \
-d '{"name":"Categoria Prueba"}'
```

Ejemplo de respuesta:

```json
{
  "mensaje": "Categoría insertada correctamente",
  "ProductCategoryID": 6
}
```

El número del ID puede cambiar.

---

# Modificar una categoría

Si el registro creado tiene ID `6`:

```bash
curl -X PUT http://localhost:3000/api/categorias/6 \
-H "Content-Type: application/json" \
-d '{"name":"Categoria Modificada"}'
```

Resultado esperado:

```json
{
  "mensaje": "Categoría actualizada correctamente"
}
```

Se debe utilizar el ID que fue devuelto al hacer el `POST`.

---

# Eliminar una categoría

Utilizando el mismo ID:

```bash
curl -X DELETE http://localhost:3000/api/categorias/6
```

Resultado esperado:

```json
{
  "mensaje": "Categoría eliminada correctamente"
}
```

---

# Datos de prueba

Para probar el proyecto se puede utilizar el siguiente dato:

```json
{
  "name": "Categoria Prueba"
}
```

El orden de prueba recomendado es:

1. Insertar la categoría con `POST`.
2. Revisar que exista utilizando `GET`.
3. Modificar el nombre utilizando `PUT`.
4. Revisar nuevamente con `GET`.
5. Eliminarla utilizando `DELETE`.
6. Utilizar nuevamente `GET` para comprobar que fue eliminada.

Siempre se debe utilizar el ID que SQL Server devuelve después del `POST`.

---

# Resumen del CRUD

El proyecto permite realizar las cuatro operaciones principales:

```text
CREATE  -> POST
READ    -> GET
UPDATE  -> PUT
DELETE  -> DELETE
```

Estas operaciones no se realizan directamente en Node.js.

Node.js recibe la solicitud y llama al procedimiento almacenado correspondiente en SQL Server.

---

# Consulta con JOIN

Además del CRUD se realizó una consulta utilizando:

```text
Production.ProductCategory
Production.ProductSubcategory
```

Las tablas se relacionan mediante:

```text
ProductCategoryID
```

El procedimiento utilizado es:

```text
sp_CategoriasConSubcategorias
```

La consulta se puede probar con:

```bash
curl http://localhost:3000/api/categorias/detalle
```

---

# Comandos útiles

Entrar a Ubuntu desde PowerShell:

```powershell
wsl
```

Apagar completamente WSL:

```powershell
wsl --shutdown
```

Ver contenedores activos:

```bash
docker ps
```

Ver todos los contenedores:

```bash
docker ps -a
```

Iniciar SQL Server:

```bash
docker start sqlserver
```

Detener SQL Server:

```bash
docker stop sqlserver
```

Revisar los mensajes de SQL Server:

```bash
docker logs sqlserver
```

Iniciar la API:

```bash
cd codigo
npm start
```

---

# Seguridad

El archivo `.env` no se incluye en GitHub porque contiene la contraseña de SQL Server.

Por esta razón se incluye solamente:

```text
.env.example
```

El archivo `.gitignore` evita subir archivos que no son necesarios o que contienen información privada, por ejemplo:

```text
.env
node_modules/
AdventureWorks2022.bak
```

Las dependencias de Node.js se pueden volver a instalar utilizando:

```bash
npm install
```

La base AdventureWorks también se puede descargar nuevamente utilizando el comando indicado anteriormente.

---

# Conclusión

Con esta tarea se trabajó con varias herramientas nuevas.

Primero fue necesario preparar Linux utilizando WSL 2. Después se utilizó Docker para ejecutar SQL Server dentro de Ubuntu.

Luego se restauró la base de datos AdventureWorks2022 y se crearon procedimientos almacenados para realizar las operaciones CRUD.

Finalmente se creó una API con Node.js y Express para poder utilizar esos procedimientos mediante peticiones HTTP.

La parte más importante para comprender el funcionamiento fue ver cómo se conectan las diferentes herramientas. La API recibe una solicitud, se conecta con SQL Server y ejecuta el procedimiento almacenado correspondiente.

De esta forma fue posible realizar consultas, inserciones, modificaciones y eliminaciones desde la API.
