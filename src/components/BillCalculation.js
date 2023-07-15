import React from 'react';
import { useSelector } from 'react-redux';

const BillCalculation = () => {
  const products = useSelector((state) => state.products);

  const calculateBill = () => {
    // Check if products is an array or an object
    const productArray = Array.isArray(products) ? products : Object.values(products);

    // Calculate subtotal and total count for each product
    let subtotal = 0;
    const productCount = {};

    productArray.forEach((product) => {
      subtotal += product.price * product.count;

      if (productCount[product.id]) {
        productCount[product.id] += product.count;
      } else {
        productCount[product.id] = product.count;
      }
    });

    // Apply special offers and calculate savings and discounts for each product
    const specialOffers = [];
    let totalSavings = 0;
    const productDiscounts = {};

    // Scenario a: Buy a soup and two breads - only one bread should be reduced
    const soupCount = productCount[1] || 0;
    const breadCount = productCount[2] || 0;
    if (soupCount >= 1 && breadCount >= 2) {
      const bread = productArray.find((product) => product.id === 2);
      if (bread) {
        const breadPrice = bread.price;
        const savings = breadPrice;
        totalSavings += savings;
        productDiscounts[2] = { name: bread.name, discount: savings };
        specialOffers.push(`Buy a soup and two breads - save $ ${savings}`);
      }
    }

    // Scenario b: Buy three cheeses - only one should be free
    const cheeseCount = productCount[3] || 0;
    if (cheeseCount >= 3) {
      const cheese = productArray.find((product) => product.id === 3);
      if (cheese) {
        const cheesePrice = cheese.price;
        const savings = cheesePrice;
        totalSavings += savings;
        productDiscounts[3] = { name: cheese.name, discount: savings };
        specialOffers.push(`Buy three cheeses - save $ ${savings}`);
      }
    }

    // Scenario c: Buy four cheeses - two should be free
    if (cheeseCount >= 4) {
      const cheese = productArray.find((product) => product.id === 3);
      if (cheese) {
        const cheesePrice = cheese.price;
        const savings = cheesePrice * 2;
        totalSavings += savings;
        productDiscounts[4] = { name: cheese.name, discount: savings };
        specialOffers.push(`Buy four cheeses - save $ ${savings}`);
      }
    }

    // Calculate final total with savings applied
    const total = subtotal - totalSavings;

    return { subtotal, productCount, specialOffers, totalSavings, productDiscounts, total };
  };

  const { subtotal, specialOffers, totalSavings, productDiscounts, total } = calculateBill();

  return (
    <div style={{border:"1px solid",padding:"10px"}}>
      <h2>Bill Calculation : </h2>
      <div>
        <strong>Subtotal before special offers:</strong> ${subtotal}
      </div>
      {specialOffers.length > 0 && (
        <div>
          <strong>Special offers applied:</strong>
          <ul>
            {specialOffers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <strong>Product Discounts:</strong>
        <ul>
          {Object.keys(productDiscounts).map((productId) => (
            <li key={productId}>
              Product : {productDiscounts[productId].name} - Discount: ${productDiscounts[productId].discount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Total Savings:</strong> ${totalSavings}
      </div>
      <div>
        <strong>Final total with savings:</strong> ${total}
      </div>
    </div>
  );
};

export default BillCalculation;
