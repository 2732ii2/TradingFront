
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { io } from "socket.io-client";


const url=`https://tradingbackend-ebt1.onrender.com/`;
// http://localhost:1200/
const socket = io(`${url}`);
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
    title: 'Type',
    dataIndex: 'side',
    key: 'side',
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

function reverseArray(arr,name) {
    let reversed = [];
    for (let i = arr?.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    if(name=="activehistory"){
      reversed=reversed.filter(e=>{
        console.log("+",e);
        if(!e?.notactive){
          return e;
        }
      })
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
  
  
const TableComp = ({maindata,name}) => {
    console.log("=> ",maindata?.data?.reverse());
    // let array = [1, 2, 3, 4, 5];
  //
  const [dataArr,setDataArr]=useState([]);
console.log(dataArr)
  
  useEffect(() => {
    socket.on("sendingUpdatedData",(data)=>{
      console.log(data);
      setDataArr(data?.data);
    })
    //  reversedArray= reverseArray(dataArr);
    console.log("table updated");
  }, []);
    return (
    
        <Table 
          columns={columns} 
          dataSource={!dataArr.length?reverseArray(maindata?.data,name):reverseArray(dataArr,name)} 
          pagination={{ 
            pageSize: 2,  // Number of rows per page
          //   showSizeChanger: true, // Allow changing the page size
          //   pageSizeOptions: ['3', '5', '10'], // Page size options
          }} 
        />
      );
}

export default TableComp;
