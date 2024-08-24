import { Bounce, toast } from "react-toastify";
import api from "./Api";

function notifyFail(message = "Não foi possível efetuar o registro") {
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

export async function GetResponsibles() {
    try {
        const response = await api.get(
            "/responsibles/user",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function CreateUser(name, role, email, password) {
    try {
        const response = await api.post(
            "/users",
            {
                name: name,
                role: role,
                email: email,
                password: password,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status == 201) {
            toast.success("Resgistro efetuado com sucesso", {
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

        } else {
            notifyFail();
        }
        return response;
    } catch (err) {
        notifyFail();
        return err;
    }
}


export async function UpdateUser(id, name, role, email) {
    try {
        const response = await api.put(
            "/users/" + id,
            {
                name: name,
                role: role,
                email: email
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status == 200) {
            toast.success("Resgistro efetuado com sucesso", {
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

        } else {
            notifyFail();
        }
        return response;
    } catch (err) {
        notifyFail();
        return err;
    }
}
export async function GetUsers(page = 1, limit = 10) {
    try {
        const response = await api.get(
            "/users?page=" + page + "&per_page=" + limit,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}