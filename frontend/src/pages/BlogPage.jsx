import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getData } from "../utils/storage";
import Pagination from "../components/Pagination";

const BlogPage = () => {
  const [filter, setFilter] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  
  useEffect(() => {
    const storedBlogs = getData('blogs') || [];
    setBlogs(storedBlogs);
  }, []);
  
  const categories = ["all", ...new Set(blogs.map(post => post.category))];
  
  const filteredPosts = filter === "all" 
    ? blogs 
    : blogs.filter(post => post.category === filter);

  // Calcular páginas
  const totalPages = Math.ceil(filteredPosts.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + blogsPerPage);

  return (
    <section className="blog-page">
      <div className="page-header">
        <h1>Explora y Aprende</h1>
        <p>Artículos y reflexiones sobre educación pública y popular</p>
      </div>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => {
              setFilter(category);
              setCurrentPage(1); // Resetear a la primera página al cambiar categoría
            }}
          >
            {category === "all" ? "Todos" : category}
          </button>
        ))}
      </div>
      
      <div className="blog-list">
        {currentPosts.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {currentPosts.length === 0 && (
        <div className="no-results">
          <p>No se encontraron artículos en esta categoría</p>
        </div>
      )}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default BlogPage;
