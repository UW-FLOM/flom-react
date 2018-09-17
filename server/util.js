// Creates an id out of an english string by removing spaces and special characters
// and converting to lower case.
// These ids are used to identify surveys, activities, and questions
const idFromString = (string) => string.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();

module.exports = {
  idFromString
}