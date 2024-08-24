import { Bounce, toast } from "react-toastify";
import api from "./Api";

function notifyFail(message = "Não foi possível efetuar login") {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

export default async function LoginApi(email, password) {

  try {
    const response = await api.post(
      "/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );

    if (response.status == 200) {
      toast.success("Login efetuado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      localStorage.setItem("token", response.data.access_token);
      return true;
    } else {
      notifyFail();
    }
  } catch (err) {
    console.log(err);
    notifyFail();
  }
  return false;
}