"use client";

import {
    Box,
    Container,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import SkeletonRows from "../../skeletonRows";
import { GetTasks, GetTasksByProjectId } from "@/app/api/TasksApi";
import EditTaskDialog from "../../tasks/editTaskDialog";
import { getStatusLabel } from "@/app/helpers/status.";
import { getPriorityLabel } from "@/app/helpers/priority.";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});


export default function ProjectsTasks({projectId}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emptyTasks, setEmptyTasks] = useState(false);
    const [selectedTaskForEdit, setSelectedTaskForEdit] = useState(null);
    const [pageApi, setPageApi] = useState(1);
    const router = useRouter();


    const handleEditClose = () => {
        setSelectedTaskForEdit(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetTasksByProjectId(projectId, pageApi);
                if (response.status === 401) {
                    router.push("/login");
                }

                if (response.data.meta.total === 0) {
                    setEmptyTasks(true);
                } else {
                    setData(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageApi, router]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "An error occurred", {
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
    }, [error]);

    const customMenuItems = [
        { label: "Projetos", onClick: () => router.push("/projects") },
        { label: "Tarefas", onClick: () => router.push("/tasks") },
        { label: "Usuários", onClick: () => router.push("/users") },
    ];

    return (
        <>
            <ToastContainer />
            <Header title="Tarefas" menuItems={customMenuItems} />
            <Container>
                {emptyTasks && !loading && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            className={poppins.className}
                        >
                            Nenhuma tarefa disponível!
                        </Typography>
                    </Box>
                )}
                {!emptyTasks && !loading && (
                    <Box
                        px={4}
                        pb={4}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <TableContainer
                            component={Paper}
                            sx={{ boxShadow: "1px 4px 20px rgba(0, 0, 0, 0.39)" }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Prioridade</TableCell>
                                        <TableCell>Data de vencimento</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading && <SkeletonRows skeletonRowsLength={3} />}
                                    {!loading &&
                                        data.data?.map((task) => (
                                            <TableRow key={task.id} onClick={() => setSelectedTaskForEdit(task)}>
                                                <TableCell>{task.title}</TableCell>
                                                <TableCell>{getStatusLabel(task.status)}</TableCell>
                                                <TableCell>{getPriorityLabel(task.priority)}</TableCell>
                                                <TableCell>{moment(task.due_date).format('DD/MM/YYYY')}</TableCell>
                                            </TableRow>
                                        ))}
                                    {Boolean(selectedTaskForEdit) && (
                                        <EditTaskDialog
                                            task={selectedTaskForEdit}
                                            handleClose={handleEditClose}
                                            openEditDialog={() => Boolean(selectedTaskForEdit)}
                                        />
                                    )}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={!loading ? data?.meta?.totalPages : 1}
                                variant="outlined"
                                shape="rounded"
                                onChange={(e, value) => setPageApi(value)}
                            />
                        </TableContainer>
                    </Box>
                )}
            </Container>
        </>
    );
}