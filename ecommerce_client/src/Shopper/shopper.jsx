
import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
export function Shopper(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{id:0, title:'', image:'', price:0, category: '', description: '', rating: {rate:0, count:0}}]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showToggle, setShowToggle] = useState({'display':'none'});
    const navigate=useNavigate()

    function GetCategories(){
        axios.get("http://fakestoreapi.com/products/categories")
        .then(response=>{
            response.data.unshift("all");
            setCategories(response.data);
        });
    }

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
        GetCategories();
        GetProducts("http://fakestoreapi.com/products");
        GetCartCount();
    },[]);

    
    function handleAddToCartClick(e){
        axios.get(`http://fakestoreapi.com/products/${e.target.value}`)
        .then(response=>{
            cartItems.push(response.data);
            alert(`${response.data.title}\nAdded to Cart`);
            GetCartCount();
        })
       
    }

    function handleCartToggleClick(){
        navigate('/cart', { replace: true });
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
    

    return(
        <div className="container-fluid">
            <header className="d-flex justify-content-between p-2 bg-dark text-white">
                <div className="h3">Shopper.</div>
                              <div>
                    <button onClick={ handleCartToggleClick}  className="btn btn-light position-relative">
                      Your Cart
                        <span className="bi bi-cart4"></span>
                        <span className="badge position-absolute top-0 end-0 bg-danger rounded rounded-circle">{cartCount}</span>
                    </button>
                </div>
            </header>
            <section className="mt-3 row">
                <main className="col-12 d-flex flex-wrap overflow-auto" style={{height:'100%'}}>
                   {
                     products.map(product=>
                        <div key={product.id} className="card p-2 m-2" style={{width:'200px'}}>
                            <img src={product.image} className="card-img-top" height="140"/>
                            <div className="card-header overflow-auto" style={{height:'130px'}}>
                                <p>{product.title}</p>
                            </div>
                            <div className="card-body">
                                <dl>
                                    <dt>Price</dt>
                                    <dd>{product.price}</dd>
                                    <dt>Rating</dt>
                                    <dd>
                                        {product.rating.rate}
                                        <span className="bi bi-star-fill text-success"></span>
                                        [{product.rating.count}]
                                    </dd>
                                </dl>
                            </div>
                            <div className="card-footer">
                                 <button value={product.id} onClick={handleAddToCartClick} className="btn btn-danger w-100">
                                    <span className="bi bi-cart4"></span>   Add to Cart
                                 </button>
                            </div>
                        </div>
                        )
                   }
                </main>
                <aside className="col-1">
                   <div style={showToggle}>
                     <label className="fw-bold">Your Cart </label>
                     <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item, i)=>
                                        <tr key={item.id}>
                                        <td><img  src={item.image} width="50" height="50"/></td>
                                        <td>  <button value={i} className="btn btn-danger">
                                                <span className="bi bi-dash-circle"></span>
                                            </button></td><td>
                                       {item.price}</td>
                                        <td>
                                            <button  value={i} className="btn btn-danger">
                                                <span className="bi bi-plus-circle"></span>
                                            </button></td><td>
                                            <button onClick={handleRemoveClick} value={i} className="btn btn-danger">
                                                <span className="bi bi-trash-fill"></span>
                                            </button>
                                        </td>
                                     </tr>
                                )
                        }
                        </tbody>
                     </table>
                   </div>
                </aside>
            </section> 
        </div>
    )
}