"use client";
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
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: () => printRef.current,
    documentTitle: "Order Receipt",
    onAfterPrint: () => onClose(), // Close modal after printing
  });

  // Automatically print when modal opens
  useEffect(() => {
    if (isOpen) {
      handlePrint();
    }
  }, [isOpen, handlePrint]); // Runs when isOpen changes

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
