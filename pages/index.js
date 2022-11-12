// import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <>
      <Link href="/posts/new" passHref>
        <Button variant="info" className="m-2">New Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </>
  );
}

export default Home;
