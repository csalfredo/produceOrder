import React from 'react'
import Images from 'next/image'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"
import gala_apple from "../components/images/gala_apple.png"
import { useState } from 'react'

// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {
    const produceListItems=[{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:"27.41", case_size:"40 lbs", promo_price:"17.49", stock:"true", produce_Image: gala_apple},
                            {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:"27.41", case_size:"40 lbs", promo_price:"0", stock:"true", produce_Image: gala_apple},
                            {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:"27.41", case_size:"40 lbs", promo_price:"12.49", stock:"true", produce_Image: gala_apple},
                            {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:"49.50", case_size:"40 lbs", promo_price:"0", stock:"false", produce_Image: gala_apple},
                            {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:"29.41", case_size:"38 lbs", promo_price:"0", stock:"true", produce_Image: gala_apple},
                            {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:"11.19", case_size:"75 units", promo_price:"0", stock:"false", produce_Image: gala_apple},
                            {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:"51.49", case_size:"230 units", promo_price:"47.65", stock:"true", produce_Image: gala_apple},
                            {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:"22.99", case_size:"8 units", promo_price:"8.49", stock:"true", produce_Image: gala_apple}];
    const [userCurrentOrder, setUserCurrentOrder]=useState([]);
    const [value, setValue]=useState(null);

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
                        <p>{index+1} .</p> 
                        <div className='flex justify-start'>
                          <div className='w-2/12 flex justify-center border border-black'>
                            <Images src={item.produce_Image} style={{width: "50%", height: "90%"}}/>
                          </div> 
                          <div className='inline-block border border-black w-2/12'>
                            <h1 className='uppercase inline-block font-bold mb-2'>{item.name}</h1>
                            <p className='text-xs mb-1'>PRODUCT CODE:{item.product_code}</p>
                            <p className='text-xs mb-1'>INVENTORY:{item.inventory}cases</p>
                            <p className='text-xs mb-1'>CASE COST:{item.case_cost}</p>
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
