const { default: axios } = require("axios");
const express = require("express");
const moment = require("moment");
const databaseStore = require("../database");
let addCartFilePath = [];
let couponsFilePath = [];

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
    const database = [...addCartFilePath];
    tempData = databaseStore.map((ele) => {
      const isCheckCart = database.some((ele) => ele.id === ele.id);
      return {
        ...ele,
        isCart: isCheckCart,
      };
    });
    res.status(200).send(tempData);
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
    const isCheckCart = addCartFilePath.some((ele) => ele?.id === id);
    if (isCheckCart) {
      const data = databaseStore.find((ele) => ele.id === id);
      let tempDatabase = [...addCartFilePath].map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            quantity: quantity,
            price: parseFloat(data.price) * quantity,
          };
        }
        return ele;
      });
      addCartFilePath = tempDatabase;
      res.status(200).send("success");
    } else {
      addCartFilePath.push({
        id: id,
        price: price,
        quantity: quantity,
        discount: 0,
      });
      res.status(200).send("success");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/fetchCartDetails", async (req, res) => {
  try {
    const tempData = [...addCartFilePath].map((ele) => {
      const foundProduct = databaseStore.find(
        (product) => product?.id === ele?.id
      );
      const coupan = [...couponsFilePath]?.find(
        (product) => product?.id === ele?.id
      );
      return {
        ...ele,
        title: foundProduct.title,
        image: foundProduct.image,
        category: foundProduct.category,
        coupanId: coupan?.id ?? null,
      };
    });

    let tempDatas = [...tempData]?.map((ele) => ele.id);
    const coupans = [...couponsFilePath]?.filter((ele) =>
      tempDatas.includes(ele.id)
    );

    const total = tempData?.reduce((totals, item) => {
      let discount = 0;
      if (parseFloat(item?.discount) !== 0) {
        discount = parseFloat(item?.discount) * item?.quantity;
      }
      const total = totals + parseFloat(item.price) - discount;
      return total;
    }, 0);
    res
      .status(200)
      .send({ data: tempData, total: total.toFixed(2), coupan: coupans });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/deleteCartDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const temp = [...addCartFilePath].filter((ele) => ele.id !== parseInt(id));
    addCartFilePath = temp;
    res.status(200).send({ status: "Delete successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/coupans", async (req, res) => {
  try {
    const database = [...couponsFilePath];
    res.status(200).send({ data: database });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/generatecoupans", async (req, res) => {
  const { id, date, discount } = req.body;
  try {
    if (!!id && !!date && !!discount) {
      couponsFilePath.push({
        id: couponsFilePath.length + 1,
        productId: parseInt(id),
        date: date,
        coupan: generateRandomUppercaseString(8),
        discount: parseInt(discount),
      });
      res.status(200).send({ status: "Generate Successfully" });
    } else {
      res.status(404).send("something missing");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/validateCoupan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const database = [...couponsFilePath];
    const databaseTemp = [...addCartFilePath];
    const temp = database.find((ele) => ele.id === parseInt(id));
    if (isDateEqualOrGreaterThanToday(temp?.date)) {
      let tempCartData = databaseTemp.map((ele) => {
        if (ele.id === temp.productId) {
          return {
            ...ele,
            discount: (
              (parseFloat(ele.price) * parseFloat(temp.discount)) /
              100
            ).toFixed(2),
          };
        } else {
          return {
            ...ele,
            discount: 0,
          };
        }
      });
      addCartFilePath = tempCartData;
      res.status(200).send({ status: "Apply Successfully" });
    } else {
      res.status(200).send({ status: "Coupan Expired" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
