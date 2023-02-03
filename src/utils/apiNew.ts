import axios from "./axios";
import local from "./localStorage";

type Params = {
  method: string;
  url: string;
  body?: any;
  newToken?: string;
  params?: any;
  headers?: any;
};
class ApiJunction {
  makeRequest(params: Params) {
    // let newToken =
    //   params.newToken || local.getItem("newToken")
    //     ? local.getItem("newToken")
    //     : "";
    // // axios.interceptors.request.use(setHeaders(token));
    // if (newToken) {
    //   axios.defaults.headers.common["Authorization"] = `Token ${newToken}`;
    // }

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
}

export default new ApiJunction();
