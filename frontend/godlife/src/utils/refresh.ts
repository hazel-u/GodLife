import axios, { AxiosRequestConfig } from "axios";

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  if (config.headers && !config.headers["Authorization"]) {
    config.headers["Authorization"] = `${localStorage.getItem("token")}`;
  }

  const refreshToken = localStorage.getItem("refreshtoken");
  const expireAt = localStorage.getItem("expired");
  // console.log("1");

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (expireAt && parseInt(expireAt) < new Date().getTime() && refreshToken) {
    // console.log("2");

    // 토큰 갱신 서버통신
    await axios
      .get("user/refresh-token", {
        headers: {
          RefreshToken: `${localStorage.getItem("refreshtoken")}`,
        },
      })
      .then((res) => {
        if (!config?.headers) {
          throw new Error(
            `Expected 'config' and 'config.headers' not to be undefined`
          );
        }
        config.headers["Authorization"] = res.headers["authorization"];

        localStorage.setItem("token", res.headers["authorization"]);
        localStorage.setItem("expired", `${new Date().getTime() + 60000 * 2}`);
      })
      .catch((err) => {
        // console.log("!!!!!!!!!!!!!!", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("expired");
        window.location.href = "https://godlife.ssafy.io/login";
      });
  }

  return config;
};

const refreshErrorHandle = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("expired");
};

export { refresh, refreshErrorHandle };
