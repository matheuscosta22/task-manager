"use client";

import {
    Box,
    Button,
    Container,
    Dialog,
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
import SkeletonRows from "../skeletonRows";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import Header from "../header";
import CreateUserDialog from "./createUserDialog";
import EditUserDialog from "./editUserDialog";
import { getRolesLabel } from "@/app/helpers/roles.";
import { GetUsers } from "@/app/api/UsersApi";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

 

export default function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emptyUsers, setEmptyUsers] = useState(false);
    const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
    const [openCreateUser, setOpenCreateUser] = useState(false);
    const [pageApi, setPageApi] = useState(1);
    const router = useRouter();

    const handleCreateClose = () => {
        setOpenCreateUser(null);
    };

    const handleEditClose = () => {
        setSelectedUserForEdit(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetUsers(pageApi);
                if (response.status === 401) {
                    router.push("/login");
                }

                if (response.data.meta.total === 0) {
                    setEmptyUsers(true);
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
    ];

    return (
        <>
            <ToastContainer />
            <Header title="Usuários" menuItems={customMenuItems} />
            <Container>
                {emptyUsers && !loading && (
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
                            Nenhum Usuário disponível!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenCreateUser(true)}
                        >
                            Cadastrar Usuário
                        </Button>
                    </Box>
                )}
                {!emptyUsers && !loading && (
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
                                onClick={() => setOpenCreateUser(true)}
                            >
                                Cadastrar Usuário
                            </Button>
                        </Box>
                        <TableContainer
                            component={Paper}
                            sx={{ boxShadow: "1px 4px 20px rgba(0, 0, 0, 0.39)" }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Posição</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading && <SkeletonRows skeletonRowsLength={3} />}
                                    {!loading &&
                                        data.data?.map((user) => (
                                            <TableRow key={user.id} onClick={() => setSelectedUserForEdit(user)}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{getRolesLabel(user.role)}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                            </TableRow>
                                        ))}
                                    {Boolean(openCreateUser) && (
                                        <CreateUserDialog
                                            handleClose={handleCreateClose}
                                            openCreateDialog={() => Boolean(openCreateUser)}
                                        />
                                    )}
                                    {Boolean(selectedUserForEdit) && (
                                        <EditUserDialog
                                            user={selectedUserForEdit}
                                            handleClose={handleEditClose}
                                            openEditDialog={() => Boolean(selectedUserForEdit)}
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