//Time managment - Probably could be in a bigger Utilities section at somepoint.

// Epoc to yyyy-mm-dd readable date
export const dateRead = (date) => {

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() +1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// Readable Date to Epoc
export const dateWrite = (date) => {
    return Date.parse(date);
}