import { useNavigate } from "react-router-dom";
import { fetcher } from "../../../network/api";

function useSignUp() {
  const navigate = useNavigate();

  const submit = async (userInfo: { email: string; password: string }) => {
    const { email, password } = userInfo;
    const response = await fetcher({
      method: "POST",
      url: "/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });

    const { isSuccess } = response;
    if (isSuccess) {
      navigate("/signin");
    }

    if (response.message.length > 0) {
      alert(response.message);
    }
  };

  return { submit };
}

export default useSignUp;
