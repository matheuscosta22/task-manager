"use client";

import {
    Box,
    Button,
    Container,
    IconButton,
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
import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
import { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import SkeletonRows from "../skeletonRows";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { getStatusLabel } from "../../helpers/status.";
import { getPriorityLabel } from "../../helpers/priority.";
import { GetProjects } from "../../api/ProjectsApi";
import Header from "../header";
import CreateProjectDialog from "./createProjectDialog";
import EditProjectDialog from "./editProjectDialog";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});



export default function Projects() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emptyProjects, setEmptyProjects] = useState(false);
    const [selectedProjectForEdit, setSelectedProjectForEdit] = useState(null);
    const [openCreateProject, setOpenCreateProject] = useState(false);
    const [pageApi, setPageApi] = useState(1);
    const router = useRouter();

    const handleCreateClose = () => {
        setOpenCreateProject(null);
    };

    const handleEditClose = () => {
        setSelectedProjectForEdit(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetProjects(pageApi);
                if (response.status === 401) {
                    router.push("/login");
                }

                if (response.data.meta.total === 0) {
                    setEmptyProjects(true);
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
        { label: "Tarefas", onClick: () => router.push("/tasks") },
        { label: "Usuários", onClick: () => router.push("/users") },
    ];

    return (
        <>
            <ToastContainer />
            <Header title="Projetos" menuItems={customMenuItems} />
            <Container>
                {emptyProjects && !loading && (
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
                            Nenhum projeto disponível!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenCreateProject(true)}
                        >
                            Cadastrar Projeto
                        </Button>
                        {Boolean(openCreateProject) && (
                            <CreateProjectDialog
                                handleClose={handleCreateClose}
                                openCreateDialog={() => Boolean(openCreateProject)}
                            />
                        )}
                    </Box>
                )}
                {!emptyProjects && !loading && (
                    <Box
                        px={4}
                        pb={4}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <Box width="100%" display="flex" justifyContent="flex-end" mb={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenCreateProject(true)}
                            >
                                Cadastrar Projeto
                            </Button>
                        </Box>
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
                                        <TableCell>Tarefas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading && <SkeletonRows skeletonRowsLength={3} />}
                                    {!loading &&
                                        data.data?.map((project) => (
                                            <TableRow key={project.id} onClick={() => setSelectedProjectForEdit(project)}>
                                                <TableCell>{project.title}</TableCell>
                                                <TableCell>{getStatusLabel(project.status)}</TableCell>
                                                <TableCell>{getPriorityLabel(project.priority)}</TableCell>
                                                <TableCell>{moment(project.due_date).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() =>
                                                            router.push("/projects/tasks?project_id=" + project.id)
                                                        }
                                                    >
                                                        <FormatListNumberedSharpIcon sx={{ color: "#ff0000" }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    {Boolean(openCreateProject) && (
                                        <CreateProjectDialog
                                            handleClose={handleCreateClose}
                                            openCreateDialog={() => Boolean(openCreateProject)}
                                        />
                                    )}
                                    {Boolean(selectedProjectForEdit) && (
                                        <EditProjectDialog
                                            project={selectedProjectForEdit}
                                            handleClose={handleEditClose}
                                            openEditDialog={() => Boolean(selectedProjectForEdit)}
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