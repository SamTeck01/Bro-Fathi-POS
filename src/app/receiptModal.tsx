import { useRef } from "react";

type ReceiptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{ name: string; quantity: number; price: number }>;
  calculateTotal: () => { subtotal: number; tax: number; discount: number; total: number };
};

const ReceiptModal = ({ isOpen, onClose, cart, calculateTotal }: ReceiptModalProps) => {
  const printFrameRef = useRef<HTMLIFrameElement | null>(null);

  const { subtotal, tax, discount, total } = calculateTotal();

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
          <title>Print Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Receipt</h2>
          <table>
            <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
            ${cart.map(
              (item: { name: string; quantity: number; price: number }) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                </tr>`
            ).join("")}
          </table>
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>Tax: $${tax.toFixed(2)}</p>
          <p>Discount: $${discount.toFixed(2)}</p>
          <p class="total">Total: $${total.toFixed(2)}</p>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{zIndex: '1000'}}>
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Order Summary</h2>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded">
          Print Receipt
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
          Close
        </button>

        {/* ✅ Hidden iframe for printing */}
        <iframe ref={printFrameRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default ReceiptModal;

{/*"use client";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{ quantity: number; name: string; price: number }>;
  time: string;
  AMPM: string;
  calculateTotal: () => { subtotal: number; tax: number; discount: number; total: number };
};

const ReceiptModal = ({ isOpen, onClose, cart, time, AMPM, calculateTotal }: ModalProps) => {
  const { subtotal, tax, discount, total } = calculateTotal();
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: () => {
      console.log("Print Ref:", printRef.current); // ✅ Log ref to debug
      return printRef.current;
    },
    documentTitle: "Order Receipt",
    onAfterPrint: () => onClose(), // Close modal after printing
  });
  useEffect(() => {
    // ✅ Ensure modal is open & content is available before printing
    if (isOpen) {
      if (printRef.current) {
        handlePrint();
      }
    }
  }, [isOpen, handlePrint]); // Run when modal opens

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{ zIndex: 1000 }}>
      <div className="bg-white p-6 rounded-lg w-[350px]" ref={printRef}>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Bro Fathi&apos;s POS <br /> Inside Fabulous Shop <br /> Opposite AYBAM Filling Station, Oyo, Oyo State
        </h2>

        <div className="text-sm">
          <div className="flex justify-between">
            <p>{new Date().toLocaleDateString()}</p>
            <div className="text-gray-600 flex gap-2">
              {time} <span>{AMPM}</span>
            </div>
          </div>
          <p className="text-center">Host Abdul Samad</p>
          <div className="w-full flex justify-between border-b-2">
            <span className="font-semibold">QTY</span>
            <span className="font-semibold">DESC.</span>
            <span className="font-semibold">AMT</span>
          </div>
          {cart?.map((item, index) => (
            <div key={index} className="flex justify-between my-2">
              <p>{item.quantity}</p>
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="ps-10">
            <h3 className="font-bold my-4">Amount: ${subtotal.toFixed(2)}</h3>
            <h3 className="font-bold my-4">Tax: ${tax.toFixed(2)}</h3>
            <h3 className="font-bold my-4">Discount: ${discount.toFixed(2)}</h3>
            <h1 className="font-bold my-4">Total: ${total.toFixed(2)}</h1>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
*/}