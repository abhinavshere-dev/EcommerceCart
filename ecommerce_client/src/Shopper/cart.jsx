import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [products, setProducts] = useState({});
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/api/fetchCartDetails");
      setProducts(data);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const couponcodeapply = async () => {
    try {
      const { data } = await axios.get("/api/validateCoupan/" + coupon);
      setStatus(data.status);
      fetchCart();
    } catch (e) {
      // console.log(e);
    }
  };

  function handleCouponChange(event) {
    setCoupon(event.target.value);
  }

  const handlecount = async (selectData, quantity) => {
    if (quantity === 0) {
      handleDeleteItems(selectData.id);
    } else {
      try {
        await axios.post("/api/addCart", {
          id: selectData.id,
          quantity: quantity,
          price: selectData.price,
        });
        fetchCart();
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const handleDeleteItems = async (id) => {
    try {
      await axios.delete("/api/deleteCartDetails/" + id);
      fetchCart();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="flex items-center justify-between p-2 bg-dark text-white bg-black">
        <div
          className="cursor-pointer h3 text-lg"
          data-testid="shopper"
          onClick={() => navigate("/")}
        >
          Shopper
        </div>
        <div className="flex gap-4">
          <p
            data-testid="generate-coupan"
            onClick={() => navigate("/generate-coupan")}
            className="cursor-pointer"
          >
            Generate Coupan
          </p>
          <button className="bg-gray border rounded-md px-2 py-1 relative">
            Your Cart
            <span className="bi bi-cart4"></span>
            <span className="absolute top-[-5px] end-[-5px] bg-[red] rounded-[50%] w-[13px] h-[13px] text-[10px] flex justify-center items-center font-extrabold">
              {products?.data?.length}
            </span>
          </button>
        </div>
      </header>
      <section className="mt-3 flex md:flex-row flex-col gap-[50px] p-5">
        <aside className="md:w-[75%] w-full">
          <div>
            <label className="fw-bold">Your Cart</label>
            <table className="table table-hover w-full mt-3">
              <tbody>
                {products?.data?.map((item, i) => {
                  return (
                    <tr key={item.id} className="border p-2">
                      <td className="flex items-center gap-3 p-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[50px] rounded-md"
                        />
                        <span className="heading-text max-w-[100px] h-[45px]">
                          {item.title}
                        </span>
                      </td>

                      <td>
                        <span>
                          {(item.price - item.discount * item.quantity).toFixed(
                            2
                          )}
                        </span>
                      </td>
                      <td>
                        <div className="text-[green]">
                          {item.discount !== 0 && "Coupan Applied"}
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="inline-flex gap-5 items-center border rounded-md px-3">
                          <button
                            value={i}
                            data-testid="decrement"
                            className="btn btn-danger"
                            onClick={() => handlecount(item, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            value={i}
                            data-testid="increment"
                            className="btn btn-danger"
                            onClick={() => handlecount(item, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </aside>
        <div
          className="md:w-[25%] w-full max-w-[300px] ms-auto"
          style={{ position: "sticky", top: "10px" }}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Apply Coupon</h4>
              <div className="input-group mb-3 mt-3 flex gap-2 w-full">
                <select
                  data-testid="selectcoupan"
                  className="bg-white border rounded-md px-4 py-1 text-[14px] w-full"
                  value={coupon}
                  onChange={handleCouponChange}
                >
                  <option value="">Select a Coupon</option>
                  {products?.coupan?.map((ele) => {
                    return (
                      <option key={ele.id} value={ele.id}>
                        {ele.discount}% {ele.coupan}
                      </option>
                    );
                  })}
                </select>
                <button
                  disabled={coupon === ""}
                  data-testid= "applyCoupan"
                  className="bg-black text-white rounded-md px-2 py-1 text-[13px]"
                  onClick={() => couponcodeapply()}
                >
                  Apply
                </button>
                <p>{status}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Total Price:-</p>
            <p>{products?.total ?? 0}</p>
          </div>
          <div className="mt-3">
            <button className="bg-black border text-white font-bold w-full py-1 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
