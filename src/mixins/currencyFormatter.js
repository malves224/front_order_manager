const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export default function formatCurrency(value) {
    return formatterBRL.format(value);
}

export function formatCents(cents) {
    const money = cents / 100;
    return formatCurrency(money);
}
