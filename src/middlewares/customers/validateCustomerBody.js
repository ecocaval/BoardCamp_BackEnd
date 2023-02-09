export function validateCustomerBody(req, res, next) {

    const dateRegex = new RegExp("^[0-9]{2}[\/-][0-9]{2}[\/-][0-9]{4}$")
    
    const { name, phone, cpf, birthday } = structuredClone(req.sanitizedBody)

    const nameValidation =  name !== ""
    const phoneValidation = phone.length === 10 || phone.length === 11
    const dateValidation = dateRegex.test(birthday)
    const cpfValidation = cpf.length === 11

    if(!nameValidation || !phoneValidation || !dateValidation || !cpfValidation) return res.sendStatus(400) 

    next()
}