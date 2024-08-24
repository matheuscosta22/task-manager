import React from "react";
import * as yup from "yup";

export const projectValidationSchema = yup.object().shape({
    title: yup
        .string()
        .required("Título deve ser preenchido")
        .min(2, "Título deve ter no mínimo 6 caracteres")
        .max(255, "Título deve ter no maximo 255 caracteres"),

    description: yup
        .string()
        .required("Descrição deve ser preenchido")
        .min(5, "Descrição deve ter no mínimo 6 caracteres")
        .max(255, "Descrição deve ter no maximo 255 caracteres"),

    status: yup
        .number()
        .required("status deve ser preenchido"),

    priority: yup
        .number()
        .required("status deve ser preenchido"),

    responsible_id: yup
        .number()
        .required("Responsável deve ser preenchido"),

    due_date: yup
        .date()
        .required("Data de vencimento deve ser preenchida"),
});