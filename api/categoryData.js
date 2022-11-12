/* eslint-disable import/prefer-default-export */
export const getAllCategories = () => fetch('http://localhost:8088/categories')
  .then((res) => res.json());

export const getPostsByCategory = (id) => fetch(`http://localhost:8088/posts?category_id=${id}`)
  .then((res) => res.json());

export const createCategory = (category) => fetch('http://localhost:8088/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(category),
});

export const deleteCategory = (id) => fetch(`http://localhost:8088/categories/${id}`, {
  method: 'DELETE',
});
