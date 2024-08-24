"use client";

import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateProject } from "../../api/ProjectsApi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getStatusLabel, Status } from "../../helpers/status.";
import { getPriorityLabel, Priority } from "../../helpers/priority.";
import { GetResponsibles } from "../../api/UsersApi";
import moment from "moment";
import { projectValidationSchema } from "@/app/validationSchemas/projectValidationSchema";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function EditProjectDialog({ project, handleClose, openEditDialog }) {
    const {
        control,
        register,
        handleSubmit,
        formState: { isDirty, errors },
        reset
    } = useForm({
        defaultValues: {
            title: project?.title,
            description: project?.description,
            status: project?.status,
            due_date: project?.due_date,
            responsible_id: project?.responsible_id,
            priority: project?.priority,
        },
        resolver: yupResolver(projectValidationSchema),
    });

    const [responsiblesData, setResponsiblesData] = useState([]);
    const [emptyResponsibles, setEmptyResponsibles] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (Object.values(errors)[0]?.message) {
            notifyError();
        }
    }, [Object.values(errors)[0]?.message]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsiblesResponse = await GetResponsibles();
                if (responsiblesResponse.status === 401) {
                    router.push("/login");
                }

                if (responsiblesResponse.data.meta.total === 0) {
                    setEmptyResponsibles(true);
                } else {
                    setResponsiblesData(responsiblesResponse.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    function notifyError() {
        if (Object.values(errors)[0]?.message) {
            console.log(Object.values(errors)[0]?.message);

            toast.error(Object.values(errors)[0].message, {
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
    }

    const onSubmit = async (data) => {
        const response = await UpdateProject(
            project.id, data.title, data.description, data.status, data.due_date, data.responsible_id, data.priority
        );
        if (response.status == 401) {
            router.push("/login");
        }
        setDisableSubmit(true);
        reset(data);
    };

    return (
        <>
            <ToastContainer />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openEditDialog}
            >
                <DialogTitle
                    sx={{ backgroundColor: "#0385FD", m: 0, p: 2 }}
                    id="customized-dialog-title"
                >
                    Projeto
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            {...register("title")}
                                            autoComplete="title"
                                            name="title"
                                            fullWidth
                                            type="text"
                                            id="title"
                                            label="Título"
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            {...register("description")}
                                            name="description"
                                            fullWidth
                                            type="text"
                                            id="description"
                                            label="Descrição"
                                            autoFocus
                                            value={value}
                                            onChange={onChange}
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                            <InputLabel id="status">Status</InputLabel>
                                            <Select
                                                {...register("status")}
                                                labelId="status"
                                                id="status"
                                                value={value}
                                                label="Status"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={Status.NEW}>{getStatusLabel(Status.NEW)}</MenuItem>
                                                <MenuItem value={Status.IN_VALIDATION}>{getStatusLabel(Status.IN_VALIDATION)}</MenuItem>
                                                <MenuItem value={Status.IN_PROGRESS}>{getStatusLabel(Status.IN_PROGRESS)}</MenuItem>
                                                <MenuItem value={Status.COMPLETED}>{getStatusLabel(Status.COMPLETED)}</MenuItem>
                                                <MenuItem value={Status.CANCELED}>{getStatusLabel(Status.CANCELED)}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                            <InputLabel id="priority">Prioridade</InputLabel>
                                            <Select
                                                {...register("priority")}
                                                labelId="priority"
                                                id="priority"
                                                value={value}
                                                label="Prioridade"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={Priority.LOW}>{getPriorityLabel(Priority.LOW)}</MenuItem>
                                                <MenuItem value={Priority.MEDIUM}>{getPriorityLabel(Priority.MEDIUM)}</MenuItem>
                                                <MenuItem value={Priority.HIGH}>{getPriorityLabel(Priority.HIGH)}</MenuItem>
                                                <MenuItem value={Priority.URGENT}>{getPriorityLabel(Priority.URGENT)}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <Controller
                                    name="responsible_id"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                            <InputLabel id="responsible_id">Responsável</InputLabel>
                                            <Select
                                                {...register("responsible_id")}
                                                labelId="responsible_id"
                                                id="responsible_id"
                                                value={value}
                                                label="Responsável"
                                                onChange={onChange}
                                            >
                                                {!loading &&
                                                    responsiblesData.data?.map((responsible) => (
                                                        <MenuItem key={responsible.id} value={responsible.id}>
                                                            {responsible.name}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="due_date"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                {...register("due_date")}
                                                label="Data de vencimento"
                                                value={moment(value)}
                                                onChange={onChange}
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
                            <Button disabled={!isDirty && disableSubmit} variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}