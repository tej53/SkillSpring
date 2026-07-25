import React, { Component } from 'react';
import Cart from './Cart';
import './OnlineShopping.css';

// Displays a single cart row using Props
class CartItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.Itemname}</td>
        <td>{this.props.Price}</td>
      </tr>
    );
  }
}

// Default Props — used when Itemname / Price are not provided
CartItem.defaultProps = {
  Itemname: 'Unknown Item',
  Price: 0,
};

class OnlineShopping extends Component {
  render() {
    const CartInfo = [
      new Cart('Laptop', 80000),
      new Cart('TV', 120000),
      new Cart('Washing Machine', 50000),
      new Cart('Mobile', 30000),
      new Cart('Fridge', 70000),
    ];

    return (
      <div className="shopping-container">
        <h1 className="shopping-title">Items Ordered :</h1>
        <table className="shopping-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {CartInfo.map((item, index) => (
              <CartItem
                key={index}
                Itemname={item.Itemname}
                Price={item.Price}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OnlineShopping;
