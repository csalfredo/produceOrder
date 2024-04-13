import React from 'react'
import Images from 'next/image'
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


import { useState } from 'react'

// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {
    const produceListItems=[{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:"27.41", case_size:"40 lbs", promo_price:"17.49", stock:true, produce_Image: gala_apple},
                            {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:"27.41", case_size:"40 lbs", promo_price:"0", stock:true, produce_Image: fuji_apple},
                            {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:"27.41", case_size:"40 lbs", promo_price:"12.49", stock:true, produce_Image: honey_crisp},
                            {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:"49.50", case_size:"40 lbs", promo_price:"0", stock:false, produce_Image: granny_smith},
                            {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:"29.41", case_size:"38 lbs", promo_price:"0", stock:true, produce_Image: oranges_navel},
                            {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:"11.19", case_size:"75 units", promo_price:"0", stock:false, produce_Image: lemons},
                            {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:"51.49", case_size:"230 units", promo_price:"47.65", stock:true, produce_Image: limes},
                            {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:"22.99", case_size:"8 units", promo_price:"8.49", stock:true, produce_Image: strawberries}];
    const [userCurrentOrder, setUserCurrentOrder]=useState([]);
    const [value, setValue]=useState(null);
    const [valueQty, setValueQty]=useState(1);

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

  return (

    <div>
      <div className="flex justify-center">
        <div>
          <h1 className='text-2xl font-bold'>PRODUCE ORDER</h1>
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
                  {
                    userCurrentOrder.map((item,index)=>(
                      <div key={index}>
                        <div className='border border-solid border-t-4 border-l-1 border-b-4 border-r-1 border-black w-7 flex justify-center mt-2 rounded-full'>
                          <p>{index+1}</p> 
                        </div>

                        <div className='grid grid-rows-1 lg:flex justify-start'>
                          <div className='lg:w-2/12 flex justify-center sm:w-6/12'>
                            <Images src={item.produce_Image} style={{width: "100%", height: "85%" }}/>
                          </div> 
                          <div className='grid grid-rows-1 border border-orange-400 lg:inline-block lg:w-11/12 sm:w-full'>
                              <div className='grid grid-rows-1'>
                                <div className='flex justify-end mb-2'>
                                  {/* <p className='font-bold text-xs/[17px] mb-1 inline-block'>IN STOCK:</p> */}
                                  
                                  <p className='text-orange-500 inline-block font-bebas text-sm/[17px] font-bold'>  {item.stock===false && <p>OUT OF STOCK</p>}</p>
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
                                          <Button variant='outlined' color='primary' size='small'><Images src={trashDelete}/></Button>
                                        </div>
                                      <div className='inline-block w-1/6 ml-2'>
                                        <Stack spacing={4}>
                                          <Stack direction='row' spacing={2}>
                                              <TextField label='QTY' size='small' value={valueQty} onChange={e=>setValueQty(e.target.value) }/>
                                          </Stack>
                                        </Stack>
                                      </div>
                                      <div className='inline-block ml-2.5'>
                                        <Button className='w-1/12' variant='outlined' color='primary' size='small'>+</Button>
                                      </div>
                                    </div>
                                    
                                      <div className='inline-block border border-green-700 ml-8'>
                                        <p className='font-bold text-xs/[17px] mb-1 inline-block'>CASE COST:</p>
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
                      
                    ))
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
              <p>CURRENT BALANCE:</p>
            </div>
          </div>
        </div>
    </div>  


  )
}
