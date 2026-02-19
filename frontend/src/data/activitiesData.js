// Datos de ejemplo para las actividades
export const activities = [
  {
    id: 1,
    slug: "taller-derechos-educativos-2023",
    title: "Taller sobre Derechos Educativos",
    date: "2023-10-15T00:00:00.000Z",
    location: "Comunidad de Santa Ana",
    category: "Taller",
    excerpt:
      "Taller participativo sobre derechos educativos con la comunidad de Santa Ana",
    coverImage: "/images/example_photo.png",
    participants: "25 personas de la comunidad",
    duration: "4 horas",
    content: [
      {
        type: "paragraph",
        text: "El pasado sábado realizamos un taller participativo sobre derechos educativos en la comunidad de Santa Ana. La actividad permitió reflexionar sobre la importancia de la educación pública y los mecanismos para su defensa.",
      },
      {
        type: "images",
        items: [
          {
            src: "/images/example_photo.png",
            caption: "Participantes durante la dinámica grupal",
          },
          {
            src: "/images/example_photo2.png",
            caption: "Presentación de conclusiones",
          },
        ],
      },
      {
        type: "learnings",
        items: [
          "La comunidad identificó los principales retos educativos de la zona",
          "Se establecieron redes de apoyo entre participantes",
          "Se creó un plan de acción comunitario",
        ],
      },
      {
        type: "testimonials",
        items: [
          {
            quote:
              "Este taller nos ayudó a entender mejor nuestros derechos y cómo defenderlos",
            author: "María Rodríguez",
            role: "Madre de familia",
          },
          {
            quote: "Ahora tenemos herramientas concretas para organizarnos",
            author: "Carlos Mora",
            role: "Líder comunal",
          },
        ],
      },
    ],
    tags: ["derechos educativos", "participación", "comunidad"],
    gallery: [
      {
        src: "/images/example_photo.png",
        caption: "Inicio del taller",
      },
      {
        src: "/images/example_photo2.png",
        caption: "Trabajo en grupos",
      },
    ],
  },
];
