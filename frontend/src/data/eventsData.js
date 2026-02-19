export const events = [
  {
    id: 1,
    title: "Taller: Defensa de la Educación Pública",
    startDate: "2025-10-20T14:00:00.000Z",
    endDate: "2025-10-20T17:00:00.000Z",
    location: "Auditorio de Educación, UCR",
    category: "Taller",
    description:
      "Taller participativo sobre mecanismos de defensa de la educación pública.",
    speaker: "Dra. María González",
    capacity: 30,
    registration: true,
    registrationUrl: "https://forms.example.com/registro-taller",
    status: "upcoming",
    image: "/images/example_photo.png",
    requirements: ["Llevar cuaderno y lápiz", "Computadora (opcional)"],
    tags: ["educación", "participación", "derechos"],
  },
  {
    id: 2,
    title: "Foro: Financiamiento de la Educación",
    startDate: "2025-11-05T09:00:00.000Z",
    endDate: "2025-11-05T12:00:00.000Z",
    location: "Virtual - Zoom",
    category: "Foro",
    description:
      "Discusión sobre el estado actual del financiamiento educativo en Costa Rica.",
    speaker: "Panel de expertos",
    capacity: 100,
    registration: true,
    registrationUrl: "https://forms.example.com/registro-foro",
    status: "upcoming",
    virtualPlatform: {
      name: "Zoom",
      link: "https://zoom.us/j/example",
      requirements: "Necesita tener Zoom instalado",
    },
    tags: ["financiamiento", "política educativa"],
  },
];

export const eventCategories = [
  {
    id: "taller",
    name: "Taller",
    color: "#4CAF50",
  },
  {
    id: "foro",
    name: "Foro",
    color: "#2196F3",
  },
  {
    id: "conferencia",
    name: "Conferencia",
    color: "#9C27B0",
  },
  {
    id: "reunion",
    name: "Reunión",
    color: "#FF9800",
  },
];
