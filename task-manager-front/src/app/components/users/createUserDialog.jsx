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
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser } from "../../api/UsersApi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getRolesLabel, Roles } from "@/app/helpers/roles.";
import { createUserValidationSchema } from "../../validationSchemas/userValidationSchema";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CreateUserDialog({ handleClose, openCreateDialog }) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            role: Roles.EMPLOYEE,
            email: "",
            password: "",
        },
        resolver: yupResolver(createUserValidationSchema),
    });

    const router = useRouter();

    useEffect(() => {
        if (Object.values(errors)[0]?.message) {
            notifyError();
        }
    }, [Object.values(errors)[0]?.message]);

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
        const response = await CreateUser(data.name, data.role, data.email, data.password);
        if (response.status == 401) {
            router.push("/login");
        }
        reset();
    };

    return (
        <>
            <ToastContainer />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openCreateDialog}
            >
                <DialogTitle
                    sx={{ backgroundColor: "#0385FD", m: 0, p: 2 }}
                    id="customized-dialog-title"
                >
                    Criar Usuário
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
                                    name="name"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            {...register("name")}
                                            autoComplete="name"
                                            name="name"
                                            fullWidth
                                            type="text"
                                            id="name"
                                            label="Nome Completo"
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
                                    name="email"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            {...register("email")}
                                            name="email"
                                            fullWidth
                                            type="text"
                                            id="email"
                                            label="Email"
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
                                    name="role"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                            <InputLabel id="role">Posição</InputLabel>
                                            <Select
                                                {...register("role")}
                                                labelId="role"
                                                id="role"
                                                value={value}
                                                label="Posição"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={Roles.DISABLED}>{getRolesLabel(Roles.DISABLED)}</MenuItem>
                                                <MenuItem value={Roles.EMPLOYEE}>{getRolesLabel(Roles.EMPLOYEE)}</MenuItem>
                                                <MenuItem value={Roles.MANAGER}>{getRolesLabel(Roles.MANAGER)}</MenuItem>
                                                <MenuItem value={Roles.ADMIN}>{getRolesLabel(Roles.ADMIN)}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...register("password")}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}