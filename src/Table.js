
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { io } from "socket.io-client";


// const url=`https://tradingbackend-ebt1.onrender.com/`;
const url=`http://localhost:1200/`;
// http://localhost:1200/
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

function suggestionExtracter(arr,setmsg,msg){
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
  console.log("first",l[0]);
  for(var k=0;k<l.length;k++){
    console.log("---",first,l[k])
    if(first.side!=l[k].side)
    {console.log("=>",l[k],first);
      // 🤝 Choose Ashad or Anas for your settlement - both offering identical pricing! ⚖️ 💫
      if(!msg)
      setmsg(`🤝 Choose ${l[k].name} or ${first.name} for your settlement - both offering identical pricing! ⚖️ 💫`)
    break;
  }
  }

}
}
function reverseArray(arr,name,setmsg,msg) {
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
      suggestionExtracter(reversed,setmsg,msg);
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
  var {maindata,name,msg,setmsg}=props;
 
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
      render: (text) =><button className="border-[1px] border-black px-2 py-1 !transition-all  hover:bg-[black] hover:text-white ">select</button>
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
    
        <Table 
          columns={columns} 
          dataSource={ !dataArr.length?reverseArray(maindata?.data,name,setmsg,msg):reverseArray(dataArr,name,setmsg,msg)} 
          pagination={{ 
            pageSize: 4,  // Number of rows per page
          //   showSizeChanger: true, // Allow changing the page size
          //   pageSizeOptions: ['3', '5', '10'], // Page size options
          }} 
        />
      );
}

export default TableComp;
