import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchContent } from '../utils/search';
import BlogCard from '../components/BlogCard';
import ResearchCard from '../components/ResearchCard';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q');
  
  const [results, setResults] = useState({
    blogs: [],
    research: [],
    loading: true
  });

  useEffect(() => {
    if (searchTerm) {
      const searchResults = searchContent(searchTerm);
      setResults({
        ...searchResults,
        loading: false
      });
    } else {
      setResults({
        blogs: [],
        research: [],
        loading: false
      });
    }
  }, [searchTerm]);

  if (results.loading) {
    return <div className="search-results">Buscando "{searchTerm}"...</div>;
  }

  const totalResults = results.blogs.length + results.research.length;

  return (
    <div className="search-results">
      <h1>Resultados de búsqueda para "{searchTerm}"</h1>
      <p className="results-count">{totalResults} resultados encontrados</p>
      
      {results.blogs.length > 0 && (
        <section className="section-results">
          <h2>Artículos ({results.blogs.length})</h2>
          <div className="blog-list">
            {results.blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}
      
      {results.research.length > 0 && (
        <section className="section-results">
          <h2>Investigaciones ({results.research.length})</h2>
          <div className="research-list">
            {results.research.map(research => (
              <ResearchCard key={research.id} research={research} />
            ))}
          </div>
        </section>
      )}
      
      {totalResults === 0 && (
        <div className="no-results">
          <p>No se encontraron resultados para tu búsqueda.</p>
          <p>Intenta con términos diferentes o más generales.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
