// pages/produce-list.js
import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSwitch } from '@nextui-org/react';
import { Stack, Autocomplete, TextField, Button } from "@mui/material"
import queryString from 'query-string';
import { Questrial } from 'next/font/google';

const ProduceList = () => {
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


  let quantityItems=[]
  let total_Balance=[]
  let grand_Total=[]
  let total=0.000
  let totalQ=0


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
    return total
  }

  const toggleEdit=(index)=>{
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

    setProduceItems(prevItems=>prevItems.filter(item=>item.id !== tempID))

  }

  return (
    <div className="grid grid-rows-1 border border-black bg-blue-50">
        <div className='grid grid-rows-1'>
            <div className='flex justify-center'>
              {/* {console.log(produceItems[length])} */}
                <h1 className="text-2xl font-bold mb-4 font-instrument">Confirm Your Order</h1>
            </div>
        </div>
      <div>
      {listItems.length > 0 && removeOutStocks()}
        {produceItems.map((item, index) => (
          <div key={item.id} className="mb-2">
              <div className="flex justify-center items-center">
                <div className={`border border-black w-8/12 grid grid-cols-5 rounded-md p-1 ${item.stock===false ? 'bg-gray-300' : 'bg-white'}`}>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {editIndex===index ?
                          <Stack spacing={2} width='250px'>
                              <Autocomplete 
                                options={listItems} 
                                getOptionLabel={(option)=>{
                                  if (option && option.name) {
                                    return option.name
                                  }
                                  console.error("Option is missing a name property:", option)
                                  return ''
                                }}
                                isOptionEqualToValue={(option,value)=>option.id===value.id }
                                renderInput={(params)=>(
                                <TextField
                                {...params} 
                                label="produceItems" 
                              />
                              )}

                            value={value.length===0 ? getValue(index) : value}
                            onChange={(e, newValue)=>setProduceValue(newValue, editIndex)}
                          />
                        </Stack>
                            :
                            <p className={`uppercase font-bold text-sm font-instrument ${item.stock===false && 'text-gray-500'}`}>{item.name}</p>
                        } 
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {editIndex===index ?
                        <TextField
                          sx={{
                            width: '55px', // minimum width
                            height: '30px', // specific height
                            color:'black',
                            '& .MuiInputBase-input':{
                              fontSize: '12px'
                          }}
                        }
                          label="Qty"
                          value={valueQty===null ? getQtyValue(index) : valueQty}    
                          onChange={(e)=>setValueUpdateQty(e,editIndex)}
                        />
                        :
                          <p className={`uppercase font-bold text-sm font-instrument ${item.stock===false && 'text-gray-500'}`}>Quantity: {item.Qty}</p>
                        }
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <p className={`uppercase font-bold text-sm font-instrument ${item.stock===false && 'text-gray-500'}`}>Price: ${item.promo_price===0 ? item.case_cost : item.promo_price}</p>
                      </div>
                      <div>
                        {item.stock===false && <p className='text-sm/[10px] text-orange-500 font-bold'>OUT OF STOCK</p>}
                      </div>

                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {editButtonIndex===index ?
                          <Button className='border border-black bg-teal-500 hover:bg-teal-600' onClick={()=>updateData(index)}
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
                              disabled={item.stock===false && true}
                            >Edit</Button>
                        }
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                        {deleteButtonIndex===index ?
                            <Button className='border border-black bg-gray-500 hover:bg-gray-600'
                              onClick={()=>clearProgress(index)}
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
                              <Button className='border border-black' onClick={()=>deleteRecord(index)}
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
                        }

                      </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <p className='font-bold font-instrument'>CASE QUANTITY: {getTotalQuantity()}</p>
      </div>
      <div className='flex justify-center mb-4'>
        <p className='font-bold font-instrument'>TOTAL: ${parseFloat(getTotal()).toFixed(2)}</p>
      </div>
      <div className='flex justify-center'>
        <Button className='border border-black mb-2 hover:bg-teal-500'
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
