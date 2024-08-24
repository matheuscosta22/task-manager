"use client";
import React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { Box, Button, Grid, Icon, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../validationSchemas/loginValidationSchema";
import { useRouter } from "next/navigation";
import LoginApi from "../api/LoginApi";

const defaultTheme = createTheme();

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export default function Login() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginValidationSchema),
    });

    const router = useRouter();
    const [redirect, setRedirect] = React.useState(false);

    const firstErrorMessage = Object.values(errors)[0]?.message;

    React.useEffect(() => {
        if (firstErrorMessage) {
            notifyError();
        }
    }, [firstErrorMessage]);

    React.useEffect(() => {
        if (redirect && localStorage.getItem("token")) {
            router.push("/tasks");
        }
    }, [redirect, router]);

    const notifyError = React.useCallback(() => {
        if (firstErrorMessage) {
            toast.error(firstErrorMessage, {
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
    }, [firstErrorMessage]);

    const onSubmit = async (data) => {
        const response = await LoginApi(data.email, data.password);
        if (response) {
            setRedirect(true);
        }
    };

    return (
        <div>
            <ToastContainer />
            <ThemeProvider theme={defaultTheme}>
                <Container
                    component="main"
                    sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
                >

                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    maxWidth: 400,
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...register("email")}
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    autoComplete="email"
                                                    {...field}
                                                />
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
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            color="success"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3 }}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}