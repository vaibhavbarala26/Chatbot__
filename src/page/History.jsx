import { useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";

const History = () => {
  const { user } = useClerk();
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-chat?email=${user?.primaryEmailAddress.emailAddress}`
        );
        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setUserData(data.user);
        setChats(data.chats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChatHistory();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* User Details */}
        {userData && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {userData.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}

        {/* Chat History */}
        {chats.length > 0 ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chat History</h2>
            <ul className="divide-y divide-gray-200">
              {chats.map((chat, index) => (
                <li
                  key={index}
                  className={`py-4 px-6 rounded-lg mb-8 cursor-pointer hover:shadow-lg shadow-md ${
                    chat.role === "bot"
                      ? "bg-gradient-to-r from-gray-100 to-gray-200"
                      : "bg-gradient-to-r from-blue-100 to-blue-200"
                  }`}
                >
                  <p className="text-gray-700">
                    <strong>Role:</strong> {chat.role}
                  </p>
                  <p className="text-gray-700">
                    <strong>Message:</strong> {chat.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Timestamp:</strong>{" "}
                    {new Date(chat.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          userData && (
            <p className="text-center text-gray-500">
              No chats found for this user.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default History;
