import React, { useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';

const QuantitySelector = ({ onQuantityChange, removeItem,index,id }) => {
  const [quantity, setQuantity] = useState('');
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  console.log("index is ", index, ", and id is ", id)

  const handleQuantityChange = (event) => {

    const value = event.target.value;

    console.log("value is ", value)

    if (value === '10+') {
      setIsCustomQuantity(true);
      setQuantity('');
      onQuantityChange(''); // Notify parent of empty selection
    } else if(value===0){
        removeItem(index)
    }
    else {
      setIsCustomQuantity(false);
      setQuantity(value);
      onQuantityChange(value); // Notify parent of the selected quantity
    }
  };

  const handleCustomQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    onQuantityChange(value); // Notify parent of the custom quantity
  };

  return (
    <div>
      {!isCustomQuantity ? (
        <Select
          value={quantity}
          onChange={handleQuantityChange}
          displayEmpty
          className="w-32 p-2 border border-gray-300 rounded"
        >
          <MenuItem value=""><em>Qty</em></MenuItem>
          {[...Array(10).keys()].map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
          <MenuItem value="10+">10+</MenuItem>
        </Select>
      ) : (
        <TextField
          type="number"
          value={quantity}
          onChange={handleCustomQuantityChange}
          placeholder="Enter quantity"
          className="w-32 p-2 border border-gray-300 rounded"
        />
      )}
    </div>
  );
};

export default QuantitySelector;