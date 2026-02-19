import { eventCategories } from "../data/eventsData";

const EventCard = ({ event }) => {
  const category = eventCategories.find(
    (cat) => cat.id === event.category.toLowerCase()
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "upcoming":
        return "status-upcoming";
      case "ongoing":
        return "status-ongoing";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="event-card">
      {event.image && (
        <div className="event-image">
          <img src={event.image} alt={event.title} />
        </div>
      )}

      <div className="event-content">
        <div className="event-header">
          <span
            className="event-category"
            style={{ backgroundColor: category?.color }}
          >
            {event.category}
          </span>
          <span className={`event-status ${getStatusClass(event.status)}`}>
            {event.status === "upcoming" && "Próximamente"}
            {event.status === "ongoing" && "En curso"}
            {event.status === "completed" && "Finalizado"}
            {event.status === "cancelled" && "Cancelado"}
          </span>
        </div>

        <h3 className="event-title">{event.title}</h3>

        <div className="event-details">
          <div className="detail-item">
            <i className="fas fa-calendar"></i>
            <span>{formatDate(event.startDate)}</span>
          </div>

          <div className="detail-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{event.location}</span>
          </div>

          {event.speaker && (
            <div className="detail-item">
              <i className="fas fa-user"></i>
              <span>{event.speaker}</span>
            </div>
          )}

          {event.capacity && (
            <div className="detail-item">
              <i className="fas fa-users"></i>
              <span>Capacidad: {event.capacity} personas</span>
            </div>
          )}
        </div>

        <p className="event-description">{event.description}</p>

        {event.registration && event.status === "upcoming" && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="registration-button"
          >
            Registrarse
          </a>
        )}

        {event.virtualPlatform && (
          <div className="virtual-info">
            <strong>Evento Virtual:</strong>
            <p>{event.virtualPlatform.requirements}</p>
            {event.status === "upcoming" && (
              <a
                href={event.virtualPlatform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
              >
                Unirse por {event.virtualPlatform.name}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
