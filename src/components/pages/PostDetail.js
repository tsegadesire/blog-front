import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then(res => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostDetail;
