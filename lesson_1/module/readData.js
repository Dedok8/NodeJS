import data from "../data.json" with { type: "json" };

function readData(role) {
  return data[role];
}

export default readData;
