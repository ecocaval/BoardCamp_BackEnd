export function calculateDaysDiff(rentDate, daysRented, returnDate) {
    const shouldReturnDate = structuredClone(rentDate)

    shouldReturnDate.setDate(shouldReturnDate.getDate() + daysRented)

    let daysDiff = 0

    if (shouldReturnDate.getTime() < returnDate.getTime()) {

        let timeDiff = returnDate.getTime() - shouldReturnDate.getTime();

        daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    }

    return daysDiff
}