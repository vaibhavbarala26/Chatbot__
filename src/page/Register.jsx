import {  SignUp, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";

const Register = () => {
  const { user } = useClerk();

  useEffect(() => {
    if (user) {
      const Auth = async () => {
        const response = await fetch("http://127.0.0.1:5000/auth", {
          method: "POST",
          body: JSON.stringify({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
      };
      Auth();
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-6">
          Ecommerce Chat Bot
        </h1>
        <div className="flex justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Register;
