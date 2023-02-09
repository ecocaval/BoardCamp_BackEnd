export function buildCustomerQueries({ name, phone, cpf, birthday }) {
    const bodyArray = [{ name }, { phone }, { cpf }, { birthday }]

    const queryArray = [] //* exanple [ 'cpf', '13140363788', 'birthday', '18/02/2000' ]
    let queryIndexString = "" //* example "$1 = $2, $3 = $4"
    let queryIndexCounter = 1 //* to keep track of $1, $2...

    bodyArray.forEach(item => {

        const value = Object.values(item)[0]
        const key = String(Object.keys(item)[0])

        if (value) {
            queryArray.push(value)
            queryIndexString += `${key} = $${queryIndexCounter}, `
            queryIndexCounter++
        }
    })
    
    queryIndexString = queryIndexString.slice(0, -2) //? to remove the last ", "

    return [queryArray, queryIndexString]
}