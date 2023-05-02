import axios from 'axios';

const url = `/api/users`;

const fetchUser = async email => {
  const { data } = await axios.get(`${url}/${email}`);
  return data;
};

const updateUserName = async ({ email, name }) => axios.patch(`${url}/${email}`, { name });

const updateUserContent = async ({ email, list, value }) => axios.patch(`${url}/${email}/${list}`, value);

const updateSubscribeList = async ({ email, newList }) => axios.patch(`${url}/${email}`, { subscribe_list: newList });

const deleteUserContent = async ({ email, list, id }) => axios.patch(`${url}/${email}/${list}/${id}`);

export { fetchUser, updateUserName, updateUserContent, updateSubscribeList, deleteUserContent };
