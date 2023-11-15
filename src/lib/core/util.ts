const currencyFormatter = new Intl.NumberFormat('en-us', {
    useGrouping: true,
    compactDisplay: 'short',
    style: "currency",
    currency: "ILS",
})

export const currency = (value: number | bigint) => {return currencyFormatter.format(value)} ;