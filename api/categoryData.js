/* eslint-disable import/prefer-default-export */
export const getAllCategories = () => fetch('http://localhost:8088/categories')
  .then((res) => res.json());
