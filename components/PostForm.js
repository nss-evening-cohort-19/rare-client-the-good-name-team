import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../api/postData';
import { getAllCategories } from '../api/categoryData';

const initialState = {
  user_id: null,
  category_id: null,
  title: '',
  publication_date: new Date().toLocaleDateString(),
  image_url: '',
  content: '',
  approved: 1,
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [input, setInput] = useState(initialState);

  const getCategoryData = () => {
    if (obj.id) {
      setInput(obj);
    }
    getAllCategories().then((catData) => setCategories(catData));
  };

  useEffect(() => {
    if (obj.id)setFormInput(obj);
    getCategoryData();
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
      // eslint-disable-next-line no-const-assign
      value = Number(value);
    }
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePost(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput };
      createPost(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Post Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image_url" value={formInput.image_url} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control type="text" placeholder="Content" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Label>Category</Form.Label>
      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className="mb-3" required>
          <option value="">Select a Category</option>
          {categories?.map((category) => (
            <option key={category.id} selected={category.id === input.category_id} value={category.id}>{category.label}</option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Form.Label>Tags</Form.Label>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    category_id: PropTypes.number,
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
