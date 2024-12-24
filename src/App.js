import { useEffect, useState } from 'react';
import './App.css';
import { WebSocketDemo } from './websocket';
import PlaceOrder from './InputCard';
import TableComp from './Table';
import axios from "axios";
const App=()=>{
  const [states,setstates]=useState(0);
  console.log(states);
  const [data,setdata]=useState([]);
  console.log("=> arr ",data);
  // const url=`https://tradingbackend-ebt1.onrender.com/`;
  const url=`http://localhost:1200/`;
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
  const [msg,setmsg]=useState("");
  console.log(msg);

  return <div className={` flex w-[100%] relative h-[100vh] bg-[rgba(255,255,255,.3)] ${states==0?"lg:!overflow-hidden":""}  flex flex-col `}>
    <Header  states={states} setstates={setstates} />
    <WebSocketDemo states={states} setstates={setstates}  />
    <div className={` bg-[rgba(0,0,0,.05)] w-[100%] ${states==0?"h-[90%]":"h-[auto]"} flex lg:flex-row flex-col justify-start items-start px-[40px] `}>
     {states==0?  <PlaceOrder  dataupdate={dataupdate} setdataupdate={setdataupdate} /> :null}
       <div className={` ${states==0?"lg:w-[65%] w-[100%] ":" w-[100%] "}  flex flex-col  h-[100%] ml-auto   `}>
      {(msg && states==1) ?<p className="w-[100%] text-[16px] my-1 text-end  p-1 text-[red]">{msg}</p>:null}
     {states!=0?  <div className="flex  text-[16px] tracking-wider gap-[10px] flex-col ">
        Settlement Orders
       <TableComp maindata={data} msg={msg} setmsg={setmsg}  name="settement"/>
       </div>:null}
       <div className="flex  text-[16px]  tracking-wider gap-[10px] flex-col ">
        Active Orders
       <TableComp maindata={data} msg={msg} setmsg={setmsg} name="activehistory"/>
       </div>
       <div className="flex  text-[16px] mt-[10px] tracking-wider gap-[10px] flex-col ">
         Order History
         <TableComp maindata={data} msg={msg} setmsg={setmsg}  name="orderhistory" />
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