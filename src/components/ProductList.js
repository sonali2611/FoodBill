import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/store';

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };
  return (
    <div style={{display:"flex"}}>
      <div style={{width:"auto",border:"1px solid",fontSize:"18px",padding:"10px"}}>
        <h2>Add Product:</h2>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Soup</div>
          <div>$2 &nbsp;<button onClick={() => handleAddProduct({ id: 1, name: 'Soup', price: 2 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Bread</div>
          <div>$3 &nbsp;<button onClick={() => handleAddProduct({ id: 2, name: 'Bread', price: 3 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Cheese</div>
          <div>$5 &nbsp;<button onClick={() => handleAddProduct({ id: 3, name: 'Cheese', price: 5 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Butter</div>
          <div>$4 &nbsp;<button onClick={() => handleAddProduct({ id: 4, name: 'Butter', price: 4 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Milk</div>
          <div>$1 &nbsp;<button onClick={() => handleAddProduct({ id: 5, name: 'Milk', price: 1 })}>Add</button></div>
        </div>
      </div>
      <div style={{minWidth:"300px",border:"1px solid",fontSize:"18px",padding:"10px"}}>
        <h2>Product List : </h2>
        <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{width:"30%"}}>Product</div>
                <div style={{width:"30%"}}>Price</div>
                <div style={{width:"40%",display:"flex",alignItems:"center",padding:"10px",justifyContent:"center"}}>
                  count
                </div>
              </div>
          {Object.keys(products).map((productId) => {
            const product = products[productId];
            return (
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} key={productId}>
                <div style={{width:"30%"}}>{product.name} </div>
                <div style={{width:"30%"}}>${product.price}</div>
                <div style={{width:"40%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px"}}>
                  <button onClick={() => handleRemoveProduct(product)}>-</button>&nbsp;&nbsp;{product.count}&nbsp;&nbsp;
                  <button onClick={() => handleAddProduct(product)}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
