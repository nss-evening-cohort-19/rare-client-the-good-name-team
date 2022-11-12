/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { getAllCategories, deleteCategory } from '../../api/categoryData';
import CategoryForm from '../../components/CategoryForm';

export default function AllCategoriesPage({ categoryObj, onUpdate }) {
  const [category, setCategory] = useState([]);

  const deleteSingleCategory = () => {
    if (window.confirm(`Delete ${categoryObj.label}?`)) {
      deleteCategory(categoryObj.id).then(() => onUpdate());
    }
  };

  const getCategories = () => {
    getAllCategories(category.id).then(setCategory);
  };

  useEffect(() => {
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => getCategories();

  return (
    <>
      <CategoryForm refresh={refresh} />
      <h2>Categories</h2>
      <Table striped bordered hover>
        <tbody>
          {
            category?.map((categories) => (
              <tr>
                <td> <Button>Edit</Button> <Button variant="danger" onClick={deleteSingleCategory}>Delete</Button> </td>
                <Link href={`/categories/${categories.id}`} passHref>
                  <td>{categories.label}</td>
                </Link>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

AllCategoriesPage.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
