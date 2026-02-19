import { getData } from './storage';

export const searchContent = (query) => {
  const blogs = getData('blogs') || [];
  const research = getData('research') || [];
  
  if (!query.trim()) return { blogs: [], research: [] };
  
  const lowerQuery = query.toLowerCase();
  
  const blogResults = blogs.filter(blog => 
    blog.title.toLowerCase().includes(lowerQuery) ||
    blog.excerpt.toLowerCase().includes(lowerQuery) ||
    (blog.content && blog.content.some(section => 
      section.text && section.text.toLowerCase().includes(lowerQuery)
    )) ||
    (blog.tags && blog.tags.some(tag => 
      tag.toLowerCase().includes(lowerQuery)
    ))
  );
  
  const researchResults = research.filter(res => 
    res.title.toLowerCase().includes(lowerQuery) ||
    res.excerpt.toLowerCase().includes(lowerQuery) ||
    res.executiveSummary.toLowerCase().includes(lowerQuery) ||
    (res.objectives && res.objectives.some(obj => 
      obj.toLowerCase().includes(lowerQuery)
    )) ||
    (res.keyFindings && res.keyFindings.some(finding => 
      finding.toLowerCase().includes(lowerQuery)
    )) ||
    res.conclusions.toLowerCase().includes(lowerQuery)
  );
  
  return {
    blogs: blogResults,
    research: researchResults
  };
};
