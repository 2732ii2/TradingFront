// // import { useState } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Button } from "@/components/ui/button"
// // import { Calendar, Clock } from 'lucide-react'

// // export default function PlaceOrder() {
// //   const [expirationType, setExpirationType] = useState("duration")

// //   return (
// //     <Card className="w-full max-w-xl mx-auto">
// //       <CardHeader>
// //         <CardTitle className="text-2xl font-bold">Place Order</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-6">
// //         <div className="space-y-2">
// //           <Label htmlFor="symbol">Symbol</Label>
// //           <Input id="symbol" defaultValue="BTC-USDT" />
// //         </div>

// //         <div className="space-y-2">
// //           <Label htmlFor="side">Side</Label>
// //           <Select defaultValue="buy">
// //             <SelectTrigger id="side">
// //               <SelectValue placeholder="Select side" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="buy">Buy</SelectItem>
// //               <SelectItem value="sell">Sell</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div className="space-y-2">
// //           <Label htmlFor="quantity">Quantity (BTC)</Label>
// //           <Input 
// //             id="quantity" 
// //             type="number" 
// //             placeholder="0.00000000" 
// //             step="0.00000001"
// //           />
// //         </div>

// //         <div className="space-y-2">
// //           <Label htmlFor="price">Price (USDT)</Label>
// //           <Input 
// //             id="price" 
// //             type="number" 
// //             placeholder="0.00" 
// //             step="0.01"
// //           />
// //         </div>

// //         <div className="space-y-2">
// //           <Label>Expiration Type</Label>
// //           <RadioGroup
// //             defaultValue="duration"
// //             onValueChange={setExpirationType}
// //             className="flex gap-4"
// //           >
// //             <div className="flex items-center space-x-2">
// //               <RadioGroupItem value="duration" id="duration" />
// //               <Label htmlFor="duration" className="flex items-center gap-2">
// //                 <Clock className="h-4 w-4" />
// //                 Duration
// //               </Label>
// //             </div>
// //             <div className="flex items-center space-x-2">
// //               <RadioGroupItem value="datetime" id="datetime" />
// //               <Label htmlFor="datetime" className="flex items-center gap-2">
// //                 <Calendar className="h-4 w-4" />
// //                 Date & Time
// //               </Label>
// //             </div>
// //           </RadioGroup>
// //         </div>

// //         <div className="grid grid-cols-2 gap-4">
// //           <div className="space-y-2">
// //             <Input 
// //               placeholder="Duration" 
// //               type="number"
// //               disabled={expirationType !== 'duration'}
// //             />
// //           </div>
// //           <div className="space-y-2">
// //             <Select disabled={expirationType !== 'duration'}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Minutes" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="minutes">Minutes</SelectItem>
// //                 <SelectItem value="hours">Hours</SelectItem>
// //                 <SelectItem value="days">Days</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>

// //         <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
// //           Place Order
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   )
// // }
// import { useState } from "react";
// import { Card, Input, Radio, Select, Button } from "antd";
// import { Calendar, Clock } from "lucide-react";

// const { Option } = Select;

// export default function PlaceOrder() {
//   const [expirationType, setExpirationType] = useState("duration");
//  const [ind,setind]=useState(0);
//   return (
//     <Card
//       title={<h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Place Order</h2>}
//       style={{ width: "30%" ,height:"auto"}}
//     >
//       <div style={{ marginBottom: "16px" }}>
//         <label htmlFor="symbol" style={{ display: "block", marginBottom: "8px" }}>
//           Symbol
//         </label>
//         <div className="w-[100%] py-[5px] text-center bg-[rgba(0,0,0,.2)]  text-black !font-medium tracking-wider text-[18px]" > BTC-USDT</div>
//       </div>

//       <div style={{ marginBottom: "16px" }}>
//         <label htmlFor="side" style={{ display: "block", marginBottom: "8px" }}>
//           Side
//         </label>
//         <Select defaultValue="buy" id="side" style={{ width: "100%" }}>
//           <Option value="buy">Buy</Option>
//           <Option value="sell">Sell</Option>
//         </Select>
//       </div>

//       <div style={{ marginBottom: "16px" }}>
//         <label htmlFor="quantity" style={{ display: "block", marginBottom: "8px" }}>
//           Quantity (BTC)
//         </label>
//         <Input
//           id="quantity"
//           type="number"
//           placeholder="0.00000000"
//           step="0.00000001"
//         />
//       </div>

//       <div style={{ marginBottom: "16px" }}>
//         <label htmlFor="price" style={{ display: "block", marginBottom: "8px" }}>
//           Price (USDT)
//         </label>
//         <Input
//           id="price"
//           type="number"
//           placeholder="0.00"
//           step="0.01"
//         />
//       </div>

//       <div style={{ marginBottom: "16px" }}>
//         <label style={{ display: "block", marginBottom: "8px" }}>Expiration Type</label>
//         {/* <Radio.Group
//           onChange={(e) =>{e.preventDefault(); setExpirationType(e.target.value)}}
//           value={expirationType}
//         >
//           <Radio value="duration">
//             <Clock style={{ marginRight: "8px" }} size={16} />
//             Duration
//           </Radio>
//           <Radio value="datetime" style={{ marginLeft: "16px" }}>
           
//             Date & Time
//           </Radio>
//         </Radio.Group> */}

//       <div className="w-[100%] flex gap-[50px]"> {["Duration","Date & Time "].map((e,i)=>{
//            return <div className=" flex gap-[20px] items-center ">  <input  checked={ind==i}  className=" " onChange={e=>{
//             console.log(e.target.value);
//             setind(i);
//            }} type="radio"/> <div className="flex gap-[2px] items-center">{ i==0? <Clock style={{ marginRight: "8px" }} size={16} />: <Calendar style={{ marginRight: "8px" }} size={16} />}
//        {e} </div></div>
//       }) 
//        } </div>
//       </div>

//       {ind==0?<div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
//         <Input
//           placeholder="Duration"
//           type="number"
//           disabled={expirationType !== "duration"}
//         />
//         <Select
//           disabled={expirationType !== "duration"}
//           style={{ width: "100%" }}
//           placeholder="Minutes"
//         >
//           <Option value="minutes">Minutes</Option>
//           <Option value="hours">Hours</Option>
//           <Option value="days">Days</Option>
//         </Select>
//       </div>:<div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
//       <Input
//           placeholder="Duration"
//           type="datetime-local"
//           disabled={expirationType !== "duration"}
//         />
        
//         </div>}

//       <Button
//         type="primary"
//         style={{ width: "100%", height: "48px", fontSize: "16px" }}
//       >
//         Place Order
//       </Button>
//     </Card>
//   );
// }






import { useEffect, useState } from "react";
import { Card, Input, Select, Button } from "antd";
import { Calendar, Clock } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

const { Option } = Select;
// const url=`https://tradingbackend-ebt1.onrender.com/`;
const url=`http://localhost:1200/`;
const socket = io(url);

export default function PlaceOrder({dataupdate,setdataupdate}) {
  // dataupdate={dataupdate} setdataupdate={setdataupdate} 
  const [formData, setFormData] = useState({
    symbol: "BTC-USDT",
    side: "buy",
    quantity: "",
    price: "",
    expirationType: "duration",
    durationValue: "",
    durationUnit: "minutes",
    dateTime: "",
    name:"",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlaceOrder = async() => {
    console.log("Form Data:", formData);
    socket.emit("room_id",{name:formData.name})
  

    localStorage.setItem("room",JSON.stringify({name:formData.name}));

    // http://localhost:1200
    try{
      const resp=await axios.post(`${url}save`,formData);
    console.log(resp);
    }
    catch(e){
      console.log(e);
    }
    // setdataupdate(!dataupdate);
   socket.emit("recieveDataBack",{message:"recievedataback" })
   setFormData({
    symbol: "BTC-USDT",
    side: "buy",
    quantity: "",
    price: "",
    expirationType: "duration",
    durationValue: "",
    durationUnit: "minutes",
    dateTime: "",
  })
  };
  const [messages, setMessages] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
  useEffect(() => {
    // Connect to the Socket.IO server
   

    // Handle initial connection
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });
    // 
    socket.on("sendingUpdatedData",(data)=>{
      console.log(data);
      setdataupdate(data?.data);
    })
    // Cleanup on component unmount
    // return () => {
    //   socket.disconnect();
    //   console.log("Disconnected from server");
    // };
  }, []);
  return (
    <Card
      title={<h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Place Order</h2>}
      // style={{ width: "30%", height: "auto" }}
      className=" lg:w-[30%] w-[100%] h-[auto] -mt-[20px]"
    >
      <div style={{ marginBottom: "5px" }}>
        <label htmlFor="quantity" style={{ display: "block", marginBottom: "5px" }}>
          Name 
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Name of the user"
          step=""
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      {/* Symbol */}
      <div style={{ marginBottom: "5px" }}>
        <label htmlFor="symbol" style={{ display: "block", marginBottom: "5px" }}>
          Symbol
        </label>
        <div className="w-[100%] py-[2px] text-center bg-[rgba(0,0,0,.2)] text-black !font-medium tracking-wider text-[16px]">
          {formData.symbol}
        </div>
      </div>

      {/* Side */}
      <div style={{ marginBottom: "5px" }}>
        <label htmlFor="side" style={{ display: "block", marginBottom: "5px" }}>
          Side
        </label>
        <Select
          defaultValue={formData.side}
          id="side"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("side", value)}
        >
          <Option value="buy">Buy</Option>
          <Option value="sell">Sell</Option>
        </Select>
      </div>

      {/* Quantity */}
      <div style={{ marginBottom: "5px" }}>
        <label htmlFor="quantity" style={{ display: "block", marginBottom: "5px" }}>
          Quantity (BTC)
        </label>
        <Input
          id="quantity"
          type="number"
          placeholder="0.00000000"
          step="0.00000001"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
      </div>

      {/* Price */}
      <div style={{ marginBottom: "14px" }}>
        <label htmlFor="price" style={{ display: "block", marginBottom: "5px" }}>
          Price (USDT)
        </label>
        <Input
          id="price"
          type="number"
          placeholder="0.00"
          step="0.01"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </div>

      {/* Expiration Type */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Expiration Type</label>
        <div className="w-[100%] flex gap-[50px]">
          {["Duration", "Date & Time"].map((label, index) => (
            <div key={index} className="flex gap-[20px] items-center">
              <input
                type="radio"
                checked={formData.expirationType === (index === 0 ? "duration" : "datetime")}
                onChange={() => handleChange("expirationType", index === 0 ? "duration" : "datetime")}
              />
              <div className="flex gap-[2px] items-center">
                {index === 0 ? (
                  <Clock style={{ marginRight: "5px" }} size={16} />
                ) : (
                  <Calendar style={{ marginRight: "5px" }} size={16} />
                )}
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Inputs */}
      {formData.expirationType === "duration" ? (
        <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
          <Input
            placeholder="Duration"
            type="number"
            value={formData.durationValue}
            onChange={(e) => handleChange("durationValue", e.target.value)}
          />
          <Select
            value={formData.durationUnit}
            style={{ width: "100%" }}
            onChange={(value) => handleChange("durationUnit", value)}
          >
            <Option value="minutes">Minutes</Option>
            <Option value="hours">Hours</Option>
            <Option value="days">Days</Option>
          </Select>
        </div>
      ) : (
        <div style={{ marginBottom: "5px" }}>
          <Input
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => handleChange("dateTime", e.target.value)}
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        // type="primary"
        style={{ width: "100%", height: "auto", paddingTop:"5px",paddingBottom:"5px",marginTop:"5px",fontSize: "14px",border:"1px solid rgba(0,0,0,.3)" }}
        onClick={handlePlaceOrder}
        className="active:skew-y-3"
      >
        Proceed
      </button>
    </Card>
  );
}

