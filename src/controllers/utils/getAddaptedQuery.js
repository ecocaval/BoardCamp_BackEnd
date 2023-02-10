export function getAddaptedQuery(
    table, filterOption,
    order, desc,
    offset, limit,
    query, parameters
) {

    if (Object.values(filterOption)[0]) {
        if (table === "rentals") {
            query += ` WHERE rentals."${Object.keys(filterOption)[0]}" = $1`;
            parameters.push(Object.values(filterOption)[0])
        } else {
            query += ` WHERE ${Object.keys(filterOption)[0]} LIKE $1`
            parameters.push(`${Object.values(filterOption)[0]}%`)
        }
    }

    if (order) {
        query += ` ORDER BY ${order}${(desc ? ' DESC' : '')}`
    }

    if (offset) {
        query += " OFFSET $" + (parameters.length + 1)
        parameters.push(offset)
    }

    if (limit) {
        query += " LIMIT $" + (parameters.length + 1)
        parameters.push(limit)
    }

    return query
}