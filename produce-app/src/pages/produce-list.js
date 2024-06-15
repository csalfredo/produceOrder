// pages/produce-list.js
import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProduce } from './context/ProduceContext';
import { useSwitch } from '@nextui-org/react';
import { Stack, Autocomplete, TextField, Button, MenuItem, Select } from "@mui/material"
import queryString from 'query-string';
import { Questrial } from 'next/font/google';
import QuantitySelector from './QuantitySelector';

const ProduceList = () => {
  const { updateProduceList, userCurrentOrder, updateUserOrder, updateTotalBalance, totalBalance } = useProduce();
  const router = useRouter();
  // const { order } = router.query;
  const [produceItems, setProduceItems] = useState([])
  const [listItems, setListItems]=useState([])
  const [editIndex, setEditIndex]=useState(null)
  const [qtyIndex, setQtyIndex]=useState(null)
  const [value, setValue]=useState('')
  const [valueQty, setValueQty]=useState(null)
  const [editButtonIndex, setEditButtonIndex]=useState(null)
  const [deleteButtonIndex, setDeleteButtonIndex]=useState(null)
  const [isDisabled, setIsDisabled]=useState(false)
  const [quantity, setQuantity]=useState('')
  const [isCustomQuantity,setIsCustomQuantity]=useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState('');


  let quantityItems=[]
  let total_Balance=[]
  let grand_Total=[]
  let total=0.000
  let totalQ=0

  console.log("userCurrentOrder is ", userCurrentOrder)

  useEffect(()=>{
    const parsed=queryString.parse(window.location.search)

    const orderParam=parsed.order
    if (orderParam) {
      // setProduceItems(JSON.parse(decodeURIComponent(order)))
      try {
        const decodedOrder=decodeURIComponent(orderParam)
        const parsedOrder=JSON.parse(decodedOrder)
        setProduceItems(parsedOrder)
      } catch (error) {
        console.error("Failed to decode or parse order:", error)
      }
    }

    const prdcItmLst=parsed.prdcItmLst
    if(prdcItmLst){
      try {
        const decodedOrder=decodeURIComponent(prdcItmLst)
        const parsedProduceL=JSON.parse(decodedOrder)
        setListItems(parsedProduceL)
      } catch (error) {
                console.error("Failed to decode or parse produceList:", error)
      }
    }


  
  }, [])

  const handleQuantityChange = (quantity,index,id) => {
    // setSelectedQuantity(quantity);
    // console.log('Selected Quantity:', quantity, ",and index is ", index);

    // produceItems[index].Qty=quantity

    console.log("quantity is ", quantity, ",and is ", id)

    const updatedOrder = produceItems.map(item =>
      item.id === id ? { ...item, Qty: Number(quantity) } : item
    );
    updateUserOrder(updatedOrder);

    produceItems[index].Qty=quantity

    


  }

  const removeOutStocks=()=>{
    let index=0
    let tempValue=''
    let currentID=0

    console.log(listItems)

    while (listItems.length > index) {
      tempValue=listItems[index].stock
      if (tempValue===false) {
        console.log("For this produceItem ", listItems[index].name, " with the id of ", listItems[index].id, ", the stock is out")
        currentID=listItems[index].id
        setListItems(prevItems=>prevItems.filter(item=>item.id !== currentID))
      }
      index++
    }//end of while loop


  }

  const getQuantity=()=>{
    let index=0;
    let currentQuantity=0;


    while (produceItems.length > index) {
      if (produceItems[index].stock !==false) {
          quantityItems[index]=produceItems[index].Qty;
      }
      else{
        quantityItems[index]=0
      }

      index++;
    }//end of while loop

  }

  const getTotalQuantity=()=>{
    let index=0
    let tempValue1=0
    let tempValue2=0
    let tempTotalQnty=0

    getQuantity();

    while (quantityItems.length > index) {
        tempValue1=parseInt(quantityItems[index])
        tempTotalQnty=tempValue1+tempValue2
        tempValue2=tempTotalQnty

      index++
    }//end of while loop

    totalQ=tempTotalQnty

    // console.log(quantityItems)
    // console.log(totalQ)

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

      tempTotal= tempPrice*tempQnty
      grand_Total[index]=tempTotal;
      index++
    }//end of while loop

    while (grand_Total.length > x) {
      temp=grand_Total[x]
      total=temp+temp2
      temp2=total
      x++
    }//end of while loop

  }

  const getTotal=()=>{

    let index=0
    let qnty=0

    while(produceItems.length > index){

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

    updateTotalBalance(total)
    return total
  }

  const toggleEdit=(index)=>{
    console.log("editButtonIndex is ",editButtonIndex, "index is ", index)
    let tempValue
    setValue('')
    setValueQty('')
    // setQtyIndex(index !== qtyIndex ? index : null)    
    setEditIndex(index !== editIndex ? index : null)
    setEditButtonIndex(index !== editButtonIndex ? index : null)
    setDeleteButtonIndex(index !== deleteButtonIndex ? index : null)
  }

  const setValueUpdateProduce=()=>{

    console.log("Inside value of setValueUpdateProduce is")
  }

  const setValueUpdateQty=(e,row)=>{
 

    setProduceValue(produceItems[row],row)
    setValueQty(e.target.value)
  }

  const setProduceValue=(newValue, id)=>{
    setValue(newValue);
  }

  const getValue=(indexRow)=>{
    let tempValue


    if(produceItems[indexRow] !==null){
          return produceItems[indexRow]
    }

  }

  const clearProgress=(index)=>{
    setQtyIndex(index !== qtyIndex ? index : null)    
    setEditIndex(index !== editIndex ? index : null)
    setEditButtonIndex(index !== editButtonIndex ? index : null)
    setDeleteButtonIndex(index !== deleteButtonIndex ? index : null)
  }

  const getQtyValue=(index)=>{
    if (produceItems[index] !==null) {
      return produceItems[index].Qty
    }
  }

  const updateData=(index)=>{

    
    //TODO:GET THE PRODUCE NAME FROM THE NEW VALUE
    let updateProduceName = value.name

    //TODO:USING THE INDEX VALUE REPLACE THE CURRENT PRODUCE NAME WITH THE VALUE OF THE NEW NAME
    produceItems[index].name=updateProduceName
    produceItems[index].id=value.id
    produceItems[index].case_cost=value.case_cost
    produceItems[index].inventory=value.inventory
    produceItems[index].promo_price=value.promo_price
    produceItems[index].case_size=value.case_size
    produceItems[index].product_code=value.product_code
    produceItems[index].stock=value.stock
    produceItems[index].Qty=valueQty


    toggleEdit(index)
  
  }

  const deleteRecord=(index)=>{
    let tempID=produceItems[index].id

    // setProduceItems(prevItems=>prevItems.filter(item=>item.id !== tempID))
    updateUserOrder(prevItems=>prevItems.filter(item=>item.id !== tempID))

  }

  // const handleQuantity=(e)=>{
  //   console.log(e.target.value)

  //   const value=e.target.value
  //   if (value==='10+') {
  //     setIsCustomQuantity(true)
  //     setQuantity('')
  //     onQuantityChange('')

  //   } else {
  //     setIsCustomQuantity(false)
  //     setQuantity(value)
  //     onQuantityChange(value)
  //   }
  // }

  // const handleChangeCustomQuantityChange=(e)=>{
  //   const value= e.target.value

  //   console.log(value)

  //   setQuantity(value)
  //   onQuantityChange(value)
  // }

  const handleDelete = (index) => {
    console.log("index is ", index)
    let tempID=produceItems[index].id

    setProduceItems(prevItems=>prevItems.filter(item=>item.id !== tempID))
    // updateUs(prevItems=>prevItems.filter(item=>item.id !== tempID))
  };

  const submitOrder=()=>{
    console.log(produceItems)
    console.log(quantity)
  }

  return (
    <div className="border border-black bg-blue-50">
        <div className='grid grid-rows-1'>
            <div className='flex justify-center'>
              {/* {console.log(produceItems[length])} */}
                <h1 className="text-2xl font-bold mb-4 font-instrument">Confirm Your Order</h1>
            </div>
        </div>
      <div>
      {listItems.length > 0 && removeOutStocks()}
        {userCurrentOrder.map((item, index) => (
          <div key={item.id} className="mb-2">
              <div className="flex justify-center items-center">
                <div className={`border border-black w-5/12 rounded-md ${item.stock===false ? 'bg-gray-300' : 'bg-white'}`}>

                {/* TODO: */}
                  <div className='grid grid-rows-1 border border-green-500'>
                    <div className='grid grid-cols-4'>
                    <div className='flex justify-center items-center'>  
                      <p className={`uppercase font-bold text-sm font-instrument ${item.stock===false && 'text-gray-500'}`}>{item.name}</p>
                    </div>
                  <div>
                              <QuantitySelector 
                                onQuantityChange={handleQuantityChange}
                                removeItem={handleDelete}
                                index={index}
                                id={item.id}
                                produceItems={userCurrentOrder}
                                outStock={item.stock}
                              />                        
                            {/* {
                              selectedQuantity !== '' && (
                              <p className="mt-2">Selected Quantity: {selectedQuantity}</p>
                            )} */}
                  </div>
                  <div className='grid grid-rows-1'>
                      <div className='flex justify-center items-center'>
                          <p className={`uppercase font-bold text-sm font-instrument ${item.stock===false && 'text-gray-500'}`}>Price: ${item.promo_price===0 ? item.case_cost : item.promo_price}</p>
                      </div>
                  </div>
                  <div className='grid grid-rows-1'>
                    <div className='flex justify-center items-center'>
                      <div className=''>
                        <Button className='border border-black hover:bg-red-600' onClick={()=>deleteRecord(index)}
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
                              disabled={item.stock===false && true}
                              >Delete</Button>
                      </div>
                    </div>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-5/12'>
          <div className='w-9/12'>
            <div className='flex justify-center'>
              <p className='font-bold font-instrument'>QTY: {getTotalQuantity()}</p>
          </div>
        </div>
        <div className='flex justify-center mb-4'>
          <p className='font-bold font-instrument'>TOTAL: ${parseFloat(getTotal()).toFixed(2)}</p>
        </div>
      <div className='flex justify-center'>
          <div className='mr-2'>
            <Button className='border border-black mb-2 hover:bg-teal-500' onClick={submitOrder}
              sx={{
                fontSize: '0.75rem', // smaller font size
                padding: '2px 8px', // custom padding
                minWidth: '42px', // minimum width
                height: '30px' ,// specific height
                background: '#007BFF',
                color: 'white'
            }}
            >SUBMIT</Button>
          </div>
          <div className='flex justify-center'>
            <Button className='border border-black mb-2 hover:bg-teal-500' onClick={()=>router.push('/produceorder')}
              sx={{
                fontSize: '0.75rem', // smaller font size
                padding: '2px 8px', // custom padding
                minWidth: '42px', // minimum width
                height: '30px' ,// specific height
                background: '#007BFF',
                color: 'white'
            }}
            >MODIFY ORDER</Button>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default ProduceList;
