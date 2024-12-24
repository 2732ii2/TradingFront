
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import {AddElement,Setmsg} from "./Redux/action";

// const url=`https://tradingbackend-ebt1.onrender.com/`;
// const url=`http://localhost:1200/`;
const url=`https://newtradingapi.onrender.com/`;
const socket = io(`${url}`);

function extractDateTime(isoString) {
  // Convert to Date object
  const date = new Date(isoString);

  // Extract date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const day = date.getDate();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format date and time
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { date: formattedDate, time: formattedTime };
}

// Example usage
const result = extractDateTime('2024-12-21T17:21:12.699Z');
console.log(result.date); // Output: 2024-12-21
console.log(result.time); // Output: 17:21:12

const columns = [
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Status',
    dataIndex: 'side',
    key: 'side',
    render: (text) => <a className={` ${text=="sell"?" bg-[red] ":" bg-[green]"} text-white hover:text-white  px-2  py-1 rounded-[5px] `}>{text}</a>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => <a>  {extractDateTime(text).time} and  {extractDateTime(text).date} </a>,
  },
  {
    title: 'Expering Type',
    dataIndex: 'expirationType',
    key: 'expirationType',
    render: (text) => <a className=" min-w-[60px] text-center">  {text} </a>,
  },
  {
    title: 'Time',
    dataIndex: 'expirationType', 
    key: 'expires',
    render: (_, record) => {
      // console.log("record",record) ;
      const value =
        record.expirationType == 'datetime'
          ? record.dateTime 
          : record.durationValue; 
      return (
        <a className="min-w-[60px]  text-center">
         {record.expirationType == 'datetime'
          ? extractDateTime(value).time
          : (value)   }
        </a>
      );
    },
  },
  
];


const data = [

   {
    createdAt:"2024-12-21T16:04:02.901Z",
durationUnit:"minutes",
durationValue:"",
expirationType:"",
price:"120",
quantity:"10",
side:20,
symbol:"",
updatedAt:""
   }

];

function suggestionExtracter(arr,dispatch,msg){
  var obj={};
console.log("arr",arr);
for(var i=0;i<arr.length;i++){
  const {price}=arr[i];
  if(!Object.keys(obj).includes(`${price}`)){
      obj[`${price}`]=1
    console.log("02",obj);

  }
  else{
    console.log("01");
    var count=obj[price];
    obj[price]=count+1;
  }
}
console.log(obj);
for(var j=0;j<Object.keys(obj).length;j++)
{
  var l=[]
  for(var i=0;i<arr.length;i++){
    const {price}=arr[i];
     if(Object.keys(obj)[j]==price){
      // console.log(arr[i]);
      l.push(arr[i]);
     }
  }
  console.log(l);
  
  var first= l[0];
  // console.log("first",l[0]);
  for(var k=0;k<l.length;k++){
    // console.log("---",first,l[k])
    if(first.side!=l[k].side)
    {
      console.log("=>",l[k],first);
      // 🤝 Choose Ashad or Anas for your settlement - both offering identical pricing! ⚖️ 💫
      if(!msg)
        dispatch(Setmsg(`🤝 Choose ${l[k].name} or ${first.name} for your settlement - both offering identical pricing! ⚖️ 💫`))
    break;
  }
  }

}
}
function reverseArray(arr,name,dispatch,msg) {
    let reversed = [];
    for (let i = arr?.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    if(name!="orderhistory" ){
      reversed=reversed.filter(e=>{
        // console.log("+",e);
        if(!e?.notactive){
          return e;
        }
      })
      suggestionExtracter(reversed,dispatch,msg);
      //  we are going to write a logic for making the sugeestion 
       
    }
    else{
      reversed=reversed.filter(e=>{
        if(e?.notactive){
          return e;
        }
      })
      }
    return reversed;
  }
  
  
const TableComp = (props) => {
    // console.log("=> ",maindata?.data?.reverse());
    // let array = [1, 2, 3, 4, 5];
  //
  const dispatch=useDispatch();
  const select=useSelector(state=>state);
  console.log("select",select);
  


  
  var {maindata,name}=props;
  const [dataArr,setDataArr]=useState([]);
// console.log(dataArr)
  useEffect(() => {
    socket.on("sendingUpdatedData",(data)=>{
      // console.log(data);
      setDataArr(data?.data);
    })
    //  reversedArray= reverseArray(dataArr);
    console.log("table updated");
  }, []);
  if(name==="settement"){
    var count=0;
    var c=0;
    columns.forEach(e=>{
      if(e?.title=="Settlement"){
         count=1;
      }
      if(e?.title=="Name"){
        c=1;
     }
    })
    if(count==0)
    columns.push({
      title: 'Settlement',
      dataIndex: '-',
      key: '',
      render: (text,record) =><button  onClick={()=>{ 
      //  if(select?.length<=2)
       dispatch(AddElement(record))
         // setSettlementArr((prev)=>{
        console.log("-----",Object.values((select?.settlementArr?.map(e=>e.name))).includes(record?.name));
        // ${Object.values((settlementArr?.map(e=>e.name)))?.includes(record?.name)==true ? "bg-[black] text-white" :""  }
        // return [...prev,record]
      // }) 
    }} className={`border-[1px] border-black px-2 py-1 !transition-all  hover:bg-[black] hover:text-white ${Object.values((select?.settlementArr?.map(e=>e.name))).includes(record?.name)?"bg-[black] text-white":""} `}>select</button>
    })
    if( c==0)
    columns.unshift({
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) =><button className="  px-2 py-1 ">{text}</button>
    })
  }
    return (
    
        <div className="relative">
        <Table 
          columns={columns} 
          dataSource={ !dataArr.length?reverseArray(maindata?.data,name,dispatch,select.msg):reverseArray(dataArr,name,dispatch,select.msg)} 
          pagination={{ 
            pageSize: 4,  // Number of rows per page
          //   showSizeChanger: true, // Allow changing the page size
          //   pageSizeOptions: ['3', '5', '10'], // Page size options
          }} 
        />
       {(name=="settement" && (select?.settlementArr?.length==2 ))&& <button onClick={()=>{
        var a=(select?.settlementArr[0]);
        var b=(select?.settlementArr[1]);
        console.log("ab",a,b)
        // if((a.quantity)<=(b.quantity)){
        //   console.log("messages has been send it");
        //   socket.emit("notification", {room :a.name ,msg :"your stocks has solled out"})
        // }



        if(a.quantity<b.quantity){
          console.log("---1");
          if(a.side=="sell")
          { 
          socket.emit("notification", {room :a.name ,msg :"your "+a.quantity+`${a.side=="sell"?" stocks was sold " :""}`})
          socket.emit("notification", {room :b.name ,msg :" you have bought "+a.quantity+" stocks" + " and left with "+parseInt(b.quantity-a.quantity)+" stock"})

          }
          else{
          socket.emit("notification", {room :a.name ,msg :"you have bought "+a.quantity+" stocks"})
          socket.emit("notification", {room :b.name ,msg :" your "+a.quantity+" stocks" + " sold out and left with "+parseInt(b.quantity-a.quantity)+" stock"})

          }
        }
        else if(a.quantity>b.quantity){
          console.log("---2");

          if(a.side=="sell")
          { 
          socket.emit("notification", {room :a.name ,msg :"your "+b.quantity+" stocks was sold out and left with "+parseInt(a.quantity-b.quantity)})
          socket.emit("notification", {room :b.name ,msg :" you have bought "+b.quantity+" stocks"})
          }
          else{
  
          socket.emit("notification", {room :a.name ,msg :" you have bought "+b.quantity+"stocks and left with "+parseInt(a.quantity-b.quantity)})
          socket.emit("notification", {room :b.name ,msg :" your "+b.quantity+ " stocks " +" was sold "})
          }
        }
        else{
          console.log("---3");

          if(a.side=="sell")
          { 
            socket.emit("notification", {room :a.name ,msg :` you have stocks was sold out`})
            socket.emit("notification", {room :b.name ,msg :` you have bought all the stocks `})
          }
          else{
       
            socket.emit("notification", {room :a.name ,msg :` you have bought all the stocks `})
            socket.emit("notification", {room :b.name ,msg :` you have stocks was sold out`})
          }
        }
       }} className="absolute  bg-[blue] rounded-[4px] text-white  px-3 py-[4px] -top-[45px] right-[20px]"> Settle Trades</button>}
        </div>
      );
}

export default TableComp;
