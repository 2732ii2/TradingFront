import { useEffect, useState } from 'react';
import './App.css';
import { WebSocketDemo } from './websocket';
import PlaceOrder from './InputCard';
import TableComp from './Table';
import axios from "axios";
import {Provider} from "react-redux";
import { io } from "socket.io-client";
import store from './Redux/store';
import Notification from './Notification';
// const url=`http://localhost:1200/`;
const url=`https://newtradingapi.onrender.com/`;
const socket = io(`${url}`);
const App=()=>{
  const [states,setstates]=useState(0);
  console.log(states);
  const [data,setdata]=useState([]);
  console.log("=> arr ",data);
  // const url=`https://tradingbackend-ebt1.onrender.com/`;
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
  const [notify,setnotify]=useState();
  useEffect(() => {
    socket.emit("room_id",{name: ((JSON.parse(localStorage.getItem("room")))?.name)})
 

    socket.on("notify",(data)=>{
      console.log(data);
      setnotify(data.msg);
    })
    //  reversedArray= reverseArray(dataArr);
    console.log("table updated");
  }, [socket]);
  const [dataupdate,setdataupdate]=useState([]);
  useEffect(()=>{
    // if(!dataupdate.length)
    getData();
    // else
    // setdata(dataupdate);
  },[])
  const [msg,setmsg]=useState("");
  console.log(msg);
  const [hide,sethide]=useState(true);
  return(  <Provider store={store}>
  <div className={` flex w-[100%] relative h-[100vh] bg-[rgba(255,255,255,.3)] ${states==0?"":""}  flex flex-col pb-[30px]`}>
    <Header  states={states} setstates={setstates} />
   {notify? <p className="bg-[lightgreen] px-3py-2">{notify}</p>:null}
    <WebSocketDemo states={states} setstates={setstates}  />
    <div className={` bg-[rgba(0,0,0,.05)] w-[100%] ${states==0?"h-[auto]":"h-[auto]"} flex lg:flex-row flex-col justify-start items-start px-[40px] `}>
     {states==0?  <PlaceOrder  dataupdate={dataupdate} setdataupdate={setdataupdate} /> :null}
       <div className={` ${states==0?"lg:w-[65%] w-[100%] ":" w-[100%] "}  flex flex-col  h-[100%] ml-auto   `}>

{/* NOTIFICATION */}

    <Notification  states={states} hide={hide} sethide={sethide} />



     {states!=0?  <div className="flex  text-[16px] mt-[10px] tracking-wider gap-[10px] flex-col ">
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
  </Provider>)
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