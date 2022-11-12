import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteComment } from '../../managers/comments';

function CommentsCard({ commentsObj, onUpdate }) {
  const deletThisComment = () => {
    if (window.confirm('Delete comment?')) {
      deleteComment(commentsObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title> Comment:</Card.Title>
        <ul className="list-group">
          <li className="list-group-item">Content: {commentsObj.content}</li>
        </ul>
        <Link href={`/comments/${commentsObj.id}`} passHref>
          <Button size="sm" variant="dark" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* <Link href={`/campaigns/edit/${postsObj.firebaseKey}`} passHref>
          <Button size="sm" variant="dark">
            EDIT
          </Button>
        </Link> */}
        <Button size="sm" variant="danger" onClick={deletThisComment} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CommentsCard.propTypes = {
  commentsObj: PropTypes.shape({
    post_id: PropTypes.number,
    content: PropTypes.string,
    id: PropTypes.number,
    author_id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentsCard;
