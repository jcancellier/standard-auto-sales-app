export const generateReceipt = (customer = {name: 'Joshua'}) => {
    return (
        `
<body>
    <p>Hello ${customer.name}!</p>
</body>
        `
    )
}
