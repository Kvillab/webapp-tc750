import { useState } from "react";
import ActivityCard from "../components/ActivityCard";
import { activities } from "../data/activitiesData";

const ActivitiesPage = () => {
  const [filter, setFilter] = useState("all");

  const categories = [
    "all",
    ...new Set(activities.map((activity) => activity.category)),
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.category === filter);

  return (
    <section className="activities-page">
      <div className="page-header">
        <h1>Vida en Acción</h1>
        <p>
          Actividades, aprendizajes y testimonios de nuestro trabajo en
          comunidad
        </p>
      </div>

      <div className="activities-intro">
        <p>
          "Agere Aude" significa "Atrévete a actuar". En esta sección
          compartimos las experiencias y aprendizajes de nuestro trabajo con las
          comunidades en la defensa de la educación pública.
        </p>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category === "all" ? "Todas" : category}
          </button>
        ))}
      </div>

      <div className="activities-grid">
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="no-results">
          <p>No se encontraron actividades en esta categoría</p>
        </div>
      )}
    </section>
  );
};

export default ActivitiesPage;
