import { useEffect, useState } from "react";

import { fetcher } from "../../../network/api";

type GetTodoResModel = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

function useGetTodoList() {
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

    if (status !== 200 || !isSuccess || !Array.isArray(data)) {
      alert(message || "Network Error");
      return;
    }
    setTodoList(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { todoList, refetch: fetch };
}

export type { GetTodoResModel };
export default useGetTodoList;
