import axios from 'axios';

const url = `/api/users`;

const fetchUser = async email => {
  const { data } = await axios.get(`${url}/${email}`);
  return data;
};

export { fetchUser };
