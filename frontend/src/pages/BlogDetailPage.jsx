import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogData";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const blog = blogPosts.find(post => post.slug === slug);
  
  if (!blog) {
    return (
      <section className="blog-detail">
        <h1>Artículo no encontrado</h1>
        <p>El artículo que buscas no existe o ha sido eliminado</p>
      </section>
    );
  }
  
  return (
    <section className="blog-detail">
      <article>
        <header>
          <div className="blog-meta">
            <span className="blog-category">{blog.category}</span>
            <span className="blog-date">{blog.date}</span>
          </div>
          <h1>{blog.title}</h1>
          <div className="blog-author">
            {blog.authorAvatar && (
              <img src={blog.authorAvatar} alt={blog.author} />
            )}
            <span>{blog.author}</span>
          </div>
        </header>
        
        {blog.image && (
          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}
        
        <div className="blog-content">
          {blog.content.map((section, index) => (
            <div key={index} className="blog-section">
              {section.type === "heading" && <h2>{section.text}</h2>}
              {section.type === "paragraph" && <p>{section.text}</p>}
              {section.type === "quote" && (
                <blockquote>
                  <p>{section.text}</p>
                  {section.author && <footer>{section.author}</footer>}
                </blockquote>
              )}
              {section.type === "image" && (
                <div className="blog-image">
                  <img src={section.src} alt={section.alt} />
                  {section.caption && <p className="caption">{section.caption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="blog-tags">
          {blog.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      </article>
      
      <div className="related-posts">
        <h2>Artículos relacionados</h2>
        <div className="related-list">
          {blogPosts
            .filter(post => post.id !== blog.id && post.category === blog.category)
            .slice(0, 3)
            .map(related => (
              <div key={related.id} className="related-item">
                <a href={`/explora-y-aprende/${related.slug}`}>
                  {related.image && <img src={related.image} alt={related.title} />}
                  <h3>{related.title}</h3>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
