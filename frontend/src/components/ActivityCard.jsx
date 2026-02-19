import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card">
      {activity.coverImage && (
        <div className="activity-image">
          <img src={activity.coverImage} alt={activity.title} />
        </div>
      )}
      <div className="activity-content">
        <div className="activity-meta">
          <span className="activity-category">{activity.category}</span>
          <span className="activity-date">
            {new Date(activity.date).toLocaleDateString()}
          </span>
        </div>
        <h3 className="activity-title">
          <Link to={`/vida-en-accion/${activity.slug}`}>{activity.title}</Link>
        </h3>
        <p className="activity-excerpt">{activity.excerpt}</p>
        <div className="activity-details">
          <span>📍 {activity.location}</span>
          <span>👥 {activity.participants}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
