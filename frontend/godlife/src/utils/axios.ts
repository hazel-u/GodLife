import axios from "axios";

import { refresh, refreshErrorHandle } from "./refresh";

const axiosWithToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosWithToken.interceptors.request.use(refresh, refreshErrorHandle);

export default axiosWithToken;
