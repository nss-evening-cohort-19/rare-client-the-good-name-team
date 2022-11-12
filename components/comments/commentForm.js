/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { addComment } from '../../managers/comments';

const initialState = {
  id: null,
  author_id: '',
  post_id: '',
  content: '',
};

export const CommentForm = ({ commentObj }) => {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (commentObj.id) {
      setFormInput(commentObj);
    }
  }, [commentObj]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    console.warn(payload);
    addComment(payload).then(() => {
      setFormInput(initialState);
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>New Comment</Form.Label>
        <Form.Control
          type="text"
          placeholder="New Comment"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    author_id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  commentObj: initialState,
};
