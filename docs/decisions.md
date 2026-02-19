# Decisiones de Diseño

## Stack

- **Frontend:** React + Vite
- **Backend:** Strapi (CMS + API)
- **Base de datos:** SQLite (migrar a PostgreSQL si escala)

## Paleta de colores

- Naranja: `#ed741b`
- Turquesa: `#4fb9ab`
- Mostaza: `#fec134`

## Arquitectura

Un solo frontend (no híbrido Astro) → mantenido por 1 persona.

## Contenido (blogs, podcasts, artículos)

Usar admin nativo de Strapi. No reinventar.

## Calendario y Tareas

Librerías existentes:

- `react-big-calendar` → calendario
- `@hello-pangea/dnd` → kanban/tareas

Conectadas a API de Strapi. Viven en el frontend React (no como plugins de Strapi).

## Usuarios y Autenticación

- **Admin de Strapi (RBAC):** para gestionar contenido (blogs, artículos, investigaciones, actividades). Roles: Super Admin, Editor, Author.
- **End Users (Users & Permissions plugin):** para la sección protegida del frontend (kanban, calendario). Autenticación con JWT.

## Estructura de Contenido

### Single Types (una por página, editables desde Strapi)

Todo es editable por el equipo sin intervención técnica.

| Single Type              | Campos principales                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Página Principal         | título hero, subtítulo hero, imagen hero, texto botón 1, texto botón 2, misión, visión, valores, actividad destacada (relación)   |
| Página Explora y Aprende | título, descripción                                                                                                               |
| Página Sapere Aude       | título, descripción                                                                                                               |
| Página Vida en Acción    | título, descripción                                                                                                               |
| Página Sobre el TCU      | subtítulo, qué es el TCU, objetivos (rich text), historia, valores (Compromiso, Participación, Reflexión Crítica con descripción) |
| Página Contacto          | título                                                                                                                            |

### Collection Types

| Collection Type      | Página asociada   | Campos principales                                                                                                                |
| -------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Artículos            | Explora y Aprende | título, slug (UID), descripción corta, contenido (rich text), imagen portada, categoría, fecha publicación, autor (nombre + foto) |
| Investigaciones      | Sapere Aude       | título, slug (UID), descripción, categoría, fecha, metodología, participantes, contenido                                          |
| Actividades          | Vida en Acción    | título, slug (UID), descripción, imagen, categoría, fecha, ubicación, cantidad participantes, contenido (Dynamic Zone)            |
| Mensajes de Contacto | Contacto          | nombre, correo, mensaje, fecha                                                                                                    |

### Relación páginas ↔ contenido

- Las páginas de listado (Explora, Sapere, Vida en Acción) **no** tienen relación directa con su Collection Type. React hace dos llamadas: una al Single Type (header) y otra al Collection Type (listado completo).
- Excepción: **Página Principal** sí tiene relación con Actividades para elegir la actividad destacada.

### Slugs

Se usa el campo tipo **UID** nativo de Strapi, que genera el slug automáticamente basado en el título. No requiere plugins.

### Rutas del frontend

Cada sección tiene página de listado + página de detalle:

- `/explora-y-aprende` → listado | `/explora-y-aprende/:slug` → detalle
- `/sapere-aude` → listado | `/sapere-aude/:slug` → detalle
- `/vida-en-accion` → listado | `/vida-en-accion/:slug` → detalle

## Dynamic Zone — Cuerpo de Actividades

El contenido de una actividad no es un Rich Text plano sino una **Dynamic Zone** que permite al editor componer el cuerpo con bloques estructurados en cualquier orden.

### Por qué Dynamic Zone y no Rich Text

El Rich Text (incluso el editor Blocks de Strapi) no permite tipos de bloque personalizados. Elementos como galería con pie de foto o testimonios requieren estructura propia que Rich Text no puede expresar de forma usable para no-técnicos.

### Componentes disponibles en la Dynamic Zone

| Componente          | Campos                                             |
| ------------------- | -------------------------------------------------- |
| `BloqueTexto`       | `contenido` (Rich Text)                            |
| `Galeria`           | `imagenes[]` → componente repetible `ImagenConPie` |
| `AprendizajesClave` | `titulo` (Text), `items[]` (Text repetible)        |
| `Testimonio`        | `cita` (Text), `nombre` (Text), `rol` (Text)       |

### Componente anidado: ImagenConPie

Usado dentro de `Galeria`. Permite asociar un pie de foto a cada imagen individualmente.

| Campo         | Tipo           |
| ------------- | -------------- |
| `imagen`      | Media (single) |
| `pie_de_foto` | Text           |

### Renderizado en React

La API devuelve la Dynamic Zone como un array. Cada elemento tiene un campo `__component` que identifica su tipo. React itera el array y renderiza el componente visual correspondiente según ese identificador.

### Por qué no Multiple Media para galerías

`Multiple Media` solo almacena archivos sin metadata adicional. No permite asociar texto (pie de foto) a cada imagen individualmente, por eso se usa el componente repetible `ImagenConPie`.

## Decisiones descartadas

| Opción                                   | Razón de descarte                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Astro + React híbrido                    | Mucho overhead para 1 persona                                            |
| Plugins custom Strapi                    | UI rígida, difícil mantener                                              |
| PostgreSQL inicial                       | Innecesario al inicio                                                    |
| Kanban/Calendario dentro de Strapi admin | Requiere plugins custom, mejor en React con librerías existentes         |
| Hardcodear headers de páginas en React   | El equipo necesita editar todo sin intervención técnica                  |
| Rich Text para cuerpo de Actividades     | No soporta bloques personalizados (galería con pie de foto, testimonios) |
| Multiple Media para galerías             | No permite asociar pie de foto por imagen                                |
| Tipos custom en editor Blocks de Strapi  | Los bloques disponibles son fijos, no extensibles sin plugin             |
