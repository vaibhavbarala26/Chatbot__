import { SignUp, useClerk } from "@clerk/clerk-react";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
   // const {login} = useContext(AuthContext)
    const {user} = useClerk()
    const navigate = useNavigate()
    useEffect(()=>{
if(user){
        const Auth = async()=>{

            const response = await fetch(" http://127.0.0.1:5000/auth" , {
                method:"POST" , 
                body:JSON.stringify({name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress}),
                headers:{
                    "Content-type":"application/json",
                }
            })
            const data = await response.json()
            console.log(data); 
            //navigate("/")
            //login({name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress})
        }
        Auth()
    }
    } , [user , navigate])

  return (
    <>
    <div className=" flex h-[90vh]  items-center justify-center">
        <div className="w-[50%]">
           <h1 className="text-7xl">Ecommerce Chat Bot </h1>
        </div>
        <div className=" flex justify-center">
       <SignUp></SignUp>
        </div>
    </div>
    </>
  )
}

export default Register
