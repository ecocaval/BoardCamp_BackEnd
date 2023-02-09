export function validateDaysRented(req, res, next) {
    const { daysRented } = structuredClone(req.sanitizedBody)
    if (daysRented === 0) return res.sendStatus(400)

    next()    
}