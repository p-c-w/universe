import axios from 'axios';

const url = `/api/auth`;

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const checkVerify = async () => {
  const res = await axios(`${VITE_CORS_SERVER_URL}${url}/verify`);
  return res.data;
};

const signIn = async data => {
  const { data: user } = await axios.post(`${VITE_CORS_SERVER_URL}${url}/signin`, data);
  return user;
};

const signUp = async data => {
  const {
    data: { email, name },
  } = await axios.post(`${VITE_CORS_SERVER_URL}${url}/signup`, data);

  return { email, name };
};

const signOut = async () => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/signout`);

  return data.isLogin;
};

const submitSubscribedOtt = async (email, subscribedOtt) =>
  axios.patch(`${VITE_CORS_SERVER_URL + url}/${email}`, { subscribe_list: subscribedOtt });

const deleteUser = async user => {
  const {
    data: { isLogin, message },
  } = await axios.delete(`${VITE_CORS_SERVER_URL}${url}/withdrawal/${user}`);

  return { isLogin, message };
};

const changePassword = async (email, data) => {
  const { data: message } = await axios.patch(`${VITE_CORS_SERVER_URL}${url}/changepw`, { email, ...data });
  return message;
};

export { checkVerify, signIn, signUp, signOut, submitSubscribedOtt, deleteUser, changePassword };
