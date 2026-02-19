import { useParams } from "react-router-dom";
import { activities } from "../data/activitiesData";

const ActivityDetailPage = () => {
  const { slug } = useParams();
  const activity = activities.find((act) => act.slug === slug);

  if (!activity) {
    return (
      <section className="activity-detail">
        <h1>Actividad no encontrada</h1>
        <p>La actividad que buscas no existe o ha sido eliminada</p>
      </section>
    );
  }

  return (
    <section className="activity-detail">
      <article>
        <header>
          <div className="activity-meta">
            <span className="activity-category">{activity.category}</span>
            <span className="activity-date">
              {new Date(activity.date).toLocaleDateString()}
            </span>
          </div>
          <h1>{activity.title}</h1>
        </header>

        {activity.coverImage && (
          <div className="activity-featured-image">
            <img src={activity.coverImage} alt={activity.title} />
          </div>
        )}

        <div className="activity-info">
          <div className="info-item">
            <strong>Lugar:</strong>
            <span>{activity.location}</span>
          </div>
          <div className="info-item">
            <strong>Participantes:</strong>
            <span>{activity.participants}</span>
          </div>
          <div className="info-item">
            <strong>Duración:</strong>
            <span>{activity.duration}</span>
          </div>
        </div>

        <div className="activity-content">
          {activity.content.map((section, index) => (
            <div key={index} className={`content-section ${section.type}`}>
              {section.type === "paragraph" && <p>{section.text}</p>}

              {section.type === "images" && (
                <div className="image-gallery">
                  {section.items.map((image, i) => (
                    <figure key={i}>
                      <img src={image.src} alt={image.caption} />
                      <figcaption>{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {section.type === "learnings" && (
                <div className="learnings">
                  <h2>Aprendizajes Clave</h2>
                  <ul>
                    {section.items.map((learning, i) => (
                      <li key={i}>{learning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {section.type === "testimonials" && (
                <div className="testimonials">
                  <h2>Testimonios</h2>
                  {section.items.map((testimonial, i) => (
                    <blockquote key={i}>
                      <p>{testimonial.quote}</p>
                      <footer>
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.role}</span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {activity.gallery && activity.gallery.length > 0 && (
          <div className="activity-gallery">
            <h2>Galería de Imágenes</h2>
            <div className="gallery-grid">
              {activity.gallery.map((image, index) => (
                <figure key={index}>
                  <img src={image.src} alt={image.caption} />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="activity-tags">
          {activity.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
};

export default ActivityDetailPage;
