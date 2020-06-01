import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';
let token = null;

const getAllAsync = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAsync = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const putAsync = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: token },
  });
  return response.data;
};

const deleteAsync = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default { getAllAsync, createAsync, setToken, putAsync, deleteAsync };
