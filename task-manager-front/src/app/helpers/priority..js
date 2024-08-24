export const Priority = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4,
};

export const PriorityLabels = {
    [Priority.LOW]: 'Baixa',
    [Priority.MEDIUM]: 'Media',
    [Priority.HIGH]: 'Alta',
    [Priority.URGENT]: 'Urgente',
};

export function getPriorityLabel(status) {
    return PriorityLabels[status] || 'Prioridade desconhecido';
}