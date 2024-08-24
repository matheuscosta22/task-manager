export const Roles = {
    DISABLED: 1,
    EMPLOYEE: 2,
    MANAGER: 3,
    ADMIN: 4,
};

export const RoleLabels = {
    [Roles.DISABLED]: 'Desativado',
    [Roles.EMPLOYEE]: 'Funcionário',
    [Roles.MANAGER]: 'Gerente',
    [Roles.ADMIN]: 'Administrador',
};

export function getRolesLabel(role) {
    return RoleLabels[role] || 'Posição desconhecido';
}