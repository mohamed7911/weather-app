import axios from "axios";


export default function Api() {

  
  const appClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      "Accept-Language": "en",
      "Content-Language": "en",
    },
  });

  appClient.interceptors.request.use(config => {
    config.params = {
      ...config.params,
      key: process.env.REACT_APP_API_KEY,
    };
    return config;
  }, error => {
    return Promise.reject(error);
  });


  appClient.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );

  return appClient;
}
