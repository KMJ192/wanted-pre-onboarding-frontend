import { useNavigate } from "react-router-dom";

import { fetcher } from "../../../network/api";

function useDeleteTodo() {
  const navigate = useNavigate();

  const deleteTodo = async (id: number) => {
    const token = window.localStorage.getItem("token");

    const response = await fetcher({
      method: "DELETE",
      url: `todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { isSuccess, status, message } = response;

    if (status === 401) {
      window.localStorage.removeItem("token");
      navigate("/signin");
      return;
    }

    if (status !== 204 || !isSuccess) {
      alert(message);
      return false;
    }

    return true;
  };

  return {
    deleteTodo,
  };
}

export default useDeleteTodo;
