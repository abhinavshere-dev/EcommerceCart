import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function Shopper() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getProductsDetails = async () => {
    try {
      const { data } = await axios.get("/api/products");
      getCartDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCartDetails = async (fetchData) => {
    try {
      const { data } = await axios.get("/api/fetchCartDetails");
      let addProducts = data?.data.map((ele) => ele.id);
      let temData = fetchData?.map((ele) => {
        return {
          ...ele,
          isAdded: addProducts.includes(ele.id),
        };
      });
      setProducts(temData);
      setCartItems(addProducts);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCartClick = async (selectData) => {
    try {
      await axios.post("/api/addCart", {
        id: selectData.id,
        quantity: 1,
        price: selectData.price,
      });
      getCartDetails(products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductsDetails();
  }, []);

  const handleCartToggleClick = () => {
    navigate("/cart", { replace: true });
  };

  return (
    <div className="container-fluid p-0">
      <header className="flex items-center justify-between p-2 bg-dark text-white bg-black">
        <div className="cursor-pointer h3 text-lg" data-testid="shopper" onClick={() => navigate("/")}>Shopper</div>
        <div className="flex gap-4">
          <p
          data-testid="generate-coupan"
            onClick={() => navigate("/generate-coupan")}
            className="cursor-pointer"
          >
            Generate Coupan
          </p>
          <button
            onClick={handleCartToggleClick}
            className="bg-gray border rounded-md px-2 py-1 relative"
          >
            Your Cart
            <span className="bi bi-cart4"></span>
            <span className="absolute top-[-5px] end-[-5px] bg-[red] rounded-[50%] w-[13px] h-[13px] text-[10px] flex justify-center items-center font-extrabold">
              {cartItems.length}
            </span>
          </button>
        </div>
      </header>
      <section className="mt-3 row">
        <main
          className="col-12 flex flex-wrap overflow-auto justify-around"
          style={{ height: "100%" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="card p-2 m-2 w-[200px] border rounded-md bg-[lightgray]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-[150px] m-auto rounded-md"
              />
              <div className="text-[14px] font-bold heading-text">
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <div className="flex justify-between">
                    <dt>Price</dt>
                    <dd>{product.price}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Rating</dt>
                    <dd>
                      <span className="">{product.rating.rate}</span>
                      <span className="bi bi-star-fill text-success"></span>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="card-footer text-right">
                <button
                  disabled={product.isAdded}
                  value={product.id}
                  onClick={() =>
                    !product.isAdded && handleAddToCartClick(product)
                  }
                  className="bg-white text-black text-[15px] font-bold border rounded-md px-2 py-1 mt-2"
                >
                  <span className="bi bi-cart4"></span>{" "}
                  {product.isAdded ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}
