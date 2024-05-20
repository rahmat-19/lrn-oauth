import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function useLogin() {
  const router = useRouter();

  const [formLogin, setFromLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const login = async (setUserContext) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = (await axios.post("/auth/login", formLogin)).data;
      setCookie("access_token", data.access_token, { maxAge: 60 * 6 * 24 });
      setCookie(
        "user",
        { name: data.name, email: data.email },
        { maxAge: 60 * 6 * 24 }
      );
      const userData = {
        email: data?.email,
        name: data?.name,
        provider: "cardential",
      };
      setUserContext(userData);
      router.push("/about");
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const setValueState = (e) => {
    setFromLogin((preventValue) => ({
      ...preventValue,
      [e.target.name]: e.target.value,
    }));
  };

  const loginGoggle = async () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`, "_self");
  };

  return {
    formLogin,
    loading,
    error,
    login,
    setValueState,
    loginGoggle,
  };
}

export default useLogin;
