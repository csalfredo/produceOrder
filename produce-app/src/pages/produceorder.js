import React from 'react'
import Images from 'next/image'
import { useRouter } from 'next/router';
import { useProduce } from './context/ProduceContext';
import Responsiveproduceorder from '@/components/Responsiveproduceorder'
import { Stack, Autocomplete, TextField, Button,Snackbar } from "@mui/material"
import trashDelete from "../components/images/deleteTrash.png"
import gala_apple from "../components/images/gala_apple.png"
import fuji_apple from "../components/images/fuji_apples.png"
import honey_crisp from "../components/images/honeycrisp.png"
import granny_smith from "../components/images/granny_smith2.png"
import oranges_navel from "../components/images/navel_oranges.png"
import lemons from "../components/images/lemons.png"
import limes from "../components/images/limes.png"
import strawberries from "../components/images/strawberries.png"
import bananas from "../components/images/bananas.png"
import blueberries from "../components/images/blueberries.png"
import cabbage from "../components/images/cabbage.png"
import cauliflower from "../components/images/cauliflower.png"
import green_grapes from "../components/images/green_grapes.png"
import raspberries from "../components/images/raspberries.png"
import red_grapes from "../components/images/red_grapes.png"
import roma from "../components/images/roma.png"
import tomato from "../components/images/tomato.png"
import watermelon from "../components/images/watermelon.png"


import { useState, useEffect } from 'react'
import { toggle, user } from '@nextui-org/react'
import queryString from 'query-string';

// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {


  
    // const [produceListItems, setProduceListItems] = useState([{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:27.41, case_size:"40 lbs", promo_price:17.49, stock:true, produce_Image: gala_apple, Qty:1,totalBalance:0.00},
    //                         {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:27.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: fuji_apple, Qty:1,totalBalance:0.00},
    //                         {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:27.41, case_size:"40 lbs", promo_price:12.49, stock:true, produce_Image: honey_crisp, Qty:1,totalBalance:0.00},
    //                         {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:49.50, case_size:"40 lbs", promo_price:0, stock:false, produce_Image: granny_smith, Qty:1,totalBalance:0.00},
    //                         {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:29.41, case_size:"38 lbs", promo_price:0, stock:true, produce_Image: oranges_navel, Qty:1,totalBalance:0.00},
    //                         {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:11.19, case_size:"75 units", promo_price:0, stock:false, produce_Image: lemons, Qty:1,totalBalance:0.00},
    //                         {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:51.49, case_size:"230 units", promo_price:0, stock:true, produce_Image: limes, Qty:1,totalBalance:0.00},
    //                         {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:22.99, case_size:"8 units", promo_price:0, stock:true, produce_Image: strawberries, Qty:1,totalBalance:0.00},
    //                         {id:8, name:"bananas", product_code:"142", inventory:"445", case_cost:40.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: bananas, Qty:1,totalBalance:0.00},
    //                         {id:9, name:"blueberries", product_code:"166", inventory:"110", case_cost:21.41, case_size:"10 units", promo_price:11.00, stock:true, produce_Image: blueberries, Qty:1,totalBalance:0.00},
    //                         {id:10, name:"cabbage", product_code:"178", inventory:"12", case_cost:16.00, case_size:"45 lbs", promo_price:0, stock:false, produce_Image: cabbage, Qty:1,totalBalance:0.00},
    //                         {id:11, name:"green grapes", product_code:"248", inventory:"55", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: green_grapes, Qty:1,totalBalance:0.00},
    //                         {id:12, name:"raspberries", product_code:"167", inventory:"10", case_cost:25.99, case_size:"10 unit s", promo_price:0, stock:false, produce_Image: raspberries, Qty:1,totalBalance:0.00},
    //                         {id:13, name:"red grapes", product_code:"250", inventory:"50", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: red_grapes, Qty:1,totalBalance:0.00},
    //                         {id:14, name:"roma", product_code:"482", inventory:"100", case_cost:25.49, case_size:"25 lbs", promo_price:15.00, stock:true, produce_Image: roma, Qty:1,totalBalance:0.00},
    //                         {id:15, name:"tomato", product_code:"478", inventory:"40", case_cost:20.49, case_size:"15 lbs", promo_price:0, stock:true, produce_Image: tomato, Qty:1,totalBalance:0.00},
    //                         {id:16, name:"watermelon", product_code:"304", inventory:"40 bins", case_cost:200.15, case_size:"120 units", promo_price:0, stock:true, produce_Image: watermelon, Qty:1,totalBalance:0.00},
    //                       ]);
    // const [userCurrentOrder, setUserCurrentOrder]=useState([])
    const { produceListItems, userCurrentOrder, updateUserOrder, updateTotalBalance,totalBalance,updateQtyTotal,qtyTotal,getQty} = useProduce();
    const router = useRouter();

    const [value, setValue]=useState(null);
    const [valueQty, setValueQty]=useState(1);
    const [isSmallScreen, setIsSmallScreen]=useState(false)
    const [isMediumScreen, setIsMediumScreen]=useState(false)
    const [isLargeScreen, setIsLargeScreen]=useState(false)
    const [currentBalance, setCurrentBalance]=useState([])
    // const [totalBalance,setTotalBalance]=useState(parseFloat(0.00).toFixed(2))
    const [enterButton, setEnterButton]=useState(false)
    const [open, setOpen]=useState(false)

    useEffect(()=>{
      const handleResize=()=>{
        setIsSmallScreen(window.innerWidth < 640)
        
      }

      handleResize()

      window.addEventListener('resize',handleResize)

      return()=>{
        window.removeEventListener('resize', handleResize)
      }

    },[])

    const setProduceValue=(newValue)=>{
      console.log(newValue);

      setValue(newValue);
    }

    const toggleSnackBar=()=>{
      setOpen(!open)
    }

    const getCurrentProduceValue=()=>{
      console.log(value);

      if (value !==null) {
        //TODO:CHANGE ENTER TO TRUE
        toggleEnterButton()
        // setUserCurrentOrder([...userCurrentOrder,value]);
        if (value && !userCurrentOrder.find(item => item.id === value.id)) {
          const selectedItem = produceListItems.find(item => item.id === value.id);
          updateUserOrder([...userCurrentOrder, { ...selectedItem, quantity: 1 }]);
        }
      }
      else{
        return(

          toggleSnackBar()
        )
      }


      // setUserCurrentOrder(currentArray=>[...currentArray,value]);
      // setValue(null);
    }

    const findProduceItem=(id)=>{
      let index=0;
      let locationFound;

      while (index < userCurrentOrder.length) {
        if(userCurrentOrder[index].id===id){
          // console.log("FOUND THE ID");
          locationFound=index;
          index=userCurrentOrder.length;
        }
        index++;
      }//end of while loop

      console.log("it was found in location ", locationFound)
      return locationFound;
    }

    const findQtyInUserCurrentOrder=(id)=>{
      let index=0;
      let locationFound;

      while (index < userCurrentOrder.length) {
        if(userCurrentOrder[index].id===id){
          // console.log("FOUND THE ID");
          locationFound=index;
          index=userCurrentOrder.length
        }
        index++;
      }//end of while loop

      // console.log("it was found in location ", locationFound)
      return locationFound;
    }

    const toggleEnterButton=()=>{
      setEnterButton(!enterButton)
    }

    const increaseProduceItem=(e,Quantity, id, case_cost, promoPrice,stock,index)=>{
      let produceItemLocation;
      let currentQty;
      
      console.log("value is ", value)

      
      //TODO:First find the produce item by using the id
      produceItemLocation=findProduceItem(id)
      //TODO:Get the current value of the Quantity
      currentQty=userCurrentOrder[produceItemLocation].Qty;
      console.log("For id", id, ", and it's Quantity is ", currentQty)
      //TODO:Increase the value of Quantity
      currentQty=currentQty+1
      // console.log(currentQty)
      console.log("produceItemLocation is ", produceItemLocation)
      //TODO:Update Quantity
        const updateItems=[...userCurrentOrder];
        console.log(updateItems)
        updateItems[produceItemLocation].Qty=currentQty;
        // setProduceListItems(updateItems);
        const updatedOrder = userCurrentOrder.map(item =>
          item.id === id ? { ...item, Qty: Number(currentQty) } : item
        );
        updateUserOrder(updatedOrder);
        console.log(updateItems)
        console.log("id is ", id)
        console.log(updateItems[produceItemLocation].Qty)
        getCurrentBalance(updateItems[produceItemLocation].Qty,case_cost,promoPrice,stock,index,id)
        
    }


    const deleteQty=(e,id,Quantity,case_cost,promoPrice,stock,index)=>{
      let produceItemLocation;
      let currentQty;
      let newOrderList;
      let newOrderProduceList;
      let qtyLocation
      let tempValueQty=0

      console.log("Qty is ", qtyTotal)
      console.log("id is ", id)

      // if (qtyTotal===undefined) {
      //   console.log(userCurrentOrder)
      //   qtyLocation=findQtyInUserCurrentOrder(id)

      //   console.log("qtyLocation is ", qtyLocation)
      //    tempValueQty=getQty(qtyLocation)

      //    console.log("tempValueQty is ", tempValueQty)

      //   //TODO: AT THIS POINT I HAVE THE QUANTITY VALUE FROM THE CURRENT PRODUCE ITEM

      // }
      //TODO:First find the produce item by using the id
      produceItemLocation=findProduceItem(id)
      //TODO:Get the current value of the Quantity
      console.log(userCurrentOrder)
      console.log(userCurrentOrder[produceItemLocation].Qty,", ", userCurrentOrder, "prodcuceItemLocation is ", produceItemLocation)
      currentQty=userCurrentOrder[produceItemLocation].Qty;
      console.log("For id", id, ", and it's Quantity is ", currentQty)
      //TODO:Decrease the value of Quantity
      currentQty=currentQty-1
      if (currentQty===0) {
        const updateItems=[...userCurrentOrder];
        updateItems[produceItemLocation].Qty=currentQty;
        // setProduceListItems(updateItems);
        const updatedOrder = userCurrentOrder.map(item =>
          item.id === id ? { ...item, Qty: Number(currentQty) } : item
        );
        updateUserOrder(updatedOrder);
        // console.log("At this point valueQty should be ZERO, ", valueQty);
        // setUserCurrentOrder(currentItems=>{
        //   newOrderProduceList=currentItems.filter(item=>item.id !== id);
        //   console.log("updated items:", newOrderProduceList)
        //   getCurrentBalance(updateItems[id].Qty,case_cost,promoPrice,stock,index,id)

        //   return newOrderProduceList;
        // })
      }else{
        console.log("produceItemLocation is ", produceItemLocation)
        //TODO:Update Quantity
          const updateItems=[...userCurrentOrder];
          updateItems[produceItemLocation].Qty=currentQty;
          // setProduceListItems(updateItems);
          const updatedOrder = userCurrentOrder.map(item =>
            item.id === id ? { ...item, Qty: Number(currentQty) } : item
          );
          updateUserOrder(updatedOrder);
          getCurrentBalance(updateItems[produceItemLocation].Qty,case_cost,promoPrice,stock,index,id)
      }


  }
  const getTotalBalance=(Balance)=>{

    console.log(Balance)
    setCurrentBalance(Balance)
    console.log(currentBalance)


    let tempValueCost=0
    let currentValue=0
    let index=0

    while (index < Balance.length) {
      console.log("index is ", index)
  
      if (Balance[index] !==undefined) {
        console.log(Balance[index])

        currentValue=Balance[index];

        currentValue=currentValue+tempValueCost
        tempValueCost=currentValue
      }
      index++;
    }//end of while loop

    console.log("currentValue is ", parseFloat(currentValue).toFixed(2))


    // setTotalBalance(currentValue)

    updateTotalBalance(currentValue)

  }

  const getCurrentBalance=(Qty,caseCost,promoPrice,stock,location,id)=>{

   location=findProduceItem(id)

    console.log("Quantity is ", Qty)
    console.log("caseCost is ", caseCost)
    console.log("stock is ", stock)
    console.log("location is ", location)

    let newAmount;
    let currentValue;
    let Balance;
    let currentTotal;
    

    console.log(currentBalance)
    
    currentValue=currentBalance[location];
    
    console.log("currentValue is ", currentValue);

    Balance=[...currentBalance];

    if (stock===true)
    {
        if(promoPrice===0)
        {

            console.log("using the caseCost value, and Qty is ", Qty)
            newAmount=(Qty*caseCost);
            Balance[location]=newAmount
            // setCurrentBalance(Balance)
            getTotalBalance(Balance)

        }  
        else{
         
            console.log("Using the Promo value, and Qty is ", Qty)
            newAmount=(Qty*promoPrice);
            console.log("newAmount is ", newAmount)
            Balance[location]=newAmount
            console.log(Balance)
            // setCurrentBalance(Balance)
            console.log(currentBalance);
            // setTotalBalance(parseFloat(newAmount).toFixed(2)) 
            getTotalBalance(Balance)
      
        }  
    }
    else{
      console.log("THE ITEM IS OUT OF STOCK")
    }

    
        //TODO:SET ENTER BUTTON TO FALSE
        toggleEnterButton();
        
        console.log("currentTotal is ", currentBalance)
  }

  const handleConfirmOrder=()=>{
  

    console.log(userCurrentOrder)
    
    console.log(parseFloat(totalBalance).toFixed(2))


        // Convert the order to a query parameter string
        // const query = encodeURIComponent(JSON.stringify(userCurrentOrder));
        const query={
          order: JSON.stringify(userCurrentOrder),
          prdcItmLst: JSON.stringify(produceListItems)
        }

        //TODO:CONVERT THE QUERY OBJECT TO A QUERY STRING
        const queryStringified=queryString.stringify(query)

        console.log(queryStringified)


        router.push(`/produce-list?${queryStringified}`);
  }

  const toggleOpen=()=>{
    setOpen(!open)
  }

  const handleClose=(e,reason)=>{
    console.log(e)
    console.log(reason)

    if (reason==='clickaway') {
      return
    }

    toggleOpen()
  }

  return (
    <div>
      {console.log("currentBalance is ", currentBalance)}
      <div className="flex justify-center">
        <div>
          <h1 className='text-2xl font-bold font-instrument'>PRODUCE ORDER</h1>
        </div>
    </div>
        <div className='flex justify-center mt-4'>
          <Stack spacing={2} width='250px'>
            <Autocomplete 
              options={produceListItems} 
              getOptionLabel={(option)=>option.name}
              renderInput={(params)=><TextField{...params} 
              label="PRODUCT" />}
              value={value}
              onChange={(e, newValue)=>setProduceValue(newValue)}
            />
          </Stack>
        </div>
          <div className='flex justify-center mt-2'>
            <Button className='border border-black hover:bg-teal-500' 
              sx={{
                    fontSize: '0.75rem', // smaller font size
                    padding: '2px 8px', // custom padding
                    minWidth: '42px', // minimum width
                    height: '30px' ,// specific height
                    background: '#007BFF',
                    color: 'white'
                }}

            onClick={(e)=>getCurrentProduceValue(e)}>Enter</Button>
          </div>
        <div className='flex justify-center'>
          <div className='grid grid-rows-1 border border-gray-400 mt-8 w-10/12 rounded bg-blue-50'>
            <div className='grid grid-rows-1 mt-2  w-11/12 sm:mt-4 ml-4 mb-10 md:mb-12 lg:mb-4 rounded lg:ml-10 bg-white'>
              <div className='p-4'>
                {console.log(userCurrentOrder)}
                  {userCurrentOrder.map((item,index)=>
                      isSmallScreen===false ? (
                      <div key={item.id}>
                        {enterButton && getCurrentBalance(item.Qty,item.case_cost,item.promo_price,item.stock,index, item.id)}
                        <div className='border-b-1 border border-black rounded-lg'>
                            {/* <div className='border border-black w-7 flex justify-center mt-2 rounded-full'>
                              <p>{index+1}</p> 
                            </div> */}
                            <div className='grid grid-rows-1 lg:flex justify-start'>
                              <div className='lg:w-2/12 flex justify-center sm:w-6/12'>
                                <Images alt={item.name} src={item.produce_Image} style={{width: "100%", height: "85%" }}/>
                              </div> 
                              <div className='grid grid-rows-1 lg:inline-block lg:w-11/12 sm:w-full'>
                                  <div className='grid grid-rows-1'>
                                    <div className='flex justify-end mb-2'>
                                      {/* <p className='font-bold text-xs/[17px] mb-1 inline-block'>IN STOCK:</p> */}
                                      
                                      <p className='text-orange-500 inline-block font-bebas text-sm/[17px] font-bold mr-2'>  {item.stock===false && "OUT OF STOCK"}</p>
                                    </div>
                                    <div className='grid grid-rows-1'>
                                      <h1 className='uppercase font-bold text-xl mt-10 font-instrument'>{item.name}</h1>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          <div className=' flex justify-between w-full'>
                              <div className='inline-block mt-2'>
                                <div className='inline-block'>
                                  {item.stock===true ? 
                                    <Button variant='outlined' color='primary' size='small' onClick={(e)=>deleteQty(e,item.id,item.Qty,item.case_cost,item.promo_price,item.stock,index)}><Images alt={item.name} src={trashDelete}/></Button>
                                  :
                                  <Button className='bg-gray-200 opacity-50 cursor-not-allowed' disabled={true} variant='outlined' color='primary' size='small' onClick={(e)=>deleteQty(e,item.id,item.Qty,item.case_cost,item.promo_price,item.stock,index)}><Images alt={item.name} src={trashDelete}/></Button>
                                }
                                </div>
                              <div className='inline-block w-1/6 ml-2'>
                                <Stack spacing={4}>
                                  <Stack direction='row' spacing={2}>
                                      <TextField 
                                        sx={{
                                          '& .MuiInputBase-input': { // Targeting the input element directly
                                            fontSize: '0.8rem', // Decreasing the font size
                                            height:'13px'
                                          }
                                        }} 
                                        label='QTY' 
                                        size='small' 
                                        value={item.Qty} onChange={e=>setValueQty(e.target.value) }/>
                                  </Stack>
                                </Stack>
                              </div>
                              <div className='inline-block ml-2.5'>
                                {item.stock===true ? 
                                  <Button className='w-1/12 font-bold text-black text-base' variant='outlined' color='primary' size='small' onClick={e=>increaseProduceItem(e,item.Qty,item.id,item.case_cost,item.promo_price,item.stock,index)}>+</Button>
                                  :
                                  <Button className='bg-gray-200 opacity-50 cursor-not-allowed w-1/12 font-bold text-black text-base' disabled={true} variant='outlined' color='primary' size='small' onClick={e=>increaseProduceItem(e,item.Qty,item.id,item.case_cost,item.promo_price,item.stock,index)}>+</Button>
                              }
                              </div>
                            </div>
                            
                              <div className='lg:inline-block ml-8'>
                                <p className='lg:font-bold text-xs/[17px] mb-1 mr-2 inline-block font-bold font-sans'>CASE COST:</p>
                                <p className='text-xs/[17px] inline-block'> ${item.case_cost}</p>
                              </div>
                            
                            
                              <div className='inline-block ml-6'>
                                <p className='font-bold text-xs/[17px] mb-1 mr-2 inline-block font-sans'>CASE SIZE:</p>
                                <p className='text-xs/[17px] inline-block'> {item.case_size}</p>
                              </div>
                            
                          
                            <div className='inline-block'>
                              <p className='text-red-500 font-bold text-xs/[17px] mb-1 mr-1 inline-block'>PROMO PRICE: </p>
                              <p className='text-xs/[17px] inline-block mr-2'> ${item.promo_price}</p>
                            </div>
                          </div>
                        </div>

                  </div>
                      ) : (    
                        <div key={item.id}>
                            <Responsiveproduceorder 
                            id={item.id}
                            produce_name={item.name}
                            case_cost={item.case_cost}
                            case_size={item.case_size}
                            promo={item.promo_price}
                            produce_image={item.produce_Image}
                            userCurrentOrder={userCurrentOrder}
                            setUserCurrentOrder={setUserCurrentOrder}
                            stock={item.stock}
                            count={index}
                            Quantity={item.Qty}
                            value={value}
                            setValue={setValue}
                            valueQty={valueQty}
                            setValueQty={setValueQty}
                            increaseProduceItem={increaseProduceItem}
                            deleteQty={deleteQty}
                            index={index}
                            enterButton={enterButton}
                            getCurrentBalance={getCurrentBalance}
                            />
                        </div>
                      )
                  )
                  }
              </div>
            </div>
            <div className='grid grid-rows-1'>
              <div className='flex justify-center'>
                <div></div>
                <Button className='sm:flex justify-center w-4/12 lg:w-2/12 hover:bg-teal-500' 
                  sx={{
                    fontSize: '0.75rem', // smaller font size
                    padding: '2px 8px', // custom padding
                    minWidth: '42px', // minimum width
                    height: '30px' ,// specific height
                    background: '#007BFF',
                    color: 'white'
                }}                
                onClick={handleConfirmOrder}>CHECKOUT</Button>
              </div>
            </div>
            <div className='inline-block ml-10'>
              <p className='inline-block font-bold font-instrument'>CURRENT BALANCE: $</p>
              <p className='inline-block'>{parseFloat(totalBalance).toFixed(2)}</p>
            </div>
            <div className='mt-4'></div>
          </div>
        </div>

            {open && 
              <Snackbar 
                message='Need to choose an item from the list before clicking on the enter button'
                autoHideDuration={5000}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top',
                               horizontal: 'center'      
                }}      
              />
            
            }
    </div>  


  )
}
