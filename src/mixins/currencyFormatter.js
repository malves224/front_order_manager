const formmaterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export default function formatCurrency(value) {
    return formmaterBRL.format(value)
}