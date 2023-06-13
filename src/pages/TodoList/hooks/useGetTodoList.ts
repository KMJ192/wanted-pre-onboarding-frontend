import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetcher } from "../../../network/api";

type GetTodoResModel = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type UseGetTodoList = {
  todoList: Array<GetTodoResModel>;
  refetchTodoList: () => void;
};

function useGetTodoList(): UseGetTodoList {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState<Array<GetTodoResModel>>([]);

  const fetch = async () => {
    const token = window.localStorage.getItem("token");

    const response = await fetcher({
      method: "GET",
      url: "/todos",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { isSuccess, message, status, data } = response;
    if (status === 401) {
      window.localStorage.removeItem("token");
      navigate("/signin");
      return;
    }

    if (status !== 200 || !isSuccess || !Array.isArray(data)) {
      alert(message || "Network Error");
      return;
    }
    setTodoList(data);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { todoList, refetchTodoList: fetch };
}

export type { GetTodoResModel, UseGetTodoList };
export default useGetTodoList;
