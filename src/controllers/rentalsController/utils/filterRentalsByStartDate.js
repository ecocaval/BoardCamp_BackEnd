export function filterRentalsByStartDate(rentals, startDate) {

    rentals.rows = rentals.rows.filter(rental => {

        const rentDateMilli = new Date(rental.rentDate).getTime()
        const startDateMilli = new Date(startDate).getTime()

        return Number(rentDateMilli) >= Number(startDateMilli)
    })

    return rentals
}