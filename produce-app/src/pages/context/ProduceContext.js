// context/ProduceContext.js
import React, { useState, createContext, useContext } from 'react';
import gala_apple from "@/components/images/gala_apple.png"
// import gala_apple from "../components/images/gala_apple.png"
import fuji_apple from "@/components/images/fuji_apples.png"
import honey_crisp from "@/components/images/honeycrisp.png"
import granny_smith from "@/components/images/granny_smith2.png"
import oranges_navel from "@/components/images/navel_oranges.png"
import lemons from "@/components/images/lemons.png"
import limes from "@/components/images/limes.png"
import strawberries from "@/components/images/strawberries.png"
import bananas from "@/components/images/bananas.png"
import blueberries from "@/components/images/blueberries.png"
import cabbage from "@/components/images/cabbage.png"
import cauliflower from "@/components/images/cauliflower.png"
import green_grapes from "@/components/images/green_grapes.png"
import raspberries from "@/components/images/raspberries.png"
import red_grapes from "@/components/images/red_grapes.png"
import roma from "@/components/images/roma.png"
import tomato from "@/components/images/tomato.png"
import watermelon from "@/components/images/watermelon.png"

const ProduceContext = createContext();

export const useProduce = () => useContext(ProduceContext);

export const ProduceProvider = ({ children }) => {
  
const [produceListItems, setProduceListItems] = useState([{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:27.41, case_size:"40 lbs", promo_price:17.49, stock:true, produce_Image: gala_apple, Qty:1,totalBalance:0.00},
    {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:27.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: fuji_apple, Qty:1,totalBalance:0.00},
    {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:27.41, case_size:"40 lbs", promo_price:12.49, stock:true, produce_Image: honey_crisp, Qty:1,totalBalance:0.00},
    {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:49.50, case_size:"40 lbs", promo_price:0, stock:false, produce_Image: granny_smith, Qty:1,totalBalance:0.00},
    {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:29.41, case_size:"38 lbs", promo_price:0, stock:true, produce_Image: oranges_navel, Qty:1,totalBalance:0.00},
    {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:11.19, case_size:"75 units", promo_price:0, stock:false, produce_Image: lemons, Qty:1,totalBalance:0.00},
    {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:51.49, case_size:"230 units", promo_price:0, stock:true, produce_Image: limes, Qty:1,totalBalance:0.00},
    {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:22.99, case_size:"8 units", promo_price:0, stock:true, produce_Image: strawberries, Qty:1,totalBalance:0.00},
    {id:8, name:"bananas", product_code:"142", inventory:"445", case_cost:40.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: bananas, Qty:1,totalBalance:0.00},
    {id:9, name:"blueberries", product_code:"166", inventory:"110", case_cost:21.41, case_size:"10 units", promo_price:11.00, stock:true, produce_Image: blueberries, Qty:1,totalBalance:0.00},
    {id:10, name:"cabbage", product_code:"178", inventory:"12", case_cost:16.00, case_size:"45 lbs", promo_price:0, stock:false, produce_Image: cabbage, Qty:1,totalBalance:0.00},
    {id:11, name:"green grapes", product_code:"248", inventory:"55", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: green_grapes, Qty:1,totalBalance:0.00},
    {id:12, name:"raspberries", product_code:"167", inventory:"10", case_cost:25.99, case_size:"10 unit s", promo_price:0, stock:false, produce_Image: raspberries, Qty:1,totalBalance:0.00},
    {id:13, name:"red grapes", product_code:"250", inventory:"50", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: red_grapes, Qty:1,totalBalance:0.00},
    {id:14, name:"roma", product_code:"482", inventory:"100", case_cost:25.49, case_size:"25 lbs", promo_price:15.00, stock:true, produce_Image: roma, Qty:1,totalBalance:0.00},
    {id:15, name:"tomato", product_code:"478", inventory:"40", case_cost:20.49, case_size:"15 lbs", promo_price:0, stock:true, produce_Image: tomato, Qty:1,totalBalance:0.00},
    {id:16, name:"watermelon", product_code:"304", inventory:"40 bins", case_cost:200.15, case_size:"120 units", promo_price:0, stock:true, produce_Image: watermelon, Qty:1,totalBalance:0.00},
  ]);
  const [userCurrentOrder, setUserCurrentOrder] = useState([])
  const [totalBalance,setTotalBalance]=useState(parseFloat(0.00).toFixed(2))
  const [qtyTotal, setQtyTotal]=useState()


  const updateQtyTotal=(newQty)=>{
    setQtyTotal(newQty)
  }

  const updateTotalBalance=(newTotalBalance)=>{
    setTotalBalance(newTotalBalance);
  }

  const updateProduceList = (newList) => {
    setProduceListItems(newList);
  };

  const updateUserOrder = (newOrder) => {
    setUserCurrentOrder(newOrder);
  };

  const getQty=(index)=>{
    return userCurrentOrder[index].Qty
  }

  const updateQntySelector=()=>{
    setQntySelector(!qntySelelctor)
  }

  return (
    <ProduceContext.Provider value={{ produceListItems, updateProduceList, userCurrentOrder, updateUserOrder, updateTotalBalance, totalBalance,updateQtyTotal,qtyTotal, getQty}}>
      {children}
    </ProduceContext.Provider>
  );
};
