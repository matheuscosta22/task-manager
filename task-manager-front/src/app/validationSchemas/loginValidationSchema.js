import React from "react";
import * as yup from "yup";
import { validateEmail } from "../helpers/validateEmail";

yup.addMethod(yup.string, "verifyEmail", function fn(errorMessage) {
    return this.test(`email-validation`, errorMessage, function fn2(value) {
        const { path, createError } = this;

        return validateEmail(value) || createError({ path, message: errorMessage });
    });
});

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email deve ser preenchido")
        .email()
        .verifyEmail(),

    password: yup
        .string()
        .required("Senha deve ser preenchido")
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(50, "Senha deve ter no maximo 255 caracteres"),
});