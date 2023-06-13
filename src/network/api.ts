import axios, { AxiosRequestConfig } from "axios";

type ResModel = {
  status: number;
  data: any;
  isSuccess: boolean;
  message: string;
};

const obj = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
});

const fetcher = async (params: AxiosRequestConfig): Promise<ResModel> => {
  const response: ResModel = await obj({
    ...params,
  })
    .then((res) => ({
      status: res.status,
      data: res.data,
      isSuccess: true,
      message: "",
    }))
    .catch((e) => {
      const tmp = e.response?.data?.message ?? "";
      let message = "";
      if (typeof tmp === "string") {
        message = tmp;
      } else if (Array.isArray(tmp)) {
        message = tmp.join(", ");
      }

      return {
        status: e.response?.data?.statusCode ?? 500,
        message,
        data: {},
        isSuccess: false,
      };
    });

  return response;
};

export { fetcher };
