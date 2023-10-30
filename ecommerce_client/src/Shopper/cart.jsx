
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Cart(){

       const [products, setProducts] = useState([{id:0, title:'', image:'', price:0, category: '', description: '', rating: {rate:0, count:0}}]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showToggle, setShowToggle] = useState({'display':'none'});
    const [ couponcode , setCuponCode] = useState("");
    const[ quantity , setQuantity] = useState(1);

    
    function GetProducts(url){
        axios.get(url)
        .then(response=>{
            setProducts(response.data);
        })
    }

    function GetCartCount(){
        setCartCount(cartItems.length);
    }

    useEffect(()=>{
        
        GetProducts("http://fakestoreapi.com/products");
        GetCartCount();
    },[GetProducts("http://fakestoreapi.com/products")]);

  
    function handleCartToggleClick(){
        setShowToggle({'display':'block'});
    }

    function handleRemoveClick(e){
        alert(e.currentTarget.value);
      cartItems.splice(e.currentTarget.value,1);
      const index = e.currentTarget.value;
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
      setCartCount(newCartItems.length);
    
        
    }

function couponcodeapply(){
    setCuponCode("Coupon Cide Applied");
}




    const [coupon, setCoupon] = useState(""); 
  const [discountedPrice, setDiscountedPrice] = useState(0);  

  function handleCouponChange(event) {
    setCoupon(event.target.value);
  }

 
  function handledashcount(){
    if (quantity > 0) {
        setQuantity(quantity - 1);
      }
  }   
    
  function handlepluscount(){
    setQuantity(quantity+1);
  }

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between p-2 bg-dark text-white">
        <div className="h3">Shopper.</div>
       
        <div>
          <button onClick={handleCartToggleClick} className="btn btn-light position-relative">
            Your Cart
            <span className="bi bi-cart4"></span>
            <span className="badge position-absolute top-0 end-0 bg-danger rounded rounded-circle">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
      <section className="mt-3 row">
        <aside className="col-8">
          <div style={showToggle}>
            <label className="fw-bold">Your Cart</label>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Preview  <span  style={{ marginLeft: "330px" }}>Price</span></th>
                  <th></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, i) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.title} width="200px" height="150px" /> <span  style={{ marginLeft: "12rem" }}>{item.price}</span>
                      <div>{couponcode}</div>
                    </td>
                    <td className="mt-4">
                      <button value={i} className="btn btn-danger " style={{marginRight:"30px" }} onClick={handledashcount}>
                        <span className="bi bi-dash-circle"></span>
                      </button>
                      <span style={{marginRight:"30px" , marginTop:'50px', display:"inline-block"}}>{quantity}</span>
                      <button value={i} className="btn btn-danger " style={{marginRight:"30px" , }} onClick={handlepluscount}>
                        <span className="bi bi-plus-circle"></span>
                      </button>
                    </td>
                    <td>
                      <button onClick={handleRemoveClick} value={i} className="btn btn-danger " style={{ marginTop:'50px'}}>
                        <span className="bi bi-trash-fill"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
        <div className="col-4 " style={{ position: "sticky", top: "10px" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Apply Coupon</h4>
              <div className="input-group mb-3">
                <select className="form-select" value={coupon} onChange={handleCouponChange}>
                  <option value="">Select a Coupon</option>
                  <option value="SALE10">SALE10 - 10% discount</option>
                  <option value="SAVE20">SAVE20 - 20% discount</option>
                </select>
                <button className="btn btn-danger" onClick={couponcodeapply}>
                  Apply
                </button>
              </div>
              {discountedPrice > 0 && (
                <p className="card-text">
                  Total Price with Discount: ${discountedPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-danger btn-block"> Checkout</button>
          </div>
        </div>
      </section>
    </div>
  );}