
import camera from "../assets/Camera.avif";
import laptop from "../assets/Laptop.avif";
import smartphone from "../assets/smartphone.avif";
import smartWatch from "../assets/smartWatch.webp";
import bud from "../assets/bud.avif";
import TV from "../assets/TV.avif";
import tab from "../assets/tab.avif";
import speaker from "../assets/speaker.avif";

const devices = [
  { name: "Smartphone", price: 699, image: smartphone, description: "Latest smartphone with high-end features.", link: "https://example.com/smartphone" },
  { name: "Laptop", price: 999, image: laptop, description: "High-performance laptop for work and play.", link: "https://example.com/laptop" },
  { name: "Smartwatch", price: 199, image: smartWatch, description: "Track your fitness and stay connected.", link: "https://example.com/smartwatch" },
  { name: "Wireless Earbuds", price: 129, image: bud, description: "Compact, high-quality sound earbuds.", link: "https://example.com/earbuds" },
  { name: "Tablet", price: 499, image: tab, description: "Lightweight tablet with powerful features.", link: "https://example.com/tablet" },
  { name: "Bluetooth Speaker", price: 89, image: speaker, description: "Portable speaker with excellent sound quality.", link: "https://example.com/speaker" },
  { name: "Smart TV", price: 1200, image: TV, description: "4K Ultra HD Smart TV with streaming apps.", link: "https://example.com/smarttv" },
  { name: "Camera", price: 749, image: camera, description: "Professional DSLR camera for photography enthusiasts.", link: "https://example.com/camera" },
];

function HeroPage() {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {devices.map((device, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <a
              href={device.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition"
            >
              <img
                src={device.image}
                alt={device.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            </a>
            <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
            <p className="text-gray-600 mb-2">{device.description}</p>
            <div className="text-black font-bold text-lg mb-4">${device.price}</div>
            <div className="flex justify-between">
              <button className="bg-black text-white py-2 px-4 rounded ">
                Add to Cart
              </button>
              <a
                href={device.link}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-bold underline hover:text-green-800 transition"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroPage;
