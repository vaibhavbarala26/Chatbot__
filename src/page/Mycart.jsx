import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import Header from "../Components/Header.jsx"
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useClerk();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://127.0.0.1:5000/cart?email=${user?.primaryEmailAddress.emailAddress}`);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          setError(data.error || "Failed to fetch cart");
          setCartItems([]);
        } else {
          setCartItems(data.cart || []);
        }
      } catch (err) {
        setError("An error occurred while fetching the cart");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    } else {
      setError("User email is required to fetch cart");
      setLoading(false);
    }
  }, [user]);

  return (
    <>
    <Header></Header>
    <div className="max-w-4xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🛒 Your Shopping Cart</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading your cart...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : cartItems[0]?.items?.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Total Price */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-700">Total Price:</h3>
            <p className="text-xl font-semibold text-green-600">${cartItems[0]?.total_price}</p>
          </div>

          {/* Cart Items */}
          <ul className="space-y-6">
            {cartItems[0].items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">
                      {item.product_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">{item.product_name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-lg font-semibold text-gray-800">
                  ${item.total_price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
      <div className="flex items-center justify-center my-10">
      <button className="bg-black text-white p-2 rounded-md">BUY NOW</button>
      </div>
    </div>
    </>
  );
};

export default Cart;
