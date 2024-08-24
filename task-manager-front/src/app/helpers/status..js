export const Status = {
    NEW: 1,
    IN_PROGRESS: 2,
    IN_VALIDATION: 3,
    COMPLETED: 4,
    CANCELED: 5,
};

export const StatusLabels = {
    [Status.NEW]: 'Backlog',
    [Status.IN_PROGRESS]: 'Em Progresso',
    [Status.IN_VALIDATION]: 'Em Validação',
    [Status.COMPLETED]: 'Concluído',
    [Status.CANCELED]: 'Cancelado',
};

export function getStatusLabel(status) {
    return StatusLabels[status] || 'Status desconhecido';
}