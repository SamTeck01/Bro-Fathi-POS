import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cart: Array<{ name: string; price: number; }>;
}

const ReceiptModal = ({ isOpen, onClose, cart }:ModalProps) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };
  console.log(cart)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg w-[350px]" onLoad={()=>handlePrint()} >
        <h2 className="text-lg font-bold mb-4">cart Receipt</h2>

        <div className="text-sm">
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            {cart.map((item, index) => (
                <div key={item.price}>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc pl-5">
                        <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                    </ul>
                    <p className="mt-2"><strong>Total:</strong> ${item.price.toFixed(2)}</p>
                </div>
            ))}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
          <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded">Print</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
