import React, { useState } from 'react';
import { MenuItem, Select, TextField, Menu} from '@mui/material';
import {styled } from "@mui/material/styles"

const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxHeight: '75%', // Adjust the value to set the desired height
    overflowY:'auto',
  },
}));


const QuantitySelector = ({ onQuantityChange, removeItem,index,id,produceItems }) => {
  const [quantity, setQuantity] = useState('');
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  console.log("index is ", index, ", and id is ", id)

  const handleQuantityChange = (event) => {

    const value = event.target.value;

    console.log("value is ", value)

    if (value === '10+') {
      setIsCustomQuantity(true);
      setQuantity('');
      onQuantityChange('',index); // Notify parent of empty selection
    } else if(value===0){
        removeItem(index)
    }
    else {
      setIsCustomQuantity(false);
      setQuantity(value);
      onQuantityChange(value,index); // Notify parent of the selected quantity
    }
  };

  const handleCustomQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    onQuantityChange(value,index); // Notify parent of the custom quantity
  };

  const getValue=()=>{
    console.log("index is ", index)

    return produceItems[index].Qty
  }

  return (
    <div className='flex justify-center items-center'>
      {console.log("quantity is ", quantity.length)}
      {!isCustomQuantity ? (
        <Select
          value={quantity.length===0 ? getValue() : quantity}
          onChange={handleQuantityChange}
          displayEmpty
          sx={{background: '#E8E8E8',width: "45%", height: "45px", lineHeight: 'normal'}}
          className="border border-gray-300 rounded"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '75%', // Set the desired max height
                overflowY: 'auto',
              },
            },
          }}
        >
          <MenuItem key={0} value={0}>0(DELETE)</MenuItem>
          {/* {[...Array(10).keys()].map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))} */}
          {Array.from({ length: 9}, (_, index)=>index+1).map((num)=>(
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
          <MenuItem value="10+">10+</MenuItem>
        </Select>
      ) : (
        <TextField
          value={quantity}
          onChange={handleCustomQuantityChange}
          placeholder="Qty"
          className="border border-gray-300 rounded"
          sx={{
            width:"45%",
            fontSize: '1.20rem',
          
          }}
        />
      )}
    </div>
  );
};

export default QuantitySelector;