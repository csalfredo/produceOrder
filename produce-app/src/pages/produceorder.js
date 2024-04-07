import React from 'react'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"
import { useState } from 'react'

// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {
    const produceListItems=["fuji", "gala", "granny smith", "bananas", "cabbage"];
    const [value, setValue]=useState(null);

    const setProduceValue=(newValue)=>{
      console.log(newValue);

      setValue(newValue);
    }

    const getCurrentProduceValue=()=>{
      console.log(value);
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
            <div className='border border-gray-400 w-11/12 mt-4 mb-4 ml-10 rounded'>
              <div className='p-4'>
                  {
                    // produceListItems.map((item,index)=>(
                    //   <div className="flex" key={index}>
                    //     <p>{index+1} .</p>  
                    //     <p>{item}</p>
                    //   </div>
                    // ))
                  }
              </div>
            </div>
            <div className='grid grid-rows-1'>
              <div className='grid grid-cols-2'>
                <div></div>
                <Button className='w-2/12' variant='outlined'>Confirm Order</Button>
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
