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

export async function GetTasks(page = 1, limit = 10) {
    try {
        const response = await api.get(
            "/tasks?page=" + page + "&per_page=" + limit,
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

export async function GetTasksByProjectId(projectId, page = 1, limit = 10) {
    try {
        const response = await api.get(
            "/project/tasks/"+ projectId +"?page=" + page + "&per_page=" + limit,
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

export async function CreateTask(title, description, status, due_date, responsible_id, priority, project_id = null) {
    try {
        const response = await api.post(
            "/tasks",
            {
                title: title,
                description: description,
                status: status,
                due_date: due_date,
                responsible_id: responsible_id,
                priority: priority,
                project_id: project_id
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

export async function UpdateTask(id, title, description, status, due_date, responsible_id, priority, project_id = null) {
    try {
        const response = await api.put(
            "/tasks/" + id,
            {
                title: title,
                description: description,
                status: status,
                due_date: due_date,
                responsible_id: responsible_id,
                priority: priority,
                project_id: project_id
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
