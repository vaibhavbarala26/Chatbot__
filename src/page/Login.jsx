import { SignIn, useClerk } from "@clerk/clerk-react";
import {  useEffect } from "react";

const Register = () => {
   // const {login} = useContext(AuthContext)
    const {user} = useClerk()
    
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
            //login({name:user?.fullName , email:user?.primaryEmailAddress?.emailAddress})
        }
        Auth()
    }
    } , [user])

  return (
    <>
    <div className=" flex h-[90vh]  items-center justify-center">
        <div className="w-[50%]">
           <h1 className="text-7xl">Ecommerce Chat Bot </h1>
        </div>
        <div className=" flex justify-center">
        <SignIn></SignIn>
        </div>
    </div>
    </>
  )
}

export default Register
