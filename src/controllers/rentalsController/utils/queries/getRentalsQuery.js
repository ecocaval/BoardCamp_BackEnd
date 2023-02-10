export const getRentalsQuery = `
    SELECT

    rentals.id,
    rentals."customerId",
    rentals."gameId",
    rentals."rentDate",
    rentals."daysRented",
    rentals."returnDate",
    rentals."originalPrice",
    rentals."delayFee",
    
    json_build_object(
        'id', customers.id,
        'name', customers."name"
    ) AS customer,
    json_build_object(
        'id', games.id,
        'name', games."name"
    ) AS game

    FROM rentals
    INNER JOIN customers ON rentals."customerId" = customers.id
    INNER JOIN games ON rentals."gameId" = games.id;
`