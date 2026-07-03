import React, { useEffect, useMemo, useState } from 'react';
import * as postService from '../../api/postService';
import PostCard from '../pages/PostCard'; // We'll create this
import SearchBar from '../../components/SearchBar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const lc = (s) => (s || '').toLowerCase();
  const filtered = useMemo(() => {
    const q = lc(search);
    if (!q) return posts;
    return posts.filter((p) => {
      const title = lc(p.title);
      const content = lc(p.content);
      const author = lc(p.author?.name || p.user?.username);
      const category = lc(p.category);
      return (
        title.includes(q) || content.includes(q) || author.includes(q) || category.includes(q)
      );
    });
  }, [posts, search]);

  const suggestions = useMemo(() => {
    const q = lc(search);
    if (!q) return [];
    return posts
      .filter((p) => lc(p.title).includes(q))
      .slice(0, 5);
  }, [posts, search]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
<div className="home-page **w-full** mx-auto p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          suggestions={suggestions}
          onSelectSuggestion={(s) => setSearch(s.title)}
          placeholder="Search articles, tags, authors…"
        />
      </div>

      <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((post) => <PostCard key={post._id} post={post} searchTerm={search} />)
        ) : (
          <p className="text-gray-600">No posts available yet. Create one!</p>
        )}
        
      </div>
    </div>
  );
};

export default Home;
