import React from 'react'
import Images from 'next/image'
import Responsiveproduceorder from '@/components/Responsiveproduceorder'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"
import trashDelete from "../components/images/deleteTrash.png"
import gala_apple from "../components/images/gala_apple.png"
import fuji_apple from "../components/images/fuji_apples.png"
import honey_crisp from "../components/images/honeycrisp.png"
import granny_smith from "../components/images/granny_smith2.png"
import oranges_navel from "../components/images/navel_oranges.png"
import lemons from "../components/images/lemons.png"
import limes from "../components/images/limes.png"
import strawberries from "../components/images/strawberries.png"


import { useState, useEffect } from 'react'

// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {
    const [produceListItems, setProduceListItems] = useState([{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:"27.41", case_size:"40 lbs", promo_price:"17.49", stock:true, produce_Image: gala_apple, Qty:1},
                            {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:"27.41", case_size:"40 lbs", promo_price:"0", stock:true, produce_Image: fuji_apple, Qty:1},
                            {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:"27.41", case_size:"40 lbs", promo_price:"12.49", stock:true, produce_Image: honey_crisp, Qty:1},
                            {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:"49.50", case_size:"40 lbs", promo_price:"0", stock:false, produce_Image: granny_smith, Qty:1},
                            {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:"29.41", case_size:"38 lbs", promo_price:"0", stock:true, produce_Image: oranges_navel, Qty:1},
                            {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:"11.19", case_size:"75 units", promo_price:"0", stock:false, produce_Image: lemons, Qty:1},
                            {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:"51.49", case_size:"230 units", promo_price:"47.65", stock:true, produce_Image: limes, Qty:1},
                            {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:"22.99", case_size:"8 units", promo_price:"8.49", stock:true, produce_Image: strawberries, Qty:1}]);
    const [userCurrentOrder, setUserCurrentOrder]=useState([]);
    const [value, setValue]=useState(null);
    const [valueQty, setValueQty]=useState(1);
    const [isSmallScreen, setIsSmallScreen]=useState(false)
    const [isMediumScreen, setIsMediumScreen]=useState(false)
    const [isLargeScreen, setIsLargeScreen]=useState(false)

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

    const getCurrentProduceValue=()=>{
      console.log(value);

      setUserCurrentOrder([...userCurrentOrder,value]);

      // setUserCurrentOrder(currentArray=>[...currentArray,value]);
      // setValue(null);
    }

    const findProduceItem=(id)=>{
      let index=0;
      let locationFound;

      while (index < produceListItems.length) {
        if(produceListItems[index].id===id){
          // console.log("FOUND THE ID");
          locationFound=index;
          index=produceListItems.length;
        }
        index++;
      }//end of while loop

      // console.log("it was found in location ", locationFound)
      return locationFound;
    }

    const increaseProduceItem=(e,Quantity, id)=>{
      let produceItemLocation;
      let currentQty;

      //TODO:First find the produce item by using the id
      produceItemLocation=findProduceItem(id)
      //TODO:Get the current value of the Quantity
      currentQty=produceListItems[produceItemLocation].Qty;
      console.log("For id", id, ", and it's Quantity is ", currentQty)
      //TODO:Increase the value of Quantity
      currentQty=currentQty+1
      // console.log(currentQty)
      console.log("produceItemLocation is ", produceItemLocation)
      //TODO:Update Quantity
        const updateItems=[...produceListItems];
        updateItems[produceItemLocation].Qty=currentQty;
        // setUserCurrentOrder(updateItems);
        setProduceListItems(updateItems);
    }


    const deleteQty=(e,id)=>{
      let produceItemLocation;
      let currentQty;
      let newOrderList;
      let newOrderProduceList;

      //TODO:First find the produce item by using the id
      produceItemLocation=findProduceItem(id)
      //TODO:Get the current value of the Quantity
      currentQty=produceListItems[produceItemLocation].Qty;
      console.log("For id", id, ", and it's Quantity is ", currentQty)
      //TODO:Decrease the value of Quantity
      currentQty=currentQty-1
      if (currentQty===0) {
        // console.log("At this point valueQty should be ZERO, ", valueQty);
        setUserCurrentOrder(currentItems=>{
          newOrderProduceList=currentItems.filter(item=>item.id !== id);
          console.log("updated items:", newOrderProduceList)
          return newOrderProduceList;
        })
      }else{
        console.log("produceItemLocation is ", produceItemLocation)
        //TODO:Update Quantity
          const updateItems=[...produceListItems];
          updateItems[produceItemLocation].Qty=currentQty;
          setProduceListItems(updateItems);
      }

  }

  return (

    <div>
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
              label="produceItems" />}
              value={value}
              onChange={(e, newValue)=>setProduceValue(newValue)}
            />
          </Stack>
        </div>
          <div className='flex justify-center mt-2'>
            <Button onClick={(e)=>getCurrentProduceValue(e)} variant='outlined'>Enter</Button>
          </div>
        <div className='flex justify-center'>
          <div className='grid grid-rows-1 border border-gray-400 mt-8 w-10/12 rounded'>
            <div className='grid grid-rows-1 w-11/12 border border-gray-400 sm:mt-4 ml-6 mb-10 md:mb-12 lg:mb-4 rounded lg:ml-10'>
              <div className='p-4'>
                  {userCurrentOrder.map((item,index)=>
                      isSmallScreen===false ? (
                      <div key={item.id}>
                        <div className='border border-solid border-t-4 border-l-1.5 border-b-4 border-r-1.5 border-black w-7 flex justify-center mt-2 rounded-full'>
                          <p>{index+1}</p> 
                        </div>

                        <div className='grid grid-rows-1 lg:flex justify-start'>
                          <div className='lg:w-2/12 flex justify-center sm:w-6/12'>
                            <Images alt={item.name} src={item.produce_Image} style={{width: "100%", height: "85%" }}/>
                          </div> 
                          <div className='grid grid-rows-1 border border-orange-400 lg:inline-block lg:w-11/12 sm:w-full'>
                              <div className='grid grid-rows-1'>
                                <div className='flex justify-end mb-2'>
                                  {/* <p className='font-bold text-xs/[17px] mb-1 inline-block'>IN STOCK:</p> */}
                                  
                                  <p className='text-orange-500 inline-block font-bebas text-sm/[17px] font-bold'>  {item.stock===false && "OUT OF STOCK"}</p>
                                </div>
                                <div className='grid grid-rows-1'>
                                  <h1 className='uppercase font-bold text-xl mt-10'>{item.name}</h1>
                                </div>
                              </div>
                          </div>
                        </div>

                      
                      <div className=' flex justify-between border border-red-500 w-full'>
                                      <div className='inline-block border border-blue-400'>
                                        <div className='inline-block'>
                                          <Button variant='outlined' color='primary' size='small' onClick={(e)=>deleteQty(e,item.id)}><Images alt={item.name} src={trashDelete}/></Button>
                                        </div>
                                      <div className='inline-block w-1/6 ml-2'>
                                        <Stack spacing={4}>
                                          <Stack direction='row' spacing={2}>
                                              <TextField label='QTY' size='small' value={item.Qty} onChange={e=>setValueQty(e.target.value) }/>
                                          </Stack>
                                        </Stack>
                                      </div>
                                      <div className='inline-block ml-2.5'>
                                        <Button className='w-1/12' variant='outlined' color='primary' size='small' onClick={e=>increaseProduceItem(e,item.Qty,item.id)}>+</Button>
                                      </div>
                                    </div>
                                    
                                      <div className='lg:inline-block border border-green-700 ml-8'>
                                        <p className='lg:font-bold text-xs/[17px] mb-1 inline-block'>CASE COST:</p>
                                        <p className='text-xs/[17px] inline-block'> ${item.case_cost}</p>
                                      </div>
                                    
                                    
                                      <div className='border border-blue-800 inline-block ml-6'>
                                        <p className='font-bold text-xs/[17px] mb-1 inline-block'>CASE SIZE:</p>
                                        <p className='text-xs/[17px] inline-block'> {item.case_size}</p>
                                      </div>
                                    
                                  
                                        <div className='inline-block'>
                                          <p className='text-red-500 font-bold text-xs/[17px] mb-1 inline-block'>PROMO PRICE: </p>
                                          <p className='text-xs/[17px] inline-block'> ${item.promo_price}</p>
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
                <Button className='sm:flex justify-center w-4/12 lg:w-2/12' variant='outlined'>Confirm Order</Button>
              </div>
            </div>
            <div className='ml-10'>
              <p className='font-bold font-instrument'>CURRENT BALANCE:</p>
            </div>
          </div>
        </div>

    </div>  


  )
}
