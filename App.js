import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Load saved posts on initial render
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('anonymousPosts')) || [];
    const initializedPosts = savedPosts.map(post => ({
      ...post,
      relateCount: typeof post.relateCount === 'number' ? post.relateCount : 0,
    }));
    setPosts(initializedPosts);
  }, []);

  // Save posts to localStorage whenever posts update
  useEffect(() => {
    localStorage.setItem('anonymousPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        content: newPost,
        relateCount: 0,
      };
      setPosts([...posts, newPostObj]);
      setNewPost('');
    }
  };

  const handleRelateClick = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          relateCount: post.relateCount + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <h1 className="title">Anonymous Voices</h1>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p>{post.content}</p>
            <button
              className="relate-button"
              onClick={() => handleRelateClick(post.id)}
            >
              I Relate ({post.relateCount})
            </button>
          </div>
        ))}
      </div>

      <div className="input-section">
        <textarea
          className="input-box"
          value={newPost}
          onChange={handlePostChange}
          placeholder="Share your thoughts..."
        />
        <button className="post-button" onClick={handlePostSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default App;