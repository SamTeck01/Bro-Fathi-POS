"use client"

import Image from "next/image";
import { useState } from "react";
import "./boxicons-2.1.4 (2)/boxicons-2.1.4/css/boxicons.min.css";
//import x100 from './100x100.png';

export default function App() {

  interface CartItem {
    name: string;
    category: string;
    price: number;
    img: string;
    quantity: number;
  }
  const x100 = './100x100.png';
  const [category, setCategory] = useState("All Menu");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const items: {
    [key: string]: { name: string; category: string; price: number; img: string }[]
  } = {
    'All Menu': [
      { name: "Beef Crowich", category: "Sandwich", price: 5.5, img: x100 },
      { name: "Buttermelt Croissant", category: "Pastry", price: 4.0, img: x100 },
      { name: "Cereal Cream Donut", category: "Donut", price: 2.45, img: x100 },
      { name: "Cheesy Cheesecake", category: "Cake", price: 3.75, img: x100 },
      { name: "Cheezy Sourdough", category: "Bread", price: 4.5, img: x100 },
      { name: "Egg Tart", category: "Tart", price: 3.25, img: x100 },
      { name: "Grains Pan Bread", category: "Bread", price: 4.5, img: x100 },
      { name: "Spinchoco Roll", category: "Pastry", price: 4.0, img: x100 },
    ],
    Breads: [{ name: "Cheezy Sourdough", category: "Bread", price: 4.5, img: x100 }, { name: "Grains Pan Bread", category: "Bread", price: 4.5, img: x100 }],
    Cakes: [{ name: "Cheesy Cheesecake", category: "Cake", price: 3.75, img: x100 }],
    Donuts: [{ name: "Cereal Cream Donut", category: "Donut", price: 2.45, img: x100 }],
    Pastries: [{ name: "Buttermelt Croissant", category: "Pastry", price: 4.0, img: x100 }, { name: "Spinchoco Roll", category: "Pastry", price: 4.0, img: x100 }],
    Sandwich: [{ name: "Beef Crowich", category: "Sandwich", price: 5.5, img: x100 }],
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      return existingItem ? prevCart.map((cartItem) => (cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)) : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((cartItem) => (cartItem.name === name ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + quantity) } : cartItem)));
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.name !== name));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const discount = 1.0;
    return { subtotal, tax, discount, total: subtotal + tax - discount };
  };

  const { subtotal, tax, discount, total } = calculateTotal();

  const filteredItems = items[category].filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-wrap h-full ">
      <div className="w-[60%] bg-gray-100 p-4 z-50 h-[100vh] overflow-y-scroll scroll-smooth">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <i className="bx bx-menu text-xl"></i>

            <div className="text-gray-600"><i className="bx bxs-calender"></i> Wed, 29 May 2024</div>
            <div className="text-gray-600">-</div>
            <div className="text-gray-600">07:59 AM</div>
          </div>
          <div className="text-green-500">Open Order</div>
        </div>
        <div className="flex space-x-4 mb-4 overflow-x-auto">
          {Object.keys(items).map((cat) => (
            <div
              key={cat}
              className={`flex-1 text-center p-2 cursor-pointer ${category === cat ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}<br /><span className="text-gray-500">{items[cat].length} Items</span>
            </div>
          ))}
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search something sweet on your mind..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bx bx-search absolute right-3 top-3 text-gray-500"></i>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => addToCart({ ...item, quantity: 1 })}>
              <Image src={item.img} alt={item.name} className="w-full h-24 object-cover mb-2" />
              <div className="text-center">{item.name}</div>
              <div className="text-center text-sm text-gray-500">{item.category}</div>
              <div className="text-center text-lg">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/*Cart Section Code */}
      <div className="w-[40%] bg-white p-4 shadow-lg md:relative right-0 top-0 h-[100vh] fixed z-50 flex flex-col overflow-hidden">
        <div className="h-[60%]">
          <div className="flexBetween mb-4">
            <div className="text-gray-600">Eloise&#39;s Order</div>
            <div className="text-gray-500">Order Number: #005</div>
          </div>
          <div className="flexBetween mb-4">
            <div className="flex items-center space-x-2">
              <div>Table 05</div>
              <i className="bx bx-chevron-down text-gray-500"></i>
            </div>
            <div className="flex items-center space-x-2">
              <div>Dine In</div>
              <i className="bx bx-chevron-down text-gray-500"></i>
            </div>
          </div>
          
          <div className="space-y-4 overflow-scroll h-[70%] hide-scroll ">
            {cart.map((item, index) => (
              <div key={index} className="flexBetween">
                <div className="flex items-center space-x-2">
                  <Image src={item.img} alt={item.name} className="w-12 h-12 object-cover" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-gray-500">${item.price.toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bx bx-pencil text-gray-500 cursor-pointer" onClick={() => removeFromCart(item.name)}></i>
                  <div className="flex items-center space-x-2">
                    <i className="bx bx-minus text-gray-500 cursor-pointer" onClick={() => updateQuantity(item.name, -1)}></i>
                    <div>{item.quantity}</div>
                    <i className="bx bx-plus text-gray-500 cursor-pointer" onClick={() => updateQuantity(item.name, 1)}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 h-[40%]">
          <div className="mt-0">
            <div className="flex justify-between items-center mb-2">
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div>Tax (10%)</div>
              <div>${tax.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div>Discount</div>
              <div>-${discount.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center font-bold">
              <div>TOTAL</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Promo Applied</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">QRIS</button>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded">Place Order</button>
        </div>
      </div>
    </div>
  )
}
