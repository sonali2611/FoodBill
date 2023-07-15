import React from 'react';
import ProductList from './components/ProductList';
import BillCalculation from './components/BillCalculation';

const App = () => {
  return (
    <div style={{display:"flex"}}>
      <ProductList />
      <BillCalculation />
    </div>
  );
};

export default App;