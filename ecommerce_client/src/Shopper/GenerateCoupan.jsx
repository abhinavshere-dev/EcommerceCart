import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GenerateCoupan = () => {
  const [productId, setProductId] = useState();
  const [discount, setDiscount] = useState();
  const [dates, setDates] = useState();
  const navigate = useNavigate();

  const handleAsync = async () => {
    try {
      await axios.post("/api/generatecoupans", {
        id: parseInt(productId),
        discount: parseInt(discount),
        date: moment(dates).format("YYYY-MM-DD"),
      });
      toast.success("Generated Successfuly");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button
        data-testid="homenavigate"
        className="bg-black border text-white font-bold w-[150px] py-1 rounded-md absolute top-0 left-0 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
      <div className="flex justify-center items-center min-h-[100vh]">
        <div className="bg-[lightgray] p-3 rounded-md flex flex-col gap-3">
          <div>
            <span>Product id:-</span>
            <input
              className="bg-[white] text-black border rounded-md px-2 text-[14px] py-1 w-full"
              type="text"
              data-testid="productid"
              value={productId}
              placeholder="Enter the Prodcut Id"
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          <div>
            <span>Discout (%):-</span>
            <input
              className="bg-[white] text-black border rounded-md px-2 text-[14px] py-1 w-full"
              type="text"
              data-testid="discount"
              value={discount}
              placeholder="Enter the Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div>
            <span>Enter Expire Date:-</span>
            <input
              className="bg-[white] text-black border rounded-md px-2 text-[14px] py-1 w-full"
              type="date"
              data-testid="Expiredate"
              value={dates}
              placeholder="Enter the expiredate"
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
          <div>
            <button
              data-testid="generatecoupan"
              className="bg-black border text-white font-bold w-full py-1 rounded-md"
              onClick={() => handleAsync()}
            >
              Generate Coupan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCoupan;
