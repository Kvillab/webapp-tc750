import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      {blog.image && (
        <div className="blog-image">
          <img src={blog.image} alt={blog.title} />
        </div>
      )}
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{blog.category}</span>
          <span className="blog-date">{blog.date}</span>
        </div>
        <h3 className="blog-title">
          <Link to={`/explora-y-aprende/${blog.slug}`}>{blog.title}</Link>
        </h3>
        <p className="blog-excerpt">{blog.excerpt}</p>
        <div className="blog-author">
          {blog.authorAvatar && (
            <img src={blog.authorAvatar} alt={blog.author} />
          )}
          <span>{blog.author}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
