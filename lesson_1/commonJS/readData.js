const  data  = require("../data.json");

function readData(role) {
  return data[role];
}

module.exports = readData