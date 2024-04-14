import React from 'react'
import Images from 'next/image'
import { useState, useEffect } from 'react'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"

export default function Responsiveproduceorder({id,produce_name,case_cost,case_size,promo,produce_image,userCurrentOrder,setUserCurrentOrder,stock}) {


    return(
        <div className='block'>
            <div>
                <div className='grid grid-rows-1 border border-black'>
                    <h1 className='uppercase font-bold text-xl text-center'>
                        {produce_name}
                    </h1>
                </div>
            </div>

            <div className='grid grid-rows-1 place-items-center border border-black'>
                <Images alt={produce_name} src={produce_image} style={{width: "40%", height: "85%" }}/>
            </div>
            <div>
                <p className='text-center font-bold text-sm'>
                    CASE COST: ${case_cost}
                </p>
            </div>
            <div>
                <p className='text-center font-bold text-sm'>
                    CASE SIZE: {case_size}
                </p>
  
            </div>
            <div>
                <p className='text-center font-bold text-sm text-red-500 font-bebas'>
                    PROMO PRICES: ${promo}
                </p>
            </div>
            <div>
                <p className='text-center text-orange-500 font-bebas text-sm/[17px] font-bold'>  {stock===false && "OUT OF STOCK"}</p>
            </div>

        </div>
    )
}