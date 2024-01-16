import React, { useState, useEffect } from "react";
import "./demo.css"
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
    
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='demo'>
      {/* Search */}
      <div className="searchbar">
        <form
          className='searchbar_form'
          onSubmit={handleSubmit}
        >
         <button className="link_btn"
  onClick={(e) => {
    e.preventDefault();
    navigator.clipboard.readText().then((clipText) =>
      setArticle({ ...article, url: clipText })
    );
  }}
>
  <img
    src={linkIcon}
    alt='link-icon'
    className="link_icon"
  />
</button>

          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='searchbar_input' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='searchbar_btn'
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='browse_history'>
  {[...allArticles].reverse().map((item, index) => (
    <div
      key={index}
      onClick={() => setArticle(item)}
      className='link_card'
    >
      <div className='copy_btn' onClick={(e) => {
        e.stopPropagation();
        handleCopy(item.url);
      }}>
        <img
          src={copied === item.url ? tick : copy}
          alt={copied === item.url ? "tick_icon" : "copy_icon"}
          className='copy_icon'
        />
      </div>
      <p className='copy_url'>
        {item.url}
      </p>
    </div>
  ))}
</div>
        
      </div>

      {/* Display Result */}
      <div className='display_result'>
        {isFetching ? (
          <img src={loader} alt='loader' className='loader_img' />
        ) : error ? (
          <p className='error_text'>
            Well, that wasn't supposed to happen...
            <br />
            <span className="error">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='article_summary'>
              <h2 className='header_summary'>
                Article <span className='summary'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='summary_text'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
