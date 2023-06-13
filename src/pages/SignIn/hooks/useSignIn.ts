import { useNavigate } from "react-router-dom";
import { fetcher } from "../../../network/api";

function useSignIn() {
  const navigate = useNavigate();

  const signIn = async (userInfo: { email: string; password: string }) => {
    const { email, password } = userInfo;
    const response = await fetcher({
      method: "POST",
      url: "/auth/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });

    const { isSuccess, message, data } = response;
    if (isSuccess) {
      const { access_token: token } = data;
      window.localStorage.setItem("token", token);
      navigate("/todo");
    }

    if (message.length > 0) {
      alert(message);
    }
  };

  return { signIn };
}

export default useSignIn;
