import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Chatbot from "../Components/Chatbot";
import { useClerk } from "@clerk/clerk-react";

const GetProduct = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading,setloading] = useState(false)
  const [error, setError] = useState( );
  const {user} = useClerk()
  const addtocart = async()=>{
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
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-a-product?id=${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "An error occurred");
          setProduct(null);
          return;
        }

        const data = await response.json();
        setProduct(data.product); // Adjust based on your API response structure
        setError("");
      } catch (err) {
        console.log(err);
        
        setError("Failed to fetch product. Please try again later.");
        setProduct(null);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is required in the URL");
    }
  }, [id]); // Run when `id` changes

  return (
    <div className="  ">
      <Header />
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {product && (
        <div className="max-w-3xl mx-auto mt-6 p-6 border rounded shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>

          <div className="flex items-center space-x-4 mb-6">
            {/* Product Image */}
            <img
              src={product?.image || "https://via.placeholder.com/150"}
              alt={product?.name}
              className="w-40 h-40 object-cover rounded"
            />

            {/* Product Info */}
            <div>
              <p className="text-lg text-gray-700">
                <strong>Brand:</strong> {product?.brand}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {product?.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Price:</strong> ${product?.price}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-black text-white px-6 py-2 rounded shadow  transition">
              Buy Now
            </button>
            <button onClick={addtocart} disabled={loading} className="bg-black disabled:bg-slate-500 text-white px-6 py-2 rounded shadow  transition">
              Add to Cart
            </button>
          </div>
          <Chatbot></Chatbot>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
