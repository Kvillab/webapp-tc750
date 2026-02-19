import { useState } from "react";
import "../assets/styles/podcast.css";

// Ejemplo de datos de episodios
const episodes = [
  {
    id: 1,
    title: "Hablemos sobre la Salud Mental",
    date: "2025-10-10",
    description:
      "Exploramos la importancia de la salud mental en la sociedad actual de los estudiantes.",
    details:
      "En este episodio abordaremos el Día de la Salud Mental, celebrado cada 10 de octubre, como un espacio de reflexión sobre el verdadero significado de la salud mental en la vida cotidiana y su impacto en la sociedad actual pero principalmente en la población joven.",
    spotifyUrl: "https://open.spotify.com/episode/6SqjI2xr3bQ64FXgRnaWSG?si=d0aa59cceb854045",
  },
  {
    id: 2,
    title: "Día Internacional de la Paz",
    date: "2025-09-21",
    description:
      "La importancia de cuestionarnos sobre cómo los conflictos actuales evidencian que el mundo aún está lejos de alcanzar una cultura de paz.",
    details:
      "Abordaremos el Día Internacional de la Paz, celebrado cada 21 de septiembre, como un espacio para reflexionar sobre el verdadero significado de la paz en la vida cotidiana y en la sociedad global.",
    spotifyUrl: "https://open.spotify.com/episode/4ZSrtX9uQ1FgNEhU3AjfV0?si=0c52182dc9394dcf",
  },
];

const Podcast = () => {
  const [selected, setSelected] = useState(episodes[0]);

  const handleEpisodeClick = (ep) => {
    window.open(ep.spotifyUrl, "_blank");
    setSelected(ep);
  };

  return (
    <div className="podcast-page">
      <section className="podcast-header">
        <h1>Desde el salón del 750</h1>
        <p>
          Escucha y participa en nuestro podcast sobre educación pública y temas
          sociales.
        </p>
      </section>

      <section className="podcast-episodes">
        <h2>Episodios recientes</h2>
        <ul className="episode-list">
          {episodes.map((ep) => (
            <li
              key={ep.id}
              className={selected.id === ep.id ? "active" : ""}
              onClick={() => handleEpisodeClick(ep)}
            >
              <span className="episode-title">{ep.title}</span>
              <span className="episode-date">
                {new Date(ep.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="podcast-detail">
        <h2>{selected.title}</h2>
        <p className="podcast-desc">{selected.description}</p>
        <div className="podcast-info">
          <p>{selected.details}</p>
          <a
            href={selected.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-link"
          >
            Escuchar en Spotify
          </a>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
