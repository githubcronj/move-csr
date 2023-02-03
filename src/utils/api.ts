import axios from "./axios";
import local from "./localStorage";

type Params = {
  method: string;
  url: string;
  body?: any;
  token?: string;
  params?: any;
  headers?: any;
};
class ApiJunction {
  makeRequest(params: Params) {
    let token = params.token ? params.token : "";
    // ? local.getItem("moveeasytoken")
    // : "86d05b139800b9f32a01e3a568b353ffd39919bb";
    // axios.interceptors.request.use(setHeaders(token));
    // console.log(token);
    if (token && token !== "") {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }

    // axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;
    axios.defaults.headers.common["Content-Type"] = `application/json`;
    axios.defaults.headers.patch["Content-Type"] = `application/json`;
    // axios.defaults.headers.post['header1'] = 'value'
    // return axios[params.method](params.url, params.body)
    if (params.method === "get") {
      return axios.get(params.url, { params: params.params });
    } else if (params.method === "post") {
      return axios
        .post(params.url, params.body)
        .then((res: any): any => {
          if (res.code === 200) {
            return res.data;
          }
          return res;
        })
        .then((err) => {
          return err;
        });
    } else if (params.method === "put") {
      return axios.put(params.url, params.body);
    } else if (params.method === "delete") {
      return axios.delete(params.url, params.body);
    } else if (params.method === "patch") {
      return axios.patch(params.url, params.body, params.headers);
    } else {
      return { success: false, msg: "No method provided, get, post?" };
    }
  }

  login(params: Params) {
    return axios.post(params.url, params.body);
  }

  getWihoutToken(params: Params) {
    return axios.get(params.url);
  }
}

// function setHeaders(token) {
//     return function (config) {

//         let tokenHeader = `Bearer ${token}`
//         config.headers['Authorization'] = tokenHeader;
//         config.headers['Content-Type'] = 'application/json';

//         return config;
//     };
// }

export default new ApiJunction();
