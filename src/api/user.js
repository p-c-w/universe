import axios from 'axios';

const url = `/api/users`;

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const fetchUser = async email => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/${email}`);
  return data;
};

const updateUserName = async ({ email, name }) => axios.patch(`${VITE_CORS_SERVER_URL}${url}/${email}`, { name });

const updateUserContent = async ({ email, list, value }) =>
  axios.patch(`${VITE_CORS_SERVER_URL}${url}/${email}/${list}`, value);

const updateSubscribeList = async ({ email, newList }) =>
  axios.patch(`${VITE_CORS_SERVER_URL}${url}/${email}`, { subscribe_list: newList });

const useUpdateModifiedAt = async ({ email, list, id, value }) =>
  axios.patch(`${VITE_CORS_SERVER_URL}${url}/${email}/${list}/${id}`, { modified_at: value });

const deleteUserContent = async ({ email, list, id }) =>
  axios.delete(`${VITE_CORS_SERVER_URL}${url}/${email}/${list}/${id}`);

export { fetchUser, updateUserName, updateUserContent, updateSubscribeList, useUpdateModifiedAt, deleteUserContent };
