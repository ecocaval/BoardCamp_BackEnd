export function filterRentalsByStatus(rentals, status) {
    if (status === "open") rentals.rows = rentals.rows.filter(rental => rental.returnDate === null)
    else rentals.rows = rentals.rows.filter(rental => rental.returnDate !== null)

    return rentals
}