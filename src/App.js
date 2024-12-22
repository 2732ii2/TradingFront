import { useEffect, useState } from 'react';
import './App.css';
import { WebSocketDemo } from './websocket';
import PlaceOrder from './InputCard';
import TableComp from './Table';
import axios from "axios";
const App=()=>{
  const [states,setstates]=useState(0);
  const [data,setdata]=useState([]);
  console.log("=> arr ",data);
  const url=`https://tradingbackend-ebt1.onrender.com/`;
  const getData=async()=>{
   try{
     const resp= await axios.get(`${url}getData`);
     console.log(resp);
     setdata(resp?.data);
    }
   catch(e){
    console.log(e);
   }
  }
  const [dataupdate,setdataupdate]=useState([]);
  useEffect(()=>{
    // if(!dataupdate.length)
    getData();
    // else
    // setdata(dataupdate);
  },[])

  return <div className="flex w-[100%] h-[100vh] bg-[rgba(255,255,255,.3)] lg:!overflow-hidden  flex flex-col ">
    <Header  states={states} setstates={setstates} />
    <WebSocketDemo/>
    <div className={` bg-[rgba(0,0,0,.05)] w-[100%] min-h-[60%] flex lg:flex-row flex-col justify-start items-start px-[40px] `}>
       <PlaceOrder  dataupdate={dataupdate} setdataupdate={setdataupdate} />

       <div className=" lg:w-[65%] w-[100%] lg:mt-[1px] mt-[20px]  flex flex-col  h-[100%] ml-auto  pb-[50px] ">
   
       <div className="flex lg:-mt-[40px]  text-[16px] tracking-wider gap-[10px] flex-col ">
        Active Orders
       <TableComp maindata={data}  name="activehistory"/>
       </div>
       <div className="flex lg:-mt-[40px] text-[16px] tracking-wider gap-[10px] flex-col ">
         Order History
        <TableComp maindata={data} name="orderhistory" />
       </div>
       </div>
    </div>
  </div>
}

export default App;



const Header=({states,setstates})=>{

  
  return <div className="w-[100%] min-h-[60px] bg-[rgba(0,0,0,.9)] flex px-[40px]  justify-between items-center text-white "> 
   
      <div className="text-semibold  text-[18px] tracking-wider"> Trading System</div>
      <div className=" flex gap-[20px]">
           {
              ["client","Admin"].map((e,i)=>{
                return <div  onClick={()=>{
                  setstates(i);
                }} className={` ${states ==i? "  bg-white text-[rgba(0,0,0)]  rounded-[20px]" : "" } text-medium tracking-wider cursor-pointer py-1 px-3  capitalize text-[16px]`} key={i}  >{e}</div>
              })


           }
        
        </div>  
      </div>
}