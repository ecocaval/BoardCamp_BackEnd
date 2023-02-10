export async function validateRentalIsFinalized(req, res, next) {

    const { returnDate } = req.rental.rows[0]

    if (returnDate) return res.sendStatus(400)

    next()
}

export async function validateRentalIsNotFinalized(req, res, next) {

    const { returnDate } = req.rental.rows[0]

    if (!returnDate) return res.sendStatus(400)

    next()
}