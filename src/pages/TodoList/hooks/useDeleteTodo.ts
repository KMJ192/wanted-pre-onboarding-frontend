import { fetcher } from "../../../network/api";

function useDeleteTodo() {
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
