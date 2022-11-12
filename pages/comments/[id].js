import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { getCommentByPostId } from '../../managers/comments';
// import { getPostById } from '../../managers/posts';

export default function ViewComments() {
  const [commentDetails, setCommentDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;
  console.warn(commentDetails);
  useEffect(() => {
    getCommentByPostId(id).then(setCommentDetails);
  }, [id]);

  return (
    <>
      <Card style={{ margin: '10px' }}>
        <Container>
          <Row xs={1}>
            <Col xs>Content: {commentDetails.content}</Col>
          </Row>
          <hr />
        </Container>

      </Card>
    </>
  );
}
