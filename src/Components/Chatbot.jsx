import { IoSend } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import run from "../Hook/UseAI";
import "../App.css"
import { useClerk } from "@clerk/clerk-react";
import ItemGrid from "./ItemschatBotCard";
import { useNavigate, useParams } from "react-router-dom";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([{ role: "bot", message: "How can we help you today?" , products:[] }]);
  const [userInput, setUserInput] = useState("");
  //const [items , setItems] = useState([])
  const [loading , setloading] = useState(false)
  const chatEndRef = useRef(null);
  const {user} = useClerk()
  const {id} = useParams()
  const navigate = useNavigate()
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!userInput) return;

    // Add the user's input to the chat
    setChat((prevChat) => [...prevChat, { role: "user", message: userInput }]);

    try {
        // Clear user input field
        setUserInput("");
        setloading(true)
        // Process the user input with your AI function
        const res = await run(userInput);

        console.log("AI Response:", res);
        if(res.cart === "yes" && id){
          
            const response = await fetch(`http://127.0.0.1:5000/add-to-cart`,{
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:user?.primaryEmailAddress?.emailAddress , product:id , quantity:1}),
                method:"POST"
            })
            const data = await response.json()
            setChat((prevChat) => [
                ...prevChat,
                { role: "bot", message: data.message },
                
            ]);
            setloading(false)
            alert("Item added to the cart!!!")
            return
            
        }
        
        // Prepare query parameters for the API call
        const queryParams = new URLSearchParams({
            category: res?.category || "",
            name: res?.name || "",
            max_price: res?.max_price || 100000,
            min_price: res?.min_price || 0,
            rating: res?.rating || 0,
            brand: res?.brand || "",
            instock: res?.instock ?? "",
            limit: res?.count || 10,
        });
        setloading(true)
        // Fetch data from the backend
        const response = await fetch(`http://127.0.0.1:5000/get-product?${queryParams.toString()}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("API Response Data:", data);
        
        // Add the bot's response to the chat
        setChat((prevChat) => [
            ...prevChat,
            { role: "bot", message: "Here are the products I found:" },
            { role: "bot", products: data},
        ]);
        setloading(false)
    } catch (error) {
        console.error("Error occurred:", error);

        // Add error message to the chat
        setChat((prevChat) => [
            ...prevChat,
            { role: "bot", message: "Sorry, there was an error processing your request." },
        ]);
    }

    
};
useEffect(()=>{
    console.log(chat[chat.length-1]);
    console.log(user?.primaryEmailAddress?.emailAddress);
    const email = user?.primaryEmailAddress?.emailAddress;
    const message = chat[chat.length-1].message;
    const role = chat[chat.length-1].role
    const saveChat = async()=>{
      try{
        const response = await fetch("http://127.0.0.1:5000/save-chat" , {
            headers:{
                "Content-type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({email , role , message})
        })
        const data = await response.json()
        console.log(data);
      }
    
    catch(e){
      console.log(e);
    }
    }
    saveChat()
} , [chat , user])

useEffect(()=>{
if(user){
    console.log(user);
    const Auth = async()=>{
      try{
        const response = await fetch(" http://127.0.0.1:5000/auth" , {
            method:"POST" , 
            body:JSON.stringify({name:user?.fullName || user?.username , email:user?.primaryEmailAddress?.emailAddress}),
            headers:{
                "Content-type":"application/json",
            }
        })
        const data = await response.json()
        console.log(data); 
        //navigate("/")
        //login({name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress})
    }
    catch(e){
      console.log(e);
    }
  }
    Auth()
}
} , [user])


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="relative">
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-600 text-2xl text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {/* Chatbot Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:w-[70vw] h-[70vh] sm:h-auto rounded-t-lg sm:rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Chat with Us</h2>
              <div className="flex items-center gap-4">
                <span
                  className="text-2xl cursor-pointer"
                  onClick={() =>
                    setChat([{ role: "bot", message: "How can we help you today?" }])
                  }
                >
                  <MdDelete />
                </span>
                <span className="text-xl cursor-pointer" onClick={()=>(navigate("/history"))}>
                <BsClockHistory />
                </span>
                <button
                  onClick={toggleChatbot}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✖
                </button>
                
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col md:h-[60vh] h-[45vh] overflow-y-scroll space-y-4 mb-4">
              {chat.map((chatItem, index) => (
                <div
                  key={index}
                  className={`flex ${chatItem.role === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex ${chatItem.role === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-500 text-white"} md:p-2 p-1   max-w-[80%] ${chatItem?.products?.length>0 ? "items-start bg-white" : "items-center rounded-full" } mx-2`}
                  >
                    <div className="flex-shrink-0 items-center">
                      <div className="bg-black text-white rounded-full text-[20px] md:p-2 p-1 md:w-10 md:h-10 flex items-center justify-center">
                        {chatItem.role === "bot" ? <LiaRobotSolid /> : <FaUser />}
                      </div>
                    </div>
                    <div className="ml-2 text-[10px] md:text-[15px] pr-2 ">{chatItem.message}</div>
                    <div className="p-2">{chatItem.role==="bot" && chatItem?.products?.length>0 ? <ItemGrid items={chatItem.products}></ItemGrid>:null }</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Section */}
            <form onSubmit={submit} className="flex items-center border-t pt-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="ml-3 bg-blue-600 h-12 w-12 flex justify-center items-center p-3 rounded-full text-white hover:bg-blue-700 transition"
              >
                {loading  ? <><span className="loader"></span></> : <IoSend />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
