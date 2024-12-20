import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './page/Register.jsx';
import Login from "./page/Login.jsx"
//import { AuthProvider } from './context/Authcontext.jsx';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import Home from './page/Home.jsx';
import GetProduct from './page/Product.jsx';
import Mycart from './page/Mycart.jsx';
import History from './page/history.jsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}
const router = createBrowserRouter([
  {
    path:"/cart",
    element:<Mycart></Mycart>
  },
  {
    path:"/history",
    element:<History></History>
  },
  {
    path:"/product/:id",
    element:<GetProduct></GetProduct>
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/",
    element:<>
    <SignedIn>
      <Home></Home>
    </SignedIn>
    <SignedOut>
      <h1>hello</h1>
    </SignedOut>
    </>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
   <RouterProvider router={router} />
   </ClerkProvider>
  </React.StrictMode>,
  
)