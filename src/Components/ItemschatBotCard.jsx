import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import {Link} from "react-router-dom"
import "../App.css"
const ItemGrid = ({ items }) => {
  const [loading , setloading] = useState(false)
  const {user} = useClerk()
  const addtocart = async(id)=>{
    if(id){
        setloading(true)
        const response = await fetch("http://127.0.0.1:5000/add-to-cart" ,{
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email:user?.primaryEmailAddress?.emailAddress , product:id , quantity:1}),
            method:"POST"
        })
        const data = await response.json()
        console.log(data);
        alert("added to cart!!!!!!")
        setloading(false)
    }
  }
  return (
    <div className="container mx-auto p-4  flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
            <div key={index} className=" bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
         <Link  to={`/product/${item.id}`}> <div
            
            className=" flex flex-col   justify-between  cursor-pointer"
          >
            <h3 className="md:text-lg text-sm font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">Brand : {item.brand}</p>
            <p>Price: ${item.price}</p>
            <p>{item.stock > 0 ? <span className="text-green-400">In stocks</span>:<span className="text-red-500"> Out of stocks</span>}</p>
            </div></Link>
            {loading ? <div className="bg-black flex items-center justify-center py-1 px-2 rounded-md mt-2"><span className="loader2"></span></div>:<><button onClick={()=>(addtocart(item.id))} className="bg-black text-white py-1 px-2 rounded-md mt-2">Add to Cart</button>
            </>}
            
            </div>
            
        ))}
      </div>
    </div>
  );
};

export default ItemGrid;
