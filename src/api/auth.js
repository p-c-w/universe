import axios from 'axios';

const url = `/api/auth`;

const signIn = async data => {
  const { data: user } = await axios.post(`${url}/signin`, data);
  return user;
};

const signUp = async data => {
  const {
    data: { email, name },
  } = await axios.post(`${url}/signup`, data);

  return { email, name };
};

const signOut = async () => {
  const { data } = await axios.get(`${url}/signout`);

  return data.isLogin;
};

const submitSubscribedOtt = async (email, subscribedOtt) =>
  axios.patch(`${url}/${email}`, { subscribe_list: subscribedOtt });

const deleteUser = async user => {
  const {
    data: { isLogin, message },
  } = await axios.delete(`${url}/withdrawal/${user}`);

  return { isLogin, message };
};

const changePassword = async (email, data) => {
  const { data: message } = await axios.patch(`${url}/changepw`, { email, ...data });
  return message;
};

export { signIn, signUp, signOut, submitSubscribedOtt, deleteUser, changePassword };
