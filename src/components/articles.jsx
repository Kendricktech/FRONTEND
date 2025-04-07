import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ArticleCard = ({ title, description }) => (
  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg shadow-md w-64 flex-shrink-0 transition transform hover:-translate-y-1 hover:shadow-lg">
    <h3 className="text-lg font-semibold mt-3 text-white">{title}</h3>
    <p className="text-white text-sm mt-2 line-clamp-3">
      {description || title.substring(0, 100) + '...'}
    </p>
  </div>
);


const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/article.xml');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const extractedArticles = Array.from(xmlDoc.getElementsByTagName("article")).map(article => ({
          id: article.getAttribute('id'),
          title: article.querySelector("title")?.textContent || "Untitled Article",
          description: article.querySelector("body")?.textContent.substring(0, 250) + "..."
        }));
        setArticles(extractedArticles);
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to fetch articles:", e);
        setError(e.message);
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === "left" ? -clientWidth : clientWidth, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="relative p-6 w-full max-w-6xl mx-auto">
        <p className="text-gray-400 text-center py-4">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative p-6 w-full max-w-6xl mx-auto">
        <p className="text-red-400 text-center py-4">Error loading articles: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative p-6 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Asset Recovery Articles</h2>
        <a href="/articles" className="text-blue-400 hover:underline text-sm">See all articles →</a>
      </div>

      <div className="relative w-full">
        {articles.length > 0 ? (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-white/10 z-10"
              onClick={() => scroll("left")}
            >
              <ArrowLeft size={20} className="text-white" />
            </button>

            <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scroll-smooth hide-scrollbar">
              {articles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  title={article.title} 
                  description={article.description} 
                />
              ))}
            </div>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-white/10 z-10"
              onClick={() => scroll("right")}
            >
              <ArrowRight size={20} className="text-white" />
            </button>
          </>
        ) : (
          <p className="text-gray-400 text-center py-4">No articles available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedArticles;
