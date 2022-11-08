import axios from 'axios';

const dbUrl = 'http://localhost:8088/categories';

const getAllCategories = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}`)
    .then((categoryArr) => resolve(Object.values(categoryArr.data)))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getAllCategories };
