import axios from 'axios';

export const dataGet = async (options, setData) => {
  try {
    const response = await axios.request(options);
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};
