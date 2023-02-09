export function validateGameBody(req, res, next) {
    const { name, stockTotal, pricePerDay } = structuredClone(req.sanitizedBody)

    if (name === "" || stockTotal === 0 || pricePerDay === 0) return res.sendStatus(400)

    next()
}