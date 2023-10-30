import React from 'react';

export function Checkout({ products }) {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} width="50" height="50" alt={item.title} />
              </td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary">Proceed to Payment</button>
    </div>
  );
}
