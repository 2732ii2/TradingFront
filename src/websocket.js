import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('wss://stream.binance.com:9443/ws/btcusdt@ticker');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(()=>{
  //  console.log(lastMessage?JSON.parse(lastMessage?.data):null);
  },[lastMessage])
//   useEffect(() => {
//     if (lastMessage !== null) {
//       setMessageHistory((prev) => prev.concat(lastMessage));
//     }
//   }, [lastMessage]);

//   const handleClickChangeSocketUrl = useCallback(
//     () => setSocketUrl('wss://demos.kaazing.com/echo'),
//     []
//   );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className="  w-[100%] bg-[rgba(0,0,0,.05)] h-[40%] flex flex-col px-[30px] py-[20px] gap-[10px] ">

    <h1 className=" tracking-wider  mono !font-medium  text-[18px] " >Trade Dashboard</h1>
      
     <div className="w-[100%] bg-white h-[70%] text-black rounded-[20px] flex items-center  justify-between px-[40px]">
     <div className=" flex flex-col gap-[20px]">


     { lastMessage?<div className=" text-[20px] !font-semibold" > {JSON.parse(lastMessage?.data)?.s }  </div>:null}
     { lastMessage?<div className="text-[22px] !font-bold">{"$"}{parseFloat(JSON.parse(lastMessage?.data)?.a) }  </div>:null}

     </div>
   {  lastMessage? <div className="flex  flex-wrap lg:w-[60%]  py-2 lg:ml-none ml-[100px] ">

     {
        ["Volume","High","Low"].map((e,i)=>{
            return <div className=" min-w-[200px] lg:mx-[40px] my-[10px] h-[auto] text-[14px] text-[rgba(0,0,0,.4)] !font-medium flex flex-col">
                     <div > 24h {e}  </div>
                     <div className="text-black text-[20px]" > {i==0?parseFloat(JSON.parse(lastMessage?.data)?.v).toFixed(2)   :i==1?parseFloat(JSON.parse(lastMessage?.data)?.h).toFixed(2) : parseFloat(JSON.parse(lastMessage?.data)?.l).toFixed(2)} </div>

                </div>
        })
     
     }
     </div>:null}
     </div>


    </div>
  );
};
