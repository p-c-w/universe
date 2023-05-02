import axios from 'axios';

const url = `/api/users`;

const fetchUser = async email => {
  const { data } = await axios.get(`${url}/${email}`);
  return data;
};

const updateUserName = async ({ email, name }) => axios.patch(`${url}/${email}`, { name });

const updateUserContent = async ({ email, list, value }) => axios.patch(`${url}/${email}/${list}`, value);

export { fetchUser, updateUserName, updateUserContent };
