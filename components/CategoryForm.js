import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createCategory, updateCategory } from '../api/categoryData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function CategoryForm({ categoryObj, refresh }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (categoryObj.id) {
      setFormInput(categoryObj);
    }
  }, [categoryObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryObj.id) {
      updateCategory(formInput).then(() => refresh());
    } else {
      const payload = {
        ...formInput,
      };
      console.warn(payload);
      createCategory(payload).then(() => {
        refresh();
        setFormInput(initialState);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a new category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add text"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">{categoryObj.id ? 'Update' : 'Create'} Category</Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};

export default CategoryForm;
