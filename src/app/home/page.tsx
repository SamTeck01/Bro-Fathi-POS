/* eslint-disable @next/next/no-img-element */
"use client"
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import "../boxicons-2.1.4 (2)/boxicons-2.1.4/css/boxicons.min.css";
import x100 from '../100x100.png';
import Modal from "./modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faBellConcierge, faCalendarDays, faBars, faBreadSlice, faCakeCandles, faCookie, faCookieBite, faClock, faPowerOff, faHamburger, faPizzaSlice, faLeaf, faIceCream, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const EmptySearch = () => {
  return(<>
    <div>Product not found</div>
  </>)
}

export default function App() {

  interface CartItem {
    name: string;
    category: string;
    price: number;
    img: string;
    quantity: number;
  }
  const [category, setCategory] = useState("All Menu");
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const date: Date = new Date();
  const [modal, setModal] = useState(false);
  
  const hour: number = date.getHours() % 12 || 12; 
  const minute: string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toLocaleString();
  
  const time: string = `${hour} : ${minute}`;
  const AMPM: string = date.getHours() >= 12 ? 'AM' :  'PM';

  const items: {
    [key: string]: { name: string; category: string; catColor: string; price: number; img: StaticImageData }[];
    } = {
    /*'All Menu': [
      { name: "Beef Crowich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 5.5, img: x100 },
      { name: "Buttermelt Croissant", category: "Pastry", catColor: '#1c837023', price: 4.0, img: x100 },
      { name: "Cereal Cream Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 2.45, img: x100 },
      { name: "Cheesy Cheesecake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 3.75, img: x100 },
      { name: "Cheezy Sourdough", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 4.5, img: x100 },
      { name: "Egg Tart", category: "Tart", catColor: 'rgba(128, 0, 128, 0.15)', price: 3.25, img: x100 },
      { name: "Spinchoco Roll", category: "Pastry", catColor: '#1c837023', price: 4.0, img: x100 },
      { name: "Whole Wheat Loaf", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 5.0, img: x100 },
      { name: "Garlic Bread", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 3.75, img: x100 },
      { name: "French Baguette", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 4.0, img: x100 },
      { name: "Chocolate Fudge Cake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 5.0, img: x100 },
      { name: "Classic Cheeseburger", category: "Burgers", catColor: '#ff573355', price: 7.5, img: x100 },
      { name: "Pepperoni Pizza", category: "Pizza", catColor: '#ff000033', price: 10.0, img: x100 },
      { name: "Spaghetti Bolognese", category: "Pasta", catColor: '#ffa50055', price: 8.5, img: x100 },
      { name: "Caesar Salad", category: "Salads", catColor: '#228b2255', price: 5.5, img: x100 },
      { name: "Vanilla Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Coca-Cola", category: "Drinks", catColor: '#ff450055', price: 2.0, img: x100 },
      { name: "BBQ Bacon Burger", category: "Burgers", catColor: '#ff573355', price: 8.0, img: x100 },
      { name: "Margarita Pizza", category: "Pizza", catColor: '#ff000033', price: 9.0, img: x100 },
      { name: "Alfredo Pasta", category: "Pasta", catColor: '#ffa50055', price: 9.0, img: x100 },
      { name: "Greek Salad", category: "Salads", catColor: '#228b2255', price: 6.0, img: x100 },
      { name: "Chocolate Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Lemonade", category: "Drinks", catColor: '#ff450055', price: 2.5, img: x100 },
      { name: "Veggie Burger", category: "Burgers", catColor: '#ff573355', price: 6.5, img: x100 },
      { name: "BBQ Chicken Pizza", category: "Pizza", catColor: '#ff000033', price: 11.5, img: x100 },
      { name: "Penne Arrabiata", category: "Pasta", catColor: '#ffa50055', price: 7.5, img: x100 },
      { name: "Avocado Chicken Salad", category: "Salads", catColor: '#228b2255', price: 7.5, img: x100 },
      { name: "Strawberry Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Iced Coffee", category: "Drinks", catColor: '#ff450055', price: 3.5, img: x100 },
      { name: "Mushroom Swiss Burger", category: "Burgers", catColor: '#ff573355', price: 7.0, img: x100 },
      { name: "Veggie Supreme Pizza", category: "Pizza", catColor: '#ff000033', price: 10.5, img: x100 },
      { name: "Carbonara", category: "Pasta", catColor: '#ffa50055', price: 9.5, img: x100 },
      { name: "Tuna Salad", category: "Salads", catColor: '#228b2255', price: 6.5, img: x100 },
      { name: "Mango Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 3.0, img: x100 },
      { name: "Orange Juice", category: "Drinks", catColor: '#ff450055', price: 3.0, img: x100 },
      { name: "Double Beef Burger", category: "Burgers", catColor: '#ff573355', price: 9.0, img: x100 },
      { name: "Hawaiian Pizza", category: "Pizza", catColor: '#ff000033', price: 10.5, img: x100 },
      { name: "Mac and Cheese", category: "Pasta", catColor: '#ffa50055', price: 8.0, img: x100 },
      { name: "Quinoa Salad", category: "Salads", catColor: '#228b2255', price: 7.0, img: x100 },
      { name: "Pistachio Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 3.0, img: x100 },
      { name: "Milkshake", category: "Drinks", catColor: '#ff450055', price: 4.0, img: x100 },
    ],*/
  
    // Separate categories
    Breads: [
      { name: "Cheezy Sourdough", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 4.5, img: x100 },
      { name: "Grains Pan Bread", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 4.5, img: x100 },
      { name: "Whole Wheat Loaf", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 5.0, img: x100 },
      { name: "Garlic Bread", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 3.75, img: x100 },
      { name: "French Baguette", category: "Bread", catColor: 'rgb(45, 113, 248, 0.2)', price: 4.0, img: x100 }
    ],
    Cakes: [
      { name: "Cheesy Cheesecake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 3.75, img: x100 },
      { name: "Chocolate Fudge Cake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 5.0, img: x100 },
      { name: "Red Velvet Cake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 4.5, img: x100 },
      { name: "Strawberry Shortcake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 4.75, img: x100 },
      { name: "Black Forest Cake", category: "Cake", catColor: 'rgba(255, 192, 203, 0.5)', price: 5.25, img: x100 }
    ],
    Donuts: [
      { name: "Cereal Cream Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 2.45, img: x100 },
      { name: "Glazed Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 2.0, img: x100 },
      { name: "Chocolate Sprinkles Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 2.75, img: x100 },
      { name: "Strawberry Frosted Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 2.65, img: x100 },
      { name: "Boston Cream Donut", category: "Donut", catColor: 'rgba(255, 166, 0, 0.25)', price: 3.0, img: x100 }
    ],
    Pastries: [
      { name: "Buttermelt Croissant", category: "Pastry", catColor: '#1c837023', price: 4.0, img: x100 },
      { name: "Spinchoco Roll", category: "Pastry", catColor: '#1c837023', price: 4.0, img: x100 },
      { name: "Apple Turnover", category: "Pastry", catColor: '#1c837023', price: 3.5, img: x100 },
      { name: "Danish Pastry", category: "Pastry", catColor: '#1c837023', price: 4.25, img: x100 },
      { name: "Puff Pastry", category: "Pastry", catColor: '#1c837023', price: 3.75, img: x100 }
    ],
    Sandwich: [
      { name: "Beef Crowich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 5.5, img: x100 },
      { name: "Chicken Club Sandwich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 6.0, img: x100 },
      { name: "Turkey Avocado Sandwich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 5.75, img: x100 },
      { name: "Tuna Melt Sandwich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 5.5, img: x100 },
      { name: "Grilled Cheese Sandwich", category: "Sandwich", catColor: 'rgb(255, 255, 0, 0.3)', price: 4.5, img: x100 }
    ],
    Burgers: [
      { name: "Classic Cheeseburger", category: "Burgers", catColor: '#ff573355', price: 7.5, img: x100 },
      { name: "BBQ Bacon Burger", category: "Burgers", catColor: '#ff573355', price: 8.0, img: x100 },
      { name: "Veggie Burger", category: "Burgers", catColor: '#ff573355', price: 6.5, img: x100 },
      { name: "Mushroom Swiss Burger", category: "Burgers", catColor: '#ff573355', price: 7.0, img: x100 },
      { name: "Double Beef Burger", category: "Burgers", catColor: '#ff573355', price: 9.0, img: x100 },
    ],
    Pizza: [{ name: "Pepperoni Pizza", category: "Pizza", catColor: '#ff000033', price: 10.0, img: x100 },
      { name: "Margarita Pizza", category: "Pizza", catColor: '#ff000033', price: 9.0, img: x100 },
      { name: "BBQ Chicken Pizza", category: "Pizza", catColor: '#ff000033', price: 11.5, img: x100 },
      { name: "Veggie Supreme Pizza", category: "Pizza", catColor: '#ff000033', price: 10.5, img: x100 },
      { name: "Hawaiian Pizza", category: "Pizza", catColor: '#ff000033', price: 10.5, img: x100 },
    ],
    Pasta: [{ name: "Spaghetti Bolognese", category: "Pasta", catColor: '#ffa50055', price: 8.5, img: x100 },
      { name: "Alfredo Pasta", category: "Pasta", catColor: '#ffa50055', price: 9.0, img: x100 },
      { name: "Penne Arrabiata", category: "Pasta", catColor: '#ffa50055', price: 7.5, img: x100 },
      { name: "Carbonara", category: "Pasta", catColor: '#ffa50055', price: 9.5, img: x100 },
      { name: "Mac and Cheese", category: "Pasta", catColor: '#ffa50055', price: 8.0, img: x100 },
    ],

    Salads: [{ name: "Caesar Salad", category: "Salads", catColor: '#228b2255', price: 5.5, img: x100 },
      { name: "Greek Salad", category: "Salads", catColor: '#228b2255', price: 6.0, img: x100 },
      { name: "Avocado Chicken Salad", category: "Salads", catColor: '#228b2255', price: 7.5, img: x100 },
      { name: "Tuna Salad", category: "Salads", catColor: '#228b2255', price: 6.5, img: x100 },
      { name: "Quinoa Salad", category: "Salads", catColor: '#228b2255', price: 7.0, img: x100 },
    ],
    Ice_Cream: [{ name: "Vanilla Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Chocolate Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Strawberry Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 2.5, img: x100 },
      { name: "Mango Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 3.0, img: x100 },
      { name: "Pistachio Ice Cream", category: "Ice Cream", catColor: '#fffacd55', price: 3.0, img: x100 },
    ],

    Drinks: [{ name: "Coca-Cola", category: "Drinks", catColor: '#ff450055', price: 2.0, img: x100 },
      { name: "Lemonade", category: "Drinks", catColor: '#ff450055', price: 2.5, img: x100 },
      { name: "Iced Coffee", category: "Drinks", catColor: '#ff450055', price: 3.5, img: x100 },
      { name: "Orange Juice", category: "Drinks", catColor: '#ff450055', price: 3.0, img: x100 },
      { name: "Milkshake", category: "Drinks", catColor: '#ff450055', price: 4.0, img: x100 },],
  };

  const allMenu = Object.values(items)
    .flat()
    .reduce((acc: { name: string; category: string; catColor: string; price: number; img: StaticImageData }[], item) => {
      if (!acc.some((i) => i.name === item.name)) acc.push(item);
      return acc;
  }, []);
  
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Breads":
      case "Sandwich":
        return faBreadSlice;
      case "Cakes":
        return faCakeCandles;
      case "Donuts":
        return faCookie;
      case "Pastries":
        return faCookieBite;
      case "Pizza":
        return faPizzaSlice;
      case "Burgers":
        return faHamburger;
      case "Salads":
        return faLeaf;
      case "Ice_Cream":
        return faIceCream;
      case "Drinks":
        return faGlassWhiskey;
      default:
        return faBellConcierge;
    }
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
  const emptyCart = ()=>{
    setCart([])
  }
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const discount = 1.0;
    return { subtotal, tax, discount, total: subtotal + tax - discount };
  };

  const { subtotal, tax, discount, total } = calculateTotal();

  const filteredItems = (category === 'All Menu' ? allMenu : items[category]).filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const printFrameRef = useRef<HTMLIFrameElement | null>(null);
  const handlePrint = () => {

    if (!printFrameRef.current) return;

    const iframe = printFrameRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // 📝 Write the receipt content into the iframe
    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            *{
              font-family: Poppins;
            }
            body{
              max-width: 60mm;
              height: auto;
            }
            .text-sm {
              font-size: 14px;
            }
            .text-lg {
              font-size: 18px;
            }
            .font-bold {
                font-weight: 700;
            }
            .font-semibold {
                font-weight: 600;
            }
            .mb-4 {
              margin-bottom: 16px;
            }
            .my-2 {
                margin-block: 8px;
            }
            .text-center {
              text-align: center;
            }
            .flex {
                display: flex;
            }
            .flex-row {
                flex-direction: row;
            }
            .flex-col {
                flex-direction: column;
            }
            .justify-between {
                justify-content: space-between;
            }
            .text-gray-600 {
                color: #4a5565;
            }
            .gap-2 {
                gap: 8px;
            }
            .-gap-10{
              gap: -10px;
            }
            .w-full {
                width: 100%;
            }
            .border-b-2 {
                border-bottom-style: dashed;
                border-bottom-width: 2px;
            }
            .ps-10 {
                padding-inline-start: 40px;
            }
            
          </style>
        </head>
        <body>
          <div style='width: 60mm; margin: 0 auto;'>
            <h2 class="text-lg font-semibold mb-4 text-center">
              Bro Fathi's POS <br /> Inside Fabulous Shop <br /> Opposite AYBAM Filling Station, Oyo, Oyo State
            </h2>

            <div class="text-sm">
              <div class="flex justify-between">
                <p>${new Date().toLocaleDateString()}</p>
                <p class="flex gap-2">
                  ${time} <span>${AMPM}</span>
                </p>
              </div>
              <p class="text-center">Host Abdul Samad</p>
              <div class="w-full flex justify-between border-b-2">
                <span class="font-semibold">QTY</span>
                <span class="font-semibold">DESC.</span>
                <span class="font-semibold">AMT</span>
              </div>
              <div class='flex flex-col -gap-10'> 
                ${cart.map((item, index) => (`
                  <div key=${index} class="flex justify-between flex-row my-2">
                    <p>${item.quantity}</p>
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                  </div>
                `))}
              </div>
              <div class="ps-10">
                <h3 class="font-bold my-4">Amount: $${subtotal.toFixed(2)}</h3>
                <h3 class="font-bold my-4">Tax: $${tax.toFixed(2)}</h3>
                <h3 class="font-bold my-4">Discount: $${discount.toFixed(2)}</h3>
                <h1 class="font-bold my-4">Total: $${total.toFixed(2)}</h1>
              </div>
            </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    doc.close();
  }

  const logout =()=>{
    router.push('/')
  }

  return (
    <div className="flex flex-wrap p-0 h-full">
      
      <div className="w-[68%] bg-gray-100 y-100 p-4 z-50 h-[100vh] overflow-y-scroll scroll-smooth">
         <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 flexCenter bg-white rounded-4xl me-4`}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            
            <div className="h-12 flexCenter bg-white rounded-4xl pe-6 gap-4">
              <div className="text-gray-600 w-11 h-10 flexCenter rounded-4xl ms-1 -me-2" style={{backgroundColor: 'rgba(45, 113, 248, 0.08)'}}><FontAwesomeIcon icon={faCalendarDays} /></div>
              <div className="text-gray-600"> Wed, 29 May 2024</div>
              <span className="text-gray-600">-</span>
              <div className="text-gray-600 w-11 h-10 flexCenter rounded-4xl ms-1 -me-2" style={{backgroundColor: 'rgba(45, 113, 248, 0.08)'}}><FontAwesomeIcon icon={faClock} /></div>            
              <div className="text-gray-600 flexCenter gap-2">{time} <span>{AMPM}</span> </div>
            </div>
          </div>

          <div className="rounded-4xl color-secondary flexCenter gap-2 ps-1 pe-3 py-1 bg-white cursor-pointer">
            <span className="w-26 h-10 flexCenter rounded-4xl px-2" style={{backgroundColor: 'rgba(28, 131, 112, 0.137)'}}>Open Order</span>
            <div className=" w-11 h-10 flexCenter rounded-4xl ms-1 -me-2" style={{backgroundColor: 'rgba(28, 131, 112, 0.08)'}} onClick={logout} ><FontAwesomeIcon icon={faPowerOff} /></div>
          </div>
        </div>

        <div className="w-full overflow-x-scroll hide-scroll scroll-smooth">
          <div className="flex flex-row gap-4 space-x-4 mb-4 w-fit whitespace-nowrap">
            {['All Menu', ...Object.keys(items)].map((cat) => (
              <div
                key={cat}
                className={`transition-2 rounded-xl bg-white p-3 h-36 w-36 cursor-pointer ${
                  category === cat ? "key-active" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {/* Icon changes dynamically based on the category */}
                <div
                  className={`w-12 h-12 transition-2 flexCenter bg-gray-100 rounded-4xl keys-icon ${
                    category === cat ? "key-icon" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={getCategoryIcon(cat)} className="text-2xl" />
                </div>
                <br />
                {cat}
                <br />
                <span className="text-gray-500">{cat === "All Menu"
                ? Object.values(items).reduce((total, arr) => total + arr.length, 0)
                : items[cat].length} Items</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flexBetween mb-4 border-0 bg-white ps-4 py-1 flexCenter rounded-4xl">
          <input
            type="text"
            placeholder="Search something sweet on your mind..."
            className="w-full outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={`w-12 h-12 flexCenter bg-gray-100 rounded-4xl me-2`}>
            <i className="bx bx-search bx-sm text-gray-500"></i>
          </div>
        </div>

        <div className="flexCenter flex-wrap gap-4">
          {filteredItems.length === 0 ? <EmptySearch/> : filteredItems.map((item, index) => (
            <div key={index} className="bg-white w-[190px] h-fit p-3 rounded-lg shadow cursor-pointer" onClick={() => addToCart({ ...item, img: item.img.src, quantity: 1 })}>
              <div className="w-full object-cover rounded-lg overflow-hidden mb-3"><Image src={item.img} alt={item.name} width={800} height={800} /></div>
              <div className="text-left overflow-ellipsis mb-2">{item.name}</div>

              <div className="flexBetween">
                <div className="text-sm text-gray-500 px-2 py-1 rounded-3xl" style={{backgroundColor: item.catColor}} >{item.category}</div>
                <div className='text-lg' >${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/*Cart Confirmation */}
      <iframe ref={printFrameRef} style={{ display: "none" }} />
      <Modal isOpen={modal} onClose={()=>setModal(false)}>
        <h1 className="font-extrabold text-3xl">Cart Confirmation</h1> <div className='w-[110.7%] h-0.5 -mx-6 bg-black mb-5'/>

        <div className="space-y-4 overflow-scroll flow-scroll h-[45vh] mt-1 px-5 pt-2  hide-scroll ">
          {cart.map((item, index) => (
            <div key={index} className="flex-col" >
              <div className="flexBetween mb-1 p-1 h-[80px]">
                <div className="flex flex-row gap-2 space-x-2 h-full">
                  <img src={item.img} alt="food" className="rounded" />
                  <div className="h-full flex flex-col items-start">
                    <div className="-mt-1">{item.name} <br/> <div className="text-gray-500">${item.price.toFixed(2)}</div> </div>
                    <div className="bg-white rounded-4xl p-[1.5px] px-[7px] cursor-pointer " onClick={() => removeFromCart(item.name)} > <i className='bx bx-trash text-sm text-gray-500 '></i> </div>
                  </div>
                </div>

                <div className="flexCenter gap-3 bg-white rounded-4xl w-[100px] py-1">
                  <i className="bx bx-minus text-gray-500 cursor-pointer text-[18px]" onClick={() => updateQuantity(item.name, -1)}></i>
                  <div className="font-bold text-lg">{item.quantity}</div>
                  <i className="bx bx-plus text-gray-500 cursor-pointer text-[18px]" onClick={() => updateQuantity(item.name, 1)}></i>
                </div>
              </div>

              {/* Dashed Line Separator */}
              {index !== cart.length - 1 && (
                <div className="w-full my-2 border-t border-dashed border-gray-400"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[0.5px] h-[30vh] relative bg-white px-4 pt-1 rounded ">
          <div className="flex flex-between gap-2 flex-col z-50">
            <div className="flexBetween ">
              <p className="text-gray-700 font-semibold text-[16px]">Subtotal</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} className="text-gray-700"/>
                <p className="text-gray-700 font-semibold text-[16px]">${subtotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">Tax (10%)</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} className="text-gray-500" size="sm" />
                <p className="text-sm">${tax.toFixed(2)}</p>
              </div>
            </div>
            <div className="flexBetween color-secondary">
              <p className="color-secondary">Discount</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} />
                <p className="color-secondary">-{discount.toFixed(2)}</p>
              </div>
            </div>
            <div className="flexBetween ">
              <span className="font-semibold text-[18px]">TOTAL</span>
              <span className="font-bold text-[18px]">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="px-5 py-2 bg-secondary flexBetween rounded-4xl cursor-pointer text-white" onClick={()=> {emptyCart(); setModal(false)}}> Cancel Order</button>
            <button className="py-2 bg-primary flexCenter blue-hover rounded-4xl cursor-pointer text-white" onClick={()=> {handlePrint(); setModal(false)}}>Proceed</button>
          </div>
        </div>
      </Modal>

      {/*Cart Section Code */}
      <div className="w-[32%] bg-gray-100 pt-4 shadow-lg md:relative right-0 top-0 h-[100vh] fixed z-50 flexBetween items-stretch flex-col overflow-hidden">
        <div className="h-[60vh] overflow-hidden">

          <div className="flexBetween px-4 py-5 h-[15%]">
            <div className="bg-white w-fit flexCenter p-4 rounded-4xl"> <i className="bx bx-book-content"></i> </div>

            <div className="flexCenter flex-col mb-4 px-4">
              <div className="text-xl">Eloise&#39;s Order</div>
              <div className="text-gray-500">Order Number: #005</div>
            </div>

            <div className="bg-white w-fit flexCenter p-4 rounded-4xl"> <i className="bx bx-pencil bx-sm"></i> </div>
          </div>
          
          <div className="space-y-4 overflow-scroll flow-scroll h-[85%] mt-1 px-5 hide-scroll ">
            {cart.map((item, index) => (
              <div key={index} className="flex-col" >
                <div className="flexBetween mb-1 p-1 h-[80px]">
                  <div className="flex flex-row gap-2 space-x-2 h-full">
                    <img src={item.img} alt="food" className="rounded" />
                    <div className="h-full flex flex-col items-start">
                      <div className="-mt-1">{item.name} <br/> <div className="text-gray-500">${item.price.toFixed(2)}</div> </div>
                      <div className="bg-white rounded-4xl p-[1.5px] px-[7px] cursor-pointer " onClick={() => removeFromCart(item.name)} > <i className='bx bx-trash text-sm text-gray-500 '></i> </div>
                    </div>
                  </div>

                  <div className="flexCenter gap-3 bg-white rounded-4xl w-[100px] py-1">
                    <i className="bx bx-minus text-gray-500 cursor-pointer text-[18px]" onClick={() => updateQuantity(item.name, -1)}></i>
                    <div className="font-bold text-lg">{item.quantity}</div>
                    <i className="bx bx-plus text-gray-500 cursor-pointer text-[18px]" onClick={() => updateQuantity(item.name, 1)}></i>
                  </div>
                </div>

                {/* Dashed Line Separator */}
                {index !== cart.length - 1 && (
                  <div className="w-full my-2 border-t border-dashed border-gray-400"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/*Sub Total section */}
        <div className="flex flex-col gap-[0.5px] h-[30vh] relative bg-white px-4 ">
          <svg className="absolute -top-[30px] w-full -mx-5 bg-transparent " width="100%" height="30" viewBox="0 0 1440 83" xmlns="http://www.w3.org/2000/svg">
            <path  fill="#ffffff" fillOpacity="1" d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50 T850,50 T900,50 T950,50 T1000,50 T1050,50 T1100,50 T1150,50 T1200,50 T1250,50 T1300,50 T1350,50 T1400,50 T1450,50 L1440,100 L0,100 Z"/>
          </svg>
          <div className="flex flex-between gap-2 flex-col z-50">
            <div className="flexBetween ">
              <p className="text-gray-700 font-semibold text-[16px]">Subtotal</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} className="text-gray-700"/>
                <p className="text-gray-700 font-semibold text-[16px]">${subtotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">Tax (10%)</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} className="text-gray-500" size="sm" />
                <p className="text-sm">${tax.toFixed(2)}</p>
              </div>
            </div>
            <div className="flexBetween color-secondary">
              <p className="color-secondary">Discount</p>
              <div className="flexBetween w-[30%] ">
                <FontAwesomeIcon icon={faDollarSign} />
                <p className="color-secondary">-{discount.toFixed(2)}</p>
              </div>
            </div>
            <div className="flexBetween ">
              <span className="font-semibold text-[18px]">TOTAL</span>
              <span className="font-bold text-[18px]">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="px-5 py-2 rounded-full-green-hover flexBetween">Promo Applied <i className="bx bxs-discount bx-sm text-left" style={{backgroundColor: 'transparent'}} ></i> </button>
            <button className="py-2 blue-hover flexCenter rounded-4xl">QRIS</button>
          </div>
        </div>
        <button className="w-full bg-primary h-[10vh] -mb-6 text-white py-4 blue-hover " style={{borderBottomRightRadius: '30px',}} onClick={()=> setModal(true)} >Place Order</button><br/>
      </div>
    </div>
  )
}
