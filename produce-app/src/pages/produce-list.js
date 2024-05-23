// pages/produce-list.js
import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSwitch } from '@nextui-org/react';
import { Stack, Autocomplete, TextField, Button } from "@mui/material"

const ProduceList = () => {
  const router = useRouter();
  const { order } = router.query;
  const [produceItems, setProduceItems] = useState([])

  useEffect(()=>{
    console.log(order)

    if (order) {
      setProduceItems(JSON.parse(decodeURIComponent(order)))
    }
  
  }, [order])


  return (
    <div className="grid grid-rows-1 border border-black bg-blue-50">
        <div className='grid grid-rows-1'>
            <div className='flex justify-center'>
                <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>
            </div>
        </div>
      <div>
        {produceItems.map((item, index) => (
          <div key={index} className="mb-2">
              <div className="flex justify-center items-center">
                <div className='border border-black w-8/12 grid grid-cols-5 rounded-md p-1 bg-amber-50'>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <p className='uppercase font-bold text-sm font-instrument'>{item.name}</p>
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <p className='uppercase font-bold text-sm font-instrument'>Quantity: {item.Qty}</p>
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <p className='uppercase font-bold text-sm font-instrument'>Price: ${item.promo_price}</p>
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
                          <Button className='border border-black'
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
                      </div>
                  </div>
                  <div className='grid grid-cols-1'>
                      <div className='flex justify-center'>
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
                      </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
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
      <div className='flex justify-center mb-4'>
        <p>TOTAL:</p>
      </div>
    </div>
  );
};

export default ProduceList;
