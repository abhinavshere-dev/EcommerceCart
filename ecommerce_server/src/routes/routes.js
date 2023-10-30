const { default: axios } = require("axios");
const express = require("express");
const {
  readData,
  writeData,
  readCouponsData,
  writeCouponsData,
} = require("../database");
const moment = require("moment");

const router = express.Router();

function generateRandomUppercaseString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function isDateEqualOrGreaterThanToday(dateString) {
  const today = moment();
  const inputDate = moment(dateString, "YYYY-MM-DD");
  return inputDate.isSameOrAfter(today, "day");
}

router.get("/products", async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const database = readData();
    tempData = data.map((ele) => {
      const isCheckCart = database.some((ele) => ele.id === ele.id);
      return {
        ...ele,
        isCart: isCheckCart,
      };
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/addCart", async (req, res) => {
  const { id, quantity, price } = req.body;
  if (!id || !quantity || !price) {
    res.send("some attributes missing");
  }

  try {
    const database = readData();
    const isCheckCart = database.some((ele) => ele.id === id);
    if (isCheckCart) {
      let tempDatabase = [...database].map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            quantity: quantity,
            price: parseFloat(price) * quantity,
          };
        }
        return ele;
      });
      writeData(tempDatabase);
      res.status(200).send("success");
    } else {
      database.push({
        id: id,
        price: price,
        quantity: quantity,
        discount: 0,
      });
      writeData(database);
      res.status(200).send("success");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/fetchCartDetails", async (req, res) => {
  try {
    const database = [...readData()];
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const tempData = database.map((ele) => {
      const foundProduct = data.find((product) => product.id === ele.id);
      return {
        ...ele,
        title: foundProduct.title,
        image: foundProduct.image,
        category: foundProduct.category,
      };
    });
    const total = tempData.reduce((totals, item) => {
      const total = totals + item.price + item.discount;
      return total;
    }, 0);
    res.status(200).send({ data: tempData, total: total });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/deleteCartDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const database = [...readData()];
    const temp = database.map((ele) => ele.id !== id);
    writeData(temp);
    res.status(200).send({ status: "Delete successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/coupans", async (req, res) => {
  try {
    const database = [...readCouponsData()];
    res.status(200).send({ data: database });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/generatecoupans", async (req, res) => {
  const { id, date, discountPercentage } = req.body;
  if (!id || !date || !discountPercentage) {
    res.send("something missing");
  }
  try {
    const database = [...readCouponsData()];

    database.push({
      id: database.length + 1,
      productId: id,
      date: date,
      coupan: generateRandomUppercaseString(8),
      discountPercentage: discountPercentage,
    });
    writeCouponsData(database);
    res.status(200).send({ status: "Generate Successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/validateCoupan/:id", async (req, res) => {
  const {id} = req.params;
  try {
      const database = [...readCouponsData()];
      const databaseTemp = [...readData()];
      const temp = database.find((ele) => ele.id === parseInt(id));
    if (isDateEqualOrGreaterThanToday(temp?.date)) {
      databaseTemp.map((ele) => {
        if (ele.id === temp.productId) {
          return {
            ...ele,
            discount:
              parseFloat(ele.price) -
              (parseFloat(ele.price) * parseFloat(temp.discountPercentage)) /
                100,
          };
        } else {
          return {
            ...ele,
            discount: 0,
          };
        }
      });
      res.status(200).send({ status: "Apply Successfully" });
    } else {
      res.status(200).send({ status: "validate express" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
