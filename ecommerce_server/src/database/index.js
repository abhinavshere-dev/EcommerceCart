const fs = require("fs");
const addCartFilePath = "./src/database/addCart.json";
const couponsFilePath = "./src/database/coupons.json";

function readData() {
  try {
    const data = fs.readFileSync(addCartFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(addCartFilePath, JSON.stringify(data, null, 2));
}

function readCouponsData() {
  try {
    const data = fs.readFileSync(couponsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCouponsData(data) {
  fs.writeFileSync(couponsFilePath, JSON.stringify(data, null, 2));
}
module.exports = {
  writeData: writeData,
  writeCouponsData: writeCouponsData,
  readData: readData,
  readCouponsData: readCouponsData,
};
