// pages/produce-list.js
import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSwitch } from '@nextui-org/react';
import { Stack, Autocomplete, TextField, Button } from "@mui/material"

const ProduceList = () => {
  const router = useRouter();
  const { order } = router.query;
  const [produceItems, setProduceItems] = useState([])
  const [editIndex, setEditIndex]=useState(null)
  const [qtyIndex, setQtyIndex]=useState(null)
  const [value, setValue]=useState(null)
  const [valueQty, setValueQty]=useState(null)
  const [editButtonIndex, setEditButtonIndex]=useState(null)
  const [deleteButtonIndex, setDeleteButtonIndex]=useState(null)


  let quantityItems=[]
  let total_Balance=[]
  let grand_Total=[]
  let total=0.000
  let totalQ=0

  useEffect(()=>{
    console.log(order)

    if (order) {
      setProduceItems(JSON.parse(decodeURIComponent(order)))
    }
  
  }, [order])

  const getQuantity=()=>{
    let index=0;
    let currentQuantity=0;

    while (produceItems.length > index) {
      quantityItems[index]=produceItems[index].Qty;
      index++;
    }//end of while loop

    console.log(quantityItems)
  }

  const getTotalQuantity=()=>{
    let index=0
    let tempValue1=0
    let tempValue2=0
    let tempTotalQnty=0

    getQuantity();

    while (quantityItems.length > index) {
      tempValue1=quantityItems[index]
      tempTotalQnty=tempValue1+tempValue2
      tempValue2=tempTotalQnty
      index++
    }//end of while loop

    totalQ=tempTotalQnty

    console.log(tempTotalQnty)
    return totalQ

  }
  

  const calculateTotal=()=>{
    let tb=0
    let index=0;
    let tempPrice
    let tempQnty
    let tempTotal=0
    let tl=0
    let x=0
    let temp=0.00
    let temp2=0.00
    let currentTotal=0.00

    while (produceItems.length > index) {
      tempPrice=total_Balance[index];
      tempQnty=quantityItems[index];

      console.log("tempPrice is ", tempPrice, ",and the Quantity is ", tempQnty)

      tempTotal= tempPrice*tempQnty
      grand_Total[index]=tempTotal;
      index++
    }//end of while loop
    console.log(grand_Total)

    while (grand_Total.length > x) {
      temp=grand_Total[x]
      console.log("BEFORE ADDITION: temp is ", temp, "temp2 is ",temp2, "total is ", total)
      total=temp+temp2
      console.log("currentTotal is ", total)
      temp2=total
      console.log("AFTER ADDITION: temp is ", temp, "temp2 is ",temp2, "currentTotal is ", total)
      x++
    }//end of while loop

    console.log("total is ", total)
  }

  const getTotal=()=>{

    let index=0
    let qnty=0

    while(produceItems.length > index){

      console.log(produceItems[index])

      if(produceItems[index].promo_price===0){
        total_Balance[index]=produceItems[index].case_cost
      }
      else{
        total_Balance[index]=produceItems[index].promo_price
      }
      index++;
    }//end of while loop

    //TODO: AT THIS POINT WE HAVE ALL THE CASE COST AND PROMO COST IN total_Balance ARRAY.
    //TODO: NOW LETS GET THE QUANTITY FOR EACH PRODUCE ITEM.
    getQuantity()
    //TODO:CALCULATE TOTAL
    calculateTotal();

    console.log("Total quanity is ", qnty)
    console.log(total_Balance)
    return total
  }

  const toggleEdit=(index)=>{
    console.log("index is ", index, ", and editIndex is ", editIndex)

    setQtyIndex(index !== qtyIndex ? index : null)    
    setEditIndex(index !== editIndex ? index : null)
    setEditButtonIndex(index !== editButtonIndex ? index : null)
    setDeleteButtonIndex(index !== deleteButtonIndex ? index : null)
  }

  const setValueUpdateProduce=()=>{

    console.log("Inside value of setValueUpdateProduce is")
  }

  const setValueUpdateQty=()=>{
    console.log("Inside setValueUpdateQty")
  }

  return (
    <div className="grid grid-rows-1 border border-black bg-blue-50">
        <div className='grid grid-rows-1'>
            <div className='flex justify-center'>
              {/* {console.log(produceItems[length])} */}
                <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>
            </div>
        </div>
      <div>
        {produceItems.map((item, index) => (
          <div key={item.id} className="mb-2">
              <div className="flex justify-center items-center">
                <div className='border border-black w-8/12 grid grid-cols-5 rounded-md p-1 bg-amber-50'>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {editIndex===index ?
                          <TextField 
                            label="Item"
                            value={value}
                            onChange={setValueUpdateProduce}
                          
                          />
                            :
                            <p className='uppercase font-bold text-sm font-instrument'>{item.name}</p>

                        } 

                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {qtyIndex===index ?
                        <TextField
                          label="Qty"
                          value={valueQty}    
                          onChange={setValueUpdateQty}
                        />
                        :
                          <p className='uppercase font-bold text-sm font-instrument'>Quantity: {item.Qty}</p>
                        }
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <p className='uppercase font-bold text-sm font-instrument'>Price: ${item.promo_price===0 ? item.case_cost : item.promo_price}</p>
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {editButtonIndex===index ?
                          <Button className='border border-black' onClick={()=>toggleEdit(index)}
                          sx={{
                              fontSize: '0.75rem', // smaller font size
                              padding: '4px 10px', // custom padding
                              minWidth: '42px', // minimum width
                              height: '30px', // specific height
                              background: '#28a745',
                              color:'black'
                            }}
                            variant='outlined' 
                            color='primary' 
                            size='small' 
                            >SAVE</Button> 
                              :

                            <Button className='border border-black' onClick={()=>toggleEdit(index)}
                            sx={{
                                fontSize: '0.75rem', // smaller font size
                                padding: '4px 10px', // custom padding
                                minWidth: '42px', // minimum width
                                height: '30px', // specific height
                                background: '#28a745',
                                color:'black'
                              }}
                              variant='outlined' 
                              color='primary' 
                              size='small' 
                            >Edit</Button>

                        
                        }

                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {deleteButtonIndex===index ?
                            <Button className='border border-black'
                            sx={{
                                fontSize: '0.75rem', // smaller font size
                                padding: '2px 8px', // custom padding
                                minWidth: '42px', // minimum width
                                height: '30px' ,// specific height
                                background: '#FF6347',
                                color: 'white'
                              }}
                                variant='outlined' 
                                color='primary' 
                                size='small' 
                                >CANCEL</Button>
                              :
                              <Button className='border border-black'
                              sx={{
                                  fontSize: '0.75rem', // smaller font size
                                  padding: '2px 8px', // custom padding
                                  minWidth: '42px', // minimum width
                                  height: '30px' ,// specific height
                                  background: '#FF6347',
                                  color: 'white'
                                }}
                                  variant='outlined' 
                                  color='primary' 
                                  size='small' 
                              
                                  >Delete</Button>
                        
                        }

                      </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <p className='font-bold font-instrument'>CASE QUANTITY:{getTotalQuantity()}</p>
      </div>
      <div className='flex justify-center mb-4'>
        <p className='font-bold font-instrument'>TOTAL:${parseFloat(getTotal()).toFixed(2)}</p>
      </div>
      <div className='flex justify-center'>
        <Button className='border border-black mb-2'
          sx={{
            fontSize: '0.75rem', // smaller font size
            padding: '2px 8px', // custom padding
            minWidth: '42px', // minimum width
            height: '30px' ,// specific height
            background: '#007BFF',
            color: 'white'
        }}
        >Send Order</Button>
      </div>
    </div>
  );
};

export default ProduceList;
