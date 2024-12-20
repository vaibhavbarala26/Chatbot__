import { SignOutButton, useClerk } from "@clerk/clerk-react"
import { useEffect } from "react"

function App() {
  const {user} = useClerk()
    
  useEffect(()=>{
if(user){
      const Auth = async()=>{

          const response = await fetch(" http://127.0.0.1:5000/register" , {
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

    </>
  )
}

export default App
