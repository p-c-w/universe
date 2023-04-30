import axios from 'axios';

const url = `/api/users`;

const fetchUser = async email => {
  const { data } = await axios.get(`${url}/${email}`);
  return data;
};

const updateUser = async user => axios.patch(`${url}/${user.email}`, { ...user });

const updateUserContent = async ({ email, list, value }) => axios.patch(`${url}/${email}/${list}`, value);

export { fetchUser, updateUser, updateUserContent };
