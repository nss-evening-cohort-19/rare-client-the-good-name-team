import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deletePost } from '../api/postData';

export default function PostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => {
        onUpdate();
        window.location.reload();
      });
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '5%' }}>
      <Card.Body>
        <div> {postObj.title}</div>
        <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '400px' }} />
        <Link href={`/posts/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/posts/edit/${postObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    category_id: PropTypes.number,
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
