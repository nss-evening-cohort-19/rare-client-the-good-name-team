/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllCategories, deleteCategory } from '../../api/categoryData';
import CategoryForm from '../../components/CategoryForm';

export default function AllCategoriesPage() {
  const [category, setCategory] = useState([]);

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
      <h2>Categories</h2>
      <Table striped bordered hover>
        <tbody>
          {
            category?.map((categories) => (
              <tr>
                <td> <Button>Edit</Button> <Button variant="danger" onClick={() => deleteCategory(categories.id).then(() => refresh())}>Delete</Button>
                </td>
                <div className="categories">
                  {`${categories.label}`}
                </div>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <CategoryForm refresh={refresh} />
    </>
  );
}
