// *** NOTE ***
// This function is copied in the client and server for now. It is non-trivial to share it.
// It should eventually be made sharable somehow, but for now changing it in either place
// without cahnging it in the other is super dangerous.
// ************
//
// Creates an id out of an english string by removing spaces and special characters
// and converting to lower case.
// These ids are used to identify surveys, activities, and questions
const idFromString = (string) => string.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();

module.exports = {
  idFromString
}