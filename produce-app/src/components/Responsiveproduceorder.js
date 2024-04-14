import React from 'react'
import Images from 'next/image'
import { useState, useEffect } from 'react'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"

export default function Responsiveproduceorder({id,produce_name,case_cost,case_size,promo,produce_image,userCurrentOrder,setUserCurrentOrder,stock,count}) {


    return(
        <div className='grid grid-rows-1 border border-black rounded'>
            <div className='border border-black rounded-full w-1/12 ml-1 mt-1'>
               <p className='text-center text-sm'>
                {count+1}
               </p> 
            </div>
            <div>
                <div className='grid grid-rows-1'>
                    <h1 className='uppercase font-instrument text-xl text-center'>
                        {produce_name}
                    </h1>
                </div>
            </div>

            <div className='grid grid-rows-1 place-items-center'>
                <Images alt={produce_name} src={produce_image} style={{width: "40%", height: "85%" }}/>
            </div>
            <div>
                <p className='text-center font-bold font-sans text-sm'>
                    CASE COST: ${case_cost}
                </p>
            </div>
            <div>
                <p className='text-center font-bold font-sans text-sm'>
                    CASE SIZE: {case_size}
                </p>
  
            </div>
            <div>
                <p className='text-center font-bold text-sm text-red-500 font-sans'>
                    PROMO PRICES: ${promo}
                </p>
            </div>
            <div>
                <p className='text-center text-orange-500 font-bebas text-sm/[17px] font-bold'>  {stock===false && "OUT OF STOCK"}</p>
            </div>

        </div>
    )
}