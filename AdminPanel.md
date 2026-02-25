# Guia de Administracion - Strapi Admin Panel

## Acceso al Panel

1. Arranca el backend:
            ```bash
            cd backend
            npm run develop
            ```

2. Anda a http://localhost:1337/admin

3. Inicia sesion con tu usuario administrador

---

## Seccion por seccion: como subir datos

### 1. Header (logo y nombre del sitio)

- **Ruta en admin:** Content Manager > Header (tipo unico)
- **Campos:**
  - `nombreSitio` — Nombre que aparece en el navbar (ej: "TC-750")
  - `logo` — Imagen del logo (click en "Add media", subi la imagen)
  - `links` — Links de navegacion (estos ya estan hardcodeados en el codigo, este campo es opcional)
- **Despues de editar:** Click **Save** y luego **Publish**

### 2. Footer

- **Ruta:** Content Manager > Footer (tipo unico)
- **Campos:**
  - `nombreSitio` — Nombre mostrado en el footer
  - `lema` — Frase o lema del TCU
  - `direccion` — Direccion fisica

### 3. Pagina Principal (Home)

- **Ruta:** Content Manager > Pagina Principal (tipo unico)
- **Campos:**
  - `heroTitulo` — Titulo grande del hero
  - `heroSubtitulo` — Subtitulo del hero
  - `heroImagen` — Imagenes del carrusel hero (multiples)
  - `mision` — Texto de la mision
  - `vision` — Texto de la vision
  - `valores` — Texto de los valores
  - `evento_destacado` — Selecciona un evento existente para destacar en el home

### 4. Sobre el TCU

- **Ruta:** Content Manager > Sobre el TCU (tipo unico)
- **Campos:** `queEs`, `objetivos`, `historia`, `compromiso`, `participacion`, `reflexionCritica`
- Todos son campos de texto. Llenalos con la informacion correspondiente.

### 5. Categorias (necesarias ANTES de crear articulos, eventos, etc.)

- **Ruta:** Content Manager > Categoria
- **Click:** Create new entry
- **Campos:**
  - `nombre` — Nombre de la categoria (ej: "Taller", "Formacion", "Analisis")
  - `seccion` — Selecciona a que seccion pertenece: `articulo`, `investigacion`, `evento`, o `proyecto`
- **Publicar:** Save > Publish
- **Nota:** Crea categorias separadas para cada seccion. Una categoria con `seccion: evento` solo aparecera como filtro en la pagina de Eventos.

### 6. Autores (necesarios ANTES de crear articulos)

- **Ruta:** Content Manager > Autor
- **Click:** Create new entry
- **Campos:**
  - `nombre` — Nombre completo del autor
  - `avatar` — Foto del autor (opcional)
- **Publicar:** Save > Publish

### 7. Articulos (Explora y Aprende)

- **Ruta:** Content Manager > Articulo
- **Click:** Create new entry
- **Campos:**
  - `titulo` — Titulo del articulo
  - `descripcion` — Resumen corto (aparece en la tarjeta)
  - `contenido` — Editor de bloques enriquecido (titulos, parrafos, listas, citas, codigo, imagenes)
  - `portada` — Imagen de portada
  - `fechaPublicacion` — Fecha
  - `categoria` — Selecciona una categoria existente (con `seccion: articulo`)
  - `autor` — Selecciona un autor existente
  - `slug` — Se genera automaticamente del titulo. Podes editarlo.
- **Publicar:** Save > Publish
- **Aparece en:** `/explora-y-aprende` y `/explora-y-aprende/{slug}`

### 8. Investigaciones (Sapere Aude)

- **Ruta:** Content Manager > Investigacion
- **Click:** Create new entry
- **Campos:**
  - `titulo`, `descripcion`, `contenido` — Igual que articulos
  - `fechaPublicacion` — Fecha de publicacion
  - `metodologia` — Selecciona: "Cualitativa", "Cuantitativa", o "Mixta"
  - `metricas` — Click **Add** para agregar metricas de impacto:
    - `etiqueta` — Nombre de la metrica (ej: "participantes")
    - `cantidad` — Numero (ej: 150)
  - `categoria` — Categoria con `seccion: investigacion`
  - `slug` — Automatico
- **Publicar:** Save > Publish
- **Aparece en:** `/sapere-aude` y `/sapere-aude/{slug}`

### 9. Eventos (Vida en Accion + Calendario)

- **Ruta:** Content Manager > Evento
- **Click:** Create new entry
- **Campos:**
  - `titulo`, `descripcion` — Texto basico
  - `imagenes` — Multiples imagenes (galeria del evento)
  - `fecha` — Fecha y hora del evento (**esta fecha se muestra en el Calendario**)
  - `ubicacion` — Donde se realiza
  - `metricas` — Igual que investigaciones
  - `categoria` — Categoria con `seccion: evento`
  - `contenido` — **Zona dinamica**. Podes agregar bloques en cualquier orden:
    - **BloqueTexto** — Texto enriquecido
    - **Galeria** — Imagenes con pie de foto
    - **Testimonio** — Cita, nombre y rol de la persona
    - **AprendizajesClave** — Titulo + contenido de aprendizajes
  - `slug` — Automatico
- **Publicar:** Save > Publish
- **Aparece en:** `/vida-en-accion`, `/vida-en-accion/{slug}` y `/calendario`

### 10. Proyectos

- **Ruta:** Content Manager > Proyecto
- **Click:** Create new entry
- **Campos:**
  - `titulo` — Nombre del proyecto
  - `descripcion` — Descripcion corta (aparece en la tarjeta)
  - `imagenes` — Fotos del proyecto (la primera es la portada)
  - `estado` — Selecciona: `activo`, `por_comenzar`, `en_planificacion`, `completado`
  - `ubicacion` — Donde se realiza
  - `coordinador` — Nombre de quien coordina
  - `horario` — Texto libre (ej: "Sabados, 9:00 - 12:00")
  - `fechaInicio` — Fecha de inicio
  - `fechaFin` — Fecha de fin (opcional)
  - `objetivos` — Click **Add** para cada objetivo:
    - `descripcion` — Texto del objetivo
  - `actividades` — Click **Add** para cada actividad:
    - `descripcion` — Texto de la actividad
  - `metricas` — Click **Add** para cada metrica:
    - `etiqueta` + `cantidad`
  - `categoria` — Categoria con `seccion: proyecto`
  - `contenido` — Zona dinamica (BloqueTexto, Galeria, Testimonio) para contenido adicional
  - `slug` — Automatico
- **Publicar:** Save > Publish
- **Aparece en:** `/proyectos` y `/proyectos/{slug}`

### 11. Mensajes (formulario de contacto)

- **Ruta:** Content Manager > Mensaje
- Aca se almacenan los mensajes que llegan del formulario de contacto (`/contact`)
- Solo lectura — no necesitas crear entradas, los visitantes las crean

### 12. Testimonios de Estudiantes (Mi Experiencia en el TCU)

- **Ruta:** Content Manager > Testimonio Estudiante
- **Click:** Create new entry
- **Campos:**
  - `nombre` — Nombre completo del estudiante (requerido)
  - `rol` — Rol o carrera (ej: "Estudiante de Educacion", "Voluntario comunitario")
  - `cita` — Texto del testimonio (requerido)
  - `foto` — Foto del estudiante (opcional, aparece como avatar circular)
  - `anio` — Ano de participacion (ej: "2024")
- **Publicar:** Save > Publish
- **Aparece en:** `/mi-experiencia`

### 13. Impacto Comunal (metricas globales)

- **Ruta:** Content Manager > Impacto Comunal (tipo unico)
- **Campos:**
  - `titulo` — Titulo de la seccion de impacto
  - `descripcion` — Texto introductorio
  - `metricas` — Click **Add** para cada metrica global:
    - `etiqueta` — Nombre de la metrica (ej: "comunidades alcanzadas")
    - `cantidad` — Numero (ej: 25)
- **Publicar:** Save > Publish
- **Aparece en:** `/impacto-comunal` (parte superior, dashboard de numeros)

### 14. Casos de Impacto

- **Ruta:** Content Manager > Caso de Impacto
- **Click:** Create new entry
- **Campos:**
  - `titulo` — Nombre del caso (requerido)
  - `descripcion` — Resumen corto (aparece en la tarjeta)
  - `comunidad` — Nombre de la comunidad (ej: "La Carpio, San Jose")
  - `imagen` — Foto representativa del caso
  - `metricas` — Click **Add** para metricas especificas del caso
  - `contenido` — Editor de bloques enriquecido (contenido detallado del caso)
  - `slug` — Automatico
- **Publicar:** Save > Publish
- **Aparece en:** `/impacto-comunal` (parte inferior, tarjetas) y `/impacto-comunal/{slug}`

### 15. Manual del Estudiante

- **Ruta:** Content Manager > Manual Estudiante (tipo unico)
- **Campos:**
  - `titulo` — Titulo del manual
  - `descripcion` — Resumen mostrado en la pagina
  - `contenido` — Editor de bloques enriquecido (contenido del manual visible en pantalla)
  - `archivo` — Subi el PDF del manual (click en "Add media", subi el archivo PDF)
- **Publicar:** Save > Publish
- **Aparece en:** `/manual-estudiante` (con boton de descarga del PDF)

### 16. Episodios de Podcast (Desde el Salon del 750)

- **Ruta:** Content Manager > Episodio (Podcast)
- **Click:** Create new entry
- **Campos:**
  - `titulo` — Nombre del episodio (requerido)
  - `descripcion` — Resumen corto
  - `detalles` — Descripcion larga del episodio
  - `fecha` — Fecha de publicacion
  - `spotifyUrl` — Link completo al episodio en Spotify
  - `imagen` — Portada del episodio (opcional)
- **Publicar:** Save > Publish
- **Aparece en:** `/podcast`

---

## Reglas importantes

1. **Siempre publicar:** Despues de guardar (Save), hay que hacer click en **Publish** para que el contenido aparezca en la web publica. Si solo guardas, queda como borrador.

2. **Orden de creacion:**
   - Primero: Categorias y Autores
   - Despues: Articulos, Eventos, Investigaciones, Proyectos
   - Motivo: necesitas categorias/autores existentes para asignarlos

3. **Imagenes:** Strapi las almacena en `backend/public/uploads/`. Se suben directamente desde el editor al hacer click en el campo de media.

4. **Slugs:** Se generan automaticamente del titulo. Si editas el titulo despues, el slug NO cambia automaticamente (para no romper URLs existentes). Podes editarlo manualmente.

5. **Permisos publicos:** Si creas un nuevo content type en el futuro, recorda ir a Settings > Roles > Public y habilitar `find`/`findOne` para que sea visible en la API publica.
