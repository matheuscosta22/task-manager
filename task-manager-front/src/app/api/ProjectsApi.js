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

export async function GetProjectsToTaskSelect() {
    try {
        const response = await api.get(
            "/projects/task/select",
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

export async function GetProjects(page = 1, limit = 10) {
    try {
        const response = await api.get(
            "/projects?page=" + page + "&per_page=" + limit,
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

export async function CreateProject(title, description, status, due_date, responsible_id, priority) {
    try {
        const response = await api.post(
            "/projects",
            {
                title: title,
                description: description,
                status: status,
                due_date: due_date,
                responsible_id: responsible_id,
                priority: priority
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

export async function UpdateProject(id, title, description, status, due_date, responsible_id, priority) {
    try {
        const response = await api.put(
            "/projects/" + id,
            {
                title: title,
                description: description,
                status: status,
                due_date: due_date,
                responsible_id: responsible_id,
                priority: priority,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status == 200) {
            toast.success("Resgistro atualizado com sucesso", {
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