const currencyFormatter = new Intl.NumberFormat('en-us', {
    useGrouping: true,
    compactDisplay: 'short',
    style: "currency",
    currency: "ILS",
})

export const currency = currencyFormatter.format;