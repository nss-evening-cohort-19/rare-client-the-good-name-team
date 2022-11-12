/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { addComment, getComments, updateComment } from '../../managers/comments';

const initialState = {
  content: '',
  post_id: null,
  author_id: null,
};

function CommentsForm({ obj }) {
  const [commentFormInput, setCommentFormInput] = useState(initialState);
  const [comment, setComment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getComments().then(setComment);
    console.warn(comment);
    if (obj.id) setCommentFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateComment(commentFormInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...commentFormInput };
      addComment(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>
      <FloatingLabel controlId="floatingInput1" label="Label" className="mb-3">
        <Form.Control type="text" placeholder="Comment" name="comment" value={commentFormInput.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Comment</Button>
    </Form>
  );
}

CommentsForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
};

// DEFAULT PROPS
CommentsForm.defaultProps = {
  obj: initialState,
};

export default CommentsForm;
