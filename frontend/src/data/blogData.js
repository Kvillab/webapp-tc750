// Estos son datos de ejemplo para el blog
export const blogPosts = [
  {
    id: 1,
    slug: "educacion-popular-en-costa-rica",
    title: "La Educación Popular en Costa Rica: Retos y Oportunidades",
    excerpt:
      "Un análisis de la situación actual de la educación popular en nuestro país y su impacto en las comunidades.",
    category: "Análisis",
    date: "15 de Octubre, 2023",
    author: "María Rodríguez",
    authorAvatar: "/images/example_photo.png",
    image: "/images/logo_example.png",
    tags: ["educación popular", "comunidad", "Costa Rica"],
    content: [
      {
        type: "paragraph",
        text: "La educación popular en Costa Rica ha sido un pilar fundamental en el desarrollo comunitario durante las últimas décadas. Este modelo educativo, inspirado en las ideas de Paulo Freire, busca empoderar a las comunidades a través del conocimiento crítico y la acción transformadora.",
      },
      {
        type: "heading",
        text: "Contexto Histórico",
      },
      {
        type: "paragraph",
        text: "En los años 80, con la crisis económica y el ajuste estructural, surgieron numerosas iniciativas de educación popular como respuesta a la exclusión educativa. Organizaciones comunitarias, iglesias y grupos de base desarrollaron programas alternativos que...",
      },
      {
        type: "quote",
        text: "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo.",
        author: "Paulo Freire",
      },
      {
        type: "image",
        src: "/images/blog/freire.jpg",
        alt: "Paulo Freire",
        caption: "Paulo Freire, padre de la pedagogía crítica",
      },
      {
        type: "heading",
        text: "Situación Actual",
      },
      {
        type: "paragraph",
        text: "Actualmente, la educación popular enfrenta nuevos desafíos. La digitalización, la pandemia y los cambios en las dinámicas comunitarias requieren una adaptación constante...",
      },
    ],
  },
  {
    id: 2,
    slug: "tecnicas-participativas",
    title: "Técnicas Participativas para el Aprendizaje Comunitario",
    excerpt:
      "Exploramos diversas técnicas que fomentan la participación activa en procesos educativos comunitarios.",
    category: "Metodología",
    date: "28 de Septiembre, 2023",
    author: "Carlos Méndez",
    authorAvatar: "/images/example_photo2.png",
    image: "/images/logo_example.png",
    tags: ["metodología", "participación", "herramientas"],
    content: [
      // contenido así de parecido debería ser
    ],
  },
  // más artículos en secuencia
];
