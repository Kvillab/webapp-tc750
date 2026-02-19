// Guardar datos en localStorage
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
    return false;
  }
};

// Obtener datos de localStorage
export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
};

// Inicializar datos si no existen
export const initializeStorage = () => {
  if (!getData('blogs')) {
    saveData('blogs', initialBlogs);
  }
  
  if (!getData('research')) {
    saveData('research', initialResearch);
  }
  
  if (!getData('comments')) {
    saveData('comments', []);
  }
  
  if (!getData('users')) {
    saveData('users', [
      {
        id: 1,
        username: 'admin',
        password: 'tcu750admin', // Contraseña por defecto (debe cambiarse)
        role: 'admin'
      }
    ]);
  }
};

// Datos iniciales de ejemplo
const initialBlogs = [
  {
    id: 1,
    slug: "educacion-popular-en-costa-rica",
    title: "La Educación Popular en Costa Rica: Retos y Oportunidades",
    excerpt: "Un análisis de la situación actual de la educación popular en nuestro país y su impacto en las comunidades.",
    category: "Análisis",
    date: "2023-10-15T00:00:00.000Z",
    author: "María Rodríguez",
    authorAvatar: "/images/example_photo.png",
    image: "/images/logo_example.png",
    tags: ["educación popular", "comunidad", "Costa Rica"],
    content: [
      {
        type: "paragraph",
        text: "La educación popular en Costa Rica ha sido un pilar fundamental en el desarrollo comunitario durante las últimas décadas. Este modelo educativo, inspirado en las ideas de Paulo Freire, busca empoderar a las comunidades a través del conocimiento crítico y la acción transformadora."
      },
      {
        type: "heading",
        text: "Contexto Histórico"
      },
      {
        type: "paragraph",
        text: "En los años 80, con la crisis económica y el ajuste estructural, surgieron numerosas iniciativas de educación popular como respuesta a la exclusión educativa. Organizaciones comunitarias, iglesias y grupos de base desarrollaron programas alternativos que..."
      }
    ],
    published: true
  }
];

const initialResearch = [
  {
    id: 1,
    slug: "acceso-educacion-rural",
    title: "Acceso a la Educación en Zonas Rurales de Costa Rica",
    excerpt: "Estudio sobre las barreras de acceso a la educación en comunidades rurales y propuestas de solución.",
    category: "Acceso Educativo",
    date: "2023-10-01T00:00:00.000Z",
    methodology: "Mixta (Cualitativa-Cuantitativa)",
    participants: "12 comunidades, 230 participantes",
    duration: "6 meses",
    executiveSummary: "Esta investigación analizó los principales obstáculos que enfrentan los estudiantes en zonas rurales para acceder a educación de calidad, identificando factores como la distancia, falta de infraestructura y recursos económicos como determinantes.",
    objectives: [
      "Identificar las principales barreras de acceso a la educación en zonas rurales",
      "Evaluar el impacto de la distancia en la deserción escolar",
      "Proponer soluciones basadas en la comunidad"
    ],
    methodologyDetails: "El estudio combinó encuestas a 150 hogares, 8 grupos focales con estudiantes y docentes, y análisis de datos secundarios del Ministerio de Educación Pública. Se seleccionaron comunidades de las 7 provincias con diferentes niveles de acceso.",
    keyFindings: [
      "El 78% de los estudiantes debe recorrer más de 5km diarios para llegar a su centro educativo",
      "El transporte representa el 35% del gasto familiar en educación",
      "La falta de conectividad a internet limita el acceso a recursos digitales en el 92% de los casos"
    ],
    conclusions: "El acceso a la educación en zonas rurales sigue siendo un desafío estructural que requiere intervenciones integrales que consideren transporte, infraestructura y recursos educativos adaptados al contexto local.",
    recommendations: [
      "Implementar un sistema de transporte escolar subsidiado",
      "Desarrollar programas de educación a distancia adaptados a contextos rurales",
      "Fortalecer las bibliotecas comunitarias con recursos digitales y físicos"
    ],
    published: true
  }
];
