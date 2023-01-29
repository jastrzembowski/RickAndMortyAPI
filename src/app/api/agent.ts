import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://rickandmortyapi.com/api/";
const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as any;
    switch (status) {
      case 400:
        console.log(data.title);
        break;
      case 401:
        console.log(data.title);
        break;
      case 404:
        console.log(data.title);
        break;
      case 500:
        console.log(data.title);
        break;

      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
};
const Catalog = {
  list: (params: URLSearchParams) => requests.get("character/", params),
  details: (id: number) => requests.get(`character/${id}`),
};

const agent = { Catalog };

export default agent;
