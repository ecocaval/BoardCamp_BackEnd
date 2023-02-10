export function validateCustomerBody(req, res, next) {

    const dateRegex = new RegExp("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")

    const { name, phone, cpf, birthday } = structuredClone(req.sanitizedBody)

    const nameValidation = name ? (name !== "") : true
    const phoneValidation = phone ? (phone.length === 10 || phone.length === 11) : true
    const dateValidation = birthday ? dateRegex.test(birthday) : true
    const cpfValidation = cpf ? cpf.length === 11 : true

    if (!nameValidation || !phoneValidation || !dateValidation || !cpfValidation) return res.sendStatus(400)

    next()
}